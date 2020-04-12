import axios from "axios";
import { Auth } from "../../types/models";
import {
  AUTH_API_HOST,
  AUTH_API_PORT,
  AUTH_API_TIMEOUT
} from "../../config/constants";

const baseUrl = `http://${AUTH_API_HOST}:${AUTH_API_PORT}/auth`;

export async function loginAuthApi(loginID: string, password: string) {
  try {
    const res = await axios.post<Auth>(
      `${baseUrl}/login`,
      { email: loginID, password: password },
      { timeout: AUTH_API_TIMEOUT }
    );
    return res.data;
  } catch (res) {
    let error;
    if (res.response) {
      error = res.response;
      // } else if (res.message === "Invalid credentials.\n") {
      //   error = { message: res.message };
    } else {
      error = res.error;
    }
    return error;
  }
}

export async function logoutAuthApi() {
  try {
    const res = await axios.get(`${baseUrl}/logout`, {
      timeout: AUTH_API_TIMEOUT
    });
    return res.data;
  } catch (res) {
    const error = res.response;
    throw error;
  }
}
