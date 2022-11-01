import { Outlet, Navigate } from "react-router-dom";
import { getCookie } from "./global";

export const PrivateRoutes = () => {
  const islogged = getCookie("token");
  return islogged ? <Outlet />: <Navigate to="/" />;
};

export const PublicRoutes = () => {
  const islogged = getCookie("token");
  return !islogged ? <Outlet /> : <Navigate to="/users" />; 
};
