import { Nunito, Inter, Geist_Mono } from "next/font/google"

export const fontBrand = Nunito({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-brand",
})

export const fontPrimary = Inter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-primary",
})

export const fontMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
})
