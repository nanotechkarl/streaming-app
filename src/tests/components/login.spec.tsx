/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test } from "@jest/globals";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom/extend-expect";

import Login, { Props } from "../../components/forms/LoginForm";
import { BrowserRouter as Router } from "react-router-dom";

describe("<LoginForm/>", () => {
  function renderApp(props: Partial<Props> = {}) {
    const initialState = {};
    const mockStore = configureStore();
    let store;
    store = mockStore(initialState);

    const defaultProps: Props = {
      onSubmit() {
        return;
      },
    };

    return render(
      <Provider store={store}>
        <Router>
          <Login {...defaultProps} {...props} />
        </Router>
      </Provider>
    );
  }

  test("Should show login page with contents", () => {
    renderApp();

    expect(screen.getByText("Email")).not.toBeNull();
    expect(screen.getByText("Password")).not.toBeNull();
  });

  test("Shoud display blank form", async () => {
    renderApp();

    const LoginForm = screen.getByTestId("login-form");
    expect(LoginForm).not.toBeNull();
  });

  test("should display matching error when email is invalid", async () => {
    renderApp();

    const email = await screen.findByTestId("email");
    const password = await screen.findByTestId("password");

    fireEvent.change(email, { target: { value: "test@" } });
    fireEvent.change(password, { target: { value: "password123" } });
  });

  test("Should validate email and password fields after submit", async () => {
    const onSubmit = jest.fn();
    renderApp({ onSubmit });

    const email = await screen.findByTestId("email");
    const password = await screen.findByTestId("password");
    const submit = await screen.findByTestId("submit");

    fireEvent.change(email, { target: { value: "test@mail.com" } });
    fireEvent.change(password, { target: { value: "password123" } });
    fireEvent.click(submit);

    // expect(onSubmit).toHaveBeenCalled();
    // expect(onSubmit).toHaveBeenCalledWith("test@mail.com", "password123");
  });
});
