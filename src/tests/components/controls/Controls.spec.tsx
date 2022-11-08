/* eslint-disable testing-library/no-render-in-setup */
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import { Control } from "../../../pages";
import { actorsMock, moviesMock, userMock } from "../mockValues";
import thunk from "redux-thunk";

describe("<Controls/>", () => {
  afterEach(cleanup);

  function renderApp() {
    const initialState = {
      actor: {
        actors: actorsMock,
      },
      movie: {
        movies: moviesMock,
      },
      review: {
        pendingReviews: [],
      },
      user: {
        accounts: userMock,
      },
    };
    const mockStore = configureStore([thunk]);
    let store;
    store = mockStore(initialState);
    return render(
      <Provider store={store}>
        <Router>
          <Control />
        </Router>
      </Provider>
    );
  }

  describe("Movie Table", () => {
    it("Should show movie details", async () => {
      renderApp();

      expect(await screen.findByText("movie1")).not.toBeNull();
      expect(await screen.findByText("1235")).not.toBeNull();
    });

    it("Should not show movie details if not existing", async () => {
      renderApp();

      expect(screen.queryByText("movie-non-existing")).toBeNull();
    });

    it("Should disable delete button if movie 1year > year release", async () => {
      renderApp();

      const deleteArray = await screen.findAllByText("| Delete");
      expect(deleteArray[0]).toHaveClass("disabled");
      expect(deleteArray[1]).toHaveClass("disabled");
      expect(deleteArray[2]).not.toHaveClass("disabled");
    });

    it("Should show add movie button", async () => {
      renderApp();
      expect(await screen.findByText("Add movie")).not.toBeNull();
    });

    it("Should show edit movie button", async () => {
      renderApp();
      expect(screen.getAllByText("Edit")).not.toBeNull();
    });
  });

  describe("Actors table", () => {
    it("Should show actor details", async () => {
      renderApp();

      expect(await screen.findByText("actor")).not.toBeNull();
      expect(await screen.findAllByText("test")).not.toBeNull();
      expect(await screen.findAllByText("male")).not.toBeNull();
      expect(await screen.findAllByText("123")).not.toBeNull();
    });

    it("Should not show actor details if not existing", async () => {
      renderApp();

      expect(screen.queryByText("actor-non-existing")).toBeNull();
    });

    it("Should show add Actor button", async () => {
      renderApp();
      expect(await screen.findByText("Add actors to a movie")).not.toBeNull();
    });

    it("Should show edit Actors button", async () => {
      renderApp();
      expect(screen.getAllByText("Edit")).not.toBeNull();
    });
  });

  describe("Users table", () => {
    it("Should show user details", async () => {
      renderApp();

      expect(await screen.findByText("user1@example.com")).not.toBeNull();
      expect(await screen.findAllByText("user")).not.toBeNull();
      expect(await screen.findAllByText("role")).not.toBeNull();
    });

    it("Should show approve button if user is not approved", async () => {
      renderApp();

      expect(screen.getAllByText("Approve?").length === 1).toBeTruthy();
    });
  });
});
