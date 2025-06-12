import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
}

export function SectionWrapper({ children, className }: SectionWrapperProps) {
  return (
    <div className={`min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-12 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </div>
  );
}
