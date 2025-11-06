
import React, { useState, useEffect, useRef } from 'react';
import type { Chatbot, KnowledgeBaseItem, Message } from '../types';
import { 
    XMarkIcon, ChevronDownIcon, LinkIcon, DocumentTextIcon, TrashIcon, 
    ChatBubbleLeftRightIcon, PaperAirplaneIconAlt, BotIcon, BeakerIcon 
} from './IconComponents';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';


type EditorTab = 'identity' | 'prompts' | 'knowledge' | 'widget' | 'test' | 'script';

interface ChatbotEditorProps {
    chatbot: Chatbot | null; // null for creating a new chatbot
    onClose: () => void;
    onSave: (chatbot: Chatbot) => void;
}

const defaultChatbot: Omit<Chatbot, 'id' | 'script_id'> = {
    name: 'Assistant Client',
    description: 'Décrivez le rôle et la personnalité de votre chatbot...',
    is_active: true,
    conversation_count: 0,
    avatar_url: '',
    system_prompt: 'You are a helpful customer service assistant.',
    colors: {
        primary: '#2563EB',
        secondary: '#FFFFFF',
    },
    knowledge_base: [],
    widget_config: {
        header_title: 'Chat with Us',
        welcome_message: 'Hello! How can we help you today?',
        position: 'bottom-right'
    }
};

const TabButton: React.FC<{
    label: string;
    isActive: boolean;
    Icon?: React.ElementType;
    onClick: () => void;
}> = ({ label, isActive, Icon, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
            isActive
                ? 'border-b-2 border-blue-500 text-white'
                : 'text-slate-400 hover:text-white'
        }`}
    >
        {Icon && <Icon className="w-4 h-4" />}
        {label}
    </button>
);


export const ChatbotEditor: React.FC<ChatbotEditorProps> = ({ chatbot, onClose, onSave }) => {
    const [activeTab, setActiveTab] = useState<EditorTab>('identity');
    const [formData, setFormData] = useState<Chatbot>(
        chatbot || {
            ...defaultChatbot,
            id: `new_${Date.now()}`,
            script_id: `widget_${Date.now()}`
        }
    );
    const [copied, setCopied] = useState(false);
    const [showAddSource, setShowAddSource] = useState(false);
    const [addingSourceType, setAddingSourceType] = useState<'url' | 'text' | null>(null);
    const [sourceInputValue, setSourceInputValue] = useState('');
    const addSourceRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const avatarInputRef = useRef<HTMLInputElement>(null);
    
    const [testMessages, setTestMessages] = useState<Message[]>([]);
    const [isTesting, setIsTesting] = useState(false);


    useEffect(() => {
        // Handle Escape key to close modal
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        const handleClickOutside = (e: MouseEvent) => {
            if (addSourceRef.current && !addSourceRef.current.contains(e.target as Node)) {
                setShowAddSource(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleWidgetConfigChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, widget_config: { ...formData.widget_config, [e.target.name]: e.target.value } });
    };
    
    const handleWidgetPositionChange = (position: 'bottom-right' | 'bottom-left') => {
        setFormData({ ...formData, widget_config: { ...formData.widget_config, position } });
    };

    const handleColorChange = (colorType: 'primary' | 'secondary', value: string) => {
        setFormData({ ...formData, colors: { ...formData.colors, [colorType]: value } });
    };

    const handleAddSource = (type: KnowledgeBaseItem['type']) => {
        setShowAddSource(false);
        if (type === 'file') {
            fileInputRef.current?.click();
            return;
        }
        setSourceInputValue('');
        setAddingSourceType(type);
    };
    
    const handleSaveSource = () => {
        if (!sourceInputValue.trim() || !addingSourceType) return;

        const newItem: KnowledgeBaseItem = {
            id: `kb_${Date.now()}`,
            type: addingSourceType,
            content: sourceInputValue,
            status: 'processing'
        };

        setFormData(prev => ({...prev, knowledge_base: [...prev.knowledge_base, newItem]}));

        // Reset input state
        setAddingSourceType(null);
        setSourceInputValue('');

        // Simulate indexing
        setTimeout(() => {
             setFormData(prev => ({
                ...prev,
                knowledge_base: prev.knowledge_base.map(item => item.id === newItem.id ? { ...item, status: 'indexed' } : item)
            }));
        }, 2000);
    };

    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const newItem: KnowledgeBaseItem = {
                id: `kb_${Date.now()}`,
                type: 'file',
                content: file.name,
                status: 'processing'
            };
            setFormData({...formData, knowledge_base: [...formData.knowledge_base, newItem]});
             // Simulate indexing
            setTimeout(() => {
                 setFormData(prev => ({
                    ...prev,
                    knowledge_base: prev.knowledge_base.map(item => item.id === newItem.id ? { ...item, status: 'indexed' } : item)
                }));
            }, 2000);
        }
    };

    const handleRemoveSource = (id: string) => {
        setFormData({...formData, knowledge_base: formData.knowledge_base.filter(item => item.id !== id)});
    };

    const handleAvatarClick = () => {
        avatarInputRef.current?.click();
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            
            // Vérifier que c'est une image
            if (!file.type.startsWith('image/')) {
                alert('Veuillez sélectionner une image (JPG, PNG, GIF, etc.)');
                return;
            }
            
            // Vérifier la taille (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('L\'image est trop grande. Taille maximale: 2MB');
                return;
            }
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({...formData, avatar_url: reader.result as string});
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        onSave(formData);
    };

    const getScript = () => {
        return `(function() {
  var chatbot = document.createElement('script');
  chatbot.src = 'https://votre-domaine.com/widget.js';
  chatbot.setAttribute('data-chatbot-id', '${formData.script_id}');
  document.body.appendChild(chatbot);
})();`;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(getScript());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleTestSendMessage = async (userMessage: string) => {
        const newUserMessage: Message = {
            id: `test_user_${Date.now()}`,
            conversation_id: 'test_session',
            sender_type: 'agent', // Using 'agent' for the tester's avatar
            sender_name: 'You',
            content: userMessage,
            attachments: [],
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        const updatedMessages = [...testMessages, newUserMessage];
        setTestMessages(updatedMessages);
        setIsTesting(true);

        try {
            const knowledgeBaseContent = formData.knowledge_base
                .filter(item => item.status === 'indexed')
                .map(item => `Source (${item.type}):\n${item.content}`)
                .join('\n\n');
            
            let systemPromptWithKB = formData.system_prompt;
            if (knowledgeBaseContent) {
                systemPromptWithKB += `\n\nYou have the following information in your knowledge base to answer questions:\n---\n${knowledgeBaseContent}\n---`;
            }

            const aiResponseText = await getGeminiResponse({
                userMessage,
                conversationHistory: updatedMessages,
                systemPrompt: systemPromptWithKB
            });

            const newAiMessage: Message = {
                id: `test_ai_${Date.now()}`,
                conversation_id: 'test_session',
                sender_type: 'ai',
                sender_name: formData.name,
                content: aiResponseText,
                attachments: [],
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            setTestMessages(prev => [...prev, newAiMessage]);
        } catch (error: any) {
            const errorMessage: Message = {
                id: `test_error_${Date.now()}`,
                conversation_id: 'test_session',
                sender_type: 'ai',
                sender_name: 'System',
                content: `❌ Error: ${error.message || 'Failed to get response'}`,
                attachments: [],
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setTestMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTesting(false);
        }
    };

    const renderKnowledgeBase = () => (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-base font-medium text-slate-300">Sources de données</h3>
                    <p className="text-xs text-slate-400 mt-1">Ajoutez des URL de sites, des documents ou du texte brut pour entraîner votre chatbot.</p>
                </div>
                <div className="relative" ref={addSourceRef}>
                    <button onClick={() => setShowAddSource(s => !s)} className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-sm font-semibold px-4 py-2 rounded-md">
                        Ajouter une source <ChevronDownIcon className="w-4 h-4" />
                    </button>
                    {showAddSource && (
                        <div className="absolute top-full right-0 mt-2 w-48 bg-slate-600 rounded-md shadow-lg z-10">
                            <button onClick={() => handleAddSource('url')} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-500 rounded-t-md">URL du site</button>
                            <button onClick={() => handleAddSource('file')} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-500">Fichier (PDF, Docx)</button>
                            <input type="file" ref={fileInputRef} onChange={handleFileSelected} className="hidden" accept=".pdf,.doc,.docx,.txt" />
                            <button onClick={() => handleAddSource('text')} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-500 rounded-b-md">Texte brut</button>
                        </div>
                    )}
                </div>
            </div>

            {addingSourceType && (
                <div className="bg-slate-900/80 p-4 rounded-lg mb-4 border border-slate-700">
                    <label className="text-sm font-medium text-slate-300 mb-2 block">
                        {addingSourceType === 'url' ? 'Entrez l\'URL' : 'Collez le texte brut'}
                    </label>
                    {addingSourceType === 'url' ? (
                        <input
                            type="url"
                            value={sourceInputValue}
                            onChange={(e) => setSourceInputValue(e.target.value)}
                            placeholder="https://example.com"
                            autoFocus
                            className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    ) : (
                        <textarea
                            value={sourceInputValue}
                            onChange={(e) => setSourceInputValue(e.target.value)}
                            rows={5}
                            autoFocus
                            placeholder="Entrez ou collez votre texte ici..."
                            className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none custom-scrollbar"
                        />
                    )}
                    <div className="flex justify-end gap-2 mt-3">
                        <button
                            onClick={() => { setAddingSourceType(null); setSourceInputValue(''); }}
                            className="bg-slate-600 hover:bg-slate-500 text-xs font-semibold px-3 py-1.5 rounded-md"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={handleSaveSource}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-md"
                        >
                            Ajouter la source
                        </button>
                    </div>
                </div>
            )}

            <div className="space-y-3 bg-slate-900/50 rounded-lg p-3 min-h-[200px]">
                {formData.knowledge_base.length === 0 ? (
                    <div className="text-center text-slate-500 py-10">Aucune source de données ajoutée.</div>
                ) : (
                    formData.knowledge_base.map(item => (
                        <div key={item.id} className="flex items-center justify-between bg-slate-700 p-3 rounded-md">
                            <div className="flex items-center gap-3 overflow-hidden">
                                {item.type === 'url' && <LinkIcon className="w-5 h-5 text-slate-400 flex-shrink-0" />}
                                {item.type === 'file' && <DocumentTextIcon className="w-5 h-5 text-slate-400 flex-shrink-0" />}
                                {item.type === 'text' && <DocumentTextIcon className="w-5 h-5 text-slate-400 flex-shrink-0" />}
                                <span className="text-sm truncate" title={item.content}>{item.content}</span>
                            </div>
                            <div className="flex items-center gap-4 flex-shrink-0">
                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                    item.status === 'indexed' ? 'bg-green-500/20 text-green-400' : 
                                    item.status === 'processing' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                                }`}>{item.status}</span>
                                <button onClick={() => handleRemoveSource(item.id)} className="text-slate-400 hover:text-red-500"><TrashIcon className="w-5 h-5" /></button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
    
    const WidgetPreview = () => (
         <div className={`absolute ${formData.widget_config.position === 'bottom-right' ? 'bottom-4 right-4' : 'bottom-4 left-4'}`}>
            {/* Launcher Button */}
             <div 
                className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
                style={{ backgroundColor: formData.colors.primary }}
             >
                <ChatBubbleLeftRightIcon className="w-8 h-8" style={{ color: formData.colors.secondary }} />
            </div>
             {/* Chat Window */}
             <div className="absolute bottom-[80px] right-0 w-80 h-96 bg-slate-800 rounded-xl shadow-2xl flex flex-col overflow-hidden border border-slate-700">
                <header className="p-4 text-white flex items-center gap-3" style={{backgroundColor: formData.colors.primary}}>
                    {formData.avatar_url ? (
                        <img src={formData.avatar_url} alt="avatar" className="w-10 h-10 rounded-full" />
                    ) : (
                         <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center text-xl font-bold" style={{color: formData.colors.secondary}}>{formData.name.charAt(0)}</div>
                    )}
                    <div>
                        <h3 className="font-bold">{formData.widget_config.header_title}</h3>
                        <p className="text-xs opacity-80">We reply almost instantly</p>
                    </div>
                </header>
                <main className="flex-1 p-3 space-y-3 overflow-y-auto">
                    <div className="flex">
                         <div className="bg-slate-700 rounded-lg rounded-bl-none p-2 text-sm text-slate-200 max-w-xs">
                           {formData.widget_config.welcome_message}
                        </div>
                    </div>
                </main>
                <footer className="p-2 border-t border-slate-700">
                    <div className="relative">
                        <input type="text" placeholder="Type a message..." className="w-full bg-slate-700 rounded-lg p-2 pr-10 text-sm" disabled/>
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full" style={{backgroundColor: formData.colors.primary}} disabled>
                           <PaperAirplaneIconAlt className="w-5 h-5 transform rotate-90" style={{color: formData.colors.secondary}}/>
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );

    const renderWidgetEditor = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Titre de l'en-tête du widget</label>
                    <input
                        type="text"
                        name="header_title"
                        value={formData.widget_config.header_title}
                        onChange={handleWidgetConfigChange}
                        className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Message de bienvenue</label>
                    <textarea
                        name="welcome_message"
                        value={formData.widget_config.welcome_message}
                        onChange={handleWidgetConfigChange}
                        rows={3}
                        className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none custom-scrollbar"
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Position du Widget</label>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => handleWidgetPositionChange('bottom-right')}
                            className={`px-4 py-2 text-sm rounded-md border ${formData.widget_config.position === 'bottom-right' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-700 border-slate-600 hover:bg-slate-600'}`}>
                            En bas à droite
                        </button>
                         <button 
                            onClick={() => handleWidgetPositionChange('bottom-left')}
                            className={`px-4 py-2 text-sm rounded-md border ${formData.widget_config.position === 'bottom-left' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-700 border-slate-600 hover:bg-slate-600'}`}>
                            En bas à gauche
                        </button>
                    </div>
                </div>
            </div>
            <div className="relative bg-slate-900/50 rounded-lg min-h-[400px] overflow-hidden">
                <p className="text-center text-sm text-slate-400 p-2">Aperçu en direct</p>
                <WidgetPreview />
            </div>
        </div>
    );
    
    const renderTestAgent = () => (
        <div className="flex flex-col h-[500px] bg-slate-900/50 rounded-lg border border-slate-700">
            <div className="p-3 border-b border-slate-700 flex-shrink-0">
                <h3 className="text-base font-medium text-slate-300">Test Environment</h3>
                <p className="text-xs text-slate-400 mt-1">Chat with your agent to see how it responds with the current configuration.</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {testMessages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500">
                        <BotIcon className="w-12 h-12 mb-2" />
                        <p>Start the conversation by sending a message.</p>
                    </div>
                )}
                {testMessages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                 {isTesting && (
                    <div className="flex items-start gap-3 my-6 justify-start">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-500"><BotIcon className="w-5 h-5 text-slate-300" /></div>
                        <div className="flex flex-col items-start">
                             <div className="flex items-center gap-2"><span className="font-bold text-sm text-slate-300">{formData.name}</span><span className="text-xs text-slate-500">now</span></div>
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
            </div>
            <div className="flex-shrink-0">
                <ChatInput onSendMessage={handleTestSendMessage} isLoading={isTesting} />
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'identity':
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Nom du chatbot</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Ex: Assistant Client"
                                className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none custom-scrollbar"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Avatar du chatbot</label>
                            <div className="flex items-center gap-4">
                                {formData.avatar_url ? (
                                     <img src={formData.avatar_url} alt="avatar" className="w-16 h-16 rounded-full bg-slate-700 object-cover" />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center text-3xl font-bold text-slate-400">
                                        {formData.name.charAt(0) || '?'}
                                    </div>
                                )}
                                <div className="flex flex-col gap-2">
                                    <input 
                                        type="file" 
                                        ref={avatarInputRef} 
                                        onChange={handleAvatarChange} 
                                        accept="image/*" 
                                        className="hidden" 
                                    />
                                    <button 
                                        type="button"
                                        onClick={handleAvatarClick}
                                        className="bg-slate-700 hover:bg-slate-600 text-sm font-semibold px-4 py-2 rounded-md transition-colors"
                                    >
                                        📤 Télécharger une image
                                    </button>
                                    {formData.avatar_url && (
                                        <button 
                                            type="button"
                                            onClick={() => setFormData({...formData, avatar_url: ''})}
                                            className="bg-red-900/30 hover:bg-red-900/50 text-red-400 text-xs font-semibold px-4 py-1.5 rounded-md transition-colors"
                                        >
                                            Supprimer
                                        </button>
                                    )}
                                </div>
                            </div>
                            <p className="text-xs text-slate-400 mt-2">
                                Formats acceptés: JPG, PNG, GIF. Taille max: 2MB
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Couleurs de la marque</label>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                     <input type="color" value={formData.colors.primary} onChange={e => handleColorChange('primary', e.target.value)} className="w-8 h-8 rounded border-none bg-slate-700 cursor-pointer"/>
                                    <label className="text-sm">Couleur primaire</label>
                                </div>
                                <div className="flex items-center gap-2">
                                     <input type="color" value={formData.colors.secondary} onChange={e => handleColorChange('secondary', e.target.value)} className="w-8 h-8 rounded border-none bg-slate-700 cursor-pointer"/>
                                    <label className="text-sm">Couleur secondaire</label>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'prompts':
                 return (
                    <div>
                         <label className="block text-sm font-medium text-slate-300 mb-1">Prompt Système</label>
                         <p className="text-xs text-slate-400 mb-2">Définissez le rôle, la personnalité et les instructions principales de votre chatbot. C'est la base de son comportement.</p>
                         <textarea
                            name="system_prompt"
                            value={formData.system_prompt}
                            onChange={handleInputChange}
                            rows={15}
                            className="w-full bg-slate-900 border border-slate-600 rounded-md p-3 text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none custom-scrollbar"
                            placeholder="Ex: You are a friendly and helpful assistant for the D3Drone company..."
                         />
                    </div>
                );
            case 'knowledge':
                return renderKnowledgeBase();
            case 'widget':
                return renderWidgetEditor();
            case 'test':
                return renderTestAgent();
            case 'script':
                return (
                    <div>
                         <label className="block text-sm font-medium text-slate-300 mb-1">Script d'intégration</label>
                         <p className="text-xs text-slate-400 mb-2">Copiez et collez ce script dans la balise `&lt;body&gt;` de votre site web pour activer le chatbot.</p>
                         <div className="bg-slate-900 rounded-md p-4 relative">
                            <pre className="text-sm text-slate-300 custom-scrollbar overflow-x-auto">
                                <code>{getScript()}</code>
                            </pre>
                            <button onClick={handleCopy} className="absolute top-2 right-2 bg-slate-700 hover:bg-slate-600 text-xs font-semibold px-3 py-1 rounded-md">
                               {copied ? 'Copié!' : 'Copier'}
                            </button>
                         </div>
                    </div>
                );

            default:
                return <div className="text-center text-slate-500 py-10">Section en cours de développement...</div>
        }
    }


    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div 
                className="bg-slate-800 rounded-lg shadow-2xl w-full max-w-4xl flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-4 border-b border-slate-700 flex-shrink-0">
                    <h2 className="text-lg font-bold text-white">
                        {chatbot ? `Modifier ${chatbot.name}` : 'Créer un nouveau chatbot'}
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </header>
                <nav className="px-4 border-b border-slate-700 flex-shrink-0">
                    <div className="flex -mb-px">
                        <TabButton label="Identité" isActive={activeTab === 'identity'} onClick={() => setActiveTab('identity')} />
                        <TabButton label="Prompts" isActive={activeTab === 'prompts'} onClick={() => setActiveTab('prompts')} />
                        <TabButton label="Base de connaissance" isActive={activeTab === 'knowledge'} onClick={() => setActiveTab('knowledge')} />
                        <TabButton label="Widget" isActive={activeTab === 'widget'} onClick={() => setActiveTab('widget')} />
                        <TabButton label="Tester l'agent" Icon={BeakerIcon} isActive={activeTab === 'test'} onClick={() => setActiveTab('test')} />
                        <TabButton label="Script" isActive={activeTab === 'script'} onClick={() => setActiveTab('script')} />
                    </div>
                </nav>
                <main className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    {renderContent()}
                </main>
                <footer className="flex-shrink-0 flex items-center justify-end gap-3 p-4 bg-slate-800 border-t border-slate-700">
                    <button onClick={onClose} className="bg-slate-700 hover:bg-slate-600 text-sm font-semibold px-4 py-2 rounded-md">Annuler</button>
                    <button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-md">
                       {chatbot ? 'Enregistrer les modifications' : 'Enregistrer'}
                    </button>
                </footer>
            </div>
        </div>
    );
};
