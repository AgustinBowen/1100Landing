"use client"

import { useState } from "react"
import { Calendar, MapPin, Trophy, Clock, Flag, CheckCircle, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function RaceCalendar() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const races = [
    {
      id: 1,
      round: "Fecha 1",
      name: "Gran Premio de Buenos Aires",
      circuit: "Autódromo Oscar Alfredo Gálvez",
      date: "2024-03-15",
      time: "14:30",
      status: "completed",
      winner: "Carlos RODRIGUEZ",
      winnerTeam: "Racing Team Red",
      image: "/images/ganadorfecha1.jpg",
    },
    {
      id: 2,
      round: "Fecha 2",
      name: "GP de Córdoba",
      circuit: "Autódromo Oscar Cabalén",
      date: "2024-04-12",
      time: "15:00",
      status: "completed",
      winner: "Miguel FERNANDEZ",
      winnerTeam: "Speed Motors",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      round: "Fecha 3",
      name: "GP de Mendoza",
      circuit: "Circuito San Juan Villicum",
      date: "2024-05-10",
      time: "14:00",
      status: "completed",
      winner: "Carlos RODRIGUEZ",
      winnerTeam: "Racing Team Red",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 4,
      round: "Fecha 4",
      name: "GP de Rosario",
      circuit: "Autódromo Ciudad de Rosario",
      date: "2024-06-14",
      time: "15:30",
      status: "completed",
      winner: "Diego MARTINEZ",
      winnerTeam: "Thunder Racing",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 5,
      round: "Fecha 5",
      name: "GP de La Plata",
      circuit: "Autódromo Roberto Mouras",
      date: "2024-07-20",
      time: "14:30",
      status: "completed",
      winner: "Carlos RODRIGUEZ",
      winnerTeam: "Racing Team Red",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 6,
      round: "Fecha 6",
      name: "GP de Paraná",
      circuit: "Autódromo de Paraná",
      date: "2024-08-18",
      time: "15:00",
      status: "live",
      winner: null,
      winnerTeam: null,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 7,
      round: "Fecha 7",
      name: "GP de Neuquén",
      circuit: "Autódromo Parque Centenario",
      date: "2024-09-15",
      time: "14:00",
      status: "upcoming",
      winner: null,
      winnerTeam: null,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 8,
      round: "Fecha 8",
      name: "GP de Tucumán",
      circuit: "Autódromo Rogelio Nores Martínez",
      date: "2024-10-13",
      time: "15:30",
      status: "upcoming",
      winner: null,
      winnerTeam: null,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 9,
      round: "Fecha 9",
      name: "GP de Santa Fe",
      circuit: "Autódromo Las Parejas",
      date: "2024-11-10",
      time: "14:30",
      status: "upcoming",
      winner: null,
      winnerTeam: null,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 10,
      round: "Fecha 10",
      name: "Gran Final - Buenos Aires",
      circuit: "Autódromo Oscar Alfredo Gálvez",
      date: "2024-12-08",
      time: "16:00",
      status: "upcoming",
      winner: null,
      winnerTeam: null,
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return {
          bgColor: "bg-black/90",
          borderColor: "border-green-500/30",
          hoverBorder: "hover:border-green-500",
          hoverShadow: "hover:shadow-green-500/20",
          icon: <CheckCircle className="w-3 h-3 text-green-500" />,
          badge: "FINALIZADA",
          badgeColor: "bg-green-600",
        }
      case "next":
        return {
          bgColor: "bg-black/90",
          borderColor: "border-red-500/50",
          hoverBorder: "hover:border-red-500",
          hoverShadow: "hover:shadow-red-500/30",
          icon: <Flag className="w-3 h-3 text-red-500" />,
          badge: "PRÓXIMA",
          badgeColor: "bg-red-600",
        }
      case "live":
        return {
          bgColor: "bg-black/90",
          borderColor: "border-red-500/70",
          hoverBorder: "hover:border-red-500",
          hoverShadow: "hover:shadow-red-500/40",
          icon: <Flag className="w-3 h-3 text-red-500 animate-pulse" />,
          badge: "EN VIVO",
          badgeColor: "bg-red-600 animate-pulse",
        }
      case "upcoming":
        return {
          bgColor: "bg-black/90",
          borderColor: "border-gray-500/20",
          hoverBorder: "hover:border-white/50",
          hoverShadow: "hover:shadow-white/10",
          icon: <Clock className="w-3 h-3 text-gray-400" />,
          badge: "PRÓXIMAMENTE",
          badgeColor: "bg-gray-600",
        }
      default:
        return {
          bgColor: "bg-black/90",
          borderColor: "border-gray-500/20",
          hoverBorder: "hover:border-white/50",
          hoverShadow: "hover:shadow-white/10",
          icon: <Clock className="w-3 h-3 text-gray-400" />,
          badge: "PRÓXIMAMENTE",
          badgeColor: "bg-gray-600",
        }
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
    })
  }

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4 sm:px-6 lg:px-12 relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-5xl font-bold mb-3">
            Calendario
            <span className="block text-red-500">Temporada 2024</span>
          </h1>
          <p className="text-lg text-gray-300">Todas las fechas del campeonato TP1100</p>
        </div>

        {/* Race Grid */}
        <div className="flex flex-col gap-2 max-w-3xl mx-auto">
          {races.map((race) => {
            const statusConfig = getStatusConfig(race.status)
            const isHovered = hoveredCard === race.id

            return (
              <Card
                key={race.id}
                className={`${statusConfig.bgColor} ${statusConfig.borderColor} ${statusConfig.hoverBorder} backdrop-blur-sm overflow-hidden group hover:scale-102 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl ${statusConfig.hoverShadow} cursor-pointer`}
                onMouseEnter={() => setHoveredCard(race.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardContent className="p-0">
                  <div className="flex items-center">
                    {/* Left Image */}
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <img
                        src={race.image || "/placeholder.svg"}
                        alt={race.name}
                        className="w-full h-full object-cover"
                      />

                      {/* Racing stripes effect on hover */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 transition-all duration-500 ${
                          isHovered ? "translate-x-full" : "-translate-x-full"
                        }`}
                      ></div>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                      {/* Round Number */}
                      <div className="absolute bottom-1 right-1">
                        <div className="bg-black/70 text-white px-1 py-0.5 rounded text-xs font-bold">
                          {race.round.replace("Fecha ", "")}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          {statusConfig.icon}
                          <h3 className="text-sm font-bold truncate text-white">{race.name}</h3>
                        </div>
                        <Badge className={`${statusConfig.badgeColor} text-white text-xs px-2 py-0.5`}>
                          {statusConfig.badge}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{race.circuit}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(race.date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{race.time}</span>
                          </div>
                        </div>
                      </div>

                      {/* Status specific content */}
                      {race.status === "completed" && race.winner && (
                        <div className="flex items-center gap-1 mt-1">
                          <Trophy className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs font-semibold text-yellow-500">{race.winner}</span>
                        </div>
                      )}

                      {race.status === "live" && (
                        <div className="flex items-center gap-1 mt-1">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-xs font-semibold text-red-500">Vuelta 15/30</span>
                        </div>
                      )}

                      {race.status === "upcoming" && (
                        <div className="flex items-center gap-1 mt-1">
                          <Users className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-400">24 pilotos</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Calendar Summary */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <Card className="bg-black/90 border-green-500/20">
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <h3 className="text-sm font-bold mb-1 text-white">Finalizadas</h3>
              <p className="text-2xl font-bold text-green-500">5</p>
            </CardContent>
          </Card>

          <Card className="bg-black/90 border-red-500/30">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <Flag className="w-6 h-6 text-red-500 animate-pulse" />
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-sm font-bold mb-1 text-white">En Vivo</h3>
              <p className="text-sm font-bold text-red-500">GP Paraná</p>
            </CardContent>
          </Card>

          <Card className="bg-black/90 border-gray-500/20">
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 text-gray-400 mx-auto mb-2" />
              <h3 className="text-sm font-bold mb-1 text-white">Restantes</h3>
              <p className="text-2xl font-bold text-gray-400">5</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 via-transparent to-red-500/5 pointer-events-none"></div>
    </div>
  )
}
