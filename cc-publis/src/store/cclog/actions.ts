import types from './types'
import { CCLogs, CCLogQuery } from '../../types/models';

export const getCCLogStart = (logId: string, getQuery: CCLogQuery) => ({
  type: types.getCCLogStart,
  payload: { logId, getQuery },
});
export const getCCLogSucceed = (logId: string, cclogs: CCLogs) => ({
  type: types.getCCLogSucceed,
  payload: { logId, cclogs },
});
export const getCCLogFail = (logId: string, error: object) => ({
  type: types.getCCLogFail,
  payload: { logId, error },
});

export const addCCLogStart = (logId: string, cclog: CCLogQuery, getQuery: CCLogQuery) => ({
  type: types.addCCLogStart,
  payload: { logId, cclog, getQuery },
});
export const addCCLogSucceed = (logId: string, cclogs: CCLogs) => ({
  type: types.addCCLogSucceed,
  payload: { logId, cclogs },
});
export const addCCLogFail = (logId: string, error: object) => ({
  type: types.addCCLogFail,
  payload: { logId, error },
});

export const deleteCCLogStart = (logId: string, deleteQuery: CCLogQuery, getQuery: CCLogQuery) => ({
  type: types.deleteCCLogStart,
  payload: { logId, deleteQuery, getQuery },
});
export const deleteCCLogSucceed = (logId: string, cclogs: CCLogs) => ({
  type: types.deleteCCLogSucceed,
  payload: { logId, cclogs },
});
export const deleteCCLogFail = (logId: string, error: object) => ({
  type: types.deleteCCLogFail,
  payload: { logId, error },
});
