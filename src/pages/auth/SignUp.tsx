import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import { Toast } from '../../components/Toast';
import { MOCK_CURRENT_USER } from '../../data/mockData';
import { useAppStore } from '../../store/appStore';

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAppStore();
  const [formData, setFormData] = useState({
    displayName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [verificationSent, setVerificationSent] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.displayName.trim()) newErrors.displayName = 'Display name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (validateForm()) {
      setVerificationSent(true);
      Toast.success('Verification email sent to your demo inbox.');
    }
  };

  const handleCompleteVerification = () => {
    setCurrentUser({
      ...MOCK_CURRENT_USER,
      displayName: formData.displayName,
      username: formData.username,
      email: formData.email,
      emailVerified: true,
    });
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-nexa-500 to-nexa-700 rounded-lg flex items-center justify-center font-bold text-2xl text-white shadow-lg shadow-nexa-500/50">
              N
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-nexa-400 to-nexa-600 bg-clip-text text-transparent">Nexa</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Join Nexa</h1>
          <p className="text-gray-400 mt-2">Your Community. Your Space. Your Way.</p>
        </div>

        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 shadow-2xl">
          {verificationSent ? (
            <div className="text-center space-y-4 py-6">
              <div className="w-16 h-16 mx-auto bg-nexa-500/10 border border-nexa-500/40 rounded-full flex items-center justify-center text-2xl">
                ✉️
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Verify your email</h2>
                <p className="text-gray-400">
                  We sent a demo verification link to <span className="text-white">{formData.email}</span>.
                </p>
              </div>
              <Button fullWidth onClick={handleCompleteVerification}>
                I verified my email
              </Button>
              <Button variant="secondary" fullWidth onClick={() => setVerificationSent(false)}>
                Back to sign up
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <InputField
                  label="Display Name"
                  placeholder="Your name"
                  value={formData.displayName}
                  onChange={(value) => setFormData({ ...formData, displayName: value })}
                  error={errors.displayName}
                  required
                />
                <InputField
                  label="Username"
                  placeholder="@username"
                  value={formData.username}
                  onChange={(value) => setFormData({ ...formData, username: value })}
                  error={errors.username}
                  required
                  helperText="This will be unique to your account"
                />
                <InputField
                  label="Email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(value) => setFormData({ ...formData, email: value })}
                  error={errors.email}
                  required
                />
                <InputField
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(value) => setFormData({ ...formData, password: value })}
                  error={errors.password}
                  required
                  helperText="Minimum 8 characters"
                />
                <InputField
                  label="Confirm Password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(value) => setFormData({ ...formData, confirmPassword: value })}
                  error={errors.confirmPassword}
                  required
                />
                <InputField
                  label="Date of Birth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(value) => setFormData({ ...formData, dateOfBirth: value })}
                  error={errors.dateOfBirth}
                  required
                />
              </div>
              <Button fullWidth className="mt-6" onClick={handleSignUp}>
                Create Account
              </Button>
            </>
          )}
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-nexa-400 hover:text-nexa-300 font-medium transition"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};
