/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import { BrowserRouter as Router } from "react-router-dom";
import { Actor } from "../../../pages";
import thunk from "redux-thunk";
import {
  actorsMock,
  moviesOfActorMock,
  actorSelectedMock,
} from "../mockValues";

describe("<Actor/>", () => {
  afterEach(cleanup);

  function renderApp() {
    const initialState = {
      actor: {
        actors: actorsMock,
        moviesOfActor: moviesOfActorMock,
        actorSelected: actorSelectedMock,
      },
    };
    const mockStore = configureStore([thunk]);
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

  it("Display Actor info", async () => {
    expect(await screen.findByText("Name: admin test")).not.toBeNull();
    expect(await screen.findByText("Age: 123")).not.toBeNull();
    expect(await screen.findByText("Gender: male")).not.toBeNull();
  });

  it("Should not display other actors", async () => {
    expect(screen.queryByText("Name: user test")).toBeNull();
  });

  it("Should display movies of actor and their link", () => {
    const count = screen.getAllByText("Check Reviews");
    expect(count.length === moviesOfActorMock.length).toBeTruthy();
  });
});
