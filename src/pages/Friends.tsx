import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { InputField } from '../components/InputField';
import { FriendCard } from '../components/FriendCard';
import { Tabs } from '../components/Tabs';
import { MOCK_USERS } from '../data/mockData';

const TABS = [
  { id: 'friends', label: 'Friends' },
  { id: 'requests', label: 'Requests (3)' },
  { id: 'blocked', label: 'Blocked (2)' },
];

export const Friends: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('friends');

  const filteredUsers = MOCK_USERS.filter(
    (user) =>
      user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Friends</h1>
          <p className="text-gray-400">Manage your friends and connections</p>
        </div>

        {/* Search */}
        <InputField
          placeholder="Search friends..."
          value={searchQuery}
          onChange={setSearchQuery}
        />

        {/* Tabs */}
        <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

        {/* Content */}
        {activeTab === 'friends' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map((user) => (
              <FriendCard key={user.id} userId={user.id} />
            ))}
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 text-center text-gray-400">
            <p>No pending friend requests</p>
          </div>
        )}

        {activeTab === 'blocked' && (
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 text-center text-gray-400">
            <p>You haven't blocked anyone</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
