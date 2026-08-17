import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, MessageSquare, Users, Bell, User, Settings, LogOut, Menu, X } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { MOCK_CURRENT_USER } from '../data/mockData';

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { setCurrentUser } = useAppStore();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Compass, label: 'Discover', path: '/discover' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: Users, label: 'Communities', path: '/communities' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <>
      {/* Mobile menu toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-dark-800 hover:bg-dark-700 transition"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative w-64 h-screen bg-gradient-to-b from-dark-800 to-dark-900 border-r border-dark-700 flex flex-col transition-all duration-300 z-40 ${
          isOpen ? 'left-0' : '-left-64 md:left-0'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-dark-700">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-nexa-500 to-nexa-700 rounded-lg flex items-center justify-center font-bold text-xl group-hover:shadow-lg group-hover:shadow-nexa-500/50 transition">
              N
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-nexa-400 to-nexa-600 bg-clip-text text-transparent">Nexa</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                  active
                    ? 'bg-nexa-600 text-white shadow-lg shadow-nexa-600/30'
                    : 'text-gray-300 hover:bg-dark-700 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile Card */}
        <div className="p-4 border-t border-dark-700">
          <Link
            to="/profile"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-dark-700 transition group mb-2"
          >
            <img
              src={MOCK_CURRENT_USER.avatar}
              alt={MOCK_CURRENT_USER.displayName}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{MOCK_CURRENT_USER.displayName}</p>
              <p className="text-xs text-gray-400 truncate">@{MOCK_CURRENT_USER.username}</p>
            </div>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg font-medium transition text-sm"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
