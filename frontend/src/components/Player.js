import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

const Player = ({ accessToken, selectedSongUri }) => {
    const [play, setPlay] = useState(false);

    useEffect(() => {
        setPlay(true)
    }, [selectedSongUri]);


    if (!accessToken) return null;
    return (
        <div>
            <SpotifyPlayer 
                token={accessToken}
                uris={selectedSongUri ? [selectedSongUri] : null}
                showSaveIcon
                callback={state => {
                    if (!state.isPlaying) setPlay(false);
                }}
                play={play}
            />
        </div>
    )
};

export default Player;