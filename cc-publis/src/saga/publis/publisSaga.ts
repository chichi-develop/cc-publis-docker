import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import Types from '../../store/publis/types'
import { Actions } from '../../store/actions';
import {
  getCstmFactory,
  deleteCstmFactory,
  editCstmFactory,
  addCstmFactory,
  getCsmmFactory,
  getCtzhFactory,
  getKiykFactory,
  getKyzdFactory,
  getKyzhFactory,
  getGycmFactory,
} from './publisApi';

import { Kiyk, KiykList } from "../../types/models";

function* runGetCstm(action: ReturnType<typeof Actions.getCstmStart>) {
  const { columnName, key } = action.payload;
  try {
    // TODO: TS データかエラーが返ってくる場合にはどう型を付けるべきか
    const cstms = yield call(getCstmFactory, columnName, key);
    console.log('getCstm OK!!!');
    console.log(cstms);

    const persistPublis = localStorage.getItem("persist:publis");
    if (persistPublis) {
      var { searchHistory } = JSON.parse(persistPublis);
      searchHistory = searchHistory.replace('[', '').replace(']', '').replace(/"/g, '').split(',')
    }
    if (searchHistory) {
      searchHistory = [key].concat(searchHistory).slice(0, 30)
    } else {
      searchHistory = [key]
    }

    yield put({
      type: Types.getCstmSucceed,
      payload: {
        searchHistory: searchHistory.filter(Boolean),
        cstms,
        cstm: cstms.cstms[0],
      },
    });
  } catch (error) {
    console.log(error)
    yield put({ type: Types.getCstmFail, payload: { error } });
  }
}

export function* watchGetCstm() {
  // yield takeLatest(Types.getCstmStart, runGetCstm);
  yield takeEvery(Types.getCstmStart, runGetCstm);
}

function* runDeleteCstm(action: ReturnType<typeof Actions.deleteCstmStart>) {
  const { cdcstm } = action.payload;
  try {
    // TODO: TS データかエラーが返ってくる場合にはどう型を付けるべきか
    const cstms = yield call(deleteCstmFactory, cdcstm);
    yield put({
      type: Types.deleteCstmSucceed,
      payload: { cstms },
    });
  } catch (error) {
    yield put({
      type: Types.deleteCstmFail,
      payload: {
        showListCstm: error.status !== 404,
        error,
      },
    });
  }
}

export function* watchDeleteCstm() {
  yield takeLatest(Types.deleteCstmStart, runDeleteCstm);
}

function* runEditCstm(action: ReturnType<typeof Actions.editCstmStart>) {
  const { cdcstm, cstm } = action.payload;
  try {
    // TODO: TS データかエラーが返ってくる場合にはどう型を付けるべきか
    const cstms = yield call(editCstmFactory, cdcstm, cstm);
    console.log(cstms)
    yield put({
      type: Types.editCstmSucceed,
      payload: { cstms },
    });
  } catch (error) {
    yield put({
      type: Types.editCstmFail,
      payload: { error },
    });
  }
}

export function* watchEditCstm() {
  yield takeLatest(Types.editCstmStart, runEditCstm);
}

function* runAddCstm(action: ReturnType<typeof Actions.addCstmStart>) {
  const { cdcstm, cstm } = action.payload;
  try {
    // TODO: TS データかエラーが返ってくる場合にはどう型を付けるべきか
    const cstms = yield call(addCstmFactory, cdcstm, cstm);
    yield put({
      type: Types.addCstmSucceed,
      payload: { cstms },
    });
  } catch (error) {
    yield put({
      type: Types.addCstmFail,
      payload: { error },
    });
  }
}

export function* watchAddCstm() {
  yield takeLatest(Types.addCstmStart, runAddCstm);
}

function* runGetCsmm(action: ReturnType<typeof Actions.getCsmmStart>) {
  const { cdcstm } = action.payload;
  try {
    // TODO: TS データかエラーが返ってくる場合にはどう型を付けるべきか
    const csmms = yield call(getCsmmFactory, cdcstm);
    console.log('getCsmm OK!!!');
    console.log(csmms);

    yield put({
      type: Types.getCsmmSucceed,
      payload: {
        csmms,
      },
    });
  } catch (error) {
    yield put({ type: Types.getCsmmFail, payload: { error } });
  }
}

export function* watchGetCsmm() {
  yield takeLatest(Types.getCsmmStart, runGetCsmm);
}



function* runGetCtzh(action: ReturnType<typeof Actions.getCtzhStart>) {
  const { cdcstm } = action.payload;
  try {
    // TODO: TS データかエラーが返ってくる場合にはどう型を付けるべきか
    const ctzhs = yield call(getCtzhFactory, cdcstm);
    console.log('getCtzh OK!!!');
    console.log(ctzhs);

    yield put({
      type: Types.getCtzhSucceed,
      payload: {
        ctzhs,
      },
    });
  } catch (error) {
    yield put({ type: Types.getCtzhFail, payload: { error } });
  }
}

export function* watchGetCtzh() {
  yield takeLatest(Types.getCtzhStart, runGetCtzh);
}

function* runGetKiyk(action: ReturnType<typeof Actions.getKiykStart>) {
  const { columnName, key } = action.payload;
  try {
    // TODO: TS データかエラーが返ってくる場合にはどう型を付けるべきか
    const ret = yield call(getKiykFactory, columnName, key);
    console.log('getKiyk OK!!!');
    console.log(`columnName:${columnName}`);
    console.log(`key:${key}`);
    console.log(ret);

    let kiyks = JSON.parse(JSON.stringify(ret.kiyks));

    kiyks.map((obj: Kiyk & KiykList, index: number) =>
      Object.keys(obj).map((k) => {
        if (k.slice(2, 7) === "LIST_") {
          delete kiyks[index][k]
        }
        return true
      })
    );

    let kiykLists = JSON.parse(JSON.stringify(ret.kiyks));

    kiykLists.map((obj: Kiyk & KiykList, index: number) =>
      Object.keys(obj).map((k) => {
        if (k.slice(2, 7) !== "LIST_") {
          delete kiykLists[index][k]
        }
        return true
      })
    );

    yield put({
      type: Types.getKiykSucceed,
      payload: {
        kiyks: kiyks,
        kiyk: kiyks[0],
        kiykLists: kiykLists,
      },
    });
  } catch (error) {
    yield put({ type: Types.getKiykFail, payload: { error } });
  }
}

export function* watchGetKiyk() {
  yield takeLatest(Types.getKiykStart, runGetKiyk);
}


function* runGetKiykCstm(action: ReturnType<typeof Actions.getKiykCstmStart>) {
  const { cdsqsk, cdshsk } = action.payload;
  try {
    // TODO: TS データかエラーが返ってくる場合にはどう型を付けるべきか
    // const sqsks = yield call(getCstmFactory, 'ct_cdcstm', cdsqsk);
    // const shsks = yield call(getCstmFactory, 'ct_cdcstm', cdshsk);
    var sqsks, shsks
    Promise.all([
      sqsks = yield call(getCstmFactory, 'ct_cdcstm', cdsqsk),
      shsks = yield call(getCstmFactory, 'ct_cdcstm', cdshsk)
    ]).then()
    console.log('getKiykCstm OK!!!');

    yield put({
      type: Types.getKiykCstmSucceed,
      payload: {
        sqsk: sqsks.cstms[0],
        shsk: shsks.cstms[0],
      },
    });
  } catch (error) {
    yield put({ type: Types.getKiykCstmFail, payload: { error } });
  }
}

export function* watchGetKiykCstm() {
  yield takeLatest(Types.getKiykCstmStart, runGetKiykCstm);
}

function* runGetKyzd(action: ReturnType<typeof Actions.getKyzdStart>) {
  const { nokiyk } = action.payload;
  try {
    // TODO: TS データかエラーが返ってくる場合にはどう型を付けるべきか
    const kyzd = yield call(getKyzdFactory, nokiyk);
    console.log('getKyzd OK!!!');
    console.log(kyzd);

    yield put({
      type: Types.getKyzdSucceed,
      payload: {
        kyzd: kyzd[0],
      },
    });
  } catch (error) {
    yield put({ type: Types.getKyzdFail, payload: { error } });
  }
}

export function* watchGetKyzd() {
  yield takeLatest(Types.getKyzdStart, runGetKyzd);
}


function* runGetKyzh(action: ReturnType<typeof Actions.getKyzhStart>) {
  const { nokiyk } = action.payload;
  try {
    // TODO: TS データかエラーが返ってくる場合にはどう型を付けるべきか
    const kyzhs = yield call(getKyzhFactory, nokiyk);
    console.log('getKyzh OK!!!');
    console.log(kyzhs);

    yield put({
      type: Types.getKyzhSucceed,
      payload: {
        kyzhs
      },
    });
  } catch (error) {
    yield put({ type: Types.getKyzhFail, payload: { error } });
  }
}

export function* watchGetKyzh() {
  yield takeLatest(Types.getKyzhStart, runGetKyzh);
}

function* runGetGycm(action: ReturnType<typeof Actions.getGycmStart>) {
  try {
    // TODO: TS データかエラーが返ってくる場合にはどう型を付けるべきか
    const gycms = yield call(getGycmFactory);
    console.log('getGycm OK!!!');
    console.log(gycms);

    yield put({
      type: Types.getGycmSucceed,
      payload: {
        ...gycms
      },
    });
  } catch (error) {
    yield put({ type: Types.getGycmFail, payload: { error } });
  }
}

export function* watchGetGycm() {
  yield takeLatest(Types.getGycmStart, runGetGycm);
}
