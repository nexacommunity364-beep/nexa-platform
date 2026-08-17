import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { useAppStore } from '../store/appStore';
import { MOCK_NOTIFICATIONS } from '../data/mockData';
import { Button } from '../components/Button';
import { Bell, Trash2, Check } from 'lucide-react';

export const Notifications: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useAppStore();
  const [notifs, setNotifs] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifs.filter((n) => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    const icons: Record<string, string> = {
      friendRequest: '👋',
      mention: '@',
      reply: '💬',
      communityInvite: '🎉',
      roleChange: '⭐',
      warning: '⚠️',
      event: '📅',
      support: '💬',
      announcement: '📢',
    };
    return icons[type] || '📬';
  };

  const handleMarkAsRead = (id: string) => {
    setNotifs(notifs.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const handleDelete = (id: string) => {
    setNotifs(notifs.filter((n) => n.id !== id));
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <Bell size={32} />
              Notifications
            </h1>
            {unreadCount > 0 && (
              <p className="text-gray-400 mt-1">{unreadCount} unread notifications</p>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                markAllNotificationsAsRead();
                setNotifs(notifs.map((n) => ({ ...n, isRead: true })));
              }}
            >
              <Check size={16} />
              Mark All Read
            </Button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifs.length > 0 ? (
            notifs.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 rounded-lg border transition ${
                  notif.isRead
                    ? 'bg-dark-800 border-dark-700 hover:bg-dark-700'
                    : 'bg-nexa-600/10 border-nexa-500/30 hover:bg-nexa-600/20'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <span className="text-2xl mt-1">{getNotificationIcon(notif.type)}</span>
                    <div className="flex-1">
                      <p className={`font-medium ${
                        notif.isRead ? 'text-gray-300' : 'text-white'
                      }`}>
                        {notif.content}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notif.createdAt.toLocaleDateString()} {notif.createdAt.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!notif.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(notif.id)}
                        className="p-1.5 rounded-lg hover:bg-dark-700 transition text-gray-400 hover:text-white"
                        title="Mark as read"
                      >
                        <Check size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notif.id)}
                      className="p-1.5 rounded-lg hover:bg-red-500/20 transition text-gray-400 hover:text-red-400"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Bell size={48} className="mx-auto text-gray-500 mb-4" />
              <p className="text-gray-400 text-lg">No notifications yet</p>
              <p className="text-gray-500 text-sm">When something happens, you'll get notified here</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};
