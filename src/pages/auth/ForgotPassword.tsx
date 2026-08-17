import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import { ArrowLeft } from 'lucide-react';

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email.includes('@')) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 text-nexa-400 hover:text-nexa-300 mb-8 transition"
        >
          <ArrowLeft size={20} />
          Back to Login
        </button>

        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 shadow-2xl">
          {!submitted ? (
            <>
              <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
              <p className="text-gray-400 mb-6">Enter your email and we'll send you a link to reset your password.</p>

              <InputField
                label="Email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={setEmail}
                required
              />

              <Button
                fullWidth
                className="mt-6"
                onClick={handleSubmit}
              >
                Send Reset Link
              </Button>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Check your email</h2>
              <p className="text-gray-400 mb-6">We've sent a password reset link to {email}</p>
              <Button
                fullWidth
                variant="secondary"
                onClick={() => navigate('/login')}
              >
                Back to Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
