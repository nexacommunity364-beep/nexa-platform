import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { MessageSquare, Send, MoreVertical, Pin, Trash2, Flag, Reply } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export const RoomChat: React.FC<{ roomId?: string; roomName?: string }> = ({
  roomId = 'room-1',
  roomName = 'General',
}) => {
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      author: 'Alex',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      content: 'Hey everyone! Just joined this community 🚀',
      timestamp: new Date(Date.now() - 30 * 60000),
      reactions: [{ emoji: '👋', count: 3 }],
    },
    {
      id: 'msg-2',
      author: 'You',
      avatar: 'https://images.unsplash.com/photo-1535713566543-29f8c963277d?w=400&h=400&fit=crop',
      content: 'Welcome to the community! Feel free to introduce yourself',
      timestamp: new Date(Date.now() - 25 * 60000),
      reactions: [],
      isOwn: true,
    },
    {
      id: 'msg-3',
      author: 'Sam',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      content: 'This is awesome! Love the community vibes here ✨',
      timestamp: new Date(Date.now() - 10 * 60000),
      reactions: [{ emoji: '❤️', count: 2 }],
    },
  ]);
  const [messageInput, setMessageInput] = useState('');
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [showMessageMenu, setShowMessageMenu] = useState<string | null>(null);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessages([
        ...messages,
        {
          id: `msg-${Date.now()}`,
          author: 'You',
          avatar: 'https://images.unsplash.com/photo-1535713566543-29f8c963277d?w=400&h=400&fit=crop',
          content: messageInput,
          timestamp: new Date(),
          reactions: [],
          isOwn: true,
        },
      ]);
      setMessageInput('');
    }
  };

  const handleAddReaction = (msgId: string, emoji: string) => {
    setMessages(
      messages.map((msg) => {
        if (msg.id === msgId) {
          const existingReaction = msg.reactions.find((r) => r.emoji === emoji);
          if (existingReaction) {
            return {
              ...msg,
              reactions: msg.reactions.map((r) =>
                r.emoji === emoji ? { ...r, count: r.count + 1 } : r
              ),
            };
          } else {
            return {
              ...msg,
              reactions: [...msg.reactions, { emoji, count: 1 }],
            };
          }
        }
        return msg;
      })
    );
    setShowMessageMenu(null);
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-full">
        {/* Chat Header */}
        <div className="bg-dark-800 border-b border-dark-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-bold text-white">#{roomName}</h2>
            <p className="text-xs text-gray-400">123 members • 45 online</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg hover:bg-dark-700 transition text-gray-400 hover:text-white">
              <MessageSquare size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={msg.id}
              className="flex gap-3 group"
              onMouseEnter={() => setShowMessageMenu(msg.id)}
              onMouseLeave={() => setShowMessageMenu(null)}
            >
              <img
                src={msg.avatar}
                alt={msg.author}
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-semibold text-white">{msg.author}</span>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(msg.timestamp, { addSuffix: true })}
                  </span>
                </div>
                <div className={`inline-block px-4 py-2 rounded-lg max-w-md ${
                  msg.isOwn
                    ? 'bg-nexa-600 text-white rounded-br-none'
                    : 'bg-dark-700 text-gray-100 rounded-bl-none'
                }`}>
                  <p className="break-words">{msg.content}</p>
                </div>
                {msg.reactions.length > 0 && (
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {msg.reactions.map((r) => (
                      <button
                        key={r.emoji}
                        className="px-2 py-1 rounded-full bg-dark-700 text-xs hover:bg-dark-600 transition flex items-center gap-1"
                      >
                        <span>{r.emoji}</span>
                        <span className="text-gray-400">{r.count}</span>
                      </button>
                    ))}
                  </div>
                )}
                {showMessageMenu === msg.id && (
                  <div className="flex gap-1 mt-2">
                    <button
                      onClick={() => handleAddReaction(msg.id, '👍')}
                      className="px-2 py-1 text-sm rounded-lg hover:bg-dark-600 transition text-gray-400 hover:text-white"
                    >
                      👍
                    </button>
                    <button
                      onClick={() => handleAddReaction(msg.id, '❤️')}
                      className="px-2 py-1 text-sm rounded-lg hover:bg-dark-600 transition text-gray-400 hover:text-white"
                    >
                      ❤️
                    </button>
                    <button
                      onClick={() => handleAddReaction(msg.id, '😂')}
                      className="px-2 py-1 text-sm rounded-lg hover:bg-dark-600 transition text-gray-400 hover:text-white"
                    >
                      😂
                    </button>
                    {msg.isOwn && (
                      <>
                        <button className="px-2 py-1 text-sm rounded-lg hover:bg-dark-600 transition text-gray-400 hover:text-white">
                          <Trash2 size={14} />
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-dark-800 border-t border-dark-700 p-4">
          <div className="flex items-center gap-2 bg-dark-700 rounded-lg px-4 py-3">
            <input
              type="text"
              placeholder="Send a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500"
            />
            <button
              onClick={handleSendMessage}
              className="text-nexa-400 hover:text-nexa-300 transition"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
