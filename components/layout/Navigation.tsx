// components/layout/Navigation.tsx
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const pathname = usePathname();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Si estamos en una ruta específica, no cambiar el activeSection por scroll
      if (pathname !== "/") {
        return;
      }

      const sections = ["inicio", "campeonato", "calendario", "galeria"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Establecer activeSection basado en la ruta actual
    if (pathname === "/resultados") {
      setActiveSection("resultados");
    } else if (pathname === "/") {
      // Solo en la página principal, detectar por scroll
      window.addEventListener("scroll", handleScroll);
      // Ejecutar una vez para establecer la sección inicial
      handleScroll();
    }

    return () => {
      if (pathname === "/") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [pathname]);

  const navigationItems = [
    { id: "inicio", label: "Inicio", href: "/#inicio", isRoute: false },
    { id: "campeonato", label: "Campeonato", href: "/#campeonato", isRoute: false },
    { id: "resultados", label: "Resultados", href: "/resultados", isRoute: true },
    { id: "calendario", label: "Calendario", href: "/#calendario", isRoute: false },
    { id: "galeria", label: "Galería", href: "/#galeria", isRoute: false },
  ];

  const handleNavClick = (item: typeof navigationItems[0]) => {
    if (item.isRoute) {
      setMobileMenuOpen(false);
      return;
    } else {
      if (pathname !== "/") {
        window.location.href = item.href;
      } else {
        scrollToSection(item.id);
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b-[1px] border-[#242424]">
      <div className="flex items-center justify-between p-4 lg:px-12 lg:py-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <a href="/"><span className="text-xl font-bold text-white hover:text-red-500">Turismo Pista 1100</span></a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8 text-bold font-semibold">
          {navigationItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                if (!item.isRoute) {
                  e.preventDefault();
                  handleNavClick(item);
                }
              }}
              className={`transition-colors ${activeSection === item.id
                  ? "text-red-500"
                  : "text-white hover:text-red-500"
                }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#"
            target="_blank"
            className="cursor-pointer hidden sm:block bg-red-600 hover:bg-red-700 px-4 lg:px-6 py-2 rounded-lg transition-colors text-sm lg:text-base text-white"
          >
            Live Timing
          </a>

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
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    if (!item.isRoute) {
                      e.preventDefault();
                      handleNavClick(item);
                    } else {
                      setMobileMenuOpen(false);
                    }
                  }}
                  className={`text-left transition-colors ${activeSection === item.id
                      ? "text-red-500"
                      : "text-white hover:text-red-500"
                    }`}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/#contacto"
                onClick={(e) => {
                  if (pathname !== "/") {
                    // Si no estamos en la página principal, navegar a ella
                    window.location.href = "/#contacto";
                  } else {
                    e.preventDefault();
                    scrollToSection("contacto");
                  }
                  setMobileMenuOpen(false);
                }}
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg transition-colors text-left text-white inline-block"
              >
                Live timing
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}