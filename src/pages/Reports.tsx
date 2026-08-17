import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Flag, MessageSquare, AlertTriangle } from 'lucide-react';

export const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'user' | 'message' | 'community'>('user');
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [reportDescription, setReportDescription] = useState('');

  const reasons = [
    'Harassment',
    'Spam',
    'Scam',
    'Threats',
    'Hate Speech',
    'Sexual Content',
    'Child Safety',
    'Impersonation',
    'Suspicious Activity',
    'Dangerous Content',
    'Other',
  ];

  const handleSubmitReport = () => {
    if (selectedReason && reportDescription) {
      setShowReportModal(false);
      setSelectedReason('');
      setReportDescription('');
      alert('Report submitted successfully. Our team will review it shortly.');
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2 mb-2">
            <AlertTriangle size={32} />
            Report a Problem
          </h1>
          <p className="text-gray-400">Help us keep Nexa safe. Report violations and harmful content.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-dark-700">
          {['user', 'message', 'community'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-3 font-medium transition border-b-2 capitalize ${
                activeTab === tab
                  ? 'text-nexa-400 border-nexa-500'
                  : 'text-gray-400 border-transparent hover:text-gray-300'
              }`}
            >
              Report {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left - Instructions */}
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 h-fit">
            <h2 className="text-lg font-bold text-white mb-4">Important Information</h2>
            <div className="space-y-3 text-sm text-gray-300">
              <p>
                <span className="font-semibold">✓</span> Be as detailed as possible
              </p>
              <p>
                <span className="font-semibold">✓</span> Include evidence (screenshots, links)
              </p>
              <p>
                <span className="font-semibold">✓</span> Our team reviews all reports
              </p>
              <p>
                <span className="font-semibold">✓</span> Reports are confidential
              </p>
              <p>
                <span className="font-semibold">✓</span> False reports may result in action
              </p>
            </div>
          </div>

          {/* Right - Report Form */}
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <h2 className="text-lg font-bold text-white mb-4">Submit a Report</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {activeTab === 'user' ? 'User ID or @ Username' : activeTab === 'message' ? 'Message Link' : 'Community Name'}
                </label>
                <input
                  type="text"
                  placeholder={activeTab === 'user' ? '@username' : activeTab === 'message' ? 'Copy message link' : 'Community name'}
                  className="w-full px-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:border-nexa-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Reason</label>
                <select
                  value={selectedReason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white focus:outline-none focus:border-nexa-500"
                >
                  <option value="">Select a reason...</option>
                  {reasons.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  placeholder="Provide details about the report..."
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:border-nexa-500 resize-none h-24"
                />
              </div>
              <Button
                fullWidth
                onClick={handleSubmitReport}
                disabled={!selectedReason || !reportDescription}
              >
                <Flag size={18} />
                Submit Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
