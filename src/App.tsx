import React from "react";
import "./styles/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Register, Home, Error, Control, Reviews } from "./pages/index";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/control" element={<Control />} />
          <Route path="/reviews/:id" element={<Reviews />} />
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
