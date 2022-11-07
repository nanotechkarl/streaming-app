import Container from "react-bootstrap/Container";
import { Card, Button, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { registerUser } from "../store/user.slice";
import { useAppDispatch } from "../hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";
import { alertError, alertSuccess, pages } from "../utils/global";
import useForm from "../hooks/useForm";
import Swal from "sweetalert2";

export default function Register() {
  //#region - HOOKS
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  //#endregion

  //#region - REGISTER
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const { fName, lName, email, password, cPassword, role } = values as any;

    if (cPassword !== password) {
      alertError("Password does not match");
      return false;
    }

    const permissions = [role];
    const register = await dispatch(
      registerUser({
        email,
        password,
        firstName: fName,
        lastName: lName,
        permissions,
      })
    );

    if (register.payload) {
      navigate(pages.registerSuccess);
      alertSuccess("Registration Success. Please wait for admin to approve");
    }
  };
  //#endregion

  //#region - CUSTOM HOOKS
  const inputCount = 6;

  const { handleChange, values, errors, handleSubmit } = useForm({
    callback: onSubmit,
    inputCount,
    inputType: "register",
  });

  //#endregion

  return (
    <Container className="login-page">
      <Card className=" register-card p-5">
        <div className="text-center mb-3">
          <h4>REGISTER</h4>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onInput={handleChange}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          {errors.email ? (
            <span className="input-error err-name">{errors.email}</span>
          ) : (
            <span>&nbsp;</span>
          )}

          <Form.Group controlId="formBasicFistName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              name="fName"
              onInput={handleChange}
            />
          </Form.Group>
          {errors.fName ? (
            <span className="input-error err-name">{errors.fName}</span>
          ) : (
            <span>&nbsp;</span>
          )}

          <Form.Group controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              name="lName"
              onInput={handleChange}
            />
          </Form.Group>
          {errors.lName ? (
            <span className="input-error err-name">{errors.lName}</span>
          ) : (
            <span>&nbsp;</span>
          )}

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="*****"
              name="password"
              onInput={handleChange}
            />
          </Form.Group>
          {errors.password ? (
            <span className="input-error err-name">{errors.password}</span>
          ) : (
            <span>&nbsp;</span>
          )}

          <Form.Group controlId="formBasicCPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              placeholder="*****"
              name="cPassword"
              onInput={handleChange}
            />
          </Form.Group>
          {errors.cPassword ? (
            <span className="input-error err-name">{errors.cPassword}</span>
          ) : (
            <span>&nbsp;</span>
          )}

          <div>
            <span> Register as? </span>
            <Form.Check
              className="radio"
              inline
              label="User"
              name="role"
              type="radio"
              id={`radio-admin`}
              value="user"
              onInput={handleChange}
            />
            <Form.Check
              className="radio"
              inline
              label="Admin"
              name="role"
              type="radio"
              id={`radio-admin`}
              value="admin"
              onInput={handleChange}
            />
            {errors.role ? (
              <span className="input-error err-name">{errors.role}</span>
            ) : (
              <span>&nbsp;</span>
            )}
          </div>

          <div className="text-center mt-3">
            <small>*Registering requires admin approval</small>
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
