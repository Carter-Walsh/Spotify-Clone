import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

const Player = ({ token, selectedSongUri }) => {
    const [play, setPlay] = useState(false);

    useEffect(() => {
        setPlay(true)
    }, [selectedSongUri]);

    return (
        <div>
            <SpotifyPlayer 
                token={token}
                showSaveIcon
                callback={state => {
                    if (!state.isPlaying) setPlay(false);
                }}
                play={play}
                uris={selectedSongUri ? [selectedSongUri] : null}
            />
        </div>
    )
};

export default Player;