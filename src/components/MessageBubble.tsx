import React from 'react';

interface MessageBubbleProps {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  timestamp: Date;
  isOwn?: boolean;
  edited?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  authorName,
  authorAvatar,
  content,
  timestamp,
  isOwn = false,
  edited = false,
}) => {
  return (
    <div className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}>
      <img
        src={authorAvatar}
        alt={authorName}
        className="w-8 h-8 rounded-full flex-shrink-0"
      />
      <div className={isOwn ? 'items-end flex flex-col' : 'items-start flex flex-col'}>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-semibold text-white text-sm">{authorName}</span>
          <span className="text-xs text-gray-500">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {edited && <span className="text-xs text-gray-500">(edited)</span>}
        </div>
        <div className={`inline-block px-4 py-2 rounded-lg max-w-md ${
          isOwn
            ? 'bg-nexa-600 text-white rounded-br-none'
            : 'bg-dark-700 text-gray-100 rounded-bl-none'
        }`}>
          <p className="break-words text-sm">{content}</p>
        </div>
      </div>
    </div>
  );
};
