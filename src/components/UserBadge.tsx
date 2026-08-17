import React from 'react';

interface UserBadgeProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const UserBadgeBase: React.FC<UserBadgeProps> = ({ icon, label, value }) => (
  <div className="flex items-center gap-2">
    <span className="text-gray-400">{icon}</span>
    <span className="text-sm text-gray-400">
      <span className="font-medium">{label}:</span> {value}
    </span>
  </div>
);

export const UserBadge = React.memo(UserBadgeBase);
