import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../../../store/actions";
import { StoreState } from "../../../store";
import { useLocation, useHistory } from "react-router-dom";
// import { useParams, useLocation } from "react-router-dom";
import moment from "moment";

import { Kiyk, Cstm, Gycms } from "../../../types/models";

import "./KiykDetailContainer.css";

type Props = {
  kiyk: Kiyk;
  sqsk: Cstm;
  shsk: Cstm;
  gycms: Gycms;
};

const KiykDetailContainer: React.FC = () => {
  let history = useHistory();
  const location = useLocation();
  const search = location.search;
  const query = new URLSearchParams(search);
  const nokiyk = query.get("nokiyk");

  const publisState = useSelector((state: StoreState) => state.publis);
  const dispatch = useDispatch();

  const kiykSearch = useCallback(
    (columnName: string, key: string) =>
      dispatch(Actions.getKiykStart(columnName, key)),
    [dispatch]
  );

  const kiykCstmSearch = useCallback(
    (cdsqsk: string, cdshsk: string) =>
      dispatch(Actions.getKiykCstmStart(cdsqsk, cdshsk)),
    [dispatch]
  );

  const getGycmStart = useCallback(() => dispatch(Actions.getGycmStart()), [
    dispatch
  ]);

  let kiyk = publisState.kiyk as Kiyk;
  let sqsk = publisState.sqsk as Cstm;
  let shsk = publisState.shsk as Cstm;
  let showListKiyk = publisState.showListKiyk;
  let showListKiykCstm = publisState.showListKiykCstm;
  let gycms = publisState.gycms as Gycms;
  let setGycm = publisState.setGycm;

  useEffect(() => {
    console.log("KiykDetailContainer render!");
    return () => console.log("unmounting...");
  }, []);

  useEffect(() => {
    if (nokiyk !== undefined && nokiyk !== null) {
      if (Number(nokiyk) !== Number(kiyk.KY_NOKIYK)) {
        console.log(`${nokiyk}:${kiyk.KY_NOKIYK}`);
        kiykSearch("ky_nokiyk", nokiyk);
      }
    }
  }, [nokiyk, kiyk.KY_NOKIYK, kiykSearch]);

  useEffect(() => {
    if (showListKiyk) {
      if (
        kiyk.KY_CDSQSK !== sqsk.CT_CDCSTM ||
        kiyk.KY_CDSHSK !== shsk.CT_CDCSTM
      ) {
        kiykCstmSearch(kiyk.KY_CDSQSK, kiyk.KY_CDSHSK);
      }
    }
  }, [kiyk, sqsk, shsk, kiykCstmSearch, showListKiyk]);

  useEffect(() => {
    if (!setGycm && showListKiyk) {
      getGycmStart();
    }
  }, [showListKiyk, setGycm, getGycmStart]);

  return (
    <div className="kiykDetail-body">
      {showListKiyk && showListKiykCstm && setGycm ? (
        <>
          <p className="frame-title">契約詳細</p>
          <KiykDetail kiyk={kiyk} sqsk={sqsk} shsk={shsk} gycms={gycms} />
        </>
      ) : (
        <div className="kiykDetail-noData">
          <p>契約はありません。（{nokiyk}）</p>
          <p
            className="kiykDetail-noData-goBack"
            onClick={() => history.push("/cstm")}
          >
            顧客マスタ画面に戻る
          </p>
        </div>
      )}
    </div>
  );
};

const KiykDetail: React.FC<Props> = ({ kiyk, sqsk, shsk, gycms }) => {
  useEffect(() => {
    console.log("KiykDetail render!");
    return () => console.log("unmounting...");
  }, []);

  const gycmConv = (cdbnri: string, cdbnsy: string) =>
    gycms.filter(r => r.GY_CDBNRI === cdbnri && r.GY_CDBNSY === cdbnsy)[0]
      .GY_NMBNSY;

  return (
    <div className="kiykDetail-container">
      <form
        className="kiykDetail-gridContainer"
        autoComplete="off"
        key={(kiyk.KY_NOKIYK, sqsk.CT_CDCSTM, shsk.CT_CDCSTM)}
      >
        <div className="kiykDetail-frame kiykDetail-frame-1">
          <div className="kiykDetail-frame-row">
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label">契約No.</div>
              <input
                className="kiykDetail-input"
                type="text"
                readOnly={true}
                defaultValue={kiyk.KY_NOKIYK}
                style={{ width: "6em" }}
                onFocus={e => e.currentTarget.select()}
              />
            </div>
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label">状態区分</div>
              <input
                className="kiykDetail-input"
                type="text"
                readOnly={true}
                defaultValue={[
                  kiyk.KY_KBJYOT.replace(/\s+$/g, ""),
                  gycmConv("KBJYOT", kiyk.KY_KBJYOT.replace(/\s+$/g, ""))
                ].join(": ")}
                style={{ width: "8em" }}
                onFocus={e => e.currentTarget.select()}
              />
            </div>
          </div>
          <div className="kiykDetail-frame-row">
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label">契約期間</div>
              <div>
                <input
                  className="kiykDetail-input"
                  type="text"
                  readOnly={true}
                  defaultValue={[
                    kiyk.KY_YMKIYK.trim() !== ""
                      ? moment(kiyk.KY_YMKIYK, "YYYYMM").format("YYYY/MM")
                      : "",
                    kiyk.KY_YMKIYE.trim() !== ""
                      ? moment(kiyk.KY_YMKIYE, "YYYYMM").format("YYYY/MM")
                      : ""
                  ].join(" 〜 ")}
                  style={{ width: "11em" }}
                  onFocus={e => e.currentTarget.select()}
                />
              </div>
            </div>
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label">発送回数</div>
              <input
                className="kiykDetail-input"
                type="text"
                readOnly={true}
                defaultValue={[kiyk.KY_CTHSSM, kiyk.KY_CTHSOY].join("/")}
                style={{ width: "4em" }}
                onFocus={e => e.currentTarget.select()}
              />
            </div>
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label">部数</div>
              <input
                className="kiykDetail-input"
                type="text"
                readOnly={true}
                defaultValue={kiyk.KY_SUKIYK}
                style={{ width: "2em" }}
                onFocus={e => e.currentTarget.select()}
              />
            </div>
          </div>
          <div className="kiykDetail-frame-row">
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label">契約PT</div>
              <input
                className="kiykDetail-input"
                type="text"
                readOnly={true}
                defaultValue={[
                  kiyk.KY_CDKYPT.replace(/\s+$/g, ""),
                  gycmConv("CDKYPT", kiyk.KY_CDKYPT.replace(/\s+$/g, ""))
                ].join(": ")}
                style={{ width: "12em" }}
                onFocus={e => e.currentTarget.select()}
              />
            </div>
            <div className="kiykDetail-label">郵便区分</div>
            <input
              className="kiykDetail-input"
              type="text"
              readOnly={true}
              defaultValue={[
                kiyk.KY_KBKSYB.replace(/\s+$/g, ""),
                gycmConv("KBKSYB", kiyk.KY_KBKSYB.replace(/\s+$/g, ""))
              ].join(": ")}
              style={{ width: "6em" }}
              onFocus={e => e.currentTarget.select()}
            />
          </div>
          <div className="kiykDetail-frame-row">
            <div className="kiykDetail-label">贈呈出力</div>
            <input
              className="kiykDetail-input"
              type="text"
              readOnly={true}
              defaultValue={[
                kiyk.KY_KBZOUT.replace(/\s+$/g, ""),
                gycmConv("KBZOUT", kiyk.KY_KBZOUT.replace(/\s+$/g, ""))
              ].join(": ")}
              style={{ width: "6em" }}
              onFocus={e => e.currentTarget.select()}
            />
            <div className="kiykDetail-frame-column">
              <input
                className="kiykDetail-input"
                type="text"
                readOnly={true}
                defaultValue={kiyk.KY_NMZOUT.replace(/\s+$/g, "")}
                style={{ width: "18em" }}
                onFocus={e => e.currentTarget.select()}
              />
            </div>
          </div>
          <div className="kiykDetail-frame-row">
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label">特別出荷</div>
              <input
                className="kiykDetail-input"
                type="text"
                readOnly={true}
                defaultValue={[
                  kiyk.KY_KBTKBT.replace(/\s+$/g, ""),
                  gycmConv("KBTKBT", kiyk.KY_KBTKBT.replace(/\s+$/g, ""))
                ].join(": ")}
                style={{ width: "6em" }}
                onFocus={e => e.currentTarget.select()}
              />
            </div>
            <div className="kiykDetail-frame-column">
              <input
                className="kiykDetail-input"
                type="text"
                readOnly={true}
                defaultValue={kiyk.KY_TXTKBT.replace(/\s+$/g, "")}
                style={{ width: "18em" }}
                onFocus={e => e.currentTarget.select()}
              />
            </div>
          </div>
        </div>
        <div className="kiykDetail-frame kiykDetail-frame-2">
          <div className="kiykDetail-frame-row">
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label">顧客区分</div>
              <input
                className="kiykDetail-input"
                type="text"
                readOnly={true}
                defaultValue={[
                  kiyk.KY_KBCSTM.replace(/\s+$/g, ""),
                  gycmConv("KBCSTM", kiyk.KY_KBCSTM.replace(/\s+$/g, ""))
                ].join(": ")}
                style={{ width: "6em" }}
                onFocus={e => e.currentTarget.select()}
              />
            </div>
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label">購読区分</div>
              <input
                className="kiykDetail-input"
                type="text"
                readOnly={true}
                defaultValue={[
                  kiyk.KY_KBKODK.replace(/\s+$/g, ""),
                  gycmConv("KBKODK", kiyk.KY_KBKODK.replace(/\s+$/g, ""))
                ].join(": ")}
                style={{ width: "6em" }}
                onFocus={e => e.currentTarget.select()}
              />
            </div>
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label">申込区分</div>
              <input
                className="kiykDetail-input"
                type="text"
                readOnly={true}
                defaultValue={[
                  kiyk.KY_KBMSKM.replace(/\s+$/g, ""),
                  gycmConv("KBMSKM", kiyk.KY_KBMSKM.replace(/\s+$/g, ""))
                ].join(": ")}
                style={{ width: "6em" }}
                onFocus={e => e.currentTarget.select()}
              />
            </div>
          </div>
          <div className="kiykDetail-frame-row">
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label">契約区分</div>
              <input
                className="kiykDetail-input"
                type="text"
                readOnly={true}
                defaultValue={[
                  kiyk.KY_KBKIYK.replace(/\s+$/g, ""),
                  gycmConv("KBKIYK", kiyk.KY_KBKIYK.replace(/\s+$/g, ""))
                ].join(": ")}
                style={{ width: "7em" }}
                onFocus={e => e.currentTarget.select()}
              />
            </div>
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label">契約日</div>
              <div>
                <input
                  className="kiykDetail-input"
                  type="text"
                  readOnly={true}
                  defaultValue={
                    kiyk.KY_DTKIYK.trim() !== ""
                      ? moment(kiyk.KY_DTKIYK, "YYYYMMDD").format("YYYY/MM/DD")
                      : ""
                  }
                  style={{ width: "8em" }}
                  onFocus={e => e.currentTarget.select()}
                />
              </div>
            </div>
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label">契約回数</div>
              <input
                className="kiykDetail-input"
                type="text"
                readOnly={true}
                defaultValue={kiyk.KY_CTKIYK}
                style={{ width: "3em" }}
                onFocus={e => e.currentTarget.select()}
              />
            </div>
          </div>
          <div className="kiykDetail-frame-row">
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label">請求書No.</div>
              <input
                className="kiykDetail-input"
                type="text"
                readOnly={true}
                defaultValue={kiyk.KY_NOSQSY}
                style={{ width: "6em" }}
                onFocus={e => e.currentTarget.select()}
              />
            </div>

            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label">請求日</div>
              <div>
                <input
                  className="kiykDetail-input"
                  type="text"
                  readOnly={true}
                  defaultValue={
                    kiyk.KY_DTSQBI.trim() !== ""
                      ? moment(kiyk.KY_DTSQBI, "YYYYMMDD").format("YYYY/MM/DD")
                      : ""
                  }
                  style={{ width: "8em" }}
                  onFocus={e => e.currentTarget.select()}
                />
              </div>
            </div>
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label">後払区分</div>
              <input
                className="kiykDetail-input"
                type="text"
                readOnly={true}
                defaultValue={[
                  kiyk.KY_KBATBR.replace(/\s+$/g, ""),
                  gycmConv("KBATBR", kiyk.KY_KBATBR.replace(/\s+$/g, ""))
                ].join(": ")}
                style={{ width: "8em" }}
                onFocus={e => e.currentTarget.select()}
              />
            </div>
          </div>
          <div className="kiykDetail-frame-row">
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label">継続区分</div>
              <input
                className="kiykDetail-input"
                type="text"
                readOnly={true}
                defaultValue={[
                  kiyk.KY_KBKIZK.replace(/\s+$/g, ""),
                  gycmConv("KBKIZK", kiyk.KY_KBKIZK.replace(/\s+$/g, ""))
                ].join(": ")}
                style={{ width: "8em" }}
                onFocus={e => e.currentTarget.select()}
              />
            </div>
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label">中止区分</div>
              <input
                className="kiykDetail-input"
                type="text"
                readOnly={true}
                defaultValue={[
                  // kiyk.KY_KBCYUS.replace(/\s+$/g, ""),
                  // gycmConv("KBCYUS", kiyk.KY_KBCYUS.replace(/\s+$/g, ""))
                  kiyk.KY_KBCYUS,
                  gycmConv("KBCYUS", kiyk.KY_KBCYUS)
                ].join(": ")}
                style={{ width: "8em" }}
                onFocus={e => e.currentTarget.select()}
              />
            </div>
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label">中止日</div>
              <div>
                <input
                  className="kiykDetail-input"
                  type="text"
                  readOnly={true}
                  defaultValue={
                    kiyk.KY_DTSTOP.trim() !== ""
                      ? moment(kiyk.KY_DTSTOP, "YYYYMMDD").format("YYYY/MM/DD")
                      : ""
                  }
                  style={{ width: "8em" }}
                  onFocus={e => e.currentTarget.select()}
                />
              </div>
            </div>
          </div>
          <div className="kiykDetail-frame-row">
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label">備考</div>
              <input
                className="kiykDetail-input"
                type="text"
                readOnly={true}
                defaultValue={kiyk.KY_TXBIKO.replace(/\s+$/g, "")}
                style={{ width: "30em" }}
                onFocus={e => e.currentTarget.select()}
              />
            </div>
          </div>
          <div className="kiykDetail-frame-row">
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label">CCユーザーID</div>
              <input
                className="kiykDetail-input"
                type="text"
                readOnly={true}
                defaultValue={kiyk.KY_CDIDVT.replace(/\s+$/g, "")}
                style={{ width: "6em" }}
                onFocus={e => e.currentTarget.select()}
              />
            </div>
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label">CC取引ID</div>
              <input
                className="kiykDetail-input"
                type="text"
                readOnly={true}
                defaultValue={kiyk.KY_CDIDTH.replace(/\s+$/g, "")}
                style={{ width: "15em" }}
                onFocus={e => e.currentTarget.select()}
              />
            </div>
          </div>
        </div>
        <div className="kiykDetail-frame kiykDetail-frame-3">
          <div className="kiykDetail-frame-row">
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label" style={{ width: "7em" }}>
                請求先No.
              </div>
              <input
                className="kiykDetail-input"
                type="text"
                readOnly={true}
                defaultValue={kiyk.KY_CDSQSK.replace("/s+$/g", "")}
                style={{ width: "7em" }}
                onFocus={e => e.currentTarget.select()}
              />
            </div>
          </div>
          <div className="kiykDetail-frame-row">
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label" style={{ width: "7em" }}>
                請求先
              </div>
              <textarea
                className="kiykDetail-column kiykDetail-textarea"
                readOnly={true}
                defaultValue={[
                  sqsk.CT_NMCSTM.replace(/\s+$/g, ""),
                  sqsk.CT_NMTNBU.replace(/\s+$/g, ""),
                  sqsk.CT_NMSIME !== sqsk.CT_NMCSTM
                    ? sqsk.CT_NMSIME.replace(/\s+$/g, "")
                    : ""
                ].join("\n")}
                style={{ height: "4em", width: "25em" }}
                onFocus={e => e.currentTarget.select()}
              />
            </div>
          </div>
          <div className="kiykDetail-frame-row">
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label">次回請求先No.</div>
              <input
                className="kiykDetail-input"
                type="text"
                readOnly={true}
                defaultValue={kiyk.KY_NOJSQS.replace("/s+$/g", "")}
                style={{ width: "7em" }}
                onFocus={e => e.currentTarget.select()}
              />
            </div>
          </div>
        </div>
        <div className="kiykDetail-frame kiykDetail-frame-4">
          <div className="kiykDetail-frame-row">
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label" style={{ width: "7em" }}>
                送本先No.
              </div>
              <input
                className="kiykDetail-input"
                type="text"
                readOnly={true}
                defaultValue={kiyk.KY_CDSHSK.replace("/s+$/g", "")}
                style={{ width: "7em" }}
                onFocus={e => e.currentTarget.select()}
              />
            </div>
          </div>
          <div className="kiykDetail-frame-row">
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label" style={{ width: "7em" }}>
                送本先
              </div>
              <textarea
                className="kiykDetail-column kiykDetail-textarea"
                readOnly={true}
                defaultValue={[
                  shsk.CT_NMCSTM.replace(/\s+$/g, ""),
                  shsk.CT_NMTNBU.replace(/\s+$/g, ""),
                  shsk.CT_NMSIME !== shsk.CT_NMCSTM
                    ? shsk.CT_NMSIME.replace(/\s+$/g, "")
                    : ""
                ].join("\n")}
                style={{ height: "4em", width: "25em" }}
                onFocus={e => e.currentTarget.select()}
              />
            </div>
          </div>
          <div className="kiykDetail-frame-row">
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label">送本先付替履歴</div>
              <textarea
                className="kiykDetail-column kiykDetail-textarea"
                readOnly={true}
                defaultValue={kiyk.KY_TXSHSK.replace(/\s+$/g, "")}
                style={{ width: "25em" }}
                onFocus={e => e.currentTarget.select()}
              />
            </div>
          </div>
        </div>
        <div className="kiykDetail-frame kiykDetail-frame-5">
          <div className="kiykDetail-frame-row">
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label">作成日</div>
              <div>
                <input
                  className="kiykDetail-input"
                  type="text"
                  readOnly={true}
                  defaultValue={
                    kiyk.KY_CCDATEC.trim() !== ""
                      ? moment(kiyk.KY_CCDATEC, "YYYYMMDD").format("YYYY/MM/DD")
                      : ""
                  }
                  style={{ width: "8em" }}
                  onFocus={e => e.currentTarget.select()}
                />
              </div>
            </div>
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label">更新日</div>
              <div>
                <input
                  className="kiykDetail-input"
                  type="text"
                  readOnly={true}
                  defaultValue={
                    kiyk.KY_CCDATEX.trim() !== ""
                      ? moment(kiyk.KY_CCDATEX, "YYYYMMDD").format("YYYY/MM/DD")
                      : ""
                  }
                  style={{ width: "8em" }}
                  onFocus={e => e.currentTarget.select()}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="kiykDetail-frame kiykDetail-frame-6">
          <div className="kiykDetail-frame-row">
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label">キャンペーン</div>
              <input
                className="kiykDetail-input"
                type="text"
                readOnly={true}
                defaultValue={[
                  // kiyk.KY_KBCYUS.replace(/\s+$/g, ""),
                  // gycmConv("KBCYUS", kiyk.KY_KBCYUS.replace(/\s+$/g, ""))
                  kiyk.KY_CDCANP,
                  gycmConv("CDCANP", kiyk.KY_CDCANP)
                ].join(": ")}
                style={{ width: "10em" }}
                onFocus={e => e.currentTarget.select()}
              />
            </div>
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label">担当者</div>
              <input
                className="kiykDetail-input"
                type="text"
                readOnly={true}
                defaultValue={[
                  // kiyk.KY_KBCYUS.replace(/\s+$/g, ""),
                  // gycmConv("KBCYUS", kiyk.KY_KBCYUS.replace(/\s+$/g, ""))
                  kiyk.KY_CDSYTN,
                  gycmConv("CDSYTN", kiyk.KY_CDSYTN)
                ].join(": ")}
                style={{ width: "10em" }}
                onFocus={e => e.currentTarget.select()}
              />
            </div>
          </div>
          <div className="kiykDetail-frame-row">
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label">申込媒体</div>
              <input
                className="kiykDetail-input"
                type="text"
                readOnly={true}
                defaultValue={[
                  // kiyk.KY_KBCYUS.replace(/\s+$/g, ""),
                  // gycmConv("KBCYUS", kiyk.KY_KBCYUS.replace(/\s+$/g, ""))
                  kiyk.KY_CDBAIT,
                  gycmConv("CDBAIT", kiyk.KY_CDBAIT)
                ].join(": ")}
                style={{ width: "8em" }}
                onFocus={e => e.currentTarget.select()}
              />
            </div>
            <div className="kiykDetail-frame-column">
              <div className="kiykDetail-label">特別社内木鶏</div>
              <input
                className="kiykDetail-input"
                type="text"
                readOnly={true}
                defaultValue={
                  kiyk.KY_CDTKSY.trim() !== ""
                    ? [
                        // kiyk.KY_KBCYUS.replace(/\s+$/g, ""),
                        // gycmConv("KBCYUS", kiyk.KY_KBCYUS.replace(/\s+$/g, ""))
                        kiyk.KY_CDTKSY,
                        gycmConv("CDSYKS", kiyk.KY_CDTKSY)
                      ].join(": ")
                    : ""
                }
                style={{ width: "8em" }}
                onFocus={e => e.currentTarget.select()}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default KiykDetailContainer;
