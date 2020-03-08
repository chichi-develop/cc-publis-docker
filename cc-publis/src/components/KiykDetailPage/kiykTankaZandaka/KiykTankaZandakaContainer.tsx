import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../../../store/actions";
import { StoreState } from "../../../store";

import { Kyzd, Kiyk } from "../../../types/models";

import "./KiykTankaZandakaContainer.css";

type TankaProps = {
  kiyk: Kiyk;
};

type ZandakaProps = {
  kyzd: Kyzd;
};

const KiykTankaZandakaContainer: React.FC = () => {
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

  useEffect(() => {
    console.log("KiykTankaZandakaContainer render!");
    return () => console.log("unmounting...");
  }, []);

  useEffect(() => {
    if (kiyk.KY_NOKIYK !== kyzd.KS_NOKIYK) {
      showListKiyk && kyzdSearch(kiyk.KY_NOKIYK.toString());
    }
  }, [kiyk, kyzd, kyzdSearch, showListKiyk]);

  return (
    <div className="kiykTankaZandaka-body">
      {showListKiyk && showListKyzd && (
        <>
          <div className="kiykTankaZandaka-menu">
            <p className="frame-title">契約単価・残高</p>
          </div>
          <div className="kiykTankaZandaka-frame">
            <KiykDetailTanka kiyk={kiyk} />
            <KiykDetailZandaka kyzd={kyzd} />
          </div>
        </>
      )}
    </div>
  );
};

const KiykDetailTanka: React.FC<TankaProps> = ({ kiyk }) => {
  useEffect(() => {
    console.log("KiykDetailTanka render!");
    return () => console.log("unmounting...");
  }, []);

  return (
    <div className="KiykDetailTanka-container">
      <table
        className="commonTable-table"
        style={{ tableLayout: "fixed", width: "100%" }}
      >
        <thead className="commonTable-thead">
          <tr>
            <th>
              <p>誌代</p>
            </th>
            <th>
              <p>誌代単価</p>
            </th>
            <th>
              <p>最終誌代</p>
            </th>
          </tr>
        </thead>
        <tbody className="commonTable-tbody">
          <tr>
            <td style={{ textAlign: "right" }}>{kiyk.KY_KGKYSZ}</td>
            <td style={{ textAlign: "right" }}>{kiyk.KY_TNSIDZ}</td>
            <td style={{ textAlign: "right" }}>{kiyk.KY_TNENDZ}</td>
          </tr>
        </tbody>
      </table>
      <table
        className="commonTable-table"
        style={{ tableLayout: "fixed", width: "100%" }}
      >
        <thead className="commonTable-thead">
          <tr>
            <th>
              <p>送料</p>
            </th>
            <th>
              <p>送料単価</p>
            </th>
            <th>
              <p>最終送料</p>
            </th>
          </tr>
        </thead>
        <tbody className="commonTable-tbody">
          <tr>
            <td style={{ textAlign: "right" }}>{kiyk.KY_KGKYSR}</td>
            <td style={{ textAlign: "right" }}>{kiyk.KY_TNSORY}</td>
            <td style={{ textAlign: "right" }}>{kiyk.KY_TNSORE}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const KiykDetailZandaka: React.FC<ZandakaProps> = ({ kyzd }) => {
  useEffect(() => {
    console.log("KiykDetailZandaka render!");
  }, []);

  return (
    <div className="KiykDetailZandaka-container">
      <table
        className="commonTable-table"
        style={{ tableLayout: "fixed", width: "100%" }}
      >
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
          </tr>
        </thead>
        <tbody className="commonTable-tbody">
          <tr>
            <td style={{ textAlign: "right" }}>{kyzd.KS_KGKIYK}</td>
            <td style={{ textAlign: "right" }}>{kyzd.KS_KGKYKJ}</td>
            <td style={{ textAlign: "right" }}>{kyzd.KS_KGNYKN}</td>
            <td style={{ textAlign: "right" }}>{kyzd.KS_KGURAG}</td>
          </tr>
        </tbody>
      </table>
      <table
        className="commonTable-table"
        style={{ tableLayout: "fixed", width: "100%" }}
      >
        <thead className="commonTable-thead">
          <tr>
            <th>
              <p>契約 - 解除</p>
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
            <td style={{ textAlign: "right" }}>
              {Number(kyzd.KS_KGKIYK) - Number(kyzd.KS_KGKYKJ)}
            </td>
            <td style={{ textAlign: "right" }}>{kyzd.KS_ZNURKK}</td>
            <td style={{ textAlign: "right" }}>{kyzd.KS_ZKMUKE}</td>
            <td style={{ textAlign: "right" }}>{kyzd.KS_ZNKIYK}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default KiykTankaZandakaContainer;
