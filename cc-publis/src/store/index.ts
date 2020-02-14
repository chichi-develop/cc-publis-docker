import { createStore, Store, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import { initialState, rootReducer } from './reducer'
import logger from "redux-logger";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/rootSaga";
import confirmMiddleware from "../middleware/confirm";
import { PersistPartial } from 'redux-persist/es/persistReducer';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [logger, thunk, confirmMiddleware, sagaMiddleware];

export type StoreState = ReturnType<typeof initialState>
export type ReduxStore = Store<StoreState> & PersistPartial

export function initStore(state = initialState()) {
  const store = createStore(rootReducer, state, composeWithDevTools(applyMiddleware(...middlewares)))
  const pstore = persistStore(store)
  sagaMiddleware.run(rootSaga);
  return { store, pstore }
}
