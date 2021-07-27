import React, { useEffect, useState } from "react";
import Song from "./Song";
import Player from "./Player";
import TopArtists from "./TopArtists";
import SpotifyWebApi from "spotify-web-api-js";
import "../styles/Dashboard.css";

const Dashboard = ({ token }) => {
    
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token);

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedSongUri, setSelectedSongUri] = useState();
    const [userFirstName, setUserFirstName] = useState("");
    const [userTopArtists, setUserTopArtists] = useState([]);

    function handleClick(itemUri) {
        setSelectedSongUri(itemUri);
    }

    useEffect(() => {
        spotifyApi.getMe().then(res => {
            let displayName = res.display_name;
            console.log(res);
            setUserFirstName(displayName.split(" ")[0]);
        }).catch(err => {
            console.log({error: err});
        });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        spotifyApi.getMyTopArtists({limit: 10}).then(res => {
            let results = res.items;

            setUserTopArtists(results.map(artist => {
                return {
                    id: artist.id,
                    image: artist.images[2].url,
                    name: artist.name
                }
            }));
        });
        // eslint-disable-next-line
    }, []);

    const spotifyRequest = (event) => {
        setSearch(event.target.value);
        
        if (!search) return;
        
        spotifyApi.searchTracks(search).then(res => {
            let results = res.tracks.items;
            
            setSearchResults(
                results.map(item => {
                    return {
                        id: item.id,
                        itemUri: item.uri,
                        songName: item.name,
                        albumImage: item.album.images[2].url,
                        artistName: item.artists[0].name
                    }
                })
            )
        });
    }

    const topArtists = userTopArtists.map(artist => {
        return <TopArtists key={artist.id}
                artistImage={artist.image}
                artistName={artist.name}
            />
    });

    const songList = searchResults.map(item => {
        return <Song key={item.id} 
            itemUri={item.itemUri}
            albumImage={item.albumImage} 
            artistName={item.artistName} 
            songName={item.songName} 
            handleClick={handleClick} 
            />
    });

    return (
            <div className="dashboard-container">
                <div className="dashboard-header-bg">
                    <h1 className="dashboard-header" title="header">Welcome, {userFirstName}!</h1>
                    <h4 className="top-artists-header" >{!search ? "Your top artists are listed below!" : null}</h4>
                    <input className="search-bar" placeholder="Search for Artists/Songs..." value={search} onChange={spotifyRequest}/>
                </div>
                <div className={!search ? "top-artists-container" : "songs-container"}>
                    {!search ? topArtists : songList}
                </div>
                <Player title="player" token={token} selectedSongUri={selectedSongUri}/>
            </div>
    );
}

export default Dashboard;