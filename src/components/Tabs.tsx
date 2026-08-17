import React, { useState } from 'react';

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ value, onValueChange, children }) => {
  return (
    <div className="space-y-4">
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement, {
          activeTab: value,
          onTabChange: onValueChange,
        })
      )}
    </div>
  );
};

interface TabsListProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

export const TabsList: React.FC<TabsListProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="flex gap-4 border-b border-dark-700 mb-4">
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement, {
          activeTab,
          onTabChange,
        })
      )}
    </div>
  );
};

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  children,
  activeTab,
  onTabChange,
}) => {
  const isActive = value === activeTab;

  return (
    <button
      onClick={() => onTabChange?.(value)}
      className={`px-4 py-2 font-medium transition border-b-2 ${
        isActive
          ? 'border-nexa-500 text-nexa-400'
          : 'border-transparent text-gray-400 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  activeTab?: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  children,
  activeTab,
}) => {
  if (value !== activeTab) return null;

  return <>{children}</>;
};
