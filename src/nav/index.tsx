import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
//Redux Stuff
import { useAppSelector } from "../redux/hooks";
import { navRoutes, authenticatedRoutes } from "./navData";

/*
Main Navigation Component
Two states for the component: is logged in and is not logged in
This state is determined by the isLoggedIn variable in the User Reducer (./redux/reducers/UserReducer.ts)
When logged in it will render the authenticated routes and navigation bar (found in ./nav/navData.tsx)
When not logged in it will render the routes and navigation bar (found in ./nav/navData.ts)
If you go to a authenicated route while logged off, it will redirect to /login
*/

interface Props {}

export const Routes = ({}: Props): JSX.Element => {
  //global state / redux
  const { isLoggedIn } = useAppSelector((state) => state.UserReducer);
  return (
    <Switch>
      {navRoutes.map((route) => {
        return (
          <Route key={route.path} path={route.path} exact={route.exact}>
            {route.component()}
          </Route>
        );
      })}
      {authenticatedRoutes.map((route) => {
        if (!isLoggedIn) return <Redirect key={route.path} to="/login" />;
        return (
          <Route key={route.path} path={route.path} exact={route.exact}>
            {route.component()}
          </Route>
        );
      })}
    </Switch>
  );
};
export default function Nav({}: Props): JSX.Element {
  //global state / redux
  const { loginLoading } = useAppSelector((state) => state.UserReducer);

  if (loginLoading) {
    return <div data-testid="loading" />;
  }
  return (
    <Router>
      <Routes />
    </Router>
  );
}
