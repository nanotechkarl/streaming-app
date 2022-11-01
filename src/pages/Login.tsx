import Container from "react-bootstrap/Container";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

export default function Login() {
  return (
    <Container className="login-page">
      <Row>
        <Col className="login-header"></Col>
        <Col>
          <div className="content">
            <span>MOVIE REVIEW</span>
            <h4 className="sub-text">REVIEW YOUR FAVORITE MOVIES</h4>
            <hr className="line" />
          </div>
          <div>
            <NavLink to="/">
              <img alt="logo.png" className="logo" src={logo} />
            </NavLink>
          </div>
          <Card className=" login-card p-5">
            <div className="text-center mb-3">
              <h4>LOGIN</h4>
            </div>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <div className="text-center">
                <Button className="login-btn mt-3" variant="dark" type="submit">
                  Submit
                </Button>
                <p className="mt-4">
                  No account yet? &nbsp;
                  <NavLink to="/register">Register</NavLink>
                </p>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
