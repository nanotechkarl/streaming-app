import Container from "react-bootstrap/Container";
import { Card, Button, Form } from "react-bootstrap";
import logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useTypedSelector";
import { loginUser } from "../store/user.slice";
import useForm from "../hooks/useForm";
import { pages } from "../utils/global";

export default function Login() {
  /* #region - Hooks */
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  /* #endregion */

  /* #region  - OnSubmit */
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const { email, password } = values as any;
    const login = await dispatch(loginUser({ email, password }));

    if (login?.type.includes("fulfilled")) {
      navigate(pages.loginSuccess);
    } else {
      return false;
    }
  };
  /* #endregion */

  //#region - CUSTOM HOOKS
  const inputCount = 2;

  const { handleChange, values, errors, handleSubmit } = useForm({
    callback: onSubmit,
    inputCount,
  });
  //#endregion

  return (
    <Container className="login-page">
      <div className="logo-container">
        <NavLink to="/">
          <img alt="logo.png" className="logo" src={logo} />
        </NavLink>
      </div>
      <Card className=" login-card p-5">
        <div className="text-center mb-3">
          <h4>LOGIN</h4>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onInput={handleChange}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          {errors.email ? (
            <span className="input-error err-name">{errors.email}</span>
          ) : (
            <span>&nbsp;</span>
          )}
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onInput={handleChange}
            />
          </Form.Group>
          {errors.password ? (
            <span className="input-error err-name">{errors.password}</span>
          ) : (
            <span>&nbsp;</span>
          )}
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
    </Container>
  );
}
