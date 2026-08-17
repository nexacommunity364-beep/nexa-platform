// Types for the entire Nexa platform

export type OnlineStatus = 'online' | 'idle' | 'dnd' | 'offline' | 'invisible';

export interface CustomStatus {
  emoji: string;
  text: string;
  clearsAt?: 'never' | '1hour' | '4hours' | 'today';
}

export interface User {
  id: string;
  displayName: string;
  username: string;
  email: string;
  avatar: string;
  banner: string;
  bio: string;
  customStatus?: CustomStatus;
  onlineStatus: OnlineStatus;
  level: number;
  xp: number;
  xpNeeded: number;
  badges: Badge[];
  joinedDate: Date;
  socialLinks?: {
    twitter?: string;
    twitch?: string;
    youtube?: string;
    website?: string;
  };
  isPremium: boolean;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Friend {
  id: string;
  userId: string;
  status: 'pending' | 'accepted' | 'blocked';
  createdAt: Date;
  mutualFriends: number;
}

export interface DirectMessage {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  createdAt: Date;
  edited: boolean;
  reactions: MessageReaction[];
  attachments: MessageAttachment[];
}

export interface GroupChat {
  id: string;
  name: string;
  icon: string;
  members: string[];
  ownerId: string;
  createdAt: Date;
  messages: DirectMessage[];
}

export interface Community {
  id: string;
  name: string;
  icon: string;
  banner: string;
  description: string;
  category: CommunityCategory;
  isPublic: boolean;
  ownerId: string;
  memberCount: number;
  onlineCount: number;
  createdAt: Date;
  rules: string[];
  rooms: Room[];
  roles: CommunityRole[];
  events: CommunityEvent[];
  inviteCode?: string;
}

export type CommunityCategory = 'Gaming' | 'Roblox' | 'Minecraft' | 'Technology' | 'Developers' | 'Music' | 'Art' | 'Entertainment' | 'Social' | 'Education' | 'Memes' | 'Other';

export interface Room {
  id: string;
  communityId: string;
  name: string;
  icon: string;
  description: string;
  messages: Message[];
  isPrivate: boolean;
  createdAt: Date;
}

export interface Message {
  id: string;
  authorId: string;
  roomId: string;
  content: string;
  createdAt: Date;
  edited: boolean;
  reactions: MessageReaction[];
  attachments: MessageAttachment[];
  repliedTo?: string;
  mentions: string[];
}

export interface MessageReaction {
  emoji: string;
  users: string[];
}

export interface MessageAttachment {
  id: string;
  url: string;
  type: 'image' | 'video' | 'file' | 'gif';
  name: string;
}

export interface CommunityRole {
  id: string;
  communityId: string;
  name: string;
  color: string;
  icon: string;
  position: number;
  permissions: string[];
  isPermanent: boolean;
  members: string[];
}

export interface CommunityEvent {
  id: string;
  communityId: string;
  title: string;
  description: string;
  image: string;
  date: Date;
  time: string;
  attendees: string[];
  interested: string[];
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  content: string;
  relatedId?: string;
  isRead: boolean;
  createdAt: Date;
}

export type NotificationType = 'friendRequest' | 'mention' | 'reply' | 'communityInvite' | 'roleChange' | 'warning' | 'event' | 'support' | 'announcement';

export interface Report {
  id: string;
  reporterId: string;
  targetId: string;
  targetType: 'user' | 'message' | 'community';
  reason: ReportReason;
  description: string;
  status: 'pending' | 'reviewing' | 'resolved' | 'dismissed';
  createdAt: Date;
}

export type ReportReason = 'harassment' | 'spam' | 'scam' | 'threats' | 'hate' | 'sexual' | 'childSafety' | 'impersonation' | 'suspicious' | 'dangerous' | 'other';

export interface SupportTicket {
  id: string;
  userId: string;
  category: SupportCategory;
  title: string;
  description: string;
  status: 'open' | 'inReview' | 'solved';
  replies: SupportReply[];
  createdAt: Date;
}

export type SupportCategory = 'account' | 'community' | 'billing' | 'premium' | 'bug' | 'report' | 'safety' | 'technical' | 'other';

export interface SupportReply {
  id: string;
  authorId: string;
  content: string;
  createdAt: Date;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  createdBy: string;
  createdAt: Date;
}

export interface PollOption {
  id: string;
  text: string;
  votes: string[];
}
