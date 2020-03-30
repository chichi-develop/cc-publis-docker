import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../../../store/actions";
import { StoreState } from "../../../store";

import { Kyzd, Kiyk } from "../../../types/models";

import "./KiykZandakaContainer.css";

type Props = {
  kyzd: Kyzd;
};

const KiykZandakaContainer: React.FC = () => {
  const publisState = useSelector((state: StoreState) => state.publis);
  const dispatch = useDispatch();

  const kyzdSearch = useCallback(
    (nokiyk: string) => dispatch(Actions.getKyzdStart(nokiyk)),
    [dispatch]
  );

  let kiyk = publisState.kiyk as Kiyk;
  let kyzd = publisState.kyzd as Kyzd;
  let showListKiyk = publisState.showListKiyk;
  let showListKyzd = publisState.showListKyzd;
  let showListKiykCstm = publisState.showListKiykCstm;

  useEffect(() => {
    console.log("KiykZandakaContainer render!");
    if (kiyk.KY_NOKIYK !== kyzd.KS_NOKIYK) {
      showListKiyk && kyzdSearch(kiyk.KY_NOKIYK.toString());
    }
    return () => console.log("unmounting...");
  }, [kiyk, kyzd, kyzdSearch, showListKiyk]);

  return (
    <div className="kiykZandaka-body">
      {showListKiykCstm && showListKiyk && showListKyzd && (
        <>
          <div className="kiykZandaka-menu">
            <p className="frame-title">契約残高</p>
          </div>
          <KiykZandaka kyzd={kyzd} />
        </>
      )}
    </div>
  );
};

const KiykZandaka: React.FC<Props> = ({ kyzd }) => {
  useEffect(() => {
    console.log("KiykZandaka render!");
  }, []);

  return (
    <div className="KiykZandaka-container">
      <table className="commonTable-table">
        <thead className="commonTable-thead">
          <tr>
            <th>
              <p>契約金額</p>
            </th>
            <th>
              <p>解除金額</p>
            </th>
            <th>
              <p>入金金額</p>
            </th>
            <th>
              <p>売上金額</p>
            </th>
            <th>
              <p>未入金</p>
            </th>
            <th>
              <p>前受金</p>
            </th>
            <th>
              <p>契約残高</p>
            </th>
          </tr>
        </thead>
        <tbody className="commonTable-tbody">
          <tr>
            <td style={{ textAlign: "center" }}>
              {kyzd.KS_KGKIYK.toLocaleString()}
            </td>
            <td style={{ textAlign: "center" }}>
              {kyzd.KS_KGKYKJ.toLocaleString()}
            </td>
            <td style={{ textAlign: "center" }}>
              {kyzd.KS_KGNYKN.toLocaleString()}
            </td>
            <td style={{ textAlign: "center" }}>
              {kyzd.KS_KGURAG.toLocaleString()}
            </td>
            <td style={{ textAlign: "center" }}>
              {kyzd.KS_ZNURKK.toLocaleString()}
            </td>
            <td style={{ textAlign: "center" }}>
              {kyzd.KS_ZKMUKE.toLocaleString()}
            </td>
            <td style={{ textAlign: "center" }}>
              {kyzd.KS_ZNKIYK.toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default KiykZandakaContainer;
