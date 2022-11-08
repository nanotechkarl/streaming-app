/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import user from "@testing-library/user-event";

import { BrowserRouter as Router } from "react-router-dom";
import { Register } from "../../pages";

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

  beforeEach(() => {
    renderApp();
  });

  test("Renders form properly", () => {
    expect(screen.getByText("Email")).not.toBeNull();
    expect(screen.getByText("First Name")).not.toBeNull();
    expect(screen.getByText("Last Name")).not.toBeNull();
    expect(screen.getByText("Password")).not.toBeNull();
    expect(screen.getByText("Confirm Password")).not.toBeNull();
    expect(screen.getByText("User")).not.toBeNull();
    expect(screen.getByText("Admin")).not.toBeNull();
  });

  test("should enable submit btn if validation passes", async () => {
    const email = await screen.findByTestId("email");
    const password = await screen.findByTestId("password");
    const cPassword = await screen.findByTestId("cPassword");
    const fName = await screen.findByTestId("fName");
    const lName = await screen.findByTestId("lName");
    const userRadio = await screen.findByTestId("userRadio");
    const submit = await screen.findByTestId("submit");

    user.type(email, "example@mail.com");
    user.type(password, "password123");
    user.type(cPassword, "password123");
    user.type(fName, "password123");
    user.type(lName, "password123");
    user.click(userRadio);

    expect(submit).not.toBeDisabled();
  });

  test("should disable submit btn if validation fails", async () => {
    const email = await screen.findByTestId("email");
    const password = await screen.findByTestId("password");
    const cPassword = await screen.findByTestId("cPassword");
    const fName = await screen.findByTestId("fName");
    const lName = await screen.findByTestId("lName");
    const adminRadio = await screen.findByTestId("adminRadio");
    const submit = await screen.findByTestId("submit");

    user.type(email, "example@mail.com");
    user.type(password, "1");
    user.type(cPassword, "password123");
    user.type(fName, "test");
    user.type(lName, "test");
    user.click(adminRadio);
    user.click(submit);

    expect(submit).toBeDisabled();
  });
});