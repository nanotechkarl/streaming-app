/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import SearchResult, { Props } from "../../../components/home/SearchResult";
import { BrowserRouter as Router } from "react-router-dom";
import { Actors, Movies } from "../../../store/types";

const searched: Movies[] = [
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

const searchedActors: Actors[] = [
  {
    id: "stringid",
    firstName: "stringfirstName",
    lastName: "stringlastName",
    gender: "stringgender",
    age: "stringage",
    imgUrl: "stringimgUrl",
  },
  {
    id: "string2id",
    firstName: "string2firstName",
    lastName: "string2lastName",
    gender: "string2gender",
    age: "string2age",
    imgUrl: "string2imgUrl",
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

describe("<SearchResult/>", () => {
  function renderApp(props: Partial<Props> = {}) {
    const initialState = {};
    const mockStore = configureStore();
    let store;
    store = mockStore(initialState);

    const defaultProps = {
      searchBy: "movies",
    };

    return render(
      <Provider store={store}>
        <Router>
          <SearchResult
            responsive={responsive}
            searched={searched}
            searchedActors={searchedActors}
            {...defaultProps}
            {...props}
          />
        </Router>
      </Provider>
    );
  }

  test.skip("should have movie name and link", () => {
    //Change to carousel bootstrap
    // expect(screen.getByText("Item 1")).toBeInTheDocument();
  });

  test("should render list", () => {
    renderApp();

    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  test.skip("Render searched actors if selected is actor search", () => {
    //change component to carousel bootstrap
    renderApp({ searchBy: "movies" });

    expect(screen.getByRole("list")).toBeInTheDocument();
  });
  test.skip("Render searched actors if selected is movie search", () => {
    //change component to carousel bootstrap

    renderApp({ searchBy: "actor" });
    expect(screen.getByRole("list")).toBeInTheDocument();
  });
});
