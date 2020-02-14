import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import KiykCstmContainer from "./kiykCstm/KiykCstmContainer";
import KiykZandakaContainer from "./kiykZandaka/KiykZandakaContainer";
import KiykListContainer from "./kiykList/KiykListContainer";

import "./KiykListPage.css";

const KiykListPage: React.FC = () => {
  let history = useHistory();

  useEffect(() => {
    console.log("KiykListPage render!");
    return () => console.log("unmounting...");
  }, []);

  return (
    <div className="kiykListPage-body">
      <div className="kiykListPage-link">
        <button onClick={() => history.push("/cstm")}>顧客マスタ</button>
      </div>
      <KiykCstmContainer />
      <KiykZandakaContainer />
      <KiykListContainer />
    </div>
  );
};

export default KiykListPage;
