import React from "react";
import { accessUrl } from "../spotify";

const Login = () => {
    return (
        <div>
            <a href={accessUrl}>Login to Spotify</a>
        </div>
    );
};

export default Login;