"use client";

import { useTabs } from "../../hooks/useTabs";
import { useRaceResult, RaceResultType } from "@/hooks/useRaceResult";
import { useChampionshipYear } from "@/hooks/useChampionshipYear";
import { Tabs } from "@/components/ui/Tabs";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ChevronDown, MapPin, Trophy, Clock, Flag, CheckCircle } from "lucide-react";
import { PilotoTable } from "../common/PilotoTable";
import { formatDate } from "@/utils/formatDate";
import { ChampionshipWithStandings, RaceWithDetails, Campeonato } from "@/types/championship";
import { useState } from "react";

interface CampeonatoCompletoProps {
  allChampionships: Campeonato[];
  currentChampionship: ChampionshipWithStandings | null;
  championshipRaces: RaceWithDetails[];
  selectedYear: number;
  selectedRaceId?: string;
  // Agregar props para estados de loading
  isLoadingChampionship?: boolean;
  isLoadingRaces?: boolean;
  isLoadingResults?: boolean;
}

export default function CampeonatoCompleto({
  allChampionships,
  currentChampionship,
  championshipRaces,
  selectedYear,
  selectedRaceId,
  // Props de loading con valores por defecto
  isLoadingChampionship = false,
  isLoadingRaces = false,
  isLoadingResults = false,
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

  // Función para obtener las tabs de resultados dinámicamente basadas en la carrera seleccionada
  const getResultTypeTabs = () => {
    const baseTabs = [
      { id: "carrera_final", label: "Carrera Final" },
      { id: "series_clasificatorias_1", label: "Serie 1" },
      { id: "series_clasificatorias_2", label: "Serie 2" },
      { id: "series_clasificatorias_3", label: "Serie 3" },
      { id: "clasificacion", label: "Clasificación" },
    ];

    // Agregar tabs de entrenamientos basados en los números disponibles
    if (selectedRace?.entrenamientos) {
      // Obtener números únicos de entrenamientos ordenados
      const entrenaminentoNumbers = Array.from(
        new Set(selectedRace.entrenamientos.map(e => e.numero))
      ).sort((a, b) => a - b);

      const entrenamientoTabs = entrenaminentoNumbers.map(numero => ({
        id: `entrenamientos_${numero}`,
        label: `Entrenamiento ${numero}`
      }));

      // Insertar las tabs de entrenamientos al final
      baseTabs.push(...entrenamientoTabs);
    }

    return baseTabs;
  };

  const resultTypeTabs = getResultTypeTabs();

  const handleRaceClick = (race: RaceWithDetails) => {
    setSelectedRace(race);
    setActiveTab("raceDetails");
  };

  // Type-safe handler for race result type changes
  const handleRaceResultTypeChange = (tabId: string) => {
    setRaceResultType(tabId);
  };

  return (
    <SectionWrapper className="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 text-xs sm:text-sm px-3 sm:px-4 md:px-6">
      {/* Header section - responsive mejorado */}
      <div className="flex flex-col sm:flex-col gap-3 sm:gap-2 md:gap-4 w-full mb-4 sm:mb-6">
        <div className="w-auto sm:w-auto sm:min-w-[280px] md:min-w-[320px]">
          <div className="relative">
            <select
              value={currentYear}
              onChange={(e) => changeYear(parseInt(e.target.value))}
              className="w-full bg-[#000000] border-2 border-red-500 rounded-lg px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 text-white appearance-none pr-8 sm:pr-10 focus:border-red-400 focus:ring-2 focus:ring-red-500/20 outline-none text-xs sm:text-sm md:text-base transition-all duration-200 cursor-pointer hover:border-red-400"
            >
              {allChampionships.map((championship) => (
                <option key={championship.id} value={championship.anio} className="bg-[#000000] text-white">
                  {/* Mostrar solo año en móvil, año + nombre en pantallas más grandes */}
                  <span className="sm:hidden">{championship.anio}</span>
                  <span className="hidden sm:inline">{championship.anio} - {championship.nombre}</span>
                </option>
              ))}
            </select>

            {/* Icono chevron mejorado */}
            <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-200 transition-transform duration-200" />
            </div>
          </div>
        </div>

        {/* Espacio adicional para otros elementos del header si los hay */}
        <div className="flex-1 flex items-center justify-end">
          {/* Aquí puedes agregar otros elementos del header si los necesitas */}
        </div>
        <div>
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      {/* Content sections */}
      <div className="w-full">
        {/* Standings content - con skeleton loading */}
        {activeTab === "standings" && (
          <div className="max-w-7xl mx-auto">
            <Card className="bg-[#000000] border-0 shadow-2xl shadow-red-500/40 overflow-hidden">
              <CardContent className="p-0">
                <PilotoTable
                  pilotos={
                    currentChampionship?.standings
                      ? currentChampionship.standings.map((standing) => ({
                        id: standing.piloto.id,
                        piloto: standing.piloto,
                        posicion: standing.position,
                        numeroAuto: standing.numeroAuto,
                        puntos: standing.puntos,
                      }))
                      : []
                  }
                  config={{ showPuntos: true, showTiempo: false, showVueltas: false }}
                  variant="championship"
                  isLoading={isLoadingChampionship}
                  skeletonRows={10}
                />
              </CardContent>
            </Card>
          </div>
        )}

        {/* All races content - skeleton para la lista de carreras */}
        {activeTab === "races" && (
          <div className="max-w-7xl mx-auto">
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

                {/* Skeleton o contenido real de carreras */}
                <div>
                  {isLoadingRaces ? (
                    // Skeleton para lista de carreras
                    Array.from({ length: 8 }).map((_, index) => (
                      <div
                        key={`race-skeleton-${index}`}
                        className="px-4 py-4 animate-pulse"
                      >
                        <div className="grid grid-cols-12 gap-2 items-center">
                          {/* Columna Fecha */}
                          <div className="col-span-6 sm:col-span-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded bg-gray-700"></div>
                              <div className="min-w-0 flex-1">
                                <div className="w-32 h-4 bg-gray-700 rounded mb-1"></div>
                                <div className="w-20 h-3 bg-gray-700 rounded mb-1"></div>
                                <div className="w-24 h-3 bg-gray-700 rounded"></div>
                              </div>
                            </div>
                          </div>
                          {/* Columna Ganador */}
                          <div className="col-span-4 sm:col-span-5 hidden sm:block">
                            <div className="w-24 h-4 bg-gray-700 rounded"></div>
                          </div>
                          {/* Columna Resultados */}
                          <div className="col-span-6 sm:col-span-3 text-center">
                            <div className="w-20 h-6 bg-gray-700 rounded mx-auto"></div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    // Contenido real de carreras
                    championshipRaces.map((race, index) => {
                      const isHovered = hoveredCard === race.id;

                      return (
                        <div
                          key={race.id}
                          className={`px-4 py-4 hover:bg-[#111111] transition-colors duration-200 cursor-pointer group ${isHovered ? 'bg-[#111111]' : ''
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
                                <div className="flex items-center ml-16 gap-2">
                                  <span className="text-gray-300">
                                    -
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Columna Resultados */}
                            {race.status == "completed" ? (
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
                            ) : (
                              <div className="col-span-6 sm:col-span-3 text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <span className="text-gray-300">-</span>
                                </div>
                              </div>
                            )}

                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {!isLoadingRaces && championshipRaces.length === 0 && (
                  <div className="p-8 text-center text-sm text-gray-200">
                    No hay carreras disponibles para este campeonato
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Race details content - con skeleton para resultados */}
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
                {/* DEBUG: botón para loguear resultados 
                <div className="mb-4 flex justify-center">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                    onClick={() => {
                      console.log("Resultados originales:", results);
                      const pilotosDebug = results.map((result) => ({
                        id: result.id,
                        piloto: result.piloto,
                        posicion: result.posicion || 0,
                        numeroAuto: result.numeroAuto,
                        tiempo: result.tiempo,
                        sector1: result.sector1,
                        sector2: result.sector2,
                        sector3: result.sector3,
                        vueltas: 'vueltas' in result ? result.vueltas : undefined,
                        excluido: 'excluido' in result ? result.excluido : false,
                        puntos: 'puntos' in result ? (result as any).puntos : undefined,
                      }));
                      console.log("Pilotos mapeados:", pilotosDebug);
                    }}
                  >
                    Ver data en consola
                  </button>
                </div>*/}

                {/* Race header */}
                <div className="mb-4 flex flex-col">
                  <h2 className="text-2xl font-extrabold mb-0">{selectedRace.nombre}</h2>
                  <p className="text-gray-300">
                    {selectedRace.fecha_hasta
                      ? formatDate(selectedRace.fecha_hasta)
                      : formatDate(selectedRace.fecha_desde)
                    }
                  </p>
                  {selectedRace.circuitoNombre && (
                    <p className="text-gray-300 text-sm">
                      {selectedRace.circuitoNombre}
                      {selectedRace.circuitoDistancia && ` - ${selectedRace.circuitoDistancia}m`}
                    </p>
                  )}
                </div>

                {/* Result type tabs */}
                <div className="mb-4 flex items-center">
                  <Tabs
                    tabs={resultTypeTabs}
                    activeTab={raceResultType}
                    onTabChange={handleRaceResultTypeChange}
                  />
                </div>

                {/* PilotoTable */}
                <div className="max-w-7xl mx-auto">
                  <Card className="bg-[#000000] border-0 shadow-2xl shadow-red-500/40 overflow-hidden">
                    <CardContent className="p-0">
                      <PilotoTable
                        pilotos={results.map((result) => ({
                          id: result.id,
                          piloto: result.piloto,
                          posicion: result.posicion || 0,
                          numeroAuto: result.numeroAuto,
                          tiempo: result.tiempo,
                          sector1: result.sector1,
                          sector2: result.sector2,
                          sector3: result.sector3,
                          vueltas: 'vueltas' in result ? result.vueltas : undefined,
                          excluido: 'excluido' in result ? result.excluido : false,
                          puntos: 'puntos' in result ? (result as any).puntos : undefined,
                        }))}
                        config={{
                          showPuntos: results.some(r => 'puntos' in r && (r as any).puntos !== undefined),
                          showTiempo: true,
                          showVueltas: true,
                          showSectores: results.some(r =>
                            r.sector1 !== undefined ||
                            r.sector2 !== undefined ||
                            r.sector3 !== undefined
                          )
                        }}
                        variant="race"
                        isLoading={isLoadingResults}
                        skeletonRows={15}
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </SectionWrapper >
  );
}