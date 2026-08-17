import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';
import { MOCK_CURRENT_USER } from '../data/mockData';
import { Camera, Save, LogOut } from 'lucide-react';

export const EditProfile: React.FC = () => {
  const [profile, setProfile] = useState({
    displayName: MOCK_CURRENT_USER.displayName,
    bio: MOCK_CURRENT_USER.bio,
    username: MOCK_CURRENT_USER.username,
    email: MOCK_CURRENT_USER.email,
    twitter: MOCK_CURRENT_USER.socialLinks?.twitter || '',
    twitch: MOCK_CURRENT_USER.socialLinks?.twitch || '',
  });

  const [avatar, setAvatar] = useState(MOCK_CURRENT_USER.avatar);
  const [banner, setBanner] = useState(MOCK_CURRENT_USER.banner);

  const handleSave = () => {
    alert('Profile updated successfully!');
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-white mb-8">Edit Profile</h1>

        {/* Banner Edit */}
        <div className="relative h-48 bg-gradient-to-r from-nexa-600 to-nexa-700 rounded-lg overflow-hidden mb-8 group cursor-pointer">
          <img
            src={banner}
            alt="banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition flex items-center justify-center">
            <label className="cursor-pointer">
              <Camera size={32} className="text-white opacity-0 group-hover:opacity-100 transition" />
              <input type="file" accept="image/*" className="hidden" />
            </label>
          </div>
        </div>

        {/* Avatar Edit */}
        <div className="mb-8 flex items-end gap-4">
          <div className="relative group">
            <img
              src={avatar}
              alt="avatar"
              className="w-32 h-32 rounded-full border-4 border-dark-900"
            />
            <label className="absolute bottom-0 right-0 p-2 bg-nexa-600 rounded-full cursor-pointer hover:bg-nexa-700 transition shadow-lg">
              <Camera size={20} className="text-white" />
              <input type="file" accept="image/*" className="hidden" />
            </label>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Profile Picture</p>
            <p className="text-gray-500 text-xs">JPG, PNG, up to 10MB</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Display Name"
              value={profile.displayName}
              onChange={(value) => setProfile({ ...profile, displayName: value })}
            />
            <InputField
              label="Username"
              placeholder="@username"
              value={profile.username}
              onChange={(value) => setProfile({ ...profile, username: value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              placeholder="Tell us about yourself..."
              maxLength={160}
              className="w-full px-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:border-nexa-500 resize-none h-20"
            />
            <p className="text-xs text-gray-400 mt-1">{profile.bio.length}/160</p>
          </div>

          <div className="border-t border-dark-700 pt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Social Links</h3>
            <div className="space-y-4">
              <InputField
                label="Twitter"
                placeholder="https://twitter.com/username"
                value={profile.twitter}
                onChange={(value) => setProfile({ ...profile, twitter: value })}
              />
              <InputField
                label="Twitch"
                placeholder="https://twitch.tv/username"
                value={profile.twitch}
                onChange={(value) => setProfile({ ...profile, twitch: value })}
              />
            </div>
          </div>

          <div className="border-t border-dark-700 pt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Account Settings</h3>
            <div className="space-y-2">
              <InputField
                label="Email"
                type="email"
                value={profile.email}
                onChange={(value) => setProfile({ ...profile, email: value })}
              />
              <p className="text-xs text-gray-400">Verification email sent to {profile.email}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button fullWidth onClick={handleSave}>
            <Save size={18} />
            Save Changes
          </Button>
          <Button fullWidth variant="secondary">
            Cancel
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};
