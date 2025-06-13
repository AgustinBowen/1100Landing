"use client";
import { useTabs } from "../../hooks/useTabs";
import { useRaceResult } from "@/hooks/useRaceResult";
import { Tabs } from "@/components/ui/Tabs";
import { DriverCard } from "@/components/ui/DriverCard";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { PilotoTable } from "../common/PilotoTable";
import Link from "next/link";
import { ChampionshipSectionProps } from "@/types/championship";
import { formatDate } from "@/utils/formatDate";

export default function ChampionshipSection({ championship, stats, latestRace }: ChampionshipSectionProps) {
  const { activeTab, setActiveTab } = useTabs("drivers");
  const { results } = useRaceResult(latestRace);

  const tabs = [
    { id: "drivers", label: "PILOTOS" },
    { id: "lastrace", label: "ÚLTIMA CARRERA" },
  ];

  // Función para obtener los pilotos del top 3 de forma segura
  const getTopDriver = (position: number) => {
    const index = position - 1;
    return championship?.standings?.[index] || null;
  };

  return (
    <SectionWrapper>
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-6xl font-bold mb-4">
          Campeonato
          <span className="block text-red-500">{championship?.nombre || "Turismo Pista 1100"}</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Sigue la clasificación de pilotos y equipos en la temporada {championship?.anio || 2025}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {activeTab === "drivers" && (
        <div className="max-w-fit">
          {/* Featured Drivers */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">TOP 5 del campeonato</h2>
            {championship?.standings && championship.standings.length >= 3 ? (
              <div className="flex flex-col md:flex-row items-end justify-center gap-6 max-w-4xl mx-auto">
                {/* Segundo puesto */}
                <DriverCard
                  position={2}
                  name={getTopDriver(2)?.piloto.nombre || ""}
                  points={getTopDriver(2)?.puntos || 0}
                  imageSrc="/media/p2champ.jpg"
                  className="order-2 md:order-1 w-full md:w-80"
                />
                {/* Primer puesto */}
                <DriverCard
                  position={1}
                  name={getTopDriver(1)?.piloto.nombre || ""}
                  points={getTopDriver(1)?.puntos || 0}
                  imageSrc="/media/p1champ.jpg"
                  className="order-1 md:order-2 w-full md:w-80 md:mb-8"
                />
                {/* Tercer puesto */}
                <DriverCard
                  position={3}
                  name={getTopDriver(3)?.piloto.nombre || ""}
                  points={getTopDriver(3)?.puntos || 0}
                  imageSrc="/media/p3champ.jpg"
                  className="order-3 w-full md:w-80"
                />
              </div>
            ) : (
              <div className="text-center text-gray-400">
                No hay suficientes datos del campeonato disponibles
              </div>
            )}
          </div>

          {/* Full Standings */}
          <div className="">
            {championship?.standings && championship.standings.length > 0 ? (
              <>
                <Card className="bg-[#000000] border-0 shadow-2xl shadow-red-500/40 overflow-hidden max-w-4xl mx-auto">
                  <CardContent className="p-0">
                    <PilotoTable
                      pilotos={
                        championship.standings
                          .slice(0, 5)
                          .map((standing) => ({
                            id: standing.piloto.id,
                            piloto: standing.piloto,
                            posicion: standing.position,
                            numeroAuto: standing.numeroAuto,
                            puntos: standing.puntos,
                          }))
                      }
                      config={{ showAuto: true, showPuntos: true, showTiempo: false, showVueltas: false }}
                      variant="championship"
                    />
                  </CardContent>
                </Card>
                <div className="mt-6 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-96">
                  <Link
                    href="/resultados"
                    className="font-semibold text-center block w-full bg-red-600 hover:bg-red-700 px-4 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base text-white"
                  >
                    Ir al Campeonato
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-400">
                No hay datos de standings disponibles
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "lastrace" && (
        <div>
          {latestRace ? (
            <>
              <div className="mb-6 flex flex-col justify-center items-center">
                <h2 className="text-2xl font-extrabold mb-2">TOP 10 - Última Carrera</h2>
                <h3 className="text-xl font-semibold mb-0">{latestRace.nombre}</h3>
                <p className="text-gray-200">
                  {latestRace.fecha_hasta
                    ? formatDate(latestRace.fecha_hasta)
                    : formatDate(latestRace.fecha_desde)
                  }
                </p>
                {latestRace.circuitoNombre && (
                  <p className="text-gray-300 text-sm">
                    {latestRace.circuitoNombre}
                    {latestRace.circuitoDistancia && ` - ${latestRace.circuitoDistancia}m`}
                  </p>
                )}
              </div>

              {results && results.length > 0 ? (
                <>
                  <Card className="bg-[#000000] border-0 shadow-2xl shadow-red-500/40 overflow-hidden max-w-4xl mx-auto">
                    <CardContent className="p-0">
                      <PilotoTable
                        pilotos={results.slice(0, 10).map((result) => ({
                          id: result.id,
                          piloto: result.piloto,
                          posicion: result.posicion || 0,
                          numeroAuto: result.numeroAuto,
                          tiempo: result.tiempo,
                          vueltas: 'vueltas' in result ? result.vueltas : undefined,
                          excluido: 'excluido' in result ? result.excluido : false,
                          puntos: 'puntos' in result ? (result as any).puntos : undefined,
                        }))}
                        config={{
                          showAuto: true,
                          showPuntos: results.some(r => 'puntos' in r && (r as any).puntos !== undefined),
                          showTiempo: true,
                          showVueltas: true
                        }}
                        variant="race"
                      />
                    </CardContent>
                  </Card>
                  <div className="mt-6 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-96">
                    <Link
                      href="/resultados"
                      className="font-semibold text-center block w-full bg-red-600 hover:bg-red-700 px-4 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base text-white"
                    >
                      Ver resultados completos
                    </Link>
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  No hay resultados disponibles para la última carrera
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-400 py-8">
              No hay datos de la última carrera disponibles
            </div>
          )}
        </div>
      )}
    </SectionWrapper>
  );
}