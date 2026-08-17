import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Users, TrendingUp, AlertCircle, BarChart3 } from 'lucide-react';
import { Button } from '../components/Button';

export const AdminPanel: React.FC = () => {
  const [tab, setTab] = useState<'overview' | 'users' | 'moderation' | 'analytics'>('overview');

  const stats = [
    { label: 'Total Users', value: '10,234', icon: Users, color: 'text-blue-400' },
    { label: 'Active Today', value: '3,456', icon: TrendingUp, color: 'text-green-400' },
    { label: 'Reports Pending', value: '23', icon: AlertCircle, color: 'text-red-400' },
    { label: 'Revenue', value: '$12.5K', icon: BarChart3, color: 'text-purple-400' },
  ];

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Panel</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                  <Icon size={20} className={stat.color} />
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-dark-700">
          {(['overview', 'users', 'moderation', 'analytics'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 font-medium capitalize transition ${
                tab === t
                  ? 'text-nexa-400 border-b-2 border-nexa-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
          {tab === 'overview' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Platform Overview</h2>
              <p className="text-gray-400">Dashboard content here</p>
            </div>
          )}
          {tab === 'users' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4">User Management</h2>
              <p className="text-gray-400">User management content here</p>
            </div>
          )}
          {tab === 'moderation' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Moderation Queue</h2>
              <p className="text-gray-400">Moderation content here</p>
            </div>
          )}
          {tab === 'analytics' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Analytics</h2>
              <p className="text-gray-400">Analytics content here</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};
