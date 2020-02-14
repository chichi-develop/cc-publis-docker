import { Actions } from '../actions'
import types from './types';

import { Privilege } from "../../types/models";

interface State {
  sessionID: string;
  isAuth: boolean;
  userID: string;
  privilege: Privilege;
  isLoading: boolean;
  error: {};
}

export const initialState = (injects?: State): State => ({
  sessionID: "",
  isAuth: false,
  userID: "",
  privilege: {},
  isLoading: false,
  error: {},
  ...injects,
});

export const reducer = (state = initialState(), action: Actions): State => {
  switch (action.type) {

    case types.checkAuthStart:
      return Object.assign({}, state, {
        isLoading: true,
        error: {},
      });
    case types.checkAuthSucceed:
      return Object.assign({}, state, {
        isLoading: false,
        error: {},
      });
    case types.checkAuthFail:
      return Object.assign({}, state, {
        sessionID: "",
        isAuth: false,
        privilege: {},
        isLoading: false,
        error: action.payload.error,
      });
    case types.loginAuthStart:
      return Object.assign({}, state, {
        isAuth: false,
        privilege: {},
        isLoading: true,
        error: {},
      });
    case types.loginAuthSucceed:
      return Object.assign({}, state, {
        sessionID: action.payload.sessionID,
        isAuth: true,
        userID: action.payload.userID,
        privilege: action.payload.privilege,
        isLoading: false,
        error: {},
      });
    case types.loginAuthFail:
      return Object.assign({}, state, {
        sessionID: "",
        isAuth: false,
        userID: "",
        privilege: {},
        isLoading: false,
        error: action.payload.error,
      });
    case types.logoutAuthStart:
      return Object.assign({}, state, {
        isAuth: false,
        userID: "",
        privilege: {},
        isLoading: true,
        error: {},
      });
    case types.logoutAuthSucceed:
      return Object.assign({}, state, {
        isAuth: false,
        userID: "",
        privilege: {},
        isLoading: false,
        error: {},
      });
    case types.logoutAuthFail:
      return Object.assign({}, state, {
        isAuth: false,
        userID: "",
        privilege: {},
        isLoading: false,
        error: action.payload.error,
      });
    default:
      return state;
  }
};
