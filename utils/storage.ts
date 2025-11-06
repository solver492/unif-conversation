import type { Chatbot, Conversation, Message } from '../types';

const STORAGE_KEYS = {
  CHATBOTS: 'unif_chatbots',
  CONVERSATIONS: 'unif_conversations',
  MESSAGES: 'unif_messages',
};

/**
 * Storage utility for persisting application data in localStorage
 */
export const storage = {
  // Chatbots
  getChatbots(): Chatbot[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CHATBOTS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading chatbots from storage:', error);
      return null;
    }
  },

  saveChatbots(chatbots: Chatbot[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CHATBOTS, JSON.stringify(chatbots));
    } catch (error) {
      console.error('Error saving chatbots to storage:', error);
    }
  },

  // Conversations
  getConversations(): Conversation[] | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading conversations from storage:', error);
      return null;
    }
  },

  saveConversations(conversations: Conversation[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations));
    } catch (error) {
      console.error('Error saving conversations to storage:', error);
    }
  },

  // Messages
  getMessages(): { [key: string]: Message[] } | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading messages from storage:', error);
      return null;
    }
  },

  saveMessages(messages: { [key: string]: Message[] }): void {
    try {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    } catch (error) {
      console.error('Error saving messages to storage:', error);
    }
  },

  // Clear all data
  clearAll(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.CHATBOTS);
      localStorage.removeItem(STORAGE_KEYS.CONVERSATIONS);
      localStorage.removeItem(STORAGE_KEYS.MESSAGES);
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};
