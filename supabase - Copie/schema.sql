-- ============================================
-- SCHEMA SUPABASE POUR PLATEFORME CHATBOT
-- ============================================

-- Table: chatbots (agents)
CREATE TABLE IF NOT EXISTS chatbots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    avatar_url TEXT,
    system_prompt TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    conversation_count INTEGER DEFAULT 0,
    script_id TEXT UNIQUE NOT NULL,
    colors JSONB DEFAULT '{"primary": "#3B82F6", "secondary": "#FFFFFF"}',
    widget_config JSONB DEFAULT '{}',
    knowledge_base JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: clients
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT,
    avatar_url TEXT,
    origin TEXT,
    location JSONB,
    visit_info JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: conversations
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chatbot_id UUID REFERENCES chatbots(id) ON DELETE CASCADE,
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'resolved')),
    is_bot_active BOOLEAN DEFAULT true,
    assigned_agent TEXT,
    unread_count INTEGER DEFAULT 0,
    last_message_snippet TEXT,
    last_message_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: messages
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    sender_type TEXT NOT NULL CHECK (sender_type IN ('client', 'ai', 'agent')),
    content TEXT NOT NULL,
    attachments JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: media_files
CREATE TABLE IF NOT EXISTS media_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_size INTEGER,
    uploaded_by TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: knowledge_base_items
CREATE TABLE IF NOT EXISTS knowledge_base_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chatbot_id UUID REFERENCES chatbots(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('url', 'file', 'text')),
    content TEXT NOT NULL,
    title TEXT,
    status TEXT DEFAULT 'processing' CHECK (status IN ('processing', 'indexed', 'error')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES POUR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_conversations_chatbot ON conversations(chatbot_id);
CREATE INDEX IF NOT EXISTS idx_conversations_client ON conversations(client_id);
CREATE INDEX IF NOT EXISTS idx_conversations_status ON conversations(status);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_media_conversation ON media_files(conversation_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_chatbot ON knowledge_base_items(chatbot_id);

-- ============================================
-- FUNCTIONS ET TRIGGERS
-- ============================================

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at
CREATE TRIGGER update_chatbots_updated_at
    BEFORE UPDATE ON chatbots
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at
    BEFORE UPDATE ON conversations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour mettre à jour le compteur de conversations
CREATE OR REPLACE FUNCTION update_chatbot_conversation_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE chatbots 
        SET conversation_count = conversation_count + 1 
        WHERE id = NEW.chatbot_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE chatbots 
        SET conversation_count = GREATEST(conversation_count - 1, 0)
        WHERE id = OLD.chatbot_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour le compteur
CREATE TRIGGER update_conversation_count
    AFTER INSERT OR DELETE ON conversations
    FOR EACH ROW
    EXECUTE FUNCTION update_chatbot_conversation_count();

-- Fonction pour mettre à jour last_message_snippet
CREATE OR REPLACE FUNCTION update_conversation_last_message()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE conversations
    SET 
        last_message_snippet = NEW.content,
        last_message_time = NEW.created_at,
        unread_count = CASE 
            WHEN NEW.sender_type = 'client' THEN unread_count + 1
            ELSE unread_count
        END
    WHERE id = NEW.conversation_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour last_message
CREATE TRIGGER update_last_message
    AFTER INSERT ON messages
    FOR EACH ROW
    EXECUTE FUNCTION update_conversation_last_message();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Activer RLS sur toutes les tables
ALTER TABLE chatbots ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_base_items ENABLE ROW LEVEL SECURITY;

-- Politique: Tout le monde peut lire (pour l'instant)
-- TODO: Ajouter authentification utilisateur et restreindre l'accès

CREATE POLICY "Enable read access for all users" ON chatbots
    FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON chatbots
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON chatbots
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete access for all users" ON chatbots
    FOR DELETE USING (true);

-- Répéter pour les autres tables
CREATE POLICY "Enable all access for clients" ON clients
    FOR ALL USING (true);

CREATE POLICY "Enable all access for conversations" ON conversations
    FOR ALL USING (true);

CREATE POLICY "Enable all access for messages" ON messages
    FOR ALL USING (true);

CREATE POLICY "Enable all access for media_files" ON media_files
    FOR ALL USING (true);

CREATE POLICY "Enable all access for knowledge_base_items" ON knowledge_base_items
    FOR ALL USING (true);

-- ============================================
-- DONNÉES DE DÉMONSTRATION (OPTIONNEL)
-- ============================================

-- Insérer un chatbot de démonstration
INSERT INTO chatbots (name, description, system_prompt, script_id, is_active)
VALUES (
    'D3Drone Support',
    'Assistant intelligent pour les produits D3Drone',
    'You are a helpful assistant for D3Drone, a leading drone technology company. Be friendly, professional, and knowledgeable about drones.',
    'widget_d3drone_demo',
    true
) ON CONFLICT (script_id) DO NOTHING;

-- Message de confirmation
DO $$
BEGIN
    RAISE NOTICE 'Schema created successfully! 🎉';
    RAISE NOTICE 'Tables: chatbots, clients, conversations, messages, media_files, knowledge_base_items';
    RAISE NOTICE 'Ready to use with Supabase!';
END $$;
