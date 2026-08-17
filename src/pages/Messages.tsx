import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { useAppStore } from '../store/appStore';
import { MOCK_USERS, MOCK_DIRECT_MESSAGES } from '../data/mockData';
import { Button } from '../components/Button';
import { MessageBubble } from '../components/MessageBubble';
import { MessageSquare, Plus, Search, Send, PaperclipIcon, SmileIcon } from 'lucide-react';

export const Messages: React.FC = () => {
  const { users } = useAppStore();
  const [selectedUserId, setSelectedUserId] = useState<string | null>('user-2');
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState(MOCK_DIRECT_MESSAGES);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedUser = selectedUserId ? users.find((u) => u.id === selectedUserId) : null;

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedUserId) {
      const newMessage = {
        id: `dm-${Date.now()}`,
        senderId: 'user-1',
        recipientId: selectedUserId,
        content: messageInput,
        createdAt: new Date(),
        edited: false,
        reactions: [],
        attachments: [],
      };
      setMessages([...messages, newMessage]);
      setMessageInput('');
    }
  };

  const otherUsers = users.filter((u) => u.id !== 'user-1');

  return (
    <MainLayout>
      <div className="flex h-full bg-dark-900">
        {/* Conversations List */}
        <div className="w-full md:w-80 border-r border-dark-700 flex flex-col bg-dark-800">
          {/* Header */}
          <div className="p-4 border-b border-dark-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Messages</h2>
              <button className="p-2 rounded-lg hover:bg-dark-700 transition text-gray-300 hover:text-white">
                <Plus size={20} />
              </button>
            </div>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:border-nexa-500 transition"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {otherUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => setSelectedUserId(user.id)}
                className={`w-full flex items-center gap-3 p-3 transition border-l-4 ${
                  selectedUserId === user.id
                    ? 'bg-dark-700 border-nexa-500'
                    : 'hover:bg-dark-700 border-transparent'
                }`}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={user.avatar}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full"
                  />
                  {user.onlineStatus === 'online' && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-dark-800"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="font-semibold text-white truncate">{user.displayName}</p>
                  <p className="text-xs text-gray-400 truncate">@{user.username}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat */}
        {selectedUser ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="bg-dark-800 border-b border-dark-700 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedUser.avatar}
                  alt={selectedUser.displayName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold text-white">{selectedUser.displayName}</p>
                  <p className="text-xs text-gray-400 capitalize">
                    {selectedUser.onlineStatus === 'dnd' ? 'Do Not Disturb' : selectedUser.onlineStatus}
                  </p>
                </div>
              </div>
              <button className="p-2 rounded-lg hover:bg-dark-700 transition text-gray-300 hover:text-white">
                <MessageSquare size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg) => {
                const msgUser = users.find((u) => u.id === msg.senderId);
                return (
                  <MessageBubble
                    key={msg.id}
                    id={msg.id}
                    authorName={msgUser?.displayName || 'Unknown'}
                    authorAvatar={msgUser?.avatar || ''}
                    content={msg.content}
                    timestamp={msg.createdAt}
                    isOwn={msg.senderId === 'user-1'}
                  />
                );
              })}
            </div>

            {/* Input */}
            <div className="bg-dark-800 border-t border-dark-700 p-4">
              <div className="flex items-center gap-2 bg-dark-700 rounded-lg px-4 py-2">
                <button className="text-gray-400 hover:text-white transition">
                  <PaperclipIcon size={20} />
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500"
                />
                <button className="text-gray-400 hover:text-white transition">
                  <SmileIcon size={20} />
                </button>
                <button
                  onClick={handleSendMessage}
                  className="text-nexa-400 hover:text-nexa-300 transition"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare size={48} className="mx-auto text-gray-500 mb-4" />
              <p className="text-gray-400">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
