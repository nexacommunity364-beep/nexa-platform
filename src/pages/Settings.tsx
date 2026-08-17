import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';
import { Lock, Bell, Eye, Shield, Moon, Zap } from 'lucide-react';
import { Toggle } from '../components/Toggle';

export const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    darkMode: true,
    twoFactor: false,
    privateProfile: false,
    showOnlineStatus: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

        {/* Account Settings */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Lock size={20} />
            Account Security
          </h2>
          <div className="space-y-4">
            <InputField
              label="Current Password"
              type="password"
              placeholder="••••••••"
              value=""
              onChange={() => {}}
            />
            <InputField
              label="New Password"
              type="password"
              placeholder="••••••••"
              value=""
              onChange={() => {}}
            />
            <Button variant="primary">Update Password</Button>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Shield size={20} />
            Privacy & Safety
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-white font-medium">Private Profile</label>
              <Toggle
                checked={settings.privateProfile}
                onChange={() => toggleSetting('privateProfile')}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-white font-medium">Show Online Status</label>
              <Toggle
                checked={settings.showOnlineStatus}
                onChange={() => toggleSetting('showOnlineStatus')}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-white font-medium">Two-Factor Authentication</label>
              <Toggle
                checked={settings.twoFactor}
                onChange={() => toggleSetting('twoFactor')}
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Bell size={20} />
            Notifications
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-white font-medium">Email Notifications</label>
              <Toggle
                checked={settings.emailNotifications}
                onChange={() => toggleSetting('emailNotifications')}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-white font-medium">Push Notifications</label>
              <Toggle
                checked={settings.pushNotifications}
                onChange={() => toggleSetting('pushNotifications')}
              />
            </div>
          </div>
        </div>

        {/* Display Settings */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Moon size={20} />
            Display
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-white font-medium">Dark Mode</label>
              <Toggle
                checked={settings.darkMode}
                onChange={() => toggleSetting('darkMode')}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
