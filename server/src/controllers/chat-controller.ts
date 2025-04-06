import { type Request, type Response } from 'express';
import { ChatOpenAI } from '@langchain/openai'; 
import { PromptTemplate } from '@langchain/core/prompts';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

// Initialize ChatOpenAI model
let model: ChatOpenAI | null = null;

if (apiKey) {
  model = new ChatOpenAI({
    temperature: 0.7,
    openAIApiKey: apiKey,
    modelName: 'gpt-3.5-turbo',
  });
} else {
  console.error('OPENAI_API_KEY is not configured.');
}

// Prompt template (no car variables now)
const promptTemplate = new PromptTemplate({
  template: `
You are a helpful and knowledgeable car owner. 
You should only answer questions related to a used car listed for sale.
If the question is unrelated to cars, reply: "I'm only here to answer questions about the car for sale."

Question: {question}
Answer:`,
  inputVariables: ["question"]
});

// Format the prompt using just the question
const formatPrompt = async (question: string): Promise<string> => {
  return await promptTemplate.format({ question });
};

// Function to get OpenAI response
const promptFunc = async (input: string): Promise<string> => {
  if (!model) {
    console.error('Model is not initialized.');
    return 'No OpenAI model available to process the request.';
  }

  try {
    const response = await model.invoke(input);
    if (typeof response === 'string') {
      return response;
    } else if (response && response.text) {
      return response.text;
    }
    return 'No valid response from AI.';
  } catch (err) {
    console.error('Error invoking OpenAI model:', err);
    return 'Something went wrong while communicating with the AI.';
  }
};

// Main handler
export const askQuestion = async (req: Request, res: Response): Promise<void> => {
  const { question } = req.body;

  if (!question) {
    res.status(400).json({ response: 'Please provide a question.' });
    return;
  }

  try {
    const formattedPrompt = await formatPrompt(question);
    const result = await promptFunc(formattedPrompt);

    res.json({ question, prompt: formattedPrompt, response: result });
  } catch (error) {
    console.error('Error handling askQuestion request:', error);
    res.status(500).json({ response: 'Internal Server Error' });
  }
};
