import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { InputField } from '../components/InputField';
import { HelpCircle, MessageSquare, BookOpen } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const SupportCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'How do I create an account?',
      answer: 'Click the Sign Up button and fill in your information. Verify your email to complete registration.',
    },
    {
      question: 'How do I reset my password?',
      answer: 'Click "Forgot Password" on the login page and follow the email instructions.',
    },
    {
      question: 'How do I delete my account?',
      answer: 'Go to Settings > Account > Delete Account. This action is permanent.',
    },
    {
      question: 'How do I report a user?',
      answer: 'Visit the Reports section in the sidebar and fill out the report form with details.',
    },
  ];

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-white mb-2">Support Center</h1>
        <p className="text-gray-400 mb-8">Get help with Nexa</p>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: HelpCircle, label: 'FAQ', desc: 'Frequently asked questions' },
            { icon: BookOpen, label: 'Guides', desc: 'Getting started guides' },
            { icon: MessageSquare, label: 'Contact Us', desc: 'Send us a message' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={i}
                className="bg-dark-800 rounded-lg p-6 border border-dark-700 hover:border-nexa-500 transition text-left"
              >
                <Icon size={28} className="text-nexa-400 mb-2" />
                <p className="font-semibold text-white">{item.label}</p>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="mb-8">
          <InputField
            placeholder="Search for help..."
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        {/* FAQ */}
        <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden">
          <h2 className="text-xl font-bold text-white p-6 border-b border-dark-700">Frequently Asked Questions</h2>
          <div>
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border-b border-dark-700 last:border-b-0"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)}
                  className="w-full px-6 py-4 text-left hover:bg-dark-700 transition flex items-center justify-between"
                >
                  <p className="font-medium text-white">{faq.question}</p>
                  <span className={`text-gray-400 transition ${
                    expandedFAQ === i ? 'rotate-180' : ''
                  }`}>
                    ▼
                  </span>
                </button>
                {expandedFAQ === i && (
                  <div className="px-6 py-4 bg-dark-700/50 text-gray-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
