import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';
import { AlertCircle } from 'lucide-react';

export const Reports: React.FC = () => {
  const [reportType, setReportType] = useState('abuse');
  const [targetId, setTargetId] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    console.log({ reportType, targetId, description });
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-white mb-2">Report an Issue</h1>
        <p className="text-gray-400 mb-6">Help us maintain a safe community by reporting inappropriate content or users</p>

        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white focus:outline-none focus:border-nexa-500"
            >
              <option value="abuse">Abuse/Harassment</option>
              <option value="spam">Spam</option>
              <option value="inappropriate">Inappropriate Content</option>
              <option value="fraud">Fraud/Scam</option>
              <option value="other">Other</option>
            </select>
          </div>

          <InputField
            label="Target User/Post ID"
            placeholder="Enter the ID of the user or post"
            value={targetId}
            onChange={setTargetId}
          />

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              placeholder="Describe the issue in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:border-nexa-500 resize-none"
              rows={6}
            />
          </div>

          <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4 flex gap-3">
            <AlertCircle size={20} className="text-blue-400 flex-shrink-0" />
            <p className="text-sm text-blue-300">
              All reports are reviewed by our moderation team. False reports may result in penalties to your account.
            </p>
          </div>

          <Button onClick={handleSubmit} fullWidth>
            Submit Report
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};
