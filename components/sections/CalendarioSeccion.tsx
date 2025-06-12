"use client";

import { useState } from "react";
import { Calendar, MapPin, Trophy, Clock, Flag, CheckCircle, Users, Eye } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarSectionProps } from "@/types/championship";
import { parseDate } from "@/lib/utils";

interface CalendarSectionPropsExtended extends CalendarSectionProps {
  onRaceClick?: (raceId: string) => void;
}

export default function CalendarSection({ races, stats, onRaceClick }: CalendarSectionPropsExtended) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  console.log("stats recibidas", stats);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return {
          bgColor: "bg-[#080808]",
          borderColor: "border-green-500/30",
          hoverBorder: "hover:border-green-500",
          hoverShadow: "hover:shadow-green-500/20",
          icon: <CheckCircle className="w-4 h-4 text-green-500" />,
          badge: "FINALIZADA",
          badgeColor: "bg-green-600",
          badgeTextColor: "text-white",
        };
      case "live":
        return {
          bgColor: "bg-[#080808]",
          borderColor: "border-red-500/70",
          hoverBorder: "hover:border-red-500",
          hoverShadow: "hover:shadow-red-500/40",
          icon: <Flag className="w-4 h-4 text-red-500 animate-pulse" />,
          badge: "EN VIVO",
          badgeColor: "bg-red-600 animate-pulse",
          badgeTextColor: "text-white",
        };
      case "upcoming":
        return {
          bgColor: "bg-[#080808]",
          borderColor: "border-gray-500/20",
          hoverBorder: "hover:border-white/50",
          hoverShadow: "hover:shadow-white/10",
          icon: <Clock className="w-4 h-4 text-gray-400" />,
          badge: "PRÓXIMAMENTE",
          badgeColor: "bg-gray-600",
          badgeTextColor: "text-white",
        };
      default:
        return {
          bgColor: "bg-[#080808]",
          borderColor: "border-gray-500/20",
          hoverBorder: "hover:border-white/50",
          hoverShadow: "hover:shadow-white/10",
          icon: <Clock className="w-4 h-4 text-gray-400" />,
          badge: "PRÓXIMAMENTE",
          badgeColor: "bg-gray-600",
          badgeTextColor: "text-white",
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

  const handleRaceClick = (raceId: string) => {
    if (onRaceClick) {
      onRaceClick(raceId);
    }
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

        {/* Tabla optimizada */}
        <Card className="bg-[#000000] border-0 shadow-2xl shadow-red-500/40 overflow-hidden max-w-3xl mx-auto">
          <CardContent className="p-0">
            {/* Header de la tabla */}
            <div className="px-4 py-3">
              <div className="grid grid-cols-12 gap-2 items-center text-xs font-semibold text-white uppercase tracking-wider">
                <div className="col-span-6 sm:col-span-4">Fecha</div>
                <div className="col-span-4 sm:col-span-5 hidden sm:block">Ganador</div>
                <div className="col-span-6 sm:col-span-3 text-center">Resultados</div>
              </div>
            </div>

            {/* Filas de carreras */}
            <div>
              {races.map((race, index) => {
                const statusConfig = getStatusConfig(race.status ?? "upcoming");
                const isHovered = hoveredCard === race.id;

                return (
                  <div
                    key={race.id}
                    className={`px-4 py-4 hover:bg-[#111111] transition-colors duration-200 cursor-pointer group ${
                      isHovered ? 'bg-[#111111]' : ''
                    }`}
                    onMouseEnter={() => setHoveredCard(race.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => handleRaceClick(race.id)}
                  >
                    <div className="grid grid-cols-12 gap-2 items-center">
                      {/* Columna Sesión */}
                      <div className="col-span-6 sm:col-span-4">
                        <div className="flex items-center gap-3">
                          {/* Número de carrera */}
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded bg-red-500 flex items-center justify-center">
                              <span className="text-white font-bold text-sm">{index + 1}</span>
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-white text-sm truncate">
                              {race.nombre}
                            </div>
                            <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                              <Calendar className="w-3 h-3" />
                              {formatDate(race.fecha_desde)}
                              {race.fecha_hasta && race.fecha_hasta !== race.fecha_desde
                                ? ` - ${formatDate(race.fecha_hasta)}`
                                : ''}
                            </div>
                            <div className="text-xs text-gray-500 truncate">
                              {race.circuitoNombre || 'Circuito no especificado'}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Columna Ganador - oculta en móvil */}
                      <div className="col-span-4 sm:col-span-5 hidden sm:block">
                        {race.status === "completed" && race.winner ? (
                          <div className="flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                            <span className="text-white font-medium text-sm truncate">
                              {race.winner}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </div>

                      {/* Columna Acciones */}
                      <div className="col-span-6 sm:col-span-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="text-white text-sm underline p-2 rounded-2xl hover:text-red-500 transition-colors cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRaceClick(race.id);
                            }}
                            title="Ver resultado"
                          >
                            Ver Resultado
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {races.length === 0 && (
              <div className="p-8 text-center text-gray-400">
                No hay carreras disponibles para este campeonato
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 grid grid-cols-3 gap-4 max-w-3xl mx-auto">
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