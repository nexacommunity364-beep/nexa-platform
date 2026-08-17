import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { FriendCard } from '../components/FriendCard';
import { InputField } from '../components/InputField';
import { Search } from 'lucide-react';
import { MOCK_USERS } from '../data/mockData';

export const Friends: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tab, setTab] = useState<'friends' | 'requests' | 'blocked'>('friends');

  const filteredFriends = MOCK_USERS.filter((user) =>
    user.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-white mb-6">Friends</h1>

        {/* Search */}
        <div className="mb-6">
          <InputField
            placeholder="Search friends..."
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-dark-700">
          {(['friends', 'requests', 'blocked'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 font-medium capitalize transition ${
                tab === t
                  ? 'text-nexa-400 border-b-2 border-nexa-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Friends Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFriends.map((friend) => (
            <FriendCard key={friend.id} userId={friend.id} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};
