import React, { useEffect, useState } from "react";
import Login from './Login';
import Dashboard from './Dashboard';
import { getTokenFromResponse } from '../spotify';
import SpotifyWebApi from "spotify-web-api-js";
import '../App.css';

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
            { token ? <Dashboard token={token}/> : <Login /> }
        </div>
    );
}

export default App;