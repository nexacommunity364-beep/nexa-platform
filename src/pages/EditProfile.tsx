import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { useAppStore } from '../store/appStore';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Toast } from '../components/Toast';

export const EditProfile: React.FC = () => {
  const { currentUser, updateCurrentUser } = useAppStore();
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [location, setLocation] = useState(currentUser?.location || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    updateCurrentUser({ displayName, bio, location });
    Toast.success('Profile updated locally.');
    setSaving(false);
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto p-6">
        <Link to={`/profile/${currentUser?.username || ''}`} className="flex items-center gap-2 text-nexa-400 hover:text-nexa-300 mb-6">
          <ArrowLeft size={20} />
          Back to Profile
        </Link>

        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
          <h1 className="text-2xl font-bold text-white mb-6">Edit Profile</h1>

          <div className="space-y-4">
            <InputField
              label="Display Name"
              placeholder="Your name"
              value={displayName}
              onChange={setDisplayName}
            />

            <InputField
              label="Location"
              placeholder="City, Country"
              value={location}
              onChange={setLocation}
            />

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Bio
              </label>
              <textarea
                placeholder="Tell us about yourself"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:border-nexa-500 resize-none"
                rows={4}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Link to={`/profile/${currentUser?.username || ''}`}>
              <Button variant="secondary">Cancel</Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
