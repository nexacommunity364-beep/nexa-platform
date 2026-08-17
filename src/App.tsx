import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store/appStore';
import { ToastContainer } from './components/Toast';

// Auth Pages
import { Login } from './pages/auth/Login';
import { SignUp } from './pages/auth/SignUp';
import { ForgotPassword } from './pages/auth/ForgotPassword';

// Main Pages
import { Home } from './pages/Home';
import { Discover } from './pages/Discover';
import { Notifications } from './pages/Notifications';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';
import { EditProfile } from './pages/EditProfile';
import { Friends } from './pages/Friends';
import { Messages } from './pages/Messages';
import { Communities } from './pages/Communities';
import { RoomChat } from './pages/RoomChat';
import { Reports } from './pages/Reports';
import { AdminPanel } from './pages/AdminPanel';
import { Premium } from './pages/Premium';
import { SupportCenter } from './pages/SupportCenter';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  const { currentUser, theme } = useAppStore();
  const isAuthenticated = currentUser !== null;

  useEffect(() => {
    document.documentElement.classList.toggle('theme-light', theme === 'light');
  }, [theme]);

  return (
    <BrowserRouter>
      <>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/home" replace /> : <SignUp />} />
          <Route path="/forgot-password" element={isAuthenticated ? <Navigate to="/home" replace /> : <ForgotPassword />} />

          {/* Protected Routes */}
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/messages/:userId" element={<Messages />} />
              <Route path="/communities" element={<Communities />} />
              <Route path="/communities/:communityId" element={<Communities />} />
              <Route path="/communities/:communityId/room/:roomId" element={<RoomChat />} />
              <Route path="/reports" element={<Reports />} />
              <Route
                path="/admin"
                element={currentUser?.isStaff ? <AdminPanel /> : <Navigate to="/home" replace />}
              />
              <Route path="/premium" element={<Premium />} />
              <Route path="/support" element={<SupportCenter />} />
              <Route path="/support/requests" element={<SupportCenter />} />
              <Route path="*" element={<NotFoundPage />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
        <ToastContainer />
      </>
    </BrowserRouter>
  );
}

export default App;
