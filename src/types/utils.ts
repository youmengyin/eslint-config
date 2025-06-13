export type Pretty<T> = {
  [P in keyof T]: T[P]
} & {}

export type ResolvedOptions<T> = T extends boolean ? never : NonNullable<T>
