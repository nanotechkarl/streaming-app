import { Link } from "react-router-dom";

export default function Error() {
  return (
    <section className="error-page centered">
      <h2>404</h2>
      <p>Page not found</p>
      <Link to="/"> Home </Link>
    </section>
  );
}
