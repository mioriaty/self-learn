export const debounce = <T extends (...args: any[]) => any>(callback: T, ms = 0) => {
  let timeoutId = 0;
  return function(...args: Parameters<T>): ReturnType<T> {
    let result: any;
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      result = callback(...args);
    }, ms);
    return result;
  };
};
