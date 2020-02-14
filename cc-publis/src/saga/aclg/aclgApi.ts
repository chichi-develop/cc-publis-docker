import axios from 'axios';
import { Aclgs } from '../../types/models';
import { SPI_API_HOST, SPI_API_PORT } from '../../config/constants'

const baseUrlMdmms = `http://${SPI_API_HOST}:${SPI_API_PORT}/api/v1/cm_aclgs`;

export async function getAclgsFactory(cdcstm: string) {
  try {
    const res = await axios.get<Aclgs>(`${baseUrlMdmms}/${cdcstm}`);

    return res.data;
  } catch (res) {
    const error = res.response;
    throw error;
  }
}
