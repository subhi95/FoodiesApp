import "./App.css";
import Home from "./screens/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Signup from "./screens/Signup.js";
import { CartProvider } from "./components/ContextReducer";
import MyOrder from "screens/MyOrder";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div>
          <Routes>
            <Route exact path="/" element={<Home></Home>}></Route>
            <Route exact path="/login" element={<Login></Login>}></Route>
            <Route exact path="/createuser" element={<Signup></Signup>}></Route>
            <Route exact path="/myorder" element={<MyOrder></MyOrder>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
