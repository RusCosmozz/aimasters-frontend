// openaiService.ts
import openai from './openaiClient';

interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export const sendChatPromptToOpenAI = async (
    messages: Message[],
    temperature = 0.7
) => {
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
            temperature: temperature
        });
        console.log('OpenAI API Response:', response);
        return response;
    } catch (error) {
        console.error('Error sending chat prompt to OpenAI:', error);
        throw error;
    }
};

