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
  getMoviesPaginated,
} from "../store/movie.slice";
import {
  searchActors,
  getAllActors,
  clearActorState,
} from "../store/actor.slice";
import MovieList from "../components/home/MovieList";
import SearchResult from "../components/home/SearchResult";
import ReactPaginate from "react-paginate";
export default function Home() {
  //#region - HOOKS
  const dispatch = useAppDispatch();
  const {
    latest,
    searchBy,
    searched,
    paginationSettings,
    movieSearchSettings,
    searchedWord,
  }: { [key: string]: any } = useAppSelector((state) => state.movie);
  const { actors, searched: searchedActors }: { [key: string]: any } =
    useAppSelector((state) => state.actor);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  useDebounce(() => handleSearch(search), 1000, [count]);
  const limitPerPage = 5;
  //#endregion

  //#region - EFFECT
  useEffect(() => {
    fetchData();
  }, []); //eslint-disable-line

  const fetchData = async () => {
    await dispatch(getAllActors());
    if (searchedWord && searchBy === "movie") {
      dispatch(
        searchByMovie({
          title: searchedWord,
          page: 1,
          limit: limitPerPage,
        })
      );
    }
  };

  const handleSearch = (text: any) => {
    if (text && searchBy === "movie") {
      dispatch(
        searchByMovie({
          title: text,
          page: 1,
          limit: limitPerPage,
        })
      );
    } else if (text && searchBy === "actor") {
      dispatch(searchActors(text));
    }
  };
  //#endregion

  /* #region  - UTILS */
  const handleMoviePageSearch = async (data: any) => {
    if (searchedWord && searchBy === "movie") {
      dispatch(
        searchByMovie({
          title: searchedWord,
          page: data.selected + 1,
          limit: limitPerPage,
        })
      );
    }
  };

  const handlePageClick = async (data: any) => {
    await dispatch(
      getMoviesPaginated({ page: data.selected + 1, limit: limitPerPage })
    );
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
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
                    ? latest.map((obj: any) => obj.title)
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
                onChange={() => {
                  dispatch(clearActorState());
                  dispatch(searchActor());
                }}
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
        <MovieList responsive={responsive} movies={latest} />
        <div className="mt-3">
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={Math.ceil(paginationSettings.count / limitPerPage)}
            marginPagesDisplayed={5}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      </div>
      <div className="mt-5">{renderSearch()}</div>
      <SearchResult
        searchBy={searchBy}
        searched={searched}
        searchedActors={searchedActors?.length ? searchedActors : actors}
        responsive={responsive}
      />
      <div className="mt-3">
        {searchBy === "movie" && searched.length !== 0 && (
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={Math.ceil(movieSearchSettings.count / limitPerPage)}
            marginPagesDisplayed={5}
            pageRangeDisplayed={5}
            onPageChange={handleMoviePageSearch}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        )}
      </div>
    </div>
  );
}
