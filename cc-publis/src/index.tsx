import React from "react";
import ReactDOM from "react-dom";
import { initStore } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./store/reducer";
import "./index.css";
import App from "./App";

const { store, pstore } = initStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PersistGate loading={<p>loading...</p>} persistor={pstore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
