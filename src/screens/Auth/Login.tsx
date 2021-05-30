import React, { ReactElement } from "react";
import { Redirect } from "react-router-dom";
//Redux Stuff
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setUserAuthState } from "../../redux/actions/usersActions";
/*
Login Component using Firebase Auth
When a user logges is, firebase sign in is called
User is redirected to secret routes via a firebase onAuthStateChanged listener
onAuthStateChanged fires when user login states is changed from logged in to logged off
The logic for this function is found in ./redux/actions/users/setUserAuthState.ts
*/
export interface LoginProps {}

export default function Login({}: LoginProps): JSX.Element {
  //global state / redux
  const { isLoggedIn } = useAppSelector((state) => state.UserReducer);
  const dispatch = useAppDispatch();
  //component
  if (isLoggedIn) return <Redirect data-testid="dashboardRedirect" to="/" />;
  return (
    <div data-testid="login">
      <p>Login</p>
      <button onClick={() => dispatch(setUserAuthState(!isLoggedIn))}>
        change login status
      </button>
    </div>
  );
}
