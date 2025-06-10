"use client"
import { useState, useEffect } from "react"
import { Camera, Calendar, Trophy, Users, Clock, Zap, Flag } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GalleryImage,GallerySectionProps } from "@/types/championship"

export default function GallerySection({ images }: GallerySectionProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [displayedImages, setDisplayedImages] = useState<GalleryImage[]>(images.slice(0, 9));

  // Update displayed images when prop changes
  useEffect(() => {
    setDisplayedImages(images.slice(0, 9));
  }, [images]);

  // Rotate images every 10 seconds
  useEffect(() => {
    if (images.length <= 9) return; // No rotation needed if 9 or fewer images

    const rotateImages = () => {
      setDisplayedImages((prev) => {
        // Get indices of current displayed images
        const currentIds = prev.map((img) => img.id);
        // Filter out displayed images and shuffle the rest
        const availableImages = images
          .filter((img) => !currentIds.includes(img.id))
          .sort(() => Math.random() - 0.5);

        // Replace a random subset of displayed images
        const newDisplayed = [...prev];
        const replaceCount = Math.min(3, availableImages.length); // Replace up to 3 images
        for (let i = 0; i < replaceCount; i++) {
          const randomIndex = Math.floor(Math.random() * prev.length);
          if (availableImages[i]) {
            newDisplayed[randomIndex] = availableImages[i];
          }
        }
        return newDisplayed;
      });
    };

    const interval = setInterval(rotateImages, 10000); // Rotate every 10 seconds
    return () => clearInterval(interval);
  }, [images]);

  const getCategoryConfig = (category: string) => {
    switch (category) {
      case "Podio":
        return { color: "bg-yellow-600", icon: <Trophy className="w-3 h-3" /> };
      case "Carrera":
        return { color: "bg-red-600", icon: <Flag className="w-3 h-3" /> };
      case "Acción":
        return { color: "bg-red-500", icon: <Zap className="w-3 h-3" /> };
      case "Pits":
        return { color: "bg-gray-600", icon: <Clock className="w-3 h-3" /> };
      case "Victoria":
        return { color: "bg-green-600", icon: <Trophy className="w-3 h-3" /> };
      case "Ambiente":
        return { color: "bg-blue-600", icon: <Users className="w-3 h-3" /> };
      default:
        return { color: "bg-gray-600", icon: <Camera className="w-3 h-3" /> };
    }
  };

  if (!displayedImages.length) {
    return (
      <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto text-center text-gray-300">
          No hay imágenes disponibles para la última fecha.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-12 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            Galería
            <span className="block text-red-500">Turismo Pista 1100</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Los mejores momentos del campeonato capturados en imágenes
          </p>
        </div>

        {/* Bento Grid - 9 photos with different sizes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto auto-rows-[200px]">
          {displayedImages.map((image, index) => {
            const isHovered = hoveredCard === image.id;

            // Define different sizes for bento layout
            const getBentoSize = (index: number) => {
              switch (index) {
                case 0:
                  return "col-span-2 row-span-2"; // Large card (top-left)
                case 1:
                  return "col-span-1 row-span-1"; // Medium card (top-center)
                case 2:
                  return "col-span-1 row-span-1"; // Medium card (top-right)
                case 3:
                  return "col-span-1 row-span-1"; // Medium card (bottom-left)
                case 4:
                  return "col-span-1 row-span-1"; // Medium card (bottom-center-right)
                case 5:
                  return "col-span-1 row-span-1"; // Medium card (bottom-left-2)
                case 6:
                  return "col-span-1 row-span-1"; // Medium card (bottom-center-left-2)
                case 7:
                  return "col-span-1 row-span-1"; // Medium card (bottom-center-right-2)
                case 8:
                  return "col-span-1 row-span-1"; // Medium card (bottom-right)
                default:
                  return "col-span-1 row-span-1";
              }
            };

            return (
              <Card
                key={image.id}
                className={`bg-black border-2 py-0 border-red-500/20 hover:border-red-500 backdrop-blur-sm overflow-hidden group hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20 cursor-pointer relative ${getBentoSize(index)}`}
                onMouseEnter={() => setHoveredCard(image.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardContent className="p-0 h-full relative">
                  {/* Image */}
                  <img
                    src={`${image.image}?w=800&h=600&c=fill` || "/placeholder.svg"}
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

                  {/* Date */}
                  <div className="absolute top-3 right-3">
                    <div className="bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {image.date}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3
                      className={`font-bold text-white mb-1 ${getBentoSize(index).includes("col-span-2") ? "text-lg" : "text-sm"}`}
                    >
                      {image.title}
                    </h3>
                    <p
                      className={`text-gray-300 line-clamp-2 ${getBentoSize(index).includes("col-span-2") ? "text-sm" : "text-xs"}`}
                    >
                      {image.description}
                    </p>
                  </div>

                  {/* Red accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-white to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Decorative racing elements */}
      <div className="absolute bottom-5 left-10 opacity-50 pointer-events-none hidden lg:block">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 border-2 border-red-500 rounded-full"></div>
          <div className="w-16 h-1 bg-red-500"></div>
          <div className="w-8 h-8 border-2 border-white rounded-full"></div>
          <div className="w-16 h-1 bg-white"></div>
          <div className="w-8 h-8 border-2 border-red-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
