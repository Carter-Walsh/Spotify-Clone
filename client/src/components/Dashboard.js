import React, { useState, useEffect } from "react";
import Song from "./Song";
import TopArtists from "./TopArtists";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "../useAuth";
import "../styles/Dashboard.css";

const spotifyApi = new SpotifyWebApi({
    clientId: "7edf92de95194f8a8d4da091d1380be9"
});

const Dashboard = ({ code }) => {
    const accessToken = useAuth(code);

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [userFirstName, setUserFirstName] = useState("");
    const [userTopArtists, setUserTopArtists] = useState([]);

    const handleClick = (itemUri) => {
        // setSelectedSongUri(itemUri);
    }

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
        if (!accessToken) return 

        spotifyApi.getMe().then(res => {
            const displayName = res.body.display_name;
            setUserFirstName(displayName.split(" ")[0]);
        }).catch(err => {
            console.log({error: err});
        });
        // eslint-disable-next-line
    }, [accessToken]);

    useEffect(() => {
        if (!accessToken) return

        spotifyApi.getMyTopArtists({ limit: 10 }).then(res => {
            let results = res.body.items;

            setUserTopArtists(results.map(artist => {
                return {
                    id: artist.id,
                    image: artist.images[2].url,
                    name: artist.name
                }
            }));
            
        }).catch(err => {
            console.log(err);
        });
    }, [accessToken]);

    useEffect(() => {
        if (!search) return

        spotifyApi.searchTracks(search).then(res => {
            let results = res.body.tracks.items;

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
            );
        }).catch(err => {
            console.log(err);
        });

    }, [search, accessToken]);

    const songList = searchResults.map(item => {
        return <Song key={item.id} 
            itemUri={item.itemUri}
            albumImage={item.albumImage} 
            artistName={item.artistName} 
            songName={item.songName} 
            handleClick={handleClick} 
            />
    });

    const topArtists = userTopArtists.map(artist => {
        return <TopArtists key={artist.id}
                artistImage={artist.image}
                artistName={artist.name}
            />
    });


    return (
        <div className="dashboard-container">
            <div className="dashboard-header-bg">
                <h1 className="dashboard-header">Welcome, {userFirstName}!</h1>
                <h4 className="top-artists-header" >{!search ? "Your top artists are listed below!" : null}</h4>
                <input className="search-bar" placeholder="Search for Artists/Songs..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className={!search ? "top-artists-container" : "songs-container"}>
                {!search ? topArtists : songList}
            </div>

        </div>
    );
};

export default Dashboard;