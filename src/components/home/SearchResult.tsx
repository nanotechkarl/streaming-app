import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import { Actors, Movies } from "../../store/types";

export interface Props {
  searchBy: string;
  searched: Movies[];
  searchedActors: Actors[];
  responsive: {};
}

export default function SearchResult(props: Props) {
  const { searchBy, searched, responsive, searchedActors } = props;

  return (
    <Carousel responsive={responsive} ssr={true} className="mr-5">
      {searchBy === "movie" &&
        searched.map((data: any) => {
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
      {searchBy === "actor" &&
        searchedActors.map((data: any) => {
          return (
            <Card className="actor-card-container" key={data?.id}>
              <Row className="actor-col">
                <Col className="actor-col">
                  <img
                    className="actor-pic"
                    alt={data.firstName}
                    src={data.imgUrl}
                  />
                </Col>
                <Col className="actor-desc-col">
                  <div className="image__title mt-3">
                    {data.firstName} {data.lastName}
                  </div>
                  <Link to={`/actors/${data.id}`} className="mr-2">
                    <span className="movie-title">Check Movies</span>
                  </Link>
                </Col>
              </Row>
            </Card>
          );
        })}
    </Carousel>
  );
}
