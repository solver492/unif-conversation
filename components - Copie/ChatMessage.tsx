
import React from 'react';
import type { Message } from '../types';
import { AgentIcon, BotIcon, UserIcon } from './IconComponents';

interface ChatMessageProps {
  message: Message;
}

const SenderAvatar: React.FC<{ senderType: 'client' | 'ai' | 'agent', avatarUrl?: string }> = ({ senderType, avatarUrl }) => {
    if (avatarUrl) {
        return <img src={avatarUrl} alt="avatar" className="w-8 h-8 rounded-full" />
    }
    
    const iconClass = "w-5 h-5 text-slate-300";
    const bgClass = "w-8 h-8 rounded-full flex items-center justify-center";

    switch (senderType) {
        case 'client': return <div className={`${bgClass} bg-slate-600`}><UserIcon className={iconClass} /></div>;
        case 'ai': return <div className={`${bgClass} bg-blue-500`}><BotIcon className={iconClass} /></div>;
        case 'agent': return <div className={`${bgClass} bg-teal-500`}><AgentIcon className={iconClass} /></div>;
        default: return null;
    }
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isClient = message.sender_type === 'client';

  return (
    <div className={`flex items-start gap-3 my-6 ${isClient ? 'justify-end' : 'justify-start'}`}>
      {!isClient && <SenderAvatar senderType={message.sender_type} avatarUrl={message.sender_avatar} />}
      
      <div className={`flex flex-col ${isClient ? 'items-end' : 'items-start'}`}>
        <div className="flex items-center gap-2">
            {!isClient && <span className="font-bold text-sm text-slate-300">{message.sender_name}</span>}
            <span className="text-xs text-slate-500">{message.timestamp}</span>
        </div>
        <div
            className={`mt-1 max-w-xs md:max-w-md lg:max-w-xl rounded-lg px-4 py-2 text-sm ${
            isClient
                ? 'bg-blue-600 text-white rounded-br-none'
                : 'bg-slate-700 text-slate-200 rounded-bl-none'
            }`}
        >
            <p className="whitespace-pre-wrap">{message.content}</p>
             {message.attachments.length > 0 && (
                <div className="mt-2">
                    {message.attachments.map((att, index) => (
                        att.type === 'image' && (
                            <img 
                                key={index} 
                                src={att.url} 
                                alt={att.name} 
                                className="rounded-md max-w-full h-auto mt-2"
                            />
                        )
                        // Add handlers for other file types here
                    ))}
                </div>
            )}
        </div>
      </div>

       {isClient && <SenderAvatar senderType={message.sender_type} avatarUrl={message.sender_avatar} />}
    </div>
  );
};
