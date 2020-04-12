import axios from 'axios';
import { Cstm, Cstms, Csmms, Ctzhs, Kiyks, Kyzd, Kyzhs, Gycms, KiykLists } from '../../types/models';
import { PUBLIS_API_HOST, PUBLIS_API_PORT, PUBLIS_API_TIMEOUT } from '../../config/constants';

const baseUrlPublis = `http://${PUBLIS_API_HOST}:${PUBLIS_API_PORT}/ccdb`;

export const getCstmFactory = async (columnName: string, key: string) => {
  try {
    const response = await axios.get<Cstms>(`${baseUrlPublis}/cstm/${columnName}/${encodeURIComponent(key)}`, { timeout: PUBLIS_API_TIMEOUT });
    if (response.data.length < 1) {
      let err = { message: 'no data found', code: 'noDataFound' }
      throw err
    }
    return response.data;
  } catch (error) {
    if (error && error.response) {
      console.log('error1')
      console.log(error.code)
      console.log(error.response.data)
      throw error.response.data;
    }
    console.log('error2')
    console.log(error.code)
    console.log(error)
    throw error;
  }
}

export async function deleteCstmFactory(cdcstm: string) {
  try {
    await axios.delete(`${baseUrlPublis}/${cdcstm}`, { timeout: PUBLIS_API_TIMEOUT });
    const res = await axios.get<Cstms>(`${baseUrlPublis}/cstm/${cdcstm}`, { timeout: PUBLIS_API_TIMEOUT });

    return res.data;
  } catch (res) {
    const error = res.response;
    return error
  }
}

export async function editCstmFactory(
  cdcstm: string,
  cstm: Cstm,
) {
  try {
    // const ret = await axios.put(`${baseUrlPublis}/cstm` + cdcstm, cstm, { timeout: PUBLIS_API_TIMEOUT });
    const ret = await axios.put(`${baseUrlPublis}/cstm`, { cdcstm, cstm }, { timeout: PUBLIS_API_TIMEOUT });
    const res = await axios.get<Cstms>(`${baseUrlPublis}/cstm/ct_cdcstm/${cdcstm}`, { timeout: PUBLIS_API_TIMEOUT });

    console.log(ret)

    return (res.data);
  } catch (res) {
    const error = res.response;
    throw error;
  }
}

export async function addCstmFactory(cdcstm: string, cstm: Cstm) {
  try {
    await axios.post(`${baseUrlPublis}`, cstm, { timeout: PUBLIS_API_TIMEOUT });
    const res = await axios.get<Cstms>(`${baseUrlPublis}/cstm/${cdcstm}`, { timeout: PUBLIS_API_TIMEOUT });
    return res.data;
  } catch (res) {
    const error = res.response;
    throw error;
  }
}

export async function getCsmmFactory(cdcstm: string): Promise<Csmms | object> {
  try {
    const res = await axios.get<Csmms>(`${baseUrlPublis}/csmm/${cdcstm}`, { timeout: PUBLIS_API_TIMEOUT });

    return res.data;
  } catch (res) {
    const error = res.response;
    throw error;
  }
}

export async function getCtzhFactory(cdcstm: string): Promise<Ctzhs | object> {
  try {
    const res = await axios.get<Ctzhs>(`${baseUrlPublis}/ctzh/${cdcstm}`, { timeout: PUBLIS_API_TIMEOUT });

    return res.data;
  } catch (res) {
    const error = res.response;
    throw error;
  }
}

export async function getKiykFactory(columnName: string, key: string): Promise<Kiyks & KiykLists | object> {
  try {
    const res = await axios.get<Kiyks & KiykLists>(`${baseUrlPublis}/kiyk/${columnName}/${key}`, { timeout: PUBLIS_API_TIMEOUT });

    return res.data;
  } catch (res) {
    const error = res.response;
    throw error;
  }
}

export async function getKyzdFactory(nokiyk: string): Promise<Kyzd | object> {
  try {
    const res = await axios.get<Kyzd>(`${baseUrlPublis}/kyzd/${nokiyk}`, { timeout: PUBLIS_API_TIMEOUT });

    return res.data;
  } catch (res) {
    const error = res.response;
    throw error;
  }
}


export async function getKyzhFactory(nokiyk: string): Promise<Kyzhs | object> {
  try {
    const res = await axios.get<Kyzhs>(`${baseUrlPublis}/kyzh/${nokiyk}`, { timeout: PUBLIS_API_TIMEOUT });

    return res.data;
  } catch (res) {
    const error = res.response;
    throw error;
  }
}

export async function getGycmFactory(): Promise<Gycms | object> {
  try {
    const res = await axios.get<Gycms>(`${baseUrlPublis}/gycm`, { timeout: PUBLIS_API_TIMEOUT });

    return res.data;
  } catch (res) {
    const error = res.response;
    throw error;
  }
}
