import axios from 'axios';
import { CCLogs, CCLogQuery } from '../../types/models';
import { CCLOG_API_HOST, CCLOG_API_PORT, CCLOG_API_TIMEOUT } from '../../config/constants';

const baseUrlCCLog = `http://${CCLOG_API_HOST}:${CCLOG_API_PORT}/cclogs`;

// TODO: getとedit,deleteは分離した方が良い

export async function getCCLogFactory(getQuery: CCLogQuery): Promise<CCLogs | object> {
  let urlParams = Object.entries(getQuery).map(([key, value], index, array) => {
    return `${key}=${value}`
  })

  try {
    const res = await axios.get<CCLogs>(`${baseUrlCCLog}?${urlParams.join('&')}`, { timeout: CCLOG_API_TIMEOUT });
    return res.data;
  } catch (res) {
    let error
    if (res.response) {
      error = res.response
    } else {
      error = res
    };
    throw error;
  }
}

export async function addCCLogFactory(cclog: CCLogQuery, getQuery: CCLogQuery): Promise<CCLogs | object> {
  let urlParams = Object.entries(getQuery).map(([key, value], index, array) => {
    return `${key}=${value}`
  })

  try {
    await axios.post(baseUrlCCLog, cclog, { timeout: CCLOG_API_TIMEOUT });
    const res = await axios.get<CCLogs>(`${baseUrlCCLog}?${urlParams.join('&')}`, { timeout: CCLOG_API_TIMEOUT });
    return res.data;
  } catch (res) {
    const error = res.response;
    throw error;
  }
}

export async function deleteCCLogFactory(deleteQuery: CCLogQuery, getQuery: CCLogQuery): Promise<CCLogs | object> {
  let urlParamsDelete = Object.entries(deleteQuery).map(([key, value], index, array) => {
    return `${key}=${value}`
  })

  let urlParamsGet = Object.entries(getQuery).map(([key, value], index, array) => {
    return `${key}=${value}`
  })

  try {
    await axios.delete(`${baseUrlCCLog}?${urlParamsDelete.join('&')}`, { timeout: CCLOG_API_TIMEOUT });
    const res = await axios.get<CCLogs>(`${baseUrlCCLog}?${urlParamsGet.join('&')}`, { timeout: CCLOG_API_TIMEOUT });
    return res.data;
  } catch (res) {
    const error = res.response;
    throw error;
  }
}
