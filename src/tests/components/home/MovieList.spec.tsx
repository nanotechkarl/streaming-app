/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import MovieList from "../../../components/home/MovieList";
import { BrowserRouter as Router } from "react-router-dom";
import { Movies } from "../../../store/types";

const data: Movies[] = [
  {
    id: "1a",
    title: "Item 1",
    imgUrl: "apple",
    cost: "1",
    yearRelease: "1/22/22",
    description: "hello",
  },
  {
    id: "1b",
    title: "Item 2",
    imgUrl: "banana",
    cost: "2",
    yearRelease: "1/22/21",
    description: "hi",
  },
];

const responsive: any = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    slidesToSlide: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 0 },
    items: 5,
    slidesToSlide: 3,
  },
};

describe("<MovieList/>", () => {
  function renderApp() {
    const initialState = {};
    const mockStore = configureStore();
    let store;
    store = mockStore(initialState);
    return render(
      <Provider store={store}>
        <Router>
          <MovieList movies={data} responsive={responsive} />
        </Router>
      </Provider>
    );
  }

  beforeEach(() => {
    renderApp();
  });

  test.skip("should have movie name and link", () => {
    //Change to carousel bootstrap
    // expect(screen.getByText("Item 1")).toBeInTheDocument();
  });

  //should have movie name and link
  test("should render list of movies", () => {
    expect(screen.getByRole("list")).toBeInTheDocument();
  });
});
