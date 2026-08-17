import React from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { useAppStore } from '../store/appStore';
import { Edit2, MapPin, Mail, Calendar } from 'lucide-react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

export const Profile: React.FC = () => {
  const { currentUser } = useAppStore();

  if (!currentUser) return null;

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-nexa-600 to-nexa-700 rounded-lg mb-4 relative">
          <div className="absolute bottom-0 left-6 transform translate-y-1/2">
            <img
              src={currentUser.avatar}
              alt={currentUser.displayName}
              className="w-32 h-32 rounded-full border-4 border-dark-900"
            />
          </div>
        </div>

        {/* Profile Header */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 mt-16 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">{currentUser.displayName}</h1>
              <p className="text-gray-400">@{currentUser.username}</p>
            </div>
            <Link to="/profile/edit">
              <Button variant="secondary" size="sm">
                <Edit2 size={16} />
                Edit Profile
              </Button>
            </Link>
          </div>

          <p className="text-gray-200 mb-4">{currentUser.bio}</p>

          <div className="space-y-2 text-sm text-gray-400">
            {currentUser.location && (
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                {currentUser.location}
              </div>
            )}
            <div className="flex items-center gap-2">
              <Mail size={16} />
              {currentUser.email}
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              Joined {new Date(currentUser.createdAt).toLocaleDateString()}
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mt-6 pt-6 border-t border-dark-700">
            <div>
              <p className="font-bold text-white text-lg">1,234</p>
              <p className="text-sm text-gray-400">Followers</p>
            </div>
            <div>
              <p className="font-bold text-white text-lg">567</p>
              <p className="text-sm text-gray-400">Following</p>
            </div>
            <div>
              <p className="font-bold text-white text-lg">89</p>
              <p className="text-sm text-gray-400">Posts</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
