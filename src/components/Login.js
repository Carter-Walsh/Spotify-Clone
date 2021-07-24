import React from "react";
import "../styles/Login.css";
import { accessUrl } from "../spotify";

const Login = () => {
    return (
            <div className="login-container">
                <h1 className="login-header">Spotify</h1>
                <a className="login-btn" title="login-button" href={accessUrl}>Login to Spotify</a>
            </div>
    );
};

export default Login;