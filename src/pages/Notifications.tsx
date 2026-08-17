import React from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Bell, Heart, MessageCircle, UserPlus, Share2 } from 'lucide-react';
import { Button } from '../components/Button';
import { useAppStore } from '../store/appStore';

export const Notifications: React.FC = () => {
  const { notifications, markAllNotificationsAsRead, markNotificationAsRead } = useAppStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'friendRequest':
      case 'roleChange':
        return <UserPlus size={20} className="text-green-500" />;
      case 'mention':
      case 'reply':
        return <Heart size={20} className="text-red-500" />;
      case 'event':
      case 'warning':
        return <MessageCircle size={20} className="text-blue-500" />;
      case 'support':
      case 'announcement':
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
          <Button variant="secondary" size="sm" onClick={markAllNotificationsAsRead}>
            Mark all as read
          </Button>
        </div>

        <div className="space-y-2">
          {notifications.map((notif) => (
            <button
              key={notif.id}
              onClick={() => markNotificationAsRead(notif.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-lg border transition text-left ${
                notif.isRead
                  ? 'bg-dark-800 border-dark-700'
                  : 'bg-nexa-600/10 border-nexa-500/50'
              }`}
            >
              <img
                src="https://api.dicebear.com/7.x/shapes/svg?seed=nexa"
                alt="Notification"
                className="w-12 h-12 rounded-full flex-shrink-0"
              />
              <div className="flex-1">
                <p className="text-white">{notif.content}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {notif.createdAt.toLocaleString()}
                </p>
              </div>
              {getIcon(notif.type)}
            </button>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};
