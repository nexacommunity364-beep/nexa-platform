import React, { useState } from 'react';
import { Bell, Search, Moon, Sun, User, LogOut, Settings } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { MOCK_CURRENT_USER } from '../data/mockData';

export const TopNavigation: React.FC = () => {
  const [isDark, setIsDark] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setCurrentUser } = useAppStore();

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-dark-800 border-b border-dark-700 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search users, communities..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:border-nexa-500 transition"
          />
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-4 ml-4">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-dark-700 transition text-gray-300 hover:text-white"
          title="Toggle theme"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-dark-700 transition text-gray-300 hover:text-white">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-dark-700 transition"
          >
            <img
              src={MOCK_CURRENT_USER.avatar}
              alt={MOCK_CURRENT_USER.displayName}
              className="w-8 h-8 rounded-full"
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-dark-800 border border-dark-700 rounded-lg shadow-xl py-2 animate-fade-in">
              <div className="px-4 py-2 border-b border-dark-700">
                <p className="font-semibold text-white">{MOCK_CURRENT_USER.displayName}</p>
                <p className="text-xs text-gray-400">@{MOCK_CURRENT_USER.username}</p>
              </div>
              <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-dark-700 transition text-sm">
                <User size={18} />
                Profile
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-dark-700 transition text-sm">
                <Settings size={18} />
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 transition text-sm border-t border-dark-700 mt-2"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
