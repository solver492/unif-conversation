
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import Dashboard from './views/Dashboard';
import ConversationsView from './views/ConversationsView';
import MyChatbots from './views/MyChatbots';
import MediaGallery from './views/MediaGallery';
import Analytics from './views/Analytics';
import SettingsView from './views/SettingsView';
import SupabaseTest from './views/SupabaseTest';
import { NotificationContainer, type Notification } from './components/NotificationToast';

export type View = 'dashboard' | 'conversations' | 'chatbots' | 'media' | 'analytics' | 'settings' | 'supabase-test';

const App: React.FC = () => {
const [currentView, setCurrentView] = useState<View>('conversations');  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString()
    };
    setNotifications(prev => [...prev, newNotification]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'conversations':
        return <ConversationsView addNotification={addNotification} />;
      case 'chatbots':
        return <MyChatbots addNotification={addNotification} />;
       case 'media':
         return <MediaGallery />;
       case 'analytics':
         return <Analytics />;
      case 'settings':
        return <SettingsView />;
      case 'supabase-test':
        return <SupabaseTest />;
      default:
        return <ConversationsView addNotification={addNotification} />;
    }
  };

  // Simuler l'arrivée d'un nouveau visiteur avec agent spécifique (pour démonstration)
  React.useEffect(() => {
    const timer1 = setTimeout(() => {
      addNotification({
        type: 'new_visitor',
        title: '🤖 D3Drone Support - Nouveau client!',
        message: 'Maria Garcia de Madrid, Espagne a démarré une conversation',
        duration: 10000
      });
    }, 5000);

    const timer2 = setTimeout(() => {
      addNotification({
        type: 'new_message',
        title: '💬 MonAuxiliaire Assistant',
        message: 'Nouveau message de Jean Dupont',
        duration: 6000
      });
    }, 12000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="flex h-screen bg-slate-900 text-slate-300 font-sans">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {renderView()}
      </div>
      <NotificationContainer notifications={notifications} onClose={removeNotification} />
    </div>
  );
};

export default App;