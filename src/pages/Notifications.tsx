import React from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Bell, Heart, MessageCircle, UserPlus, Share2 } from 'lucide-react';
import { Button } from '../components/Button';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'message' | 'share';
  authorName: string;
  authorAvatar: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export const Notifications: React.FC = () => {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'like',
      authorName: 'John Doe',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      message: 'liked your post',
      timestamp: new Date(Date.now() - 3600000),
      read: false,
    },
    {
      id: '2',
      type: 'follow',
      authorName: 'Jane Smith',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      message: 'started following you',
      timestamp: new Date(Date.now() - 7200000),
      read: false,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart size={20} className="text-red-500" />;
      case 'comment':
        return <MessageCircle size={20} className="text-blue-500" />;
      case 'follow':
        return <UserPlus size={20} className="text-green-500" />;
      case 'share':
        return <Share2 size={20} className="text-purple-500" />;
      default:
        return <Bell size={20} className="text-gray-500" />;
    }
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Notifications</h1>
          <Button variant="secondary" size="sm">
            Mark all as read
          </Button>
        </div>

        <div className="space-y-2">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`flex items-center gap-4 p-4 rounded-lg border transition ${
                notif.read
                  ? 'bg-dark-800 border-dark-700'
                  : 'bg-nexa-600/10 border-nexa-500/50'
              }`}
            >
              <img
                src={notif.authorAvatar}
                alt={notif.authorName}
                className="w-12 h-12 rounded-full flex-shrink-0"
              />
              <div className="flex-1">
                <p className="text-white">
                  <span className="font-semibold">{notif.authorName}</span>{' '}
                  <span className="text-gray-400">{notif.message}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {notif.timestamp.toLocaleString()}
                </p>
              </div>
              {getIcon(notif.type)}
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};
