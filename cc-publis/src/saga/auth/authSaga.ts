import { call, put, takeLatest } from "redux-saga/effects";
import Types from "../../store/auth/types";
import { Auth } from "../../types/models";
import { Actions } from "../../store/actions";
import { loginAuthApi } from "./authApi";
import { logoutAuthApi } from "./authApi";

// function* runCheckAuth(action: ReturnType<typeof Actions.checkAuthStart>) {
//   try {
//     // TODO: TS データかエラーが返ってくる場合にはどう型を付けるべきか
//     const auth: Auth = yield call(checkAuthApi);
//     console.log('checkAuth OK!!!');
//     yield put({
//       type: Types.checkAuthSucceed,
//       payload: {
//         sessionID: auth.sessionID,
//         isAuth: auth.isAuthenticated,
//         privilege: auth.privilege,
//       },
//     });
//   } catch (error) {
//     yield put({
//       type: Types.checkAuthFail,
//       payload: {
//         error,
//       },
//     });
//   }
// }

function* runLoginAuth(action: ReturnType<typeof Actions.loginAuthStart>) {
  const { loginID, password } = action.payload;
  try {
    // TODO: TS データかエラーが返ってくる場合にはどう型を付けるべきか
    const auth: Auth = yield call(loginAuthApi, loginID, password);
    if (auth.sessionID === undefined) {
      let err;
      if (auth.error !== undefined) {
        err = auth.error;
      } else {
        err = { ...auth };
      }

      yield put({
        type: Types.loginAuthFail,
        payload: {
          error: err
        }
      });
    } else {
      yield put({
        type: Types.loginAuthSucceed,
        payload: {
          sessionID: auth.sessionID,
          isAuth: auth.isAuthenticated,
          userID: auth.email,
          privilege: auth.privilege
        }
      });
    }
  } catch (error) {
    yield put({
      type: Types.loginAuthFail,
      payload: {
        error
      }
    });
  }
}

function* runLogoutAuth(action: ReturnType<typeof Actions.logoutAuthStart>) {
  try {
    // TODO: TS データかエラーが返ってくる場合にはどう型を付けるべきか
    const res = yield call(logoutAuthApi);
    console.log("logoutAuth OK!!!");
    console.log(res);
    yield put({
      type: Types.logoutAuthSucceed
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: Types.logoutAuthFail,
      payload: {
        error
      }
    });
  }
}

export function* watchLoginAuth() {
  yield takeLatest(Types.loginAuthStart, runLoginAuth);
  yield takeLatest(Types.logoutAuthStart, runLogoutAuth);
}
