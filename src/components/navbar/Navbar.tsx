import { Link, Outlet } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { clear, clearUserState } from "../../store/user.slice";
import Cookies from "js-cookie";

export default function Navbar() {
  const { name, permissions } = useAppSelector((state) => state.user.current);
  const dispatch = useAppDispatch();

  const logout = () => {
    Cookies.remove("token");
    dispatch(clearUserState());
    dispatch(clear());
    window.location.assign("/login");
  };

  return (
    <>
      <nav className="tab p-4">
        <Link to="/" className="mr-2">
          <img alt="logo.png" className="logo" src={logo} />
        </Link>
        <div className="tabs mt-3">
          {name && <span className="mr-3 user">Hi {name}</span>}
          {!name && (
            <Link to="/login" className="mr-2">
              <span>Login/Register</span>
            </Link>
          )}
          {permissions?.includes("admin") && (
            <Link to="/control" className="mr-2">
              <span>Control</span>
            </Link>
          )}

          {name && (
            <Link to="/login" className="mr-2">
              <span onClick={logout}>Logout</span>
            </Link>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
}
