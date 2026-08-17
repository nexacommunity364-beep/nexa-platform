import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { InputField } from '../components/InputField';
import { MessageBubble } from '../components/MessageBubble';
import { Send, Plus } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export const Messages: React.FC = () => {
  const { userId } = useParams();
  const { currentUser, users, directMessages, addDirectMessage } = useAppStore();
  const availableUsers = useMemo(
    () => users.filter((user) => user.id !== currentUser?.id),
    [users, currentUser?.id]
  );
  const [selectedUserId, setSelectedUserId] = useState<string | null>(userId || availableUsers[0]?.id || null);
  const [messageContent, setMessageContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = availableUsers.filter((user) =>
    user.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedUser = users.find((user) => user.id === selectedUserId);
  const userMessages = selectedUserId
    ? directMessages.filter(
        (message) =>
          currentUser &&
          ((message.senderId === selectedUserId && message.recipientId === currentUser.id) ||
            (message.senderId === currentUser.id && message.recipientId === selectedUserId))
      )
    : [];

  const handleSendMessage = () => {
    if (messageContent.trim() && selectedUserId && currentUser) {
      addDirectMessage({
        id: Date.now().toString(),
        senderId: currentUser.id,
        recipientId: selectedUserId,
        content: messageContent,
        createdAt: new Date(),
        edited: false,
        reactions: [],
        attachments: [],
      });
      setMessageContent('');
    }
  };

  return (
    <MainLayout>
      <div className="flex h-screen bg-dark-900">
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

          <div className="flex-1 overflow-y-auto space-y-1 p-2">
            {filteredUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => setSelectedUserId(user.id)}
                className={`w-full p-3 rounded-lg transition text-left ${
                  selectedUserId === user.id
                    ? 'bg-nexa-600'
                    : 'hover:bg-dark-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">
                      {user.displayName}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {user.onlineStatus === 'online' ? 'Online now' : 'Tap to open chat'}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {selectedUser ? (
            <>
              <div className="h-16 bg-dark-800 border-b border-dark-700 flex items-center justify-between px-6">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedUser.avatar}
                    alt={selectedUser.displayName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-white">{selectedUser.displayName}</p>
                    <p className="text-xs text-gray-400">
                      {selectedUser.onlineStatus === 'online' ? 'Online' : selectedUser.onlineStatus}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4 flex flex-col justify-end">
                {userMessages.map((message) => {
                  const author = users.find((user) => user.id === message.senderId);
                  return (
                    <MessageBubble
                      key={message.id}
                      id={message.id}
                      authorName={author?.displayName || 'Unknown'}
                      authorAvatar={author?.avatar || ''}
                      content={message.content}
                      timestamp={message.createdAt}
                      isOwn={message.senderId === currentUser?.id}
                    />
                  );
                })}
                {messageContent && (
                  <p className="text-xs text-gray-500">
                    Typing preview ready — send to deliver this demo message instantly.
                  </p>
                )}
              </div>

              <div className="bg-dark-800 border-t border-dark-700 p-4 space-y-3">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === 'Enter' && handleSendMessage()
                    }
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
