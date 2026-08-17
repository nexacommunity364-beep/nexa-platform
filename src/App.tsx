import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store/appStore';
import { Login } from './pages/auth/Login';
import { SignUp } from './pages/auth/SignUp';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { Home } from './pages/Home';
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
            <Route path="/home" element={<Home />} />
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
