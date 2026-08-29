import Link from "next/link"

import PageShell from "@/components/page-shell"

export default function NotFound() {
  return (
    <PageShell>
      <section className="mx-auto flex min-h-[62vh] max-w-4xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">404 / Page not found</p>
        <h1 className="mt-5 text-balance text-5xl font-semibold leading-[0.96] tracking-[-0.05em] sm:text-6xl">This path does not lead to a published page.</h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-[#526078]">The page may have moved, or the address may be incomplete. Start from the service directory or return home.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/services" className="inline-flex min-h-12 items-center justify-center rounded-[4px] bg-[#155EEF] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0A1533]">Explore services</Link>
          <Link href="/" className="inline-flex min-h-12 items-center justify-center rounded-[4px] border border-[#DCE9FF] px-5 py-3 text-sm font-semibold text-[#0A1533] hover:border-[#155EEF]">Return home</Link>
        </div>
      </section>
    </PageShell>
  )
}
