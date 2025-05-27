"use client"

import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Calendar, Trophy, Users } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-red-600 text-white relative overflow-hidden">
      {/* Checkered flag pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #000 25%, transparent 25%), 
              linear-gradient(-45deg, #000 25%, transparent 25%), 
              linear-gradient(45deg, transparent 75%, #000 75%), 
              linear-gradient(-45deg, transparent 75%, #000 75%)
            `,
            backgroundSize: "40px 40px",
            backgroundPosition: "0 0, 0 20px, 20px -20px, -20px 0px",
          }}
        ></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-red-600 rounded-sm"></div>
                </div>
                <span className="text-2xl font-bold">TP1100</span>
              </div>
              <p className="text-red-100 mb-6 leading-relaxed">
                La categoría más emocionante del automovilismo nacional. Velocidad, adrenalina y competencia en cada
                curva.
              </p>

              {/* Social Media */}
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-red-100 hover:text-white transition-colors flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    Campeonato
                  </a>
                </li>
                <li>
                  <a href="#" className="text-red-100 hover:text-white transition-colors flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Pilotos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-red-100 hover:text-white transition-colors flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Calendario
                  </a>
                </li>
                <li>
                  <a href="#" className="text-red-100 hover:text-white transition-colors">
                    Galería
                  </a>
                </li>
                <li>
                  <a href="#" className="text-red-100 hover:text-white transition-colors">
                    Noticias
                  </a>
                </li>
                <li>
                  <a href="#" className="text-red-100 hover:text-white transition-colors">
                    Reglamento
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-4">Contacto</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-red-100">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>+54 11 1234-5678</span>
                </li>
                <li className="flex items-center gap-3 text-red-100">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>info@tp1100.com</span>
                </li>
                <li className="flex items-start gap-3 text-red-100">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    Autódromo Oscar Alfredo Gálvez
                    <br />
                    Buenos Aires, Argentina
                  </span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-bold mb-4">Newsletter</h3>
              <p className="text-red-100 mb-4">Recibe las últimas noticias y resultados del campeonato.</p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-red-200 focus:outline-none focus:border-white/40 transition-colors"
                />
                <button className="w-full bg-white text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg font-semibold transition-colors">
                  Suscribirse
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="border-t border-red-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-white mb-1">24</div>
                <div className="text-sm text-red-200">Pilotos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">10</div>
                <div className="text-sm text-red-200">Fechas</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">8</div>
                <div className="text-sm text-red-200">Circuitos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">2024</div>
                <div className="text-sm text-red-200">Temporada</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-red-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-red-100 text-sm">© 2024 Turismo Pista 1100. Todos los derechos reservados.</div>
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-red-100 hover:text-white transition-colors">
                  Política de Privacidad
                </a>
                <a href="#" className="text-red-100 hover:text-white transition-colors">
                  Términos de Uso
                </a>
                <a href="#" className="text-red-100 hover:text-white transition-colors">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative racing elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-white via-black to-white opacity-30"></div>
    </footer>
  )
}
