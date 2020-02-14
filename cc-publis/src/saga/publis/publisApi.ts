import axios from 'axios';
import { Cstm, Cstms, Csmms, Ctzhs, Kiyks, Kyzd, Kyzhs, Gycms, KiykLists } from '../../types/models';
import { ORACLE_API_HOST, ORACLE_API_PORT } from '../../config/constants';

const baseUrlPublis = `http://${ORACLE_API_HOST}:${ORACLE_API_PORT}/ccdb`;

export async function getCstmFactory(columnName: string, key: string): Promise<Cstms | object> {
  try {
    const res = await axios.get<Cstms>(`${baseUrlPublis}/cstm/${columnName}/${encodeURIComponent(key)}`);

    return res.data;
  } catch (res) {
    const error = res.response;
    throw error;
  }
}

export async function deleteCstmFactory(cdcstm: string) {
  try {
    await axios.delete(`${baseUrlPublis}/${cdcstm}`);
    const res = await axios.get<Cstms>(`${baseUrlPublis}/cstm/${cdcstm}`);

    return res.data;
  } catch (res) {
    const error = res.response;
    throw error;
  }
}

export async function editCstmFactory(
  cdcstm: string,
  cstm: Cstm,
) {
  try {
    // const ret = await axios.put(`${baseUrlPublis}/cstm` + cdcstm, cstm);
    const ret = await axios.put(`${baseUrlPublis}/cstm`, { cdcstm, cstm });
    const res = await axios.get<Cstms>(`${baseUrlPublis}/cstm/ct_cdcstm/${cdcstm}`);

    console.log(ret)

    return (res);
  } catch (res) {
    const error = res.response;
    throw error;
  }
}

export async function addCstmFactory(cdcstm: string, cstm: Cstm) {
  try {
    await axios.post(`${baseUrlPublis}`, cstm);
    const res = await axios.get<Cstms>(`${baseUrlPublis}/cstm/${cdcstm}`);
    return res.data;
  } catch (res) {
    const error = res.response;
    throw error;
  }
}

export async function getCsmmFactory(cdcstm: string): Promise<Csmms | object> {
  try {
    const res = await axios.get<Csmms>(`${baseUrlPublis}/csmm/${cdcstm}`);

    return res.data;
  } catch (res) {
    const error = res.response;
    throw error;
  }
}

export async function getCtzhFactory(cdcstm: string): Promise<Ctzhs | object> {
  try {
    const res = await axios.get<Ctzhs>(`${baseUrlPublis}/ctzh/${cdcstm}`);

    return res.data;
  } catch (res) {
    const error = res.response;
    throw error;
  }
}

export async function getKiykFactory(columnName: string, key: string): Promise<Kiyks & KiykLists | object> {
  try {
    const res = await axios.get<Kiyks & KiykLists>(`${baseUrlPublis}/kiyk/${columnName}/${key}`);

    return res.data;
  } catch (res) {
    const error = res.response;
    throw error;
  }
}

export async function getKyzdFactory(nokiyk: string): Promise<Kyzd | object> {
  try {
    const res = await axios.get<Kyzd>(`${baseUrlPublis}/kyzd/${nokiyk}`);

    return res.data;
  } catch (res) {
    const error = res.response;
    throw error;
  }
}


export async function getKyzhFactory(nokiyk: string): Promise<Kyzhs | object> {
  try {
    const res = await axios.get<Kyzhs>(`${baseUrlPublis}/kyzh/${nokiyk}`);

    return res.data;
  } catch (res) {
    const error = res.response;
    throw error;
  }
}

export async function getGycmFactory(): Promise<Gycms | object> {
  try {
    const res = await axios.get<Gycms>(`${baseUrlPublis}/gycm`);

    return res.data;
  } catch (res) {
    const error = res.response;
    throw error;
  }
}
