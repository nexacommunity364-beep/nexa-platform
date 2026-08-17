import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import { Mail, Lock } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleLogin = () => {
    const newErrors: Record<string, string> = {};

    if (!email.includes('@')) newErrors.email = 'Valid email is required';
    if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';

    if (Object.keys(newErrors).length === 0) {
      navigate('/home');
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

          <Button
            fullWidth
            className="mt-6"
            onClick={handleLogin}
          >
            Sign In
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-dark-800 text-gray-500">Or continue with</span>
            </div>
          </div>

          <Button
            variant="secondary"
            fullWidth
            className="mb-4"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M15.545 6.558a9.42 9.42 0 01.139 1.626c0 2.889-2.126 5.413-4.953 5.413-2.829 0-5.155-2.524-5.155-5.413 0-.55.062-1.08.181-1.594m0-4.894a9.42 9.42 0 00-.139-1.626c0-2.889 2.126-5.413 4.953-5.413 2.829 0 5.155 2.524 5.155 5.413 0 .55-.062 1.08-.181 1.594" />
            </svg>
            Google
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
