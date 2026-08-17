import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import { useAppStore } from '../../store/appStore';
import { MOCK_CURRENT_USER } from '../../data/mockData';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleLogin = () => {
    const newErrors: Record<string, string> = {};

    if (!email.includes('@')) newErrors.email = 'Valid email is required';
    if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';

    if (Object.keys(newErrors).length === 0) {
      setCurrentUser(MOCK_CURRENT_USER);
      navigate('/');
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-nexa-500 to-nexa-700 rounded-lg flex items-center justify-center font-bold text-2xl text-white shadow-lg shadow-nexa-500/50">
              N
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-nexa-400 to-nexa-600 bg-clip-text text-transparent">Nexa</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400 mt-2">Your Community. Your Space. Your Way.</p>
        </div>

        {/* Form */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 shadow-2xl">
          <div className="space-y-4">
            <InputField
              label="Email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={setEmail}
              error={errors.email}
              required
            />

            <InputField
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={setPassword}
              error={errors.password}
              required
            />

            <div className="flex justify-end">
              <button
                onClick={() => navigate('/forgot-password')}
                className="text-sm text-nexa-400 hover:text-nexa-300 transition"
              >
                Forgot password?
              </button>
            </div>
          </div>

          <Button fullWidth className="mt-6" onClick={handleLogin}>
            Sign In
          </Button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-nexa-400 hover:text-nexa-300 font-medium transition"
          >
            Create one
          </button>
        </p>
      </div>
    </div>
  );
};
