import React from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../components/Button';
import { Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-nexa-500 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-white mb-2">Page Not Found</h2>
          <p className="text-gray-400 mb-8">The page you're looking for doesn't exist or has been moved.</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate('/home')}>
              <Home size={18} />
              Go Home
            </Button>
            <Button variant="secondary" onClick={() => navigate(-1)}>
              <ArrowLeft size={18} />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
