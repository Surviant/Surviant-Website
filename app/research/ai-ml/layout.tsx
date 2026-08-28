import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "AI and ML Research",
  description:
    "Explore Surviant Labs' practical map of mature, emerging, and exploratory AI and machine learning methods for product engineering.",
}

export default function AIMLResearchLayout({ children }: { children: ReactNode }) {
  return children
}
