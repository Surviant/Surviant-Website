import assert from "node:assert/strict"
import { existsSync, readdirSync, readFileSync } from "node:fs"
import { basename, join } from "node:path"
import test from "node:test"

import sitemap from "@/app/sitemap"
import {
  getOffering,
  getOfferingBySlug,
  getOfferingsForPractice,
  offerings,
  practices,
} from "@/lib/content/services"
import { siteConfig } from "@/lib/content/site"

test("the public service inventory is complete and approved", () => {
  assert.equal(practices.length, 3)
  assert.equal(offerings.length, 21)
  assert.deepEqual(
    Object.fromEntries(
      practices.map((practice) => [
        practice.slug,
        getOfferingsForPractice(practice.slug).length,
      ]),
    ),
    {
      "ai-engineering": 9,
      "product-engineering": 6,
      "digital-transformation": 6,
    },
  )
  assert.ok(practices.every((practice) => practice.status === "approved"))
  assert.ok(offerings.every((offering) => offering.status === "approved"))
})

test("slugs, titles, metadata, ownership, and related offerings are valid", () => {
  for (const values of [
    practices.map((practice) => practice.slug),
    practices.map((practice) => practice.title.toLowerCase()),
    practices.map((practice) => practice.seo.title.toLowerCase()),
    practices.map((practice) => practice.seo.description.toLowerCase()),
    offerings.map((offering) => offering.slug),
    offerings.map((offering) => offering.title.toLowerCase()),
    offerings.map((offering) => offering.seo.title.toLowerCase()),
    offerings.map((offering) => offering.seo.description.toLowerCase()),
  ]) {
    assert.equal(new Set(values).size, values.length)
  }

  for (const offering of offerings) {
    assert.equal(getOffering(offering.practiceSlug, offering.slug), offering)
    assert.equal(getOfferingBySlug(offering.slug), offering)
    assert.ok(
      offering.relatedOfferingSlugs.every(
        (slug) => slug !== offering.slug && Boolean(getOfferingBySlug(slug)),
      ),
    )
  }

  assert.equal(getOffering("ai-engineering", "web"), undefined)
  assert.equal(getOffering("unknown", "web"), undefined)
})

test("the sitemap publishes all approved routes and excludes review-gated legal pages", () => {
  const routes = sitemap().map((entry) => new URL(entry.url).pathname)
  assert.equal(routes.length, 31)
  assert.equal(new Set(routes).size, routes.length)
  assert.equal(routes.filter((route) => route.split("/").length === 3 && route.startsWith("/services/")).length, 3)
  assert.equal(routes.filter((route) => route.split("/").length === 4 && route.startsWith("/services/")).length, 21)
  assert.ok(!routes.includes("/privacy"))
  assert.ok(!routes.includes("/terms"))
  assert.ok(!routes.some((route) => route.startsWith("/blog")))
})

test("verified site configuration contains two leaders and no empty optional links", () => {
  assert.equal(siteConfig.canonicalOrigin, "https://www.surviant.com")
  assert.equal(siteConfig.leaders.length, 2)
  assert.ok(siteConfig.leaders.every((leader) => leader.linkedin.startsWith("https://www.linkedin.com/")))
  assert.ok(siteConfig.bookingUrl === null || siteConfig.bookingUrl.startsWith("https://"))
})

test("public source contains no banned copy or unsupported public claims", () => {
  const roots = ["app", "components", "lib/content"]
  const extensions = new Set([".ts", ".tsx", ".js", ".jsx", ".css"])
  const failures: string[] = []

  function visit(path: string) {
    for (const entry of readdirSync(path, { withFileTypes: true })) {
      const fullPath = join(path, entry.name)
      if (entry.isDirectory()) {
        visit(fullPath)
        continue
      }
      if (![...extensions].some((extension) => entry.name.endsWith(extension))) continue
      if (fullPath.endsWith("lib/content/schema.ts")) continue

      const source = readFileSync(fullPath, "utf8")
      const rules = [
        { label: "em dash", pattern: /\u2014/ },
        { label: "draft marker", pattern: /\b(?:TBD|TODO|DRAFT COPY)\b/ },
        { label: "internal instruction", pattern: /\b(?:internal note|copy status|voice note|open item)\b/i },
        { label: "unsupported guarantee", pattern: /\b(?:guaranteed|zero breaches|same-day|certified)\b/i },
        { label: "fixed response promise", pattern: /\bwithin\s+\d+\s+hours?\b/i },
      ]

      for (const rule of rules) {
        if (rule.pattern.test(source)) failures.push(`${fullPath}: ${rule.label}`)
      }
    }
  }

  roots.forEach(visit)
  assert.deepEqual(failures, [])
})

test("every local image reference resolves and every public asset is reachable", () => {
  const sourceRoots = ["app", "components", "lib"]
  const referencedAssets = new Set<string>()

  function visit(path: string) {
    for (const entry of readdirSync(path, { withFileTypes: true })) {
      const fullPath = join(path, entry.name)
      if (entry.isDirectory()) {
        visit(fullPath)
        continue
      }
      if (!/\.(?:ts|tsx|js|jsx|css)$/.test(entry.name)) continue

      const source = readFileSync(fullPath, "utf8")
      for (const match of source.matchAll(/\/(?:[A-Za-z0-9 _.-]+)\.(?:png|jpe?g|webp|svg)/gi)) {
        referencedAssets.add(match[0])
      }
    }
  }

  sourceRoots.forEach(visit)
  for (const asset of referencedAssets) {
    assert.ok(existsSync(join("public", asset.slice(1))), `Missing public asset ${asset}`)
  }

  const publicFiles = readdirSync("public", { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => `/${basename(entry.name)}`)
  assert.deepEqual(publicFiles.filter((asset) => !referencedAssets.has(asset)), [])
})
