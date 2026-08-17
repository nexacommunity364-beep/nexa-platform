import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { InputField } from '../components/InputField';
import { MessageBubble } from '../components/MessageBubble';
import { Send, Plus } from 'lucide-react';
import { MOCK_USERS, MOCK_DIRECT_MESSAGES } from '../data/mockData';
import { useAppStore } from '../store/appStore';
import { DirectMessage } from '../types';

export const Messages: React.FC = () => {
  const { currentUser, directMessages, addDirectMessage } = useAppStore();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(
    MOCK_USERS.find((u) => u.id !== currentUser?.id)?.id ?? null
  );
  const [messageContent, setMessageContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Seed store with mock DMs if empty
  const allMessages: DirectMessage[] = [
    ...MOCK_DIRECT_MESSAGES,
    ...directMessages,
  ];

  const otherUsers = MOCK_USERS.filter((u) => u.id !== currentUser?.id);

  const filteredUsers = otherUsers.filter((user) =>
    user.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedUser = MOCK_USERS.find((u) => u.id === selectedUserId);

  const conversation = selectedUserId && currentUser
    ? allMessages.filter(
        (msg) =>
          (msg.senderId === currentUser.id && msg.recipientId === selectedUserId) ||
          (msg.senderId === selectedUserId && msg.recipientId === currentUser.id)
      )
    : [];

  const handleSendMessage = () => {
    if (messageContent.trim() && selectedUserId && currentUser) {
      const newMsg: DirectMessage = {
        id: `dm-${Date.now()}`,
        senderId: currentUser.id,
        recipientId: selectedUserId,
        content: messageContent,
        createdAt: new Date(),
        edited: false,
        reactions: [],
        attachments: [],
      };
      addDirectMessage(newMsg);
      setMessageContent('');
    }
  };

  return (
    <MainLayout>
      <div className="flex h-full bg-dark-900">
        {/* Conversations List */}
        <div className="w-80 bg-dark-800 border-r border-dark-700 flex flex-col">
          <div className="p-4 border-b border-dark-700 space-y-3">
            <h2 className="text-xl font-bold text-white">Messages</h2>
            <InputField
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={setSearchQuery}
            />
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-nexa-600 hover:bg-nexa-700 text-white transition font-medium text-sm">
              <Plus size={16} />
              New Message
            </button>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto space-y-1 p-2">
            {filteredUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => setSelectedUserId(user.id)}
                className={`w-full p-3 rounded-lg transition text-left ${
                  selectedUserId === user.id ? 'bg-nexa-600' : 'hover:bg-dark-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">{user.displayName}</p>
                    <p className="text-xs text-gray-400 truncate">@{user.username}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="h-16 bg-dark-800 border-b border-dark-700 flex items-center px-6 gap-3">
                <img
                  src={selectedUser.avatar}
                  alt={selectedUser.displayName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold text-white">{selectedUser.displayName}</p>
                  <p className="text-xs text-gray-400">@{selectedUser.username}</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {conversation.map((message) => {
                  const author = MOCK_USERS.find((u) => u.id === message.senderId);
                  return (
                    <MessageBubble
                      key={message.id}
                      id={message.id}
                      authorName={author?.displayName ?? 'Unknown'}
                      authorAvatar={author?.avatar ?? ''}
                      content={message.content}
                      timestamp={message.createdAt}
                      isOwn={message.senderId === currentUser?.id}
                      edited={message.edited}
                    />
                  );
                })}
                {conversation.length === 0 && (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <p>No messages yet. Say hello! 👋</p>
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="bg-dark-800 border-t border-dark-700 p-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:border-nexa-500 transition"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 rounded-lg bg-nexa-600 hover:bg-nexa-700 text-white transition font-medium flex items-center gap-2"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <p>Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};
