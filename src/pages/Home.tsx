import React, { useState, useEffect } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { useAppStore } from '../store/appStore';
import { MOCK_USERS, MOCK_DIRECT_MESSAGES, MOCK_NOTIFICATIONS, MOCK_EVENTS, MOCK_COMMUNITIES } from '../data/mockData';
import { Button } from '../components/Button';
import { MessageBubble } from '../components/MessageBubble';
import { MessageSquare, Users, Zap, Calendar, TrendingUp, Bell } from 'lucide-react';

export const Home: React.FC = () => {
  const { currentUser } = useAppStore();
  const [recentDMs] = useState(MOCK_DIRECT_MESSAGES.slice(0, 3));
  const [onlineFriends] = useState(MOCK_USERS.slice(1, 4));
  const [trendingCommunities] = useState(MOCK_COMMUNITIES.slice(0, 3));
  const [upcomingEvents] = useState(MOCK_EVENTS);
  const [unreadNotifications] = useState(MOCK_NOTIFICATIONS.filter((n) => !n.isRead).length);

  if (!currentUser) return null;

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.displayName}
              className="w-16 h-16 rounded-full border-2 border-nexa-500"
            />
            <div>
              <h1 className="text-4xl font-bold text-white">
                Welcome back, <span className="text-nexa-400">{currentUser.displayName}</span>!
              </h1>
              <p className="text-gray-400 mt-1">It's great to see you. Here's what's happening in your communities.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button className="justify-center py-3">
            <Users size={20} />
            Create Community
          </Button>
          <Button variant="secondary" className="justify-center py-3">
            <Zap size={20} />
            Discover Communities
          </Button>
          <Button variant="secondary" className="justify-center py-3">
            <MessageSquare size={20} />
            Message Friend
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Messages */}
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MessageSquare size={20} />
                Recent Messages
              </h2>
              <div className="space-y-4">
                {recentDMs.map((dm, idx) => (
                  <div key={dm.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-dark-700 transition cursor-pointer">
                    <img
                      src={MOCK_USERS.find((u) => u.id === dm.senderId)?.avatar || ''}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white truncate">
                        {MOCK_USERS.find((u) => u.id === dm.senderId)?.displayName}
                      </p>
                      <p className="text-sm text-gray-400 truncate">{dm.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Your Communities */}
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Users size={20} />
                Your Communities
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {trendingCommunities.map((community) => (
                  <div
                    key={community.id}
                    className="p-3 rounded-lg bg-dark-700 hover:bg-dark-600 transition cursor-pointer"
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-2xl">{community.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white truncate text-sm">{community.name}</p>
                        <p className="text-xs text-gray-400">{community.memberCount.toLocaleString()} members</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Online Friends */}
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
              <h3 className="font-bold text-white mb-4">Online Friends</h3>
              <div className="space-y-3">
                {onlineFriends.map((friend) => (
                  <div key={friend.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-dark-700 transition cursor-pointer">
                    <div className="relative">
                      <img src={friend.avatar} alt={friend.displayName} className="w-8 h-8 rounded-full" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-dark-800"></div>
                    </div>
                    <p className="text-sm font-medium text-white truncate">{friend.displayName}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Bell size={18} />
                Notifications
              </h3>
              {unreadNotifications > 0 && (
                <div className="inline-block px-3 py-1 rounded-full bg-red-500/20 border border-red-500/50 text-xs font-medium text-red-400 mb-4">
                  {unreadNotifications} new
                </div>
              )}
              <Button fullWidth variant="secondary" className="text-sm justify-center">
                View All Notifications
              </Button>
            </div>

            {/* Upcoming Events */}
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Calendar size={18} />
                Upcoming Events
              </h3>
              <div className="space-y-3">
                {upcomingEvents.slice(0, 2).map((event) => (
                  <div key={event.id} className="text-sm">
                    <p className="font-medium text-white truncate">{event.title}</p>
                    <p className="text-xs text-gray-400">{event.date.toLocaleDateString()} at {event.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending */}
            <div className="bg-gradient-to-br from-nexa-600/20 to-nexa-700/10 rounded-lg p-6 border border-nexa-500/30">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp size={18} />
                Trending 🔥
              </h3>
              <Button fullWidth variant="secondary" className="text-sm justify-center">
                Explore Trending
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
