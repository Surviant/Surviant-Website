import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://www.surviant.com"),
  title: {
    default: "Surviant Technologies | Product Strategy, Engineering, and AI",
    template: "%s | Surviant Technologies",
  },
  description:
    "Surviant designs and builds dependable digital products through product strategy, experience design, full-stack engineering, and practical AI.",
  openGraph: {
    type: "website",
    url: "https://www.surviant.com",
    siteName: "Surviant Technologies",
    title: "Surviant Technologies | Product Strategy, Engineering, and AI",
    description:
      "Product strategy, experience design, full-stack engineering, and practical AI for teams building what comes next.",
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
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
