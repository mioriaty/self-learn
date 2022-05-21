export type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K]
}

type _ExamplePickBoolean = PickByType<{
  name: string;
  count: number;
  isEnable: boolean;
}, boolean>

const _examplePickBoolean: _ExamplePickBoolean = {
  isEnable: false
}
