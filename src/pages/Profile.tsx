import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../components/Button';
import { Edit, MapPin, Link as LinkIcon, Calendar, Mail, UserPlus } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export const Profile: React.FC = () => {
  const { currentUser } = useAppStore();
  const [followers, setFollowers] = useState(1250);
  const [following, setFollowing] = useState(342);
  const [isFollowed, setIsFollowed] = useState(false);

  if (!currentUser) {
    return <MainLayout><div>Loading...</div></MainLayout>;
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        {/* Banner */}
        <div className="h-48 bg-gradient-to-r from-nexa-600 to-nexa-700 rounded-b-lg"></div>

        {/* Profile Container */}
        <div className="bg-dark-800 border-x border-b border-dark-700 rounded-b-lg">
          {/* Header Section */}
          <div className="px-6 py-6 relative -mt-20 mb-6">
            <div className="flex justify-between items-start">
              <div className="flex gap-6">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.displayName}
                  className="w-32 h-32 rounded-full border-4 border-dark-800 shadow-lg"
                />
                <div className="pt-8">
                  <h1 className="text-3xl font-bold text-white">{currentUser.displayName}</h1>
                  <p className="text-lg text-gray-400">@{currentUser.username}</p>
                </div>
              </div>
              <Button variant="secondary" size="sm">
                <Edit size={16} />
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Bio Section */}
          <div className="px-6 py-4 border-t border-dark-700 space-y-3">
            <p className="text-gray-300">{currentUser.bio || 'No bio yet'}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                Location not set
              </div>
              <div className="flex items-center gap-1">
                <LinkIcon size={16} />
                website.com
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                Joined Nov 2024
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 px-6 py-4 border-t border-dark-700 text-sm">
            <div>
              <span className="font-bold text-white text-lg">{followers.toLocaleString()}</span>
              <p className="text-gray-400">Followers</p>
            </div>
            <div>
              <span className="font-bold text-white text-lg">{following.toLocaleString()}</span>
              <p className="text-gray-400">Following</p>
            </div>
            <div>
              <span className="font-bold text-white text-lg">42</span>
              <p className="text-gray-400">Posts</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};