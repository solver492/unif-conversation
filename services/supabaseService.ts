import { supabase } from './supabaseClient';
import type { Chatbot, Conversation, Message, Client } from '../types';

// ============================================
// CHATBOTS (AGENTS)
// ============================================

export const chatbotService = {
    // Récupérer tous les chatbots
    async getAll(): Promise<Chatbot[]> {
        const { data, error } = await supabase
            .from('chatbots')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        return data || [];
    },

    // Récupérer un chatbot par ID
    async getById(id: string): Promise<Chatbot | null> {
        const { data, error } = await supabase
            .from('chatbots')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) throw error;
        return data;
    },

    // Créer un nouveau chatbot
    async create(chatbot: Omit<Chatbot, 'id' | 'created_at' | 'updated_at'>): Promise<Chatbot> {
        const { data, error } = await supabase
            .from('chatbots')
            .insert([chatbot])
            .select()
            .single();
        
        if (error) throw error;
        return data;
    },

    // Mettre à jour un chatbot
    async update(id: string, updates: Partial<Chatbot>): Promise<Chatbot> {
        const { data, error } = await supabase
            .from('chatbots')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
        
        if (error) throw error;
        return data;
    },

    // Supprimer un chatbot
    async delete(id: string): Promise<void> {
        const { error } = await supabase
            .from('chatbots')
            .delete()
            .eq('id', id);
        
        if (error) throw error;
    }
};

// ============================================
// CLIENTS
// ============================================

export const clientService = {
    // Récupérer tous les clients
    async getAll(): Promise<Client[]> {
        const { data, error } = await supabase
            .from('clients')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        return data || [];
    },

    // Créer un nouveau client
    async create(client: Omit<Client, 'id' | 'created_at'>): Promise<Client> {
        const { data, error } = await supabase
            .from('clients')
            .insert([client])
            .select()
            .single();
        
        if (error) throw error;
        return data;
    },

    // Mettre à jour un client
    async update(id: string, updates: Partial<Client>): Promise<Client> {
        const { data, error } = await supabase
            .from('clients')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
        
        if (error) throw error;
        return data;
    }
};

// ============================================
// CONVERSATIONS
// ============================================

export const conversationService = {
    // Récupérer toutes les conversations avec détails
    async getAll(): Promise<Conversation[]> {
        const { data, error } = await supabase
            .from('conversations')
            .select(`
                *,
                chatbot:chatbots(*),
                client:clients(*)
            `)
            .order('last_message_time', { ascending: false });
        
        if (error) throw error;
        return data || [];
    },

    // Récupérer les conversations d'un chatbot
    async getByChatbot(chatbotId: string): Promise<Conversation[]> {
        const { data, error } = await supabase
            .from('conversations')
            .select(`
                *,
                chatbot:chatbots(*),
                client:clients(*)
            `)
            .eq('chatbot_id', chatbotId)
            .order('last_message_time', { ascending: false });
        
        if (error) throw error;
        return data || [];
    },

    // Créer une nouvelle conversation
    async create(conversation: {
        chatbot_id: string;
        client_id: string;
        status?: string;
    }): Promise<Conversation> {
        const { data, error } = await supabase
            .from('conversations')
            .insert([conversation])
            .select(`
                *,
                chatbot:chatbots(*),
                client:clients(*)
            `)
            .single();
        
        if (error) throw error;
        return data;
    },

    // Mettre à jour une conversation
    async update(id: string, updates: Partial<Conversation>): Promise<Conversation> {
        const { data, error } = await supabase
            .from('conversations')
            .update(updates)
            .eq('id', id)
            .select(`
                *,
                chatbot:chatbots(*),
                client:clients(*)
            `)
            .single();
        
        if (error) throw error;
        return data;
    },

    // Marquer les messages comme lus
    async markAsRead(id: string): Promise<void> {
        const { error } = await supabase
            .from('conversations')
            .update({ unread_count: 0 })
            .eq('id', id);
        
        if (error) throw error;
    },

    // Basculer le mode bot
    async toggleBotMode(id: string, isActive: boolean): Promise<Conversation> {
        const { data, error } = await supabase
            .from('conversations')
            .update({ 
                is_bot_active: isActive,
                assigned_agent: isActive ? null : 'Agent Manuel'
            })
            .eq('id', id)
            .select(`
                *,
                chatbot:chatbots(*),
                client:clients(*)
            `)
            .single();
        
        if (error) throw error;
        return data;
    }
};

// ============================================
// MESSAGES
// ============================================

export const messageService = {
    // Récupérer les messages d'une conversation
    async getByConversation(conversationId: string): Promise<Message[]> {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .eq('conversation_id', conversationId)
            .order('created_at', { ascending: true });
        
        if (error) throw error;
        return data || [];
    },

    // Créer un nouveau message
    async create(message: {
        conversation_id: string;
        sender_type: 'client' | 'ai' | 'agent';
        content: string;
        attachments?: any[];
    }): Promise<Message> {
        const { data, error } = await supabase
            .from('messages')
            .insert([message])
            .select()
            .single();
        
        if (error) throw error;
        return data;
    },

    // Écouter les nouveaux messages en temps réel
    subscribeToConversation(conversationId: string, callback: (message: Message) => void) {
        return supabase
            .channel(`messages:${conversationId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `conversation_id=eq.${conversationId}`
                },
                (payload) => callback(payload.new as Message)
            )
            .subscribe();
    }
};

// ============================================
// MEDIA FILES
// ============================================

export const mediaService = {
    // Upload un fichier
    async upload(file: File, conversationId: string): Promise<string> {
        const fileName = `${Date.now()}_${file.name}`;
        const filePath = `${conversationId}/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('media')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
            .from('media')
            .getPublicUrl(filePath);

        // Enregistrer dans la base de données
        await supabase.from('media_files').insert([{
            conversation_id: conversationId,
            file_name: file.name,
            file_type: file.type,
            file_url: data.publicUrl,
            file_size: file.size
        }]);

        return data.publicUrl;
    },

    // Récupérer tous les fichiers d'une conversation
    async getByConversation(conversationId: string) {
        const { data, error } = await supabase
            .from('media_files')
            .select('*')
            .eq('conversation_id', conversationId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    }
};

// ============================================
// REALTIME SUBSCRIPTIONS
// ============================================

export const realtimeService = {
    // Écouter les nouvelles conversations
    subscribeToConversations(callback: (conversation: Conversation) => void) {
        return supabase
            .channel('conversations')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'conversations'
                },
                async (payload) => {
                    // Récupérer les détails complets
                    const { data } = await supabase
                        .from('conversations')
                        .select(`
                            *,
                            chatbot:chatbots(*),
                            client:clients(*)
                        `)
                        .eq('id', payload.new.id)
                        .single();
                    
                    if (data) callback(data);
                }
            )
            .subscribe();
    },

    // Écouter les mises à jour de conversations
    subscribeToConversationUpdates(callback: (conversation: Conversation) => void) {
        return supabase
            .channel('conversation_updates')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'conversations'
                },
                async (payload) => {
                    const { data } = await supabase
                        .from('conversations')
                        .select(`
                            *,
                            chatbot:chatbots(*),
                            client:clients(*)
                        `)
                        .eq('id', payload.new.id)
                        .single();
                    
                    if (data) callback(data);
                }
            )
            .subscribe();
    }
};
