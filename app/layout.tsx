import type React from "react"
import type { Metadata, Viewport } from "next"
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google"
import "./globals.css"
import { siteConfig } from "@/lib/content/site"

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
  metadataBase: new URL(siteConfig.canonicalOrigin),
  title: {
    default: "Surviant | Software, AI, and Systems",
    template: `%s | ${siteConfig.brandName}`,
  },
  description:
    "Surviant modernizes operations, builds dependable software, and adds practical AI through connected engineering teams.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteConfig.canonicalOrigin,
    siteName: siteConfig.brandName,
    title: "Surviant | Software, AI, and Systems",
    description:
      "Modernize the operation, build the software layer, and add intelligence where it earns its place.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Surviant connected systems map",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Surviant | Software, AI, and Systems",
    description:
      "Modernize the operation, build the software layer, and add intelligence where it earns its place.",
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
  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.canonicalOrigin}/#organization`,
        name: siteConfig.brandName,
        legalName: siteConfig.legalEntities[0],
        url: siteConfig.canonicalOrigin,
        email: siteConfig.contactEmail,
        logo: `${siteConfig.canonicalOrigin}/surviant-logo.jpg`,
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.canonicalOrigin}/#website`,
        name: siteConfig.brandName,
        url: siteConfig.canonicalOrigin,
        publisher: { "@id": `${siteConfig.canonicalOrigin}/#organization` },
      },
    ],
  }).replace(/</g, "\\u003c")

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
      </head>
      <body className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
