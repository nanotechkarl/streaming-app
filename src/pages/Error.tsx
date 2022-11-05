import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <Container className="home-page mt-5">
      <h2>404 ERROR</h2>
      <p>Page not found</p>
      <Link to="/">Return Home </Link>
    </Container>
  );
}
