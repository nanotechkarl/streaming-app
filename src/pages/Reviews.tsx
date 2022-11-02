import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { getMovieById, getMovieReviews } from "../store/movie.slice";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

//TODO debug error on reload of this page
export default function Reviews() {
  /* #region - Hooks */
  const params = useParams();
  const dispatch = useAppDispatch();
  const { selected, reviews }: { [key: string]: any } = useAppSelector(
    (state) => state.movie
  );
  /* #endregion */

  useEffect(() => {
    fetchData();
  }, []); //eslint-disable-line

  const fetchData = async () => {
    if (params?.id) {
      dispatch(getMovieById(params.id));
      dispatch(getMovieReviews(params.id));
    }
  };

  return (
    <div className="reviews-page">
      <Row>
        <Col>
          <h3>{selected.title}</h3>
          <div className="pic-container">
            <img className="pic" alt={selected.title} src={selected.imgUrl} />
          </div>
          <h3> ACTORS </h3>
          {/* TODO- TEMP */}
          <p> Jennifer Doe, May Carter, June Duenas</p>
        </Col>
        <Col>
          <div className="description">
            <p className="overall"> Overall rating: 4.5 *</p>
            <p> {selected.description} </p>
            {/* TODO- TEMP */}
          </div>
        </Col>
      </Row>
      <div className="rate-container">
        <span className="rate-label">RATE THIS MOVIE </span>
        {/* TODO-TEMP */}
        <span> * * * * *</span>
      </div>
      <div>
        <h3>WRITE A REVIEW</h3>
        <textarea className="comment" placeholder="Write your review here..." />
        <div className="add-review-container">
          <Button className="add-review" variant="dark" type="submit">
            Submit
          </Button>
        </div>
      </div>
      {/* TODO - PUT THIS IN A NEW COMPONENT */}
      <div className="all-reviews mt-5">
        <h3> ALL REVIEWS </h3>
        {reviews.map((obj: any) => {
          return (
            <Card className="review-card" key={obj.id}>
              <Row>
                <Col>{obj.userId}</Col>
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
