
import React from 'react';
import type { View } from '../App';
import {
  DashboardIcon,
  ConversationsIcon,
  BotIcon,
  MediaIcon,
  AnalyticsIcon,
  SettingsIcon,
  UserIcon,
} from './IconComponents';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

// FIX: Changed NavItem to use React.FC and a props interface to correctly type the component for React.
// This prevents TypeScript from misinterpreting the special 'key' prop as a regular component prop.
interface NavItemProps {
  view: View;
  label: string;
  Icon: React.ElementType;
  currentView: View;
  setCurrentView: (view: View) => void;
}

const NavItem: React.FC<NavItemProps> = ({
  view,
  label,
  Icon,
  currentView,
  setCurrentView,
}) => (
  <li>
    <button
      onClick={() => setCurrentView(view)}
      aria-label={label}
      data-tooltip-id="nav-tooltip"
      data-tooltip-content={label}
      className={`flex items-center justify-center w-12 h-12 rounded-lg transition-colors duration-200 ${
        currentView === view
          ? 'bg-blue-600 text-white'
          : 'text-slate-400 hover:bg-slate-700 hover:text-white'
      }`}
    >
      <Icon className="w-6 h-6" />
    </button>
  </li>
);

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  // FIX: Use 'as const' to ensure TypeScript infers the correct literal types for 'view'.
  const navItems = [
    { view: 'dashboard', label: 'Dashboard', Icon: DashboardIcon },
    { view: 'conversations', label: 'Conversations', Icon: ConversationsIcon },
    { view: 'chatbots', label: 'My Chatbots', Icon: BotIcon },
    { view: 'media', label: 'Media Gallery', Icon: MediaIcon },
    { view: 'analytics', label: 'Analytics', Icon: AnalyticsIcon },
  ] as const;

  // FIX: Moved settings to a separate array to be mapped, resolving the type error.
  // FIX: Use 'as const' to ensure TypeScript infers the correct literal types for 'view'.
  const bottomNavItems = [{ view: 'settings', label: 'Settings', Icon: SettingsIcon }] as const;


  return (
    <aside className="flex flex-col items-center w-20 p-2 bg-slate-800 border-r border-slate-700">
      <div className="p-2 mb-4">
        <BotIcon className="w-10 h-10 text-blue-500" />
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {/* FIX: Explicitly pass props to NavItem to avoid spreading `key` prop issue. */}
          {navItems.map((item) => (
            <NavItem
              key={item.view}
              view={item.view}
              label={item.label}
              Icon={item.Icon}
              currentView={currentView}
              setCurrentView={setCurrentView}
            />
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
         <ul className="space-y-2">
            {bottomNavItems.map((item) => (
                <NavItem
                    key={item.view}
                    view={item.view}
                    label={item.label}
                    Icon={item.Icon}
                    currentView={currentView}
                    setCurrentView={setCurrentView}
                />
             ))}
         </ul>
         <div className="mt-4">
            <button className="w-12 h-12 rounded-full">
                <img src="https://i.pravatar.cc/48?u=agent" alt="User Avatar" className="rounded-full" />
            </button>
         </div>
      </div>
    </aside>
  );
};
