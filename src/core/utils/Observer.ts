type Listener<T> = (data: T) => void;
type Subscription = () => void;

export interface IObserver<T extends any> {
  notify: (data: T) => void;
  subscribe(listener: Listener<T>): Subscription;
}

export default class Observer<T extends any> implements IObserver<T> {
  _listeners: Listener<T>[];

  constructor() {
    this._listeners = [];
  }

  notify(data?: T) {
    this._listeners.forEach(listener => {
      listener(data as T);
    });
  }

  subscribe(listener: Listener<T>): Subscription {
    this._listeners = [...this._listeners, listener];
    return () => {
      this._listeners = this._listeners.filter(list => list !== listener);
    };
  }
}
