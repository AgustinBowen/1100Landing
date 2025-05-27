import { Inter} from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Turismo Pista 1100",
  description: "La categoría más emocionante del automovilismo nacional",
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  )
}
