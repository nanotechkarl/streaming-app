/* eslint-disable testing-library/no-render-in-setup */
import React from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import { Control } from "../../../pages";
import {
  actorsMock,
  moviesMock,
  pendingReviewsMock,
  userMock,
} from "../mockValues";
import thunk from "redux-thunk";
import user from "@testing-library/user-event";

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
        pendingReviews: pendingReviewsMock,
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

    it("Should show edit actor modal", async () => {
      renderApp();
      const row = screen.getByRole("row", {
        name: /actor test male 123 edit \| delete/i,
      });

      const btn = within(row).getByRole("button", {
        name: /edit/i,
      });

      user.click(btn);
      expect(await screen.findByText("Edit Actor")).not.toBeNull();
    });

    it("Should check form validations", async () => {
      renderApp();
      const btn = await screen.findByText("Add actors to a movie");

      user.click(btn);
      expect(await screen.findByText(/Add new actor/i)).not.toBeNull();

      const age = await screen.findByTestId("age-addActor");
      const gender = await screen.findByTestId("gender-addActor");
      const imgUrl = await screen.findByTestId("imgUrl-addActor");
      const fName = await screen.findByTestId("fName-addActor");
      const lName = await screen.findByTestId("lName-addActor");
      const submit = await screen.findByTestId("submit-addActor");

      user.type(age, "1a");
      user.type(gender, "");
      user.type(imgUrl, "");
      user.type(fName, "");
      user.type(lName, "");
      user.click(submit);

      expect(await screen.findByText(/Please enter valid age/i)).not.toBeNull();
      expect(await screen.findByText(/Please enter image url/i)).not.toBeNull();
      expect(
        await screen.findByText(/Please enter first name/i)
      ).not.toBeNull();
      expect(await screen.findByText(/Please enter last name/i)).not.toBeNull();
      expect(await screen.findByText(/Please enter gender/i)).not.toBeNull();
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

      expect(await screen.findAllByText("Approve?")).not.toBeNull();
    });
  });

  describe("Pending reviews table", () => {
    it("Should show pending details", async () => {
      renderApp();

      expect(await screen.findByText("appleReview")).not.toBeNull();
      expect(await screen.findByText("review1 review")).not.toBeNull();
      expect(
        await screen.findAllByText("6369d188f9965ee9edc6c502")
      ).not.toBeNull();
    });
  });
});
