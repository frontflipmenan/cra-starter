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
  //component level actions
  const onLoginStatusButtonClick = () => {
    dispatch(setUserAuthState(!isLoggedIn));
  };
  //component
  if (isLoggedIn) return <Redirect to="/" />;
  return (
    <div>
      <p>{isLoggedIn ? "yes" : "no"} test 123 </p>
      <button onClick={onLoginStatusButtonClick}>change login status</button>
    </div>
  );
}
