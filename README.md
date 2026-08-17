# 🚀 Nexa - Your Community. Your Space. Your Way.

Nexa is a modern social and community platform for chatting, gaming communities, friends, profiles, discovery, and messaging.

## Features

✨ **Modern Social Platform**
- User profiles with customizable banners and avatars
- Friend system with requests and management
- Direct messaging with group chat support
- Online status and custom status

🎮 **Community System**
- Create and manage communities
- Organize communication with rooms (not channels)
- Role-based access control with permanent roles
- Community rules and moderation
- Events and announcements
- Built-in polls

🌍 **Discovery**
- Trending communities
- Personalized recommendations
- Browse by category
- Global search for users and communities

⚙️ **Rich Features**
- Notification center
- Report system
- Block and safety management
- Premium features
- Comprehensive settings
- Support center
- Admin panel

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Lucide React** - Icons

## Getting Started

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Build for Production
```bash
npm run build
```

## Project Structure

```
src/
├── components/        # Reusable components
├── pages/            # Page components
├── layouts/          # Layout wrappers
├── store/            # Zustand stores (state management)
├── data/             # Mock data and constants
├── utils/            # Utility functions
├── styles/           # Global styles
├── App.tsx           # Main app component
└── main.tsx          # Entry point
```

## Architecture

Nexa is built as a frontend prototype designed to prepare for backend integration:

- **Authentication**: Prepared for OAuth/JWT integration
- **State Management**: Zustand stores ready for API calls
- **Mock Data**: Separated from components for easy replacement
- **API Ready**: Components structured for REST/GraphQL endpoints
- **Security**: No sensitive data in frontend code

## Features Not Included (By Design)

❌ **No Private Calling** - No voice/video calls between users
- Direct Messages are text-only
- Future community voice rooms may be added

## Unique Identity

Nexa is **not** a Discord clone:
- Custom design and layout
- Unique color scheme (not blurple)
- Different terminology (Communities, Rooms, not Servers/Channels)
- Original UI components and patterns
- Premium-feeling modern design

## Premium Features

⭐ Premium Badge
🎨 Additional Profile Themes
✨ Profile Effects
🖼 Animated Banners
👤 Animated Avatars
📁 Larger Upload Limits
🌐 More Community Customization

Core messaging features remain free.

## Backend Integration Ready

When connecting a real backend:

1. Replace mock data with API calls
2. Add authentication tokens to requests
3. Connect Zustand stores to API endpoints
4. Implement WebSocket for real-time updates
5. Add server-side validation and permissions

## License

MIT
