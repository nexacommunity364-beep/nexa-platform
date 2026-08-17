import React, { createContext, useContext } from 'react';

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabs = () => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('Tabs components must be used inside <Tabs>.');
  }

  return context;
};

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ value, onValueChange, children }) => (
  <TabsContext.Provider value={{ value, onValueChange }}>
    <div>{children}</div>
  </TabsContext.Provider>
);

interface TabsListProps {
  children: React.ReactNode;
}

export const TabsList: React.FC<TabsListProps> = ({ children }) => (
  <div className="flex gap-2 border-b border-dark-700 mb-6 overflow-x-auto pb-1">{children}</div>
);

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children }) => {
  const { value: currentValue, onValueChange } = useTabs();

  return (
    <button
      onClick={() => onValueChange(value)}
      className={`px-4 py-3 font-medium transition whitespace-nowrap border-b-2 ${
        currentValue === value
          ? 'text-nexa-400 border-nexa-500'
          : 'text-gray-400 border-transparent hover:text-gray-300'
      }`}
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({ value, children, className = '' }) => {
  const { value: currentValue } = useTabs();

  if (currentValue !== value) {
    return null;
  }

  return <div className={className}>{children}</div>;
};
