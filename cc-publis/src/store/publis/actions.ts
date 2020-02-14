import types from './types'
import { Cstms, Cstm, Csmms, Ctzhs, Kiyks, Kiyk, KiykLists, Kyzd, Kyzhs, Gycms } from '../../types/models';

export const getCstmStart = (columnName: string, key: string) => ({
  type: types.getCstmStart,
  payload: { columnName, key },
});
export const getCstmSucceed = (searchHistory: object, cstms: Cstms, cstm: Cstm) => ({
  type: types.getCstmSucceed,
  payload: { searchHistory, cstms, cstm },
});
export const getCstmFail = (error: object) => ({
  type: types.getCstmFail,
  payload: { error },
});

export const switchCstm = (cstms: Cstms, cdcstm: string) => ({
  type: types.switchCstm,
  payload: { cstms, cdcstm }
});


export const editCstmStart = (cdcstm: string, cstm: Cstm) => ({
  type: types.editCstmStart,
  payload: { cdcstm, cstm },
  meta: { confirm: '更新してよろしいですか？' } as const,
});
export const editCstmSucceed = (cstm: Cstm) => ({
  type: types.editCstmSucceed,
  payload: { cstm },
});
export const editCstmFail = (error: object) => ({
  type: types.editCstmFail,
  payload: { error },
});

export const deleteCstmStart = (cdcstm: string) => ({
  type: types.deleteCstmStart,
  payload: { cdcstm },
  meta: { confirm: '削除してよろしいですか？' } as const,
});
export const deleteCstmSucceed = (cstm: Cstm) => ({
  type: types.deleteCstmSucceed,
  payload: { cstm },
});
export const deleteCstmFail = (error: object, showListCstm: boolean) => ({
  type: types.deleteCstmFail,
  payload: { error, showListCstm },
});

export const addCstmStart = (cdcstm: string, cstm: Cstm) => ({
  type: types.addCstmStart,
  payload: { cdcstm, cstm },
  meta: { confirm: '登録してよろしいですか？' } as const,
});
export const addCstmSucceed = (cstm: Cstm) => ({
  type: types.addCstmSucceed,
  payload: { cstm },
});
export const addCstmFail = (error: object) => ({
  type: types.addCstmFail,
  payload: { error },
});


export const getCsmmStart = (cdcstm: string) => ({
  type: types.getCsmmStart,
  payload: { cdcstm },
});
export const getCsmmSucceed = (csmms: Csmms) => ({
  type: types.getCsmmSucceed,
  payload: { csmms },
});
export const getCsmmFail = (error: object) => ({
  type: types.getCsmmFail,
  payload: { error },
});


export const getCtzhStart = (cdcstm: string) => ({
  type: types.getCtzhStart,
  payload: { cdcstm },
});
export const getCtzhSucceed = (ctzhs: Ctzhs) => ({
  type: types.getCtzhSucceed,
  payload: { ctzhs },
});
export const getCtzhFail = (error: object) => ({
  type: types.getCtzhFail,
  payload: { error },
});


export const getKiykStart = (columnName: string, key: string) => ({
  type: types.getKiykStart,
  payload: { columnName, key },
});
export const getKiykSucceed = (kiyks: Kiyks, kiyk: Kiyk, kiykLists: KiykLists) => ({
  type: types.getKiykSucceed,
  payload: { kiyks, kiyk, kiykLists },
});
export const getKiykFail = (error: object) => ({
  type: types.getKiykFail,
  payload: { error },
});

export const switchKiyk = (kiyks: Kiyks, nokiyk: string) => ({
  type: types.switchKiyk,
  payload: { kiyks, nokiyk }
});

export const getKiykCstmStart = (cdsqsk: string, cdshsk: string) => ({
  type: types.getKiykCstmStart,
  payload: { cdsqsk, cdshsk },
});
export const getKiykCstmSucceed = (sqsk: Cstm, shsk: Cstm) => ({
  type: types.getKiykCstmSucceed,
  payload: { sqsk, shsk },
});
export const getKiykCstmFail = (error: object) => ({
  type: types.getKiykCstmFail,
  payload: { error },
});

export const getKyzdStart = (nokiyk: string) => ({
  type: types.getKyzdStart,
  payload: { nokiyk },
});
export const getKyzdSucceed = (kyzd: Kyzd) => ({
  type: types.getKyzdSucceed,
  payload: { kyzd },
});
export const getKyzdFail = (error: object) => ({
  type: types.getKyzdFail,
  payload: { error },
});

export const getKyzhStart = (nokiyk: string) => ({
  type: types.getKyzhStart,
  payload: { nokiyk },
});
export const getKyzhSucceed = (kyzhs: Kyzhs) => ({
  type: types.getKyzhSucceed,
  payload: { kyzhs },
});
export const getKyzhFail = (error: object) => ({
  type: types.getKyzhFail,
  payload: { error },
});

export const getGycmStart = () => ({
  type: types.getGycmStart,
});
export const getGycmSucceed = (gycms: Gycms) => ({
  type: types.getGycmSucceed,
  payload: { gycms },
});
export const getGycmFail = (error: object) => ({
  type: types.getGycmFail,
  payload: { error },
});
