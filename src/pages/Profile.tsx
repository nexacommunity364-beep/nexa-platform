import React from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../components/Button';
import { useAppStore } from '../store/appStore';
import { Calendar, MapPin, Link as LinkIcon, Mail } from 'lucide-react';
import { MOCK_USERS } from '../data/mockData';

export const Profile: React.FC = () => {
  const user = MOCK_USERS[0];

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-nexa-600 to-nexa-700"></div>

        {/* Profile Info */}
        <div className="bg-dark-800 border-b border-dark-700 px-6 pb-6">
          <div className="flex flex-col md:flex-row items-start gap-4 -mt-16 mb-6">
            <img
              src={user.avatar}
              alt={user.displayName}
              className="w-32 h-32 rounded-full border-4 border-dark-800"
            />
            <div className="flex-1 pt-12">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h1 className="text-3xl font-bold text-white">{user.displayName}</h1>
                  <p className="text-gray-400">@{user.username}</p>
                </div>
                <Button variant="secondary">Edit Profile</Button>
              </div>
              <p className="text-gray-300 mt-4">{user.bio}</p>
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  {user.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  Joined 2024
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 border-t border-dark-700 pt-6">
            <div>
              <p className="text-2xl font-bold text-white">245</p>
              <p className="text-sm text-gray-400">Posts</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">1.2K</p>
              <p className="text-sm text-gray-400">Followers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">542</p>
              <p className="text-sm text-gray-400">Following</p>
            </div>
          </div>
        </div>

        {/* Timeline Tabs */}
        <div className="bg-dark-800 border-b border-dark-700">
          <div className="flex gap-8 px-6">
            <button className="py-4 border-b-2 border-nexa-600 text-white font-medium">Posts</button>
            <button className="py-4 text-gray-400 hover:text-white transition">Media</button>
            <button className="py-4 text-gray-400 hover:text-white transition">Likes</button>
          </div>
        </div>

        {/* Posts */}
        <div className="p-6 space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-dark-800 rounded-lg border border-dark-700 p-6">
              <p className="text-gray-300">Post content here...</p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};
