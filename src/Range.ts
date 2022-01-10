type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

export type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

type Diff<O, O1> = { [P in keyof O | keyof O1 as Exclude<P, keyof O & keyof O1>]: P extends keyof O ? O[P] : P extends keyof O1 ? O1[P] : never }
