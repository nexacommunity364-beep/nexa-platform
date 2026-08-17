import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { useAppStore } from '../store/appStore';
import { MOCK_USERS, MOCK_FRIENDS } from '../data/mockData';
import { Button } from '../components/Button';
import { FriendCard } from '../components/FriendCard';
import { Users, UserPlus, UserX, Search } from 'lucide-react';

export const Friends: React.FC = () => {
  const { friends } = useAppStore();
  const [activeTab, setActiveTab] = useState<'online' | 'all' | 'pending' | 'blocked'>('online');
  const [searchQuery, setSearchQuery] = useState('');

  const onlineFriends = MOCK_USERS.filter((u) => u.id !== 'user-1' && u.onlineStatus === 'online');
  const allFriends = MOCK_USERS.filter((u) => u.id !== 'user-1');
  const pendingRequests = [];
  const blockedUsers = [];

  const tabs = [
    { id: 'online', label: `Online (${onlineFriends.length})`, icon: Users },
    { id: 'all', label: `All Friends (${allFriends.length})`, icon: Users },
    { id: 'pending', label: `Pending (${pendingRequests.length})`, icon: UserPlus },
    { id: 'blocked', label: `Blocked (${blockedUsers.length})`, icon: UserX },
  ];

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Friends</h1>
          <p className="text-gray-400">Manage and connect with your friends</p>
        </div>

        {/* Search & Add */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:border-nexa-500 transition"
            />
          </div>
          <Button>
            <UserPlus size={20} />
            Add Friend
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-dark-700 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 font-medium transition border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-nexa-400 border-nexa-500'
                  : 'text-gray-400 border-transparent hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeTab === 'online' &&
            onlineFriends.map((friend) => <FriendCard key={friend.id} userId={friend.id} />)}
          {activeTab === 'all' &&
            allFriends.map((friend) => <FriendCard key={friend.id} userId={friend.id} />)}
          {activeTab === 'pending' && (
            <div className="col-span-full text-center py-12">
              <Users size={48} className="mx-auto text-gray-500 mb-4" />
              <p className="text-gray-400">No pending friend requests</p>
            </div>
          )}
          {activeTab === 'blocked' && (
            <div className="col-span-full text-center py-12">
              <UserX size={48} className="mx-auto text-gray-500 mb-4" />
              <p className="text-gray-400">You haven't blocked anyone</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};
