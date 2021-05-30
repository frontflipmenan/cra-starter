import React from "react";
import { render } from "@testing-library/react";
import Login from "../screens/Auth/Login";
import hooks from "../redux/hooks";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { UserState } from "../redux/reducers/UserReducer";
//mocks
jest.mock("../redux/hooks");

//helpers
let mockedUserAppSelectorFunction: jest.Mock;
const mockUseAppSelector = (state: UserState): void => {
  mockedUserAppSelectorFunction = hooks.useAppSelector.mockImplementationOnce(
    (): UserState => {
      return state;
    }
  );
};

//render
interface LoginComponentData {
  path: string;
  login: HTMLElement | null;
}

const renderLogin = (): LoginComponentData => {
  const history = createMemoryHistory();
  history.push("/login");
  const { queryByTestId } = render(
    <Router history={history}>
      <Login />
    </Router>
  );

  const login = queryByTestId("login");
  const path = history.location.pathname;

  return {
    path,
    login,
  };
};

//cleanup
afterAll(() => {
  mockedUserAppSelectorFunction.mockClear();
});
describe("Login Screen", () => {
  test("Should render Login when isLoggedIn false", () => {
    //mocks
    mockUseAppSelector({ isLoggedIn: false, loginLoading: true });
    //render
    const { path, login } = renderLogin();
    //assertions
    expect(path).toBe("/login");
    expect(login).toBeInTheDocument();
  });
  test("Should render Dashboard when isLoggedIn true", () => {
    //mocks
    mockUseAppSelector({ isLoggedIn: true, loginLoading: true });
    //render
    const { login, path } = renderLogin();
    //assertions
    expect(path).toBe("/");
    expect(login).toBeNull();
  });
});
