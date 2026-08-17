import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { FriendCard } from '../components/FriendCard';
import { InputField } from '../components/InputField';
import { Search, Users, UserPlus } from 'lucide-react';
import { MOCK_USERS } from '../data/mockData';

export const Friends: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'suggestions'>('friends');

  const filteredFriends = MOCK_USERS.filter((user) =>
    user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Friends</h1>
          <p className="text-gray-400">Connect with people in your network</p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:border-nexa-500"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-dark-700 pb-4">
          {['friends', 'requests', 'suggestions'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-lg transition ${
                activeTab === tab
                  ? 'bg-nexa-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Friends Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFriends.slice(0, 9).map((user) => (
            <FriendCard key={user.id} userId={user.id} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};
