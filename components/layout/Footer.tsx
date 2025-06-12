"use client"

import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Calendar, Trophy, Users } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-red-600 text-white relative overflow-hidden">
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
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
                  target="_blank"
                  href="https://www.facebook.com/turismopista1100/?locale=es_LA"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  target="_blank"
                  href="https://www.instagram.com/turismopista1100/"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">Reglamento</h3>
              <ul className="space-y-3">
                <li>
                  <a target="_blank" href="https://drive.google.com/file/d/11oU4k3aJp_pwQ1hS2dO0u19TF8xgvwtU/view" className="text-red-100 hover:text-white transition-colors">
                    Reglamento tecnico
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://drive.google.com/file/d/14GzJq5i3VuIHEsfyl40zhRWio3X_eB-y/view" className="text-red-100 hover:text-white transition-colors">
                    Reglamento deportivo
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info 
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
            </div>*/}

            {/* Newsletter 
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
            </div>*/}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-red-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-red-100 text-sm">© 2025 Turismo Pista 1100. Todos los derechos reservados.</div>
              <div className="text-red-100 text-sm">
                <a href="https://github.com/AgustinBowen/" target="_blank" className="text-red-100 hover:text-white transition-colors">
                  make it by architín777
                </a>
              </div>
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
    </footer>
  )
}
