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
    <div className={`bg-[#080808] border-2 rounded-lg p-1 sm:p-2 backdrop-blur-sm border-red-500/20 flex gap-2 flex-wrap ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 
            rounded-md font-medium transition-all 
            text-[10px] xs:text-[11px] sm:text-[12px] md:text-sm
            flex-1 sm:flex-none
            min-w-0 
            whitespace-nowrap overflow-hidden text-ellipsis
            ${activeTab === tab.id 
              ? "bg-red-600 text-white" 
              : "text-gray-400 hover:text-white hover:bg-red-600/20"
            }
          `}
          title={tab.label} // Tooltip para mostrar texto completo en móviles
        >
          <span className="block sm:hidden">
            {/* Versión corta para móviles */}
            {tab.label.split(' ').map(word => word.charAt(0)).join('').slice(0, 3)}
          </span>
          <span className="hidden sm:block">
            {/* Versión completa para tablets y desktop */}
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
}