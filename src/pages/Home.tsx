import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';
import { MessageBubble } from '../components/MessageBubble';
import { Heart, MessageCircle, Share2, Image, Smile } from 'lucide-react';
import { MOCK_POSTS, MOCK_USERS } from '../data/mockData';

export const Home: React.FC = () => {
  const [postContent, setPostContent] = useState('');
  const currentUser = MOCK_USERS[0];

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto py-8 px-4">
        {/* Create Post */}
        <div className="bg-dark-800 rounded-lg border border-dark-700 p-6 mb-8">
          <div className="flex gap-4 mb-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.displayName}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full bg-dark-700 text-white placeholder-gray-500 rounded-lg p-3 outline-none focus:border focus:border-nexa-500 resize-none text-lg"
                rows={3}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button className="p-2 rounded-lg hover:bg-dark-700 transition text-gray-400 hover:text-white">
                <Image size={20} />
              </button>
              <button className="p-2 rounded-lg hover:bg-dark-700 transition text-gray-400 hover:text-white">
                <Smile size={20} />
              </button>
            </div>
            <Button disabled={!postContent.trim()}>Post</Button>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {MOCK_POSTS.map((post) => (
            <div key={post.id} className="bg-dark-800 rounded-lg border border-dark-700 p-6">
              {/* Post Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.displayName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{post.author.displayName}</h4>
                    <p className="text-xs text-gray-500">@{post.author.username}</p>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-gray-100 mb-4">{post.content}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="post"
                  className="w-full rounded-lg mb-4 max-h-96 object-cover"
                />
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between text-gray-500 text-sm border-t border-dark-700 pt-4 mt-4">
                <button className="flex items-center gap-2 hover:text-red-400 transition">
                  <Heart size={16} />
                  {post.likes}
                </button>
                <button className="flex items-center gap-2 hover:text-nexa-400 transition">
                  <MessageCircle size={16} />
                  {post.comments}
                </button>
                <button className="flex items-center gap-2 hover:text-green-400 transition">
                  <Share2 size={16} />
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};
