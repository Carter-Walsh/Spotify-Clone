import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";

const Player = ({ token, selectedSongUri }) => {
    return (
        <div>
            <SpotifyPlayer 
                token={token}
                uris={selectedSongUri ? [selectedSongUri] : []}
            />
        </div>
    )
};

export default Player;