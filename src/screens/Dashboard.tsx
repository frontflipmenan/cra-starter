import React, { ReactElement } from "react";

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
    </div>
  );
}
