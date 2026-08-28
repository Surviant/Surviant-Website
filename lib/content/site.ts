import { z } from "zod"

import { assertPublicCopy } from "./schema"

const leaderSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(3),
  bio: z.string().min(30),
  image: z.string().startsWith("/"),
  linkedin: z.string().url(),
})

const siteConfigSchema = z.object({
  brandName: z.string().min(2),
  legalEntities: z.array(z.string().min(2)).min(1).max(2),
  canonicalOrigin: z.string().url(),
  contactEmail: z.string().email(),
  bookingUrl: z.string().url().nullable(),
  locations: z.array(z.string().min(2)).min(1),
  leaders: z.array(leaderSchema).length(2),
})

export type SiteConfig = z.infer<typeof siteConfigSchema>

export const siteConfig = siteConfigSchema.parse({
  brandName: "Surviant",
  legalEntities: ["Surviant LLC", "Surviant AI Pvt Ltd"],
  canonicalOrigin: process.env.SITE_URL || "https://www.surviant.com",
  contactEmail: "contact@surviant.com",
  bookingUrl: process.env.BOOKING_URL || null,
  locations: ["Bay Area", "India"],
  leaders: [
    {
      name: "Srivant V",
      role: "Founder and CEO / Product lead",
      bio: "Srivant leads product direction and full-stack development, connecting business needs to the interface, system, and release plan.",
      image: "/team-member-1.png",
      linkedin: "https://www.linkedin.com/in/srivantv/",
    },
    {
      name: "Dhyuthi S",
      role: "CTO / Engineering lead",
      bio: "Dhyuthi leads technical architecture and full-stack engineering, with a focus on system structure, performance, and dependable delivery.",
      image: "/team-member-2.webp",
      linkedin: "https://www.linkedin.com/in/dhyuthidhar2404/",
    },
  ],
})

assertPublicCopy(siteConfig, "siteConfig")
