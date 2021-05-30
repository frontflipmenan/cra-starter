import React from "react";
import { render } from "@testing-library/react";
import Dashboard from "../screens/Dashboard";

describe("Dashboard Screen", () => {
  test("Should render Dashboard", () => {
    const { getByTestId, queryByTestId } = render(<Dashboard />);
    const dashboardTilte = getByTestId("title");
    const dashboard = queryByTestId("dashboard");
    expect(dashboard).toBeInTheDocument();
    expect(dashboardTilte.textContent).toBe("Dashboard");
  });
});
