import React, { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../../../store/actions";
import { StoreState } from "../../../store";

import { Cstm, Kiyk, Gycms } from "../../../types/models";

import "./KiykCstmContainer.css";

type Props = {
  cstm: Cstm;
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
    console.log("KiykCstmContainer render!");
    if (
      kiyk.KY_CDSQSK !== sqsk.CT_CDCSTM ||
      kiyk.KY_CDSHSK !== shsk.CT_CDCSTM
    ) {
      showListKiyk && kiykCstmSearch(kiyk.KY_CDSQSK, kiyk.KY_CDSHSK);
    }
    if (!setGycm) {
      getGycmStart();
    }
    return () => console.log("unmounting...");
  }, [
    kiyk,
    sqsk,
    shsk,
    kiykCstmSearch,
    showListKiyk,
    gycms,
    setGycm,
    getGycmStart
  ]);

  return (
    <div className="kiykCstm-body">
      {showListKiyk && showListKiykCstm && (
        <>
          <p className="frame-title">契約顧客マスタ</p>
          <div className="kiykCstm-frame">
            <KiykCstmDetail cstm={sqsk} />
            <KiykCstmDetail cstm={shsk} />
          </div>
        </>
      )}
    </div>
  );
};

const KiykCstmDetail: React.FC<Props> = ({ cstm }) => {
  // const { register, handleSubmit, errors } = useForm();
  const { register, errors } = useForm();
  // const { register, handleSubmit, errors } = useForm({
  //   defaultValues: {
  //     cdcstm: publisState.cstms[0].CT_CDCSTM,
  //     tel1: publisState.cstms[0].CT_NOTEL1,
  //     tel2: publisState.cstms[0].CT_NOTEL2,
  //     nmcstm: publisState.cstms[0].CT_NMCSTM,
  //     nmsime: publisState.cstms[0].CT_NMSIME,
  //     address1: publisState.cstms[0].CT_ADCST1,
  //     address2: publisState.cstms[0].CT_ADCST2,
  //     address3: publisState.cstms[0].CT_ADCST3
  //   }
  // });

  useEffect(() => {
    console.log("KiykCstmDetail render!");
    return () => console.log("unmounting...");
  }, []);

  return (
    <div className="kiykCstm-container">
      <form
        className="kiykCstm-gridContainer"
        autoComplete="off"
        // onSubmit={handleSubmit(onSubmit)}
        key={cstm.CT_CDCSTM}
      >
        <p>{cstm.CT_CDCSTM}</p>
        <p>{cstm.CT_NMCSTM}</p>
        <div className="kiykCstm-gridContainer-column">
          <p>読者番号</p>
          <input
            type="text"
            name="cdcstm"
            defaultValue={cstm.CT_CDCSTM.replace("/s+$/g", "")}
            ref={register({ pattern: /^2[0-9]{7}/ })}
          />
          {errors.cdcstm && <p>cdcstm is 8 characters starting with 2</p>}
        </div>

        <div className="cstmDetai-gridContainer-column">
          <p>電話番号１</p>
          <input
            type="text"
            name="tel1"
            defaultValue={cstm.CT_NOTEL1.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
          />
          {errors.tel1 && <p>tel1 is Numbers from 6 to 20 characters</p>}
        </div>

        <div className="cstmDetai-gridContainer-column">
          <p>電話番号２</p>
          <input
            type="text"
            name="tel2"
            defaultValue={cstm.CT_NOTEL2.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
          />
          {errors.tel2 && <p>tel2 is Numbers from 6 to 20 characters</p>}
        </div>

        <div className="cstmDetai-gridContainer-column">
          <p>顧客名</p>
          <input
            type="text"
            name="nmcstm"
            // defaultValue={cstm.CT_NMCSTM}
            defaultValue={cstm.CT_NMCSTM.replace(/\s+$/g, "")}
            ref={register({ minLength: 2, maxLength: 50 })}
          />
          {errors.nmcstm && <p>nmcstm is Strings from 2 to 50 characters</p>}
        </div>

        <div className="cstmDetai-gridContainer-column">
          <p>氏名</p>
          <input
            type="text"
            name="nmsime"
            defaultValue={cstm.CT_NMSIME.replace(/\s+$/g, "")}
            ref={register({ minLength: 2, maxLength: 50 })}
          />
          {errors.nmsime && <p>nmsime is Strings from 2 to 50 characters</p>}
        </div>

        <div className="cstmDetai-gridContainer-column">
          <p>住所１</p>
          <input
            type="text"
            name="address1"
            defaultValue={cstm.CT_ADCST1.replace(/\s+$/g, "")}
            ref={register({ minLength: 2, maxLength: 50 })}
          />
          {errors.address1 && (
            <p>address1 is Strings from 2 to 50 characters</p>
          )}
        </div>

        <div className="cstmDetai-gridContainer-column">
          <p>住所２</p>
          <input
            type="text"
            name="address2"
            defaultValue={cstm.CT_ADCST2.replace(/\s+$/g, "")}
            ref={register({ minLength: 2, maxLength: 50 })}
          />
          {errors.address2 && (
            <p>address2 is Strings from 2 to 50 characters</p>
          )}
        </div>

        <div className="cstmDetai-gridContainer-column">
          <p>住所３</p>
          <input
            type="text"
            name="address3"
            defaultValue={cstm.CT_ADCST3.replace(/\s+$/g, "")}
            ref={register({ minLength: 2, maxLength: 50 })}
          />
          {errors.address3 && (
            <p>address3 is Strings from 2 to 50 characters</p>
          )}
        </div>
        {/* <button type="submit">更新</button> */}
        {/* <input type="submit">更新</input> */}
      </form>
    </div>
  );
};
export default KiykCstmContainer;
