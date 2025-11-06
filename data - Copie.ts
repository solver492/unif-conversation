import { Chatbot, Conversation, Message, MediaFile, UserSettings } from './types';

export const initialChatbots: Chatbot[] = [
    { 
        id: 'd3drone', 
        name: 'D3Drone', 
        is_active: true, 
        conversation_count: 150, 
        avatar_url: 'https://via.placeholder.com/40/3B82F6/FFFFFF?text=D3',
        description: 'Expert assistant for D3Drone products, specializing in drone technology, support, and sales.',
        system_prompt: 'You are a helpful and knowledgeable assistant for D3Drone. You are an expert in drone technology, troubleshooting, and sales. Be friendly and professional.',
        script_id: 'd3drone-widget-xyz',
        colors: { primary: '#3B82F6', secondary: '#FFFFFF' },
        knowledge_base: [
            { id: 'kb1', type: 'url', content: 'https://d3drone.com/support', status: 'indexed' },
            { id: 'kb2', type: 'file', content: 'manual_d3x.pdf', status: 'indexed' },
        ],
        widget_config: {
            header_title: 'D3Drone Support',
            welcome_message: 'Hello! How can I help you with our drone products today?',
            position: 'bottom-right',
        }
    },
    { 
        id: 'monauxiliaire', 
        name: 'MonAuxiliaire', 
        is_active: false, 
        conversation_count: 42,
        description: 'A personal assistant to help with daily tasks and organization.',
        system_prompt: 'You are a friendly personal assistant named MonAuxiliaire. Your goal is to help users organize their schedule, set reminders, and answer general knowledge questions.',
        script_id: 'monaux-widget-abc',
        colors: { primary: '#10B981', secondary: '#F3F4F6' },
        knowledge_base: [],
        widget_config: {
            header_title: 'MonAuxiliaire',
            welcome_message: 'Good day! What can I help you accomplish?',
            position: 'bottom-right',
        }
    },
    { 
        id: 'rhilkom', 
        name: 'Rhilkom', 
        is_active: true, 
        conversation_count: 289, 
        avatar_url: 'https://robohash.org/rhilkom.png?size=40x40&set=set4',
        description: 'Customer support chatbot for Rhilkom telecommunication services.',
        system_prompt: 'You are a customer support agent for Rhilkom, a telecommunications company. Your primary role is to assist users with billing inquiries, technical support, and plan information. Maintain a patient and helpful tone.',
        script_id: 'rhilkom-widget-123',
        colors: { primary: '#8B5CF6', secondary: '#FFFFFF' },
        knowledge_base: [
             { id: 'kb3', type: 'url', content: 'https://rhilkom.com/faq', status: 'indexed' }
        ],
        widget_config: {
            header_title: 'Rhilkom Help Center',
            welcome_message: 'Welcome to Rhilkom support! How can I assist you?',
            position: 'bottom-left',
        }
    },
];

export const conversations: Conversation[] = [
  {
    id: 'conv1',
    chatbot_id: 'rhilkom',
    client: {
      name: 'Maria Garcia',
      email: 'maria.garcia@example.com',
      avatar_url: 'https://i.pravatar.cc/40?u=maria',
      origin: 'Website Checkout',
      location: {
        country: 'Spain',
        city: 'Madrid',
        ip: '185.45.23.12'
      },
      first_seen: '2 hours ago',
      last_seen: '2 min ago',
      page_url: 'https://rhilkom.com/checkout',
      referrer: 'https://google.com'
    },
    status: 'active',
    last_message_at: '2 min ago',
    last_message_snippet: 'Okay, that sounds great. Thank you!',
    unread_count: 1,
    is_bot_active: false,
    assigned_agent: 'Alex (Agent)'
  },
  {
    id: 'conv2',
    chatbot_id: 'd3drone',
    client: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar_url: 'https://i.pravatar.cc/40?u=john',
      origin: 'Product Page',
      location: {
        country: 'USA',
        city: 'New York',
        ip: '192.168.1.45'
      },
      first_seen: '30 min ago',
      last_seen: '15 min ago',
      page_url: 'https://d3drone.com/products/d3x',
      referrer: 'https://facebook.com'
    },
    status: 'pending',
    last_message_at: '15 min ago',
    last_message_snippet: 'I need help with my order #D3-58292.',
    unread_count: 0,
    is_bot_active: true
  },
  {
    id: 'conv3',
    chatbot_id: 'monauxiliaire',
    client: {
      name: 'Chen Wang',
      email: 'chen.wang@example.com',
      avatar_url: 'https://i.pravatar.cc/40?u=chen',
      origin: 'Pricing Page',
      location: {
        country: 'China',
        city: 'Beijing',
        ip: '123.45.67.89'
      },
      first_seen: '2 hours ago',
      last_seen: '1 hour ago',
      page_url: 'https://monauxiliaire.com/pricing',
      referrer: 'https://linkedin.com'
    },
    status: 'active',
    last_message_at: '1 hour ago',
    last_message_snippet: 'Can you explain the premium features?',
    unread_count: 0,
    is_bot_active: true
  },
   {
    id: 'conv4',
    chatbot_id: 'rhilkom',
    client: {
      name: 'Aisha Khan',
      email: 'aisha.khan@example.com',
      avatar_url: 'https://i.pravatar.cc/40?u=aisha',
      origin: 'Support Portal',
      location: {
        country: 'France',
        city: 'Paris',
        ip: '78.123.45.67'
      },
      first_seen: '5 hours ago',
      last_seen: '3 hours ago',
      page_url: 'https://rhilkom.com/support',
      referrer: 'direct'
    },
    status: 'resolved',
    last_message_at: '3 hours ago',
    last_message_snippet: 'Thank you for your help!',
    unread_count: 0,
    is_bot_active: true
  },
];

export const messages: { [conversationId: string]: Message[] } = {
  'conv1': [
    {
      id: 'msg1',
      conversation_id: 'conv1',
      sender_type: 'client',
      sender_name: 'Maria Garcia',
      sender_avatar: 'https://i.pravatar.cc/40?u=maria',
      content: 'Hello, I have a question about my invoice #INV-2023-101. It seems there\'s a charge I don\'t recognize.',
      attachments: [],
      timestamp: '10:30 AM',
    },
    {
      id: 'msg2',
      conversation_id: 'conv1',
      sender_type: 'ai',
      sender_name: 'AI Assistant',
      content: 'Hello Maria, I can certainly help you with that. Could you please specify which charge on invoice #INV-2023-101 you are referring to?',
      attachments: [],
      timestamp: '10:31 AM',
    },
     {
      id: 'msg3',
      conversation_id: 'conv1',
      sender_type: 'client',
      sender_name: 'Maria Garcia',
      sender_avatar: 'https://i.pravatar.cc/40?u=maria',
      content: 'Yes, it\'s this one. I\'ve attached a screenshot.',
      attachments: [{ type: 'image', name: 'invoice_charge.png', size: '128 KB', url: 'https://i.imgur.com/3nL27g1.png'}],
      timestamp: '10:32 AM',
    },
    {
      id: 'msg4',
      conversation_id: 'conv1',
      sender_type: 'agent',
      sender_name: 'Alex (Agent)',
      sender_avatar: 'https://i.pravatar.cc/40?u=alex',
      content: 'Hi Maria, I\'m Alex, a human agent. Let me take a look at that for you. One moment please.',
      attachments: [],
      timestamp: '10:33 AM',
    },
    {
      id: 'msg5',
      conversation_id: 'conv1',
      sender_type: 'client',
      sender_name: 'Maria Garcia',
      sender_avatar: 'https://i.pravatar.cc/40?u=maria',
      content: 'Okay, that sounds great. Thank you!',
      attachments: [],
      timestamp: '10:35 AM',
    },
  ],
  'conv2': [
     {
      id: 'msg_jd_1',
      conversation_id: 'conv2',
      sender_type: 'client',
      sender_name: 'John Doe',
      sender_avatar: 'https://i.pravatar.cc/40?u=john',
      content: 'I need help with my order #D3-58292.',
      attachments: [],
      timestamp: '11:15 AM',
    },
  ],
  'conv3': [],
  'conv4': [],
};

export const mediaFiles: MediaFile[] = [
    { id: 'f1', type: 'pdf', name: 'Annual_Report.pdf', from: 'Support Bot', date: 'Oct 26, 2023', url: '#', thumbnail_url: 'pdf' },
    { id: 'f2', type: 'video', name: 'Product_Demo.mp4', from: 'Sales Bot', date: 'Oct 25, 2023', url: '#', thumbnail_url: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60' },
    { id: 'f3', type: 'image', name: 'Team_Photo.jpg', from: 'HR Bot', date: 'Oct 24, 2023', url: '#', thumbnail_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60' },
    { id: 'f4', type: 'document', name: 'Onboarding_Guide...', from: 'Support Bot', date: 'Oct 23, 2023', url: '#', thumbnail_url: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60' },
    { id: 'f5', type: 'image', name: 'Website_Mockup.p...', from: 'Design Bot', date: 'Oct 22, 2023', url: '#', thumbnail_url: 'https://images.unsplash.com/photo-1600819743997-7a1b138a2fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60' },
    { id: 'f6', type: 'document', name: 'Client_Feedback.m...', from: 'Sales Bot', date: 'Oct 21, 2023', url: '#', thumbnail_url: '' },
    { id: 'f7', type: 'image', name: 'invoice_charge.png', from: 'Maria Garcia', date: 'Oct 28, 2023', url: 'https://i.imgur.com/3nL27g1.png', thumbnail_url: 'https://i.imgur.com/3nL27g1.png' },
];

export const userSettings: UserSettings = {
    profile: {
        name: 'Alex Dupont',
        email: 'alex.dupont@example.com',
        title: 'Support Agent',
        avatar_url: 'https://i.pravatar.cc/128?u=agent',
    },
    preferences: {
        language: 'fr',
        theme: 'dark',
        notifications: {
            new_message: true,
            conversation_assigned: true,
            weekly_summary: false,
        }
    }
};
