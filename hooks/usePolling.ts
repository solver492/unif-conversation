// ============================================
// HOOKS REACT POUR POLLING
// ============================================
// Hooks personnalisés pour utiliser le polling au lieu de Realtime

import { useState, useEffect, useCallback } from 'react';
import { conversationPoller, messagePoller, notificationPoller } from '../services/pollingService';
import type { Conversation, Message } from '../types';

// ============================================
// HOOK: useConversationsPolling
// ============================================

export function useConversationsPolling(pollInterval: number = 5000) {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);

        // Démarrer le polling
        conversationPoller.setInterval(pollInterval);
        conversationPoller.start((newConversations) => {
            setConversations(newConversations);
            setLoading(false);
            setError(null);
        });

        // Nettoyer au démontage
        return () => {
            conversationPoller.stop();
        };
    }, [pollInterval]);

    return { conversations, loading, error };
}

// ============================================
// HOOK: useMessagesPolling
// ============================================

export function useMessagesPolling(conversationId: string | null, pollInterval: number = 3000) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!conversationId) {
            setMessages([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        // Démarrer le polling pour cette conversation
        messagePoller.start(conversationId, (newMessages) => {
            setMessages(newMessages);
            setLoading(false);
            setError(null);
        });

        // Nettoyer au démontage
        return () => {
            messagePoller.stop();
        };
    }, [conversationId, pollInterval]);

    // Fonction pour changer de conversation
    const switchConversation = useCallback((newConversationId: string) => {
        messagePoller.switchConversation(newConversationId);
    }, []);

    return { messages, loading, error, switchConversation };
}

// ============================================
// HOOK: useNotificationsPolling
// ============================================

export function useNotificationsPolling(callbacks: {
    onNewConversation?: (conversation: Conversation) => void;
    onNewMessage?: (conversation: Conversation) => void;
}, pollInterval: number = 5000) {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        // Démarrer le polling des notifications
        notificationPoller.start({
            onNewConversation: callbacks.onNewConversation,
            onNewMessage: callbacks.onNewMessage
        });

        setIsActive(true);

        // Nettoyer au démontage
        return () => {
            notificationPoller.stop();
            setIsActive(false);
        };
    }, [callbacks.onNewConversation, callbacks.onNewMessage, pollInterval]);

    return { isActive };
}

// ============================================
// HOOK: useAutoRefresh
// ============================================
// Hook générique pour rafraîchir n'importe quelle donnée

export function useAutoRefresh<T>(
    fetchFunction: () => Promise<T>,
    interval: number = 5000,
    dependencies: any[] = []
) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const refresh = useCallback(async () => {
        try {
            const result = await fetchFunction();
            setData(result);
            setError(null);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [fetchFunction]);

    useEffect(() => {
        // Premier chargement
        refresh();

        // Rafraîchissement automatique
        const intervalId = setInterval(refresh, interval);

        return () => clearInterval(intervalId);
    }, [refresh, interval, ...dependencies]);

    return { data, loading, error, refresh };
}

// ============================================
// HOOK: useConversationUpdates
// ============================================
// Surveille les mises à jour d'une conversation spécifique

export function useConversationUpdates(conversationId: string | null, interval: number = 3000) {
    const [conversation, setConversation] = useState<Conversation | null>(null);
    const [hasNewMessages, setHasNewMessages] = useState(false);

    useEffect(() => {
        if (!conversationId) {
            setConversation(null);
            return;
        }

        let lastMessageCount = 0;

        const checkUpdates = async () => {
            try {
                // Récupérer les conversations et trouver la bonne
                conversationPoller.start((conversations) => {
                    const conv = conversations.find(c => c.id === conversationId);
                    if (conv) {
                        setConversation(conv);
                        
                        // Détecter les nouveaux messages
                        const currentCount = conv.unread_count || 0;
                        if (currentCount > lastMessageCount) {
                            setHasNewMessages(true);
                        }
                        lastMessageCount = currentCount;
                    }
                });
            } catch (error) {
                console.error('Erreur mise à jour conversation:', error);
            }
        };

        checkUpdates();
        const intervalId = setInterval(checkUpdates, interval);

        return () => {
            clearInterval(intervalId);
            conversationPoller.stop();
        };
    }, [conversationId, interval]);

    const markAsRead = useCallback(() => {
        setHasNewMessages(false);
    }, []);

    return { conversation, hasNewMessages, markAsRead };
}
