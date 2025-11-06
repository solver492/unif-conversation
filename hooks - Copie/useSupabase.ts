import { useState, useEffect } from 'react';
import { 
    chatbotService, 
    conversationService, 
    messageService,
    realtimeService 
} from '../services/supabaseService';
import type { Chatbot, Conversation, Message } from '../types';

// ============================================
// HOOK: useChatbots
// ============================================

export function useChatbots() {
    const [chatbots, setChatbots] = useState<Chatbot[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadChatbots();
    }, []);

    const loadChatbots = async () => {
        try {
            setLoading(true);
            const data = await chatbotService.getAll();
            setChatbots(data);
            setError(null);
        } catch (err: any) {
            setError(err.message);
            console.error('Error loading chatbots:', err);
        } finally {
            setLoading(false);
        }
    };

    const createChatbot = async (chatbot: Omit<Chatbot, 'id' | 'created_at' | 'updated_at'>) => {
        try {
            const newBot = await chatbotService.create(chatbot);
            setChatbots(prev => [newBot, ...prev]);
            return newBot;
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    };

    const updateChatbot = async (id: string, updates: Partial<Chatbot>) => {
        try {
            const updated = await chatbotService.update(id, updates);
            setChatbots(prev => prev.map(bot => bot.id === id ? updated : bot));
            return updated;
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    };

    const deleteChatbot = async (id: string) => {
        try {
            await chatbotService.delete(id);
            setChatbots(prev => prev.filter(bot => bot.id !== id));
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    };

    return {
        chatbots,
        loading,
        error,
        refresh: loadChatbots,
        create: createChatbot,
        update: updateChatbot,
        delete: deleteChatbot
    };
}

// ============================================
// HOOK: useConversations
// ============================================

export function useConversations(chatbotId?: string) {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadConversations();
    }, [chatbotId]);

    // Écouter les nouvelles conversations en temps réel
    useEffect(() => {
        const subscription = realtimeService.subscribeToConversations((newConv) => {
            if (!chatbotId || newConv.chatbot_id === chatbotId) {
                setConversations(prev => [newConv, ...prev]);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [chatbotId]);

    // Écouter les mises à jour de conversations
    useEffect(() => {
        const subscription = realtimeService.subscribeToConversationUpdates((updatedConv) => {
            setConversations(prev => 
                prev.map(conv => conv.id === updatedConv.id ? updatedConv : conv)
            );
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const loadConversations = async () => {
        try {
            setLoading(true);
            const data = chatbotId 
                ? await conversationService.getByChatbot(chatbotId)
                : await conversationService.getAll();
            setConversations(data);
            setError(null);
        } catch (err: any) {
            setError(err.message);
            console.error('Error loading conversations:', err);
        } finally {
            setLoading(false);
        }
    };

    const createConversation = async (data: {
        chatbot_id: string;
        client_id: string;
        status?: string;
    }) => {
        try {
            const newConv = await conversationService.create(data);
            setConversations(prev => [newConv, ...prev]);
            return newConv;
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    };

    const updateConversation = async (id: string, updates: Partial<Conversation>) => {
        try {
            const updated = await conversationService.update(id, updates);
            setConversations(prev => 
                prev.map(conv => conv.id === id ? updated : conv)
            );
            return updated;
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    };

    const markAsRead = async (id: string) => {
        try {
            await conversationService.markAsRead(id);
            setConversations(prev => 
                prev.map(conv => conv.id === id ? { ...conv, unread_count: 0 } : conv)
            );
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    };

    const toggleBotMode = async (id: string, isActive: boolean) => {
        try {
            const updated = await conversationService.toggleBotMode(id, isActive);
            setConversations(prev => 
                prev.map(conv => conv.id === id ? updated : conv)
            );
            return updated;
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    };

    return {
        conversations,
        loading,
        error,
        refresh: loadConversations,
        create: createConversation,
        update: updateConversation,
        markAsRead,
        toggleBotMode
    };
}

// ============================================
// HOOK: useMessages
// ============================================

export function useMessages(conversationId: string | null) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (conversationId) {
            loadMessages();
        } else {
            setMessages([]);
            setLoading(false);
        }
    }, [conversationId]);

    // Écouter les nouveaux messages en temps réel
    useEffect(() => {
        if (!conversationId) return;

        const subscription = messageService.subscribeToConversation(
            conversationId,
            (newMessage) => {
                setMessages(prev => [...prev, newMessage]);
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, [conversationId]);

    const loadMessages = async () => {
        if (!conversationId) return;

        try {
            setLoading(true);
            const data = await messageService.getByConversation(conversationId);
            setMessages(data);
            setError(null);
        } catch (err: any) {
            setError(err.message);
            console.error('Error loading messages:', err);
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = async (data: {
        sender_type: 'client' | 'ai' | 'agent';
        content: string;
        attachments?: any[];
    }) => {
        if (!conversationId) throw new Error('No conversation selected');

        try {
            const newMessage = await messageService.create({
                conversation_id: conversationId,
                ...data
            });
            // Le message sera ajouté automatiquement via le realtime subscription
            return newMessage;
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    };

    return {
        messages,
        loading,
        error,
        refresh: loadMessages,
        send: sendMessage
    };
}

// ============================================
// HOOK: useRealtimeNotifications
// ============================================

export function useRealtimeNotifications(
    onNewConversation?: (conv: Conversation) => void,
    onConversationUpdate?: (conv: Conversation) => void
) {
    useEffect(() => {
        const subscriptions: any[] = [];

        if (onNewConversation) {
            const sub = realtimeService.subscribeToConversations(onNewConversation);
            subscriptions.push(sub);
        }

        if (onConversationUpdate) {
            const sub = realtimeService.subscribeToConversationUpdates(onConversationUpdate);
            subscriptions.push(sub);
        }

        return () => {
            subscriptions.forEach(sub => sub.unsubscribe());
        };
    }, [onNewConversation, onConversationUpdate]);
}
