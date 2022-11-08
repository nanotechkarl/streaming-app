import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import {
  clearActorState,
  getActor,
  getMoviesOfActor,
} from "../store/actor.slice";

export default function Actor() {
  /* #region  - HOOKS */
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const { moviesOfActor, actorSelected }: { [key: string]: any } =
    useAppSelector((state) => state.actor);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  /* #endregion */

  /* #region  - EFFECT */
  useEffect(() => {
    fetchData();

    return () => {
      dispatch(clearActorState());
    };
  }, []); //eslint-disable-line

  const fetchData = async () => {
    setIsLoading(true);
    if (params?.id) {
      const res = await dispatch(getActor(params.id));
      if (!res.payload) navigate("/page-not-found");
      await dispatch(getMoviesOfActor(params.id));
    }
    setIsLoading(false);
  };

  /* #endregion */

  /* #region  - UTILS */
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

  return isLoading ? (
    <Spinner animation="grow"></Spinner>
  ) : (
    <Container className="home-page">
      <Row className="ml-4 mb-5">
        <Col xs={6}>
          <img
            className="actor-pic-big"
            alt={actorSelected?.firstName}
            src={actorSelected?.imgUrl}
          />
        </Col>
        <Col xs={4}>
          <p>
            Name: {actorSelected?.firstName} {actorSelected?.lastName}
          </p>
          <p>Age: {actorSelected?.age}</p>
          <p>Gender: {actorSelected?.gender}</p>
        </Col>
      </Row>
      <h3 className="ml-4">
        Movies of {actorSelected?.firstName} {actorSelected?.lastName}
      </h3>
      <Row>
        {moviesOfActor?.map((data: any) => {
          return (
            <Card className="movie-card" key={data.id}>
              <img
                className="pic-selected-actor"
                alt={data.title}
                src={data.imgUrl}
              />
              <div className="image__overlay image__overlay--primary">
                <div className="image__title">{data.title}</div>
                <p className="image__description movie-title">
                  <Link to={`/reviews/${data.id}`} className="mr-2">
                    <span className="movie-title">Check Reviews</span>
                  </Link>
                </p>
              </div>
            </Card>
          );
        })}
      </Row>
    </Container>
  );
}
