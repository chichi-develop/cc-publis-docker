import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../../../store/actions";
import { StoreState } from "../../../store";
// import { useParams, useLocation } from "react-router-dom";
import { Cstm, Gycms, Privilege } from "../../../types/models";

import "./CstmDetailContainer.css";
import moment from "moment";

type Props = {
  cstm: Cstm;
  gycms: Gycms;
  editCstmStart: typeof Actions.editCstmStart;
  isAuth: boolean;
  privilege: Privilege;
};

// TODO: input submitを入れてテスト
const CstmDetailContainer: React.FC = () => {
  const authState = useSelector((state: StoreState) => state.auth);
  const publisState = useSelector((state: StoreState) => state.publis);
  const dispatch = useDispatch();
  const editCstmStart = useCallback(
    (cdcstm: string, cstm: Cstm) =>
      dispatch(Actions.editCstmStart(cdcstm, cstm)),
    [dispatch]
  );

  const getGycmStart = useCallback(() => dispatch(Actions.getGycmStart()), [
    dispatch
  ]);

  let privilege = authState.privilege;
  let isAuth = authState.isAuth;
  let cstm = publisState.cstm as Cstm;
  let showListCstm = publisState.showListCstm;
  let gycms = publisState.gycms as Gycms;
  let setGycm = publisState.setGycm;

  useEffect(() => {
    console.log("CstmDetailContainer render!");
    if (!setGycm) {
      getGycmStart();
    }
    return () => console.log("unmounting...");
  }, [cstm, showListCstm, gycms, setGycm, getGycmStart, privilege]);

  return (
    <div className="cstmDetail-body">
      {showListCstm && (
        <>
          <p className="frame-title">顧客情報詳細</p>
          <CstmDetail
            cstm={cstm}
            gycms={gycms}
            editCstmStart={editCstmStart}
            isAuth={isAuth}
            privilege={privilege}
          />
        </>
      )}
    </div>
  );
};

const CstmDetail: React.FC<Props> = ({
  cstm,
  gycms,
  editCstmStart,
  isAuth,
  privilege
}) => {
  const [editMode, setEditMode] = useState(false);
  // const handleEditMode = () => setEditMode(!editMode);
  const handleEditMode = () => {
    console.log("button test");
    console.log(editMode);
    setEditMode(!editMode);
  };

  const editModeStyle = {
    backgroundColor: "inherit",
    border: "1px solid #c5c5c5"
    // border: "none"
  };

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data: Record<string, any>) => {
    //   history.push(`/cstm?columnName=ct_cdcstm&key=${data.cdcstm}%`);
    console.log(data);
    // editCstmStart(cdcstm, cstm)*
    editCstmStart(cstm.CT_CDCSTM, Object.assign({}, cstm, data));
  };

  useEffect(() => {
    console.log("CstmDetail render!");
    return () => console.log("unmounting...");
  }, []);

  const gycmConv = (cdbnri: string, cdbnsy: string) =>
    gycms.filter(r => r.GY_CDBNRI === cdbnri && r.GY_CDBNSY === cdbnsy)[0]
      .GY_NMBNSY;

  return (
    <div className="cstmDetail-container">
      <form
        className="cstmDetail-subContainer"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        key={cstm.CT_CDCSTM}
      >
        <div className="cstmDetail-gridContainer">
          <div className="cstmDetail-ctCdcstmLabel">顧客 No. :</div>
          <input
            className="cstmDetail-ctCdcstmInput"
            type="text"
            name="CDCSTM"
            defaultValue={cstm.CT_CDCSTM.replace("/s+$/g", "")}
            ref={register({ pattern: /^2[0-9]{7}/ })}
            style={editMode ? editModeStyle : {}}
          />
          {errors.cdcstm && <p>8桁入力してください</p>}

          <div className="cstmDetail-ctKbcstmLabel">顧客区分:</div>
          <input
            className="cstmDetail-ctKbcstmInput"
            type="text"
            name="KBCSTM"
            defaultValue={cstm.CT_KBCSTM.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />
          <div className="cstmDetail-ctKbcstmGycms gycms">
            {gycmConv("KBCSTM", cstm.CT_KBCSTM)}
          </div>

          <div className="cstmDetail-ctKbksyoLabel">敬称:</div>
          <input
            className="cstmDetail-ctKbksyoInput"
            type="text"
            name="KBKSYO"
            defaultValue={cstm.CT_KBKSYO}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />
          <div className="cstmDetail-ctKbksyoGycms gycms">
            {gycmConv("KBKSYO", cstm.CT_KBKSYO)}
          </div>

          <div className="cstmDetail-ctKbjyctLabel">重要顧客:</div>
          <input
            className="cstmDetail-ctKbjyctInput"
            type="text"
            name="KBJYCT"
            defaultValue={cstm.CT_KBJYCT}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />

          <div className="cstmDetail-ctNmcstmLabel">顧客名:</div>
          <input
            className="cstmDetail-ctNmcstmInput"
            type="text"
            name="NMCSTM"
            defaultValue={cstm.CT_NMCSTM}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />

          <div className="cstmDetail-ctKbsebtLabel">性別:</div>
          <input
            className="cstmDetail-ctKbsebtInput"
            type="text"
            name="KBSEBT"
            defaultValue={cstm.CT_KBSEBT}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />
          <div className="cstmDetail-ctKbsebtGycms gycms">
            {gycmConv("KBSEBT", cstm.CT_KBSEBT)}
          </div>

          <div className="cstmDetail-ctCdbaitLabel">申込媒体:</div>
          <input
            className="cstmDetail-ctCdbaitInput"
            type="text"
            name="CDBAIT"
            defaultValue={cstm.CT_CDBAIT}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />

          <div className="cstmDetail-ctKbtkskLabel">督促注意:</div>
          <input
            className="cstmDetail-ctKbtkskInput"
            type="text"
            name="CBTKSK"
            defaultValue={cstm.CT_KBTKSK}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />

          <div className="cstmDetail-ctNkcstmLabel">顧客名カナ:</div>
          <input
            className="cstmDetail-ctNkcstmInput"
            type="text"
            name="NKCSTM"
            defaultValue={cstm.CT_NKCSTM}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />

          <div className="cstmDetail-ctCdsyokLabel">職種:</div>
          <input
            className="cstmDetail-ctCdsyokInput"
            type="text"
            name="CDSYOK"
            defaultValue={cstm.CT_CDSYOK}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />
          <div className="cstmDetail-ctCdsyokGycms gycms">
            {gycmConv("CDSYOK", cstm.CT_CDSYOK)}
          </div>

          <div className="cstmDetail-ctCdsyksLabel">紹介者詳細:</div>
          <input
            className="cstmDetail-ctCdsyksInput"
            type="text"
            name="CDSYKS"
            defaultValue={cstm.CT_CDSYKS}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />
          <div className="cstmDetail-ctCdsyksGycms gycms">
            {gycmConv("CDSYKS", cstm.CT_CDSYKS)}
          </div>

          <div className="cstmDetail-ctKbjik1Label">事故:</div>
          <input
            className="cstmDetail-ctKbjik1Input"
            type="text"
            name="KBJIK1"
            defaultValue={cstm.CT_KBJIK1}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />

          <div className="cstmDetail-ctNmtnbuLabel">部署名:</div>
          <input
            className="cstmDetail-ctNmtnbuInput"
            type="text"
            name="NMTNBU"
            defaultValue={cstm.CT_NMTNBU}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />

          <div className="cstmDetail-ctKbdmprLabel">DM発行:</div>
          <input
            className="cstmDetail-ctKbdmprInput"
            type="text"
            name="KBDMPR"
            defaultValue={cstm.CT_KBDMPR}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />
          <div className="cstmDetail-ctKbdmprGycms gycms">
            {gycmConv("KBDMPR", cstm.CT_KBDMPR)}
          </div>

          <div className="cstmDetail-ctCdsytnLabel">社内担当者:</div>
          <input
            className="cstmDetail-ctCdsytnInput"
            type="text"
            name="CDSYTN"
            defaultValue={cstm.CT_CDSYTN}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />
          <div className="cstmDetail-ctCdsytnGycms gycms">
            {gycmConv("CDSYTN", cstm.CT_CDSYTN)}
          </div>

          <div className="cstmDetail-ctKbjik2Label">事故(売掛):</div>
          <input
            className="cstmDetail-ctKbjik2Input"
            type="text"
            name="KBJIK2"
            defaultValue={cstm.CT_KBJIK2}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />

          <div className="cstmDetail-ctNmtntoLabel">担当者名:</div>
          <input
            className="cstmDetail-ctNmtntoInput"
            type="text"
            name="NMTNTO"
            defaultValue={cstm.CT_NMTNTO}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />

          <div className="cstmDetail-ctKbkgtiLabel">海外便地帯:</div>
          <input
            className="cstmDetail-ctKbkgtiInput"
            type="text"
            name="KBKGTI"
            defaultValue={cstm.CT_KBKGTI}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />
          <div className="cstmDetail-ctKbkgtiGycms gycms">
            {gycmConv("KBKGTI", cstm.CT_KBKGTI)}
          </div>

          <div className="cstmDetail-ctCddokiLabel">申込動機:</div>
          <input
            className="cstmDetail-ctCddokiInput"
            type="text"
            name="CDDOKI"
            defaultValue={cstm.CT_CDDOKI}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />
          <div className="cstmDetail-ctCddokiGycms gycms">
            {gycmConv("CDDOKI", cstm.CT_CDDOKI)}
          </div>

          <div className="cstmDetail-ctKbclamLabel">クレーム:</div>
          <input
            className="cstmDetail-ctKbclamInput"
            type="text"
            name="KBCLAM"
            defaultValue={cstm.CT_KBCLAM}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />

          <div className="cstmDetail-ctNmsimeLabel">氏名:</div>
          <input
            className="cstmDetail-ctNmsimeInput"
            type="text"
            name="NMSIME"
            defaultValue={cstm.CT_NMSIME}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />

          <div className="cstmDetail-ctDtsngpLabel">生年月日:</div>
          <input
            className="cstmDetail-ctDtsngpInput"
            type="text"
            name="DTSNGP"
            defaultValue={
              cstm.CT_DTSNGP.trim() !== ""
                ? moment(cstm.CT_DTSNGP).format("YYYY/MM/DD")
                : ""
            }
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />
          <div className="cstmDetail-ctCtsoukLabel">総契約数:</div>
          <input
            className="cstmDetail-ctCtsoukInput"
            type="text"
            name="CTSOUK"
            defaultValue={cstm.CT_CTSOUK}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />

          <div className="cstmDetail-ctKbsekyLabel">ご逝去:</div>
          <input
            className="cstmDetail-ctKbsekyInput"
            type="text"
            name="KBSEKY"
            defaultValue={cstm.CT_KBSEKY}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />

          <div className="cstmDetail-ctNksimeLabel">氏名カナ:</div>
          <input
            className="cstmDetail-ctNksimeInput"
            type="text"
            name="NKSIME"
            defaultValue={cstm.CT_NKSIME}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />

          <div className="cstmDetail-ctCcdatecLabel">作成日:</div>
          <input
            className="cstmDetail-ctCcdatecInput"
            type="text"
            name="CCDATEC"
            defaultValue={
              cstm.CT_CCDATEC.trim() !== ""
                ? moment(cstm.CT_CCDATEC).format("YYYY/MM/DD")
                : ""
            }
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />

          <div className="cstmDetail-ctCcdatexLabel">更新日:</div>
          <input
            className="cstmDetail-ctCcdatexInput"
            type="text"
            name="CCDATEX"
            defaultValue={
              cstm.CT_CCDATEX.trim() !== ""
                ? moment(cstm.CT_CCDATEX).format("YYYY/MM/DD")
                : ""
            }
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />

          <div className="cstmDetail-ctKbmschLabel">申込注意:</div>
          <input
            className="cstmDetail-ctKbmschInput"
            type="text"
            name="KBMSCH"
            defaultValue={cstm.CT_KBMSCH}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />

          <div className="cstmDetail-ctNotel1Label">TEL1:</div>
          <input
            className="cstmDetail-ctNotel1Input"
            type="text"
            name="NOTEL1"
            defaultValue={cstm.CT_NOTEL1}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />

          <div className="cstmDetail-ctNotel2Label">TEL2:</div>
          <input
            className="cstmDetail-ctNotel2Input"
            type="text"
            name="NOTEL2"
            defaultValue={cstm.CT_NOTEL2}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />

          <div className="cstmDetail-ctAdmailLabel">email:</div>
          <input
            className="cstmDetail-ctAdmailInput"
            type="text"
            name="ADMAIL"
            defaultValue={cstm.CT_ADMAIL}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />

          <div className="cstmDetail-ctNoyubnLabel">郵便番号:</div>
          <input
            className="cstmDetail-ctNoyubnInput"
            type="text"
            name="NOYUBN"
            defaultValue={cstm.CT_NOYUBN}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />

          <div className="cstmDetail-ctNmkuniLabel">国名:</div>
          <input
            className="cstmDetail-ctNmkuniInput"
            type="text"
            name="NMKUNI"
            defaultValue={cstm.CT_NMKUNI}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />

          <div className="cstmDetail-ctTxbikoLabel">備考:</div>
          <input
            className="cstmDetail-ctTxbikoInput"
            type="text"
            name="TXBIKO"
            defaultValue={cstm.CT_TXBIKO}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />

          <div className="cstmDetail-ctAdcst1Label">住所:</div>
          <input
            className="cstmDetail-ctAdcst1Input"
            type="text"
            name="ADCST1"
            defaultValue={cstm.CT_ADCST1}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />

          <div className="cstmDetail-ctTxsshrLabel">送本先変更履歴 :</div>
          <input
            className="cstmDetail-ctTxsshrInput"
            type="text"
            name="TXSSHR"
            defaultValue={cstm.CT_TXSSHR}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />

          <input //住所2
            className="cstmDetail-ctAdcst2Input"
            type="text"
            name="ADCST2"
            defaultValue={cstm.CT_ADCST2}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />

          <div className="cstmDetail-ctCdsqsfLabel">請求書送付先No.</div>
          <input
            className="cstmDetail-ctCdsqsfInput"
            type="text"
            name="CDSQSF"
            defaultValue={cstm.CT_CDSQSF}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />

          <input
            className="cstmDetail-ctAdcst3Input"
            type="text"
            name="ASCST3"
            defaultValue={cstm.CT_ADCST3}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />

          <div className="cstmDetail-ctCdsqsmLabel">請求書送付先名 :</div>
          <input
            className="cstmDetail-ctCdsqsmInput"
            type="text"
            name="CDSQSM"
            defaultValue={cstm.CT_CDSQSM}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            style={editMode ? editModeStyle : {}}
          />
        </div>
        {/* {isAuth && privilege.editPublisCstm && ( */}
        {true && (
          <div className="cstmDetail-buttonList">
            {/* <div> */}
            {!editMode ? (
              <button
                className="submitButton"
                type="button"
                onClick={handleEditMode}
              >
                編集する
              </button>
            ) : (
              <>
                <button
                  className="submitButton"
                  type="button"
                  onClick={handleEditMode}
                >
                  キャンセル
                </button>
                <button className="submitButton" type="submit">
                  更新
                </button>
              </>
            )}
            {/* </div> */}
          </div>
        )}
      </form>
    </div>
  );
};
export default CstmDetailContainer;
