import * as authActions from './auth/actions'
import * as aclgActions from './aclg/actions'
import * as mdmmActions from './mdmm/actions'
import * as publisActions from './publis/actions'

export const Actions = Object.assign(authActions, aclgActions, mdmmActions, publisActions)

type Unwrap<T> = T extends { [K in keyof T]: infer U } ? U : never;
type ReturnTypes<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
  ? ReturnType<T[K]>
  : never;
};

export type CreatorsToActions<T> = Unwrap<ReturnTypes<T>>;

export type Actions =
  | CreatorsToActions<typeof import('./auth/actions')>
  | CreatorsToActions<typeof import('./aclg/actions')>
  | CreatorsToActions<typeof import('./mdmm/actions')>
  | CreatorsToActions<typeof import('./publis/actions')>
