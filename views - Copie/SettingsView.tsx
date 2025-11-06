import React, { useState, useRef } from 'react';
import { userSettings as initialUserSettings } from '../data';
import type { UserSettings } from '../types';
import { UserCircleIcon, Cog6ToothIcon, CreditCardIcon, UsersIcon, ChevronRightIcon } from '../components/IconComponents';
import { ToggleSwitch } from '../components/ToggleSwitch';

type SettingsSection = 'profile' | 'preferences' | 'billing' | 'team';

const SettingsNav: React.FC<{
    activeSection: SettingsSection;
    onSelectSection: (section: SettingsSection) => void;
}> = ({ activeSection, onSelectSection }) => {
    
    const navItems = [
        { id: 'profile', label: 'Profil', Icon: UserCircleIcon },
        { id: 'preferences', label: 'Préférences', Icon: Cog6ToothIcon },
        { id: 'billing', label: 'Facturation', Icon: CreditCardIcon },
        { id: 'team', label: 'Membres de l\'équipe', Icon: UsersIcon },
    ] as const;
    
    return (
        <nav className="flex flex-col gap-1">
            {navItems.map(item => (
                <button
                    key={item.id}
                    onClick={() => onSelectSection(item.id)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeSection === item.id 
                        ? 'bg-slate-700 text-white' 
                        : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                    }`}
                >
                    <item.Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    <ChevronRightIcon className="w-4 h-4 ml-auto" />
                </button>
            ))}
        </nav>
    );
};

const ProfileSettings: React.FC<{
    settings: UserSettings;
    onUpdate: (field: string, value: any) => void;
}> = ({ settings, onUpdate }) => {
    
    const avatarInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarClick = () => {
        avatarInputRef.current?.click();
    };
    
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                onUpdate('avatar_url', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="bg-slate-800 rounded-lg">
             <div className="p-6 border-b border-slate-700">
                <h3 className="text-lg font-semibold text-white">Profil public</h3>
                <p className="text-sm text-slate-400 mt-1">Ces informations seront affichées publiquement.</p>
            </div>
            <div className="p-6 space-y-6">
                 <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Photo de profil</label>
                    <div className="flex items-center gap-4">
                        <img src={settings.profile.avatar_url} alt="Avatar" className="w-16 h-16 rounded-full" />
                        <input type="file" ref={avatarInputRef} onChange={handleAvatarChange} className="hidden" accept="image/*" />
                        <button onClick={handleAvatarClick} className="bg-slate-700 hover:bg-slate-600 text-sm font-semibold px-4 py-2 rounded-md">Changer</button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Nom complet</label>
                        <input type="text" id="name" value={settings.profile.name} onChange={(e) => onUpdate('name', e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Adresse e-mail</label>
                        <input type="email" id="email" value={settings.profile.email} onChange={(e) => onUpdate('email', e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                </div>
                 <div>
                    <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">Titre / Rôle</label>
                    <input type="text" id="title" value={settings.profile.title} onChange={(e) => onUpdate('title', e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
            </div>
            <div className="p-6 bg-slate-800/50 rounded-b-lg text-right">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md text-sm">Mettre à jour le profil</button>
            </div>
        </div>
    );
};

const PreferencesSettings: React.FC<{
    settings: UserSettings;
    onUpdate: (field: keyof UserSettings['preferences'], value: any) => void;
}> = ({ settings, onUpdate }) => {
    
    const handleNotificationChange = (key: keyof UserSettings['preferences']['notifications'], value: boolean) => {
        onUpdate('notifications', { ...settings.preferences.notifications, [key]: value });
    };

    return (
        <div className="bg-slate-800 rounded-lg">
            <div className="p-6 border-b border-slate-700">
                <h3 className="text-lg font-semibold text-white">Préférences</h3>
                <p className="text-sm text-slate-400 mt-1">Gérez les paramètres de votre compte et de l'application.</p>
            </div>
            <div className="p-6 space-y-8">
                <div>
                    <h4 className="text-base font-medium text-slate-200 mb-2">Langue</h4>
                    <select
                        value={settings.preferences.language}
                        onChange={(e) => onUpdate('language', e.target.value)}
                        className="bg-slate-700 border border-slate-600 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                    </select>
                </div>
                 <div>
                    <h4 className="text-base font-medium text-slate-200 mb-3">Notifications</h4>
                    <div className="space-y-4">
                        <ToggleSwitch label="Recevoir une notification pour un nouveau message" enabled={settings.preferences.notifications.new_message} onChange={val => handleNotificationChange('new_message', val)} />
                        <ToggleSwitch label="Recevoir une notification lorsqu'une conversation vous est assignée" enabled={settings.preferences.notifications.conversation_assigned} onChange={val => handleNotificationChange('conversation_assigned', val)} />
                        <ToggleSwitch label="Recevoir un résumé hebdomadaire par e-mail" enabled={settings.preferences.notifications.weekly_summary} onChange={val => handleNotificationChange('weekly_summary', val)} />
                    </div>
                </div>
            </div>
            <div className="p-6 bg-slate-800/50 rounded-b-lg text-right">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md text-sm">Sauvegarder les préférences</button>
            </div>
        </div>
    );
};


const SettingsView: React.FC = () => {
    const [activeSection, setActiveSection] = useState<SettingsSection>('profile');
    const [settings, setSettings] = useState<UserSettings>(initialUserSettings);

    const handleProfileUpdate = (field: string, value: any) => {
        setSettings(prev => ({
            ...prev,
            profile: { ...prev.profile, [field]: value }
        }));
    };

    const handlePreferencesUpdate = (field: keyof UserSettings['preferences'], value: any) => {
        setSettings(prev => ({
            ...prev,
            preferences: { ...prev.preferences, [field]: value }
        }));
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'profile':
                return <ProfileSettings settings={settings} onUpdate={handleProfileUpdate} />;
            case 'preferences':
                return <PreferencesSettings settings={settings} onUpdate={handlePreferencesUpdate} />;
            default:
                return (
                     <div className="bg-slate-800 rounded-lg p-10 text-center">
                        <h3 className="text-lg font-semibold text-white">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h3>
                        <p className="text-sm text-slate-400 mt-2">Cette section est en cours de construction.</p>
                    </div>
                );
        }
    }
    
    return (
        <div className="flex flex-col h-full bg-slate-900">
            <header className="flex-shrink-0 p-4 bg-slate-800/50 border-b border-slate-700">
                <h1 className="text-xl font-bold text-white">Paramètres</h1>
            </header>
            <main className="flex-1 overflow-y-auto custom-scrollbar p-6">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <SettingsNav activeSection={activeSection} onSelectSection={setActiveSection} />
                    </div>
                    <div className="md:col-span-3">
                        {renderSection()}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SettingsView;
