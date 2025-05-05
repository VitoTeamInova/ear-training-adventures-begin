
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'landing', label: 'Home' },
    { id: 'why-ear-training', label: '1. Why Ear Training' },
    { id: 'understanding-notes', label: '2. Understanding Notes' },
    { id: 'intervals', label: '3. Intervals' },
    { id: 'chords', label: '4. Chords' },
    { id: 'your-progress', label: 'YOUR PROGRESS' },
  ];

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container overflow-x-auto">
        <nav className="flex whitespace-nowrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-3 transition-all",
                activeTab === tab.id ? "tab-active" : "text-gray-600 hover:text-primary"
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
