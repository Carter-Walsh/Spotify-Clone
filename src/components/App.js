import '../App.css';
import Login from './Login';
import { getTokenFromResponse } from '../spotify';

function App() {
    const hash = getTokenFromResponse();
    window.location.hash = "";
    let token = hash.access_token;


    return (
        <div className="App">
        <Login />
        </div>
    );
}

export default App;
