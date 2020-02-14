import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import KiykDetailContainer from "./kiykDetail/KiykDetailContainer";
import KiykZandakaHistoryContainer from "./kiykZandakaHistory/KiykZandakaHistoryContainer";

import "./KiykDetailPage.css";

const KiykDetailPage: React.FC = () => {
  let history = useHistory();

  useEffect(() => {
    console.log("KiykDetailPage render!");
    return () => console.log("unmounting...");
  }, []);

  return (
    <div className="kiykDetailPage-body">
      <div className="kiykDetailPage-link">
        {/* <button onClick={() => history.push("/kiyk-list")}>戻る</button> */}
        <button onClick={() => history.goBack()}>戻る</button>
        <button onClick={() => history.push("/cstm")}>顧客マスタ</button>
      </div>
      <KiykDetailContainer />
      <KiykZandakaHistoryContainer />
    </div>
  );
};

export default KiykDetailPage;
