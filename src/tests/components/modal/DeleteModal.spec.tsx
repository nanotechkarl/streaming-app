/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import DeleteModal, { Props } from "../../../components/modal/DeleteModal";
import { BrowserRouter as Router } from "react-router-dom";
/* <DeleteModal
    onHide={() => setDeleteMovieState(false)}
    handleDelete={confirmDeleteMovie}
    show={deleteMovieState}
    /> */

const onHide = () => {};
const handleDelete = () => {};
const show: boolean = false;

describe("<DeleteModal/>", () => {
  function renderApp(props: Props) {
    const initialState = {};
    const mockStore = configureStore();
    let store;
    store = mockStore(initialState);
    return render(
      <Provider store={store}>
        <Router>
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

  test.skip("Should show modal", () => {});

  test.skip("Should hide when clicking cancel btn", () => {});
  test.skip("Should confirm when clicking ok btn", () => {});
});
