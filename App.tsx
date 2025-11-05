
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import Dashboard from './views/Dashboard';
import ConversationsView from './views/ConversationsView';
import MyChatbots from './views/MyChatbots';
import MediaGallery from './views/MediaGallery';
import Analytics from './views/Analytics';
import SettingsView from './views/SettingsView';

export type View = 'dashboard' | 'conversations' | 'chatbots' | 'media' | 'analytics' | 'settings';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('conversations');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'conversations':
        return <ConversationsView />;
      case 'chatbots':
        return <MyChatbots />;
       case 'media':
         return <MediaGallery />;
       case 'analytics':
         return <Analytics />;
      case 'settings':
        return <SettingsView />;
      default:
        return <ConversationsView />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-300 font-sans">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {renderView()}
      </div>
    </div>
  );
};

export default App;