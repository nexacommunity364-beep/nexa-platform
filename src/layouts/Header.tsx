import React, { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { Search, Bell, Settings, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentUser } = useAppStore();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="bg-dark-800 border-b border-dark-700 h-16 flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Left - Search */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search Nexa..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:border-nexa-500 transition text-sm"
          />
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-dark-700 transition text-gray-300 hover:text-white">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Settings */}
        <button className="p-2 rounded-lg hover:bg-dark-700 transition text-gray-300 hover:text-white hidden md:block">
          <Settings size={20} />
        </button>

        {/* User Avatar */}
        {currentUser && (
          <button className="flex items-center gap-2 p-1 rounded-lg hover:bg-dark-700 transition">
            <img
              src={currentUser.avatar}
              alt={currentUser.displayName}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium text-white hidden md:block truncate max-w-[120px]">
              {currentUser.displayName}
            </span>
          </button>
        )}

        {/* Mobile Menu */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden p-2 rounded-lg hover:bg-dark-700 transition text-gray-300 hover:text-white"
        >
          {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
};
