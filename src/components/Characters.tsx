// Characters.tsx
import React, {useEffect, useState} from 'react';

interface Character {
    id: number;
    name: string;
    race: string;
    raceOverview: string;
    className: string;
    classOverview: string;
    backstory: string;
}

interface GeneratedChar {
    name: string;
    race: string;
    raceOverview: string;
    class: string;
    classOverview: string;
    backstory: string;
}

interface CharactersProps {
    worldId: string | undefined;
    onGenerateCharClicked: () => void;
    isCharGenerated: boolean;
    charGenerated: GeneratedChar;
}

const Characters: React.FC<CharactersProps> = ({worldId, onGenerateCharClicked, isCharGenerated, charGenerated}) => {
    const [characters, setCharacters] = useState<Character[]>([]);

    const saveCharToDatabase = async (
        worldId: string | undefined,
        char: GeneratedChar
    ) => {
        try {
            if (!worldId) {
                throw new Error('Cannot save a world without a game ID');
            }
            console.log(worldId)
            console.log(JSON.stringify(char))
            const response = await fetch(`http://localhost:8086/api/worlds/${worldId}/characters`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(char),
            });

            if (!response.ok) {
                throw new Error('Failed to save char to database');
            }
            const savedChar = await response.json() as Character;
            setCharacters([savedChar])
        } catch (error) {
            console.error('Error saving char to database:', error);
        }
    };


    useEffect(() => {
        const fetchCharacters = async (worldId: string | undefined) => {
            if (!worldId) return;

            try {
                const response = await fetch(`http://localhost:8086/api/worlds/${worldId}/characters`);

                if (!response.ok) {
                    throw new Error('Failed to fetch characters');
                }

                const charactersData = await response.json();
                setCharacters(charactersData);
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };

        fetchCharacters(worldId);
    }, [worldId]);

    useEffect(() => {
        if (isCharGenerated) {
            saveCharToDatabase(worldId, charGenerated);
        }
    }, [worldId, isCharGenerated, charGenerated]);


    return (
        <div>
            {worldId ? (
                <div><h2>Characters</h2>
                    {characters.length === 0 ? (
                        <div>
                            <p>No game characters in this world yet.</p>
                            <button onClick={onGenerateCharClicked}>Create New Character</button>
                        </div>
                    ) : (
                        <ul>
                            {characters.map((character) => (
                                <li key={character.id}>
                                    <p>Name: {character.name}</p>
                                    <p>Race: {character.race}</p>
                                    <p>Race Description: {character.raceOverview}</p>
                                    <p>Class: {character.className}</p>
                                    <p>Class Description: {character.classOverview}</p>
                                    <p>Background: {character.backstory}</p>
                                </li>
                            ))}
                        </ul>
                    )}</div>
            ) : (<div></div>)}
        </div>
    );
};

export default Characters;
