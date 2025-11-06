
import React, { useState, useEffect } from 'react';
import type { Conversation, Message } from '../types';
// FIX: Correctly import 'initialChatbots' and alias it as 'chatbots'.
import { conversations as initialConversations, messages as mockMessages, initialChatbots as chatbots } from '../data';
import { getGeminiResponse } from '../services/geminiService';
import { storage } from '../utils/storage';

import { SearchIcon, ChevronDownIcon, PhoneIcon, VideoCameraIcon, EllipsisVerticalIcon, ArrowPathIcon, ChevronRightIcon } from '../components/IconComponents';
import { ChatMessage } from '../components/ChatMessage';
import { ChatInput } from '../components/ChatInput';

const ConversationList: React.FC<{
    conversations: Conversation[],
    selectedConversation: Conversation | null,
    onSelectConversation: (conv: Conversation) => void,
    isCollapsed: boolean,
    onToggleCollapse: () => void
}> = ({ conversations, selectedConversation, onSelectConversation, isCollapsed, onToggleCollapse }) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [statusFilter, setStatusFilter] = React.useState<'all' | 'active' | 'pending' | 'resolved'>('all');
    const [agentFilter, setAgentFilter] = React.useState<'all' | string>('all');

    // Extraire tous les agents uniques des conversations
    const uniqueAgents = React.useMemo(() => {
        const agentSet = new Set<string>();
        conversations.forEach(conv => {
            const chatbot = chatbots.find(cb => cb.id === conv.chatbot_id);
            if (chatbot) {
                agentSet.add(chatbot.name);
            }
        });
        return Array.from(agentSet);
    }, [conversations]);

    const filteredConversations = conversations.filter(conv => {
        // Search filter
        const matchesSearch = searchQuery === '' || 
            conv.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            conv.client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            conv.last_message_snippet.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Status filter
        const matchesStatus = statusFilter === 'all' || conv.status === statusFilter;
        
        // Agent filter
        const chatbot = chatbots.find(cb => cb.id === conv.chatbot_id);
        const matchesAgent = agentFilter === 'all' || (chatbot && chatbot.name === agentFilter);
        
        return matchesSearch && matchesStatus && matchesAgent;
    });

    return (
        <div className={`${isCollapsed ? 'w-16' : 'w-1/4 min-w-[300px]'} flex flex-col bg-slate-800 border-r border-slate-700 transition-all duration-300 relative`}>
            {/* Toggle Button */}
            <button
                onClick={onToggleCollapse}
                className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-12 bg-slate-700 hover:bg-slate-600 rounded-r-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors border border-slate-600"
                title={isCollapsed ? "Expand conversations" : "Collapse conversations"}
            >
                {isCollapsed ? (
                    <ChevronRightIcon className="w-4 h-4" />
                ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                )}
            </button>

            {isCollapsed ? (
                <div className="flex flex-col items-center p-2 gap-4">
                    <div className="text-slate-400 text-xs rotate-90 whitespace-nowrap mt-8">Conversations</div>
                    <div className="flex flex-col gap-2 mt-4">
                        {filteredConversations.slice(0, 5).map(c => (
                            <button
                                key={c.id}
                                onClick={() => onSelectConversation(c)}
                                className={`w-12 h-12 rounded-full relative ${selectedConversation?.id === c.id ? 'ring-2 ring-blue-500' : ''}`}
                                title={c.client.name}
                            >
                                <img src={c.client.avatar_url} alt={c.client.name} className="w-full h-full rounded-full" />
                                {c.unread_count > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {c.unread_count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <>
            <div className="p-4 border-b border-slate-700 flex-shrink-0">
                <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                        type="search" 
                        placeholder="Search conversations" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-slate-700 w-full pl-10 pr-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                <div className="flex gap-2 mt-4 text-sm">
                    <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                        className="flex-1 p-2 bg-slate-700 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="resolved">Resolved</option>
                    </select>
                </div>
                <div className="flex gap-2 mt-2 text-sm">
                    <select 
                        value={agentFilter}
                        onChange={(e) => setAgentFilter(e.target.value)}
                        className="flex-1 p-2 bg-slate-700 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">🤖 Tous les Agents</option>
                        {uniqueAgents.map(agent => (
                            <option key={agent} value={agent}>
                                {agent}
                            </option>
                        ))}
                    </select>
                </div>
                {searchQuery && (
                    <div className="mt-2 text-xs text-slate-400">
                        {filteredConversations.length} result{filteredConversations.length !== 1 ? 's' : ''} found
                    </div>
                )}
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {filteredConversations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500 p-4 text-center">
                        <p>No conversations found</p>
                        {searchQuery && <p className="text-xs mt-2">Try adjusting your search</p>}
                    </div>
                ) : (
                    filteredConversations.map(c => (
                <button key={c.id} onClick={() => onSelectConversation(c)} className={`w-full text-left p-4 flex gap-3 items-center border-b border-slate-700/50 hover:bg-slate-700/50 ${selectedConversation?.id === c.id ? 'bg-slate-700/70' : ''}`}>
                    <div className="relative">
                        <img src={c.client.avatar_url} alt={c.client.name} className="w-12 h-12 rounded-full" />
                        <span className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ${c.status === 'active' ? 'bg-green-400' : 'bg-slate-500'} ring-2 ring-slate-800`}></span>
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-baseline">
                            <p className="font-semibold text-white">{c.client.name}</p>
                            <p className="text-xs text-slate-400">{c.last_message_at}</p>
                        </div>
                        <div className="flex justify-between items-start mt-1">
                            <p className="text-sm text-slate-400 truncate pr-2">{c.last_message_snippet}</p>
                            {c.unread_count > 0 && <span className="text-xs bg-blue-600 text-white font-semibold rounded-full w-5 h-5 flex items-center justify-center">{c.unread_count}</span>}
                        </div>
                    </div>
                </button>
            ))
                )}
        </div>
                </>
            )}
    </div>
    );
};

const ChatWindow: React.FC<{ conversation: Conversation, messages: Message[], onSendMessage: (msg: string) => void, isLoading: boolean, error?: string | null }> = ({ conversation, messages, onSendMessage, isLoading, error }) => {
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    return (
        <div className="flex-1 flex flex-col">
            <header className="flex-shrink-0 flex items-center justify-between p-3 border-b border-slate-700">
                <div className="flex items-center gap-3">
                    <img src={conversation.client.avatar_url} alt={conversation.client.name} className="w-10 h-10 rounded-full" />
                    <div>
                        <p className="font-bold text-white">{conversation.client.name}</p>
                        <div className="flex items-center gap-2 text-xs text-green-400">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Active
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                    <button className="p-2 hover:bg-slate-700 rounded-full"><PhoneIcon className="w-5 h-5" /></button>
                    <button className="p-2 hover:bg-slate-700 rounded-full"><VideoCameraIcon className="w-5 h-5" /></button>
                    <button className="p-2 hover:bg-slate-700 rounded-full"><EllipsisVerticalIcon className="w-5 h-5" /></button>
                </div>
            </header>
            <main className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                {error && (
                    <div className="flex items-center justify-center my-4">
                        <div className="bg-red-900/30 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg flex items-center gap-2 max-w-md">
                            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">{error}</span>
                        </div>
                    </div>
                )}
                {isLoading && (
                    <div className="flex items-start gap-3 my-6 justify-start">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-500"><svg className="w-5 h-5 text-slate-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM6.39 6.39a.75.75 0 011.06 0l2.122 2.121.03-.03a.75.75 0 011.06 0l2.122 2.121a.75.75 0 01-1.06 1.06L10 9.56l-2.121 2.122a.75.75 0 01-1.06-1.061l2.121-2.122-.03.03a.75.75 0 010-1.06L6.39 6.39z" clipRule="evenodd" /></svg></div>
                        <div className="flex flex-col items-start">
                             <div className="flex items-center gap-2"><span className="font-bold text-sm text-slate-300">AI Assistant</span><span className="text-xs text-slate-500">now</span></div>
                             <div className="mt-1 max-w-xs md:max-w-md lg:max-w-xl rounded-lg px-4 py-3 bg-slate-700 text-slate-200 rounded-bl-none">
                                <div className="flex items-center justify-center space-x-1">
                                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-pulse"></div>
                                </div>
                             </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </main>
            <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
        </div>
    );
};

const ClientDetails: React.FC<{ conversation: Conversation; onToggleBotMode: () => void; isCollapsed: boolean; onToggleCollapse: () => void }> = ({ conversation, onToggleBotMode, isCollapsed, onToggleCollapse }) => {
    const chatbot = chatbots.find(cb => cb.id === conversation.chatbot_id);

    return (
        <div className={`${isCollapsed ? 'w-16' : 'w-1/4 min-w-[300px]'} flex flex-col bg-slate-800 border-l border-slate-700 transition-all duration-300 relative`}>
            {/* Toggle Button */}
            <button
                onClick={onToggleCollapse}
                className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-6 h-12 bg-slate-700 hover:bg-slate-600 rounded-l-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors border border-slate-600"
                title={isCollapsed ? "Expand client details" : "Collapse client details"}
            >
                {isCollapsed ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <ChevronRightIcon className="w-4 h-4" />
                )}
            </button>

            {isCollapsed ? (
                <div className="flex flex-col items-center p-2 gap-4">
                    <div className="text-slate-400 text-xs rotate-90 whitespace-nowrap mt-8">Client</div>
                    <div className="mt-4">
                        <img src={conversation.client.avatar_url} alt={conversation.client.name} className="w-12 h-12 rounded-full ring-2 ring-slate-700" />
                    </div>
                </div>
            ) : (
                <>
            <header className="p-4 border-b border-slate-700 text-center flex-shrink-0">
                <h2 className="font-bold text-white text-lg">Client Details</h2>
            </header>
            <main className="flex-1 overflow-y-auto custom-scrollbar p-6">
                <div className="flex flex-col items-center">
                    <img src={conversation.client.avatar_url} alt={conversation.client.name} className="w-24 h-24 rounded-full ring-4 ring-slate-700" />
                    <h3 className="text-xl font-bold text-white mt-4">{conversation.client.name}</h3>
                    <p className="text-sm text-slate-400">{conversation.client.email}</p>
                    <p className="text-sm text-slate-400 mt-1">Origin: {conversation.client.origin}</p>
                    {chatbot && <div className="mt-2 text-xs text-slate-400 bg-slate-700 px-2 py-0.5 rounded-full">{chatbot.name}</div>}
                </div>

                {/* Tracking Information */}
                {conversation.client.location && (
                    <div className="mt-6 bg-slate-900/50 rounded-lg p-4">
                        <h4 className="font-semibold text-slate-300 mb-3 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            Location
                        </h4>
                        <div className="space-y-2 text-sm">
                            {conversation.client.location.city && (
                                <div className="flex justify-between">
                                    <span className="text-slate-400">City:</span>
                                    <span className="text-white">{conversation.client.location.city}</span>
                                </div>
                            )}
                            {conversation.client.location.country && (
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Country:</span>
                                    <span className="text-white">{conversation.client.location.country}</span>
                                </div>
                            )}
                            {conversation.client.location.ip && (
                                <div className="flex justify-between">
                                    <span className="text-slate-400">IP:</span>
                                    <span className="text-white font-mono text-xs">{conversation.client.location.ip}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Visit Information */}
                <div className="mt-4 bg-slate-900/50 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-300 mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        Visit Info
                    </h4>
                    <div className="space-y-2 text-sm">
                        {conversation.client.first_seen && (
                            <div className="flex justify-between">
                                <span className="text-slate-400">First seen:</span>
                                <span className="text-white">{conversation.client.first_seen}</span>
                            </div>
                        )}
                        {conversation.client.last_seen && (
                            <div className="flex justify-between">
                                <span className="text-slate-400">Last seen:</span>
                                <span className="text-white">{conversation.client.last_seen}</span>
                            </div>
                        )}
                        {conversation.client.page_url && (
                            <div className="flex flex-col gap-1">
                                <span className="text-slate-400">Page URL:</span>
                                <a href={conversation.client.page_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-xs truncate">{conversation.client.page_url}</a>
                            </div>
                        )}
                        {conversation.client.referrer && (
                            <div className="flex justify-between">
                                <span className="text-slate-400">Referrer:</span>
                                <span className="text-white text-xs">{conversation.client.referrer}</span>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="mt-6">
                    <h4 className="font-semibold text-slate-300 mb-2">Interaction Mode</h4>
                    <div className="flex gap-2">
                        <button 
                            onClick={onToggleBotMode}
                            className={`flex-1 p-2 rounded-md text-sm font-medium transition-colors ${
                                !conversation.is_bot_active 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                            }`}
                        >
                            Manual
                        </button>
                        <button 
                            onClick={onToggleBotMode}
                            className={`flex-1 p-2 rounded-md text-sm font-medium transition-colors ${
                                conversation.is_bot_active 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                            }`}
                        >
                            AI Assist
                        </button>
                    </div>
                    {!conversation.is_bot_active && conversation.assigned_agent && (
                        <div className="mt-2 text-xs text-green-400 bg-green-900/20 px-2 py-1 rounded text-center">
                            ✓ You are controlling this conversation
                        </div>
                    )}
                    {conversation.is_bot_active && (
                        <div className="mt-2 text-xs text-blue-400 bg-blue-900/20 px-2 py-1 rounded text-center">
                            🤖 AI is responding automatically
                        </div>
                    )}
                </div>

                <div className="mt-8">
                     <h4 className="font-semibold text-slate-300">Internal Notes</h4>
                     <textarea placeholder="Add a private note..." rows={4} className="w-full mt-2 bg-slate-700 text-sm p-2 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 custom-scrollbar"></textarea>
                     <button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md text-sm">Save Note</button>
                </div>

                <div className="mt-8">
                    <h4 className="font-semibold text-slate-300">History</h4>
                    <button className="w-full mt-2 flex items-center justify-between bg-slate-700 p-3 rounded-md text-sm hover:bg-slate-600">
                        <div className="flex items-center gap-3">
                            <ArrowPathIcon className="w-5 h-5" />
                            <span>View Past Conversations</span>
                        </div>
                        <ChevronRightIcon className="w-5 h-5" />
                    </button>
                </div>
            </main>
                </>
            )}
        </div>
    );
};

const ConversationsView: React.FC<{ addNotification?: (notification: any) => void }> = ({ addNotification }) => {
    const [conversations, setConversations] = useState<Conversation[]>(() => {
        return storage.getConversations() || initialConversations;
    });
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
    const [messages, setMessages] = useState<{ [key: string]: Message[] }>(() => {
        return storage.getMessages() || mockMessages;
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isConversationListCollapsed, setIsConversationListCollapsed] = useState(false);
    const [isClientDetailsCollapsed, setIsClientDetailsCollapsed] = useState(false);

    // Save to localStorage whenever messages change
    useEffect(() => {
        storage.saveMessages(messages);
    }, [messages]);

    // Save conversations to localStorage whenever they change
    useEffect(() => {
        storage.saveConversations(conversations);
    }, [conversations]);

    // Surveiller les nouvelles conversations et notifier par agent
    useEffect(() => {
        const checkForNewConversations = () => {
            const storedConvs = storage.getConversations() || [];
            
            storedConvs.forEach(conv => {
                const existingConv = conversations.find(c => c.id === conv.id);
                
                // Nouvelle conversation détectée
                if (!existingConv && addNotification) {
                    const chatbot = chatbots.find(cb => cb.id === conv.chatbot_id);
                    
                    addNotification({
                        type: 'new_visitor',
                        title: `🤖 ${chatbot?.name || 'Agent'} - Nouveau client!`,
                        message: `${conv.client.name} de ${conv.client.location?.city || 'Unknown'} a démarré une conversation`,
                        duration: 10000
                    });
                }
                
                // Nouveau message dans une conversation existante
                if (existingConv && conv.unread_count > existingConv.unread_count && addNotification) {
                    const chatbot = chatbots.find(cb => cb.id === conv.chatbot_id);
                    
                    addNotification({
                        type: 'new_message',
                        title: `💬 ${chatbot?.name || 'Agent'}`,
                        message: `Nouveau message de ${conv.client.name}`,
                        duration: 6000
                    });
                }
            });
        };

        // Vérifier toutes les 3 secondes
        const interval = setInterval(checkForNewConversations, 3000);
        
        return () => clearInterval(interval);
    }, [conversations, addNotification]);

    const handleToggleBotMode = () => {
        if (!selectedConversation) return;
        
        setConversations(prevConvs => prevConvs.map(conv => {
            if (conv.id === selectedConversation.id) {
                const newBotActive = !conv.is_bot_active;
                return {
                    ...conv,
                    is_bot_active: newBotActive,
                    assigned_agent: newBotActive ? undefined : 'Alex (Agent)'
                };
            }
            return conv;
        }));
        
        // Update selected conversation
        setSelectedConversation(prev => prev ? {
            ...prev,
            is_bot_active: !prev.is_bot_active,
            assigned_agent: !prev.is_bot_active ? undefined : 'Alex (Agent)'
        } : null);
    };

    const handleSendMessage = async (userMessage: string) => {
        if (!selectedConversation) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            conversation_id: selectedConversation.id,
            content: userMessage,
            sender_type: 'agent',
            sender_name: 'Alex (Agent)',
            sender_avatar: 'https://i.pravatar.cc/40?u=alex',
            attachments: [],
            timestamp: 'now',
        };
        
        const updatedMessages = [...(messages[selectedConversation.id] || []), newUserMessage];
        setMessages(prev => ({ ...prev, [selectedConversation.id]: updatedMessages }));
        
        // Si le bot est actif, obtenir une réponse automatique
        if (selectedConversation.is_bot_active) {
            setIsLoading(true);
            setError(null);

            try {
                // Get the chatbot configuration for system prompt
                const chatbot = chatbots.find(cb => cb.id === selectedConversation.chatbot_id);
                
                const aiResponseText = await getGeminiResponse({
                    userMessage,
                    conversationHistory: updatedMessages,
                    systemPrompt: chatbot?.system_prompt
                });

                const newAiMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    conversation_id: selectedConversation.id,
                    content: aiResponseText,
                    sender_type: 'ai',
                    sender_name: 'AI Assistant',
                    attachments: [],
                    timestamp: 'now',
                };
                
                setMessages(prev => ({ ...prev, [selectedConversation.id]: [...updatedMessages, newAiMessage] }));
            } catch (err: any) {
                setError(err.message || 'Failed to get AI response');
                console.error('Error getting AI response:', err);
            } finally {
                setIsLoading(false);
            }
        }
        // Sinon, en mode manuel, le message de l'agent est simplement envoyé sans réponse automatique
    };

    return (
        <div className="flex flex-1 overflow-hidden">
            <ConversationList 
                conversations={conversations} 
                selectedConversation={selectedConversation} 
                onSelectConversation={setSelectedConversation}
                isCollapsed={isConversationListCollapsed}
                onToggleCollapse={() => setIsConversationListCollapsed(!isConversationListCollapsed)}
            />
            {selectedConversation ? (
                <>
                    <ChatWindow 
                        conversation={selectedConversation} 
                        messages={messages[selectedConversation.id] || []}
                        onSendMessage={handleSendMessage}
                        isLoading={isLoading}
                        error={error}
                    />
                    <ClientDetails 
                        conversation={selectedConversation} 
                        onToggleBotMode={handleToggleBotMode}
                        isCollapsed={isClientDetailsCollapsed}
                        onToggleCollapse={() => setIsClientDetailsCollapsed(!isClientDetailsCollapsed)}
                    />
                </>
            ) : (
                <div className="flex-1 flex items-center justify-center text-slate-500">
                    <p>Select a conversation to start chatting</p>
                </div>
            )}
        </div>
    );
};

export default ConversationsView;