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

  test("Should print error if password is less than 8 characters", async () => {
    renderApp();

    const email = await screen.findByTestId("email");
    const password = await screen.findByTestId("password");
    const submit = await screen.findByTestId("submit");

    user.type(email, "example@mail.com");
    user.type(password, "passw");
    user.click(submit);

    const error = screen.getByText(/password must be 8 characters minimum/i);
    expect(error).not.toBeNull();
  });

  test("Should print error if email is not valid format", async () => {
    renderApp();

    const email = await screen.findByTestId("email");
    const password = await screen.findByTestId("password");
    const submit = await screen.findByTestId("submit");

    user.type(email, "example@");
    user.type(password, "password123");
    user.click(submit);

    const error = screen.getByText(/enter a valid email address/i);
    expect(error).not.toBeNull();
  });

  test("Should pass validations and submit", async () => {
    const onSubmit = jest.fn();

    renderApp({
      onSubmit,
    });

    const email = await screen.findByTestId("email");
    const password = await screen.findByTestId("password");
    const submit = await screen.findByTestId("submit");

    user.type(email, "example@mail.com");
    user.type(password, "password123");
    user.click(submit);

    expect(onSubmit).toHaveBeenCalledWith("example@mail.com", "password123");
  });
});
