/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test } from "@jest/globals";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";

import Register from "../../pages/Register";

describe("<Register/>", () => {
  function renderApp() {
    const initialState = {};
    const mockStore = configureStore();
    let store;
    store = mockStore(initialState);
    return render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    );
  }

  test("Should show login page with contents", () => {
    renderApp();

    expect(screen.getByText("REGISTER")).not.toBeNull();
    expect(screen.getByText("Email")).not.toBeNull();
    expect(screen.getByText("First Name")).not.toBeNull();
    expect(screen.getByText("Last Name")).not.toBeNull();
    expect(screen.getByText("Password")).not.toBeNull();
    expect(screen.getByText("Confirm Password")).not.toBeNull();
  });

  test("Shoud display blank form", async () => {
    renderApp();
  });

  test("Should validate fields after submit", async () => {
    renderApp();
  });
});
