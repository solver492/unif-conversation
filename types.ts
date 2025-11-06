export type SenderType = 'client' | 'ai' | 'agent';
export type ConversationStatus = 'active' | 'resolved' | 'pending';
export type FileType = 'image' | 'document' | 'video' | 'pdf';

export interface Attachment {
  type: FileType;
  url: string;
  name: string;
  size: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_type: SenderType;
  sender_name: string;
  sender_avatar?: string;
  content: string;
  attachments: Attachment[];
  timestamp: string;
}

export interface Client {
  name: string;
  email: string;
  avatar_url: string;
  origin: string;
  location?: {
    country?: string;
    city?: string;
    ip?: string;
  };
  first_seen?: string;
  last_seen?: string;
  page_url?: string;
  referrer?: string;
}

export interface Conversation {
  id: string;
  chatbot_id: string;
  client: Client;
  status: ConversationStatus;
  last_message_at: string;
  last_message_snippet: string;
  unread_count: number;
  is_bot_active: boolean; // true = bot répond, false = agent a pris le contrôle
  assigned_agent?: string;
}

export interface KnowledgeBaseItem {
    id: string;
    type: 'url' | 'file' | 'text';
    content: string; // URL, file name, or a snippet of the text
    status: 'indexed' | 'processing' | 'error';
}

export interface WidgetConfig {
    header_title: string;
    welcome_message: string;
    position: 'bottom-right' | 'bottom-left';
}

export interface Chatbot {
  id: string;
  name: string;
  description: string;
  avatar_url?: string;
  is_active: boolean;
  conversation_count: number;
  system_prompt: string;
  script_id: string;
  colors: {
    primary: string;
    secondary: string;
  };
  knowledge_base: KnowledgeBaseItem[];
  widget_config: WidgetConfig;
}

export interface MediaFile {
    id: string;
    type: FileType;
    name: string;
    from: string;
    date: string;
    url: string;
    thumbnail_url?: string;
}

export interface NotificationSettings {
    new_message: boolean;
    conversation_assigned: boolean;
    weekly_summary: boolean;
}

export interface UserPreferences {
    language: 'en' | 'fr' | 'es';
    theme: 'dark' | 'light';
    notifications: NotificationSettings;
}

export interface UserSettings {
    profile: {
        name: string;
        email: string;
        title: string;
        avatar_url: string;
    };
    preferences: UserPreferences;
}
