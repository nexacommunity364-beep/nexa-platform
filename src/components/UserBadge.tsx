import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Award, MapPin, Link as LinkIcon } from 'lucide-react';

interface UserBadgeProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const UserBadge: React.FC<UserBadgeProps> = ({ icon, label, value }) => (
  <div className="flex items-center gap-2">
    <span className="text-gray-400">{icon}</span>
    <span className="text-sm text-gray-400">
      <span className="font-medium">{label}:</span> {value}
    </span>
  </div>
);

export const UserBadge = React.memo(UserBadge);
