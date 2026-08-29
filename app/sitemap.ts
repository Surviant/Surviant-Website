import type { MetadataRoute } from "next"

import { offerings, practices } from "@/lib/content/services"
import { siteConfig } from "@/lib/content/site"

const coreRoutes = [
  "",
  "/services",
  "/how-we-work",
  "/about",
  "/careers",
  "/contact",
  "/research/ai-ml",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const practiceRoutes = practices.map((practice) => `/services/${practice.slug}`)
  const offeringRoutes = offerings.map(
    (offering) => `/services/${offering.practiceSlug}/${offering.slug}`,
  )

  return [...coreRoutes, ...practiceRoutes, ...offeringRoutes].map((path) => ({
    url: `${siteConfig.canonicalOrigin}${path}`,
    lastModified: new Date("2026-08-28T00:00:00.000Z"),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path === "/services" ? 0.9 : 0.7,
  }))
}
