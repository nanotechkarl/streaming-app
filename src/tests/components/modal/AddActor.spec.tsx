/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import thunk from "redux-thunk";
import { actorsMock, moviesMock } from "../mockValues";
import user from "@testing-library/user-event";
import AddActor, { Props } from "../../../components/modal/AddActor";

describe("<AddActor/>", () => {
  function renderApp(props: Partial<Props> = {}) {
    const defaultProps: Props = {
      add() {
        return;
      },
    };

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
        accounts: [],
      },
    };
    const mockStore = configureStore([thunk]);
    let store;
    store = mockStore(initialState);
    return render(
      <Provider store={store}>
        <Router>
          <AddActor {...defaultProps} {...props} />
        </Router>
      </Provider>
    );
  }

  beforeEach(() => {
    renderApp();
  });

  it("Should show add actor modal", async () => {
    const addMovie = screen.getByText(/Add actors to a movie/i);
    user.click(addMovie);

    const header = screen.getByText(/ADD NEW ACTOR/i);
    const headerExist = screen.getByText(/ADD EXISTING ACTOR/i);
    const addActor = screen.getAllByRole("button", {
      name: /add actor/i,
    });

    expect(header).not.toBeNull();
    expect(headerExist).not.toBeNull();
    expect(addActor).not.toBeNull();
  });

  it("Should show Form", async () => {
    const addActor = screen.getByText(/Add actors to a movie/i);
    user.click(addActor);

    expect(screen.getByText(/First Name/i)).not.toBeNull();
    expect(screen.getByText(/Last Name/i)).not.toBeNull();
    expect(screen.getByText(/Gender/i)).not.toBeNull();
    expect(screen.getAllByText(/Age/i)).not.toBeNull();
    expect(screen.getByText(/Image URL/i)).not.toBeNull();
  });

  it("Should show select movie and add existing actor", async () => {
    const addActor = screen.getByText(/Add actors to a movie/i);
    user.click(addActor);

    expect(screen.getAllByRole("combobox")).not.toBeNull();
  });
});
