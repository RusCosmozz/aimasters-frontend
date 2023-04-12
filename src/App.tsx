import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Global} from '@emotion/react';
import React from 'react';
import {globalStyles} from './styles/globalStyles';

import Login from './components/Login';
import Registration from './components/Registration';
import Home from "./components/Home";
import LobbyList from "./components/LobbyList";
import {UserProvider} from "./components/UserContext";
import Lobby from "./components/Lobby";

function App() {
    return (
        <UserProvider>
            <Router>
                <Global styles={globalStyles}/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Registration/>}/>
                    <Route path="/lobbies" element={<LobbyList/>}/>
                    <Route path="/lobbies/:lobbyId" element={<Lobby />} />                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
