import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "./axiosWithAuth";
import './Login.css'

const Register = props => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        email: ""
    });
    const [error, setError] = useState("")
    const [confirm, setConfirm] = useState("")
    const handleChange = e => {
        let name = e.target.name;
        setCredentials({ ...credentials, [name]: e.target.value });
    };

    const handleConfirm = e => {
        setConfirm(e.target.value)
        console.log(confirm)
    }

    const register = e => {
        e.preventDefault();
        if (!credentials.username || !credentials.password || !credentials.email || !confirm){
            setError('Missing a required feild!')
        }
        else if (credentials.password.length < 8){
            setError("Password must be at least eight characters")
        }
        else if (credentials.password !== confirm) {
            setError("Passwords do not match!")
        }
        else{
            axiosWithAuth()
            .post("/auth/register", credentials)
            .then(res => {
                localStorage.setItem("PokerToken", res.data.token);
                console.log(res.data);
                props.history.push("/loading");
            })
            .catch(err => setError(err));
        }
    };

    return (
        <div className="outerLogin">
            <h1 className="header">REGISTER</h1>
            <h1 className="error"> {error}</h1>
            <div className="loginPage">
                <form className="form" onSubmit={register}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={credentials.username}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
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
                        value={confirm}
                        onChange={handleConfirm}
                    />
                    <div>
                        <button class="login" type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;