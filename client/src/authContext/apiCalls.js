import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  const url = "http://localhost:9100"
  try {
    const res = await axios.post(`${url}/api/auth/login`, user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
