'use node';

import 'dotenv/config';
import { action } from './_generated/server';
import { v } from 'convex/values';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { HarmBlockThreshold, HarmCategory } from '@google/generative-ai';


const geminiAI = new GoogleGenerativeAI(`${ process.env.GEMINI_API_KEY }`);

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

const generationConfig = {
  stopSequences: ["red"],
  maxOutputTokens: 400,
  temperature: 0.9,
  topP: 0.1,
  topK: 16,
};

const model = geminiAI.getGenerativeModel({ model: 'gemini-pro', safetySettings, generationConfig });

export const generateContent = action({
  args: { prompt: v.string() },
  handler: async (ctx, args) => {
    const result = await model.generateContent(args.prompt);
    const response = result.response;

    return response.text();
  }

});


export const generativeAIChat = action({
  args: { chat: v.string() },
  handler: async (ctx, args) => {
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: "Hello,",
        },
        {
          role: "model",
          parts: "Great to meet you. What would you like to know?",
        },
      ],
      generationConfig: {
        maxOutputTokens: 100,
      },
    });


    const result = await chat.sendMessage(args.chat);
    const response =  result.response;
    
    return response.text();
  }
});


export const  generateEmbedding = action({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const embeddingModel = geminiAI.getGenerativeModel({ model: "embedding-001"});

    const result = await embeddingModel.embedContent(args.text);
    const embedding = result.embedding;

  
    return embedding.values;
  }
});

