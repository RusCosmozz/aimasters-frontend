// openaiClient.ts
import { Configuration, OpenAIApi } from "openai";

const apiKey = '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';
const configuration = new Configuration({
    apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);

export default openai;
