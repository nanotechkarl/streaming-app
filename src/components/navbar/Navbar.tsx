import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useAppSelector } from "../../hooks/useTypedSelector";

export default function Navbar() {
  const name = useAppSelector((state) => state.user.current.name);

  const logout = () => {
    document.cookie = `token=;`;
  };

  return (
    <>
      <nav className="tab p-4">
        <img alt="logo.png" className="logo" src={logo} />
        <div className="tabs mt-3">
          <span className="mr-3 user">Hi {name},</span>
          <Link to="/" className="mr-2">
            <span>Dashboard</span>
          </Link>
          <Link to="/login" className="mr-2">
            <span>login/register</span>
          </Link>
          <Link to="/" className="mr-2">
            <span onClick={logout}>Logout</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
