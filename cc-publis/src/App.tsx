import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "./store/actions";
import { StoreState } from "./store";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

import Helmet from "react-helmet";

import NavigationBar from "./components/Common/NavigationBar";
import Login from "./components/Login/Login";
import CstmPage from "./components/CstmPage/CstmPage";
import KiykListPage from "./components/KiykListPage/KiykListPage";
import KiykDetailPage from "./components/KiykDetailPage/KiykDetailPage";
import Footer from "./components/Common/Footer";

import "./App.css";

const App: React.FC = () => {
  const title = "「致知」顧客情報参照システム";
  const footerText = "Chichi Publishing Co.,Ltd. © 2020";

  const authState = useSelector((state: StoreState) => state.auth);
  const dispatch = useDispatch();

  const loginAuth = useCallback(
    (loginID: string, password: string) =>
      dispatch(Actions.loginAuthStart(loginID, password)),
    [dispatch]
  );

  const logoutAuth = useCallback(() => dispatch(Actions.logoutAuthStart()), [
    dispatch
  ]);

  useEffect(() => {
    console.log("App render!");
    return () => console.log("App unmounting...");
  }, []);

  return (
    <div className="app">
      <Helmet htmlAttributes={{ lang: "ja" }}>
        <title>{title}</title>
      </Helmet>

      <NavigationBar
        title={title}
        isAuth={authState.isAuth}
        logoutAuth={logoutAuth}
      />

      <div className="app-body">
        {/* {!authState.isAuth || !authState.privilege.viewPublis ? ( */}
        {!true ? (
          <>
            <Redirect to={"/"} />
            <Login loginAuth={loginAuth} />
          </>
        ) : (
          <>
            <Switch>
              <Route path="/cstm" component={CstmPage} />
              <Route path="/kiyk-list" component={KiykListPage} />
              <Route path="/kiyk-detail" component={KiykDetailPage} />
              <Redirect to={"/cstm"} />
            </Switch>
          </>
        )}
      </div>

      <Footer footerText={footerText} />
    </div>
  );
};

export default withRouter(App);
