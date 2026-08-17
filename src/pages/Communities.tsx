import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { InputField } from '../components/InputField';
import { CommunityCard } from '../components/CommunityCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/Tabs';
import { MOCK_COMMUNITIES } from '../data/mockData';

export const Communities: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('joined');

  const filteredCommunities = MOCK_COMMUNITIES.filter((community) =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const joinedCommunities = filteredCommunities.filter((c) => c.isMember);
  const exploredCommunities = filteredCommunities.filter((c) => !c.isMember);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Communities</h1>
          <p className="text-gray-400">Join communities and connect with like-minded people</p>
        </div>

        {/* Search */}
        <InputField
          placeholder="Search communities..."
          value={searchQuery}
          onChange={setSearchQuery}
        />

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="joined">Joined ({joinedCommunities.length})</TabsTrigger>
            <TabsTrigger value="discover">Discover ({exploredCommunities.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="joined" className="space-y-4">
            {joinedCommunities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {joinedCommunities.map((community) => (
                  <CommunityCard
                    key={community.id}
                    id={community.id}
                    icon={community.icon}
                    name={community.name}
                    description={community.description}
                    members={community.members}
                    category={community.category}
                    isPublic={community.isPublic}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 text-center text-gray-400">
                <p>You haven't joined any communities yet</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="discover" className="space-y-4">
            {exploredCommunities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exploredCommunities.map((community) => (
                  <CommunityCard
                    key={community.id}
                    id={community.id}
                    icon={community.icon}
                    name={community.name}
                    description={community.description}
                    members={community.members}
                    category={community.category}
                    isPublic={community.isPublic}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 text-center text-gray-400">
                <p>No new communities to explore</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};