import React, {useEffect, useState} from 'react';
import {useUser} from "./UserContext";
import {useNavigate} from 'react-router-dom';


interface Lobby {
    id: number;
    name: string;
    hostId: string;
    // Add other properties as needed
}

const LobbyList: React.FC = () => {
    const {user} = useUser();
    const navigate = useNavigate();
    const [lobbies, setLobbies] = useState<Lobby[]>([]);
    const [showInput, setShowInput] = useState(false);
    const [sessionName, setSessionName] = useState('');


    useEffect(() => {
        // Fetch open lobbies from the API
        const fetchLobbies = async () => {
            try {
                const response = await fetch('http://localhost:8086/api/game-sessions'); // Replace with your backend API endpoint
                const data: Lobby[] = await response.json();
                setLobbies(data);
            } catch (error) {
                console.error('Error fetching lobbies:', error);
            }
        };

        fetchLobbies();
    }, []);
    const handleCreateLobby = () => {
        setShowInput(true);
    };

    const handleSessionNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSessionName(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Call the API to create a new gaming session
        try {
            const response = await fetch(`http://localhost:8086/api/users/${user.id}/game-sessions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: sessionName}),
            });

            if (!response.ok) {
                throw new Error('Failed to create a new gaming session');
            }

            // Refresh the lobbies list
            const newLobby: Lobby = await response.json();
            setLobbies([...lobbies, newLobby]);
            setShowInput(false);
            setSessionName('');

            // Navigate to the specific session page
            navigate(`/lobbies/${newLobby.id}`);
        } catch (error) {
            console.error('Error creating a new gaming session:', error);
        }
    };

    const handleLobbyClick = (lobbyId: number) => {
        navigate(`/lobbies/${lobbyId}`);
    };

    return (
        <div>
            <h1>Open Lobbies</h1>
            <ul>
                {lobbies.map((lobby) => (
                    <li key={lobby.id} onClick={() => handleLobbyClick(lobby.id)}>
                        {lobby.name}
                    </li>
                ))}
            </ul>
            <button onClick={handleCreateLobby}>Create New Gaming Session</button>
            {showInput && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Session Name"
                        value={sessionName}
                        onChange={handleSessionNameChange}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
};

export default LobbyList;