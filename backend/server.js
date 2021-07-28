const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyparser.json());

app.post("/login", (req, res) => {
    const code = req.body.code;

    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientId: "7edf92de95194f8a8d4da091d1380be9",
        clientSecret: "f52cec7942dd463ca02fa55969afbca8"
    });

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch(err => {
        console.log(err);
    });
});

app.post("/refresh", (req, res) => {
    const refreshToken = req.body.refreshToken;

    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientId: "7edf92de95194f8a8d4da091d1380be9",
        clientSecret: "f52cec7942dd463ca02fa55969afbca8",
        refreshToken: refreshToken
    });

    spotifyApi.refreshAccessToken().then(data => {
        res.json({
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in
        });
    }).catch(err => {
        console.log(err);
    });
});

app.listen(3001, () => {
    console.log("server started listening on port 3001");
});