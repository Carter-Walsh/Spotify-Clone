import React from "react";

const Song = ({ albumImage, artistName, albumName, itemUri, handleClick }) => {
    
    return (
        <div onClick={() => handleClick(itemUri)}>
            <div>
                <img src={albumImage} alt="Album Cover" />
            </div>
            <p>{artistName}</p>
            <p>{albumName}</p>
        </div>
    );
};

export default Song;