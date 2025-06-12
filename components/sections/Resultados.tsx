"use client";

import { useTabs } from "../../hooks/useTabs";
import { useRaceResult } from "@/hooks/useRaceResult";
import { useChampionshipYear } from "@/hooks/useChampionshipYear";
import { Tabs } from "@/components/ui/Tabs";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ChevronDown, MapPin, Trophy, Clock, Flag, CheckCircle, Eye, BarChart3 } from "lucide-react";
import { PilotoTable } from "../common/PilotoTable";
import { formatDate } from "@/utils/formatDate";
import { ChampionshipWithStandings, RaceWithDetails, Campeonato } from "@/types/championship";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface CampeonatoCompletoProps {
  allChampionships: Campeonato[];
  currentChampionship: ChampionshipWithStandings | null;
  championshipRaces: RaceWithDetails[];
  selectedYear: number;
  selectedRaceId?: string;
}

export default function CampeonatoCompleto({
  allChampionships,
  currentChampionship,
  championshipRaces,
  selectedYear,
  selectedRaceId,
}: CampeonatoCompletoProps) {
  const { activeTab, setActiveTab } = useTabs("standings");
  const [selectedRace, setSelectedRace] = useState<RaceWithDetails | null>(
    selectedRaceId ? championshipRaces.find((r) => r.id === selectedRaceId) || null : null
  );
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const { raceResultType, setRaceResultType, results } = useRaceResult(selectedRace);
  const { currentYear, changeYear } = useChampionshipYear(selectedYear);

  const tabs = [
    { id: "standings", label: "CAMPEONATO COMPLETO" },
    { id: "races", label: "TODAS LAS CARRERAS" },
    { id: "raceDetails", label: "RESULTADOS" },
  ];

  const resultTypeTabs = [
    { id: "carrera_final", label: "Carrera Final" },
    { id: "series_clasificatorias_1", label: "Serie 1" },
    { id: "series_clasificatorias_2", label: "Serie 2" },
    { id: "series_clasificatorias_3", label: "Serie 3" },
    { id: "clasificacion", label: "Clasificación" },
    { id: "entrenamientos", label: "Entrenamientos" },
  ];

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

  const handleRaceClick = (race: RaceWithDetails) => {
    setSelectedRace(race);
    setActiveTab("raceDetails");
  };

  return (
    <SectionWrapper className="py-8 sm:py-12 md:py-16 lg:py-20 text-[12px] px-2 sm:px-4">
      {/* Header section - responsive */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center justify-center mb-6">
        {/* Year selector */}
        <div className="w-full sm:w-auto">
          <div className="relative">
            <select
              value={currentYear}
              onChange={(e) => changeYear(parseInt(e.target.value))}
              className="w-full sm:w-auto bg-[#080808] border-2 border-red-500/20 rounded-lg px-4 sm:px-6 py-3 sm:py-4 text-white appearance-none pr-8 focus:border-red-500 outline-none text-sm"
            >
              {allChampionships.map((championship) => (
                <option key={championship.id} value={championship.anio}>
                  <span className="hidden sm:inline">{championship.anio} - {championship.nombre}</span>
                  <span className="sm:hidden">{championship.anio}</span>
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-3 sm:top-4 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Main tabs */}
        <div className="w-full sm:w-auto">
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      {/* Content sections */}
      <div className="w-full">
        {/* Standings content */}
        {activeTab === "standings" && (
          <Card className="bg-[#000000] border-0 shadow-2xl shadow-red-500/40 py-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <PilotoTable
                  pilotos={
                    currentChampionship?.standings
                      ? currentChampionship.standings.map((p, idx) => ({
                          ...p,
                          posicion: (p as any).posicion ?? idx + 1,
                        }))
                      : []
                  }
                  config={{ showAuto: true, showPuntos: true, showTiempo: false, showVueltas: false }}
                />
              </div>
              {(!currentChampionship || currentChampionship.standings.length === 0) && (
                <div className="p-4 sm:p-8 text-center text-gray-400 text-sm">
                  No hay datos de clasificación disponibles
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* All races content - matched to CalendarioSeccion.tsx */}
        {activeTab === "races" && (
          <Card className="bg-[#000000] border-0 shadow-2xl shadow-red-500/40 overflow-hidden">
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
                {championshipRaces.map((race, index) => {
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
                      onClick={() => handleRaceClick(race)}
                    >
                      <div className="grid grid-cols-12 gap-2 items-center">
                        {/* Columna Fecha */}
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

                        {/* Columna Resultados */}
                        <div className="col-span-6 sm:col-span-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              className="text-white text-sm underline p-2 rounded-2xl hover:text-red-500 transition-colors cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRaceClick(race);
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

              {championshipRaces.length === 0 && (
                <div className="p-8 text-center text-gray-400">
                  No hay carreras disponibles para este campeonato
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Race details content */}
        {activeTab === "raceDetails" && (
          <div>
            {!selectedRace ? (
              <div className="text-center py-8 sm:py-12">
                <p className="text-gray-200 mb-4 text-sm sm:text-base">
                  Selecciona una carrera para ver los detalles
                </p>
                <button
                  onClick={() => setActiveTab("races")}
                  className="bg-white cursor-pointer hover:bg-white/85 text-black font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
                >
                  Ver Todas las Carreras
                </button>
              </div>
            ) : (
              <div>
                {/* Race header */}
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
                    {selectedRace.nombre}
                  </h2>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-400 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(selectedRace.fecha_desde)}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {selectedRace.circuitoNombre}
                    </div>
                  </div>
                </div>

                {/* Result type tabs */}
                <div className="mb-4">
                  <Tabs
                    tabs={resultTypeTabs}
                    activeTab={raceResultType}
                    onTabChange={(tabId) =>
                      setRaceResultType(tabId as typeof raceResultType)
                    }
                  />
                </div>

                {/* Results table */}
                <Card className="bg-[#000000] text-sm border-0 shadow-2xl shadow-red-500/40 py-0 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <PilotoTable
                        pilotos={results.map((p, idx) => ({
                          ...p,
                          posicion: p.posicion ?? idx + 1,
                        }))}
                        config={{ showAuto: true, showPuntos: true, showTiempo: true, showVueltas: true }}
                      />
                    </div>
                    {results.length === 0 && (
                      <div className="p-4 sm:p-8 text-center text-gray-400 text-sm">
                        No hay resultados disponibles para {raceResultType.replace("_", " ")}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}