import type { ReactNode } from "react"

import SiteFooter from "@/components/site-footer"
import SiteHeader from "@/components/site-header"

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-clip bg-white text-[#0A1533]">
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>{children}</main>
      <SiteFooter />
    </div>
  )
}
