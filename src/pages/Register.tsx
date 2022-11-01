import Container from "react-bootstrap/Container";
import { Card, Button, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Register() {
  return (
    <Container className="login-page">
      <Card className=" register-card p-5">
        <div className="text-center mb-3">
          <h4>REGISTER</h4>
        </div>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicFistName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter first name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter last name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="*****" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control type="password" placeholder="*****" />
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
    </Container>
  );
}
