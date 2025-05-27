"use client"

import { useState, useEffect } from "react"
import { Calendar, MapPin, Clock, Menu, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function Component() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Fecha de la próxima carrera (ejemplo: 15 días desde ahora)
  const nextRaceDate = new Date()
  nextRaceDate.setDate(nextRaceDate.getDate() + 15)
  nextRaceDate.setHours(14, 30, 0, 0) // 14:30 hs

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = nextRaceDate.getTime() - now

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Winner Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/ganador-ultima-fecha.jpg"
          alt="Ganador última carrera"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-red-500/10 to-transparent"></div>
          <div className="absolute top-20 right-20 w-96 h-96 border border-red-500/20 rotate-45 transform hidden lg:block"></div>
          <div className="absolute top-40 right-40 w-64 h-64 border border-red-500/30 rotate-12 transform hidden md:block"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 border border-red-500/15 -rotate-45 transform hidden lg:block"></div>
        </div>

        {/* Diagonal stripes effect */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-red-600 via-red-500 to-red-400 transform skew-x-12 translate-x-1/2"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between p-4 lg:px-12 lg:py-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <span className="text-xl font-bold">Turismo Pista 1100</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8 text-bold font-semibold">
          <a href="#" className="hover:text-red-500 transition-colors">
            Inicio
          </a>
          <a href="#" className="hover:text-red-500 transition-colors">
            Campeonato
          </a>
          <a href="#" className="hover:text-red-500 transition-colors">
            Pilotos
          </a>
          <a href="#" className="hover:text-red-500 transition-colors">
            Imágenes
          </a>
          <a href="#" className="hover:text-red-500 transition-colors">
            Contacto
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block bg-red-600 hover:bg-red-700 px-4 lg:px-6 py-2 rounded-lg transition-colors text-sm lg:text-base">
            CONTACTANOS
          </button>

          {/* Mobile menu button */}
          <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-gray-800 lg:hidden">
            <div className="flex flex-col space-y-4 p-6">
              <a href="#" className="hover:text-red-500 transition-colors">
                Inicio
              </a>
              <a href="#" className="hover:text-red-500 transition-colors">
                Campeonato
              </a>
              <a href="#" className="hover:text-red-500 transition-colors">
                Pilotos
              </a>
              <a href="#" className="hover:text-red-500 transition-colors">
                Imágenes
              </a>
              <a href="#" className="hover:text-red-500 transition-colors">
                Contacto
              </a>
              <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg transition-colors text-left">
                CONTACTANOS
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between px-4 sm:px-6 lg:px-12 py-8 lg:py-20 gap-8 xl:gap-12">
        {/* Left Content */}
        <div className="flex-1 max-w-2xl text-center xl:text-left">
          <div className="mb-6">
            <span className="inline-block bg-red-600/20 text-red-400 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4">
              Temporada 2025
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 lg:mb-6">
              Turismo Pista
              <span className="block text-red-500">1100</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 lg:mb-8 leading-relaxed max-w-xl mx-auto xl:mx-0">
              La categoría más emocionante del automovilismo zonal. Velocidad, adrenalina y competencia en cada
              curva.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center xl:justify-start">
            <button className="bg-red-600 hover:bg-red-700 px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold transition-colors text-sm lg:text-base">
              VER CALENDARIO
            </button>
            <button className="border border-white/20 hover:border-red-500 px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold transition-colors text-sm lg:text-base">
              CONOCER PILOTOS
            </button>
          </div>
        </div>

        {/* Right Content - Race Countdown Card */}
        <div className="flex-1 max-w-md w-full">
          <Card className="bg-black border-red-500/20 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-semibold text-white">Próxima Carrera</h3>
              </div>

              {/* Countdown */}
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

              {/* Race Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span className="text-sm text-gray-300">{formatDate(nextRaceDate)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span className="text-sm text-gray-300">Autódromo Mar y Valle</span>
                </div>
              </div>

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
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Stats */}
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
            <div className="text-2xl sm:text-3xl font-bold text-red-500 mb-1">2025</div>
            <div className="text-sm text-gray-400">Temporada</div>
          </div>
        </div>
      </div>
    </div>
  )
}
