import types from './types'

export const checkAuthStart = () => ({
  type: types.checkAuthStart,
});
export const checkAuthSucceed = () => ({
  type: types.checkAuthSucceed,
});
export const checkAuthFail = (error: object) => ({
  type: types.checkAuthFail,
  payload: { error },
});
export const loginAuthStart = (loginID: string, password: string) => ({
  type: types.loginAuthStart,
  payload: { loginID, password },
});
export const loginAuthSucceed = (sessionID: string, isAuth: boolean, userID: string, privilege: []) => ({
  type: types.loginAuthSucceed,
  payload: { sessionID, isAuth, userID, privilege },
});
export const loginAuthFail = (error: object) => ({
  type: types.loginAuthFail,
  payload: { error },
});
export const logoutAuthStart = () => ({
  type: types.logoutAuthStart,
});
export const logoutAuthSucceed = () => ({
  type: types.logoutAuthSucceed,
});
export const logoutAuthFail = (error: object) => ({
  type: types.logoutAuthFail,
  payload: { error },
});
