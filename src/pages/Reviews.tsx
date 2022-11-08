import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { clearMovieState, getMovieById } from "../store/movie.slice";
import {
  addMovieReview,
  clearReviewState,
  getMovieReviews,
  getmyReviewMovie,
} from "../store/review.slice";
import { getAllActorsByMovie } from "../store/actor.slice";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import useForm from "../hooks/useForm";
import { Rating } from "react-simple-star-rating";
import useDidMountEffect from "../hooks/useDidMountEffect";
import { getCookie } from "../utils/global";

export default function Reviews() {
  /* #region - HOOKS */
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useAppDispatch();
  const { selected }: { [key: string]: any } = useAppSelector(
    (state) => state.movie
  );
  const { reviews, yourReview }: { [key: string]: any } = useAppSelector(
    (state) => state.review
  );
  const { selectedActors }: { [key: string]: any } = useAppSelector(
    (state) => state.actor
  );
  const { current }: { [key: string]: any } = useAppSelector(
    (state) => state.user
  );
  const [rating, setRating] = useState(0);
  const [edit, setEdit] = useState(false);
  const [comment, setComment] = useState("");
  const [submitCounter, setSubmitCounter] = useState(0);
  /* #endregion */

  /* #region  - EFFECTS */
  useEffect(() => {
    fetchData();

    return () => {
      dispatch(clearMovieState());
      dispatch(clearReviewState());
    };
  }, []); //eslint-disable-line

  useDidMountEffect(() => {
    refetchReview();
    overallrating();
  }, [rating, submitCounter]); //eslint-disable-line

  const fetchData = async () => {
    if (params?.id) {
      const res = await dispatch(getMovieById(params.id));
      if (!res.payload) navigate("/page-not-found");
      await dispatch(getMovieReviews(params.id));
      await dispatch(getAllActorsByMovie(params.id));
      const token = getCookie("token");
      if (token) {
        const res = await dispatch(getmyReviewMovie(params.id));
        setRating(res.payload?.rating);
        setComment(res.payload?.message);
      }
    }
  };

  const refetchReview = async () => {
    const { message }: { message: string } = values as any;
    if (message) {
      setComment(message);
    }
    if (params?.id) {
      await dispatch(getMovieReviews(params.id));
      await dispatch(getmyReviewMovie(params.id));
    }
  };

  /* #endregion */

  /* #region  - SUBMIT */

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
        setEdit(false);
        setComment(message);
      }
    }

    setSubmitCounter((prev) => prev + 1);
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
  /* #endregion */

  //#region - CUSTOM HOOKS
  const inputCount = 1;

  const { handleChange, values, errors, handleSubmit } = useForm({
    callback: onSubmit,
    inputCount,
    inputType: "review",
  });
  //#endregion

  /* #region  - RENDER */
  const renderCast = () => {
    return (
      <Row>
        {!selectedActors?.length ? (
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
                  <Link to={`/actors/${obj.id}`} className="mr-2">
                    <span className="movie-title">Check Movies</span>
                  </Link>
                </div>
              </Card>
            );
          })
        )}
      </Row>
    );
  };

  const renderReviewOption = () => {
    return (
      <div>
        {current?.permissions?.includes("user") ? (
          <>
            <div className="rate-container">
              <span className="rate-label">RATE THIS MOVIE </span>
              <Rating onClick={ratingChanged} size={20} initialValue={rating} />
              {yourReview?.approved === false && (
                <div className="warning-text">
                  Waiting for approval of administrator
                </div>
              )}
            </div>
            <div>
              {comment && !edit ? (
                <>
                  <h3> Your Review</h3>
                  <span className="warning-text">
                    &nbsp;
                    {yourReview?.approved && (
                      <span className="success-text">
                        Your review has been approved
                      </span>
                    )}
                  </span>
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
                    <span className="input-error err-name">
                      {errors.message}
                    </span>
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
                      <Button
                        className="add-review"
                        variant="dark"
                        type="submit"
                      >
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
            {current?.permissions?.includes("admin") ? (
              <></>
            ) : (
              <h3 className="err-name">Login/signup to write a review </h3>
            )}
          </>
        )}
      </div>
    );
  };

  const renderAllReviews = () => {
    return (
      <>
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
      </>
    );
  };
  /* #endregion */

  /* #region  - UTILS */
  const overallrating = () => {
    const apple = reviews?.map((obj: any) => {
      return obj.rating;
    });

    const sum = apple?.reduce((a: any, b: any) => {
      const sam = parseInt(a) + parseInt(b);
      return sam;
    }, 0);

    const avg = sum / reviews?.length || 0;
    return avg;
  };
  /* #endregion */

  return (
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
              <h3 className="warning-text"> Rating: {overallrating()} stars</h3>
            </div>
          </div>
        </Col>
        <Col>
          <div className="description">
            <p> {selected?.description} </p>
          </div>
          <h3> CAST </h3>
          {renderCast()}
        </Col>
      </Row>
      {renderReviewOption()}
      <div className="all-reviews mt-5">{renderAllReviews()}</div>
    </div>
  );
}
