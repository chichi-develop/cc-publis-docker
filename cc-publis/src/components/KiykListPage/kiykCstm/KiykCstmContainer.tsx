import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../../../store/actions";
import { StoreState } from "../../../store";

import { Cstm, Kiyk, Gycms } from "../../../types/models";
import moment from "moment";

import "./KiykCstmContainer.css";

type Props = {
  cstm: Cstm;
  gycms: Gycms;
  prefix: string;
};

const KiykCstmContainer: React.FC = () => {
  const publisState = useSelector((state: StoreState) => state.publis);
  const dispatch = useDispatch();

  const kiykCstmSearch = useCallback(
    (cdsqsk: string, cdshsk: string) =>
      dispatch(Actions.getKiykCstmStart(cdsqsk, cdshsk)),
    [dispatch]
  );

  const getGycmStart = useCallback(() => dispatch(Actions.getGycmStart()), [
    dispatch,
  ]);

  let kiyk = publisState.kiyk as Kiyk;
  let sqsk = publisState.sqsk as Cstm;
  let shsk = publisState.shsk as Cstm;
  let showListKiyk = publisState.showListKiyk;
  let showListKiykCstm = publisState.showListKiykCstm;
  let gycms = publisState.gycms as Gycms;
  let setGycm = publisState.setGycm;

  useEffect(() => {
    console.log("KiykCstmContainer render!");
    return () => console.log("unmounting...");
  }, []);

  useEffect(() => {
    if (
      kiyk.KY_CDSQSK !== sqsk.CT_CDCSTM ||
      kiyk.KY_CDSHSK !== shsk.CT_CDCSTM
    ) {
      showListKiyk && kiykCstmSearch(kiyk.KY_CDSQSK, kiyk.KY_CDSHSK);
    }
  }, [kiyk, sqsk, shsk, kiykCstmSearch, showListKiyk]);

  useEffect(() => {
    if (!setGycm && showListKiykCstm) {
      getGycmStart();
    }
  }, [showListKiykCstm, setGycm, getGycmStart]);

  return (
    <div className="kiykCstm-body">
      {showListKiyk &&
        showListKiykCstm &&
        setGycm &&
        kiyk.KY_CDSQSK &&
        sqsk.CT_CDCSTM &&
        shsk.CT_CDCSTM &&
        (kiyk.KY_CDSQSK === sqsk.CT_CDCSTM ||
          kiyk.KY_CDSHSK === shsk.CT_CDCSTM ||
          kiyk.KY_CDSHSK === sqsk.CT_CDCSTM ||
          kiyk.KY_CDSQSK === shsk.CT_CDCSTM) && (
          <>
            <p className="frame-title">契約顧客マスタ</p>
            <div className="kiykCstm-frame">
              <KiykCstmDetail cstm={sqsk} gycms={gycms} prefix="請求先" />
              <KiykCstmDetail cstm={shsk} gycms={gycms} prefix="送本先" />
            </div>
          </>
        )}
    </div>
  );
};

const KiykCstmDetail: React.FC<Props> = ({ cstm, gycms, prefix }) => {
  useEffect(() => {
    console.log("KiykCstmDetail render!");
    return () => console.log("unmounting...");
  }, []);

  const gycmConv = (cdbnri: string, cdbnsy: string) =>
    gycms.filter((r) => r.GY_CDBNRI === cdbnri && r.GY_CDBNSY === cdbnsy)[0]
      .GY_NMBNSY;

  return (
    <div className="kiykCstm-container">
      <form
        className="kiykCstm-gridContainer"
        autoComplete="off"
        key={cstm.CT_CDCSTM}
      >
        <div className="kiykCstm-rowContainer">
          <div className="kiykCstm-columnContainer">
            <div className="kiykCstm-label">{prefix}番号</div>
            <textarea
              className="kiykCstm-column kiykCstm-textarea"
              readOnly={true}
              defaultValue={cstm.CT_CDCSTM.replace("/s+$/g", "")}
              style={{ height: "30px", width: "90%" }}
              onFocus={(e) => e.currentTarget.select()}
            />
          </div>

          <div className="kiykCstm-columnContainer">
            <div className="kiykCstm-label">顧客区分</div>
            <textarea
              className="kiykCstm-column kiykCstm-textarea"
              readOnly={true}
              defaultValue={[
                cstm.CT_KBCSTM.replace(/\s+$/g, ""),
                gycmConv("KBCSTM", cstm.CT_KBCSTM.replace(/\s+$/g, "")),
              ].join(": ")}
              style={{ height: "30px", width: "90%" }}
              onFocus={(e) => e.currentTarget.select()}
            />
          </div>
        </div>

        <div className="kiykCstm-columnContainer">
          <div className="kiykCstm-label">{prefix}顧客名</div>
          <textarea
            className="kiykCstm-column kiykCstm-textarea"
            readOnly={true}
            defaultValue={[
              cstm.CT_NMCSTM.replace(/\s+$/g, ""),
              cstm.CT_NMTNBU.replace(/\s+$/g, ""),
              cstm.CT_NMSIME !== cstm.CT_NMCSTM
                ? cstm.CT_NMSIME.replace(/\s+$/g, "")
                : "",
            ].join("\n")}
            onFocus={(e) => e.currentTarget.select()}
          />
        </div>

        {/* <div className="kiykCstm-columnContainer">
          <div className="kiykCstm-label">顧客名カナ</div>
          <textarea
            className="kiykCstm-column kiykCstm-textarea"
            readOnly={true}
            defaultValue={[
              cstm.CT_NKCSTM.replace(/\s+$/g, ""),
              cstm.CT_NKSIME !== cstm.CT_NKCSTM
                ? cstm.CT_NKSIME.replace(/\s+$/g, "")
                : ""
            ].join("\n")}
            style={{ height: "50px" }}
            onFocus={e => e.currentTarget.select()}
          />
        </div> */}

        <div className="kiykCstm-columnContainer">
          <div className="kiykCstm-label">住所</div>
          <textarea
            className="kiykCstm-column kiykCstm-textarea"
            readOnly={true}
            defaultValue={[
              cstm.CT_ADCST1.replace(/\s+$/g, ""),
              cstm.CT_ADCST2.replace(/\s+$/g, ""),
              cstm.CT_ADCST3.replace(/\s+$/g, ""),
            ].join("\n")}
            onFocus={(e) => e.currentTarget.select()}
          />
        </div>

        <div className="kiykCstm-rowContainer">
          <div className="kiykCstm-columnContainer">
            <div className="kiykCstm-label">電話番号１</div>
            <textarea
              className="kiykCstm-column kiykCstm-textarea"
              readOnly={true}
              defaultValue={cstm.CT_NOTEL1.replace(/\s+$/g, "")}
              style={{ height: "30px", width: "90%" }}
              onFocus={(e) => e.currentTarget.select()}
            />
          </div>

          <div className="kiykCstm-columnContainer">
            <div className="kiykCstm-label">電話番号２</div>
            <textarea
              className="kiykCstm-column kiykCstm-textarea"
              readOnly={true}
              defaultValue={cstm.CT_NOTEL2.replace(/\s+$/g, "")}
              style={{ height: "30px", width: "90%" }}
              onFocus={(e) => e.currentTarget.select()}
            />
          </div>

          {/* <div className="kiykCstm-columnContainer">
            <div className="kiykCstm-label">担当者</div>
            <textarea
              className="kiykCstm-column kiykCstm-textarea"
            readOnly={true}
              defaultValue={[
                cstm.CT_CDSYTN.replace(/\s+$/g, ""),
                gycmConv("CDSYTN", cstm.CT_CDSYTN.replace(/\s+$/g, ""))
              ].join(": ")}
              style={{ height: "30px", width: "90%" }}
            onFocus={e => e.currentTarget.select()}
            />
          </div> */}
          <div className="kiykCstm-columnContainer">
            <div className="kiykCstm-label">生年月日</div>
            <textarea
              className="kiykCstm-column kiykCstm-textarea"
              readOnly={true}
              defaultValue={
                cstm.CT_DTSNGP.trim() !== ""
                  ? moment(cstm.CT_DTSNGP).format("YYYY/MM/DD")
                  : ""
              }
              style={{ height: "30px", width: "90%" }}
              onFocus={(e) => e.currentTarget.select()}
            />
          </div>
        </div>

        {cstm.CT_TXBIKO.replace(/\s+$/g, "") !== "" && (
          <div className="kiykCstm-columnContainer">
            <div className="kiykCstm-label">備考</div>
            <textarea
              className="kiykCstm-column kiykCstm-textarea"
              readOnly={true}
              defaultValue={cstm.CT_TXBIKO.replace(/\s+$/g, "")}
              style={{ height: "30px" }}
              onFocus={(e) => e.currentTarget.select()}
            />
          </div>
        )}
      </form>
    </div>
  );
};
export default KiykCstmContainer;
