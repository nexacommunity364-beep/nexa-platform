import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Heart, MessageCircle, Share2, Search } from 'lucide-react';
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';
import { useAppStore } from '../store/appStore';
import { MOCK_POSTS } from '../data/mockData';

export const Home: React.FC = () => {
  const { currentUser } = useAppStore();
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [newPostContent, setNewPostContent] = useState('');

  const handleCreatePost = () => {
    if (newPostContent.trim()) {
      const newPost = {
        id: Date.now().toString(),
        authorId: currentUser?.id || '',
        authorName: currentUser?.displayName || '',
        authorAvatar: currentUser?.avatar || '',
        content: newPostContent,
        timestamp: new Date(),
        likes: 0,
        comments: 0,
        shares: 0,
        liked: false,
      };
      setPosts([newPost, ...posts]);
      setNewPostContent('');
    }
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Create Post */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
          <div className="flex gap-4 mb-4">
            <img
              src={currentUser?.avatar}
              alt={currentUser?.displayName}
              className="w-10 h-10 rounded-full"
            />
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="What's on your mind?"
              className="flex-1 bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-nexa-500 resize-none"
              rows={4}
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleCreatePost} disabled={!newPostContent.trim()}>
              Post
            </Button>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-dark-800 rounded-lg p-6 border border-dark-700">
              {/* Post Header */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold text-white">{post.authorName}</p>
                  <p className="text-xs text-gray-400">
                    {post.timestamp.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-gray-100 mb-4">{post.content}</p>

              {/* Post Actions */}
              <div className="flex items-center justify-around pt-4 border-t border-dark-700 text-gray-400">
                <button className="flex items-center gap-2 hover:text-nexa-400 transition">
                  <Heart size={18} />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-nexa-400 transition">
                  <MessageCircle size={18} />
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-nexa-400 transition">
                  <Share2 size={18} />
                  <span className="text-sm">{post.shares}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};
