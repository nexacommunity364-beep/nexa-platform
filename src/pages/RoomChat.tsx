import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { useParams } from 'react-router-dom';
import { MessageBubble } from '../components/MessageBubble';
import { Send, Phone, Video, Info } from 'lucide-react';

interface Message {
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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      authorId: '1',
      authorName: 'John Doe',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      content: 'Hey everyone! How is everyone doing?',
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: '2',
      authorId: '2',
      authorName: 'Jane Smith',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      content: 'Doing great! Just working on the new project.',
      timestamp: new Date(Date.now() - 3000000),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        authorId: 'current-user',
        authorName: 'You',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
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
        {/* Room Header */}
        <div className="p-4 border-b border-dark-700 flex items-center justify-between bg-dark-800">
          <div>
            <h1 className="text-xl font-bold text-white">Room {roomId}</h1>
            <p className="text-sm text-gray-400">12 members online</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg hover:bg-dark-700 transition text-gray-400 hover:text-white">
              <Phone size={20} />
            </button>
            <button className="p-2 rounded-lg hover:bg-dark-700 transition text-gray-400 hover:text-white">
              <Video size={20} />
            </button>
            <button className="p-2 rounded-lg hover:bg-dark-700 transition text-gray-400 hover:text-white">
              <Info size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} {...message} />
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-dark-700 bg-dark-800">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
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
