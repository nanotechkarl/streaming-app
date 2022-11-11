import React, { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015
import Form from "react-bootstrap/Form";
import "react-multi-carousel/lib/styles.css";
import useDebounce from "../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import {
  searchActor,
  searchMovie,
  searchByMovie,
  getMovies,
} from "../store/movie.slice";
import { searchActors, getAllActors } from "../store/actor.slice";
import MovieList from "../components/home/MovieList";
import SearchResult from "../components/home/SearchResult";

export default function Home() {
  //#region - HOOKS
  const dispatch = useAppDispatch();
  const { movies, searchBy, searched }: { [key: string]: any } = useAppSelector(
    (state) => state.movie
  );
  const { actors, searched: searchedActors }: { [key: string]: any } =
    useAppSelector((state) => state.actor);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  useDebounce(() => handleSearch(search), 1000, [count]);
  //#endregion

  //#region - EFFECT
  useEffect(() => {
    fetchData();
  }, []); //eslint-disable-line

  const fetchData = async () => {
    await dispatch(getMovies());
    await dispatch(getAllActors());
  };

  const handleSearch = (text: any) => {
    if (text && searchBy === "movie") {
      dispatch(searchByMovie(text));
    } else if (text && searchBy === "actor") {
      dispatch(searchActors(text));
    }
  };
  //#endregion

  /* #region  - UTILS */
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
      slidesToSlide: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1600, min: 464 },
      items: 4,
      slidesToSlide: 2,
    },
    tabletSmall: {
      breakpoint: { max: 1280, min: 980 },
      items: 3,
      slidesToSlide: 2,
    },
    mobilelarge: {
      breakpoint: { max: 980, min: 680 },
      items: 2,
      slidesToSlide: 1,
    },
    mobileSmall: {
      breakpoint: { max: 680, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  /* #endregion */

  /* #region  - RENDER */
  const renderSearch = () => {
    return (
      <div>
        <Form>
          <div className="mb-5">
            <Form.Group>
              <h3 className="mr-5 search-header">Search by:</h3>
              <Typeahead
                dropup={true}
                id="id"
                placeholder="Search..."
                className="search-input mr-5"
                labelKey="title"
                onInputChange={(text, e) => {
                  setCount((c) => c + 1);
                  setSearch(text);
                }}
                onChange={([selected]) => {
                  if (selected) handleSearch(selected);
                }}
                options={
                  searchBy === "movie"
                    ? movies.map((obj: any) => obj.title)
                    : actors.map((obj: any) => {
                        return obj.firstName + " " + obj.lastName;
                      })
                }
              />
              <Form.Check
                className="radio"
                inline
                label="Actor"
                name="group1"
                type="radio"
                id={`radio-actor`}
                value="actor"
                defaultChecked={searchBy === "actor"}
                onClick={() => dispatch(searchActor())}
              />
              <Form.Check
                className="radio"
                inline
                label="Movie"
                name="group1"
                type="radio"
                id={`radio-movie`}
                value="movie"
                defaultChecked={searchBy === "movie"}
                onClick={() => dispatch(searchMovie())}
              />
            </Form.Group>
          </div>
        </Form>
      </div>
    );
  };
  /* #endregion */

  return (
    <div className="home-page ml-4 ">
      <div>
        <h3 className="mb-4 mt-5"> LATEST MOVIES</h3>
        <MovieList responsive={responsive} movies={movies} />
      </div>
      <div className="mt-5">{renderSearch()}</div>
      <SearchResult
        searchBy={searchBy}
        searched={searched}
        searchedActors={searchedActors}
        responsive={responsive}
      />
    </div>
  );
}
