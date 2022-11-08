import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import { Movies } from "../../store/types";

export interface Props {
  movies: Movies[];
  responsive: {};
}

export default function MovieList(props: Props) {
  const { movies, responsive } = props;

  return (
    <Carousel responsive={responsive} className="mr-5">
      {movies?.map((data: Movies) => {
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
  );
}
