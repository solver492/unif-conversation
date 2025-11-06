import React, { useState, useEffect } from 'react';
import { initialChatbots } from '../data';
import type { Chatbot } from '../types';
import { PlusCircleIcon, PencilIcon, SearchIcon, BellIcon, ConversationsIcon } from '../components/IconComponents';
import { ChatbotEditor } from '../components/ChatbotEditor';
import { storage } from '../utils/storage';

const ChatbotCard: React.FC<{ chatbot: Chatbot; onEdit: (chatbot: Chatbot) => void }> = ({ chatbot, onEdit }) => (
    <div className="bg-slate-800 rounded-lg p-6 flex flex-col">
        <div className="flex items-center gap-4">
            {chatbot.avatar_url ? (
                <img src={chatbot.avatar_url} alt={chatbot.name} className="w-14 h-14 rounded-full bg-slate-700"/>
            ) : (
                 <div className="w-14 h-14 rounded-full bg-slate-700 flex items-center justify-center text-slate-400 text-2xl font-bold">
                    {chatbot.name.charAt(0)}
                 </div>
            )}
            <div>
                <h3 className="text-xl font-bold text-white">{chatbot.name}</h3>
                <div className={`flex items-center gap-1.5 mt-1 text-sm ${chatbot.is_active ? 'text-green-400' : 'text-slate-400'}`}>
                    <span className={`h-2 w-2 rounded-full ${chatbot.is_active ? 'bg-green-400' : 'bg-slate-400'}`}></span>
                    {chatbot.is_active ? 'Active' : 'Inactive'}
                </div>
            </div>
        </div>
        <div className="mt-6 flex items-center gap-2 text-slate-400 text-sm">
            <ConversationsIcon className="w-5 h-5"/>
            <span>{chatbot.conversation_count} conversations</span>
        </div>
        <div className="mt-auto pt-6">
            <button 
                onClick={() => onEdit(chatbot)}
                className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 rounded-md text-sm">
                <PencilIcon className="w-4 h-4"/>
                Modifier
            </button>
        </div>
    </div>
);

const MyChatbots: React.FC<{ addNotification?: (notification: any) => void }> = ({ addNotification }) => {
    const [chatbots, setChatbots] = useState<Chatbot[]>(() => {
        return storage.getChatbots() || initialChatbots;
    });
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingChatbot, setEditingChatbot] = useState<Chatbot | null>(null);

    // Save chatbots to localStorage whenever they change
    useEffect(() => {
        storage.saveChatbots(chatbots);
    }, [chatbots]);

    const handleCreateNew = () => {
        setEditingChatbot(null); // Passing null for creation
        setIsEditorOpen(true);
    };

    const handleEdit = (chatbot: Chatbot) => {
        setEditingChatbot(chatbot);
        setIsEditorOpen(true);
    };

    const handleSave = (updatedBot: Chatbot) => {
        const isNewBot = !chatbots.some(bot => bot.id === updatedBot.id);
        
        if (isNewBot) {
            // Add new
            setChatbots(bots => [...bots, updatedBot]);
            
            // Notification pour nouvel agent créé
            if (addNotification) {
                addNotification({
                    type: 'success',
                    title: '✅ Agent créé avec succès!',
                    message: `${updatedBot.name} est maintenant actif et prêt à recevoir des clients`,
                    duration: 8000
                });
            }
        } else {
            // Update existing
            setChatbots(bots => bots.map(b => b.id === updatedBot.id ? updatedBot : b));
            
            // Notification pour agent modifié
            if (addNotification) {
                addNotification({
                    type: 'success',
                    title: '✅ Agent mis à jour!',
                    message: `Les modifications de ${updatedBot.name} ont été enregistrées`,
                    duration: 6000
                });
            }
        }
        
        setIsEditorOpen(false);
        setEditingChatbot(null);
    };

    return (
        <div className="flex flex-col h-full bg-slate-900">
            <header className="flex-shrink-0 flex items-center justify-between p-4 bg-slate-800/50 border-b border-slate-700">
                <h1 className="text-xl font-bold text-white">Mes Chatbots</h1>
                 <div className="flex items-center gap-4">
                    <button className="text-slate-400 hover:text-white"><SearchIcon className="w-6 h-6"/></button>
                    <button className="text-slate-400 hover:text-white"><BellIcon className="w-6 h-6"/></button>
                    <div className="w-10 h-10 rounded-full bg-slate-700"><img src="https://i.pravatar.cc/40?u=agent" alt="user avatar" className="rounded-full"/></div>
                </div>
            </header>
            <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <div className="flex justify-start mb-8">
                    <button 
                        onClick={handleCreateNew}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg">
                        <PlusCircleIcon className="w-6 h-6" />
                        Créer un nouveau chatbot
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {chatbots.map(bot => (
                        <ChatbotCard key={bot.id} chatbot={bot} onEdit={handleEdit} />
                    ))}
                </div>
            </main>
            {isEditorOpen && (
                <ChatbotEditor
                    chatbot={editingChatbot}
                    onClose={() => setIsEditorOpen(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default MyChatbots;