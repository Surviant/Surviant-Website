const baseUrl = (process.env.VERIFY_BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "")

async function fetchChecked(path, expectedStatus = 200) {
  const response = await fetch(`${baseUrl}${path}`, { redirect: "follow" })
  if (response.status !== expectedStatus) {
    throw new Error(`${path} returned ${response.status}, expected ${expectedStatus}`)
  }
  return response
}

const sitemapResponse = await fetchChecked("/sitemap.xml")
const sitemapXml = await sitemapResponse.text()
const sitemapPaths = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
  new URL(match[1]).pathname,
)

if (sitemapPaths.length !== 31) {
  throw new Error(`Sitemap contains ${sitemapPaths.length} routes, expected 31`)
}

const practiceRoutes = sitemapPaths.filter(
  (path) => path.startsWith("/services/") && path.split("/").length === 3,
)
const offeringRoutes = sitemapPaths.filter(
  (path) => path.startsWith("/services/") && path.split("/").length === 4,
)
if (practiceRoutes.length !== 3 || offeringRoutes.length !== 21) {
  throw new Error(
    `Sitemap service inventory is ${practiceRoutes.length} practices and ${offeringRoutes.length} offerings`,
  )
}
if (sitemapPaths.includes("/privacy") || sitemapPaths.includes("/terms")) {
  throw new Error("Review-gated legal pages must not appear in the sitemap")
}

const pages = [...new Set([...sitemapPaths, "/privacy", "/terms"])]
const discoveredInternalLinks = new Set()
const discoveredAssets = new Set()
const pageTitles = new Map()
const pageDescriptions = new Map()
const canonicalPaths = new Map()

function tagAttribute(tag, attribute) {
  return tag.match(new RegExp(`\\b${attribute}="([^"]+)"`))?.[1]?.replaceAll("&amp;", "&")
}

function metaContent(html, attribute, value) {
  const tag = [...html.matchAll(/<meta\b[^>]*>/g)]
    .map((match) => match[0])
    .find((candidate) => tagAttribute(candidate, attribute) === value)
  return tag ? tagAttribute(tag, "content") : undefined
}

function registerUnique(collection, value, path, label) {
  const existingPath = collection.get(value)
  if (existingPath) throw new Error(`${path} duplicates ${label} from ${existingPath}`)
  collection.set(value, path)
}

for (const path of pages) {
  const response = await fetchChecked(path)
  const html = await response.text()
  const h1Count = (html.match(/<h1\b/gi) || []).length
  if (h1Count !== 1) throw new Error(`${path} contains ${h1Count} H1 elements`)
  const headingLevels = [...html.matchAll(/<h([1-6])\b/gi)].map((match) => Number(match[1]))
  for (let index = 1; index < headingLevels.length; index += 1) {
    if (headingLevels[index] > headingLevels[index - 1] + 1) {
      throw new Error(`${path} skips from H${headingLevels[index - 1]} to H${headingLevels[index]}`)
    }
  }
  if (html.includes("\u2014")) throw new Error(`${path} contains an em dash`)
  if (/\b(?:TBD|TODO|DRAFT COPY)\b/.test(html)) {
    throw new Error(`${path} contains a draft marker`)
  }
  if (/\b(?:internal note|copy status|voice note|open item)\b/i.test(html)) {
    throw new Error(`${path} contains an internal instruction`)
  }

  const canonicalTag = [...html.matchAll(/<link\b[^>]*>/g)].find((match) =>
    /\brel="canonical"/.test(match[0]),
  )?.[0]
  const canonical = canonicalTag?.match(/\bhref="([^"]+)"/)?.[1]
  if (!canonical || new URL(canonical).pathname !== path) {
    throw new Error(`${path} has an incorrect or missing canonical URL`)
  }
  registerUnique(canonicalPaths, new URL(canonical).pathname, path, "canonical path")

  const title = html.match(/<title>([^<]+)<\/title>/)?.[1]
  const description = metaContent(html, "name", "description")
  if (!title) throw new Error(`${path} has no document title`)
  if (!description) throw new Error(`${path} has no meta description`)
  registerUnique(pageTitles, title, path, "document title")
  registerUnique(pageDescriptions, description, path, "meta description")

  const openGraphTitle = metaContent(html, "property", "og:title")
  const openGraphDescription = metaContent(html, "property", "og:description")
  const openGraphUrl = metaContent(html, "property", "og:url")
  const openGraphImage = metaContent(html, "property", "og:image")
  const twitterTitle = metaContent(html, "name", "twitter:title")
  const twitterDescription = metaContent(html, "name", "twitter:description")
  const twitterImage = metaContent(html, "name", "twitter:image")
  if (!openGraphTitle || !openGraphDescription || !openGraphUrl || !openGraphImage) {
    throw new Error(`${path} has incomplete Open Graph metadata`)
  }
  if (!twitterTitle || !twitterDescription || !twitterImage) {
    throw new Error(`${path} has incomplete Twitter metadata`)
  }
  if (new URL(openGraphUrl).pathname !== path) {
    throw new Error(`${path} has an incorrect Open Graph URL`)
  }

  const socialImageUrl = new URL(openGraphImage)
  if (path.startsWith("/services/") && path.split("/").length >= 3) {
    const [, , practiceSlug, offeringSlug] = path.split("/")
    if (
      socialImageUrl.pathname !== "/api/social-card" ||
      socialImageUrl.searchParams.get("practice") !== practiceSlug ||
      socialImageUrl.searchParams.get("offering") !== (offeringSlug || null)
    ) {
      throw new Error(`${path} has a mismatched registry social image`)
    }
  }

  const structuredDocuments = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => {
      try {
        return JSON.parse(match[1])
      } catch {
        throw new Error(`${path} has malformed JSON-LD`)
      }
    })
  const structuredNodes = structuredDocuments.flatMap((document) => document["@graph"] || [document])
  const structuredTypes = new Set(structuredNodes.map((node) => node?.["@type"]))
  if (!structuredTypes.has("Organization") || !structuredTypes.has("WebSite")) {
    throw new Error(`${path} is missing Organization or WebSite structured data`)
  }
  if (path === "/services") {
    if (!structuredTypes.has("BreadcrumbList") || !structuredTypes.has("ItemList")) {
      throw new Error("/services is missing directory or breadcrumb structured data")
    }
  } else if (path.startsWith("/services/")) {
    if (!structuredTypes.has("BreadcrumbList") || !structuredTypes.has("Service")) {
      throw new Error(`${path} is missing service or breadcrumb structured data`)
    }
    if (!html.includes('aria-label="Breadcrumb"')) {
      throw new Error(`${path} is missing its visible breadcrumb navigation`)
    }
  }

  if (path === "/privacy" || path === "/terms") {
    const robots = metaContent(html, "name", "robots") || ""
    if (!robots.includes("noindex")) {
      throw new Error(`${path} must remain noindex until legal review is recorded`)
    }
  }

  for (const match of html.matchAll(/\bhref="([^"]+)"/g)) {
    const href = match[1].replaceAll("&amp;", "&")
    if (!href.startsWith("/") || href.startsWith("/_next/")) continue
    const url = new URL(href, baseUrl)
    discoveredInternalLinks.add(`${url.pathname}${url.search}`)
  }

  for (const match of html.matchAll(/\bsrc="([^"]+)"/g)) {
    const source = match[1].replaceAll("&amp;", "&")
    if (!source.startsWith("/") || source.startsWith("/_next/static/")) continue
    const url = new URL(source, baseUrl)
    discoveredAssets.add(`${url.pathname}${url.search}`)
  }

  for (const match of html.matchAll(/\bsrcset="([^"]+)"/g)) {
    for (const candidate of match[1].replaceAll("&amp;", "&").split(",")) {
      const source = candidate.trim().split(/\s+/)[0]
      if (!source.startsWith("/") || source.startsWith("/_next/static/")) continue
      const url = new URL(source, baseUrl)
      discoveredAssets.add(`${url.pathname}${url.search}`)
    }
  }

  for (const match of html.matchAll(/<meta\b[^>]*>/g)) {
    if (!/(?:property|name)="(?:og:image|twitter:image)"/.test(match[0])) continue
    const content = match[0].match(/\bcontent="([^"]+)"/)?.[1]?.replaceAll("&amp;", "&")
    if (!content) continue
    const url = new URL(content, baseUrl)
    if (url.pathname === "/og.png" || url.pathname === "/api/social-card") {
      discoveredAssets.add(`${url.pathname}${url.search}`)
    }
  }
}

for (const path of discoveredInternalLinks) {
  await fetchChecked(path)
}

for (const path of discoveredAssets) {
  await fetchChecked(path)
}

await fetchChecked("/services/ai-engineering/web", 404)
await fetchChecked("/services/not-a-practice", 404)
await fetchChecked("/blog", 404)

const healthResponse = await fetchChecked("/api/health")
const health = await healthResponse.json()
if (health.status !== "ok") throw new Error("Health endpoint did not return status ok")

const robotsResponse = await fetchChecked("/robots.txt")
const robotsText = await robotsResponse.text()
if (!robotsText.includes("https://www.surviant.com/sitemap.xml")) {
  throw new Error("robots.txt does not reference the canonical sitemap")
}

console.log(
  `Verified ${pages.length} public pages, ${discoveredInternalLinks.size} internal links, ${discoveredAssets.size} rendered assets, 3 practice routes, 21 offering routes, sitemap, robots, 404 handling, and health.`,
)
