"use client";
import { useTabs } from "../../hooks/useTabs";
import { useRaceResult } from "@/hooks/useRaceResult";
import { Tabs } from "@/components/ui/Tabs";
import { DriverCard } from "@/components/ui/DriverCard";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Card } from "@/components/ui/card";
import { PilotoTable } from "../common/PilotoTable";
import Link from "next/link";
import { ChampionshipSectionProps } from "@/types/championship";
import { formatDate } from "@/utils/formatDate";
import { formatearTiempo } from "@/lib/utils";
import { getPositionIcon } from "@/utils/icons";

export default function ChampionshipSection({ championship, stats, latestRace }: ChampionshipSectionProps) {
  const { activeTab, setActiveTab } = useTabs("drivers");
  const { results } = useRaceResult(latestRace);

  const tabs = [
    { id: "drivers", label: "PILOTOS" },
    { id: "lastrace", label: "ÚLTIMA CARRERA" },
  ];

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
        <div>
          {/* Featured Drivers */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">TOP 3 del campeonato</h2>
            <div className="flex flex-col md:flex-row items-end justify-center gap-6 max-w-4xl mx-auto">
              <DriverCard
                position={2}
                name={championship?.standings[1]?.piloto.nombre || ""}
                points={championship?.standings[1]?.puntos || 0}
                imageSrc="/media/p2champ.jpg"
                className="order-2 md:order-1 w-full md:w-80"
              />
              <DriverCard
                position={1}
                name={championship?.standings[0]?.piloto.nombre || ""}
                points={championship?.standings[0]?.puntos || 0}
                imageSrc="/media/p1champ.jpg"
                className="order-1 md:order-2 w-full md:w-80 md:mb-8"
              />
              <DriverCard
                position={3}
                name={championship?.standings[2]?.piloto.nombre || ""}
                points={championship?.standings[2]?.puntos || 0}
                imageSrc="/media/p3champ.jpg"
                className="order-3 w-full md:w-80"
              />
            </div>
          </div>

          {/* Full Standings */}
          <div>
            <h2 className="text-2xl font-extrabold mb-6">TOP 5 del campeonato</h2>
            <Card className="bg-[#000000] text-sm border-0 shadow-2xl shadow-red-500/40 py-0 overflow-hidden">
              <PilotoTable
                pilotos={
                  championship?.standings
                    .slice(0, 5)
                    .map((standing, idx) => ({
                      ...standing,
                      posicion: idx + 1,
                    })) || []
                }
              />
            </Card>
            <div className="mt-6 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-96">
              <Link
                href="/resultados"
                className="font-semibold text-center block w-full bg-red-600 hover:bg-red-700 px-4 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base text-white"
              >
                Ir al Campeonato
              </Link>
            </div>
          </div>
        </div>
      )}

      {activeTab === "lastrace" && (
        <div>
          <h2 className="text-2xl font-extrabold mb-6">TOP 10 - Última Carrera</h2>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">{latestRace?.nombre || "Sin datos"}</h3>
            <p className="text-gray-400">
              {latestRace?.fecha_hasta ? formatDate(latestRace.fecha_hasta) : "Fecha no disponible"}
            </p>
          </div>
          <Card className="bg-[#000000] border-0 shadow-2xl shadow-red-500/40 py-0 overflow-hidden">
            <div className="sticky top-0 z-10 bg-white/5 flex items-center justify-between px-4 py-4 text-sm">
              <div className="flex items-center gap-4">
                <div className="w-8 flex justify-center text-white font-bold">#</div>
                <div className="text-white font-bold">Piloto</div>
              </div>
              <div className="flex items-center gap-14">
                <div className="text-white font-bold">T ° Total</div>
                <div className="text-white font-bold">Vueltas</div>
              </div>
            </div>
            <div>
              {results.length > 0 ? (
                results.slice(0, 10).map((result, index) => (
                  <div
                    key={result.id}
                    className="flex items-center justify-between p-4 hover:bg-red-500/50 transition-colors"
                  >
                    <div className="flex items-center gap-4 text-sm">
                      <div className="w-8 flex justify-center">{getPositionIcon(result.posicion || index + 1)}</div>
                      <div>
                        <h3 className="font-semibold text-white">{result.piloto?.nombre}</h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-16">
                      {result.tiempo ? (
                        <span className="text-sm font-bold text-white">{formatearTiempo(result.tiempo.toString())}</span>
                      ) : null}
                      <div className="text-left mr-4">
                        <span className="text-sm font-bold text-white">
                          {('excluido' in result && result.excluido) ? "EX" : ""}
                        </span>
                        <span className="text-sm font-bold text-white">
                          {"vueltas" in result
                            ? result.vueltas != null
                              ? `${result.vueltas}v`
                              : "0v"
                            : "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-300">No hay resultados disponibles</div>
              )}
            </div>
          </Card>
          <div className="mt-6 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-96">
            <Link
              href="/resultados"
              className="font-semibold text-center block w-full bg-red-600 hover:bg-red-700 px-4 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base text-white"
            >
              Ver resultados completos
            </Link>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}
