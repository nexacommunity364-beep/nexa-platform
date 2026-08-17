import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Users, TrendingUp, AlertCircle, BarChart3, Shield, LifeBuoy, Crown, Activity } from 'lucide-react';

const sections = ['dashboard', 'users', 'communities', 'reports', 'moderation', 'support', 'premium', 'system', 'logs'] as const;

export const AdminPanel: React.FC = () => {
  const [tab, setTab] = useState<(typeof sections)[number]>('dashboard');

  const stats = [
    { label: 'Total Users', value: '10,234', icon: Users, color: 'text-blue-400' },
    { label: 'Online Users', value: '3,456', icon: TrendingUp, color: 'text-green-400' },
    { label: 'Communities', value: '982', icon: Crown, color: 'text-purple-400' },
    { label: 'Pending Reports', value: '23', icon: AlertCircle, color: 'text-red-400' },
    { label: 'Support Tickets', value: '18', icon: LifeBuoy, color: 'text-yellow-400' },
    { label: 'Suspensions', value: '4', icon: Shield, color: 'text-orange-400' },
    { label: 'Platform Status', value: 'Healthy', icon: Activity, color: 'text-emerald-400' },
    { label: 'Premium MRR', value: '$12.5K', icon: BarChart3, color: 'text-pink-400' },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-white mb-2">Nexa Staff Admin</h1>
        <p className="text-gray-400 mb-8">
          Demo admin tools are protected in the frontend for staff UX only. Real enforcement must live in the backend.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                  <Icon size={20} className={stat.color} />
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="flex gap-4 mb-6 border-b border-dark-700 overflow-x-auto">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => setTab(section)}
              className={`px-4 py-2 font-medium capitalize whitespace-nowrap transition ${
                tab === section
                  ? 'text-nexa-400 border-b-2 border-nexa-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {section}
            </button>
          ))}
        </div>

        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
          <h2 className="text-xl font-bold text-white mb-3 capitalize">{tab}</h2>
          <p className="text-gray-300 mb-4">
            This admin section is wired for demo workflows with mock metrics, local state, and backend-ready boundaries.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-dark-700/60 border border-dark-600 p-4">
              <h3 className="text-white font-semibold mb-2">Queue Snapshot</h3>
              <p className="text-sm text-gray-400">Open reports, flagged rooms, support escalations, and premium disputes appear here.</p>
            </div>
            <div className="rounded-2xl bg-dark-700/60 border border-dark-600 p-4">
              <h3 className="text-white font-semibold mb-2">Backend Note</h3>
              <p className="text-sm text-gray-400">Do not trust these client-side controls for real permissions. Server checks still need to be implemented.</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
