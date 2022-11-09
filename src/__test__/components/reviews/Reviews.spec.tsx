/* eslint-disable testing-library/no-render-in-setup */
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import { Reviews } from "../../../pages";
import {
  actorsMock,
  currentUserMock,
  moviesMock,
  pendingReviewsMock,
  selectedMovieMock,
  selectedMovieReviewMock,
  userMock,
} from "../mockValues";
import thunk from "redux-thunk";

describe("<Reviews/> [USER]", () => {
  afterEach(cleanup);

  function renderApp() {
    const initialState = {
      actor: {
        actors: actorsMock,
      },
      movie: {
        movies: moviesMock,
        selected: selectedMovieMock,
      },
      review: {
        reviews: selectedMovieReviewMock,
        pendingReviews: pendingReviewsMock,
      },
      user: {
        accounts: userMock,
        current: currentUserMock,
      },
    };
    const mockStore = configureStore([thunk]);
    let store;
    store = mockStore(initialState);
    return render(
      <Provider store={store}>
        <Router>
          <Reviews />
        </Router>
      </Provider>
    );
  }

  describe("Movie Table", () => {
    it("Should show movie details", async () => {
      renderApp();

      expect(await screen.findByText(/rating: 4 stars/i)).not.toBeNull();
      expect(await screen.findByText("movie3")).not.toBeNull();
      expect(await screen.findByText("desc3")).not.toBeNull();
      expect(await screen.findByText("CAST")).not.toBeNull();
      //   expect(await screen.findByText("2345")).not.toBeNull();
    });

    it("Can add a review", async () => {
      renderApp();

      expect(await screen.findByText(/WRITE A REVIEW/i)).not.toBeNull();
      expect(
        await screen.findByRole("button", {
          name: /submit/i,
        })
      ).not.toBeNull();
    });

    it("View all reviews", async () => {
      renderApp();

      expect(await screen.findByText(/This is a review/i)).not.toBeNull();
    });
  });
});
