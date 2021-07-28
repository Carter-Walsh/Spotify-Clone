import React from "react";
import "../styles/TopArtists.css";

const TopArtists = ({ artistName, artistImage }) => {
    return (
        
        <div className="individual-artist">
            <h1 className="artist-text">{artistName}</h1>
            <img src={artistImage} alt="artist pic"/>
        </div>
    )
};

export default TopArtists;