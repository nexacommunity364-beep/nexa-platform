import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { useParams } from 'react-router-dom';
import { MessageBubble } from '../components/MessageBubble';
import { Send } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { MOCK_MESSAGES, MOCK_USERS } from '../data/mockData';
import { Message } from '../types';

export const RoomChat: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { currentUser } = useAppStore();

  const seedMessages = MOCK_MESSAGES.filter((m) => m.roomId === (roomId ?? 'room-1'));
  const [messages, setMessages] = useState<Message[]>(seedMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() && currentUser) {
      const message: Message = {
        id: `msg-${Date.now()}`,
        authorId: currentUser.id,
        roomId: roomId ?? 'room-1',
        content: newMessage,
        createdAt: new Date(),
        edited: false,
        reactions: [],
        attachments: [],
        mentions: [],
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-full max-w-4xl mx-auto">
        {/* Room Header */}
        <div className="p-4 border-b border-dark-700 flex items-center justify-between bg-dark-800">
          <div>
            <h1 className="text-xl font-bold text-white">Room #{roomId}</h1>
            <p className="text-sm text-gray-400">Community chat</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => {
            const author = MOCK_USERS.find((u) => u.id === message.authorId) ?? currentUser;
            return (
              <MessageBubble
                key={message.id}
                id={message.id}
                authorName={author?.displayName ?? 'Unknown'}
                authorAvatar={author?.avatar ?? ''}
                content={message.content}
                timestamp={message.createdAt}
                isOwn={message.authorId === currentUser?.id}
                edited={message.edited}
              />
            );
          })}
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p>No messages yet. Start the conversation! 💬</p>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-dark-700 bg-dark-800">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:border-nexa-500"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-nexa-600 hover:bg-nexa-700 text-white rounded-lg transition flex items-center gap-2"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
