import React from "react";
import "../styles/Login.css";

export const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "7edf92de95194f8a8d4da091d1380be9";
const redirectUri = "https://spotify-clone-cw.herokuapp.com/";
const scopes = [
    "user-read-currently-playing", // read access to a user's currently playing content
    "user-read-recently-played", // read access to a user's recently played tracks
    "user-read-playback-state", // read access to a user's player state
    "user-top-read", // read access to a user's top artists and trakcs
    "user-modify-playback-state", // write access to a user's playback state
    "user-read-email",
    "user-library-read",
    "user-read-private",
    "streaming",
  ];


const authorizationUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}`

const Login = () => {
    return (
            <div className="login-container">
            <h1 className="login-header">Spotify</h1>
                <a className="login-btn" title="login-button" href={authorizationUrl}>Login With Spotify</a>
            </div>
    );
};

export default Login;