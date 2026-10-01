
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are the official AI Assistant for the "Franc Congolais (CDF)" token project.
Your role is to answer investor and user questions based STRICTLY on the following whitepaper data:

Project Name: Franc Congolais (CDF)
Network: Binance Smart Chain (BEP-20)
Total Supply: 1,000,000,000 CDF
Token Address: 0x18e173fdeb700568a08d1d7049309ae322d27777
Price Objective: 1 CDF >= 0.1 USDT (Major Goal)
Official Website: https://franccongolais.github.io/fc.github.io/
Fees: 2-5% transaction fee (40% Liquidity, 30% Dev, 20% Community, 10% Burn).
Motto: Justice – Paix – Travail.
Vision: To become the premier national cryptocurrency of DR Congo, promoting financial inclusion.

Roadmap Status:
- Phase 1: Tech Deployment (COMPLETED)
- Phase 2: Listing & Liquidity (IN PROGRESS)
- Phase 3: Airdrops & Marketing (Planned)
- Phase 4: CDF Wallet App (Planned)

Tone: Professional, patriotic, encouraging, and technically accurate.
Language: Respond in the language the user asks in (mostly French or English).
`;

export const chatWithGemini = async (userMessage: string, history: any[] = []) => {
  if (!process.env.API_KEY) {
    return "API Key is missing. Please configure it in your environment.";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Désolé, je rencontre des difficultés techniques. Veuillez réessayer plus tard.";
  }
};

export const sendMessageStream = async (userMessage: string, history: any[] = []) => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  return await ai.models.generateContentStream({
    model: "gemini-3-flash-preview",
    contents: [
      ...history.map(h => ({ role: h.role, parts: h.parts })),
      { role: 'user', parts: [{ text: userMessage }] }
    ],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    }
  });
};

export const analyzeImage = async (base64Image: string, prompt: string) => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  const base64Data = base64Image.includes(',') ? base64Image.split(',')[1] : base64Image;
  const mimeType = base64Image.includes(';') ? base64Image.split(';')[0].split(':')[1] : 'image/png';

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        { inlineData: { mimeType, data: base64Data } },
        { text: prompt || "Analyze this image." }
      ]
    }
  });

  return response.text;
};

export const generateImage = async (prompt: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: { parts: [{ text: prompt }] }
  });

  if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
  }

  throw new Error("No image generated.");
};
