/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import DeleteModal, { Props } from "../../../components/modal/DeleteModal";
import { BrowserRouter as Router } from "react-router-dom";
import { Control } from "../../../pages";
import thunk from "redux-thunk";
import {
  actorsMock,
  moviesMock,
  pendingReviewsMock,
  userMock,
} from "../mockValues";
import user from "@testing-library/user-event";

const onHide = () => {};
const handleDelete = () => {};
const show: boolean = false;

describe("<DeleteModal/>", () => {
  function renderApp(props: Props) {
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
          <DeleteModal {...props} />
        </Router>
      </Provider>
    );
  }

  beforeEach(() => {
    renderApp({
      onHide,
      handleDelete,
      show,
    });
  });

  it("Should show modal", async () => {
    const deleteBtn = screen.getAllByRole("button", {
      name: /\| delete/i,
    });
    await user.click(deleteBtn[0]);

    const confirm = screen.getByText(/confirm deletion/i);
    const ok = screen.getByText(/ok/i);
    const cancel = screen.getByText(/cancel/i);

    expect(confirm).not.toBeNull();
    expect(ok).not.toBeNull();
    expect(cancel).not.toBeNull();
  });

  test("Should hide when clicking cancel btn", async () => {
    const deleteBtn = screen.getAllByRole("button", {
      name: /\| delete/i,
    });
    await user.click(deleteBtn[0]);

    const cancel = await screen.findByText(/cancel/i);
    await user.click(cancel);
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/confirm deletion/i)
    );
    const confirm = screen.queryByText(/confirm deletion/i);
    expect(confirm).toBeNull();
  });
});
