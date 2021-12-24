interface Listener {
  (): void;
}

const defaultConfig: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
};

function createIntersectionObserver(config: IntersectionObserverInit = defaultConfig) {
  let _intersectionObserver: IntersectionObserver;

  const _addListener = (listener: Listener, target: Element | null) => {
    if (!!IntersectionObserver && target) {
      _intersectionObserver = new IntersectionObserver(listener, config);
      _intersectionObserver.observe(target);
    } else {
      listener();
      window.addEventListener('scroll', listener);
    }
  };

  const _removeListener = (listener: Listener) => {
    if (!!IntersectionObserver && !!_intersectionObserver) {
      _intersectionObserver.disconnect();
    } else {
      window.removeEventListener('scroll', listener);
    }
  };

  return {
    addListener: _addListener,
    removeListener: _removeListener,
  };
}

export default createIntersectionObserver;
