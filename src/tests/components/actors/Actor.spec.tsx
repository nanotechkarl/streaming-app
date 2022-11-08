/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { cleanup, findByText, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import { BrowserRouter as Router } from "react-router-dom";
import { Actor } from "../../../pages";
import thunk from "redux-thunk";

describe("<Actor/>", () => {
  afterEach(cleanup);

  const actorSelected = {
    id: "6369d2cdf9965ee9edc6c503",
    firstName: "admin",
    lastName: "test",
    gender: "male",
    age: 123,
    imgUrl:
      "https://wallpapers.com/images/hd/inspirational-short-quotes-desktop-7o2nmgbytnvvz6sv.jpg",
  };

  const moviesOfActor = [
    {
      id: "6369d2cdf9965ee9edc6c504",
      actorDetailsId: "6369d2cdf9965ee9edc6c503",
      movieId: "6369d10ef9965ee9edc6c501",
    },
    {
      id: "6369d2cdf9965ee9edc6c501",
      actorDetailsId: "6369d2cdf9965ee9edc6c503",
      movieId: "6369d10ef9965ee9edc6c503",
    },
  ];

  const actorsMock = [
    {
      id: "6369d2cdf9965ee9edc6c503",
      firstName: "admin",
      lastName: "test",
      gender: "male",
      age: 123,
      imgUrl:
        "https://wallpapers.com/images/hd/inspirational-short-quotes-desktop-7o2nmgbytnvvz6sv.jpg",
    },
    {
      id: "6369d2cdf9965ee9edc6c503",
      firstName: "user",
      lastName: "test",
      gender: "female",
      age: 123,
      imgUrl:
        "https://wallpapers.com/images/hd/inspirational-short-quotes-desktop-7o2nmgbytnvvz6sv.jpg",
    },
  ];

  function renderApp() {
    const initialState = {
      actor: {
        actors: actorsMock,
        moviesOfActor,
        actorSelected,
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
    expect(count.length === moviesOfActor.length).toBeTruthy();
  });
});
