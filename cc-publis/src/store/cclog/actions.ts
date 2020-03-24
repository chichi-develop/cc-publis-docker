import types from './types'
import { CCLogs, CCLogQuery } from '../../types/models';

export const getCCLogStart = (getQuery: CCLogQuery) => ({
  type: types.getCCLogStart,
  payload: { getQuery },
});
export const getCCLogSucceed = (logId: string, cclogs: CCLogs) => ({
  type: types.getCCLogSucceed,
  payload: { logId, cclogs },
});
export const getCCLogFail = (logId: string, error: object) => ({
  type: types.getCCLogFail,
  payload: { logId, error },
});

export const addCCLogStart = (cclog: CCLogQuery, getQuery: CCLogQuery) => ({
  type: types.addCCLogStart,
  payload: { cclog, getQuery },
});
export const addCCLogSucceed = (logId: string, cclogs: CCLogs) => ({
  type: types.addCCLogSucceed,
  payload: { logId, cclogs },
});
export const addCCLogFail = (logId: string, error: object) => ({
  type: types.addCCLogFail,
  payload: { logId, error },
});

export const deleteCCLogStart = (deleteQuery: CCLogQuery, getQuery: CCLogQuery) => ({
  type: types.deleteCCLogStart,
  payload: { deleteQuery, getQuery },
});
export const deleteCCLogSucceed = (logId: string, cclogs: CCLogs) => ({
  type: types.deleteCCLogSucceed,
  payload: { logId, cclogs },
});
export const deleteCCLogFail = (logId: string, error: object) => ({
  type: types.deleteCCLogFail,
  payload: { logId, error },
});
