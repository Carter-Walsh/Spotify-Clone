import React from "react";
import { accessUrl } from "../spotify";

const Login = () => {
    return (
        <div>
            <a title="login-button" href={accessUrl}>Login to Spotify</a>
        </div>
    );
};

export default Login;