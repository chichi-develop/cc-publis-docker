import React, { useEffect } from "react";
import { Actions } from "../../store/actions";
import { Link } from "react-router-dom";

import "./NavigationBar.css";

type Props = {
  title: string;
  isAuth: boolean;
  logoutAuth: typeof Actions.logoutAuthStart;
};

const NavigationBar: React.FC<Props> = ({ title, isAuth, logoutAuth }) => {
  useEffect(() => {
    console.log("NavigationBar render!");
    return () => console.log("unmounting...");
  }, [isAuth]);

  return (
    <nav className="navigationBar">
      <div className="navigationBar-container">
        <Link className="navigationBar-container-logo" to="/">
          {title}
        </Link>
        <ul className="navigationBar-container-menu">
          {/* <li>
            <Link className="navigationBar-container-menu-list" to="/">
              login
            </Link>
          </li>
          <li>
            <Link className="navigationBar-container-menu-list" to="/">
              logout
            </Link>
          </li> */}

          {!isAuth ? (
            <div></div>
          ) : (
            <button
              className="navigationBar-container-button"
              type="submit"
              onClick={e => {
                e.preventDefault();
                logoutAuth();
              }}
            >
              logout
            </button>
          )}

          {/* <li className="navigationBar-container-menu-list">
            <Link to="/">login</Link>
          </li>
          <li className="navigationBar-container-menu-list">
            <Link to="/">logout</Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
