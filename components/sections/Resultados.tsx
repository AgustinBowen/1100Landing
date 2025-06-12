"use client";
import { useTabs } from "../../hooks/useTabs";
import { useRaceResult } from "@/hooks/useRaceResult";
import { useChampionshipYear } from "@/hooks/useChampionshipYear";
import { Tabs } from "@/components/ui/Tabs";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ChevronDown, MapPin, Trophy, Clock, Flag, CheckCircle } from "lucide-react";
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
    { id: "raceDetails", label: "ULTIMA CARRERA" },
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

  const handleRaceClick = (race: RaceWithDetails) => {
    setSelectedRace(race);
    setActiveTab("raceDetails");
  };

  return (
    <SectionWrapper className="py-20 text-[12px]">
      <div className="text-center mb-2 flex gap-8">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <select
              value={currentYear}
              onChange={(e) => changeYear(parseInt(e.target.value))}
              className="bg-[#080808] border-2 border-red-500/20 rounded-lg px-6 py-4 text-white appearance-none pr-8 focus:border-red-500 outline-none"
            >
              {allChampionships.map((championship) => (
                <option key={championship.id} value={championship.anio}>
                  {championship.anio} - {championship.nombre}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
        {/* Tabs principales */}
        <div className="flex justify-center mb-2">
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      {/* Contenido de clasificación completa */}
      {activeTab === "standings" && (
        <Card className="bg-[#000000] border-0 shadow-2xl shadow-red-500/40 py-0 overflow-hidden">
          <CardContent className="p-0">
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
            {(!currentChampionship || currentChampionship.standings.length === 0) && (
              <div className="p-8 text-center text-gray-400">No hay datos de clasificación disponibles</div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Contenido de todas las carreras - NUEVO DISEÑO */}
      {activeTab === "races" && (
        <div className="flex flex-col gap-2 max-w-3xl mx-auto">
          {championshipRaces.map((race, index) => {
            const statusConfig = getStatusConfig(race.status ?? "upcoming");
            const isHovered = hoveredCard === race.id;

            return (
              <Card
                key={race.id}
                className={`${statusConfig.bgColor} ${statusConfig.borderColor} ${statusConfig.hoverBorder} border-2 backdrop-blur-sm overflow-hidden group hover:scale-102 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl ${statusConfig.hoverShadow} cursor-pointer`}
                onMouseEnter={() => setHoveredCard(race.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleRaceClick(race)}
              >
                <CardContent className="p-0">
                  <div className="flex items-center">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <img
                        src="/media/p1champ.jpg"
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
      )}

      {/* Contenido de detalles de carrera */}
      {activeTab === "raceDetails" && (
        <div>
          {!selectedRace ? (
            <div className="text-center py-12">
              <p className="text-gray-200 mb-4">Selecciona una carrera para ver los detalles</p>
              <button
                onClick={() => setActiveTab("races")}
                className="bg-white cursor-pointer hover:bg-white/85 text-black font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Ver Todas las Carreras
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">{selectedRace.nombre}</h2>
                <div className="flex items-center gap-4 text-gray-400">
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
              <div className="flex flex-wrap gap-4">
                <Tabs
                  tabs={resultTypeTabs}
                  activeTab={raceResultType}
                  onTabChange={(tabId) =>
                    setRaceResultType(tabId as typeof raceResultType)
                  }
                />
              </div>
              <Card className="bg-[#000000] text-sm border-0 shadow-2xl shadow-red-500/40 py-0 overflow-hidden">
                <CardContent className="p-0">
                  <PilotoTable
                    pilotos={results.map((p, idx) => ({
                      ...p,
                      posicion: p.posicion ?? idx + 1,
                    }))}
                    config={{ showAuto: true, showPuntos: true, showTiempo: true, showVueltas: true }}
                  />
                  {results.length === 0 && (
                    <div className="p-8 text-center text-gray-400">
                      No hay resultados disponibles para {raceResultType.replace("_", " ")}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}
    </SectionWrapper>
  );
}