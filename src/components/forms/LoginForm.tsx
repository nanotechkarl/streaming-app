import { Button, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useForm from "../../hooks/useForm";

export interface Props {
  onSubmit: (email: string, password: string) => void;
}

export default function LoginForm(props: Props) {
  /* #region  - OnSubmit */
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const { email, password } = values as any;
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
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          data-testid="email"
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
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
