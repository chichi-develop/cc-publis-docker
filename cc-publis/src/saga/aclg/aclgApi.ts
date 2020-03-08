import axios from 'axios';
import { Aclgs } from '../../types/models';
import { SPI_API_HOST, SPI_API_PORT, SPI_API_TIMEOUT } from '../../config/constants'

const baseUrlMdmms = `http://${SPI_API_HOST}:${SPI_API_PORT}/api/v1/cm_aclgs`;

export async function getAclgsFactory(cdcstm: string) {
  try {
    const res = await axios.get<Aclgs>(`${baseUrlMdmms}/${cdcstm}`, { timeout: SPI_API_TIMEOUT });

    return res.data;
  } catch (res) {
    const error = res.response;
    throw error;
  }
}
