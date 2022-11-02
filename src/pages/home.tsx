import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getMovies, searchActor, searchMovie } from "../store/movie.slice";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";

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
  const { movies, searchBy }: { [key: string]: any } = useAppSelector(
    (state) => state.movie
  );
  //#endregion

  //#region - FETCH
  useEffect(() => {
    fetchData();
  }, []); //eslint-disable-line

  const fetchData = async () => {
    await dispatch(getMovies());
    // await dispatch(searchActor());
  };

  //#endregion

  return (
    <div className="home-page ml-4">
      <div>
        <h5 className="mb-4"> LATEST MOVIES</h5>
        <Carousel
          responsive={responsive}
          ssr={true}
          slidesToSlide={3}
          className="mr-5"
        >
          {movies.map((data: any) => {
            return (
              <div className="movie-card-container" key={data.id}>
                <Card className="movie-card">
                  <img alt={data.title} src={data.imgUrl} />
                </Card>
                <h5 className="movie-title">{data.title}</h5>
              </div>
            );
          })}
        </Carousel>
      </div>
      <div className="mt-5">
        <div>
          <Form>
            <div className="mb-3">
              <Form.Group>
                <h5 className="mr-5">Search by:</h5>
                <Form.Check
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
                  inline
                  label="Movie"
                  name="group1"
                  type="radio"
                  id={`radio-movie`}
                  value="movie"
                  defaultChecked={searchBy === "movie"}
                  onClick={() => dispatch(searchMovie())}
                />
                <Form.Control
                  type="text"
                  name="search"
                  placeholder="Search..."
                  className="search-input"
                />
              </Form.Group>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
