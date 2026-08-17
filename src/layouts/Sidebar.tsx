import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import {
  Home,
  MessageSquare,
  Users,
  Compass,
  Bell,
  Settings,
  HelpCircle,
  Shield,
  Zap,
  LogOut,
  Plus,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { currentUser } = useAppStore();

  const isActive = (path: string) => location.pathname === path;

  const mainLinks = [
    { path: '/home', label: 'Home', icon: Home },
    { path: '/friends', label: 'Friends', icon: Users },
    { path: '/messages', label: 'Messages', icon: MessageSquare },
    { path: '/communities', label: 'Communities', icon: Zap },
    { path: '/discover', label: 'Discover', icon: Compass },
  ];

  const secondaryLinks = [
    { path: '/notifications', label: 'Notifications', icon: Bell },
    { path: '/premium', label: 'Premium', icon: Zap },
    { path: '/support', label: 'Support', icon: HelpCircle },
    { path: '/reports', label: 'Reports', icon: Shield },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-72 bg-dark-800 border-r border-dark-700 flex flex-col overflow-hidden">
      {/* Logo */}
      <div className="p-6 border-b border-dark-700">
        <Link to="/home" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-nexa-500 to-nexa-700 rounded-lg flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-nexa-500/50">
            N
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-nexa-400 to-nexa-600 bg-clip-text text-transparent">Nexa</span>
        </Link>
      </div>

      {/* Main Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
        <div className="space-y-1 mb-6">
          {mainLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
                  isActive(link.path)
                    ? 'bg-nexa-600 text-white'
                    : 'text-gray-300 hover:bg-dark-700'
                }`}
              >
                <Icon size={20} />
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="border-t border-dark-700 pt-4 space-y-1">
          {secondaryLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
                  isActive(link.path)
                    ? 'bg-nexa-600 text-white'
                    : 'text-gray-300 hover:bg-dark-700'
                }`}
              >
                <Icon size={20} />
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Profile */}
      <div className="border-t border-dark-700 p-4 space-y-3">
        <Link
          to="/profile"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-dark-700 transition"
        >
          {currentUser && (
            <>
              <img
                src={currentUser.avatar}
                alt={currentUser.displayName}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm truncate">{currentUser.displayName}</p>
                <p className="text-xs text-gray-400 truncate">@{currentUser.username}</p>
              </div>
            </>
          )}
        </Link>
        <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition font-medium text-sm">
          <LogOut size={16} />
          Log Out
        </button>
      </div>
    </aside>
  );
};
