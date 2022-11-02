import React from "react";
import "./styles/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Register, Home, Error } from "./pages/index";
import Navbar from "./components/navbar/Navbar";
import { PrivateRoutes } from "./utils/RouteGuard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <>
              <Navbar />
              <PrivateRoutes />
            </>
          }
        >
          <Route index element={<Home />} />
        </Route>
        <Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route>
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
