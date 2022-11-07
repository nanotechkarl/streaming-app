import React from "react";
import "./styles/App.scss";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import {
  Login,
  Register,
  Home,
  Error,
  Control,
  Reviews,
  Actor,
} from "./pages/index";
import Navbar from "./components/navbar/Navbar";
import { useAppSelector } from "./hooks/useTypedSelector";
import { getCookie } from "./utils/global";

function App() {
  const { current }: { [key: string]: any } = useAppSelector(
    (state) => state.user
  );

  const adminRoute = () => {
    const role = current?.permissions || [];

    return role.includes("admin") ? (
      <>
        <Navbar />
      </>
    ) : (
      <Navigate to="/page-not-found" />
    );
  };

  const loginRoute = () => {
    const token = getCookie("token");
    return token ? <Navigate to="/" /> : <Outlet />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/reviews/:id" element={<Reviews />} />
          <Route path="/actors/:id" element={<Actor />} />
        </Route>
        <Route element={loginRoute()}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route element={adminRoute()}>
          <Route path="/control" element={<Control />} />
        </Route>
        <Route>
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
