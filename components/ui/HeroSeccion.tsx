// components/ui/HeroSeccion.tsx
"use client";

import { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, Ruler } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { HeroSectionProps } from "@/types/championship";
import { parseDate } from "@/lib/utils";

export default function HeroSection({ raceData, stats }: HeroSectionProps) {
  const [nextRaceDate, setNextRaceDate] = useState<Date | null>(null);
  const [endRaceDate, setEndRaceDate] = useState<Date | null>(null);
  const [raceName, setRaceName] = useState<string>("");
  const [circuitoNombre, setCircuitoNombre] = useState<string>("");
  const [circuitoDistancia, setCircuitoDistancia] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isRaceOver, setIsRaceOver] = useState(false);
  const [isLoading, setIsLoading] = useState(!raceData);

  useEffect(() => {
    if (raceData) {
      const startDateTime = parseDate(raceData.fecha_desde);
      const endDateTime = raceData.fecha_hasta ? parseDate(raceData.fecha_hasta) : null;

      setNextRaceDate(startDateTime);
      setEndRaceDate(endDateTime);
      setRaceName(raceData.nombre);
      setCircuitoNombre(raceData.circuitoNombre || 'Circuito no especificado');
      setCircuitoDistancia(raceData.circuitoDistancia || null);
      setIsLoading(false);
    } else {
      setIsRaceOver(true);
      setIsLoading(false);
    }
  }, [raceData]);

  useEffect(() => {
    if (!nextRaceDate) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = nextRaceDate.getTime() - now;

      if (distance < 0) {
        setIsRaceOver(true);
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [nextRaceDate]);

  const formatDateRange = (startDate: Date, endDate: Date | null) => {
    if (!startDate) return "Fecha no disponible";

    const optionsDay: Intl.DateTimeFormatOptions = { day: "numeric" };
    const optionsMonth: Intl.DateTimeFormatOptions = { month: "long" };

    const startDay = startDate.toLocaleDateString("es-ES", optionsDay);
    const startMonth = startDate.toLocaleDateString("es-ES", optionsMonth);

    if (!endDate) {
      return `${startDay} de ${startMonth}`;
    }

    const endDay = endDate.toLocaleDateString("es-ES", optionsDay);
    const endMonth = endDate.toLocaleDateString("es-ES", optionsMonth);

    if (startDate.getMonth() === endDate.getMonth()) {
      return `${startDay} - ${endDay} de ${startMonth}`;
    } else {
      return `${startDay} de ${startMonth} - ${endDay} de ${endMonth}`;
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover object-center opacity-50"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/media/HeroVideo.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="absolute inset-0 z-[1]">
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-red-500/10 to-transparent"></div>
          <div className="absolute top-20 right-20 w-96 h-96 border border-red-500/20 rotate-45 transform hidden lg:block"></div>
          <div className="absolute top-40 right-40 w-64 h-64 border border-red-500/30 rotate-12 transform hidden md:block"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 border border-red-500/15 -rotate-45 transform hidden lg:block"></div>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-red-600 via-red-500 to-red-400 transform skew-x-12 translate-x-1/2"></div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between px-4 sm:px-6 lg:px-12 py-8 lg:py-20 gap-8 xl:gap-12">
        <div className="flex-1 max-w-2xl text-center xl:text-left">
          <div className="mb-6">
            <span className="inline-block bg-red-600/20 text-red-400 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4">
              Temporada {raceData?.campeonato?.anio || 2025}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 lg:mb-6">
              Turismo Pista
              <span className="block text-red-500">1100</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 lg:mb-8 leading-relaxed max-w-xl mx-auto xl:mx-0">
              La categoría más emocionante del automovilismo zonal. Velocidad, adrenalina y competencia en cada curva.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center xl:justify-start">
            <button
              onClick={() => scrollToSection("calendario")}
              className="bg-red-600 hover:bg-red-700 px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold transition-colors text-sm lg:text-base"
            >
              VER CALENDARIO
            </button>
            <button
              onClick={() => scrollToSection("campeonato")}
              className="border border-white/20 hover:border-red-500 px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold transition-colors text-sm lg:text-base"
            >
              CONOCER PILOTOS
            </button>
          </div>
        </div>

        <div className="flex-1 max-w-md w-full">
          <Card className="bg-black border-red-500/20 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-semibold text-white">
                  {raceName ? `Próxima Carrera: ${raceName}` : 'Próxima Carrera'}
                </h3>
              </div>

              {isLoading ? (
                <div className="text-center text-gray-300">Cargando próxima carrera...</div>
              ) : isRaceOver ? (
                <div className="text-center text-gray-300">No hay carreras programadas próximas.</div>
              ) : (
                <>
                  <div className="grid grid-cols-4 gap-2 mb-6">
                    <div className="text-center">
                      <div className="bg-red-600 rounded-lg p-2 sm:p-3 mb-1">
                        <span className="text-xl sm:text-2xl font-bold text-white">{timeLeft.days}</span>
                      </div>
                      <span className="text-xs text-gray-400">DÍAS</span>
                    </div>
                    <div className="text-center">
                      <div className="bg-red-600 rounded-lg p-2 sm:p-3 mb-1">
                        <span className="text-xl sm:text-2xl font-bold text-white">{timeLeft.hours}</span>
                      </div>
                      <span className="text-xs text-gray-400">HORAS</span>
                    </div>
                    <div className="text-center">
                      <div className="bg-red-600 rounded-lg p-2 sm:p-3 mb-1">
                        <span className="text-xl sm:text-2xl font-bold text-white">{timeLeft.minutes}</span>
                      </div>
                      <span className="text-xs text-gray-400">MIN</span>
                    </div>
                    <div className="text-center">
                      <div className="bg-red-600 rounded-lg p-2 sm:p-3 mb-1">
                        <span className="text-xl sm:text-2xl font-bold text-white">{timeLeft.seconds}</span>
                      </div>
                      <span className="text-xs text-gray-400">SEG</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <span className="text-sm text-gray-300">
                        {nextRaceDate ? formatDateRange(nextRaceDate, endRaceDate) : 'Fecha no disponible'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{circuitoNombre}</span>
                    </div>
                    {circuitoDistancia && (
                      <div className="flex items-center gap-3">
                        <Ruler className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span className="text-sm text-gray-300">Distancia: {circuitoDistancia} km</span>
                      </div>
                    )}
                    {/* Circuit Drawing */}
                    <div className="bg-black/40 rounded-lg p-4 mb-4">
                      <h4 className="text-sm font-medium text-white mb-3">Trazado del Circuito</h4>
                      <div className="relative h-20 sm:h-24 bg-black rounded border-2 border-red-500/20">
                        {/* Simple circuit representation */}
                        <svg viewBox="0 0 200 80" className="w-full h-full">
                          <path
                            d="M20 40 Q20 20 40 20 L160 20 Q180 20 180 40 Q180 60 160 60 L40 60 Q20 60 20 40" 
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="3"
                            strokeDasharray="5,5"
                          />
                          <circle cx="20" cy="40" r="3" fill="#ef4444" />
                          <text x="25" y="45" fill="#ef4444" fontSize="8">
                            START
                          </text>
                        </svg>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-12 pb-8 lg:pb-12">
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-8">
          <div className="text-center lg:text-left">
            <div className="text-2xl sm:text-3xl font-bold text-red-500 mb-1">+45</div>
            <div className="text-sm text-gray-400">Pilotos</div>
          </div>
          <div className="text-center lg:text-left">
            <div className="text-2xl sm:text-3xl font-bold text-red-500 mb-1">10</div>
            <div className="text-sm text-gray-400">Carreras</div>
          </div>
          <div className="text-center lg:text-left">
            <div className="text-2xl sm:text-3xl font-bold text-red-500 mb-1">{raceData?.campeonato?.anio || 2025}</div>
            <div className="text-sm text-gray-400">Temporada</div>
          </div>
        </div>
      </div>
    </div>
  );
}