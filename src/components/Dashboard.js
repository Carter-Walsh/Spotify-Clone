import React, { useState } from "react";
import Song from "./Song";
import Player from "./Player";
import SpotifyWebApi from "spotify-web-api-js";
import "../styles/Dashboard.css";

const Dashboard = ({ token }) => {
    
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token);

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedSongUri, setSelectedSongUri] = useState();

    function handleClick(itemUri) {
        setSelectedSongUri(itemUri);
    }

    function spotifyRequest(event) {
        setSearch(event.target.value);
        
        if (!search) return;
        
        spotifyApi.searchTracks(search).then(res => {
            let results = res.tracks.items;
            
            setSearchResults(
                results.map(item => {
                    // console.log(item.uri);
                    return {
                        id: item.id,
                        itemUri: item.uri,
                        albumName: item.album.name,
                        albumImage: item.album.images[2].url,
                        artistName: item.artists[0].name
                    }
                })
            )
        });
    }

    return (
            <div className="dashboard-container">
                <div className="dashboard-header-bg">
                    <h1 className="dashboard-header" title="header">Spotify Dashboard</h1>
                <input className="search-bar" placeholder="Search for Artists/Songs..." value={search} onChange={spotifyRequest}/>
                </div>
                <div className="songs-container">
                    {
                        searchResults.map(item => {
                            return <Song key={item.id} 
                            itemUri={item.itemUri}
                            albumImage={item.albumImage} 
                            artistName={item.artistName} 
                            albumName={item.albumName} 
                            handleClick={handleClick} 
                        />
                        })
                    }
                </div>
                <Player title="player" token={token} selectedSongUri={selectedSongUri}/>
            </div>
    )
};

export default Dashboard;