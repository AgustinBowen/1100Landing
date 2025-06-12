"use client";
import { ReactNode } from "react";

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onTabChange, className }: TabsProps) {
  return (
    <div className={`bg-[#080808] border-2 rounded-lg p-2 backdrop-blur-sm border-red-500/20 flex flex-wrap mb-6 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 rounded-md font-medium transition-all text-[12px] ${
            activeTab === tab.id ? "bg-red-600 text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}