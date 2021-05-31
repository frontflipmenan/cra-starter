import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory, MemoryHistory } from "history";
import Nav, { Routes } from "../nav";
import hooks from "../redux/hooks";
import { UserState } from "../redux/reducers/UserReducer";

import { navItems, authenticatedNavItems } from "../nav/navData";
//mocks
jest.mock("../redux/hooks");
const mockFunction = jest.fn().mockImplementation();
jest.mock("firebase", () => {
  return {
    auth: () => {
      return {
        signInWithEmailAndPassword: mockFunction,
        createUserWithEmailAndPassword: mockFunction,
        onAuthStateChanged: () => () => console.log(),
      };
    },
  };
});
//helpers
let mockedUserAppSelectorFunction: jest.Mock;
const mockUseAppSelector = (state: UserState): void => {
  mockedUserAppSelectorFunction = hooks.useAppSelector.mockImplementation(
    (): UserState => {
      return state;
    }
  );
};

//render
const renderNav = (): MemoryHistory => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Routes />
    </Router>
  );

  return history;
};

const renderRouter = (): RenderResult => {
  return render(<Nav />);
};

//cleanup
afterAll(() => {
  mockedUserAppSelectorFunction.mockClear();
  mockFunction.mockClear();
});

describe("Navigation Component", () => {
  test("Should render Nav with all public routes when logged off", () => {
    //mocks
    mockUseAppSelector({ isLoggedIn: false, loginLoading: false });
    //render
    const history = renderNav();
    //assertions
    //loop unauthenticated nav items
    navItems.forEach((item) => {
      history.push(item.path);
      const path = history.location.pathname;
      expect(path).toBe(item.path);
    });

    authenticatedNavItems.forEach((item) => {
      history.push(item.path);
      const path = history.location.pathname;
      expect(path).toBe("/login"); //should redirect to login
    });
  });

  test("Should render Nav with all public routes when logged in", () => {
    //mocks
    mockUseAppSelector({ isLoggedIn: true, loginLoading: false });
    //render
    const history = renderNav();
    //assertions
    //loop unauthenticated nav items
    navItems.forEach((item) => {
      history.push(item.path);
      const path = history.location.pathname;
      expect(path).toBe("/");
    });

    authenticatedNavItems.forEach((item) => {
      history.push(item.path);
      const path = history.location.pathname;
      expect(path).toBe(item.path); //should redirect to login
    });
  });
  test("Should render loading screen when login loading", () => {
    //mocks
    mockUseAppSelector({ isLoggedIn: true, loginLoading: true });
    //render
    const renderedComponent = renderRouter();
    //assertions
    const { queryByTestId } = renderedComponent;
    const loadingComponent = queryByTestId("loading");
    expect(loadingComponent).toBeInTheDocument();
  });
});
