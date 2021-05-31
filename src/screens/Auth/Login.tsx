import React, { ReactElement, useState } from "react";
import { Redirect } from "react-router-dom";
//Redux Stuff
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setUserAuthState } from "../../redux/actions/usersActions";
import AuthService from "../../services/auth";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn } = useAppSelector((state) => state.UserReducer);
  const dispatch = useAppDispatch();

  const auth = AuthService();

  //component
  if (isLoggedIn) return <Redirect data-testid="dashboardRedirect" to="/" />;
  return (
    <div data-testid="login">
      <p>Login</p>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => auth.login(email, password)}>Login</button>
    </div>
  );
}
