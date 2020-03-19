import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

import * as Auth from './auth'
import * as Mdmm from './mdmm'
import * as Aclg from './aclg'
import * as Publis from './publis'
import * as CCLog from './cclog'
import { PersistPartial } from 'redux-persist/es/persistReducer';

export const history = createBrowserHistory();

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth', 'mdmm', 'aclg', 'publis', 'router'],
};

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['sessionId', 'privilege'],
};

const mdmmPersistConfig = {
  key: 'mdmm',
  storage,
  whitelist: ['searchHistory'],
};

const aclgPersistConfig = {
  key: 'aclg',
  storage,
  whitelist: ['searchHistory'],
};

const publisPersistConfig = {
  key: 'cstm',
  storage,
  whitelist: ['searchHistory'],
};

const reducer = combineReducers({
  auth: persistReducer(authPersistConfig, Auth.reducer),
  mdmm: persistReducer(mdmmPersistConfig, Mdmm.reducer),
  aclg: persistReducer(aclgPersistConfig, Aclg.reducer),
  publis: persistReducer(publisPersistConfig, Publis.reducer),
  cclog: CCLog.reducer,
  router: connectRouter(history),
});

type AuthType = ReturnType<typeof Auth.initialState> & PersistPartial
type MdmmType = ReturnType<typeof Mdmm.initialState> & PersistPartial
type AclgType = ReturnType<typeof Aclg.initialState> & PersistPartial
type PublisType = ReturnType<typeof Publis.initialState> & PersistPartial
type CCLogType = ReturnType<typeof CCLog.initialState>

export function initialState() {
  return {
    auth: Auth.initialState() as AuthType,
    mdmm: Mdmm.initialState() as MdmmType,
    aclg: Aclg.initialState() as AclgType,
    publis: Publis.initialState() as PublisType,
    cclog: CCLog.initialState() as CCLogType,
  }
}

export const rootReducer = persistReducer(rootPersistConfig, reducer);
