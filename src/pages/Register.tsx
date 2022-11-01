import Container from "react-bootstrap/Container";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

export default function Register() {
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
            <img alt="logo.png" className="logo" src={logo} />
          </div>
          <Card className=" login-card p-5">
            <div className="text-center mb-3">
              <h4>REGISTER</h4>
            </div>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <div className="text-center">
                <Button className="login-btn mt-3" variant="dark" type="submit">
                  Submit
                </Button>
                <p className="mt-4">
                  Already registered? &nbsp;
                  <NavLink to="/login">Login</NavLink>
                </p>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
