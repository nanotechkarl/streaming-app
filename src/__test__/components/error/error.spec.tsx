import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import { BrowserRouter as Router } from "react-router-dom";
import { Error } from "../../../pages";

describe("<Error/>", () => {
  function renderApp() {
    const initialState = {};
    const mockStore = configureStore();
    let store;
    store = mockStore(initialState);

    return render(
      <Provider store={store}>
        <Router>
          <Error />
        </Router>
      </Provider>
    );
  }

  it("Renders error page properly", () => {
    renderApp();

    expect(screen.getByText("404 ERROR")).not.toBeNull();
    expect(screen.getByText("Page not found")).not.toBeNull();
    expect(screen.getByText("Return Home")).not.toBeNull();
  });
});
