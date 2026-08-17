import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../components/Button';
import { MessageSquare, Plus, Search, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export const SupportCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'browse' | 'myTickets' | 'create'>('browse');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'account', name: 'Account & Profile', icon: '📋', articles: 12 },
    { id: 'community', name: 'Communities', icon: '🏘️', articles: 18 },
    { id: 'billing', name: 'Billing & Premium', icon: '💳', articles: 9 },
    { id: 'technical', name: 'Technical Issues', icon: '🔧', articles: 24 },
    { id: 'moderation', name: 'Moderation & Safety', icon: '🛡️', articles: 15 },
    { id: 'features', name: 'Features', icon: '✨', articles: 21 },
  ];

  const tickets = [
    { id: 'TKT-001', title: 'Cannot verify email', status: 'open', created: '2 days ago' },
    { id: 'TKT-002', title: 'Premium payment declined', status: 'inReview', created: '5 hours ago' },
    { id: 'TKT-003', title: 'Account recovery request', status: 'solved', created: '1 week ago' },
  ];

  const articles = [
    'How to create a community',
    'Setting up two-factor authentication',
    'Understanding roles and permissions',
    'How to report inappropriate content',
    'Troubleshooting connection issues',
  ];

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Support Center</h1>
          <p className="text-gray-400">Get help and connect with our support team</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-dark-700">
          {[
            { id: 'browse', label: 'Browse Help' },
            { id: 'myTickets', label: 'My Tickets' },
            { id: 'create', label: 'Create Ticket' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 font-medium transition border-b-2 ${
                activeTab === tab.id
                  ? 'text-nexa-400 border-nexa-500'
                  : 'text-gray-400 border-transparent hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Browse Help */}
        {activeTab === 'browse' && (
          <div className="space-y-6">
            {/* Search */}
            <div className="relative mb-8">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search articles and FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:border-nexa-500 transition"
              />
            </div>

            {/* Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-6 rounded-lg border transition text-left ${
                    selectedCategory === cat.id
                      ? 'bg-nexa-600/20 border-nexa-500'
                      : 'bg-dark-800 border-dark-700 hover:border-dark-600'
                  }`}
                >
                  <span className="text-3xl mb-2 block">{cat.icon}</span>
                  <h3 className="font-semibold text-white mb-1">{cat.name}</h3>
                  <p className="text-xs text-gray-400">{cat.articles} articles</p>
                </button>
              ))}
            </div>

            {/* Articles */}
            {selectedCategory && (
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-white">Popular Articles</h2>
                {articles.map((article, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="block p-4 rounded-lg bg-dark-800 border border-dark-700 hover:border-nexa-500 hover:bg-dark-700 transition"
                  >
                    <p className="text-white font-medium hover:text-nexa-400 transition">{article}</p>
                    <p className="text-xs text-gray-400 mt-1">5 min read</p>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* My Tickets */}
        {activeTab === 'myTickets' && (
          <div className="space-y-4">
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="p-4 rounded-lg bg-dark-800 border border-dark-700 hover:border-dark-600 transition flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-white">{ticket.title}</p>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          ticket.status === 'open'
                            ? 'bg-blue-500/20 text-blue-400'
                            : ticket.status === 'inReview'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-green-500/20 text-green-400'
                        }`}
                      >
                        {ticket.status === 'open'
                          ? 'Open'
                          : ticket.status === 'inReview'
                          ? 'In Review'
                          : 'Solved'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{ticket.id} • Created {ticket.created}</p>
                  </div>
                  <Button variant="secondary" size="sm">
                    View
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <MessageSquare size={48} className="mx-auto text-gray-500 mb-4" />
                <p className="text-gray-400">No support tickets yet</p>
              </div>
            )}
          </div>
        )}

        {/* Create Ticket */}
        {activeTab === 'create' && (
          <div className="max-w-2xl">
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
              <h2 className="text-xl font-bold text-white mb-6">Create Support Ticket</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select className="w-full px-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white focus:outline-none focus:border-nexa-500">
                    <option>Account & Profile</option>
                    <option>Communities</option>
                    <option>Billing & Premium</option>
                    <option>Technical Issues</option>
                    <option>Moderation & Safety</option>
                    <option>Features</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    placeholder="Brief description of your issue"
                    className="w-full px-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:border-nexa-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    placeholder="Provide detailed information about your issue..."
                    rows={6}
                    className="w-full px-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:border-nexa-500 resize-none"
                  />
                </div>
                <Button fullWidth>
                  <Plus size={18} />
                  Submit Ticket
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
