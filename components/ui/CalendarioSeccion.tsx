// components/ui/CalendarioSeccion.tsx
"use client";

import { useState } from "react";
import { Calendar, MapPin, Trophy, Clock, Flag, CheckCircle, Users } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarSectionProps } from "@/types/championship";
import { parseDate } from "@/lib/utils";

export default function CalendarSection({ races, stats }: CalendarSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  console.log("stats recibidas",stats)
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return {
          bgColor: "bg-[#080808]",
          borderColor: "border-green-500/30",
          hoverBorder: "hover:border-green-500",
          hoverShadow: "hover:shadow-green-500/20",
          icon: <CheckCircle className="w-3 h-3 text-green-500" />,
          badge: "FINALIZADA",
          badgeColor: "bg-green-600",
        };
      case "live":
        return {
          bgColor: "bg-[#080808]",
          borderColor: "border-red-500/70",
          hoverBorder: "hover:border-red-500",
          hoverShadow: "hover:shadow-red-500/40",
          icon: <Flag className="w-3 h-3 text-red-500 animate-pulse" />,
          badge: "EN VIVO",
          badgeColor: "bg-red-600 animate-pulse",
        };
      case "upcoming":
        return {
          bgColor: "bg-[#080808]",
          borderColor: "border-gray-500/20",
          hoverBorder: "hover:border-white/50",
          hoverShadow: "hover:shadow-white/10",
          icon: <Clock className="w-3 h-3 text-gray-400" />,
          badge: "PRÓXIMAMENTE",
          badgeColor: "bg-gray-600",
        };
      default:
        return {
          bgColor: "bg-[#080808]",
          borderColor: "border-gray-500/20",
          hoverBorder: "hover:border-white/50",
          hoverShadow: "hover:shadow-white/10",
          icon: <Clock className="w-3 h-3 text-gray-400" />,
          badge: "PRÓXIMAMENTE",
          badgeColor: "bg-gray-600",
        };
    }
  };

  const formatDate = (dateString: string) => {
    const date = parseDate(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
    });
  };


  const getLiveRace = () => {
    return races.find(race => race.status === 'live');
  };

  if (races.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white py-8 px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl lg:text-5xl font-bold mb-3">
            Calendario
            <span className="block text-red-500">Temporada {new Date().getFullYear()}</span>
          </h1>
          <p className="text-lg text-gray-300">No hay fechas programadas para este año</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4 sm:px-6 lg:px-12 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-5xl font-bold mb-3">
            Calendario
            <span className="block text-red-500">Temporada {races[0]?.campeonato?.anio || new Date().getFullYear()}</span>
          </h1>
          <p className="text-lg text-gray-300">
            Todas las fechas del campeonato {races[0]?.campeonato?.nombre || 'TP1100'}
          </p>
        </div>

        <div className="flex flex-col gap-2 max-w-3xl mx-auto">
          {races.map((race, index) => {
            const statusConfig = getStatusConfig(race.status);
            const isHovered = hoveredCard === race.id;

            return (
              <Card
                key={race.id}
                className={`${statusConfig.bgColor} ${statusConfig.borderColor} ${statusConfig.hoverBorder} border-2 backdrop-blur-sm overflow-hidden group hover:scale-102 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl ${statusConfig.hoverShadow} cursor-pointer`}
                onMouseEnter={() => setHoveredCard(race.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardContent className="p-0">
                  <div className="flex items-center">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <img
                        src="/images/ganador-ultima-fecha.jpg"
                        alt={race.nombre}
                        className="w-full h-full object-cover ml-2 rounded-sm"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 transition-all duration-500 ${isHovered ? "translate-x-full" : "-translate-x-full"
                          }`}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-1 right-1">
                        <div className="bg-black/70 text-white px-1 py-0.5 rounded text-xs font-bold">
                          {index + 1}
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 p-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          {statusConfig.icon}
                          <h3 className="text-sm font-bold truncate text-white">{race.nombre}</h3>
                        </div>
                        <Badge className={`${statusConfig.badgeColor} text-white text-xs px-2 py-0.5`}>
                          {statusConfig.badge}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{race.circuitoNombre || 'Circuito no especificado'}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {formatDate(race.fecha_desde)}
                              {race.fecha_hasta && race.fecha_hasta !== race.fecha_desde
                                ? ` - ${formatDate(race.fecha_hasta)}`
                                : ''}
                            </span>
                          </div>
                        </div>
                      </div>

                      {race.status === "completed" && (
                        <div className="flex items-center gap-1 mt-1">
                          <Trophy className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs font-semibold text-yellow-500">
                            Ganador: {race.winner || 'Desconocido'}
                          </span>
                        </div>
                      )}

                      {race.status === "live" && (
                        <div className="flex items-center gap-1 mt-1">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-xs font-semibold text-red-500">En progreso</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4">
          <Card className="bg-black/90 border-green-500/20 border-2">
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <h3 className="text-sm font-bold mb-1 text-white">Finalizadas</h3>
              <p className="text-2xl font-bold text-green-500">{stats.completedRaces}</p>
            </CardContent>
          </Card>

          <Card className="bg-black/90 border-red-500/30 border-2">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <Flag className="w-6 h-6 text-red-500 animate-pulse" />
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-sm font-bold mb-1 text-white">En Vivo</h3>
              <p className="text-sm font-bold text-red-500">
                {getLiveRace()?.nombre || 'Ninguna'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/90 border-gray-500/20 border-2">
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 text-gray-400 mx-auto mb-2" />
              <h3 className="text-sm font-bold mb-1 text-white">Restantes</h3>
              <p className="text-2xl font-bold text-gray-400">{stats.remainingRaces}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 via-transparent to-red-500/5 pointer-events-none"></div>
    </div>
  );
}