// FIX: Refactored to align with @google/genai coding guidelines.
// Removed manual API key checks and used process.env.API_KEY directly.
import { GoogleGenAI } from "@google/genai";
import type { Message } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

interface GeminiRequestOptions {
  userMessage: string;
  conversationHistory?: Message[];
  systemPrompt?: string;
}

/**
 * Get a response from Gemini with conversation context and custom system prompt
 */
export const getGeminiResponse = async (options: GeminiRequestOptions): Promise<string> => {
  const { userMessage, conversationHistory = [], systemPrompt } = options;
  
  try {
    // Build the conversation context
    let fullPrompt = '';
    
    // Add system prompt if provided
    if (systemPrompt) {
      fullPrompt += `System Instructions: ${systemPrompt}\n\n`;
    }
    
    // Add conversation history (last 10 messages for context)
    if (conversationHistory.length > 0) {
      fullPrompt += "Conversation History:\n";
      const recentMessages = conversationHistory.slice(-10);
      recentMessages.forEach(msg => {
        const role = msg.sender_type === 'client' ? 'User' : 'Assistant';
        fullPrompt += `${role}: ${msg.content}\n`;
      });
      fullPrompt += "\n";
    }
    
    // Add current user message
    fullPrompt += `User: ${userMessage}\n\nAssistant:`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });
    
    return response.text;
  } catch (error: any) {
    console.error("Error fetching Gemini response:", error);
    
    // Return more specific error messages
    if (error?.message?.includes('API key')) {
      throw new Error("Invalid API key. Please check your Gemini API key configuration.");
    } else if (error?.message?.includes('quota')) {
      throw new Error("API quota exceeded. Please try again later.");
    } else if (error?.message?.includes('network') || error?.message?.includes('fetch')) {
      throw new Error("Network error. Please check your internet connection.");
    } else {
      throw new Error("Failed to get AI response. Please try again.");
    }
  }
};
