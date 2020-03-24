import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import Types from '../../store/cclog/types';
import { Actions } from '../../store/actions';
import { getCCLogFactory, addCCLogFactory, deleteCCLogFactory } from './cclogApi';

function* runGetCCLog(action: ReturnType<typeof Actions.getCCLogStart>) {
  const { getQuery } = action.payload;
  try {
    // TODO: TS データかエラーが返ってくる場合にはどう型を付けるべきか
    const cclogs = yield call(getCCLogFactory, getQuery);
    console.log('getCCLog OK!!!');
    console.log(cclogs);

    yield put({
      type: Types.getCCLogSucceed,
      payload: {
        logId: getQuery.logId,
        cclogs: cclogs,
      },
    });
  } catch (error) {
    console.log(error)
    yield put({ type: Types.getCCLogFail, payload: { logId: getQuery.logId, error: error } });
  }
}

export function* watchGetCCLog() {
  // yield takeLatest(Types.getCCLogStart, runGetCCLog);
  yield takeEvery(Types.getCCLogStart, runGetCCLog);
}

function* runAddCCLog(action: ReturnType<typeof Actions.addCCLogStart>) {
  const { cclog, getQuery } = action.payload;
  try {
    // TODO: TS データかエラーが返ってくる場合にはどう型を付けるべきか
    const cclogs = yield call(addCCLogFactory, cclog, getQuery);
    yield put({
      type: Types.addCCLogSucceed,
      payload: {
        logId: cclog.logId,
        cclogs: cclogs
      }
    });
  } catch (error) {
    yield put({
      type: Types.addCCLogFail,
      payload: {
        logId: cclog.logId,
        error: error
      },
    });
  }
}

export function* watchAddCCLog() {
  yield takeLatest(Types.addCCLogStart, runAddCCLog);
}

function* runDeleteCCLog(action: ReturnType<typeof Actions.deleteCCLogStart>) {
  const { deleteQuery, getQuery } = action.payload;
  try {
    const cclogs = yield call(deleteCCLogFactory, deleteQuery, getQuery);
    yield put({
      type: Types.deleteCCLogSucceed,
      payload: {
        logId: deleteQuery.logId,
        cclogs: cclogs
      }
    });
  } catch (error) {
    yield put({
      type: Types.deleteCCLogFail,
      payload: {
        logId: deleteQuery.logId,
        error: error
      },
    });
  }
}

export function* watchDeleteCCLog() {
  yield takeLatest(Types.deleteCCLogStart, runDeleteCCLog);
}

