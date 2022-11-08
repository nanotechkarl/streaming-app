import Container from "react-bootstrap/Container";
import { Card } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useTypedSelector";
import { loginUser } from "../store/user.slice";
import { pages } from "../utils/global";
import LoginForm from "../components/forms/LoginForm";
import icon from "../assets/logo.png";

export default function Login() {
  /* #region - Hooks */
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  /* #endregion */

  /* #region  - OnSubmit */
  const onSubmit = async (email: string, password: string) => {
    const login = await dispatch(loginUser({ email, password }));
    if (login?.type.includes("fulfilled")) {
      navigate(pages.loginSuccess);
    } else {
      return false;
    }
  };
  /* #endregion */

  return (
    <Container className="login-page">
      <div className="logo-container">
        <NavLink to="/">
          <img src={icon} alt="home" className="logo" />
        </NavLink>
      </div>
      <Card className=" login-card p-5">
        <div className="text-center mb-3">
          <h4>LOGIN</h4>
        </div>
        <div>
          <LoginForm onSubmit={onSubmit} />
        </div>
      </Card>
    </Container>
  );
}
