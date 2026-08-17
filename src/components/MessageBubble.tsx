import React from 'react';
import { MessageSquare, Heart, Share2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface MessageProps {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  timestamp: Date;
  reactions?: { emoji: string; count: number }[];
  isOwn?: boolean;
}

export const MessageBubble: React.FC<MessageProps> = ({
  id,
  authorName,
  authorAvatar,
  content,
  timestamp,
  reactions = [],
  isOwn = false,
}) => {
  return (
    <div className={`flex gap-3 mb-4 group ${isOwn ? 'flex-row-reverse' : ''}`}>
      <img
        src={authorAvatar}
        alt={authorName}
        className="w-10 h-10 rounded-full flex-shrink-0"
      />
      <div className={isOwn ? 'items-end' : 'items-start'}>
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-white">{authorName}</span>
          <span className="text-xs text-gray-500">{formatDistanceToNow(timestamp, { addSuffix: true })}</span>
        </div>
        <div
          className={`mt-1 px-4 py-2 rounded-lg max-w-md ${
            isOwn
              ? 'bg-nexa-600 text-white rounded-br-none'
              : 'bg-dark-700 text-gray-100 rounded-bl-none'
          }`}
        >
          <p className="text-sm break-words">{content}</p>
        </div>
        {reactions.length > 0 && (
          <div className="flex gap-1 mt-2 flex-wrap">
            {reactions.map((r) => (
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
        <div className="hidden group-hover:flex gap-1 mt-2">
          <button className="p-1.5 rounded-lg hover:bg-dark-600 transition text-gray-400 hover:text-white">
            <Heart size={14} />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-dark-600 transition text-gray-400 hover:text-white">
            <MessageSquare size={14} />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-dark-600 transition text-gray-400 hover:text-white">
            <Share2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
