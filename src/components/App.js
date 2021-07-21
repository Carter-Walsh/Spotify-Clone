import '../App.css';
import React, { useEffect, useState } from "react";
import Login from './Login';
import { getTokenFromResponse } from '../spotify';
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

const App = () => {

    const [token, setToken] = useState(null);

    useEffect(() => {

        const hash = getTokenFromResponse();
        window.location.hash = "";
        let _token = hash.access_token;
        setToken(_token);
        spotifyApi.setAccessToken(_token);

    }, []);

    return (
        <div className="App">
            {token ? <h1>I am logged in</h1> : <Login />}
        </div>
    );
}

export default App;