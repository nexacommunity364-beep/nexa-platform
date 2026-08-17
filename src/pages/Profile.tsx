import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../components/Button';
import { Calendar, Link as LinkIcon, MapPin, Trophy, Star } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export const Profile: React.FC = () => {
  const { username } = useParams();
  const { currentUser, users } = useAppStore();
  const profileUser = users.find((user) => user.username === username) || currentUser;

  if (!profileUser) {
    return <MainLayout><div className="p-6 text-gray-400">Profile unavailable.</div></MainLayout>;
  }

  const xpProgress = Math.min(100, Math.round((profileUser.xp / profileUser.xpNeeded) * 100));

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto pb-10">
        <div
          className="h-56 rounded-b-3xl bg-cover bg-center"
          style={{ backgroundImage: `url(${profileUser.banner})` }}
        />

        <div className="px-6 -mt-16">
          <div className="bg-dark-800 border border-dark-700 rounded-3xl overflow-hidden shadow-xl">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex flex-col md:flex-row gap-5">
                  <img
                    src={profileUser.avatar}
                    alt={profileUser.displayName}
                    className="w-28 h-28 rounded-3xl border-4 border-dark-800 shadow-lg"
                  />
                  <div className="space-y-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h1 className="text-3xl font-bold text-white">{profileUser.displayName}</h1>
                        {profileUser.isPremium && (
                          <span className="px-3 py-1 rounded-full bg-nexa-500/10 text-nexa-300 text-sm">
                            Premium
                          </span>
                        )}
                      </div>
                      <p className="text-lg text-gray-400">@{profileUser.username}</p>
                    </div>
                    <p className="text-gray-200 max-w-2xl">{profileUser.bio}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      {profileUser.location && (
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          {profileUser.location}
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        Joined {profileUser.joinedDate.toLocaleDateString()}
                      </div>
                      {profileUser.socialLinks?.website && (
                        <a
                          href={profileUser.socialLinks.website}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 hover:text-nexa-300"
                        >
                          <LinkIcon size={16} />
                          Website
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {currentUser?.id === profileUser.id && (
                  <Link to="/profile/edit">
                    <Button variant="secondary">Edit Profile</Button>
                  </Link>
                )}
              </div>

              <div className="grid md:grid-cols-[1.4fr,1fr] gap-6 mt-8">
                <div className="bg-dark-700/60 rounded-2xl p-5 border border-dark-700">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-white font-semibold">Level & XP</h2>
                    <span className="text-sm text-nexa-300">Level {profileUser.level}</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-dark-700 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-nexa-500 to-nexa-700" style={{ width: `${xpProgress}%` }} />
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    {profileUser.xp.toLocaleString()} / {profileUser.xpNeeded.toLocaleString()} XP
                  </p>
                </div>

                <div className="bg-dark-700/60 rounded-2xl p-5 border border-dark-700">
                  <h2 className="text-white font-semibold mb-4">Badges</h2>
                  <div className="flex flex-wrap gap-2">
                    {profileUser.badges.map((badge) => (
                      <span
                        key={badge.id}
                        className="px-3 py-2 rounded-xl bg-dark-700 text-sm text-gray-200 border border-dark-600"
                        title={badge.description}
                      >
                        {badge.icon} {badge.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-dark-700/60 rounded-2xl p-5 border border-dark-700">
                <h2 className="text-white font-semibold mb-4">Achievements</h2>
                <div className="grid md:grid-cols-3 gap-3">
                  {(profileUser.achievements || ['Started a profile', 'Joined a community', 'Sent first message']).map((achievement) => (
                    <div key={achievement} className="rounded-2xl bg-dark-700 p-4 border border-dark-600">
                      <div className="flex items-center gap-2 text-nexa-300 mb-2">
                        <Trophy size={16} />
                        <Star size={16} />
                      </div>
                      <p className="text-sm text-gray-200">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
