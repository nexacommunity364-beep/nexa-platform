import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { useAppStore } from '../store/appStore';
import { MOCK_CURRENT_USER, MOCK_USERS } from '../data/mockData';
import { Button } from '../components/Button';
import { MessageSquare, UserPlus, MoreHorizontal, Edit, Award, Users, Link as LinkIcon } from 'lucide-react';

export const Profile: React.FC = () => {
  const { currentUser } = useAppStore();
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  if (!currentUser) return null;

  const getStatusColor = () => {
    switch (currentUser.onlineStatus) {
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

  const xpPercentage = (currentUser.xp / currentUser.xpNeeded) * 100;

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        {/* Banner */}
        <div className="relative h-48 bg-gradient-to-r from-nexa-600 to-nexa-700 overflow-hidden">
          <img
            src={currentUser.banner}
            alt="banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Profile Content */}
        <div className="relative px-6 pb-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 -mt-16 mb-6">
            <div className="flex items-end gap-4">
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.displayName}
                  className="w-32 h-32 rounded-full border-4 border-dark-900"
                />
                <div className={`absolute bottom-2 right-2 w-4 h-4 ${getStatusColor()} rounded-full border-2 border-dark-900`}></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{currentUser.displayName}</h1>
                <p className="text-gray-400">@{currentUser.username}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => setIsEditingProfile(true)}>
                <Edit size={16} />
                Edit Profile
              </Button>
              <Button size="sm" variant="secondary">
                <MoreHorizontal size={16} />
              </Button>
            </div>
          </div>

          {/* Bio Section */}
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 mb-6">
            <p className="text-gray-200 mb-4">{currentUser.bio}</p>

            {/* Status & Level */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-dark-700 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-1">Online Status</p>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 ${getStatusColor()} rounded-full`}></div>
                  <span className="font-semibold text-white capitalize">
                    {currentUser.onlineStatus === 'dnd' ? 'Do Not Disturb' : currentUser.onlineStatus}
                  </span>
                </div>
              </div>
              <div className="bg-dark-700 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-1">Level</p>
                <p className="text-2xl font-bold text-nexa-400">{currentUser.level}</p>
              </div>
              <div className="bg-dark-700 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-1">Joined</p>
                <p className="font-semibold text-white">{currentUser.joinedDate.toLocaleDateString()}</p>
              </div>
            </div>

            {/* XP Progress */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-300">XP Progress</span>
                <span className="text-xs text-gray-400">{currentUser.xp} / {currentUser.xpNeeded}</span>
              </div>
              <div className="w-full bg-dark-700 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-nexa-500 to-nexa-600 transition-all duration-500"
                  style={{ width: `${xpPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Badges & Achievements */}
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 mb-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Award size={20} />
              Badges & Achievements
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {currentUser.badges.map((badge) => (
                <div key={badge.id} className="bg-dark-700 rounded-lg p-4 text-center hover:bg-dark-600 transition">
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <p className="font-semibold text-white text-sm">{badge.name}</p>
                  <p className="text-xs text-gray-400">{badge.description}</p>
                </div>
              ))}
              <div className="bg-dark-700 rounded-lg p-4 text-center opacity-50">
                <div className="text-3xl mb-2">🔒</div>
                <p className="font-semibold text-white text-sm">Locked</p>
                <p className="text-xs text-gray-400">Coming soon</p>
              </div>
            </div>
          </div>

          {/* Communities */}
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 mb-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Users size={20} />
              Communities (3)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Nexa Gaming', 'Web Dev Hub', 'Roblox Builders'].map((community, idx) => (
                <div key={idx} className="bg-dark-700 rounded-lg p-4 hover:bg-dark-600 transition cursor-pointer">
                  <p className="font-semibold text-white">{community}</p>
                  <p className="text-xs text-gray-400 mt-1">Owner / Member</p>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          {currentUser.socialLinks && Object.keys(currentUser.socialLinks).length > 0 && (
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <LinkIcon size={20} />
                Social Links
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {currentUser.socialLinks.twitter && (
                  <a href={currentUser.socialLinks.twitter} className="text-nexa-400 hover:text-nexa-300 transition text-sm">
                    → Twitter
                  </a>
                )}
                {currentUser.socialLinks.twitch && (
                  <a href={currentUser.socialLinks.twitch} className="text-nexa-400 hover:text-nexa-300 transition text-sm">
                    → Twitch
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};
