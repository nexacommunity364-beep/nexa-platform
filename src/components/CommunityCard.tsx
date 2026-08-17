import React from 'react';
import { Users, Lock, Globe } from 'lucide-react';
import { Button } from './Button';

interface CommunityCardProps {
  id: string;
  icon: string;
  name: string;
  description: string;
  members: number;
  banner?: string;
  category?: string;
  isPublic?: boolean;
}

export const CommunityCard: React.FC<CommunityCardProps> = ({
  name,
  icon,
  description,
  members,
  banner,
  category,
  isPublic = true,
}) => {
  return (
    <div className="rounded-lg overflow-hidden bg-dark-800 border border-dark-700 hover:border-nexa-500 transition hover:shadow-lg hover:shadow-nexa-500/10">
      {/* Banner */}
      {banner && (
        <div
          className="h-32 bg-gradient-to-r from-nexa-600 to-nexa-700 bg-cover bg-center"
          style={{ backgroundImage: `url(${banner})` }}
        />
      )}
      
      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{icon}</span>
            <div>
              <h3 className="font-bold text-white">{name}</h3>
              {category && <p className="text-xs text-gray-400">{category}</p>}
            </div>
          </div>
          {!isPublic && <Lock size={16} className="text-gray-500" />}
          {isPublic && <Globe size={16} className="text-gray-500" />}
        </div>

        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Users size={14} />
            {members.toLocaleString()} members
          </div>
          <Button size="sm">Join</Button>
        </div>
      </div>
    </div>
  );
};
