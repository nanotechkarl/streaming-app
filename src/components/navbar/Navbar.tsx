import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Navbar() {
  const logout = () => {
    document.cookie = `token=;`;
    // window.location.href = `${server.app}/logout`;
  };

  return (
    <>
      <nav className="tab p-4">
        <img alt="logo.png" className="logo" src={logo} />
        <div className="tabs mt-3">
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
