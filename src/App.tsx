import React from "react";
import "./styles/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Register, Home, Error } from "./pages/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index element={<Home />} />
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
