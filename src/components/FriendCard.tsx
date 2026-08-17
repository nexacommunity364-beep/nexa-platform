import React from 'react';
import { UserPlus, MessageSquare, MoreVertical } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { MOCK_USERS } from '../data/mockData';

interface FriendCardProps {
  userId: string;
}

export const FriendCard: React.FC<FriendCardProps> = ({ userId }) => {
  const user = MOCK_USERS.find((u) => u.id === userId);

  if (!user) return null;

  const getStatusColor = () => {
    switch (user.onlineStatus) {
      case 'online':
        return 'bg-green-500';
      case 'idle':
        return 'bg-yellow-500';
      case 'dnd':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-dark-800 rounded-lg p-4 border border-dark-700 hover:border-nexa-500 transition">
      <div className="flex items-start justify-between mb-3">
        <div className="relative">
          <img
            src={user.avatar}
            alt={user.displayName}
            className="w-12 h-12 rounded-full"
          />
          <div className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor()} rounded-full border-2 border-dark-800`}></div>
        </div>
        <button className="p-1 rounded-lg hover:bg-dark-700 transition text-gray-400 hover:text-white">
          <MoreVertical size={16} />
        </button>
      </div>

      <h3 className="font-semibold text-white truncate">{user.displayName}</h3>
      <p className="text-xs text-gray-400 truncate">@{user.username}</p>

      <div className="flex gap-2 mt-4">
        <button className="flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-lg bg-nexa-600 hover:bg-nexa-700 text-white transition text-xs font-medium">
          <MessageSquare size={14} />
          Message
        </button>
        <button className="flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-lg bg-dark-700 hover:bg-dark-600 text-gray-300 transition text-xs font-medium">
          <UserPlus size={14} />
          Profile
        </button>
      </div>
    </div>
  );
};
