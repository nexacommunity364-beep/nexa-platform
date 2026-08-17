import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { useParams } from 'react-router-dom';
import { MessageBubble } from '../components/MessageBubble';
import { Send, Info, Pin } from 'lucide-react';
import { MOCK_MESSAGES, MOCK_ROOMS, MOCK_USERS } from '../data/mockData';
import { useAppStore } from '../store/appStore';

interface RoomMessage {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  timestamp: Date;
  edited?: boolean;
}

export const RoomChat: React.FC = () => {
  const { roomId } = useParams();
  const { currentUser } = useAppStore();
  const initialMessages = MOCK_MESSAGES
    .filter((message) => message.roomId === roomId)
    .map((message) => {
      const author = MOCK_USERS.find((user) => user.id === message.authorId);
      return {
        id: message.id,
        authorId: message.authorId,
        authorName: author?.displayName || 'Unknown',
        authorAvatar: author?.avatar || '',
        content: message.content,
        timestamp: message.createdAt,
        edited: message.edited,
      };
    });
  const [messages, setMessages] = useState<RoomMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const room = MOCK_ROOMS.find((item) => item.id === roomId);

  const handleSendMessage = () => {
    if (newMessage.trim() && currentUser) {
      const message: RoomMessage = {
        id: Date.now().toString(),
        authorId: currentUser.id,
        authorName: currentUser.displayName,
        authorAvatar: currentUser.avatar,
        content: newMessage,
        timestamp: new Date(),
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-full max-w-4xl mx-auto">
        <div className="p-4 border-b border-dark-700 flex items-center justify-between bg-dark-800">
          <div>
            <h1 className="text-xl font-bold text-white">{room?.name || 'Room'}</h1>
            <p className="text-sm text-gray-400">{room?.description || 'Community discussion space'}</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg hover:bg-dark-700 transition text-gray-400 hover:text-white">
              <Pin size={20} />
            </button>
            <button className="p-2 rounded-lg hover:bg-dark-700 transition text-gray-400 hover:text-white">
              <Info size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} {...message} />
          ))}
        </div>

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
