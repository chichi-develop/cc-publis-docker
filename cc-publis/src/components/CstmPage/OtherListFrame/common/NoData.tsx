import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./NoData.css";

type Props = {
  searchKey: string;
  message: string;
};

const NoData: React.FC<Props> = ({ searchKey, message }) => {
  let history = useHistory();

  useEffect(() => {
    console.log("NoData render!");
    return () => console.log("unmounting...");
  }, []);

  return (
    <div className="otherListFrame-noData">
      <p>
        {message}（{searchKey}）
      </p>
      <p
        className="otherListFrame-noData-goBack"
        onClick={() => history.push("/cstm")}
      >
        顧客マスタ一覧を表示する
      </p>
    </div>
  );
};

export default NoData;
