"use client"
import { useState, useEffect } from "react"
import { Menu, X } from 'lucide-react'
import HeroSection from "@/components/ui/HeroSeccion"
import ChampionshipSection from "@/components/ui/CampeonatoSeccion"
import CalendarSection from "@/components/ui/CalendarioSeccion"
import GallerySection from "@/components/ui/GaleriaSeccion"
import Footer from "@/components/layout/Footer"

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("inicio")

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      })
    }
    setMobileMenuOpen(false)
  }

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["inicio", "campeonato", "calendario", "galeria"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigationItems = [
    { id: "inicio", label: "Inicio" },
    { id: "campeonato", label: "Campeonato" },
    { id: "calendario", label: "Calendario" },
    { id: "galeria", label: "Galería" },
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b-[1px] border-[#242424]">
        <div className="flex items-center justify-between p-4 lg:px-12 lg:py-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className="text-xl font-bold text-white">Turismo Pista 1100</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 text-bold font-semibold">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors ${
                  activeSection === item.id
                    ? "text-red-500"
                    : "text-white hover:text-red-500"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => scrollToSection("contacto")}
              className="hidden sm:block bg-red-600 hover:bg-red-700 px-4 lg:px-6 py-2 rounded-lg transition-colors text-sm lg:text-base text-white"
            >
              CONTACTANOS
            </button>

            {/* Mobile menu button */}
            <button 
              className="lg:hidden p-2 text-white" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-red-500/20 lg:hidden">
              <div className="flex flex-col space-y-4 p-6">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left transition-colors ${
                      activeSection === item.id
                        ? "text-red-500"
                        : "text-white hover:text-red-500"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <button 
                  onClick={() => scrollToSection("contacto")}
                  className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg transition-colors text-left text-white"
                >
                  CONTACTANOS
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Page Sections */}
      <main>
        <section id="inicio">
          <HeroSection />
        </section>

        <section id="campeonato">
          <ChampionshipSection />
        </section>

        <section id="calendario">
          <CalendarSection />
        </section>

        <section id="galeria">
          <GallerySection />
        </section>

        <section id="contacto">
          <Footer />
        </section>
      </main>
    </div>
  )
}
