import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { InputField } from '../components/InputField';
import { MessageCircle, Plus } from 'lucide-react';
import { MOCK_USERS, MOCK_CONVERSATIONS } from '../data/mockData';
import { Link } from 'react-router-dom';

export const Messages: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  const filteredConversations = MOCK_CONVERSATIONS.filter((conv) =>
    MOCK_USERS.find((u) => u.id === conv.participantId)?.displayName
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const selectedConversation = MOCK_CONVERSATIONS.find(
    (c) => c.id === selectedConversationId
  );
  const selectedUser = selectedConversation
    ? MOCK_USERS.find((u) => u.id === selectedConversation.participantId)
    : null;

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* Conversations List */}
        <div className="w-80 bg-dark-800 border-r border-dark-700 flex flex-col">
          <div className="p-4 border-b border-dark-700 space-y-4">
            <h1 className="text-2xl font-bold text-white">Messages</h1>
            <InputField
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => {
              const user = MOCK_USERS.find((u) => u.id === conv.participantId);
              return (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversationId(conv.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition border-l-2 ${
                    selectedConversationId === conv.id
                      ? 'bg-dark-700 border-l-nexa-500'
                      : 'border-l-transparent hover:bg-dark-700/50'
                  }`}
                >
                  <img
                    src={user?.avatar}
                    alt={user?.displayName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1 text-left min-w-0">
                    <p className="font-semibold text-white truncate">
                      {user?.displayName}
                    </p>
                    <p className="text-sm text-gray-400 truncate">
                      {conv.lastMessage}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-dark-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedUser.avatar}
                    alt={selectedUser.displayName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-white">
                      {selectedUser.displayName}
                    </p>
                    <p className="text-xs text-gray-400">Online</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <p className="text-center text-gray-500 text-sm">No messages yet</p>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-dark-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:border-nexa-500"
                  />
                  <button className="px-4 py-2 bg-nexa-600 hover:bg-nexa-700 text-white rounded-lg transition">
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};
