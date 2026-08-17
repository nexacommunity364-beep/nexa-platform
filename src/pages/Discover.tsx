import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { InputField } from '../components/InputField';
import { Flame, TrendingUp, Users, Zap } from 'lucide-react';

export const Discover: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('trending');

  const categories = [
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'popular', label: 'Popular', icon: Flame },
    { id: 'new', label: 'New', icon: Zap },
    { id: 'communities', label: 'Communities', icon: Users },
  ];

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-white mb-6">Discover</h1>

        {/* Search */}
        <div className="mb-6">
          <InputField
            placeholder="Discover content, people, and communities..."
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        {/* Categories */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition ${
                  selectedCategory === cat.id
                    ? 'bg-nexa-600 text-white'
                    : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                }`}
              >
                <Icon size={18} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-dark-800 rounded-lg p-4 border border-dark-700 hover:border-nexa-500 transition cursor-pointer"
            >
              <div className="w-full h-48 bg-gradient-to-br from-nexa-600 to-nexa-700 rounded-lg mb-4"></div>
              <h3 className="font-semibold text-white mb-2">Discovery Card {i + 1}</h3>
              <p className="text-sm text-gray-400">Explore trending content and communities</p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};
