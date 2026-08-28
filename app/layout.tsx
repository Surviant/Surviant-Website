import type React from "react"
import type { Metadata, Viewport } from "next"
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
})

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex-sans",
  display: "swap",
})

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.surviant.com"),
  title: {
    default: "Surviant | Product Engineering",
    template: "%s | Surviant Technologies",
  },
  description:
    "Surviant helps founders and product teams turn a product decision into a clear interface, a durable build, and a release people can use.",
  openGraph: {
    type: "website",
    url: "https://www.surviant.com",
    siteName: "Surviant Technologies",
    title: "Surviant | You have a product to ship.",
    description:
      "Product strategy, experience design, full-stack engineering, and practical AI for teams with software to ship.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Surviant product engineering build sheet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Surviant | You have a product to ship.",
    description:
      "Product strategy, experience design, full-stack engineering, and practical AI for teams with software to ship.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/surviant-logo.jpg",
    shortcut: "/surviant-logo.jpg",
    apple: "/surviant-logo.jpg",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
