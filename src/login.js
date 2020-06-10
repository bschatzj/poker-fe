import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "./axiosWithAuth";
import './Login.css'

const Login = props => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    let name = e.target.name;
    setCredentials({ ...credentials, [name]: e.target.value });
  };

  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/auth/login", credentials)
      .then(res => {
        localStorage.setItem("PokerToken", res.data.token);
        localStorage.setItem("userId", res.data.id);
        localStorage.setItem("username", res.data.username)
        console.log(res.data);
        props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="outerLogin">
      <h1 className="header">LOG IN</h1>
      <div className="loginPage">
        <form className="form" onSubmit={login}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
          />
          <div>
            <button class="login" type="submit">Log in</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;