import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { CommunityCard } from '../components/CommunityCard';
import { InputField } from '../components/InputField';
import { Plus } from 'lucide-react';
import { Button } from '../components/Button';
import { MOCK_COMMUNITIES } from '../data/mockData';

export const Communities: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'joined' | 'recommended'>('all');

  const filteredCommunities = MOCK_COMMUNITIES.filter((comm) =>
    comm.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Communities</h1>
          <Button>
            <Plus size={20} />
            Create Community
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          <InputField
            placeholder="Search communities..."
            value={searchQuery}
            onChange={setSearchQuery}
          />

          <div className="flex gap-2">
            {(['all', 'joined', 'recommended'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg capitalize transition ${
                  filter === f
                    ? 'bg-nexa-600 text-white'
                    : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCommunities.map((community) => (
            <CommunityCard key={community.id} {...community} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};
