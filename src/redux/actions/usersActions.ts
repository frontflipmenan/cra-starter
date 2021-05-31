import { LOGIN_LOADING } from "./types";
import { UserAction } from "../reducers/UserReducer";

export const setUserAuthState = (isLoggedIn: Boolean): UserAction => ({
  type: LOGIN_LOADING,
  isLoggedIn,
});
export const setLoginLoading = (loginLoading: Boolean): UserAction => ({
  type: LOGIN_LOADING,
  loginLoading,
});
