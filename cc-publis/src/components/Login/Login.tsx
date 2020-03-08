import React, { useState, useEffect } from "react";
import "./Login.css";

import * as Actions from "../../store/auth/actions";

type Props = {
  loginAuth: typeof Actions.loginAuthStart;
};

const Login: React.FC<Props> = ({ loginAuth }) => {
  const [loginID, setLoginID] = useState("");
  const [password, setPassword] = useState("");

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
          onChange={e => {
            setLoginID(e.target.value);
          }}
        ></input>
        <input
          className="login-input-password"
          type="password"
          placeholder="Password.."
          onChange={e => {
            setPassword(e.target.value);
          }}
        ></input>
        <div className="login-form-submit">
          <button
            className="login-form-submitButton"
            type="submit"
            onClick={e => {
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
