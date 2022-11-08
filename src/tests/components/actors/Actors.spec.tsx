/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import { BrowserRouter as Router } from "react-router-dom";
import { Actor } from "../../../pages";

describe("<Actors/>", () => {
  afterEach(cleanup);

  function renderApp() {
    const initialState = {};
    const mockStore = configureStore();
    let store;
    store = mockStore(initialState);
    return render(
      <Provider store={store}>
        <Router>
          <Actor />
        </Router>
      </Provider>
    );
  }

  beforeEach(() => {
    renderApp();
  });
});
