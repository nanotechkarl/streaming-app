/* eslint-disable testing-library/no-render-in-setup */
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import { currentUserMock, currentUserMockAdmin } from "../mockValues";
import thunk from "redux-thunk";
import Navbar from "../../../components/navbar/Navbar";

describe("Navbar(USER)", () => {
  afterEach(cleanup);

  function renderApp() {
    const initialState = {
      user: {
        current: currentUserMock,
      },
    };

    const mockStore = configureStore([thunk]);
    let store;
    store = mockStore(initialState);
    return render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>
    );
  }

  it("Should not show Control link", async () => {
    renderApp();

    expect(screen.queryByText("Control")).toBeNull();
  });

  it("Should not show login/register link", async () => {
    renderApp();

    expect(screen.queryByText("Login/Register")).toBeNull();
  });
});

describe("Navbar(ADMIN)", () => {
  afterEach(cleanup);

  function renderAppAdmin() {
    const initialState = {
      user: {
        current: currentUserMockAdmin,
      },
    };
    const mockStore = configureStore([thunk]);
    let store;
    store = mockStore(initialState);
    return render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>
    );
  }

  it("Should not show Dashboard link", async () => {
    renderAppAdmin();

    expect(await screen.findByText("Dashboard")).not.toBeNull();
  });
});

describe("Navbar(GUEST)", () => {
  afterEach(cleanup);

  function renderApp() {
    const initialState = {
      user: {
        current: {},
      },
    };

    const mockStore = configureStore([thunk]);
    let store;
    store = mockStore(initialState);
    return render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>
    );
  }

  it("Should not show Dashboard link", async () => {
    renderApp();
    const link = screen.queryByRole("Dashboard");
    expect(link).toBeNull();
  });

  it("Should not show Logout link", async () => {
    renderApp();

    expect(screen.queryByText("Logout")).toBeNull();
  });

  it("Should not show login/register link", async () => {
    renderApp();

    expect(await screen.findByText("Login/Register")).not.toBeNull();
  });
});
