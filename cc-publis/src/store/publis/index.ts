import { Actions } from "../actions";
import types from "./types";
import {
  Cstms,
  Cstm,
  Csmms,
  Ctzhs,
  Kiyks,
  Kiyk,
  KiykLists,
  Kyzd,
  Kyzhs,
  Gycms,
} from "../../types/models";
import { updateLocale } from "moment";

// TODO: serchHistory、persist をとる
// TODO: cstmLists を追加する
interface State {
  cstms: Cstms | [];
  cstm: Cstm | {};
  sqsk: Cstm | {};
  shsk: Cstm | {};
  csmms: Csmms | [];
  ctzhs: Ctzhs | [];
  kiyk: Kiyk | {};
  kiyks: Kiyks | [];
  kiykLists: KiykLists | [];
  kyzd: Kyzd | {};
  kyzhs: Kyzhs | [];
  gycms: Gycms | [];
  showListCstm: boolean;
  showListCsmm: boolean;
  showListCtzh: boolean;
  showListKiyk: boolean;
  showListKiykCstm: boolean;
  showListKyzd: boolean;
  showListKyzh: boolean;
  setGycm: boolean;
  isLoading: boolean;
  isLoadingCstm: boolean;
  isLoadingCsmm: boolean;
  isLoadingCtzh: boolean;
  isLoadingKiyk: boolean;
  isLoadingKiykCstm: boolean;
  isLoadingKyzd: boolean;
  isLoadingKyzh: boolean;
  isUpdating: boolean;
  clearSortFilter: boolean;
  searchHistory: [];
  error: { message?: string; code?: string };
}

export const initialState = (injects?: State): State => ({
  cstms: [],
  cstm: {},
  sqsk: {},
  shsk: {},
  csmms: [],
  ctzhs: [],
  kiyk: {},
  kiyks: [],
  kiykLists: [],
  kyzd: {},
  kyzhs: [],
  gycms: [],
  showListCstm: false,
  showListCsmm: false,
  showListCtzh: false,
  showListKiyk: false,
  showListKiykCstm: false,
  showListKyzd: false,
  showListKyzh: false,
  setGycm: false,
  isLoading: false,
  isLoadingCstm: false,
  isLoadingCsmm: false,
  isLoadingCtzh: false,
  isLoadingKiyk: false,
  isLoadingKiykCstm: false,
  isLoadingKyzd: false,
  isLoadingKyzh: false,
  isUpdating: false,
  clearSortFilter: true,
  searchHistory: [],
  error: {},
  ...injects,
});

export const reducer = (state = initialState(), action: Actions): State => {
  switch (action.type) {
    case types.getCstmStart:
      return Object.assign({}, state, {
        // showListCstm: false,
        isLoading: true,
        error: {},
      });
    case types.getCstmSucceed:
      return Object.assign({}, state, {
        cstms: action.payload.cstms,
        cstm: action.payload.cstm,
        showListCstm: true,
        searchHistory: action.payload.searchHistory,
        isLoading: false,
        error: {},
      });
    case types.getCstmFail:
      return Object.assign({}, state, {
        cstms: [],
        showListCstm: false,
        isLoading: false,
        error: action.payload.error,
      });

    case types.switchCstm:
      return Object.assign({}, state, {
        cstm: state.cstms.filter(
          (row) => row.CT_CDCSTM === action.payload.cdcstm
        )[0],
      });

    case types.replaceCstm:
      // return {
      //   ...state,
      //   ...state.cstms,
      //   [state.cstms.findIndex(
      //     (v) => v.CT_CDCSTM === action.payload.cdcstm
      //   )]: action.payload.cstm,
      // };

      // return {
      //   ...state,
      //   cstms: {
      //     ...state.cstms,
      //     [state.cstms.findIndex(
      //       (v) => v.CT_CDCSTM === action.payload.cdcstm
      //     )]: action.payload.cstm,
      //   },
      // };

      return Object.assign({}, state, {
        cstms: Object.assign(
          [],
          state.cstms,
          (state.cstms[
            state.cstms.findIndex((v) => v.CT_CDCSTM === action.payload.cdcstm)
          ] = action.payload.cstm) // stateを変えてしまってる。改修対象。
        ),
      });

    case types.addCstmStart:
      return Object.assign({}, state, { isUpdating: true, error: {} });
    case types.addCstmSucceed:
      return Object.assign({}, state, {
        ...action.payload.cstm,
        showListCstm: true,
        isUpdating: false,
        clearSortFilter: true,
        error: {},
      });
    case types.addCstmFail:
      return Object.assign({}, state, {
        isUpdating: false,
        error: action.payload.error,
      });

    case types.deleteCstmStart:
      return Object.assign({}, state, { isUpdating: true, error: {} });
    case types.deleteCstmSucceed:
      return Object.assign({}, state, {
        ...action.payload.cstm,
        isUpdating: false,
        showListCstm: true,
        clearSortFilter: false,
        error: {},
      });
    case types.deleteCstmFail:
      return Object.assign({}, state, {
        isUpdating: false,
        showListCstm: action.payload.showListCstm,
        error: action.payload.error,
      });
    case types.editCstmStart:
      return Object.assign({}, state, { isUpdating: true, error: {} });
    case types.editCstmSucceed:
      return Object.assign({}, state, {
        cstm: action.payload.cstm,
        isUpdating: false,
        clearSortFilter: false,
        error: {},
      });
    case types.editCstmFail:
      return Object.assign({}, state, {
        isUpdating: false,
        error: action.payload.error,
      });

    case types.getCsmmStart:
      return Object.assign({}, state, {
        isLoading: true,
        error: {},
      });
    case types.getCsmmSucceed:
      return Object.assign({}, state, {
        csmms: action.payload.csmms,
        showListCsmm: true,
        isLoading: false,
        error: {},
      });
    case types.getCsmmFail:
      return Object.assign({}, state, {
        csmms: [],
        showListCsmm: false,
        isLoading: false,
        error: action.payload.error,
      });

    case types.getCtzhStart:
      return Object.assign({}, state, {
        isLoading: true,
        error: {},
      });
    case types.getCtzhSucceed:
      return Object.assign({}, state, {
        ctzhs: action.payload.ctzhs,
        showListCtzh: true,
        isLoading: false,
        error: {},
      });
    case types.getCtzhFail:
      return Object.assign({}, state, {
        ctzhs: [],
        showListCtzh: false,
        isLoading: false,
        error: action.payload.error,
      });

    case types.getKiykStart:
      return Object.assign({}, state, {
        showListKiyk: false,
        // kiyks: [],
        // kiyk: {},
        isLoading: true,
        isLoadingKiyk: true,
        error: {},
      });
    case types.getKiykSucceed:
      return Object.assign({}, state, {
        kiyks: action.payload.kiyks,
        kiyk: action.payload.kiyk,
        kiykLists: action.payload.kiykLists,
        showListKiyk: true,
        isLoading: false,
        isLoadingKiyk: false,
        error: {},
      });
    case types.getKiykFail:
      return Object.assign({}, state, {
        kiyks: [],
        kiyk: {},
        kiykLists: [],
        showListKiyk: false,
        isLoading: false,
        isLoadingKiyk: false,
        error: action.payload.error,
      });

    case types.switchKiyk:
      return Object.assign({}, state, {
        kiyk: state.kiyks.filter(
          (row) => row.KY_NOKIYK.toString() === action.payload.nokiyk
        )[0],
      });

    case types.getKiykCstmStart:
      return Object.assign({}, state, {
        // showListKiykCstm: false,
        isLoading: true,
        error: {},
      });
    case types.getKiykCstmSucceed:
      return Object.assign({}, state, {
        sqsk: action.payload.sqsk || state.sqsk,
        shsk: action.payload.shsk || state.shsk,
        showListKiykCstm: true,
        isLoading: false,
        error: {},
      });
    case types.getKiykCstmFail:
      return Object.assign({}, state, {
        sqsk: {},
        shsk: {},
        showListKiykCstm: false,
        isLoading: false,
        error: action.payload.error,
      });

    case types.getKyzdStart:
      return Object.assign({}, state, {
        // showListKyzd: false,
        isLoading: true,
        error: {},
      });
    case types.getKyzdSucceed:
      return Object.assign({}, state, {
        kyzd: action.payload.kyzd,
        showListKyzd: true,
        isLoading: false,
        error: {},
      });
    case types.getKyzdFail:
      return Object.assign({}, state, {
        kyzd: {},
        showListKyzd: false,
        isLoading: false,
        error: action.payload.error,
      });

    case types.getKyzhStart:
      return Object.assign({}, state, {
        // showListKyzh: false,
        isLoading: true,
        error: {},
      });
    case types.getKyzhSucceed:
      return Object.assign({}, state, {
        kyzhs: action.payload.kyzhs,
        showListKyzh: true,
        isLoading: false,
        error: {},
      });
    case types.getKyzhFail:
      return Object.assign({}, state, {
        kyzhs: [],
        showListKyzh: false,
        isLoading: false,
        error: action.payload.error,
      });

    case types.getGycmStart:
      return Object.assign({}, state, {
        // showListGycm: false,
        isLoading: true,
        error: {},
      });
    case types.getGycmSucceed:
      return Object.assign({}, state, {
        gycms: action.payload.gycms,
        setGycm: true,
        isLoading: false,
        error: {},
      });
    case types.getGycmFail:
      return Object.assign({}, state, {
        gycms: [],
        setGycm: false,
        isLoading: false,
        error: action.payload.error,
      });
    default:
      return state;
  }
};
