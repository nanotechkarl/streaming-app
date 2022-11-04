import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import {
  addMovieReview,
  getAllActorsByMovie,
  getMovieById,
  getMovieReviews,
} from "../store/movie.slice";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import useForm from "../hooks/useForm";
import { Rating } from "react-simple-star-rating";
import useDidMountEffect from "../hooks/useDidMountEffect";

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
  /* #endregion */

  useDidMountEffect(() => {
    fetchData();
  }, [rating, submitCounter]); //eslint-disable-line

  useEffect(() => {
    //TODO bug here when find is undefined from one then go to another
    //One solution would be create new endpoint and refetch
    fetchData();
    const user = reviews?.find(
      (obj: any) => obj.userId === current.id && obj.movieId === params.id
    );
    // console.log("user :", user);

    setRating(user?.rating);
    setComment(user?.message);

    return () => {
      setEdit(false);
      setComment("");
    };
  }, []); //eslint-disable-line

  const fetchData = async () => {
    if (params?.id) {
      await dispatch(getMovieById(params.id));
      await dispatch(getMovieReviews(params.id));
      await dispatch(getAllActorsByMovie(params.id));
    }
  };

  const onSubmit = async () => {
    const { message }: { message: string } = values as any;

    if (message && params.id) {
      await dispatch(
        addMovieReview({
          message,
          movieId: params.id,
          datePosted: new Date(),
        })
      );
    }
    setSubmitCounter((prev) => prev + 1);
    setEdit(false);
    setComment(message);
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

  return (
    <div className="reviews-page">
      <Row>
        <Col>
          <div className="title-container">
            <h3>{selected?.title}</h3>
            <div className="pic-container">
              <img className="pic" alt={selected.title} src={selected.imgUrl} />
            </div>
          </div>
        </Col>
        <Col>
          <div className="description">
            {/* TODO- TEMP */}
            <h3 className="overall"> Overall rating: 4.5 *</h3>
            <p> {selected.description} </p>
          </div>
          <h3> ACTORS </h3>
          {selectedActors?.map((obj: any) => {
            return (
              <Card className="actor-card" key={obj.id}>
                <div>
                  {obj.firstName} {obj.lastName}
                </div>
                <div> gender: {obj.gender}</div>
                <div> age: {obj.age}</div>
              </Card>
            );
          })}
        </Col>
      </Row>
      <div className="rate-container">
        <span className="rate-label">RATE THIS MOVIE </span>
        {/* RATING */}
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
      {/* TODO - PUT THIS IN A NEW COMPONENT */}
      <div className="all-reviews mt-5">
        <h3> ALL REVIEWS </h3>
        {reviews.map((obj: any) => {
          const date = new Date(obj.datePosted);
          const format = date.toDateString();
          return (
            <Card className="review-card mb-3" key={obj.id}>
              <Row>
                <Col>
                  <div>{obj.userId}</div>
                  <div>{format}</div>
                </Col>
                <Col xs={8}>{obj.message}</Col>
                <Col>{obj.rating} STARS</Col>
              </Row>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
