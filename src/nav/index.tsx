import React, { ReactElement } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
//Redux Stuff
import { useAppSelector } from "../redux/hooks";
import {
  navItems,
  navRoutes,
  authenticatedRoutes,
  authenticatedNavItems,
} from "./navData";

/*
Main Navigation Component
Two states for the component: is logged in and is not logged in
This state is determined by the isLoggedIn variable in the User Reducer
When logged in it will render the authenticated routes and navigation bar (found in ./nav/authenticatedNavData.ts)
When not logged in it will render the routes and navigation bar (found in ./nav/navData.ts)
*/

interface Props {}

export default function Nav({}: Props): JSX.Element {
  //global state / redux
  const { isLoggedIn } = useAppSelector((state) => state.UserReducer);

  return (
    <Router>
      <Switch>
        {navRoutes.map((route) => {
          return (
            <Route key={route.path} path={route.path} exact={route.exact}>
              {route.component()}
            </Route>
          );
        })}
        {authenticatedRoutes.map((route) => {
          if (!isLoggedIn) return <Redirect to="/login" />;

          return (
            <Route key={route.path} path={route.path} exact={route.exact}>
              {route.component()}
            </Route>
          );
        })}
      </Switch>
    </Router>
  );
}
