import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { InputField } from '../components/InputField';
import { FriendCard } from '../components/FriendCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/Tabs';
import { MOCK_USERS } from '../data/mockData';

export const Friends: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('friends');

  const filteredUsers = MOCK_USERS.filter((user) =>
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
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="friends">Friends ({MOCK_USERS.length})</TabsTrigger>
            <TabsTrigger value="requests">Requests (3)</TabsTrigger>
            <TabsTrigger value="blocked">Blocked (2)</TabsTrigger>
          </TabsList>

          <TabsContent value="friends" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.map((user) => (
                <FriendCard key={user.id} userId={user.id} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 text-center text-gray-400">
              <p>No pending friend requests</p>
            </div>
          </TabsContent>

          <TabsContent value="blocked" className="space-y-4">
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 text-center text-gray-400">
              <p>You haven't blocked anyone</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};