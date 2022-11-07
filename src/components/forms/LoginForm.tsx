import { Button, Form } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useTypedSelector";
import useForm from "../../hooks/useForm";
import { pages } from "../../utils/global";

export interface Props {
  onSubmit: (email: string, password: string) => void;
}

export default function LoginForm(props: Props) {
  /* #region  - OnSubmit */
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const { email, password } = values as any;
    console.log("password :", password);
    console.log("email :", email);
    props.onSubmit(email, password);
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
    <Form data-testid="login-form" onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          data-testid="email"
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
          data-testid="password"
          onInput={handleChange}
        />
      </Form.Group>
      {errors.password ? (
        <span className="input-error err-name">{errors.password}</span>
      ) : (
        <span>&nbsp;</span>
      )}
      <div className="text-center">
        <Button
          className="login-btn mt-3"
          variant="dark"
          type="submit"
          data-testid="submit"
        >
          Submit
        </Button>
        <p className="mt-4">
          No account yet? &nbsp;
          <NavLink to="/register">Register</NavLink>
        </p>
      </div>
    </Form>
  );
}
