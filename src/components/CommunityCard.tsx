import React from 'react';
import { Users, MapPin, UserCheck } from 'lucide-react';

interface CommunityCardProps {
  id: string;
  icon: string;
  name: string;
  description: string;
  members: number;
  banner: string;
  category: string;
  onJoin?: () => void;
}

export const CommunityCard: React.FC<CommunityCardProps> = ({
  icon,
  name,
  description,
  members,
  banner,
  category,
  onJoin,
}) => {
  return (
    <div className="bg-dark-800 rounded-lg overflow-hidden hover:bg-dark-700 transition group">
      <div className="h-32 overflow-hidden relative">
        <img
          src={banner}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start gap-3 mb-2">
          <span className="text-3xl">{icon}</span>
          <div className="flex-1">
            <h3 className="font-bold text-white line-clamp-2">{name}</h3>
            <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
              <MapPin size={12} />
              {category}
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-300 line-clamp-2 mb-3">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-gray-400">
            <Users size={16} />
            <span>{members.toLocaleString()}</span>
          </div>
          <button
            onClick={onJoin}
            className="px-3 py-1.5 rounded-lg bg-nexa-600 hover:bg-nexa-700 text-white text-sm font-medium transition flex items-center gap-1"
          >
            <UserCheck size={14} />
            Join
          </button>
        </div>
      </div>
    </div>
  );
};
