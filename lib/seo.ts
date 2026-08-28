import type { Metadata } from "next"

import { siteConfig } from "@/lib/content/site"

type PageMetadataOptions = {
  title: string
  description: string
  path: string
  type?: "website" | "article"
  robots?: Metadata["robots"]
  socialImage?: {
    url: string
    alt: string
  }
}

export function createPageMetadata({
  title,
  description,
  path,
  type = "website",
  robots,
  socialImage: customSocialImage,
}: PageMetadataOptions): Metadata {
  const socialImage = {
    url: customSocialImage?.url || "/og.png",
    width: 1200,
    height: 630,
    alt: customSocialImage?.alt || "Surviant connected systems map",
  }

  return {
    title,
    description,
    alternates: { canonical: path },
    robots,
    openGraph: {
      type,
      title,
      description,
      url: path,
      siteName: siteConfig.brandName,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage.url],
    },
  }
}
