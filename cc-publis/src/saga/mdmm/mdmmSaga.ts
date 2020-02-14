import { call, put, takeLatest } from 'redux-saga/effects';
import Types from '../../store/mdmm/types'
import { Actions } from '../../store/actions';
import {
  getMdmmsFactory,
  deleteMdmmsFactory,
  editMdmmsFactory,
  addMdmmsFactory,
} from './mdmmApi';

function* runGetMdmms(action: ReturnType<typeof Actions.getMdmmsStart>) {
  const { cdcstm } = action.payload;
  try {
    // TODO: TS データかエラーが返ってくる場合にはどう型を付けるべきか
    const mdmms = yield call(getMdmmsFactory, cdcstm);
    console.log('getMdmms OK!!!');
    console.log(mdmms);

    const persistMdmm = localStorage.getItem("persist:mdmm");
    if (persistMdmm) {
      var { searchHistory } = JSON.parse(persistMdmm);
      searchHistory = searchHistory.replace('[', '').replace(']', '').replace(/"/g, '').split(',')
    }
    if (searchHistory) {
      searchHistory = [cdcstm].concat(searchHistory).slice(0, 30)
    } else {
      searchHistory = [cdcstm]
    }

    yield put({
      type: Types.getMdmmsSucceed,
      payload: {
        searchHistory: searchHistory.filter(Boolean),
        mdmms,
      },
    });
  } catch (error) {
    yield put({ type: Types.getMdmmsFail, payload: { error } });
  }
}

export function* watchGetMdmms() {
  yield takeLatest(Types.getMdmmsStart, runGetMdmms);
}

function* runDeleteMdmms(action: ReturnType<typeof Actions.deleteMdmmsStart>) {
  const { cdcstm, nommrb } = action.payload;
  try {
    // TODO: TS データかエラーが返ってくる場合にはどう型を付けるべきか
    const mdmms = yield call(deleteMdmmsFactory, cdcstm, nommrb);
    yield put({
      type: Types.deleteMdmmsSucceed,
      // mdmms: mdmms.cm_mdmms,
      payload: { mdmms },
    });
  } catch (error) {
    yield put({
      type: Types.deleteMdmmsFail,
      payload: {
        showListMdmms: error.status !== 404,
        error,
      },
    });
  }
}

export function* watchDeleteMdmms() {
  yield takeLatest(Types.deleteMdmmsStart, runDeleteMdmms);
}

function* runEditMdmms(action: ReturnType<typeof Actions.editMdmmsStart>) {
  const { cdcstm, nommrb, mdmm } = action.payload;
  try {
    // TODO: TS データかエラーが返ってくる場合にはどう型を付けるべきか
    const mdmms = yield call(editMdmmsFactory, cdcstm, nommrb, mdmm);
    yield put({
      type: Types.editMdmmsSucceed,
      // payload: { mdmms: mdmms.cm_mdmms },
      payload: { mdmms },
    });
  } catch (error) {
    yield put({
      type: Types.editMdmmsFail,
      payload: { error },
    });
  }
}

export function* watchEditMdmms() {
  yield takeLatest(Types.editMdmmsStart, runEditMdmms);
}

function* runAddMdmms(action: ReturnType<typeof Actions.addMdmmsStart>) {
  const { mdmm } = action.payload;
  try {
    // TODO: TS データかエラーが返ってくる場合にはどう型を付けるべきか
    const mdmms = yield call(addMdmmsFactory, mdmm);
    yield put({
      type: Types.addMdmmsSucceed,
      payload: { mdmms },
    });
  } catch (error) {
    yield put({
      type: Types.addMdmmsFail,
      payload: { error },
    });
  }
}

export function* watchAddMdmms() {
  yield takeLatest(Types.addMdmmsStart, runAddMdmms);
}
