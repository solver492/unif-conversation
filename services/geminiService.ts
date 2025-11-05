// FIX: Refactored to align with @google/genai coding guidelines.
// Removed manual API key checks and used process.env.API_KEY directly.
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getGeminiResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching Gemini response:", error);
    return "Sorry, I encountered an error while processing your request. Please try again.";
  }
};
