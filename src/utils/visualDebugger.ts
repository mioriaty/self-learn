import { isBrowser } from './isBrowser';

const WIDTH = isBrowser ? window.innerWidth : 0;
const HEIGHT = isBrowser ? window.innerHeight : 0;

interface NodeLayout {
  left: number;
  top: number;
  width: number;
  height: number;
}

class VisualDebugger {
  private debugCtx: CanvasRenderingContext2D;
  private layoutCtx: CanvasRenderingContext2D;

  constructor() {
    if (isBrowser) {
      this.debugCtx = VisualDebugger.createCanvas('sn-debug', '1010');
      this.layoutCtx = VisualDebugger.createCanvas('sn-layouts', '1000');
    }
  }

  static createCanvas(id: string, zIndex: string) {
    const canvas: HTMLCanvasElement = document.querySelector(`#${id}`) || document.createElement('canvas');

    canvas.setAttribute('id', id);

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    canvas.style.zIndex = zIndex;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';

    document.body.appendChild(canvas);

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    return ctx;
  }

  clear() {
    if (!isBrowser) {
      return;
    }
    this.debugCtx.clearRect(0, 0, WIDTH, HEIGHT);
  }

  clearLayouts() {
    if (!isBrowser) {
      return;
    }
    this.layoutCtx.clearRect(0, 0, WIDTH, HEIGHT);
  }

  drawLayout(layout: NodeLayout, focusKey: string, parentFocusKey: string) {
    if (!isBrowser) {
      return;
    }
    this.layoutCtx.strokeStyle = 'green';
    this.layoutCtx.strokeRect(layout.left, layout.top, layout.width, layout.height);
    this.layoutCtx.fillStyle = 'red';
    this.layoutCtx.fillText(focusKey, layout.left, layout.top + 10);
    this.layoutCtx.fillText(parentFocusKey, layout.left, layout.top + 25);
    this.layoutCtx.fillText(`left ${layout.left}`, layout.left, layout.top + 40);
    this.layoutCtx.fillText(`top ${layout.top}`, layout.left, layout.top + 55);
  }

  drawPoint(x: number, y: number, color = 'blue', size = 10) {
    if (!isBrowser) {
      return;
    }
    this.debugCtx.strokeStyle = color;
    this.debugCtx.lineWidth = 3;
    this.debugCtx.strokeRect(x - size / 2, y - size / 2, size, size);
  }
}

export default VisualDebugger;
