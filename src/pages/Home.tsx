import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../components/Button';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { MOCK_POSTS, Post } from '../data/mockData';
import { useAppStore } from '../store/appStore';

export const Home: React.FC = () => {
  const { currentUser } = useAppStore();
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);

  const handleCreatePost = () => {
    if (postContent.trim() && currentUser) {
      const newPost: Post = {
        id: Date.now().toString(),
        authorId: currentUser.id,
        authorName: currentUser.displayName,
        authorAvatar: currentUser.avatar,
        content: postContent,
        timestamp: new Date(),
        likes: 0,
        comments: 0,
        shares: 0,
        liked: false,
      };
      setPosts([newPost, ...posts]);
      setPostContent('');
    }
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Create Post */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
          <div className="flex gap-4 mb-4">
            {currentUser && (
              <img
                src={currentUser.avatar}
                alt={currentUser.displayName}
                className="w-12 h-12 rounded-full flex-shrink-0"
              />
            )}
            <div className="flex-1">
              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full px-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:border-nexa-500 transition resize-none"
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleCreatePost} disabled={!postContent.trim()}>
              Post
            </Button>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-dark-800 rounded-lg p-6 border border-dark-700 hover:border-nexa-500 transition">
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
                    {post.timestamp.toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-gray-100 mb-4 leading-relaxed">{post.content}</p>

              {/* Post Actions */}
              <div className="flex items-center gap-4 pt-4 border-t border-dark-700 text-gray-400">
                <button className="flex items-center gap-2 hover:text-red-500 transition group">
                  <Heart size={18} className={post.liked ? 'fill-red-500 text-red-500' : 'group-hover:fill-red-500'} />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-blue-500 transition">
                  <MessageCircle size={18} />
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-green-500 transition">
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
