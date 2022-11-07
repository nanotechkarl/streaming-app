/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import user from "@testing-library/user-event";

import LoginForm, { Props } from "../../components/forms/LoginForm";
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
          <LoginForm {...defaultProps} {...props} />
        </Router>
      </Provider>
    );
  }

  test("Renders form properly", () => {
    renderApp();

    expect(screen.getByText("Email")).not.toBeNull();
    expect(screen.getByText("Password")).not.toBeNull();
  });

  test("should enable submit btn if validation passes", async () => {
    renderApp();

    const email = await screen.findByTestId("email");
    const password = await screen.findByTestId("password");
    const submit = await screen.findByTestId("submit");

    user.type(email, "example@mail.com");
    user.type(password, "password123");
    user.click(submit);

    expect(submit).not.toBeDisabled();
  });

  test("should disable submit btn if validation fails", async () => {
    renderApp();

    const email = await screen.findByTestId("email");
    const password = await screen.findByTestId("password");
    const submit = await screen.findByTestId("submit");

    user.type(email, "example@");
    user.type(password, "password123");
    user.click(submit);

    expect(submit).toBeDisabled();
  });
});
