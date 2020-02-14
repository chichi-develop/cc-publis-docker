import { Actions } from '../actions'
import types from './types';
import { Aclgs } from '../../types/models';

interface State {
  cm_aclgs: Aclgs | [];
  showListAclgs: boolean;
  // clearSortFilter: boolean;
  searchHistory: [];
  error: {};
}

export const initialState = (injects?: State): State => ({
  // eslint-disable-next-line @typescript-eslint/camelcase
  cm_aclgs: [],
  showListAclgs: false,
  // showList: true,
  // isLoading: false,
  // isUpdating: false,
  // clearSortFilter: true,
  searchHistory: [],
  error: {},
  ...injects,
});

export const reducer = (state = initialState(), action: Actions): State => {
  switch (action.type) {

    case types.getAclgsStart:
      return Object.assign({}, state, {
        // showListAclgs: false,
        isLoading: true,
        error: {},
      });
    case types.getAclgsSucceed:
      return Object.assign({}, state, {
        ...action.payload.aclgs,
        showListAclgs: true,
        // searchHistory: [
        //   action.payload.searchHistory,
        //   state.searchHistory,
        // ].slice(0, 30),
        searchHistory: action.payload.searchHistory,
        isLoading: false,
        error: {},
      });
    case types.getAclgsFail:
      return Object.assign({}, state, {
        // eslint-disable-next-line @typescript-eslint/camelcase
        cm_aclgs: {},
        showListAclgs: false,
        isLoading: false,
        error: action.payload.error,
      });

    default:
      return state;
  }
};
