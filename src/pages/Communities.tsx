import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { useAppStore } from '../store/appStore';
import { MOCK_COMMUNITIES, MOCK_ROOMS } from '../data/mockData';
import { Button } from '../components/Button';
import { CommunityCard } from '../components/CommunityCard';
import { Plus, Users, Home as HomeIcon, Settings } from 'lucide-react';

export const Communities: React.FC = () => {
  const { communities, addCommunity } = useAppStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);
  const [newCommunity, setNewCommunity] = useState({
    name: '',
    description: '',
    category: 'Social' as any,
  });

  const handleCreateCommunity = () => {
    if (newCommunity.name.trim()) {
      const community = {
        id: `community-${Date.now()}`,
        name: newCommunity.name,
        icon: '🎮',
        banner: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=300&fit=crop',
        description: newCommunity.description,
        category: newCommunity.category,
        isPublic: true,
        ownerId: 'user-1',
        memberCount: 1,
        onlineCount: 1,
        createdAt: new Date(),
        rules: [],
        rooms: [],
        roles: [],
        events: [],
      };
      addCommunity(community);
      setShowCreateModal(false);
      setNewCommunity({ name: '', description: '', category: 'Social' });
    }
  };

  const selectedCommunityData = communities.find((c) => c.id === selectedCommunity);
  const communityRooms = MOCK_ROOMS.filter((r) => r.communityId === selectedCommunity);

  return (
    <MainLayout>
      <div className="flex h-full bg-dark-900">
        {/* Communities List */}
        <div className="w-full md:w-72 border-r border-dark-700 flex flex-col bg-dark-800 overflow-hidden">
          <div className="p-4 border-b border-dark-700">
            <Button fullWidth onClick={() => setShowCreateModal(true)}>
              <Plus size={20} />
              Create Community
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {communities.map((community) => (
              <button
                key={community.id}
                onClick={() => setSelectedCommunity(community.id)}
                className={`w-full flex items-center gap-3 p-3 transition border-l-4 ${
                  selectedCommunity === community.id
                    ? 'bg-dark-700 border-nexa-500'
                    : 'hover:bg-dark-700 border-transparent'
                }`}
              >
                <span className="text-2xl">{community.icon}</span>
                <div className="flex-1 min-w-0 text-left">
                  <p className="font-semibold text-white truncate text-sm">{community.name}</p>
                  <p className="text-xs text-gray-400">{community.memberCount.toLocaleString()} members</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Community View */}
        {selectedCommunityData ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Community Header */}
            <div
              className="h-40 bg-gradient-to-r from-nexa-600 to-nexa-700 relative border-b border-dark-700"
              style={{
                backgroundImage: `url(${selectedCommunityData.banner})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute bottom-4 left-6 flex items-end gap-3">
                <span className="text-4xl">{selectedCommunityData.icon}</span>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-white">{selectedCommunityData.name}</h2>
                  <p className="text-gray-200">{selectedCommunityData.memberCount.toLocaleString()} members</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 px-6 py-4 border-b border-dark-700">
              <button className="px-4 py-2 text-nexa-400 border-b-2 border-nexa-500 font-medium transition">
                <HomeIcon size={18} className="inline mr-2" />
                Home
              </button>
              <button className="px-4 py-2 text-gray-400 hover:text-white font-medium transition">
                <Users size={18} className="inline mr-2" />
                Members
              </button>
              <button className="px-4 py-2 text-gray-400 hover:text-white font-medium transition">
                <Settings size={18} className="inline mr-2" />
                Settings
              </button>
            </div>

            {/* Rooms */}
            <div className="flex-1 overflow-y-auto p-6">
              <h3 className="text-lg font-bold text-white mb-4">Rooms</h3>
              <div className="space-y-2">
                {communityRooms.length > 0 ? (
                  communityRooms.map((room) => (
                    <button
                      key={room.id}
                      className="w-full flex items-center gap-3 p-3 rounded-lg bg-dark-700 hover:bg-dark-600 transition text-left"
                    >
                      <span className="text-xl">{room.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white truncate">{room.name}</p>
                        <p className="text-xs text-gray-400">{room.description}</p>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="text-gray-400 text-center py-8">No rooms yet. Create one to get started!</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Users size={48} className="mx-auto text-gray-500 mb-4" />
              <p className="text-gray-400">Select a community to view</p>
            </div>
          </div>
        )}
      </div>

      {/* Create Community Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-800 rounded-lg shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-dark-700">
              <h2 className="text-xl font-bold text-white">Create Community</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Community Name</label>
                <input
                  type="text"
                  placeholder="My Awesome Community"
                  value={newCommunity.name}
                  onChange={(e) => setNewCommunity({ ...newCommunity, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:border-nexa-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  placeholder="What's this community about?"
                  value={newCommunity.description}
                  onChange={(e) => setNewCommunity({ ...newCommunity, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:border-nexa-500 resize-none h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  value={newCommunity.category}
                  onChange={(e) => setNewCommunity({ ...newCommunity, category: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white focus:outline-none focus:border-nexa-500"
                >
                  <option>Gaming</option>
                  <option>Technology</option>
                  <option>Social</option>
                  <option>Music</option>
                  <option>Art</option>
                  <option>Entertainment</option>
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-dark-700 flex gap-2">
              <Button
                variant="secondary"
                fullWidth
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </Button>
              <Button fullWidth onClick={handleCreateCommunity}>
                Create
              </Button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};
