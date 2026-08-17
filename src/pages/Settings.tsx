import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../components/Button';
import { Settings, Moon, Sun, Lock, Bell, Palette, LogOut, Trash2, AlertTriangle } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notifications, setNotifications] = useState({
    mentions: true,
    replies: true,
    friendRequests: true,
    events: true,
  });

  const tabs = [
    { id: 'account', label: 'My Account', icon: Settings },
    { id: 'privacy', label: 'Privacy', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-56 flex-shrink-0">
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                      activeTab === tab.id
                        ? 'bg-nexa-600 text-white'
                        : 'text-gray-300 hover:bg-dark-700'
                    }`}
                  >
                    <Icon size={20} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* My Account */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                  <h2 className="text-xl font-bold text-white mb-4">Account Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        value="kalle@nexa.dev"
                        disabled
                        className="w-full px-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-gray-400 opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Two-Factor Authentication</label>
                      <Button variant="secondary">Enable 2FA</Button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Active Sessions</label>
                      <Button variant="secondary">Manage Sessions</Button>
                    </div>
                  </div>
                </div>

                <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                  <h2 className="text-xl font-bold text-white mb-4">Danger Zone</h2>
                  <div className="space-y-3">
                    <Button variant="secondary" fullWidth>
                      <LogOut size={18} />
                      Change Password
                    </Button>
                    <Button variant="danger" fullWidth>
                      <Trash2 size={18} />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy */}
            {activeTab === 'privacy' && (
              <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">Privacy Settings</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
                    <div>
                      <p className="font-medium text-white">Friend Requests</p>
                      <p className="text-sm text-gray-400">Who can send you friend requests?</p>
                    </div>
                    <select className="px-3 py-1 rounded-lg bg-dark-600 border border-dark-500 text-white text-sm">
                      <option>Everyone</option>
                      <option>Friends of Friends</option>
                      <option>Nobody</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
                    <div>
                      <p className="font-medium text-white">Direct Messages</p>
                      <p className="text-sm text-gray-400">Who can send you direct messages?</p>
                    </div>
                    <select className="px-3 py-1 rounded-lg bg-dark-600 border border-dark-500 text-white text-sm">
                      <option>Everyone</option>
                      <option>Community Members</option>
                      <option>Friends Only</option>
                      <option>Nobody</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
                    <div>
                      <p className="font-medium text-white">Show Online Status</p>
                      <p className="text-sm text-gray-400">Let others know when you're online</p>
                    </div>
                    <label className="flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 space-y-6">
                <h2 className="text-xl font-bold text-white">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { key: 'mentions', label: 'Mentions', description: 'When someone mentions you' },
                    { key: 'replies', label: 'Replies', description: 'When someone replies to you' },
                    { key: 'friendRequests', label: 'Friend Requests', description: 'When you receive a friend request' },
                    { key: 'events', label: 'Events', description: 'Community event reminders' },
                  ].map((notif) => (
                    <div key={notif.key} className="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
                      <div>
                        <p className="font-medium text-white">{notif.label}</p>
                        <p className="text-sm text-gray-400">{notif.description}</p>
                      </div>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications[notif.key as keyof typeof notifications]}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              [notif.key]: e.target.checked,
                            })
                          }
                          className="w-4 h-4"
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Appearance */}
            {activeTab === 'appearance' && (
              <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 space-y-6">
                <h2 className="text-xl font-bold text-white">Appearance</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
                    <div>
                      <p className="font-medium text-white flex items-center gap-2">
                        {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
                        Theme
                      </p>
                      <p className="text-sm text-gray-400">Choose your preferred theme</p>
                    </div>
                    <select
                      value={isDarkMode ? 'dark' : 'light'}
                      onChange={(e) => setIsDarkMode(e.target.value === 'dark')}
                      className="px-3 py-1 rounded-lg bg-dark-600 border border-dark-500 text-white text-sm"
                    >
                      <option value="dark">Dark</option>
                      <option value="light">Light</option>
                    </select>
                  </div>

                  <div className="bg-dark-700 rounded-lg p-4">
                    <p className="font-medium text-white mb-3">Accent Color</p>
                    <div className="flex gap-2">
                      {['nexa', 'purple', 'blue', 'green'].map((color) => (
                        <button
                          key={color}
                          className="w-8 h-8 rounded-full border-2 border-gray-500 hover:border-gray-300 transition"
                          style={{
                            backgroundColor:
                              color === 'nexa'
                                ? '#7680ff'
                                : color === 'purple'
                                ? '#a855f7'
                                : color === 'blue'
                                ? '#3b82f6'
                                : '#10b981',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
