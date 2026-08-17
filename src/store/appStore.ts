import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Community, Friend, DirectMessage, Notification, Post, SupportTicket } from '../types';
import {
  MOCK_COMMUNITIES,
  MOCK_DIRECT_MESSAGES,
  MOCK_FRIENDS,
  MOCK_NOTIFICATIONS,
  MOCK_POSTS,
  MOCK_SUPPORT_TICKETS,
  MOCK_USERS,
} from '../data/mockData';

interface AppStore {
  // Auth
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  updateCurrentUser: (updates: Partial<User>) => void;

  // Users
  users: User[];
  setUsers: (users: User[]) => void;

  // Communities
  communities: Community[];
  setCommunities: (communities: Community[]) => void;
  addCommunity: (community: Community) => void;
  toggleCommunityMembership: (communityId: string) => void;

  // Friends
  friends: Friend[];
  setFriends: (friends: Friend[]) => void;
  addFriend: (friend: Friend) => void;
  removeFriend: (friendId: string) => void;

  // Messages
  directMessages: DirectMessage[];
  addDirectMessage: (message: DirectMessage) => void;

  // Feed
  posts: Post[];
  addPost: (post: Post) => void;
  togglePostLike: (postId: string) => void;

  // Notifications
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  // Support
  supportTickets: SupportTicket[];
  addSupportTicket: (ticket: SupportTicket) => void;

  // UI State
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const reviveUser = (user: User | null) =>
  user
    ? {
        ...user,
        joinedDate: new Date(user.joinedDate),
      }
    : null;

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
  // Auth
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  updateCurrentUser: (updates) =>
    set((state) => ({
      currentUser: state.currentUser ? { ...state.currentUser, ...updates } : null,
    })),

  // Users
  users: MOCK_USERS,
  setUsers: (users) => set({ users }),

  // Communities
  communities: MOCK_COMMUNITIES,
  setCommunities: (communities) => set({ communities }),
  addCommunity: (community) =>
    set((state) => ({
      communities: [...state.communities, community],
    })),
  toggleCommunityMembership: (communityId) =>
    set((state) => ({
      communities: state.communities.map((community) => {
        if (community.id !== communityId || !state.currentUser) return community;

        const isMember = !community.isMember;
        const members = isMember
          ? Array.from(new Set([...community.members, state.currentUser.id]))
          : community.members.filter((memberId) => memberId !== state.currentUser?.id);

        return {
          ...community,
          isMember,
          members,
          memberCount: community.memberCount + (isMember ? 1 : -1),
        };
      }),
    })),

  // Friends
  friends: MOCK_FRIENDS,
  setFriends: (friends) => set({ friends }),
  addFriend: (friend) =>
    set((state) => ({
      friends: [...state.friends, friend],
    })),
  removeFriend: (friendId) =>
    set((state) => ({
      friends: state.friends.filter((f) => f.id !== friendId),
    })),

  // Messages
  directMessages: MOCK_DIRECT_MESSAGES,
  addDirectMessage: (message) =>
    set((state) => ({
      directMessages: [...state.directMessages, message],
    })),

  // Feed
  posts: MOCK_POSTS,
  addPost: (post) =>
    set((state) => ({
      posts: [post, ...state.posts],
    })),
  togglePostLike: (postId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.likes + (post.liked ? -1 : 1),
            }
          : post
      ),
    })),

  // Notifications
  notifications: MOCK_NOTIFICATIONS,
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),
  markNotificationAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
    })),
  markAllNotificationsAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
    })),

  // Support
  supportTickets: MOCK_SUPPORT_TICKETS,
  addSupportTicket: (ticket) =>
    set((state) => ({
      supportTickets: [ticket, ...state.supportTickets],
    })),

  // UI State
  theme: 'dark',
  setTheme: (theme) => set({ theme }),
  isSidebarOpen: false,
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
    }),
    {
      name: 'nexa-platform-store',
      partialize: (state) => ({
        currentUser: state.currentUser,
        theme: state.theme,
      }),
      merge: (persistedState, currentState) => {
        const typedState = persistedState as Partial<AppStore>;
        return {
          ...currentState,
          ...typedState,
          currentUser: reviveUser(typedState.currentUser ?? currentState.currentUser),
        };
      },
    }
  )
);
