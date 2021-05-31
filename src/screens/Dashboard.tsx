import React, { ReactElement } from "react";
import AuthService from "../services/auth";

/*
Dashboard Component
TODO ....
.....

*/
export interface DashboardProps {}

export default function Dashboard({}: DashboardProps): JSX.Element {
  //component
  return (
    <div data-testid="dashboard">
      <p data-testid="title">Dashboard</p>
      <button onClick={() => AuthService().logout()}>Log out</button>
    </div>
  );
}
