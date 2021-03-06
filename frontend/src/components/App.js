import React from "react";
import Login from './Login';
import Dashboard from './Dashboard';
import '../styles/App.css';

// this will get the code from the url
const code = new URLSearchParams(window.location.search).get("code");

const App = () => {
    return code ? <Dashboard code={code} /> : <Login />
}

export default App;