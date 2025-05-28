"use client"

import { useState } from "react"
import { ChevronRight, Trophy, Medal, Award } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ChampionshipSection() {
  const [activeTab, setActiveTab] = useState("drivers")

  const featuredDrivers = [
    {
      id: 1,
      name: "Carlos",
      lastName: "RODRIGUEZ",
      team: "Racing Team Red",
      points: 245,
      position: 1,
      image: "/placeholder.svg?height=300&width=400",
      teamColor: "bg-red-600",
    },
    {
      id: 2,
      name: "Miguel",
      lastName: "FERNANDEZ",
      team: "Speed Motors",
      points: 198,
      position: 2,
      image: "/placeholder.svg?height=300&width=400",
      teamColor: "bg-gray-600",
    },
    {
      id: 3,
      name: "Diego",
      lastName: "MARTINEZ",
      team: "Thunder Racing",
      points: 176,
      position: 3,
      image: "/placeholder.svg?height=300&width=400",
      teamColor: "bg-blue-600",
    },
  ]

  const allDrivers = [
    { position: 1, name: "Carlos RODRIGUEZ", team: "Racing Team Red", points: 245 },
    { position: 2, name: "Miguel FERNANDEZ", team: "Speed Motors", points: 198 },
    { position: 3, name: "Diego MARTINEZ", team: "Thunder Racing", points: 176 },
    { position: 4, name: "Alejandro SILVA", team: "Velocity Team", points: 154 },
    { position: 5, name: "Roberto GARCIA", team: "Power Racing", points: 132 },
    { position: 6, name: "Fernando LOPEZ", team: "Fast Track", points: 118 },
    { position: 7, name: "Sebastián TORRES", team: "Apex Racing", points: 95 },
    { position: 8, name: "Matías RUIZ", team: "Storm Racing", points: 87 },
    { position: 9, name: "Nicolás HERRERA", team: "Elite Motors", points: 76 },
    { position: 10, name: "Joaquín MORALES", team: "Turbo Team", points: 64 },
  ]

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />
      default:
        return (
          <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-400">{position}</span>
        )
    }
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-12 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            Campeonato
            <span className="block text-red-500">Turismo Pista 1100</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Sigue la clasificación de pilotos y equipos en la temporada 2025
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#080808] border-2 rounded-lg p-1 backdrop-blur-sm border-red-500/20 ">
            <button
              onClick={() => setActiveTab("drivers")}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === "drivers" ? "bg-red-600 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              PILOTOS
            </button>
            <button
              onClick={() => setActiveTab("lastrace")}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === "lastrace" ? "bg-red-600 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              ÚLTIMA CARRERA
            </button>
          </div>
        </div>

        {activeTab === "drivers" && (
          <div>
            {/* Featured Drivers */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center">Top 3 Pilotos</h2>
              <div className="flex flex-col md:flex-row items-end justify-center gap-6 max-w-4xl mx-auto">
                {/* Segundo lugar - Izquierda */}
                <div className="order-2 md:order-1 w-full md:w-80">
                  <Card className="bg-[#080808] border-red-500/20 border-2 backdrop-blur-sm py-0 overflow-hidden group hover:border-red-500 hover:shadow-2xl hover:shadow-red-500/20 hover:scale-105 transition-all duration-300 hover:-translate-y-2">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={featuredDrivers[1]?.image || "/placeholder.svg"}
                          alt={`${featuredDrivers[1]?.name} ${featuredDrivers[1]?.lastName}`}
                          className="w-full h-56 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-red-500/20 transition-all duration-300"></div>
                        <div className="absolute top-4 left-4">
                          <div className="flex items-center gap-2">
                            {getPositionIcon(featuredDrivers[1]?.position)}
                            <Badge variant="secondary" className="bg-black/70 text-white">
                              2°
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="mb-2">
                          <span className="text-sm text-white font-semibold">{featuredDrivers[1]?.name}</span>
                          <h3 className="text-xl text-white font-bold">{featuredDrivers[1]?.lastName}</h3>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-red-500">{featuredDrivers[1]?.points}</span>
                          <span className="text-sm text-gray-400">PTS</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Primer lugar - Centro (más alto) */}
                <div className="order-1 md:order-2 w-full md:w-80 md:mb-8">
                  <div className="relative">
                    <Card className="bg-[#080808] py-0 border-red-500/20 border-2  backdrop-blur-sm overflow-hidden group hover:border-yellow-500 hover:shadow-2xl hover:shadow-yellow-500/20 hover:scale-105 transition-all duration-300 hover:-translate-y-2">
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src={featuredDrivers[0]?.image || "/placeholder.svg"}
                            alt={`${featuredDrivers[0]?.name} ${featuredDrivers[0]?.lastName}`}
                            className="w-full h-64 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-yellow-500/20 transition-all duration-300"></div>
                          <div className="absolute top-4 left-4">
                            <div className="flex items-center gap-2">
                              {getPositionIcon(featuredDrivers[0]?.position)}
                              <Badge variant="secondary" className="bg-yellow-500 text-black font-bold">
                                1°
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="mb-2">
                            <span className="text-sm text-gray-400">{featuredDrivers[0]?.name}</span>
                            <h3 className="text-xl font-bold text-yellow-500">{featuredDrivers[0]?.lastName}</h3>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-yellow-500">{featuredDrivers[0]?.points}</span>
                            <span className="text-sm text-gray-400">PTS</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Tercer lugar - Derecha */}
                <div className="order-3 w-full md:w-80">
                  <Card className="bg-[#080808] py-0 border-red-500/20 border-2  backdrop-blur-sm overflow-hidden group hover:border-red-500 hover:shadow-2xl hover:shadow-red-500/20 hover:scale-105 transition-all duration-300 hover:-translate-y-2">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={featuredDrivers[2]?.image || "/placeholder.svg"}
                          alt={`${featuredDrivers[2]?.name} ${featuredDrivers[2]?.lastName}`}
                          className="w-full h-52 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-red-500/20 transition-all duration-300"></div>
                        <div className="absolute top-4 left-4">
                          <div className="flex items-center gap-2">
                            {getPositionIcon(featuredDrivers[2]?.position)}
                            <Badge variant="secondary" className="bg-black/70 text-white">
                              3°
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="mb-2">
                          <span className="text-sm text-white font-semibold">{featuredDrivers[2]?.name}</span>
                          <h3 className="text-xl text-white font-bold">{featuredDrivers[2]?.lastName}</h3>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-red-500">{featuredDrivers[2]?.points}</span>
                          <span className="text-sm text-gray-400">PTS</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Full Standings */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Clasificación Completa</h2>
              <Card className="bg-[#080808] shadow-2xl shadow-red-500/20  border-red-500/20 border-2 py-0 overflow-hidden">
                <CardContent className="p-0">
                  <div className="space-y-0">
                    {allDrivers.map((driver, index) => (
                      <div
                        key={driver.position}
                        className={`flex items-center justify-between p-4 border-b-2 border-red-500/10 last:border-b-0 hover:bg-red-500/10 transition-colors ${
                          index < 1 ? "bg-red-500/5" : ""
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-8 flex justify-center">{getPositionIcon(driver.position)}</div>
                          <div>
                            <h3 className="font-semibold text-white">{driver.name}</h3>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <span className="text-lg font-bold text-red-500">{driver.points}</span>
                            <span className="text-sm text-gray-400 ml-1">PTS</span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "lastrace" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Resultados - Última Carrera</h2>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Autódromo Mar y Valle</h3>
              <p className="text-gray-400">10 de abril, 2024</p>
            </div>
            <Card className="bg-black/90 border-red-500/20 py-0 overflow-hidden">
              <CardContent className="p-0">
                <div className="space-y-0">
                  {allDrivers.slice(0, 8).map((driver, index) => (
                    <div
                      key={driver.position}
                      className={`flex items-center justify-between p-4 border-b border-red-500/10 last:border-b-0 hover:bg-red-500/10 transition-colors ${
                        index < 3 ? "bg-red-500/5" : ""
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 flex justify-center">{getPositionIcon(driver.position)}</div>
                        <div>
                          <h3 className="font-semibold text-white">{driver.name}</h3>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="text-lg font-bold text-red-500">+{driver.points}</span>
                          <span className="text-sm text-gray-400 ml-1">PTS</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* View Full Button */}
        <div className="text-center mt-8">
          <button className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg font-semibold transition-colors">
            VER CLASIFICACIÓN COMPLETA
          </button>
        </div>
      </div>
    </div>
  )
}
