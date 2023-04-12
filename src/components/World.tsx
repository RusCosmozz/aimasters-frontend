// World.tsx
import React, {useEffect, useState} from 'react';
import {sendChatPromptToOpenAI} from './ai/OpenaiService';

interface WorldProps {
    lobbyId: string | undefined;
    onReadyToGenerateWorld: boolean;
    onGenerateWorldClick: () => void;
    worldName: string | null;
    worldDescription: string | null;
    worldGenerated: boolean;
    onWorldCreated:(worldId: string)=> void;
}
interface WorldDto{
    id: string,
    worldName: string,
    description: string
}
const World: React.FC<WorldProps> = ({
                                         lobbyId,
                                         onGenerateWorldClick,
                                         onReadyToGenerateWorld,
                                         worldName,
                                         worldDescription,
                                         worldGenerated,
                                         onWorldCreated
                                     }) => {


    const saveWorldToDatabase = async (
        gameId: string | undefined,
        worldName: string,
        worldDescription: string
    ) => {
        try {
            if (!gameId) {
                throw new Error('Cannot save a world without a game ID');
            }

            const response = await fetch(`http://localhost:8086/api/game-sessions/${gameId}/worlds`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "worldName": worldName,
                    "description": worldDescription,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save world to database');
            }
            const world = await response.json() as WorldDto;
            onWorldCreated(world.id)
        } catch (error) {
            console.error('Error saving world to database:', error);
        }
    };

    useEffect(() => {
        if (worldGenerated) {
            saveWorldToDatabase(lobbyId, worldName, worldDescription);
        }
    }, [lobbyId, worldName, worldDescription, worldGenerated]);


    return (
        <div>
            {worldDescription ? (
                <div>
                    <p><strong>{worldName}</strong></p>
                    <p>{worldDescription}</p>
                </div>
            ) : (
                <div>
                    <p>No world description available yet. A world will be created soon.</p>
                    {(
                        <button onClick={onGenerateWorldClick} disabled={!onReadyToGenerateWorld}>
                            Generate World
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default World;
