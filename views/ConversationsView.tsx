
import React, { useState } from 'react';
import type { Conversation, Message } from '../types';
// FIX: Correctly import 'initialChatbots' and alias it as 'chatbots'.
import { conversations, messages as mockMessages, initialChatbots as chatbots } from '../data';
import { getGeminiResponse } from '../services/geminiService';

import { SearchIcon, ChevronDownIcon, PhoneIcon, VideoCameraIcon, EllipsisVerticalIcon, ArrowPathIcon, ChevronRightIcon } from '../components/IconComponents';
import { ChatMessage } from '../components/ChatMessage';
import { ChatInput } from '../components/ChatInput';

const ConversationList: React.FC<{
    conversations: Conversation[],
    selectedConversation: Conversation | null,
    onSelectConversation: (conv: Conversation) => void
}> = ({ conversations, selectedConversation, onSelectConversation }) => (
    <div className="w-1/4 min-w-[300px] flex flex-col bg-slate-800 border-r border-slate-700">
        <div className="p-4 border-b border-slate-700 flex-shrink-0">
            <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="search" placeholder="Search conversations" className="bg-slate-700 w-full pl-10 pr-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex gap-2 mt-4 text-sm">
                <button className="flex-1 flex items-center justify-between p-2 bg-slate-700 rounded-md">By Site <ChevronDownIcon className="w-4 h-4" /></button>
                <button className="flex-1 flex items-center justify-between p-2 bg-slate-700 rounded-md">By Status <ChevronDownIcon className="w-4 h-4" /></button>
                <button className="flex-1 flex items-center justify-between p-2 bg-slate-700 rounded-md">By Date <ChevronDownIcon className="w-4 h-4" /></button>
            </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            {conversations.map(c => (
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
            ))}
        </div>
    </div>
);

const ChatWindow: React.FC<{ conversation: Conversation, messages: Message[], onSendMessage: (msg: string) => void, isLoading: boolean }> = ({ conversation, messages, onSendMessage, isLoading }) => {
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

const ClientDetails: React.FC<{ conversation: Conversation }> = ({ conversation }) => {
    const chatbot = chatbots.find(cb => cb.id === conversation.chatbot_id);

    return (
        <div className="w-1/4 min-w-[300px] flex flex-col bg-slate-800 border-l border-slate-700">
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
                
                <div className="mt-8">
                    <h4 className="font-semibold text-slate-300">Interaction Mode</h4>
                    <div className="flex gap-2 mt-2">
                        <button className="flex-1 bg-slate-700 p-2 rounded-md text-sm">Manual</button>
                        <button className="flex-1 bg-blue-600 text-white p-2 rounded-md text-sm">AI Assist</button>
                    </div>
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
        </div>
    );
};

const ConversationsView: React.FC = () => {
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
    const [messages, setMessages] = useState<{ [key: string]: Message[] }>(mockMessages);
    const [isLoading, setIsLoading] = useState(false);

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
        
        const updatedMessages = [...messages[selectedConversation.id], newUserMessage];
        setMessages(prev => ({ ...prev, [selectedConversation.id]: updatedMessages }));
        setIsLoading(true);

        const aiResponseText = await getGeminiResponse(userMessage);

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
        setIsLoading(false);
    };

    return (
        <div className="flex flex-1 overflow-hidden">
            <ConversationList conversations={conversations} selectedConversation={selectedConversation} onSelectConversation={setSelectedConversation} />
            {selectedConversation ? (
                <>
                    <ChatWindow 
                        conversation={selectedConversation} 
                        messages={messages[selectedConversation.id] || []}
                        onSendMessage={handleSendMessage}
                        isLoading={isLoading}
                    />
                    <ClientDetails conversation={selectedConversation} />
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