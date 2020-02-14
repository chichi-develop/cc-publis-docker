import React, { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../../../store/actions";
import { StoreState } from "../../../store";
// import { useParams, useLocation } from "react-router-dom";

import { Kiyk, Gycms } from "../../../types/models";

import "./KiykDetailContainer.css";

type Props = {
  kiyk: Kiyk;
};

// TODO: input submitを入れてテスト
const KiykDetailContainer: React.FC = () => {
  const publisState = useSelector((state: StoreState) => state.publis);
  const dispatch = useDispatch();
  const getGycmStart = useCallback(() => dispatch(Actions.getGycmStart()), [
    dispatch
  ]);

  let kiyk = publisState.kiyk as Kiyk;
  let showListKiyk = publisState.showListKiyk;
  let gycms = publisState.gycms as Gycms;
  let setGycm = publisState.setGycm;

  useEffect(() => {
    console.log("KiykDetailContainer render!");
    if (!setGycm) {
      getGycmStart();
    }
    return () => console.log("unmounting...");
  }, [kiyk, showListKiyk, gycms, setGycm, getGycmStart]);

  return (
    <div className="kiykDetail-body">
      {showListKiyk && (
        <>
          <p className="frame-title">契約詳細</p>
          <KiykDetail kiyk={kiyk} />
        </>
      )}
    </div>
  );
};

const KiykDetail: React.FC<Props> = ({ kiyk }) => {
  const { register, handleSubmit, errors } = useForm();
  // const { register, handleSubmit, errors } = useForm({
  //   defaultValues: {
  //     cdcstm: publisState.cstms[0].KY_NOKIYK,
  //     tel1: publisState.cstms[0].CT_NOTEL1,
  //     tel2: publisState.cstms[0].CT_NOTEL2,
  //     nmcstm: publisState.cstms[0].CT_NMCSTM,
  //     nmsime: publisState.cstms[0].CT_NMSIME,
  //     address1: publisState.cstms[0].CT_ADCST1,
  //     address2: publisState.cstms[0].CT_ADCST2,
  //     address3: publisState.cstms[0].CT_ADCST3
  //   }
  // });

  const onSubmit = (data: Record<string, any>) => {
    //   history.push(`/kiyk?columnName=ct_cdcstm&key=${data.cdcstm}%`);
    console.log(data);
  };

  useEffect(() => {
    console.log("KiykDetail render!");
    return () => console.log("unmounting...");
  }, []);

  return (
    <div className="kiykDetail-container">
      <form
        className="kiykDetail-gridContainer"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        key={kiyk.KY_NOKIYK}
      >
        <p>{kiyk.KY_NOKIYK}</p>

        <div className="kiykDetail-gridContainer-column">
          <p>契約番号</p>
          <input
            type="text"
            name="cdcstm"
            // defaultValue={kiyk.KY_NOKIYK.replace("/s+$/g", "")}
            defaultValue={kiyk.KY_NOKIYK}
            ref={register({ pattern: /^2[0-9]{7}/ })}
          />
          {errors.cdcstm && <p>cdcstm is 8 characters starting with 2</p>}
        </div>

        <div className="kiykDetai-gridContainer-column">
          <p>請求先番号</p>
          <input
            type="text"
            name="tel1"
            defaultValue={kiyk.KY_CDSQSK.replace(/\s+$/g, "")}
            ref={register({ pattern: /^[0-9]{6,20}/ })}
          />
          {errors.tel1 && <p>tel1 is Numbers from 6 to 20 characters</p>}
        </div>

        {/* <input type="submit">更新</input> */}
      </form>
    </div>
  );
};
export default KiykDetailContainer;
