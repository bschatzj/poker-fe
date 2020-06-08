import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "./axiosWithAuth";
import './Login.css'

const Register = props => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        confirm: "",
        email: ""
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
                console.log(res.data);
                props.history.push("/loading");
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="outerLogin">
            <h1 className="header">REGISTER</h1>
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
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={credentials.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="confirm"
                        placeholder="Confirm Password"
                        value={credentials.confirm}
                        onChange={handleChange}
                    />
                    <div>
                        <button class="register" type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;