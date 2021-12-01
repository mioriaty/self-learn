export function immutableState<T>(state: T): T;

export function immutableState<T>(state: T) {
  if (Array.isArray(state)) {
    return [...state];
  }
  if (!!state && typeof state === 'object') {
    return { ...state };
  }
  return state;
}
