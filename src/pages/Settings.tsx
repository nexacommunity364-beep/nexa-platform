import React, { useEffect, useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';
import { Lock, Bell, Shield, Moon, Trash2, UserX } from 'lucide-react';
import { Toggle } from '../components/Toggle';
import { Toast } from '../components/Toast';
import { useAppStore } from '../store/appStore';

type DemoSettings = {
  emailNotifications: boolean;
  pushNotifications: boolean;
  twoFactor: boolean;
  privateProfile: boolean;
  showOnlineStatus: boolean;
};

const SETTINGS_KEY = 'nexa-demo-settings';

export const Settings: React.FC = () => {
  const { currentUser, setCurrentUser, theme, setTheme } = useAppStore();
  const [settings, setSettings] = useState<DemoSettings>(() => {
    if (typeof window === 'undefined') {
      return {
        emailNotifications: true,
        pushNotifications: true,
        twoFactor: false,
        privateProfile: false,
        showOnlineStatus: true,
      };
    }

    const stored = window.localStorage.getItem(SETTINGS_KEY);
    return stored
      ? JSON.parse(stored)
      : {
          emailNotifications: true,
          pushNotifications: true,
          twoFactor: false,
          privateProfile: false,
          showOnlineStatus: true,
        };
  });

  useEffect(() => {
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const toggleSetting = (key: keyof DemoSettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleDeactivate = () => {
    Toast.warning('Demo account deactivated locally. You can sign in again anytime.');
    setCurrentUser(null);
  };

  const handleDelete = () => {
    window.localStorage.removeItem(SETTINGS_KEY);
    useAppStore.persist.clearStorage();
    window.location.href = '/login';
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Lock size={20} />
            Account
          </h2>
          <div className="space-y-4">
            <InputField
              label="Email"
              type="email"
              value={currentUser?.email || ''}
              onChange={() => {}}
              disabled
              helperText={currentUser?.emailVerified ? 'Email verified' : 'Verification pending'}
            />
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
              helperText="Passwords stay in demo state only and are never persisted."
            />
            <Button variant="primary" onClick={() => Toast.success('Password update saved in demo mode.')}>
              Update Password
            </Button>
          </div>
        </div>

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

        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Moon size={20} />
            Appearance
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Theme</p>
              <p className="text-sm text-gray-400">Switch between Nexa dark and light themes.</p>
            </div>
            <Button
              variant="secondary"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? 'Use Light Theme' : 'Use Dark Theme'}
            </Button>
          </div>
        </div>

        <div className="bg-red-500/10 rounded-lg p-6 border border-red-500/30">
          <h2 className="text-xl font-bold text-white mb-4">Danger Zone</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={handleDeactivate}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-dark-800 text-orange-300 hover:bg-dark-700 transition"
            >
              <UserX size={18} />
              Deactivate Account
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            >
              <Trash2 size={18} />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
