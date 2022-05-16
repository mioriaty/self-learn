import { useEffect, useRef } from 'react';

type EffectType = () => void | (() => void);

export const useEffectOnce = (effect: EffectType) => {
  const destroyFnc = useRef<void | (() => void)>();
  const calledOnce = useRef(false);
  const renderAfterCalled = useRef(false);

  if (calledOnce.current) {
    renderAfterCalled.current = true;
  }

  useEffect(() => {
    if (calledOnce.current) {
      return;
    }

    calledOnce.current = true;
    destroyFnc.current = effect();

    return () => {
      if (!renderAfterCalled.current) {
        return;
      }
      if (destroyFnc.current) {
        destroyFnc.current();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
