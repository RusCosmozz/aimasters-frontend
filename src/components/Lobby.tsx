import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import World from "./World";
import Chat from "./Chat";
import Characters from "./Characters";

interface LobbyRouteParams {
    lobbyId: string;
}

interface GeneratedChar {
    name: string;
    race: string;
    raceOverview: string;
    class: string;
    classOverview: string;
    backstory: string;
}

const Lobby: React.FC = () => {
    const {lobbyId} = useParams<LobbyRouteParams>();

    const [requestWorldGeneration, setRequestWorldGeneration] = useState(false);
    const [requestCharacterGeneration, setRequestCharacterGeneration] = useState(false);

    const [worldName, setWorldName] = useState<string | null>(null);
    const [worldDescription, setWorldDescription] = useState<string | null>(null);
    const [worldId, setWorldId] = useState<string | null>(null);
    const [character, setCharacter] = useState<GeneratedChar | null>(null);
    const [characterGenerated, setCharacterGenerated] = useState(false);

    const [readyToGenerateWorld, setReadyToGenerateWorld] = useState(false);
    const [worldGenerated, setWorldGenerated] = useState(false);

    useEffect(() => {
        const fetchWorldData = async (gameId: string | undefined) => {
            try {
                const response = await fetch(`http://localhost:8086/api/game-sessions/${gameId}/worlds`);
                if (!response.ok) {
                    throw new Error('Failed to fetch world data');
                }

                const worldData = await response.json();
                setWorldId(worldData.id)
                setWorldName(worldData.worldName);
                setWorldDescription(worldData.description);
            } catch (error) {
                console.error('Error fetching world data:', error);
            }
        };

        if (lobbyId) {
            fetchWorldData(lobbyId);
        }
    }, [lobbyId]);

    return (
        <div>
            <div>
                <h1>Lobby</h1>
                <World
                    lobbyId={lobbyId}
                    onGenerateWorldClick={() => {
                        setRequestWorldGeneration(true)
                    }}
                    onReadyToGenerateWorld={readyToGenerateWorld}
                    worldName={worldName}
                    worldDescription={worldDescription}
                    worldGenerated={worldGenerated}
                    onWorldCreated={(worldId) =>
                        setWorldId(worldId)
                    }
                />
                <Characters
                    worldId={worldId}
                    isCharGenerated = {characterGenerated}
                    charGenerated={character}
                    onGenerateCharClicked={() => {
                        setRequestCharacterGeneration(true)
                    }}
                />
            </div>
            <div>
                <h1>Chat History</h1>
                <Chat
                    lobbyId={lobbyId}
                    onReadyForWorldGeneration={() => {
                        setReadyToGenerateWorld(true);
                    }}
                    onWorldGenerationRequest={requestWorldGeneration}
                    onWorldGenerated={(worldName, worldDescription) => {
                        setWorldName(worldName);
                        setWorldDescription(worldDescription);
                        setWorldGenerated(true);
                    }}
                    onCharGenerationRequest={requestCharacterGeneration}
                    onCharGenerated={(character) => {
                        setCharacter(character)
                        setCharacterGenerated(true);
                    }}/>
            </div>
        </div>
    );
};

export default Lobby;