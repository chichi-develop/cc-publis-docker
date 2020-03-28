import React, { useState, useEffect, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../../../store/actions";
import { StoreState } from "../../../store";
// import { useParams, useLocation } from "react-router-dom";
import classNames from "classnames";
import ReactToPrint from "react-to-print";
import Modal from "react-modal";
import _ from "lodash";
import moment from "moment";
// import { makeStyles } from "@material-ui/core/styles";
// import { Close as CloseIcon } from "@material-ui/icons";
// import TextField from "@material-ui/core/TextField";
import Print from "./print";
import CstmDetailShowLog from "./CstmDetailShowLog";
import CstmDetailEditLog from "./CstmDetailEditLog";
// import Modal from "../../Common/Modal";
import {
  Cstm,
  Gycms,
  Gycm,
  Privilege,
  CCLogQuery
} from "../../../types/models";
import "./CstmDetailContainer.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "flex-end"
//   },
//   iconHover: {
//     margin: theme.spacing(1),
//     "&:hover": {
//       // color: blue[800],
//       color: "#172b4d"
//     }
//   }
// }));

Modal.setAppElement("#modal-root");

// const CustomTextField = (props: any) => {
//   return (
//     <TextField
//       label={props.label}
//       value={props.value}
//       fullWidth
//       margin="normal"
//       variant="outlined"
//     />
//   );
// };

type Props = {
  cstm: Cstm;
  gycms: Gycms;
  editCstmStart: typeof Actions.editCstmStart;
  addCCLogStart: typeof Actions.addCCLogStart;
  replaceCstm: typeof Actions.replaceCstm;
  isAuth: boolean;
  privilege: Privilege;
  userID: string;
};

// TODO: input submitを入れてテスト
const CstmDetailContainer: React.FC = () => {
  const authState = useSelector((state: StoreState) => state.auth);
  const publisState = useSelector((state: StoreState) => state.publis);
  const cclogState = useSelector((state: StoreState) => state.cclog);
  const dispatch = useDispatch();
  const editCstmStart = useCallback(
    (cdcstm: string, cstm: Cstm) =>
      dispatch(Actions.editCstmStart(cdcstm, cstm)),
    [dispatch]
  );

  const getGycmStart = useCallback(() => dispatch(Actions.getGycmStart()), [
    dispatch
  ]);

  const addCCLogStart = useCallback(
    (cclog: CCLogQuery, getQuery: CCLogQuery) =>
      dispatch(Actions.addCCLogStart(cclog, getQuery)),
    [dispatch]
  );

  const getCCLogStart = useCallback(
    (getQuery: CCLogQuery) => dispatch(Actions.getCCLogStart(getQuery)),
    [dispatch]
  );

  const replaceCstm = useCallback(
    (cdcstm: string, cstm: Cstm) => dispatch(Actions.replaceCstm(cdcstm, cstm)),
    [dispatch]
  );

  const componentRef: any = useRef(null);

  let privilege = authState.privilege;
  let isAuth = authState.isAuth;
  let userID = authState.userID;
  let cstm = publisState.cstm as Cstm;
  let showListCstm = publisState.showListCstm;
  let gycms = publisState.gycms as Gycms;
  let setGycm = publisState.setGycm;
  let showCstmDetailLogs = cclogState.showCstmDetailLogs;
  let editCstmDetailLogs = cclogState.editCstmDetailLogs;

  // const classes = useStyles();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    console.log("CstmDetailContainer render!");
    return () => console.log("unmounting...");
  }, []);

  useEffect(() => {
    if (!setGycm && showListCstm) {
      getGycmStart();
    }
  }, [cstm, showListCstm, setGycm, getGycmStart]);

  useEffect(() => {
    if (cstm.CT_CDCSTM !== undefined) {
      addCCLogStart(
        {
          logId: "showCstmDetailLog",
          userId: userID.replace(/@.*$/, ""),
          applicationId: "cc-publis",
          componentId: "CstmDetailContainer",
          functionId: "CstmDetailContainer-show",
          cdcstm: cstm.CT_CDCSTM.trim(),
          nmcstm: cstm.CT_NMCSTM.trim()
        },
        {
          userId: userID.replace(/@.*$/, ""),
          logId: "showCstmDetailLog"
        }
      );
      getCCLogStart({
        logId: "editCstmDetailLog",
        cdcstm: cstm.CT_CDCSTM
      });
    }
  }, [cstm, userID, addCCLogStart, getCCLogStart]);

  return (
    <div className="cstmDetail-body">
      {showListCstm && setGycm && (
        <>
          <div className="cstmDetail-menu">
            <p className="frame-title">顧客情報詳細</p>
            <div className="cstmDetail-menu-container">
              {/* <Modal
                title="編集履歴（モーダル）"
                open={(handleOpenModal: () => void) => (
                  <button onClick={handleOpenModal}>
                    編集履歴（モーダル）
                  </button>
                )}
                content={(handleCloseModal: () => void) => (
                  <CstmDetailEditLog />
                )}
                outClickClose={false}
              /> */}

              <CstmDetailShowLog cclogs={showCstmDetailLogs} />
              {editCstmDetailLogs.length > 0 && (
                <>
                  <button onClick={openModal}>変更履歴</button>
                  <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                  >
                    {/* <button onClick={closeModal}>close</button> */}
                    {/* <CloseIcon
                  className={classes.iconHover}
                  fontSize="large"
                  color="disabled"
                  style={{ fontSize: 20 }}
                  onClick={closeModal}
                /> */}
                    <CstmDetailEditLog cclogs={editCstmDetailLogs} />
                  </Modal>
                </>
              )}

              <ReactToPrint
                trigger={() => <button>ラベル印刷</button>}
                content={() => componentRef.current}
              />
              <div style={{ display: "none" }}>
                <Print ref={componentRef} cstm={cstm} />
              </div>
            </div>
          </div>
          <CstmDetail
            cstm={cstm}
            gycms={gycms}
            editCstmStart={editCstmStart}
            addCCLogStart={addCCLogStart}
            replaceCstm={replaceCstm}
            isAuth={isAuth}
            privilege={privilege}
            userID={userID}
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
  addCCLogStart,
  replaceCstm,
  isAuth,
  privilege,
  userID
}) => {
  const [editMode, setEditMode] = useState(false);
  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  const { register, handleSubmit, setValue, watch, errors, reset } = useForm();

  const kbksyoCode = watch("CT_KBKSYO");
  const kbsebtCode = watch("CT_KBSEBT");
  const kbdmprCode = watch("CT_KBDMPR");
  const cdsyokCode = watch("CT_CDSYOK");

  const onSubmit = async (data: Record<string, any>) => {
    // console.log(data);
    // alert(JSON.stringify(data));
    const updateCstm = Object.assign({}, cstm, data, {
      CT_DTSNGP: data.CT_DTSNGP.replace(/\//g, ""),
      CT_CCDATEC: data.CT_CCDATEC.replace(/\//g, ""),
      CT_CCDATEX: moment().format("YYYYMMDD"),
      CT_CCTIMEX: moment().format("HHmmss"),
      CT_CCTERMX: "Web",
      CT_CCOUSRX: userID.replace(/@.*$/, ""),
      CT_CCUSERX: userID.replace(/@.*$/, ""),
      CT_CCFUNCX: "editCstmStart"
    });

    await editCstmStart(
      cstm.CT_CDCSTM,
      Object.assign({}, cstm, data, updateCstm)
    );

    const editDetail = Object.entries(cstm).map(
      ([key, value], index, array) => {
        if (
          _.trim(value) !== _.trim(updateCstm[`${key}`]) &&
          key.slice(0, 5) !== "CT_CC"
        ) {
          return `【${key}】: [${_.trim(value)}] => [${_.trim(
            updateCstm[`${key}`]
          )}]`;
        }
        return null;
      }
    );

    addCCLogStart(
      {
        logId: "editCstmDetailLog",
        userId: userID.replace(/@.*$/, ""),
        applicationId: "cc-publis",
        componentId: "CstmDetailContainer",
        functionId: "CstmDetailContainer-show",
        cdcstm: cstm.CT_CDCSTM.trim(),
        nmcstm: cstm.CT_NMCSTM.trim(),
        detail: editDetail.filter(n => n).join(",")
      },
      { logId: "editCstmDetailLog", cdcstm: cstm.CT_CDCSTM }
    );

    replaceCstm(cstm.CT_CDCSTM, updateCstm);

    handleEditMode();
  };

  useEffect(() => {
    console.log("CstmDetail render!");
    return () => {
      reset();
      console.log("unmounting...");
    };
  }, [reset]);

  useEffect(() => {
    reset();
    setEditMode(false);
  }, [cstm, reset]);

  const gycmConv = (cdbnri: string, cdbnsy: string) =>
    gycms.filter(r => r.GY_CDBNRI === cdbnri && r.GY_CDBNSY === cdbnsy)[0]
      .GY_NMBNSY;

  const gycmOption = (cdbnri: string) =>
    gycms
      .filter(r => r.GY_CDBNRI === cdbnri)
      .sort((a, b) => Number(a.GY_CDBNSY) - Number(b.GY_CDBNSY))
      .map((item: Gycm) => (
        <option key={item.GY_CDBNSY} value={item.GY_CDBNSY}>
          {item.GY_CDBNSY}　　: {item.GY_NMBNSY}
        </option>
      ));

  let editModeInputStyle = (flg: boolean = false) => [
    "cstmDetail-container-common",
    {
      "cstmDetail-container-input-editMode": editMode && flg,
      "cstmDetail-container-input-readMode": !editMode || !flg
    }
  ];

  let editModeSelectStyle = (flg: boolean = false) => [
    "cstmDetail-container-common",
    {
      "cstmDetail-container-select-editMode": editMode && flg,
      "cstmDetail-container-select-readMode": !editMode || !flg
    }
  ];

  return (
    <div className="cstmDetail-container">
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        // key={(cstm.CT_CDCSTM, cstm.CT_KBSEBT, kbsebtCode)}
        key={cstm.CT_CDCSTM}
      >
        <div className="cstmDetail-gridContainer">
          <div className="cstmDetail-container-label cstmDetail-ctCdcstmLabel">
            読者No.
          </div>
          {/* <CustomTextField
            className={classNames("cstmDetail-ctCdcstmInput", editModeInputStyle)}
            type="text"
            name="CT_CDCSTM"
            label="読者番号"
            defaultValue={cstm.CT_CDCSTM.replace(/\s+$/g, "")}
            inputRef={register()}
            value={cstm.CT_CDCSTM.trim()}
          /> */}
          <input
            className={classNames(
              "cstmDetail-ctCdcstmInput",
              editModeInputStyle()
            )}
            type="text"
            name="CT_CDCSTM"
            readOnly={true}
            defaultValue={cstm.CT_CDCSTM.replace(/\s+$/g, "")}
            // ref={register({ pattern: /^2[0-9]{7}/ })}
            ref={register({ pattern: /^[0-9]{8}/ })}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_CDCSTM && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctKbcstmLabel">
            顧客区分
          </div>
          {/* <input
            className={classNames("cstmDetail-ctKbcstmInput", editModeInputStyle())}
            type="text"
            name="CT_KBCSTM"
            readOnly={true}
            defaultValue={cstm.CT_KBCSTM.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
            ref={register}
          />
          <div className="cstmDetail-ctKbcstmGycms gycms">
            {gycmConv("KBCSTM", cstm.CT_KBCSTM)}
          </div> */}

          <select
            className={classNames(
              "cstmDetail-ctKbcstmInput",
              "cstmDetail-container-selectBox",
              editModeSelectStyle()
            )}
            name="CT_KBCSTM"
            // ref={register}
            ref={register({ pattern: /[0-9]/ })}
            defaultValue={cstm.CT_KBCSTM.replace(/\s+$/g, "")}
            onChange={e => {
              setValue("CT_KBCSTM", e.target.value, true);
            }}
          >
            {gycmOption("KBCSTM")}
          </select>

          {errors.CT_KBCSTM && <p>エラーメッセージ</p>}
          <div className="cstmDetail-ctKbcstmGycms gycms">
            {gycmConv("KBCSTM", cstm.CT_KBCSTM)}
          </div>
          {errors.CT_KBCSTM && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctNmcstmLabel">
            顧客名
          </div>
          <input
            className={classNames(
              "cstmDetail-ctNmcstmInput",
              editModeInputStyle()
            )}
            type="text"
            name="CT_NMCSTM"
            readOnly={true}
            defaultValue={cstm.CT_NMCSTM.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_NMCSTM && <p>エラーメッセージ</p>}
          <input
            className={classNames(
              "cstmDetail-ctNkcstmInput",
              editModeInputStyle()
            )}
            type="text"
            name="CT_NKCSTM"
            readOnly={true}
            defaultValue={cstm.CT_NKCSTM.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_NKCSTM && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctNmtnbuLabel">
            部署名
          </div>
          <input
            className={classNames(
              "cstmDetail-ctNmtnbuInput",
              editModeInputStyle(true)
            )}
            type="text"
            name="CT_NMTNBU"
            readOnly={!editMode}
            defaultValue={cstm.CT_NMTNBU.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_NMTNBU && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctNmtntoLabel">
            担当者名
          </div>
          <input
            className={classNames(
              "cstmDetail-ctNmtntoInput",
              editModeInputStyle()
            )}
            type="text"
            name="CT_NMTNTO"
            readOnly={true}
            defaultValue={cstm.CT_NMTNTO.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_NMTNTO && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctNmsimeLabel">
            氏名
          </div>
          <input
            className={classNames(
              "cstmDetail-ctNmsimeInput",
              editModeInputStyle()
            )}
            type="text"
            name="CT_NMSIME"
            readOnly={true}
            defaultValue={cstm.CT_NMSIME.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_NMSIME && <p>エラーメッセージ</p>}
          <input
            className={classNames(
              "cstmDetail-ctNksimeInput",
              editModeInputStyle()
            )}
            type="text"
            name="CT_NKSIME"
            readOnly={true}
            defaultValue={cstm.CT_NKSIME.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_NKSIME && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctKbksyoLabel">
            敬称区分
          </div>

          {/* <input
            className={classNames("cstmDetail-ctKbksyoInput", editModeInputStyle())}
            type="text"
            name="CT_KBKSYO"
            readOnly={true}
            defaultValue={cstm.CT_KBKSYO.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          /> */}

          <select
            className={classNames(
              "cstmDetail-ctKbksyoInput",
              "cstmDetail-container-selectBox",
              editModeSelectStyle(true)
            )}
            name="CT_KBKSYO"
            defaultValue={cstm.CT_KBKSYO.replace(/\s+$/g, "")}
            ref={register()}
            onChange={e => {
              setValue("CT_KBKSYO", e.target.value, true);
            }}
          >
            {gycmOption("KBKSYO")}
          </select>

          {errors.CT_KBKSYO && <p>エラーメッセージ</p>}
          <div className="cstmDetail-ctKbksyoGycms gycms">
            {editMode
              ? gycmConv(
                  "KBKSYO",
                  kbksyoCode || cstm.CT_KBKSYO.replace(/\s+$/g, "")
                )
              : gycmConv("KBKSYO", cstm.CT_KBKSYO)}
          </div>
          <div className="cstmDetail-container-label cstmDetail-ctNoyubnLabel">
            郵便番号
          </div>
          <input
            className={classNames(
              "cstmDetail-ctNoyubnInput",
              editModeInputStyle(true)
            )}
            type="text"
            name="CT_NOYUBN"
            readOnly={!editMode}
            defaultValue={cstm.CT_NOYUBN.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_NOYUBN && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctAdcst1Label">
            住所１
          </div>
          <input
            className={classNames(
              "cstmDetail-ctAdcst1Input",
              editModeInputStyle(true)
            )}
            type="text"
            name="CT_ADCST1"
            readOnly={!editMode}
            defaultValue={cstm.CT_ADCST1.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_ADCST1 && <p>エラーメッセージ</p>}
          <input
            className={classNames(
              "cstmDetail-ctAdcst2Input",
              editModeInputStyle(true)
            )}
            type="text"
            name="CT_ADCST2"
            readOnly={!editMode}
            defaultValue={cstm.CT_ADCST2.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_ADCST2 && <p>エラーメッセージ</p>}
          <input
            className={classNames(
              "cstmDetail-ctAdcst3Input",
              editModeInputStyle(true)
            )}
            type="text"
            name="CT_ADCST3"
            readOnly={!editMode}
            defaultValue={cstm.CT_ADCST3.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_ADCST3 && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctNmkuniLabel">
            国名
          </div>
          <input
            className={classNames(
              "cstmDetail-ctNmkuniInput",
              editModeInputStyle(true)
            )}
            type="text"
            name="CT_NMKUNI"
            readOnly={!editMode}
            defaultValue={cstm.CT_NMKUNI.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_NMKUNI && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctKbkgtiLabel">
            海外便地帯
          </div>
          <input
            className={classNames(
              "cstmDetail-ctKbkgtiInput",
              editModeInputStyle()
            )}
            type="text"
            name="CT_KBKGTI"
            readOnly={true}
            defaultValue={cstm.CT_KBKGTI.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_KBKGTI && <p>エラーメッセージ</p>}
          <div className="cstmDetail-ctKbkgtiGycms gycms">
            {gycmConv("KBKGTI", cstm.CT_KBKGTI)}
          </div>
          <div className="cstmDetail-container-label cstmDetail-ctCdsqsfLabel">
            請求書送付先
          </div>
          <input
            className={classNames(
              "cstmDetail-ctCdsqsfInput",
              editModeInputStyle(true)
            )}
            type="text"
            name="CT_CDSQSF"
            readOnly={!editMode}
            defaultValue={cstm.CT_CDSQSF.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_CDSQSF && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctCdsqsmLabel">
            請求書送付先名
          </div>
          <input
            className={classNames(
              "cstmDetail-ctCdsqsmInput",
              editModeInputStyle(true)
            )}
            type="text"
            name="CT_CDSQSM"
            readOnly={!editMode}
            defaultValue={cstm.CT_CDSQSM.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_CDSQSM && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctNotel1Label">
            TEL1
          </div>
          <input
            className={classNames(
              "cstmDetail-ctNotel1Input",
              editModeInputStyle(true)
            )}
            type="text"
            name="CT_NOTEL1"
            readOnly={!editMode}
            defaultValue={cstm.CT_NOTEL1.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_NOTEL1 && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctNotel2Label">
            TEL2
          </div>
          <input
            className={classNames(
              "cstmDetail-ctNotel2Input",
              editModeInputStyle(true)
            )}
            type="text"
            name="CT_NOTEL2"
            readOnly={!editMode}
            defaultValue={cstm.CT_NOTEL2.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_NOTEL2 && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctAdmailLabel">
            メールアドレス
          </div>
          <input
            className={classNames(
              "cstmDetail-ctAdmailInput",
              editModeInputStyle(true)
            )}
            type="text"
            name="CT_ADMAIL"
            readOnly={!editMode}
            defaultValue={cstm.CT_ADMAIL.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_ADMAIL && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctKbdmprLabel">
            DM発行
          </div>
          {/* <input
            className={classNames("cstmDetail-ctKbdmprInput", editModeInputStyle(true))}
            type="text"
            name="CT_KBDMPR"
            readOnly={!editMode}
            defaultValue={cstm.CT_KBDMPR.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          /> */}

          <select
            className={classNames(
              "cstmDetail-ctKbdmprInput",
              "cstmDetail-container-selectBox",
              editModeSelectStyle(true)
            )}
            name="CT_KBDMPR"
            ref={register()}
            defaultValue={cstm.CT_KBDMPR.replace(/\s+$/g, "")}
            onChange={e => {
              setValue("CT_KBDMPR", e.target.value, true);
            }}
          >
            {gycmOption("KBDMPR")}
          </select>

          {errors.CT_KBDMPR && <p>エラーメッセージ</p>}
          <div className="cstmDetail-ctKbdmprGycms gycms">
            {editMode
              ? gycmConv(
                  "KBDMPR",
                  kbdmprCode || cstm.CT_KBDMPR.replace(/\s+$/g, "")
                )
              : gycmConv("KBDMPR", cstm.CT_KBDMPR)}
          </div>

          <div className="cstmDetail-container-label cstmDetail-ctTxbikoLabel">
            備考
          </div>
          <input
            className={classNames(
              "cstmDetail-ctTxbikoInput",
              editModeInputStyle()
            )}
            type="text"
            name="CT_TXBIKO"
            readOnly={true}
            defaultValue={cstm.CT_TXBIKO.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_TXBIKO && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctTxsshrLabel">
            送本先変更履歴
          </div>
          <input
            className={classNames(
              "cstmDetail-ctTxsshrInput",
              editModeInputStyle()
            )}
            type="text"
            name="CT_TXSSHR"
            readOnly={true}
            defaultValue={cstm.CT_TXSSHR.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_TXSSHR && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctKbsebtLabel">
            性別
          </div>
          {/* <input
            className={classNames("cstmDetail-ctKbsebtInput", editModeInputStyle())}
            type="text"
            name="CT_KBSEBT"
            readOnly={true}
            defaultValue={cstm.CT_KBSEBT.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          /> */}
          <select
            className={classNames(
              "cstmDetail-ctKbsebtInput",
              "cstmDetail-container-selectBox",
              editModeSelectStyle(true)
            )}
            name="CT_KBSEBT"
            ref={register()}
            defaultValue={cstm.CT_KBSEBT.replace(/\s+$/g, "")}
            onChange={e => {
              setValue("CT_KBSEBT", e.target.value, true);
            }}
          >
            {gycmOption("KBSEBT")}
          </select>

          {errors.CT_KBSEBT && <p>エラーメッセージ</p>}
          {/* <div className="cstmDetail-ctKbsebtGycms gycms">
            {gycmConv("KBSEBT", cstm.CT_KBSEBT)}
          </div> */}
          <div className="cstmDetail-ctKbsebtGycms gycms">
            {editMode
              ? gycmConv(
                  "KBSEBT",
                  kbsebtCode || cstm.CT_KBSEBT.replace(/\s+$/g, "")
                )
              : gycmConv("KBSEBT", cstm.CT_KBSEBT)}
          </div>
          <div className="cstmDetail-container-label cstmDetail-ctDtsngpLabel">
            生年月日
          </div>
          <input
            className={classNames(
              "cstmDetail-ctDtsngpInput",
              editModeInputStyle(true)
            )}
            type="text"
            name="CT_DTSNGP"
            readOnly={!editMode}
            defaultValue={
              cstm.CT_DTSNGP.trim() !== ""
                ? moment(cstm.CT_DTSNGP).format("YYYY/MM/DD")
                : ""
            }
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_DTSNGP && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctCdsyokLabel">
            職種
          </div>
          {/* <input
            className={classNames(
              "cstmDetail-ctCdsyokInput",
              editModeInputStyle(true)
            )}
            type="text"
            name="CT_CDSYOK"
            readOnly={!editMode}
            defaultValue={cstm.CT_CDSYOK.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          /> */}

          <select
            className={classNames(
              "cstmDetail-ctCdsyokInput",
              "cstmDetail-container-selectBox",
              editModeSelectStyle(true)
            )}
            name="CT_CDSYOK"
            ref={register()}
            defaultValue={cstm.CT_CDSYOK.replace(/\s+$/g, "")}
            onChange={e => {
              setValue("CT_CDSYOK", e.target.value, true);
            }}
          >
            {gycmOption("CDSYOK")}
          </select>
          {errors.CT_CDSYOK && <p>エラーメッセージ</p>}
          <div className="cstmDetail-ctCdsyokGycms gycms">
            {editMode
              ? gycmConv(
                  "CDSYOK",
                  cdsyokCode || cstm.CT_CDSYOK.replace(/\s+$/g, "")
                )
              : gycmConv("CDSYOK", cstm.CT_CDSYOK)}
          </div>
          <div className="cstmDetail-container-label cstmDetail-ctCdbaitLabel">
            申込媒体
          </div>
          <input
            className={classNames(
              "cstmDetail-ctCdbaitInput",
              editModeInputStyle()
            )}
            type="text"
            name="CT_CDBAIT"
            readOnly={true}
            defaultValue={cstm.CT_CDBAIT.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_CDBAIT && <p>エラーメッセージ</p>}
          <div className="cstmDetail-ctCdbaitGycms gycms">
            {gycmConv("CDBAIT", cstm.CT_CDBAIT)}
          </div>
          <div className="cstmDetail-container-label cstmDetail-ctCdsyksLabel">
            紹介者詳細
          </div>
          <input
            className={classNames(
              "cstmDetail-ctCdsyksInput",
              editModeInputStyle()
            )}
            type="text"
            name="CT_CDSYKS"
            readOnly={true}
            defaultValue={cstm.CT_CDSYKS.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_CDSYKS && <p>エラーメッセージ</p>}
          <div className="cstmDetail-ctCdsyksGycms gycms">
            {gycmConv("CDSYKS", cstm.CT_CDSYKS)}
          </div>
          <div className="cstmDetail-container-label cstmDetail-ctCdsytnLabel">
            社内担当者
          </div>
          <input
            className={classNames(
              "cstmDetail-ctCdsytnInput",
              editModeInputStyle()
            )}
            type="text"
            name="CT_CDSYTN"
            readOnly={true}
            defaultValue={cstm.CT_CDSYTN.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_CDSYTN && <p>エラーメッセージ</p>}
          <div className="cstmDetail-ctCdsytnGycms gycms">
            {gycmConv("CDSYTN", cstm.CT_CDSYTN)}
          </div>
          <div className="cstmDetail-container-label cstmDetail-ctCddokiLabel">
            申込動機
          </div>
          <input
            className={classNames(
              "cstmDetail-ctCddokiInput",
              editModeInputStyle()
            )}
            type="text"
            name="CT_CDDOKI"
            readOnly={true}
            defaultValue={cstm.CT_CDDOKI.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_CDDOKI && <p>エラーメッセージ</p>}
          <div className="cstmDetail-ctCddokiGycms gycms">
            {gycmConv("CDDOKI", cstm.CT_CDDOKI)}
          </div>
          <div className="cstmDetail-container-label cstmDetail-ctCtsoukLabel">
            総契約数
          </div>
          <input
            className={classNames(
              "cstmDetail-ctCtsoukInput",
              editModeInputStyle()
            )}
            type="text"
            name="CT_CTSOUK"
            readOnly={true}
            defaultValue={cstm.CT_CTSOUK.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_CTSOUK && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctKbsekyLabel">
            逝去区分
          </div>
          {/* <input
            className={classNames("cstmDetail-ctKbsekyInput", editModeInputStyle())}
            type="text"
            name="CT_KBSEKY"
            readOnly={true}
            defaultValue={cstm.CT_KBSEKY.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          /> */}

          <select
            className={classNames(
              "cstmDetail-ctKbsekyInput",
              "cstmDetail-container-selectBox",
              editModeSelectStyle(true)
            )}
            name="CT_KBSEKY"
            ref={register()}
            defaultValue={cstm.CT_KBSEKY.replace(/\s+$/g, "")}
            onChange={e => {
              setValue("CT_KBSEKY", e.target.value, true);
            }}
          >
            {gycmOption("KBSEKY")}
          </select>

          {errors.CT_KBSEKY && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctKbclamLabel">
            クレーム
          </div>
          <input
            className={classNames(
              "cstmDetail-ctKbclamInput",
              editModeInputStyle()
            )}
            type="text"
            name="CT_KBCLAM"
            readOnly={true}
            defaultValue={cstm.CT_KBCLAM.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_KBCLAM && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctKbjyctLabel">
            重要顧客
          </div>
          <input
            className={classNames(
              "cstmDetail-ctKbjyctInput",
              editModeInputStyle()
            )}
            type="text"
            name="CT_KBJYCT"
            readOnly={true}
            defaultValue={cstm.CT_KBJYCT.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_KBJYCT && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctKbtkskLabel">
            督促注意
          </div>
          <input
            className={classNames(
              "cstmDetail-ctKbtkskInput",
              editModeInputStyle()
            )}
            type="text"
            name="CT_KBTKSK"
            readOnly={true}
            defaultValue={cstm.CT_KBTKSK.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_KBTKSK && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctKbjik1Label">
            事故
          </div>
          <input
            className={classNames(
              "cstmDetail-ctKbjik1Input",
              editModeInputStyle()
            )}
            type="text"
            name="CT_KBJIK1"
            readOnly={true}
            defaultValue={cstm.CT_KBJIK1.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_KBJIK1 && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctKbjik2Label">
            事故(売掛)
          </div>
          <input
            className={classNames(
              "cstmDetail-ctKbjik2Input",
              editModeInputStyle()
            )}
            type="text"
            name="CT_KBJIK2"
            readOnly={true}
            defaultValue={cstm.CT_KBJIK2.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_KBJIK2 && <p>エラーメッセージ</p>}

          <div className="cstmDetail-container-label cstmDetail-ctKbmschLabel">
            申込注意
          </div>
          <input
            className={classNames(
              "cstmDetail-ctKbmschInput",
              editModeInputStyle()
            )}
            type="text"
            name="CT_KBMSCH"
            readOnly={true}
            defaultValue={cstm.CT_KBMSCH.replace(/\s+$/g, "")}
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_KBMSCH && <p>エラーメッセージ</p>}
          <div className="cstmDetail-container-label cstmDetail-ctCcdatecLabel">
            作成日
          </div>
          <input
            className={classNames(
              "cstmDetail-ctCcdatecInput",
              editModeInputStyle()
            )}
            type="text"
            name="CT_CCDATEC"
            readOnly={true}
            defaultValue={
              cstm.CT_CCDATEC.trim() !== ""
                ? moment(cstm.CT_CCDATEC).format("YYYY/MM/DD")
                : ""
            }
            ref={register()}
            onFocus={e => e.currentTarget.select()}
          />
          {errors.CT_CCDATEC && <p>エラーメッセージ</p>}

          <div className="cstmDetail-container-label cstmDetail-ctCcdatexLabel">
            更新日
          </div>
          <input
            className={classNames(
              "cstmDetail-ctCcdatexInput",
              editModeInputStyle()
            )}
            type="text"
            name="CT_CCDATEX"
            readOnly={true}
            defaultValue={
              cstm.CT_CCDATEX.trim() !== ""
                ? moment(cstm.CT_CCDATEX).format("YYYY/MM/DD")
                : ""
            }
            ref={register()}
            onFocus={e => e.currentTarget.select()}
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
                    onClick={() => {
                      handleEditMode();
                      reset();
                    }}
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
