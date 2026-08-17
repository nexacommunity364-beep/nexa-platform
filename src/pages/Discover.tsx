import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { MOCK_COMMUNITIES } from '../data/mockData';
import { CommunityCard } from '../components/CommunityCard';
import { Button } from '../components/Button';
import { Search, Filter, Flame, Sparkles, Rocket } from 'lucide-react';

export const Discover: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Gaming', 'Roblox', 'Minecraft', 'Technology', 'Developers', 'Music', 'Art', 'Entertainment', 'Social', 'Education', 'Memes'];

  const filteredCommunities = MOCK_COMMUNITIES.filter((c) => {
    const matchesCategory = !selectedCategory || c.category === selectedCategory;
    const matchesSearch = !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Discover Communities</h1>
          <p className="text-gray-400">Find communities that match your interests</p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search communities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:border-nexa-500 transition"
            />
          </div>
          <Button variant="secondary">
            <Filter size={20} />
            Filters
          </Button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
              selectedCategory === null
                ? 'bg-nexa-600 text-white'
                : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-nexa-600 text-white'
                  : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Flame size={24} className="text-orange-500" />
            Trending 🔥
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_COMMUNITIES.slice(0, 3).map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                icon={community.icon}
                name={community.name}
                description={community.description}
                members={community.memberCount}
                banner={community.banner}
                category={community.category}
              />
            ))}
          </div>
        </div>

        {/* Recommended */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles size={24} className="text-nexa-400" />
            Recommended For You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_COMMUNITIES.slice(1, 4).map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                icon={community.icon}
                name={community.name}
                description={community.description}
                members={community.memberCount}
                banner={community.banner}
                category={community.category}
              />
            ))}
          </div>
        </div>

        {/* All Communities */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Rocket size={24} className="text-nexa-500" />
            All Communities
          </h2>
          {filteredCommunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCommunities.map((community) => (
                <CommunityCard
                  key={community.id}
                  id={community.id}
                  icon={community.icon}
                  name={community.name}
                  description={community.description}
                  members={community.memberCount}
                  banner={community.banner}
                  category={community.category}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No communities found. Try adjusting your search.</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};
