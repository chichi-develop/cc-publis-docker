import React, { useState, useEffect } from "react";
import "./Login.css";
import { StoreState } from "../../store";

import * as Actions from "../../store/auth/actions";

type Props = {
  loginAuth: typeof Actions.loginAuthStart;
  authState: StoreState["auth"];
};

const Login: React.FC<Props> = ({ loginAuth, authState }) => {
  const [loginID, setLoginID] = useState("");
  const [password, setPassword] = useState("");

  let errorMessage = authState.error.message || "null";

  useEffect(() => {
    console.log("Login render!");
    return () => console.log("unmounting...");
  }, []);

  return (
    <div className="login-container">
      <h1>ログイン</h1>
      <form className="login-form">
        <input
          className="login-input-loginID"
          type="email"
          placeholder="Login ID.."
          onChange={(e) => {
            setLoginID(e.target.value);
          }}
        ></input>
        <input
          className="login-input-password"
          type="password"
          placeholder="Password.."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        {(errorMessage === "invalid credentials" ||
          errorMessage === "Missing credentials") && (
          <div className="login-form-error">IDまたはPasswordが違います</div>
        )}
        <div className="login-form-submit">
          <button
            className="login-form-submitButton"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              loginAuth(loginID, password);
            }}
          >
            ログイン
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
