"use client"
import { useState } from "react"
import { Camera, Calendar, Trophy, Users, Clock, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ImageGalleryBento() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const galleryImages = [
    {
      id: 1,
      title: "Podio Fecha 1",
      description: "Celebración del podio en Buenos Aires",
      image: "/images/ganadorfecha1.jpg",
      category: "Podio",
      date: "15 Mar 2024",
    },
    {
      id: 2,
      title: "Largada Épica",
      description: "Momento de la largada en Córdoba",
      image: "/images/ganador-ultima-fecha.jpg",
      category: "Carrera",
      date: "12 Abr 2024",
    },
    {
      id: 3,
      title: "Vuelta Rápida",
      description: "Record de vuelta en Mendoza",
      image: "/images/ganador-ultima-fecha.jpg",
      category: "Acción",
      date: "10 May 2024",
    },
    {
      id: 4,
      title: "Boxes en Acción",
      description: "Estrategia en los pits",
      image: "/images/ganador-ultima-fecha.jpg",
      category: "Pits",
      date: "14 Jun 2024",
    },
    {
      id: 5,
      title: "Celebración",
      description: "Festejo del campeón",
      image: "/images/ganador-ultima-fecha.jpg",
      category: "Victoria",
      date: "20 Jul 2024",
    },
    {
      id: 6,
      title: "Fans TP1100",
      description: "La hinchada en las tribunas",
      image: "/images/ganador-ultima-fecha.jpg",
      category: "Ambiente",
      date: "18 Ago 2024",
    },
  ]

  const getCategoryConfig = (category: string) => {
    switch (category) {
      case "Podio":
        return { color: "bg-yellow-600", icon: <Trophy className="w-3 h-3" /> }
      case "Carrera":
        return { color: "bg-red-600", icon: <Zap className="w-3 h-3" /> }
      case "Acción":
        return { color: "bg-red-500", icon: <Zap className="w-3 h-3" /> }
      case "Pits":
        return { color: "bg-gray-600", icon: <Clock className="w-3 h-3" /> }
      case "Victoria":
        return { color: "bg-green-600", icon: <Trophy className="w-3 h-3" /> }
      case "Ambiente":
        return { color: "bg-blue-600", icon: <Users className="w-3 h-3" /> }
      default:
        return { color: "bg-gray-600", icon: <Camera className="w-3 h-3" /> }
    }
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-12 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            Galería
            <span className="block text-red-500">TP1100</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Los mejores momentos del campeonato capturados en imágenes
          </p>
        </div>

        {/* Symmetric Grid - 6 photos (2 rows x 3 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {galleryImages.map((image, index) => {
            const categoryConfig = getCategoryConfig(image.category)
            const isHovered = hoveredCard === image.id

            return (
              <Card
                key={image.id}
                className="bg-black border-2 border-red-500/20 hover:border-red-500 backdrop-blur-sm overflow-hidden group hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20 cursor-pointer relative aspect-square"
                onMouseEnter={() => setHoveredCard(image.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardContent className="p-0 h-full relative">
                  {/* Image */}
                  <img
                    src={image.image || "/placeholder.svg"}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />

                  {/* Racing stripes effect on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 transition-all duration-500 ${
                      isHovered ? "translate-x-full" : "-translate-x-full"
                    }`}
                  ></div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge className={`${categoryConfig.color} text-white text-xs px-2 py-1 flex items-center gap-1`}>
                      {categoryConfig.icon}
                      {image.category}
                    </Badge>
                  </div>

                  {/* Date */}
                  <div className="absolute top-3 right-3">
                    <div className="bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {image.date}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-bold text-white mb-1">{image.title}</h3>
                    <p className="text-sm text-gray-300 line-clamp-2">{image.description}</p>
                  </div>

                  {/* Red accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-white to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-500 mb-2">150+</div>
            <div className="text-sm text-gray-400">Fotos de Carrera</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">24</div>
            <div className="text-sm text-gray-400">Pilotos Fotografiados</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-500 mb-2">10</div>
            <div className="text-sm text-gray-400">Circuitos Visitados</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">5K+</div>
            <div className="text-sm text-gray-400">Fans en Redes</div>
          </div>
        </div>
      </div>

      {/* Decorative racing elements */}
      <div className="absolute bottom-20 left-10 opacity-5 pointer-events-none hidden lg:block">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 border-2 border-red-500 rounded-full"></div>
          <div className="w-16 h-1 bg-red-500"></div>
          <div className="w-8 h-8 border-2 border-white rounded-full"></div>
          <div className="w-16 h-1 bg-white"></div>
          <div className="w-8 h-8 border-2 border-red-500 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
