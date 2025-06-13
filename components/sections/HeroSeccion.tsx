"use client";

import { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, Ruler } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { HeroSectionProps } from "@/types/championship";
import { parseDate } from "@/lib/utils";

const useRaceCountdown = (targetDate: Date | null) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    if (!targetDate) return;

    const timer = setInterval(() => {
      const now = Date.now();
      const diff = targetDate.getTime() - now;

      if (diff <= 0) {
        setIsOver(true);
        clearInterval(timer);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return { timeLeft, isOver };
};

const formatDateRange = (start: Date, end: Date | null): string => {
  if (!start) return "Fecha no disponible";

  const optsDay: Intl.DateTimeFormatOptions = { day: "numeric" };
  const optsMonth: Intl.DateTimeFormatOptions = { month: "long" };

  const startDay = start.toLocaleDateString("es-ES", optsDay);
  const startMonth = start.toLocaleDateString("es-ES", optsMonth);

  if (!end) return `${startDay} de ${startMonth}`;

  const endDay = end.toLocaleDateString("es-ES", optsDay);
  const endMonth = end.toLocaleDateString("es-ES", optsMonth);

  return start.getMonth() === end.getMonth()
    ? `${startDay} - ${endDay} de ${startMonth}`
    : `${startDay} de ${startMonth} - ${endDay} de ${endMonth}`;
};

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function HeroSection({ raceData }: HeroSectionProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    if (raceData) {
      setStartDate(parseDate(raceData.fecha_desde));
      setEndDate(raceData.fecha_hasta ? parseDate(raceData.fecha_hasta) : null);
    }
  }, [raceData]);

  const { timeLeft, isOver } = useRaceCountdown(startDate);

  const isLoading = !raceData;
  const showCountdown = !isOver && !isLoading && !!startDate;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden pt-20">
      {/* VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover opacity-50"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/media/HeroVideo.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* DECORATIVE ELEMENTS */}
      <div className="absolute inset-0 z-[1]">
        {/* Gradient overlays */}
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-red-500/10 to-transparent" />
          <div className="absolute top-20 right-20 w-96 h-96 border border-red-500/20 rotate-45 transform hidden lg:block" />
          <div className="absolute top-40 right-40 w-64 h-64 border border-red-500/30 rotate-12 transform hidden md:block" />
          <div className="absolute bottom-20 right-10 w-80 h-80 border border-red-500/15 -rotate-45 transform hidden lg:block" />
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-red-600 via-red-500 to-red-400 transform skew-x-12 translate-x-1/2" />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between px-4 sm:px-6 lg:px-12 py-8 lg:py-20 gap-8 xl:gap-12">
        {/* Left section */}
        <div className="flex-1 max-w-2xl text-center xl:text-left">
          <div className="mb-6">
            <span className="inline-block bg-red-600/20 text-red-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Temporada {raceData?.campeonato?.anio || "2025"}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
              Turismo Pista <span className="block text-red-500">1100</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl mx-auto xl:mx-0">
              La categoría más emocionante del automovilismo zonal. Velocidad, adrenalina y competencia en cada curva.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center xl:justify-start">
              <button
                onClick={() => scrollTo("calendario")}
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold text-sm"
              >
                VER CALENDARIO
              </button>
              <button
                onClick={() => scrollTo("campeonato")}
                className="border border-white/20 hover:border-red-500 px-6 py-3 rounded-lg font-semibold text-sm"
              >
                CONOCER PILOTOS
              </button>
            </div>
          </div>
        </div>

        {/* Right section - Countdown Card */}
        <div className="flex-1 max-w-md w-full">
          <Card className="bg-black border-red-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-semibold text-white">
                  {raceData?.nombre ? `Próxima fecha -> ${raceData.nombre}` : "Próxima Carrera"}
                </h3>
              </div>

              {isLoading ? (
                <p className="text-center text-gray-300">Cargando próxima carrera...</p>
              ) : isOver ? (
                <p className="text-center text-gray-300">No hay carreras programadas próximas.</p>
              ) : (
                <>
                  {showCountdown && (
                    <div className="grid grid-cols-4 gap-2 mb-6">
                      {["DÍAS", "HORAS", "MIN", "SEG"].map((label, i) => {
                        const value = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds][i];
                        return (
                          <div key={label} className="text-center">
                            <div className="bg-red-600 rounded-lg p-3 mb-1">
                              <span className="text-2xl font-bold text-white">{value}</span>
                            </div>
                            <span className="text-xs text-gray-400">{label}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="space-y-3 text-sm text-gray-300 mb-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-red-500" />
                      <span>{startDate ? formatDateRange(startDate, endDate) : "Fecha no disponible"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span>{raceData?.circuitoNombre || "Circuito no especificado"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Ruler className="w-4 h-4 text-red-500" />
                      <span>{raceData?.circuitoDistancia ? `${raceData.circuitoDistancia} m` : "Distancia no disponible"}</span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
