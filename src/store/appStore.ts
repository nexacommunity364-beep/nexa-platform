import { create } from 'zustand';
import { User, Community, Friend, DirectMessage, GroupChat, Notification } from '../types';
import { MOCK_CURRENT_USER, MOCK_USERS, MOCK_FRIENDS, MOCK_COMMUNITIES } from '../data/mockData';

interface AppStore {
  // Auth
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;

  // Users
  users: User[];
  setUsers: (users: User[]) => void;

  // Communities
  communities: Community[];
  setCommunities: (communities: Community[]) => void;
  addCommunity: (community: Community) => void;

  // Friends
  friends: Friend[];
  setFriends: (friends: Friend[]) => void;
  addFriend: (friend: Friend) => void;
  removeFriend: (friendId: string) => void;

  // Messages
  directMessages: DirectMessage[];
  addDirectMessage: (message: DirectMessage) => void;

  // Notifications
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  // UI State
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  // Auth
  currentUser: MOCK_CURRENT_USER,
  setCurrentUser: (user) => set({ currentUser: user }),

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
  directMessages: [],
  addDirectMessage: (message) =>
    set((state) => ({
      directMessages: [...state.directMessages, message],
    })),

  // Notifications
  notifications: [],
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

  // UI State
  theme: 'dark',
  setTheme: (theme) => set({ theme }),
  isSidebarOpen: false,
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
}));
