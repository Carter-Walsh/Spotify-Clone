export const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "7edf92de95194f8a8d4da091d1380be9";
const redirectUri = "https://zealous-franklin-a7776c.netlify.app/";

const scopes = [
  "user-read-currently-playing", // read access to a user's currently playing content
  "user-read-recently-played", // read access to a user's recently played tracks
  "user-read-playback-state", // read access to a user's player state
  "user-top-read", // read access to a user's top artists and trakcs
  "user-modify-playback-state", // write access to a user's playback state
];

export const getTokenFromResponse = () => {
    return window.location.hash
    .substring(1) // retrieve everything after the #
    .split("&") // split at every & to separate queries and return an array
    .reduce((accumulator, currentValue) => {
      let parts = currentValue.split("="); // separating the query now to key and value into an array
      accumulator[parts[0]] = decodeURIComponent(parts[1]);// parts[1] is the actual access token

      return accumulator;
    }, {});
}

export const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;