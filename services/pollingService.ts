// ============================================
// SERVICE DE POLLING (Alternative à Realtime)
// ============================================
// Ce service remplace les subscriptions Realtime (payantes)
// par un système de polling (rafraîchissement périodique)

import { conversationService, messageService } from './supabaseService';
import type { Conversation, Message } from '../types';

// ============================================
// POLLING POUR CONVERSATIONS
// ============================================

export class ConversationPoller {
    private intervalId: NodeJS.Timeout | null = null;
    private lastCheck: Date = new Date();
    private callback: ((conversations: Conversation[]) => void) | null = null;
    private pollInterval: number = 5000; // 5 secondes par défaut

    constructor(pollInterval: number = 5000) {
        this.pollInterval = pollInterval;
    }

    // Démarrer le polling
    start(callback: (conversations: Conversation[]) => void) {
        this.callback = callback;
        this.lastCheck = new Date();

        // Premier appel immédiat
        this.checkForUpdates();

        // Puis polling régulier
        this.intervalId = setInterval(() => {
            this.checkForUpdates();
        }, this.pollInterval);
    }

    // Vérifier les mises à jour
    private async checkForUpdates() {
        if (!this.callback) return;

        try {
            // Récupérer toutes les conversations
            const conversations = await conversationService.getAll();
            
            // Appeler le callback avec les données
            this.callback(conversations);
            
            this.lastCheck = new Date();
        } catch (error) {
            console.error('Erreur polling conversations:', error);
        }
    }

    // Arrêter le polling
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.callback = null;
    }

    // Changer l'intervalle
    setInterval(newInterval: number) {
        this.pollInterval = newInterval;
        if (this.intervalId && this.callback) {
            this.stop();
            this.start(this.callback);
        }
    }
}

// ============================================
// POLLING POUR MESSAGES
// ============================================

export class MessagePoller {
    private intervalId: NodeJS.Timeout | null = null;
    private conversationId: string | null = null;
    private callback: ((messages: Message[]) => void) | null = null;
    private pollInterval: number = 3000; // 3 secondes pour les messages

    constructor(pollInterval: number = 3000) {
        this.pollInterval = pollInterval;
    }

    // Démarrer le polling pour une conversation
    start(conversationId: string, callback: (messages: Message[]) => void) {
        this.conversationId = conversationId;
        this.callback = callback;

        // Premier appel immédiat
        this.checkForUpdates();

        // Puis polling régulier
        this.intervalId = setInterval(() => {
            this.checkForUpdates();
        }, this.pollInterval);
    }

    // Vérifier les nouveaux messages
    private async checkForUpdates() {
        if (!this.callback || !this.conversationId) return;

        try {
            // Récupérer tous les messages de la conversation
            const messages = await messageService.getByConversation(this.conversationId);
            
            // Appeler le callback avec les données
            this.callback(messages);
        } catch (error) {
            console.error('Erreur polling messages:', error);
        }
    }

    // Arrêter le polling
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.callback = null;
        this.conversationId = null;
    }

    // Changer de conversation
    switchConversation(conversationId: string) {
        this.conversationId = conversationId;
        this.checkForUpdates(); // Charger immédiatement
    }
}

// ============================================
// POLLING POUR NOTIFICATIONS
// ============================================

export class NotificationPoller {
    private intervalId: NodeJS.Timeout | null = null;
    private lastConversationCount: number = 0;
    private lastMessageCounts: Map<string, number> = new Map();
    private onNewConversation: ((conversation: Conversation) => void) | null = null;
    private onNewMessage: ((conversation: Conversation) => void) | null = null;
    private pollInterval: number = 5000; // 5 secondes

    constructor(pollInterval: number = 5000) {
        this.pollInterval = pollInterval;
    }

    // Démarrer le polling des notifications
    start(callbacks: {
        onNewConversation?: (conversation: Conversation) => void;
        onNewMessage?: (conversation: Conversation) => void;
    }) {
        this.onNewConversation = callbacks.onNewConversation || null;
        this.onNewMessage = callbacks.onNewMessage || null;

        // Initialiser les compteurs
        this.initializeCounts();

        // Polling régulier
        this.intervalId = setInterval(() => {
            this.checkForNotifications();
        }, this.pollInterval);
    }

    // Initialiser les compteurs
    private async initializeCounts() {
        try {
            const conversations = await conversationService.getAll();
            this.lastConversationCount = conversations.length;
            
            conversations.forEach(conv => {
                this.lastMessageCounts.set(conv.id, conv.unread_count || 0);
            });
        } catch (error) {
            console.error('Erreur initialisation compteurs:', error);
        }
    }

    // Vérifier les notifications
    private async checkForNotifications() {
        try {
            const conversations = await conversationService.getAll();

            // Vérifier les nouvelles conversations
            if (conversations.length > this.lastConversationCount) {
                const newConversations = conversations.slice(0, conversations.length - this.lastConversationCount);
                newConversations.forEach(conv => {
                    if (this.onNewConversation) {
                        this.onNewConversation(conv);
                    }
                });
            }
            this.lastConversationCount = conversations.length;

            // Vérifier les nouveaux messages
            conversations.forEach(conv => {
                const lastCount = this.lastMessageCounts.get(conv.id) || 0;
                const currentCount = conv.unread_count || 0;

                if (currentCount > lastCount && this.onNewMessage) {
                    this.onNewMessage(conv);
                }

                this.lastMessageCounts.set(conv.id, currentCount);
            });
        } catch (error) {
            console.error('Erreur polling notifications:', error);
        }
    }

    // Arrêter le polling
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.onNewConversation = null;
        this.onNewMessage = null;
        this.lastMessageCounts.clear();
    }
}

// ============================================
// EXPORTS
// ============================================

// Instances globales (singletons)
export const conversationPoller = new ConversationPoller(5000);
export const messagePoller = new MessagePoller(3000);
export const notificationPoller = new NotificationPoller(5000);

// Export des classes pour créer des instances personnalisées
export { ConversationPoller, MessagePoller, NotificationPoller };
