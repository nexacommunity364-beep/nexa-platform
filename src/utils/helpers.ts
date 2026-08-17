// Format number to K, M, B format
export const formatNumber = (num: number): string => {
  if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

// Get initials from name
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Check if URL is valid
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Generate random ID
export const generateId = (prefix = ''): string => {
  return prefix + Math.random().toString(36).substr(2, 9);
};

// Check if user is online (mock)
export const isUserOnline = (lastSeen: Date): boolean => {
  const diff = Date.now() - lastSeen.getTime();
  return diff < 5 * 60 * 1000; // 5 minutes
};

// Format time ago
export const timeAgo = (date: Date): string => {
  const diff = Date.now() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString();
};

// Validate email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate username
export const isValidUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

// Get color for status
export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    away: 'bg-yellow-500',
    dnd: 'bg-red-500',
  };
  return colors[status] || 'bg-gray-500';
};

// Debounce function
export const debounce = <T extends any[]>(
  func: (...args: T) => void,
  delay: number
): ((...args: T) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: T) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Throttle function
export const throttle = <T extends any[]>(
  func: (...args: T) => void,
  limit: number
): ((...args: T) => void) => {
  let inThrottle: boolean;
  return (...args: T) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
