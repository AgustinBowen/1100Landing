import { Trophy, Medal, Award } from 'lucide-react';

export function getPositionIcon(position: number) {
  switch (position) {
    case 1:
      return <Trophy className="w-5 h-5 text-yellow-500" />;
    case 2:
      return <Medal className="w-5 h-5 text-gray-400" />;
    case 3:
      return <Award className="w-5 h-5 text-amber-600" />;
    default:
      return (
        <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-400">
          {position}
        </span>
      );
  }
}
