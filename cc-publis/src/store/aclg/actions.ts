import types from './types'
import { Aclgs } from '../../types/models';

export const getAclgsStart = (cdcstm: string) => ({
  type: types.getAclgsStart,
  payload: { cdcstm },
});
export const getAclgsSucceed = (searchHistory: object, aclgs: Aclgs) => ({
  type: types.getAclgsSucceed,
  payload: { searchHistory, aclgs },
});
export const getAclgsFail = (error: object) => ({
  type: types.getAclgsFail,
  payload: { error },
});
