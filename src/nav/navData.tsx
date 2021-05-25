import React from "react";
import Login, { LoginProps } from "../screens/Auth/Login";
import Dashboard, { DashboardProps } from "../screens/Dashboard";

interface routes {
  path: string;
  component: (props?: LoginProps | DashboardProps) => JSX.Element;
  exact: boolean;
}

interface items {
  path: string;
  label: string;
}

export const navRoutes: routes[] = [
  {
    path: "/login",
    component: (props) => <Login {...props} />,
    exact: true,
  },
];
export const navItems: items[] = [
  {
    label: "login",
    path: "/login",
  },
];

//authenticated
export const authenticatedRoutes: routes[] = [
  {
    path: "/",
    component: (props) => <Dashboard {...props} />,
    exact: true,
  },
];

export const authenticatedNavItems: items[] = [
  {
    label: "Dashboard",
    path: "/",
  },
];
