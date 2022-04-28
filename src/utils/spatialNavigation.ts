import { DebouncedFunc, filter, findKey, first, forOwn, sortBy } from 'lodash';
import { KeyboardEvent } from 'react';
import measureLayout from './measureLayout';
import VisualDebugger from './visualDebugger';

const DIRECTION_LEFT = 'left';
const DIRECTION_RIGHT = 'right';
const DIRECTION_UP = 'up';
const DIRECTION_DOWN = 'down';
const KEY_ENTER = 'enter';

const DEFAULT_KEY_MAP = {
  [DIRECTION_LEFT]: 37,
  [DIRECTION_UP]: 38,
  [DIRECTION_RIGHT]: 39,
  [DIRECTION_DOWN]: 40,
  [KEY_ENTER]: 13,
};

export const ROOT_FOCUS_KEY = 'SN:ROOT';

const ADJACENT_SLICE_THRESHOLD = 0.2;

/**
 * Adjacent slice is 5 times more important than diagonal
 */
const ADJACENT_SLICE_WEIGHT = 5;
const DIAGONAL_SLICE_WEIGHT = 1;

/**
 * Main coordinate distance is 5 times more important
 */
const MAIN_COORDINATE_WEIGHT = 5;

const DEBUG_FN_COLORS = ['#0FF', '#FF0', '#F0F'];

const THROTTLE_OPTIONS = {
  leading: true,
  trailing: false,
};

export interface FocusableComponentLayout {
  left: number;
  top: number;
  width: number;
  height: number;
  x: number;
  y: number;
  node: HTMLElement;
}

interface FocusableComponent {
  focusKey: string;
  node: HTMLElement;
  parentFocusKey: string;
  onEnterPress: (details?: KeyPressDetails) => void;
  onEnterRelease: () => void;
  onArrowPress: (direction: string, details: KeyPressDetails) => boolean;
  onFocus: (layout: FocusableComponentLayout, details: FocusDetails) => void;
  onBlur: (layout: FocusableComponentLayout, details: FocusDetails) => void;
  onUpdateFocus: (focused: boolean) => void;
  onUpdateHasFocusedChild: (hasFocusedChild: boolean) => void;
  saveLastFocusedChild: boolean;
  trackChildren: boolean;
  preferredChildFocusKey?: string;
  focusable: boolean;
  isFocusBoundary: boolean;
  autoRestoreFocus: boolean;
  lastFocusedChildKey?: string;
  layout?: FocusableComponentLayout;
  layoutUpdated?: boolean;
}

interface FocusableComponentUpdatePayload {
  node: HTMLElement;
  preferredChildFocusKey?: string;
  focusable: boolean;
  isFocusBoundary: boolean;
}

interface FocusableComponentRemovePayload {
  focusKey: string;
}

interface CornerCoordinates {
  x: number;
  y: number;
}

interface Corners {
  a: CornerCoordinates;
  b: CornerCoordinates;
}

export interface PressedKeys {
  [index: string]: number;
}

/**
 * Extra details about pressed keys passed on the key events
 */
export interface KeyPressDetails {
  pressedKeys: PressedKeys;
}

/**
 * Extra details passed from outside to be bounced back on other callbacks
 */
export interface FocusDetails {
  event?: KeyboardEvent;
}

export interface KeyMap {
  [index: string]: number;
}

const getChildClosestToOrigin = (children: FocusableComponent[]) => {
  const childrenClosestToOrigin = sortBy(
    children,
    ({ layout }) => Math.abs((layout as FocusableComponentLayout).left) + Math.abs((layout as FocusableComponentLayout).top),
  );

  return first(childrenClosestToOrigin);
};

class SpatialNavigation {
  private focusableComponents: { [index: string]: FocusableComponent };
  private visualDebugger: VisualDebugger;
  private focusKey: string; // Focus key of the currently focused element

  /**
   * This collection contains focus keys of the elements that are having a child focused
   * Might be handy for styling of certain parent components if their child is focused.
   */
  private parentsHavingFocusedChild: string[];
  private enabled: boolean;

  // use in react native
  private nativeMode: boolean;

  // Throttling delay for key presses in milliseconds
  private throttle: number;

  // Enables/disables throttling feature
  private throttleKeyPresses: boolean;

  // Storing pressed keys counter by the eventType
  private pressedKeys: PressedKeys;

  // flag used to block key events from this service
  private paused: boolean;

  private keyDownEventListener: ((event: KeyboardEvent) => void) | null;

  private keyDownEventListenerThrottled: DebouncedFunc<(event: KeyboardEvent) => void>;

  private keyUpEventListener: ((event: KeyboardEvent) => void) | null;

  private keyMap: KeyMap;

  private debug: boolean;

  private logIndex: number;

  constructor() {
    this.focusableComponents = {}; // Storage for all focusable components
    this.focusKey = ''; //  Storing current focused key
    this.parentsHavingFocusedChild = [];
    this.enabled = false;
    this.nativeMode = false;
    this.throttle = 0;
    this.throttleKeyPresses = false;
    this.pressedKeys = {};
    this.paused = false;
    this.keyMap = DEFAULT_KEY_MAP;

    this.keyDownEventListener = null;
    this.keyUpEventListener = null;
  }

  /**
   * Used to determine the coordinate that will be used to filter items that are over the "edge"
   */
  static getCutoffCoordinate(isVertical: boolean, isIncremental: boolean, isSibling: boolean, layout: FocusableComponentLayout) {
    const itemX = layout.left;
    const itemY = layout.top;
    const itemWidth = layout.width;
    const itemHeight = layout.height;

    const coordinate = isVertical ? itemY : itemX;
    const itemSize = isVertical ? itemHeight : itemWidth;

    if (isIncremental) {
      if (isSibling) {
        return coordinate;
      } else {
        return coordinate + itemSize;
      }
    } else {
      if (isSibling) {
        return coordinate + itemSize;
      } else {
        return coordinate;
      }
    }
    /* 
    return isIncremental
      ? isSibling
        ? coordinate
        : coordinate + itemSize
      : isSibling
        ? coordinate + itemSize
        : coordinate;
    */
  }

  /**
   * Returns two corners (a and b) coordinates that are used as a reference points
   * Where "a" is always leftmost and topmost corner, and "b" is rightmost bottommost corner
   */
  static getRefCorners(direction: string, isSibling: boolean, layout: FocusableComponentLayout) {
    const itemX = layout.left;
    const itemY = layout.top;
    const itemWidth = layout.width;
    const itemHeight = layout.height;

    const result = {
      a: {
        x: 0,
        y: 0,
      },
      b: {
        x: 0,
        y: 0,
      },
    };

    switch (direction) {
      case DIRECTION_UP: {
        const y = isSibling ? itemY + itemHeight : itemY;
        result.a = {
          x: itemX,
          y,
        };
        result.b = {
          x: itemX + itemWidth,
          y,
        };

        break;
      }

      case DIRECTION_DOWN: {
        const y = isSibling ? itemY : itemY + itemHeight;
        result.a = {
          x: itemX,
          y,
        };
        result.b = {
          x: itemX + itemWidth,
          y,
        };

        break;
      }

      case DIRECTION_LEFT: {
        const x = isSibling ? itemX + itemWidth : itemX;
        result.a = {
          x,
          y: itemY,
        };
        result.b = {
          x,
          y: itemY + itemHeight,
        };
        break;
      }

      case DIRECTION_RIGHT: {
        const x = isSibling ? itemX : itemX + itemWidth;
        result.a = {
          x,
          y: itemY,
        };
        result.b = {
          x,
          y: itemY + itemHeight,
        };
        break;
      }

      default:
        break;
    }

    return result;
  }

  /**
   * Calculates if the sibling node is intersecting enough with the ref node by the secondary coordinate
   */
  static isAdjacentSlice(refCorners: Corners, siblingCorners: Corners, isVerticalDirection: boolean) {
    const { a: refA, b: refB } = refCorners;
    const { a: siblingA, b: siblingB } = siblingCorners;
    const coordinate = isVerticalDirection ? 'x' : 'y';

    const refCoordinateA = refA[coordinate];
    const refCoordinateB = refB[coordinate];
    const siblingCoordinateA = siblingA[coordinate];
    const siblingCoordinateB = siblingB[coordinate];

    const thresholdDistance = (refCoordinateB - refCoordinateA) * ADJACENT_SLICE_THRESHOLD;

    const intersectionLength = Math.max(0, Math.min(refCoordinateB, siblingCoordinateB) - Math.max(refCoordinateA, siblingCoordinateA));

    return intersectionLength >= thresholdDistance;
  }

  static getPrimaryAxisDistance(refCorners: Corners, siblingCorners: Corners, isVerticalDirection: boolean) {
    const { a: refA } = refCorners;
    const { a: siblingA } = siblingCorners;
    const coordinate = isVerticalDirection ? 'y' : 'x';

    return Math.abs(siblingA[coordinate] - refA[coordinate]);
  }

  static getSecondaryAxisDistance(refCorners: Corners, siblingCorners: Corners, isVerticalDirection: boolean) {
    const { a: refA, b: refB } = refCorners;
    const { a: siblingA, b: siblingB } = siblingCorners;
    const coordinate = isVerticalDirection ? 'x' : 'y';

    const refCoordinateA = refA[coordinate];
    const refCoordinateB = refB[coordinate];
    const siblingCoordinateA = siblingA[coordinate];
    const siblingCoordinateB = siblingB[coordinate];

    const distancesToCompare = [];

    distancesToCompare.push(Math.abs(siblingCoordinateA - refCoordinateA));
    distancesToCompare.push(Math.abs(siblingCoordinateA - refCoordinateB));
    distancesToCompare.push(Math.abs(siblingCoordinateB - refCoordinateA));
    distancesToCompare.push(Math.abs(siblingCoordinateB - refCoordinateB));

    return Math.min(...distancesToCompare);
  }

  sortSiblingsByPriority(siblings: FocusableComponent[], currentLayout: FocusableComponentLayout, direction: string, focusKey: string) {
    const isVerticalDirection = direction === DIRECTION_DOWN || direction === DIRECTION_UP;

    const refCorners = SpatialNavigation.getRefCorners(direction, false, currentLayout);

    return sortBy(siblings, sibling => {
      const siblingCorners = SpatialNavigation.getRefCorners(direction, true, sibling.layout as FocusableComponentLayout);

      const isAdjacentSlice = SpatialNavigation.isAdjacentSlice(refCorners, siblingCorners, isVerticalDirection);

      const primaryAxisFunc = isAdjacentSlice ? SpatialNavigation.getPrimaryAxisDistance : SpatialNavigation.getSecondaryAxisDistance;

      const secondAxisFunc = isAdjacentSlice ? SpatialNavigation.getSecondaryAxisDistance : SpatialNavigation.getPrimaryAxisDistance;

      const primaryAxisDistance = primaryAxisFunc(refCorners, siblingCorners, isVerticalDirection);

      const secondaryAxisDistance = secondAxisFunc(refCorners, siblingCorners, isVerticalDirection);

      /**
       * The higher this value is, the less prioritised the candidate is
       */
      const totalDistancePoints = primaryAxisDistance * MAIN_COORDINATE_WEIGHT + secondaryAxisDistance;

      /**
       * + 1 here is in case of distance is zero, but we still want to apply Adjacent priority weight
       */
      const priority = (totalDistancePoints + 1) / (isAdjacentSlice ? ADJACENT_SLICE_WEIGHT : DIAGONAL_SLICE_WEIGHT);

      this.log(
        'smartNavigate',
        `distance (primary, secondary, total weighted) for ${sibling.focusKey} relative to ${focusKey} is`,
        primaryAxisDistance,
        secondaryAxisDistance,
        totalDistancePoints,
      );

      this.log('smartNavigation', `priority for ${sibling.focusKey} relative to ${focusKey} is`, priority);

      if (this.visualDebugger) {
        this.visualDebugger.drawPoint(siblingCorners.a.x, siblingCorners.a.y, 'yellow', 6);

        this.visualDebugger.drawPoint(siblingCorners.b.x, siblingCorners.b.y, 'yellow', 6);
      }

      return priority;
    });
  }

  log(functionName: string, debugString: string, ...rest: any[]) {
    if (this.debug) {
      console.log(
        `%c${functionName}%c${debugString}`,
        `background: ${DEBUG_FN_COLORS[this.logIndex % DEBUG_FN_COLORS.length]}; color: black; padding: 1px 5px;`,
        'background: #333; color: #BADA55; padding: 1px 5px;',
        ...rest,
      );
    }
  }

  onKeyEvent(event: KeyboardEvent) {
    if (this.visualDebugger) {
      this.visualDebugger.clear();
    }

    const direction = findKey(this.getKeyMap(), code => event.keyCode === code);
  }

  getKeyMap() {
    return this.keyMap;
  }

  setKeyMap(keyMap: KeyMap) {
    this.keyMap = {
      ...this.getKeyMap(),
      ...keyMap,
    };
  }

  smartNavigate(direction: string, fromParentFocusKey: string, focusDetails, FocusDetails) {
    if (this.nativeMode) {
      return;
    }

    this.log('smartNavigate', 'direction', direction);
    this.log('smartNavigate', 'fromParentFocusKey', fromParentFocusKey);
    this.log('smartNavigate', 'this.focusKey', this.focusKey);

    if (!fromParentFocusKey) {
      forOwn(this.focusableComponents, component => {
        component.layoutUpdated = false;
      });
    }

    const currentComponent = this.focusableComponents[fromParentFocusKey || this.focusKey];

    this.log(
      'smartNavigate',
      'currentComponent',
      currentComponent ? currentComponent.focusKey : undefined,
      currentComponent ? currentComponent.node : undefined,
    );

    if (currentComponent) {
      this.updateLayout(currentComponent.focusKey);
      const { parentFocusKey, focusKey, layout } = currentComponent;

      const isVerticalDirection = direction === DIRECTION_DOWN || direction === DIRECTION_UP;
      const isIncrementalDirection = direction === DIRECTION_DOWN || direction === DIRECTION_RIGHT;

      const currentCutoffCoordinate = SpatialNavigation.getCutoffCoordinate(
        isVerticalDirection,
        isIncrementalDirection,
        false,
        layout as FocusableComponentLayout,
      );

      /**
       * Get only the siblings with the coords on the way of our moving direction
       */
      const siblings = filter(this.focusableComponents, component => {
        if (component.parentFocusKey === parentFocusKey && component.focusable) {
          this.updateLayout(component.focusKey);
          const siblingCutoffCoordinate = SpatialNavigation.getCutoffCoordinate(
            isVerticalDirection,
            isIncrementalDirection,
            true,
            component.layout as FocusableComponentLayout,
          );

          return isIncrementalDirection ? siblingCutoffCoordinate >= currentCutoffCoordinate : siblingCutoffCoordinate <= currentCutoffCoordinate;
        }
        return false;
      });

      if (this.debug) {
        this.log('smartNavigate', 'currentCutoffCoordinate', currentCutoffCoordinate);

        this.log(
          'smartNavigate',
          'siblings',
          `${siblings.length} elements:`,
          siblings.map(sibling => sibling.focusKey).join(', '),
          siblings.map(sibling => sibling.node),
        );
      }

      if (this.visualDebugger) {
        const refCorners = SpatialNavigation.getRefCorners(direction, false, layout as FocusableComponentLayout);

        this.visualDebugger.drawPoint(refCorners.a.x, refCorners.a.y);
        this.visualDebugger.drawPoint(refCorners.b.x, refCorners.b.y);
      }

      const sortedSiblings = this.sortSiblingsByPriority(siblings, layout as FocusableComponentLayout, direction, focusKey);

      const nextComponent = first(sortedSiblings);

      this.log('smartNavigate', 'nextComponent', nextComponent ? nextComponent.focusKey : undefined, nextComponent ? nextComponent.node : undefined);

      if (nextComponent) {
      }
    }
  }

  updateLayout(focusKey: string) {
    const component = this.focusableComponents[focusKey];

    if (!component || this.nativeMode || component.layoutUpdated) {
      return;
    }

    const { node } = component;
    component.layout = {
      ...measureLayout(node),
      node,
    };
  }

  setFocus(focusKey: string, _focusDetails: FocusDetails = {}) {
    if (!this.enabled) {
      return;
    }

    this.log('setFocus', 'focusKey', focusKey);
  }
}

export default SpatialNavigation;
