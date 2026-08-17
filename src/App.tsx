import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store/appStore';
import { Login } from './pages/auth/Login';
import { SignUp } from './pages/auth/SignUp';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Friends } from './pages/Friends';
import { Messages } from './pages/Messages';
import { Communities } from './pages/Communities';
import { Discover } from './pages/Discover';
import { Notifications } from './pages/Notifications';
import { Settings } from './pages/Settings';
import { RoomChat } from './pages/RoomChat';
import { Reports } from './pages/Reports';
import { AdminPanel } from './pages/AdminPanel';
import { Premium } from './pages/Premium';
import { SupportCenter } from './pages/SupportCenter';
import { EditProfile } from './pages/EditProfile';
import './styles/globals.css';

function App() {
  const { currentUser } = useAppStore();

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        {currentUser ? (
          <>
            {/* Main Pages */}
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Community & Room Routes */}
            <Route path="/room/:roomId" element={<RoomChat />} />
            
            {/* Support & Legal */}
            <Route path="/reports" element={<Reports />} />
            <Route path="/support" element={<SupportCenter />} />
            <Route path="/premium" element={<Premium />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminPanel />} />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/home" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
