import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with Surviant about product strategy, experience design, engineering, cloud delivery, or applied AI.",
}

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children
}
