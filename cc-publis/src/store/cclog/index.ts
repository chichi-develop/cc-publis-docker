import { Actions } from '../actions'
import types from './types';
import { CCLogs } from '../../types/models';

// TODO: show をとる

interface State {
  showCstmDetailLogs: CCLogs;
  editCstmDetailLogs: CCLogs;
  isLoading: boolean;
  isUpdating: boolean;
  error: {};
}

export const initialState = (injects?: State): State => ({
  showCstmDetailLogs: [],
  editCstmDetailLogs: [],
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
        // action.payload.logId === 'showCstmDetailLog' && { showCstmDetailLogs: action.payload.cclogs.slice(0, 30)},
        action.payload.logId === 'showCstmDetailLog' && { showCstmDetailLogs: action.payload.cclogs },
        action.payload.logId === 'editCstmDetailLog' && { editCstmDetailLogs: action.payload.cclogs },
      );
    case types.getCCLogFail:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.payload.error,
      },
        action.payload.logId === 'showCstmDetailLog' && { showCstmDetailLogs: [] },
        action.payload.logId === 'editCstmDetailLog' && { editCstmDetailLogs: [] },
      );

    case types.addCCLogStart:
      return Object.assign({}, state, { isUpdating: true, error: {} });
    case types.addCCLogSucceed:
      return Object.assign({}, state, {
        isUpdating: false,
        error: {},
      },
        // action.payload.logId === 'showCstmDetailLog' && { showCstmDetailLogs: action.payload.cclogs.slice(0, 30)},
        action.payload.logId === 'showCstmDetailLog' && { showCstmDetailLogs: action.payload.cclogs },
        action.payload.logId === 'editCstmDetailLog' && { editCstmDetailLogs: action.payload.cclogs },
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
        // action.payload.logId === 'showCstmDetailLog' && { showCstmDetailLogs: action.payload.cclogs.slice(0, 30)},
        action.payload.logId === 'showCstmDetailLog' && { showCstmDetailLogs: action.payload.cclogs },
        action.payload.logId === 'editCstmDetailLog' && { editCstmDetailLogs: action.payload.cclogs },
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
