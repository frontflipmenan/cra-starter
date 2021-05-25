import { LOGIN_LOADING } from "./types";
import { UserAction } from "../reducers/UserReducer";

export const setUserAuthState = (newLoginState: Boolean): UserAction => ({
  type: LOGIN_LOADING,
  isLoggedIn: newLoginState,
});
