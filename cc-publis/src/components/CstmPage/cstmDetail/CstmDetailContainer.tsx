import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../../../store/actions";
import { StoreState } from "../../../store";
// import { useParams, useLocation } from "react-router-dom";
import { Cstm, Gycms, Privilege } from "../../../types/models";
import classNames from "classnames";

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

  let editModeStyle = [
    "cstmDetail-container-inputBox",
    {
      "cstmDetail-container-inputBox-edit": editMode,
      "cstmDetail-container-inputBox-read": !editMode
    }
  ];

  return (
    <div className="cstmDetail-container">
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        key={cstm.CT_CDCSTM}
      >
        <div className="cstmDetail-gridContainer">
          <div className="cstmDetail-container-label cstmDetail-ctCdcstmLabel">
            読者No.
          </div>
          <input
            className={classNames("cstmDetail-ctCdcstmInput", editModeStyle)}
            type="text"
            name="CT_CDCSTM"
            defaultValue={cstm.CT_CDCSTM.replace(/\s+$/g, "")}
            ref={register({ pattern: /^2[0-9]]{7}/ })}
          />
          {errors.CT_CDCSTM && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctKbcstmLabel">
            顧客区分
          </div>
          <input
            className={classNames("cstmDetail-ctKbcstmInput", editModeStyle)}
            type="text"
            name="CT_KBCSTM"
            defaultValue={cstm.CT_KBCSTM.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_KBCSTM && <p>エラーメッセージ</p>}
          <div className="cstmDetail-ctKbcstmGycms gycms">
            {gycmConv("KBCSTM", cstm.CT_KBCSTM)}
          </div>
          <div className="cstmDetail-container-label cstmDetail-ctNmcstmLabel">
            顧客名
          </div>
          <input
            className={classNames("cstmDetail-ctNmcstmInput", editModeStyle)}
            type="text"
            name="CT_NMCSTM"
            defaultValue={cstm.CT_NMCSTM.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_NMCSTM && <p>エラーメッセージ</p>}
          <input
            className={classNames("cstmDetail-ctNkcstmInput", editModeStyle)}
            type="text"
            name="CT_NKCSTM"
            defaultValue={cstm.CT_NKCSTM.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_NKCSTM && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctNmtnbuLabel">
            部署名
          </div>
          <input
            className={classNames("cstmDetail-ctNmtnbuInput", editModeStyle)}
            type="text"
            name="CT_NMTNBU"
            defaultValue={cstm.CT_NMTNBU.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_NMTNBU && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctNmtntoLabel">
            担当者名
          </div>
          <input
            className={classNames("cstmDetail-ctNmtntoInput", editModeStyle)}
            type="text"
            name="CT_NMTNTO"
            defaultValue={cstm.CT_NMTNTO.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_NMTNTO && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctNmsimeLabel">
            氏名
          </div>
          <input
            className={classNames("cstmDetail-ctNmsimeInput", editModeStyle)}
            type="text"
            name="CT_NMSIME"
            defaultValue={cstm.CT_NMSIME.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_NMSIME && <p>エラーメッセージ</p>}
          <input
            className={classNames("cstmDetail-ctNksimeInput", editModeStyle)}
            type="text"
            name="CT_NKSIME"
            defaultValue={cstm.CT_NKSIME.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_NKSIME && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctKbksyoLabel">
            敬称区分
          </div>
          <input
            className={classNames("cstmDetail-ctKbksyoInput", editModeStyle)}
            type="text"
            name="CT_KBKSYO"
            defaultValue={cstm.CT_KBKSYO.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_KBKSYO && <p>エラーメッセージ</p>}
          <div className="cstmDetail-ctKbksyoGycms gycms">
            {gycmConv("KBKSYO", cstm.CT_KBKSYO)}
          </div>
          <div className="cstmDetail-container-label cstmDetail-ctNoyubnLabel">
            郵便番号
          </div>
          <input
            className={classNames("cstmDetail-ctNoyubnInput", editModeStyle)}
            type="text"
            name="CT_NOYUBN"
            defaultValue={cstm.CT_NOYUBN.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_NOYUBN && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctAdcst1Label">
            住所１
          </div>
          <input
            className={classNames("cstmDetail-ctAdcst1Input", editModeStyle)}
            type="text"
            name="CT_ADCST1"
            defaultValue={cstm.CT_ADCST1.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_ADCST1 && <p>エラーメッセージ</p>}
          <input
            className={classNames("cstmDetail-ctAdcst2Input", editModeStyle)}
            type="text"
            name="CT_ADCST2"
            defaultValue={cstm.CT_ADCST2.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_ADCST2 && <p>エラーメッセージ</p>}
          <input
            className={classNames("cstmDetail-ctAdcst3Input", editModeStyle)}
            type="text"
            name="CT_ADCST3"
            defaultValue={cstm.CT_ADCST3.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_ADCST3 && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctNmkuniLabel">
            国名
          </div>
          <input
            className={classNames("cstmDetail-ctNmkuniInput", editModeStyle)}
            type="text"
            name="CT_NMKUNI"
            defaultValue={cstm.CT_NMKUNI.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_NMKUNI && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctKbkgtiLabel">
            海外便地帯
          </div>
          <input
            className={classNames("cstmDetail-ctKbkgtiInput", editModeStyle)}
            type="text"
            name="CT_KBKGTI"
            defaultValue={cstm.CT_KBKGTI.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_KBKGTI && <p>エラーメッセージ</p>}
          <div className="cstmDetail-ctKbkgtiGycms gycms">
            {gycmConv("KBKGTI", cstm.CT_KBKGTI)}
          </div>
          <div className="cstmDetail-container-label cstmDetail-ctCdsqsfLabel">
            請求書送付先
          </div>
          <input
            className={classNames("cstmDetail-ctCdsqsfInput", editModeStyle)}
            type="text"
            name="CT_CDSQSF"
            defaultValue={cstm.CT_CDSQSF.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_CDSQSF && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctCdsqsmLabel">
            請求書送付先名
          </div>
          <input
            className={classNames("cstmDetail-ctCdsqsmInput", editModeStyle)}
            type="text"
            name="CT_CDSQSM"
            defaultValue={cstm.CT_CDSQSM.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_CDSQSM && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctNotel1Label">
            TEL1
          </div>
          <input
            className={classNames("cstmDetail-ctNotel1Input", editModeStyle)}
            type="text"
            name="CT_NOTEL1"
            defaultValue={cstm.CT_NOTEL1.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_NOTEL1 && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctNotel2Label">
            TEL2
          </div>
          <input
            className={classNames("cstmDetail-ctNotel2Input", editModeStyle)}
            type="text"
            name="CT_NOTEL2"
            defaultValue={cstm.CT_NOTEL2.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_NOTEL2 && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctAdmailLabel">
            メールアドレス
          </div>
          <input
            className={classNames("cstmDetail-ctAdmailInput", editModeStyle)}
            type="text"
            name="CT_ADMAIL"
            defaultValue={cstm.CT_ADMAIL.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_ADMAIL && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctKbdmprLabel">
            DM発行
          </div>
          <input
            className={classNames("cstmDetail-ctKbdmprInput", editModeStyle)}
            type="text"
            name="CT_KBDMPR"
            defaultValue={cstm.CT_KBDMPR.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_KBDMPR && <p>エラーメッセージ</p>}
          <div className="cstmDetail-ctKbdmprGycms gycms">
            {gycmConv("KBDMPR", cstm.CT_KBDMPR)}
          </div>

          <div className="cstmDetail-container-label cstmDetail-ctTxbikoLabel">
            備考
          </div>
          <input
            className={classNames("cstmDetail-ctTxbikoInput", editModeStyle)}
            type="text"
            name="CT_TXBIKO"
            defaultValue={cstm.CT_TXBIKO.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_TXBIKO && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctTxsshrLabel">
            送本先変更履歴
          </div>
          <input
            className={classNames("cstmDetail-ctTxsshrInput", editModeStyle)}
            type="text"
            name="CT_TXSSHR"
            defaultValue={cstm.CT_TXSSHR.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_TXSSHR && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctKbsebtLabel">
            性別
          </div>
          <input
            className={classNames("cstmDetail-ctKbsebtInput", editModeStyle)}
            type="text"
            name="CT_KBSEBT"
            defaultValue={cstm.CT_KBSEBT.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_KBSEBT && <p>エラーメッセージ</p>}
          <div className="cstmDetail-ctKbsebtGycms gycms">
            {gycmConv("KBSEBT", cstm.CT_KBSEBT)}
          </div>
          <div className="cstmDetail-container-label cstmDetail-ctDtsngpLabel">
            生年月日
          </div>
          <input
            className={classNames("cstmDetail-ctDtsngpInput", editModeStyle)}
            type="text"
            name="CT_DTSNGP"
            defaultValue={
              cstm.CT_DTSNGP.trim() !== ""
                ? moment(cstm.CT_DTSNGP).format("YYYY/MM/DD")
                : ""
            }
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_DTSNGP && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctCdsyokLabel">
            職種
          </div>
          <input
            className={classNames("cstmDetail-ctCdsyokInput", editModeStyle)}
            type="text"
            name="CT_CDSYOK"
            defaultValue={cstm.CT_CDSYOK.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_CDSYOK && <p>エラーメッセージ</p>}
          <div className="cstmDetail-ctCdsyokGycms gycms">
            {gycmConv("CDSYOK", cstm.CT_CDSYOK)}
          </div>
          <div className="cstmDetail-container-label cstmDetail-ctCdbaitLabel">
            申込媒体
          </div>
          <input
            className={classNames("cstmDetail-ctCdbaitInput", editModeStyle)}
            type="text"
            name="CT_CDBAIT"
            defaultValue={cstm.CT_CDBAIT.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_CDBAIT && <p>エラーメッセージ</p>}
          <div className="cstmDetail-ctCdbaitGycms gycms">
            {gycmConv("CDBAIT", cstm.CT_CDBAIT)}
          </div>
          <div className="cstmDetail-container-label cstmDetail-ctCdsyksLabel">
            紹介者詳細
          </div>
          <input
            className={classNames("cstmDetail-ctCdsyksInput", editModeStyle)}
            type="text"
            name="CT_CDSYKS"
            defaultValue={cstm.CT_CDSYKS.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_CDSYKS && <p>エラーメッセージ</p>}
          <div className="cstmDetail-ctCdsyksGycms gycms">
            {gycmConv("CDSYKS", cstm.CT_CDSYKS)}
          </div>
          <div className="cstmDetail-container-label cstmDetail-ctCdsytnLabel">
            社内担当者
          </div>
          <input
            className={classNames("cstmDetail-ctCdsytnInput", editModeStyle)}
            type="text"
            name="CT_CDSYTN"
            defaultValue={cstm.CT_CDSYTN.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_CDSYTN && <p>エラーメッセージ</p>}
          <div className="cstmDetail-ctCdsytnGycms gycms">
            {gycmConv("CDSYTN", cstm.CT_CDSYTN)}
          </div>
          <div className="cstmDetail-container-label cstmDetail-ctCddokiLabel">
            申込動機
          </div>
          <input
            className={classNames("cstmDetail-ctCddokiInput", editModeStyle)}
            type="text"
            name="CT_CDDOKI"
            defaultValue={cstm.CT_CDDOKI.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_CDDOKI && <p>エラーメッセージ</p>}
          <div className="cstmDetail-ctCddokiGycms gycms">
            {gycmConv("CDDOKI", cstm.CT_CDDOKI)}
          </div>
          <div className="cstmDetail-container-label cstmDetail-ctCtsoukLabel">
            総契約数
          </div>
          <input
            className={classNames("cstmDetail-ctCtsoukInput", editModeStyle)}
            type="text"
            name="CT_CTSOUK"
            defaultValue={cstm.CT_CTSOUK.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_CTSOUK && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctKbsekyLabel">
            逝去区分
          </div>
          <input
            className={classNames("cstmDetail-ctKbsekyInput", editModeStyle)}
            type="text"
            name="CT_KBSEKY"
            defaultValue={cstm.CT_KBSEKY.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_KBSEKY && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctKbclamLabel">
            クレーム
          </div>
          <input
            className={classNames("cstmDetail-ctKbclamInput", editModeStyle)}
            type="text"
            name="CT_KBCLAM"
            defaultValue={cstm.CT_KBCLAM.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_KBCLAM && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctKbjyctLabel">
            重要顧客
          </div>
          <input
            className={classNames("cstmDetail-ctKbjyctInput", editModeStyle)}
            type="text"
            name="CT_KBJYCT"
            defaultValue={cstm.CT_KBJYCT.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_KBJYCT && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctKbtkskLabel">
            督促注意
          </div>
          <input
            className={classNames("cstmDetail-ctKbtkskInput", editModeStyle)}
            type="text"
            name="CT_KBTKSK"
            defaultValue={cstm.CT_KBTKSK.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_KBTKSK && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctKbjik1Label">
            事故
          </div>
          <input
            className={classNames("cstmDetail-ctKbjik1Input", editModeStyle)}
            type="text"
            name="CT_KBJIK1"
            defaultValue={cstm.CT_KBJIK1.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_KBJIK1 && <p>エラーメッセージ</p>}
          <input
            className={classNames("cstmDetail-ctKbjik2Input", editModeStyle)}
            type="text"
            name="CT_KBJIK2"
            defaultValue={cstm.CT_KBJIK2.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_KBJIK2 && <p>エラーメッセージ</p>}

          <div className="cstmDetail-container-label cstmDetail-ctKbmschLabel">
            申込注意
          </div>
          <input
            className={classNames("cstmDetail-ctKbmschInput", editModeStyle)}
            type="text"
            name="CT_KBMSCH"
            defaultValue={cstm.CT_KBMSCH.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_KBMSCH && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctCcdatecLabel">
            作成日
          </div>
          <input
            className={classNames("cstmDetail-ctCcdatecInput", editModeStyle)}
            type="text"
            name="CT_CCDATEC"
            defaultValue={
              cstm.CT_CCDATEC.trim() !== ""
                ? moment(cstm.CT_CCDATEC).format("YYYY/MM/DD")
                : ""
            }
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_CCDATEC && <p>エラーメッセージ</p>}

          <div className="cstmDetail-container-label cstmDetail-ctCcdatexLabel">
            更新日
          </div>
          <input
            className={classNames("cstmDetail-ctCcdatexInput", editModeStyle)}
            type="text"
            name="CT_CCDATEX"
            defaultValue={
              cstm.CT_CCDATEX.trim() !== ""
                ? moment(cstm.CT_CCDATEX).format("YYYY/MM/DD")
                : ""
            }
            ref={register({ pattern: /^[0-9]]{6,20}/ })}
          />
          {errors.CT_CCDATEX && <p>エラーメッセージ</p>}
        </div>
        <div className="cstmDetail-buttonContainer">
          {/* {isAuth && privilege.editPublisCstm && ( */}
          {true && (
            <div className="cstmDetail-buttonList">
              {/* <div> */}
              {!editMode ? (
                <button
                  className="cstmDetail-container-button"
                  type="button"
                  onClick={handleEditMode}
                >
                  編集する
                </button>
              ) : (
                <>
                  <button
                    className="cstmDetail-container-button"
                    type="button"
                    onClick={handleEditMode}
                  >
                    キャンセル
                  </button>
                  <button className="cstmDetail-container-button" type="submit">
                    更新
                  </button>
                </>
              )}
              {/* </div> */}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
export default CstmDetailContainer;
