import { useState, useEffect } from 'react';

export interface Step {
  id: string;
}

export interface UseStepParams {
  initialStep?: number;
  autoAdvanceDuration?: number;
  steps: Step[] | number;
}

export interface UseStepResponse {
  autoAdvanceDuration: number;
  isPaused: boolean;
  index: number;
  step: Step | number;
  navigation: NavigationProps;
}

export interface NavigationProps {
  next: () => void;
  previous?: (() => void) | undefined;
  go?: ((step: number | string) => void) | undefined;
  play?: (() => void) | undefined;
  pause?: (() => void) | undefined;
}

const error = (msg: string) => {
  throw new Error(msg);
};

const getIndexById = (arr: Step[], matchId: string) => arr.findIndex(({ id }) => id === matchId);

const useStep = ({ initialStep = 0, autoAdvanceDuration: autoAdvanceDurationProp = 0, steps: stepsProp }: UseStepParams): UseStepResponse => {
  if (process.env.NODE_ENV !== 'production') {
    if (!Array.isArray(stepsProp) && !Number.isInteger(stepsProp)) {
      error('useStep: You must specify either an array or an integer for `steps`');
    }
  }

  // Convert steps to an array if it is a number.
  const steps = typeof stepsProp === 'number' ? new Array(stepsProp).fill({}) : stepsProp;

  // Compute initialStepIndex in case an id is passed vs an index.
  const initialStepIndex = typeof initialStep === 'number' ? initialStep : getIndexById(steps, initialStep);

  if (process.env.NODE_ENV !== 'production') {
    if (typeof initialStep === 'string' && initialStepIndex === -1) {
      error(`useStep: id of "${initialStep}" specified in initialStep not found in steps`);
    }
  }

  // Setup state.
  const [index, setStep] = useState(initialStepIndex);
  const [isPaused, setPaused] = useState(false);

  const step = steps[index];
  const { autoAdvanceDuration = autoAdvanceDurationProp } = step;

  const deltaSetStep = (delta = 1) => {
    setStep((index + steps.length + delta) % steps.length);
  };

  useEffect(() => {
    const timer = !isPaused && autoAdvanceDuration ? setTimeout(deltaSetStep, autoAdvanceDuration) : null;
    return () => clearTimeout(timer as NodeJS.Timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, isPaused]);

  // Build navigation callback functions.
  const navigation: NavigationProps = {
    next: () => deltaSetStep(1),
    previous: () => deltaSetStep(-1),
    go: newStep => {
      if (typeof newStep === 'number') {
        if (process.env.NODE_ENV !== 'production') {
          if (newStep < 0 || newStep > steps.length) {
            error(`useStep: Index out of range in go(${newStep})`);
          }
        }
        setStep(newStep);
      } else {
        const newStepId = getIndexById(steps, newStep);
        if (process.env.NODE_ENV !== 'production') {
          if (newStepId === -1) {
            error(`useStep: go("${newStep}") not found in steps`);
          }
        }
        setStep(newStepId);
      }
    },
    play: () => setPaused(false),
    pause: () => setPaused(true),
  };

  return {
    autoAdvanceDuration,
    isPaused,
    index,
    step,
    navigation,
  };
};

export default useStep;
