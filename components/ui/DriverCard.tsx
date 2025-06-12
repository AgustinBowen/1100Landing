import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPositionIcon } from "@/utils/icons";

interface DriverCardProps {
  position: number;
  name: string;
  points: number;
  imageSrc: string;
  className?: string;
}

export function DriverCard({ position, name, points, imageSrc, className }: DriverCardProps) {
  const colors = {
    1: { border: "border-yellow-500", shadow: "shadow-yellow-500/20", text: "text-yellow-500", badge: "bg-yellow-500 text-black" },
    2: { border: "border-red-500", shadow: "shadow-red-500/20", text: "text-red-500", badge: "bg-black/70 text-white" },
    3: { border: "border-red-500", shadow: "shadow-red-500/20", text: "text-red-500", badge: "bg-black/70 text-white" },
  };

  const color = colors[position as 1 | 2 | 3] || colors[2];

  return (
    <Card
      className={`bg-[#080808] border-red-500/20 border-2 backdrop-blur-sm py-0 overflow-hidden group hover:${color.border} hover:${color.shadow} hover:scale-105 transition-all duration-300 hover:-translate-y-2 ${className}`}
    >
      <CardContent className="p-0">
        <div className="relative">
          <img src={imageSrc} alt={name} className={`w-full ${position === 1 ? "h-64" : position === 2 ? "h-56" : "h-52"} object-cover`} />
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-${position === 1 ? "yellow" : "red"}-500/20 transition-all duration-300`}></div>
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-2">
              {getPositionIcon(position)}
              <Badge variant="secondary" className={color.badge}>{position}°</Badge>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-2">
            <h3 className={`text-xl font-bold ${position === 1 ? "text-yellow-500" : "text-white"}`}>{name}</h3>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-2xl font-bold ${color.text}`}>{points}</span>
            <span className="text-sm text-gray-400">PTS</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
