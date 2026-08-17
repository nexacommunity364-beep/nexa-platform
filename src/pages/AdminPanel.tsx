import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Lock, AlertTriangle, Users, Settings, LogOut } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showActionModal, setShowActionModal] = useState(false);

  // Mock stats
  const stats = {
    totalUsers: 15243,
    onlineUsers: 3421,
    newAccounts: 234,
    totalCommunities: 847,
    pendingReports: 23,
    openTickets: 15,
    activeSuspensions: 8,
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'users', label: 'Users' },
    { id: 'communities', label: 'Communities' },
    { id: 'reports', label: 'Reports' },
    { id: 'moderation', label: 'Moderation' },
    { id: 'support', label: 'Support Tickets' },
    { id: 'system', label: 'System' },
  ];

  return (
    <MainLayout>
      <div className="p-6">
        {/* Admin Banner */}
        <div className="mb-8 bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-500" size={24} />
            <div>
              <h1 className="text-2xl font-bold text-white">Nexa Admin Panel</h1>
              <p className="text-gray-400 text-sm">Staff only. All actions are logged.</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-dark-700 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium transition border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-nexa-400 border-nexa-500'
                  : 'text-gray-400 border-transparent hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Users', value: stats.totalUsers, icon: '👥' },
                { label: 'Online Users', value: stats.onlineUsers, icon: '🟢' },
                { label: 'New Accounts (7d)', value: stats.newAccounts, icon: '✨' },
                { label: 'Total Communities', value: stats.totalCommunities, icon: '🏘️' },
                { label: 'Pending Reports', value: stats.pendingReports, color: 'red' },
                { label: 'Open Support Tickets', value: stats.openTickets },
                { label: 'Active Suspensions', value: stats.activeSuspensions, color: 'orange' },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className={`rounded-lg p-6 border transition ${
                    stat.color === 'red'
                      ? 'bg-red-500/10 border-red-500/30'
                      : stat.color === 'orange'
                      ? 'bg-orange-500/10 border-orange-500/30'
                      : 'bg-dark-800 border-dark-700'
                  }`}
                >
                  {stat.icon && <div className="text-2xl mb-2">{stat.icon}</div>}
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
              <h2 className="text-lg font-bold text-white mb-4">Recent Platform Activity</h2>
              <div className="space-y-3">
                {[
                  'User #12345 flagged for suspicious activity',
                  'Community "Gaming Hub" reported for spam content',
                  'Support ticket #NX-54321 escalated to senior staff',
                  'User suspension lifted for @username',
                  '3 new communities created in the last hour',
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-dark-700">
                    <div className="w-2 h-2 bg-nexa-500 rounded-full"></div>
                    <p className="text-gray-300 text-sm">{activity}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Users */}
        {activeTab === 'users' && (
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">User Management</h2>
              <input
                type="text"
                placeholder="Search users..."
                className="px-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:border-nexa-500 w-64"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-dark-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-300">User ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-300">Username</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-300">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-300">Joined</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-300">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 'user-001', username: '@kalle', email: 'kalle@nexa.dev', joined: '2024-01-15', status: 'Active' },
                    { id: 'user-002', username: '@alex', email: 'alex@nexa.dev', joined: '2024-02-10', status: 'Active' },
                    { id: 'user-003', username: '@sam', email: 'sam@nexa.dev', joined: '2024-03-05', status: 'Suspended' },
                  ].map((user) => (
                    <tr key={user.id} className="border-b border-dark-700 hover:bg-dark-700 transition">
                      <td className="py-3 px-4 text-gray-300">{user.id}</td>
                      <td className="py-3 px-4 text-white font-medium">{user.username}</td>
                      <td className="py-3 px-4 text-gray-400">{user.email}</td>
                      <td className="py-3 px-4 text-gray-400">{user.joined}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === 'Active'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Button size="sm" variant="secondary" onClick={() => setShowActionModal(true)}>
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reports */}
        {activeTab === 'reports' && (
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <h2 className="text-lg font-bold text-white mb-4">Pending Reports ({stats.pendingReports})</h2>
            <div className="space-y-3">
              {[
                { id: '#001', type: 'User', target: '@spammer123', reason: 'Spam', date: '2 hours ago' },
                { id: '#002', type: 'Message', target: 'Gaming Room', reason: 'Hate Speech', date: '4 hours ago' },
                { id: '#003', type: 'Community', target: 'Crypto Hub', reason: 'Scam', date: '6 hours ago' },
              ].map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 rounded-lg bg-dark-700 hover:bg-dark-600 transition">
                  <div>
                    <p className="font-medium text-white">
                      {report.type}: {report.target}
                    </p>
                    <p className="text-xs text-gray-400">
                      {report.reason} • {report.date}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary">
                      Review
                    </Button>
                    <Button size="sm" variant="danger">
                      Action
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Moderation */}
        {activeTab === 'moderation' && (
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <h2 className="text-lg font-bold text-white mb-4">Moderation Logs</h2>
            <div className="space-y-2">
              {[
                'Moderator @admin warned user @spammer for spam',
                'User @badactor timed out for 24 hours',
                'Community "Scam Central" suspended',
                'User @suspicious banned from platform',
                'Message deleted in #general (reason: hate speech)',
              ].map((log, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-dark-700 text-gray-300 text-sm">
                  <AlertTriangle size={16} className="text-orange-500 flex-shrink-0" />
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
