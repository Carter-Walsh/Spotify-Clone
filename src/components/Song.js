import React from "react";
import "../styles/Songs.css";

const Song = ({ albumImage, artistName, albumName, itemUri, handleClick }) => {
    
    return (
        <div className="individual-song" onClick={() => handleClick(itemUri)}>
                <img src={albumImage} alt="Album Cover" />
            <div className="song-artist-text">
                <p>{artistName}</p>
                <p>{albumName}</p>
            </div>
        </div>
    );
};

export default Song;