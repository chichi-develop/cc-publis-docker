import { all, fork } from 'redux-saga/effects';
import { watchLoginAuth } from './auth/authSaga';
import { watchGetAclgs } from './aclg/aclgSaga';
import { watchGetMdmms } from './mdmm/mdmmSaga';
import { watchDeleteMdmms } from './mdmm/mdmmSaga';
import { watchEditMdmms } from './mdmm/mdmmSaga';
import { watchAddMdmms } from './mdmm/mdmmSaga';
import { watchGetCstm } from './publis/publisSaga';
import { watchEditCstm } from './publis/publisSaga';
import { watchGetCsmm } from './publis/publisSaga';
import { watchGetCtzh } from './publis/publisSaga';
import { watchGetKiyk } from './publis/publisSaga';
import { watchGetKiykCstm } from './publis/publisSaga';
import { watchGetKyzd } from './publis/publisSaga';
import { watchGetKyzh } from './publis/publisSaga';
import { watchGetGycm } from './publis/publisSaga';
import { watchGetCCLog } from './cclog/cclogSaga';
import { watchAddCCLog } from './cclog/cclogSaga';


export default function* rootSaga() {
  yield all([
    fork(watchLoginAuth),
    fork(watchGetAclgs),
    fork(watchGetMdmms),
    fork(watchDeleteMdmms),
    fork(watchEditMdmms),
    fork(watchAddMdmms),
    fork(watchGetCstm),
    fork(watchEditCstm),
    fork(watchGetCsmm),
    fork(watchGetCtzh),
    fork(watchGetKiyk),
    fork(watchGetKiykCstm),
    fork(watchGetKyzd),
    fork(watchGetKyzh),
    fork(watchGetGycm),
    fork(watchGetCCLog),
    fork(watchAddCCLog),
  ]);
}
