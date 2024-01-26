import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "components/Footer";

export default function Login() {
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://the-foodies-backend.onrender.com/api/LoginUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Invalid credentials");
    }

    if (json.success) {
      console.log(credentials, "It is a login");
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };
  const onchange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
          <Link className="navbar-brand fs-2 fst-italic" to="/">
            ThE FooDiEs
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" to="/">
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div>
        <div className="container mt-lg-5 m-md-5 mt-sm-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control w-50"
                name="email"
                value={credentials.email}
                onChange={onchange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control w-50"
                name="password"
                value={credentials.password}
                onChange={onchange}
              />
            </div>

            <button type="submit" className="m-3 btn btn-success">
              Submit
            </button>
            <Link to="/createuser" className="m-3 btn btn-danger">
              I 'm a New user
            </Link>
          </form>
        </div>
      </div>

      <div>
        <Footer></Footer>
      </div>
    </>
  );
}
