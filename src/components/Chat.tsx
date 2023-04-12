import React, {useEffect, useState} from 'react';
import {sendChatPromptToOpenAI} from './ai/OpenaiService';
import gameInitPrompt from '../resources/gameInitPrompt.txt';
import createWorldPrompt from '../resources/createWorldPrompt.txt';
import createCharacterPrompt from '../resources/createCharacterPrompt.txt';


interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

interface GeneratedChar {
    name: string;
    race: string;
    raceOverview: string;
    class: string;
    classOverview: string;
    backstory: string;
}

interface ChatProps {
    lobbyId: string | undefined;
    onReadyForWorldGeneration: () => void;
    onWorldGenerationRequest: boolean;
    onCharGenerationRequest: boolean;
    onWorldGenerated: (worldName: string, worldDescription: string) => void;
    onCharGenerated: (char: GeneratedChar) => void;
}

const Chat: React.FC<ChatProps> = ({
                                       lobbyId,
                                       onReadyForWorldGeneration,
                                       onWorldGenerationRequest,
                                       onWorldGenerated,
                                       onCharGenerationRequest,
                                       onCharGenerated
                                   }) => {

    const initialMessage: Message = {
        role: 'system',
        content: JSON.stringify({'action': 'gameSessionInitRequest', 'message': gameInitPrompt})
    };

    const [messages, setMessages] = useState<Message[]>([initialMessage]);

    const addMessage = (newMessage: Message) => {
        setMessages(prevMessages => [...prevMessages, newMessage]);

    };

    const requestWorldGeneration = async () => {
        const createWorldMsg: Message = {
            role: 'user',
            content: JSON.stringify({'action': 'worldCreationRequest', 'message': createWorldPrompt}),
        };
        addMessage(createWorldMsg);
        const updatedMessages = [...messages, createWorldMsg];
        try {
            const response = await sendChatPromptToOpenAI(updatedMessages, 0.7);
            const assistantMessage: Message = {
                role: 'assistant',
                content: response.data.choices[0].message.content,
            };
            const parsedContent = JSON.parse(assistantMessage.content);
            if (parsedContent.action === "worldCreationResponse") {
                const generatedWorld = JSON.parse(parsedContent.message);
                console.log(generatedWorld);
                const worldName = generatedWorld.worldName;
                const worldDescription = generatedWorld.description;
                onWorldGenerated(worldName, worldDescription);
            }
            addMessage(assistantMessage);
        } catch (error) {
            console.error('Error getting response from OpenAI:', error);
        }
    };

    const requestCharGeneration = async () => {
        const createWorldMsg: Message = {
            role: 'user',
            content: JSON.stringify({'action': 'characterCreationRequest', 'message': createCharacterPrompt}),
        };
        addMessage(createWorldMsg);
        const updatedMessages = [...messages, createWorldMsg];
        try {
            const response = await sendChatPromptToOpenAI(updatedMessages, 0.7);
            const assistantMessage: Message = {
                role: 'assistant',
                content: response.data.choices[0].message.content,
            };
            const parsedContent = JSON.parse(assistantMessage.content);
            if (parsedContent.action === "characterCreationResponse") {
                const generatedChar = JSON.parse(parsedContent.message) as GeneratedChar;
                console.log(generatedChar);
                onCharGenerated(generatedChar);
            }
            addMessage(assistantMessage);
        } catch (error) {
            console.error('Error getting response from OpenAI:', error);
        }
    };

    const initializeConversation = async () => {
        try {
            const response = await sendChatPromptToOpenAI(messages, 0.4);
            const assistantMessage: Message = {
                role: 'assistant',
                content: response.data.choices[0].message.content,
            };

            if (response.data.choices[0].message.content.includes("gameSessionInitResponse")) {
                onReadyForWorldGeneration();
            }
            addMessage(assistantMessage);
        } catch (error) {
            console.error('Error getting response from OpenAI:', error);
        }
    };

    useEffect(() => {
        initializeConversation();
    }, [lobbyId]);

    useEffect(() => {
        if (onWorldGenerationRequest) {
            requestWorldGeneration();
        }
    }, [onWorldGenerationRequest]);

    useEffect(() => {
        if (onCharGenerationRequest) {
            requestCharGeneration();
        }
    }, [onCharGenerationRequest]);

    return (
        <ul>
            {messages.map((message, index) => (
                <li key={index}>
                    <strong>
                        {message.role.charAt(0).toUpperCase() + message.role.slice(1)}:
                    </strong>{" "}
                    {message.content}
                </li>
            ))}
        </ul>
    );
};

export default Chat;
