import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';
import { MOCK_USERS } from '../data/mockData';

export const EditProfile: React.FC = () => {
  const user = MOCK_USERS[0];
  const [formData, setFormData] = useState({
    displayName: user.displayName,
    bio: user.bio,
    location: user.location,
    website: 'example.com',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="bg-dark-800 rounded-lg border border-dark-700 p-8">
          <h1 className="text-3xl font-bold text-white mb-8">Edit Profile</h1>

          {/* Avatar Section */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-300 mb-4">Profile Picture</label>
            <div className="flex items-center gap-4">
              <img src={user.avatar} alt="avatar" className="w-20 h-20 rounded-full" />
              <Button variant="secondary">Upload New Photo</Button>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <InputField
              label="Display Name"
              value={formData.displayName}
              onChange={(value) => handleChange('displayName', value)}
              required
            />
            <InputField
              label="Bio"
              value={formData.bio}
              onChange={(value) => handleChange('bio', value)}
              placeholder="Tell us about yourself"
            />
            <InputField
              label="Location"
              value={formData.location}
              onChange={(value) => handleChange('location', value)}
            />
            <InputField
              label="Website"
              type="url"
              value={formData.website}
              onChange={(value) => handleChange('website', value)}
            />

            {/* Actions */}
            <div className="flex gap-4 pt-4 border-t border-dark-700">
              <Button fullWidth>Save Changes</Button>
              <Button variant="secondary" fullWidth>Cancel</Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
