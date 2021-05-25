import { LOGIN_LOADING } from "../actions/types";

export interface UserState {
  loginLoading: Boolean;
  isLoggedIn: Boolean;
}

const defaultState = {
  loginLoading: true,
  isLoggedIn: false,
};

export type UserAction = {
  type: string;
  loginLoading?: Boolean;
  isLoggedIn?: Boolean;
};

export default (state: UserState = defaultState, action: UserAction) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        loginLoading: action.loginLoading,
        isLoggedIn: action.isLoggedIn,
      };
    default:
      return state;
  }
};
