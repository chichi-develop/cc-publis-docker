import { call, put, takeLatest } from 'redux-saga/effects';
import Types from '../../store/aclg/types'
import * as Actions from '../../store/aclg/actions';
import { getAclgsFactory } from './aclgApi';

function* runGetAclgs(action: ReturnType<typeof Actions.getAclgsStart>) {
  const { cdcstm } = action.payload;
  try {
    // TODO: TS データかエラーが返ってくる場合にはどう型を付けるべきか
    const aclgs = yield call(getAclgsFactory, cdcstm);
    console.log('getAclgs OK!!!');
    console.log(aclgs);

    const persistAclg = localStorage.getItem("persist:aclg");
    if (persistAclg) {
      var { searchHistory } = JSON.parse(persistAclg);
      searchHistory = searchHistory.replace('[', '').replace(']', '').replace(/"/g, '').split(',')
    }
    if (searchHistory) {
      searchHistory = [cdcstm].concat(searchHistory).slice(0, 30)
    } else {
      searchHistory = [cdcstm]
    }

    yield put({
      type: Types.getAclgsSucceed,
      payload: {
        searchHistory: searchHistory.filter(Boolean),
        aclgs,
      },
    });
  } catch (error) {
    yield put({
      type: Types.getAclgsFail,
      payload: {
        showListAclgs: error.status !== 404,
        error,
      },
    });
  }
}

export function* watchGetAclgs() {
  yield takeLatest(Types.getAclgsStart, runGetAclgs);
}
