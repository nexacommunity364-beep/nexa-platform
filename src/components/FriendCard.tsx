import React from 'react';
import { Users, Plus } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export const FriendCard: React.FC<{ userId: string }> = ({ userId }) => {
  const { users } = useAppStore();
  const user = users.find((u) => u.id === userId);

  if (!user) return null;

  const getStatusColor = () => {
    switch (user.onlineStatus) {
      case 'online':
        return 'bg-green-500';
      case 'idle':
        return 'bg-yellow-500';
      case 'dnd':
        return 'bg-red-500';
      case 'offline':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-dark-800 rounded-lg p-4 hover:bg-dark-700 transition">
      <div className="flex items-start justify-between mb-3">
        <div className="relative">
          <img
            src={user.avatar}
            alt={user.displayName}
            className="w-12 h-12 rounded-full"
          />
          <div className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor()} rounded-full border-2 border-dark-800`}></div>
        </div>
        <button className="p-1.5 rounded-lg hover:bg-dark-600 transition text-gray-400 hover:text-white">
          <Plus size={16} />
        </button>
      </div>
      <h3 className="font-semibold text-white truncate">{user.displayName}</h3>
      <p className="text-sm text-gray-400 truncate">@{user.username}</p>
      <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
        <Users size={12} />
        <span>2 mutual friends</span>
      </div>
    </div>
  );
};
