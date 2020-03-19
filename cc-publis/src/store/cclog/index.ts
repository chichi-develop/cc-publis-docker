import { Actions } from '../actions'
import types from './types';
import { CCLogs } from '../../types/models';

interface State {
  cstmDetailHistory: CCLogs;
  showCstmDetailHistory: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  error: {};
}

export const initialState = (injects?: State): State => ({
  cstmDetailHistory: [],
  showCstmDetailHistory: false,
  isLoading: false,
  isUpdating: false,
  error: {},
  ...injects,
});

export const reducer = (state = initialState(), action: Actions): State => {
  switch (action.type) {
    case types.getCCLogStart:
      return Object.assign({}, state, { isLoading: true, error: {}, });
    case types.getCCLogSucceed:
      return Object.assign({}, state, { isLoading: false, error: {} },
        // action.payload.logId === 'cstmDetailHistory' && { cstmDetailHistory: action.payload.cclogs.slice(0, 30), showCstmDetailHistory: true },
        action.payload.logId === 'cstmDetailHistory' && { cstmDetailHistory: action.payload.cclogs, showCstmDetailHistory: true },
      );
    case types.getCCLogFail:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.payload.error,
      },
        action.payload.logId === 'cstmDetailHistory' && { cstmDetailHistory: [], showCstmDetailHistory: false },
      );

    case types.addCCLogStart:
      return Object.assign({}, state, { isUpdating: true, error: {} });
    case types.addCCLogSucceed:
      return Object.assign({}, state, {
        isUpdating: false,
        error: {},
      },
        // action.payload.logId === 'cstmDetailHistory' && { cstmDetailHistory: action.payload.cclogs.slice(0, 30), showCstmDetailHistory: true },
        action.payload.logId === 'cstmDetailHistory' && { cstmDetailHistory: action.payload.cclogs, showCstmDetailHistory: true },
      );
    case types.addCCLogFail:
      return Object.assign({}, state, {
        isUpdating: false,
        error: action.payload.error,
      });

    case types.deleteCCLogStart:
      return Object.assign({}, state, { isUpdating: true, error: {} });
    case types.deleteCCLogSucceed:
      return Object.assign({}, state, {
        isUpdating: false,
        error: {},
      },
        // action.payload.logId === 'cstmDetailHistory' && { cstmDetailHistory: action.payload.cclogs.slice(0, 30), showCstmDetailHistory: true },
        action.payload.logId === 'cstmDetailHistory' && { cstmDetailHistory: action.payload.cclogs, showCstmDetailHistory: true },
      );
    case types.deleteCCLogFail:
      return Object.assign({}, state, {
        isUpdating: false,
        error: action.payload.error,
      });

    default:
      return state;
  }
};
