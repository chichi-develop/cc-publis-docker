import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./LinkList.css";

type Props = {
  cdcstm: string;
  showLinkCstmList?: boolean;
  showLinkCsmm?: boolean;
  showLinkCstmZandakaHistory?: boolean;
  showLinkAclg?: boolean;
  showLinkMdmm?: boolean;
};

const LinkList: React.FC<Props> = ({
  cdcstm,
  showLinkCstmList = true,
  showLinkCsmm = true,
  showLinkCstmZandakaHistory = true,
  showLinkAclg = true,
  showLinkMdmm = true
}) => {
  let history = useHistory();

  useEffect(() => {
    console.log("LinkList render!");
    return () => console.log("unmounting...");
  }, []);

  return (
    <div className="linkList-container">
      {showLinkCstmList && (
        <button onClick={() => history.push("/cstm")}>顧客マスタ一覧</button>
      )}
      {showLinkCsmm && (
        <button onClick={() => history.push(`/cstm/${cdcstm}/csmm`)}>
          顧客マスタメモ
        </button>
      )}
      {showLinkCstmZandakaHistory && (
        <button
          onClick={() => history.push(`/cstm/${cdcstm}/cstm-zandaka-history`)}
        >
          顧客残高履歴
        </button>
      )}
      {showLinkAclg && (
        <button onClick={() => history.push(`/cstm/${cdcstm}/aclg`)}>
          書籍・セミナー・大会履歴
        </button>
      )}
      {showLinkMdmm && (
        <button onClick={() => history.push(`/cstm/${cdcstm}/mdmm`)}>
          お客様窓口用メモ
        </button>
      )}
      <button
        onClick={() =>
          history.push(`/kiyk-list?columnName=ky_cdsqsk_cdshsk&key=${cdcstm}`)
        }
      >
        契約一覧
      </button>
    </div>
  );
};

export default LinkList;
