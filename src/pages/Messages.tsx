import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import { Search, Plus, Send } from 'lucide-react';
import { MOCK_USERS } from '../data/mockData';

export const Messages: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState(MOCK_USERS[1]);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <MainLayout>
      <div className="h-full flex gap-0">
        {/* Conversations List */}
        <div className="w-80 bg-dark-800 border-r border-dark-700 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-dark-700">
            <h2 className="text-xl font-bold text-white mb-4">Messages</h2>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-nexa-500"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {MOCK_USERS.slice(1, 6).map((user) => (
              <button
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`w-full p-3 border-b border-dark-700 text-left transition ${
                  selectedUser.id === user.id
                    ? 'bg-dark-700 border-l-2 border-l-nexa-600'
                    : 'hover:bg-dark-700/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img src={user.avatar} alt={user.displayName} className="w-10 h-10 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white truncate">{user.displayName}</h4>
                    <p className="text-xs text-gray-500 truncate">Last message preview...</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-dark-800 border-b border-dark-700 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={selectedUser.avatar} alt={selectedUser.displayName} className="w-10 h-10 rounded-full" />
              <div>
                <h3 className="font-semibold text-white">{selectedUser.displayName}</h3>
                <p className="text-xs text-gray-500">@{selectedUser.username}</p>
              </div>
            </div>
            <Button variant="secondary" size="sm">Info</Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <p className="text-center text-gray-500 text-sm">No messages yet. Start a conversation!</p>
          </div>

          {/* Message Input */}
          <div className="bg-dark-800 border-t border-dark-700 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:border-nexa-500"
              />
              <Button onClick={() => setMessageInput('')}>
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
