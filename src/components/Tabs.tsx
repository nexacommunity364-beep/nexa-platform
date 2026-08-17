import React, { useState } from 'react';

interface TabProps {
  tabs: Array<{
    id: string;
    label: string;
    icon?: React.ReactNode;
  }>;
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'default' | 'pills';
}

export const Tabs: React.FC<TabProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'default',
}) => {
  return (
    <div className={`flex gap-2 ${
      variant === 'default' ? 'border-b border-dark-700' : ''
    }`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex items-center gap-2 px-4 py-3 font-medium transition ${
            variant === 'default'
              ? activeTab === tab.id
                ? 'text-nexa-400 border-b-2 border-nexa-500'
                : 'text-gray-400 border-b-2 border-transparent hover:text-gray-300'
              : activeTab === tab.id
              ? 'bg-nexa-600 text-white rounded-lg'
              : 'bg-dark-700 text-gray-300 hover:bg-dark-600 rounded-lg'
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
};
