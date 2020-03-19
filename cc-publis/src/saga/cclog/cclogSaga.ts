import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import Types from '../../store/cclog/types';
import { Actions } from '../../store/actions';
import { getCCLogFactory, addCCLogFactory, deleteCCLogFactory } from './cclogApi';

function* runGetCCLog(action: ReturnType<typeof Actions.getCCLogStart>) {
  const { logId, getQuery } = action.payload;
  try {
    // TODO: TS データかエラーが返ってくる場合にはどう型を付けるべきか
    const cclogs = yield call(getCCLogFactory, getQuery);
    console.log('getCCLog OK!!!');
    console.log(cclogs);

    yield put({
      type: Types.getCCLogSucceed,
      payload: {
        logId: logId,
        cclogs: cclogs,
      },
    });
  } catch (error) {
    console.log(error)
    yield put({ type: Types.getCCLogFail, payload: { logId: logId, error: error } });
  }
}

export function* watchGetCCLog() {
  // yield takeLatest(Types.getCCLogStart, runGetCCLog);
  yield takeEvery(Types.getCCLogStart, runGetCCLog);
}

function* runAddCCLog(action: ReturnType<typeof Actions.addCCLogStart>) {
  const { logId, cclog, getQuery } = action.payload;
  try {
    // TODO: TS データかエラーが返ってくる場合にはどう型を付けるべきか
    const cclogs = yield call(addCCLogFactory, cclog, getQuery);
    yield put({
      type: Types.addCCLogSucceed,
      payload: {
        logId: logId,
        cclogs: cclogs
      }
    });
  } catch (error) {
    yield put({
      type: Types.addCCLogFail,
      payload: {
        logId: logId,
        error: error
      },
    });
  }
}

export function* watchAddCCLog() {
  yield takeLatest(Types.addCCLogStart, runAddCCLog);
}

function* runDeleteCCLog(action: ReturnType<typeof Actions.deleteCCLogStart>) {
  const { logId, deleteQuery, getQuery } = action.payload;
  try {
    // TODO: TS データかエラーが返ってくる場合にはどう型を付けるべきか
    const cclogs = yield call(deleteCCLogFactory, deleteQuery, getQuery);
    yield put({
      type: Types.deleteCCLogSucceed,
      payload: {
        logId: logId,
        cclogs: cclogs
      }
    });
  } catch (error) {
    yield put({
      type: Types.deleteCCLogFail,
      payload: {
        logId: logId,
        error: error
      },
    });
  }
}

export function* watchDeleteCCLog() {
  yield takeLatest(Types.deleteCCLogStart, runDeleteCCLog);
}

