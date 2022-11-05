import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import {
  addMovieReview,
  clearState,
  getAllActorsByMovie,
  getMovieById,
  getMovieReviews,
  getmyReviewMovie,
} from "../store/movie.slice";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import useForm from "../hooks/useForm";
import { Rating } from "react-simple-star-rating";
import useDidMountEffect from "../hooks/useDidMountEffect";
import { getCookie } from "../utils/global";

export default function Reviews() {
  /* #region - Hooks */
  const params = useParams();
  const dispatch = useAppDispatch();
  const { selected, reviews, selectedActors }: { [key: string]: any } =
    useAppSelector((state) => state.movie);
  const { current }: { [key: string]: any } = useAppSelector(
    (state) => state.user
  );
  const [rating, setRating] = useState(0);
  const [edit, setEdit] = useState(false);
  const [comment, setComment] = useState("");
  const [submitCounter, setSubmitCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  /* #endregion */

  useEffect(() => {
    fetchData();

    return () => {
      dispatch(clearState());
    };
  }, []); //eslint-disable-line

  useDidMountEffect(() => {
    refetchReview();
  }, [rating, submitCounter]); //eslint-disable-line

  const fetchData = async () => {
    if (params?.id) {
      setIsLoading(true);
      await dispatch(getMovieById(params.id));
      await dispatch(getMovieReviews(params.id));
      await dispatch(getAllActorsByMovie(params.id));

      const token = getCookie("token");
      if (token) {
        const res = await dispatch(getmyReviewMovie(params.id));
        await setRating(res.payload?.rating);
        await setComment(res.payload?.message);
      }
      setIsLoading(false);
    }
  };

  const refetchReview = async () => {
    const { message }: { message: string } = values as any;
    if (message) {
      await setComment(message);
    }
    if (params?.id) {
      await dispatch(getMovieReviews(params.id));
    }
  };

  const onSubmit = async () => {
    const { message }: { message: string } = values as any;

    if (message && params.id) {
      const res = await dispatch(
        addMovieReview({
          message,
          movieId: params.id,
          datePosted: new Date(),
          name: `${current.name}`,
        })
      );

      if (res) {
        await setEdit(false);
        await setComment(message);
      }
    }

    await setSubmitCounter((prev) => prev + 1);
  };

  const ratingChanged = async (rate: number) => {
    if (rate && params.id) {
      await dispatch(
        addMovieReview({
          rating: rate,
          movieId: params.id,
        })
      );
      setRating(rate);
    }
  };
  //#region - CUSTOM HOOKS
  const inputCount = 1;

  const { handleChange, values, errors, handleSubmit } = useForm({
    callback: onSubmit,
    inputCount,
    inputType: "review",
  });
  //#endregion

  return isLoading ? (
    <Spinner animation="grow" />
  ) : (
    <div className="reviews-page">
      <Row>
        <Col>
          <div className="title-container">
            <h3>{selected?.title}</h3>
            <div className="pic-container">
              <img
                className="pic"
                alt={selected?.title}
                src={selected?.imgUrl}
              />
            </div>
          </div>
        </Col>
        <Col>
          <div className="description">
            {/* TODO- TEMP */}
            <h3 className="overall"> Overall rating: 4.5 *</h3>
            <p> {selected?.description} </p>
          </div>
          <h3> CAST </h3>
          <Row>
            {!selectedActors ? (
              <p className="ml-3 err-name"> No Cast found... </p>
            ) : (
              selectedActors?.map((obj: any) => {
                return (
                  <Card className="actor-card" key={obj.id}>
                    <div className="pic-actor-container">
                      <img
                        className="pic-actor"
                        alt={obj.firstName}
                        src={obj.imgUrl}
                      />
                    </div>
                    <div className="ml-2">
                      <div>
                        {obj.firstName} {obj.lastName}
                      </div>
                      <div> gender: {obj.gender}</div>
                      <div> age: {obj.age}</div>
                      <Link to={`/actors/${obj.id}`} className="mr-2">
                        <span className="movie-title">Check Movies</span>
                      </Link>
                    </div>
                  </Card>
                );
              })
            )}
          </Row>
        </Col>
      </Row>
      {current?.permissions ? (
        <>
          <div className="rate-container">
            <span className="rate-label">RATE THIS MOVIE </span>
            <Rating onClick={ratingChanged} size={20} initialValue={rating} />
          </div>
          <div>
            {comment && !edit ? (
              <>
                <h3> Your Review</h3>
                <span>&nbsp;</span>
                <div className="your-review comment">
                  <p> {comment}</p>
                </div>
                <div className="add-review-container">
                  <Button
                    className="add-review mt-2"
                    variant="dark"
                    onClick={() => setEdit(true)}
                  >
                    Edit
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h3>WRITE A REVIEW</h3>
                {errors.message ? (
                  <span className="input-error err-name">{errors.message}</span>
                ) : (
                  <span>&nbsp;</span>
                )}
                <Form onSubmit={handleSubmit}>
                  <textarea
                    className="comment"
                    placeholder="Write your review here..."
                    name="message"
                    onInput={handleChange}
                  />
                  <div className="add-review-container">
                    <Button className="add-review" variant="dark" type="submit">
                      Submit
                    </Button>
                  </div>
                </Form>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <h3 className="err-name">Login/signup to write a review </h3>
        </>
      )}

      {/* TODO - PUT THIS IN A NEW COMPONENT */}
      <div className="all-reviews mt-5">
        {reviews.length ? (
          <>
            <h3> ALL REVIEWS </h3>
            {reviews.map((obj: any) => {
              const date = new Date(obj.datePosted);
              const format = date.toDateString();
              return (
                <Card className="review-card mb-3" key={obj.id}>
                  <Row>
                    <Col>
                      <div>{obj.name || "Private User"}</div>
                      <div>{format}</div>
                    </Col>
                    <Col xs={8}>{obj.message}</Col>
                    <Col>{obj.rating} STARS</Col>
                  </Row>
                </Card>
              );
            })}
          </>
        ) : (
          <h3>...No reviews yet</h3>
        )}
      </div>
    </div>
  );
}
