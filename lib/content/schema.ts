import { z } from "zod"

export const practiceSlugSchema = z.enum([
  "ai-engineering",
  "product-engineering",
  "digital-transformation",
])

export const deliveryModeSchema = z.enum(["assess", "build", "transform"])
export const approvalStatusSchema = z.literal("approved")

export const capabilitySchema = z.object({
  title: z.string().min(3),
  body: z.string().min(24),
}).strict()

const relationshipGroupSchema = z.object({
  label: z.string().min(3),
  summary: z.string().min(20),
  offeringSlugs: z.array(z.string().min(2)).min(1),
}).strict()

export const seoSchema = z.object({
  title: z.string().min(20).max(70),
  description: z.string().min(70).max(165),
}).strict()

export const practiceContentSchema = z.object({
  slug: practiceSlugSchema,
  title: z.string().min(3),
  shortTitle: z.string().min(2),
  eyebrow: z.string().min(3),
  promise: z.string().min(20),
  summary: z.string().min(40),
  buyerContext: z.string().min(40),
  relationshipTitle: z.string().min(10),
  relationshipBody: z.string().min(40),
  whenUseful: z.array(z.string().min(30)).min(3).max(4),
  relationshipGroups: z.array(relationshipGroupSchema).length(3),
  offeringSlugs: z.array(z.string().min(2)).min(1),
  relatedPracticeSlugs: z.array(practiceSlugSchema).min(1),
  seo: seoSchema,
  status: approvalStatusSchema,
}).strict()

export const offeringContentSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  practiceSlug: practiceSlugSchema,
  title: z.string().min(3),
  shortTitle: z.string().min(2),
  deliveryMode: deliveryModeSchema,
  headline: z.string().min(20),
  lede: z.string().min(50),
  buyerProblem: z.string().min(50),
  capabilities: z.array(capabilitySchema).min(3).max(4),
  deliverables: z.array(z.string().min(8)).min(3).max(5),
  rightFit: z.string().min(40),
  simplerAlternative: z.string().min(40),
  relatedOfferingSlugs: z.array(z.string().min(2)).min(2).max(4),
  proof: z.string().min(30).optional(),
  seo: seoSchema,
  status: approvalStatusSchema,
}).strict()

export type PracticeSlug = z.infer<typeof practiceSlugSchema>
export type DeliveryMode = z.infer<typeof deliveryModeSchema>
export type PracticeContent = z.infer<typeof practiceContentSchema>
export type OfferingContent = z.infer<typeof offeringContentSchema>

export function assertPublicCopy(value: unknown, source: string) {
  const strings: string[] = []

  const visit = (candidate: unknown) => {
    if (typeof candidate === "string") {
      strings.push(candidate)
      return
    }

    if (Array.isArray(candidate)) {
      candidate.forEach(visit)
      return
    }

    if (candidate && typeof candidate === "object") {
      Object.values(candidate).forEach(visit)
    }
  }

  visit(value)

  const prohibitedPatterns = [
    { label: "em dash", pattern: /\u2014/ },
    { label: "draft marker", pattern: /\b(?:TBD|TODO|PLACEHOLDER|DRAFT COPY)\b/i },
    { label: "internal instruction", pattern: /\b(?:internal note|copy status|voice note|open item)\b/i },
  ]

  for (const text of strings) {
    for (const rule of prohibitedPatterns) {
      if (rule.pattern.test(text)) {
        throw new Error(`${source} contains a prohibited ${rule.label}: ${text}`)
      }
    }
  }
}
