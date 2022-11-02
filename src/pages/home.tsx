import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  getMovies,
  searchActor,
  searchMovie,
  searchByMovie,
} from "../store/movie.slice";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015
import useDebounce from "../hooks/useDebounce";
import { Link } from "react-router-dom";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 5,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function Home() {
  //#region - HOOKS
  const dispatch = useAppDispatch();
  const { movies, searchBy, searched }: { [key: string]: any } = useAppSelector(
    (state) => state.movie
  );
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  useDebounce(() => handleSearch(search), 1000, [count]);
  //#endregion

  //#region - FETCH
  useEffect(() => {
    fetchData();
  }, []); //eslint-disable-line

  const fetchData = async () => {
    await dispatch(getMovies());
  };

  //#endregion

  const handleSearch = (text: any) => {
    if (text) {
      dispatch(searchByMovie(text));
    }
  };

  return (
    <div className="home-page ml-4 ">
      <div>
        <h3 className="mb-4 mt-5"> LATEST MOVIES</h3>
        <Carousel
          responsive={responsive}
          ssr={true}
          slidesToSlide={3}
          className="mr-5"
        >
          {movies.map((data: any) => {
            return (
              <div className="movie-card-container" key={data.id}>
                <Card className="movie-card ">
                  <img className="pic" alt={data.title} src={data.imgUrl} />
                  <div className="image__overlay image__overlay--primary">
                    <div className="image__title">{data.title}</div>
                    <p className="image__description movie-title">
                      <Link to={`/reviews/${data.id}`} className="mr-2">
                        <span className="movie-title">Check Reviews</span>
                      </Link>
                    </p>
                  </div>
                </Card>
              </div>
            );
          })}
        </Carousel>
      </div>
      <div className="mt-5">
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
                  options={movies.map((obj: any) => obj.title)}
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
      </div>

      <div>
        {searched.length ? <h3 className="mb-4"> RESULTS:</h3> : <></>}
        <Carousel
          responsive={responsive}
          ssr={true}
          slidesToSlide={3}
          className="mr-5"
        >
          {searched.map((data: any) => {
            return (
              <div className="movie-card-container" key={data.id}>
                <Card className="movie-card">
                  <img alt={data.title} src={data.imgUrl} />
                  <div className="image__overlay image__overlay--primary">
                    <div className="image__title">{data.title}</div>
                    <Link to={`/reviews/${data.id}`} className="mr-2">
                      <span className="movie-title">Check Reviews</span>
                    </Link>
                  </div>
                </Card>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}
