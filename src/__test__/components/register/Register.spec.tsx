/* eslint-disable testing-library/no-render-in-setup */
import React from "react";
import { screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { BrowserRouter as Router } from "react-router-dom";
import { Register } from "../../../pages";
import { renderWithProviders } from "../../test-utils";

// jest.mock("../../store/user.slice", () => {
//   return {
//     async registerUser({ firstName, lastName, email, password }: Credentials) {
//       return [];
//     },
//   };
// });

describe("<Register/>", () => {
  function renderApp() {
    return renderWithProviders(
      <Router>
        <Register />
      </Router>
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
  });

  test("Should print error if password is less than 8 characters", async () => {
    const email = await screen.findByTestId("email");
    const password = await screen.findByTestId("password");
    const cPassword = await screen.findByTestId("cPassword");
    const fName = await screen.findByTestId("fName");
    const lName = await screen.findByTestId("lName");
    const submit = await screen.findByTestId("submit");

    user.type(email, "example@mail.com");
    user.type(password, "passw");
    user.type(cPassword, "password123");
    user.type(fName, "password123");
    user.type(lName, "password123");
    user.click(submit);

    const error = screen.getByText(/password must be 8 characters minimum/i);
    expect(error).not.toBeNull();
  });

  test("Should print error if email is not valid", async () => {
    const email = await screen.findByTestId("email");
    const password = await screen.findByTestId("password");
    const cPassword = await screen.findByTestId("cPassword");
    const fName = await screen.findByTestId("fName");
    const lName = await screen.findByTestId("lName");
    const submit = await screen.findByTestId("submit");

    user.type(email, "example@");
    user.type(password, "qwerty123");
    user.type(cPassword, "password123");
    user.type(fName, "test");
    user.type(lName, "test");
    user.click(submit);

    const error = screen.getByText(/Enter a valid email address/i);
    expect(error).not.toBeNull();
  });

  test("Should print error if password and confirm password not same", async () => {
    const email = await screen.findByTestId("email");
    const password = await screen.findByTestId("password");
    const cPassword = await screen.findByTestId("cPassword");
    const fName = await screen.findByTestId("fName");
    const lName = await screen.findByTestId("lName");
    const submit = await screen.findByTestId("submit");

    user.type(email, "example@mail.com");
    user.type(password, "qwerty123");
    user.type(cPassword, "password123");
    user.type(fName, "test");
    user.type(lName, "test");
    user.click(submit);

    const error = screen.getByText(/Password does not match/i);
    expect(error).not.toBeNull();
  });
});
