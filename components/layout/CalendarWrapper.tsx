"use client";
import { useRouter } from 'next/navigation';
import CalendarSection from '@/components/sections/CalendarioSeccion';

interface CalendarWrapperProps {
  races: any[];
  stats: any;
}

export default function CalendarWrapper({ races, stats }: CalendarWrapperProps) {
  const router = useRouter();

  const handleRaceClick = (raceId: string) => {
    router.push(`/resultados?raceId=${raceId}`);
  };

  return (
    <CalendarSection 
      races={races} 
      stats={stats} 
      onRaceClick={handleRaceClick}
    />
  );
}