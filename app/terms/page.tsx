import type { Metadata } from "next"

import PageShell from "@/components/page-shell"
import { siteConfig } from "@/lib/content/site"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Terms",
  description: "Terms governing use of the Surviant website and its informational content.",
  path: "/terms",
  robots: { index: false, follow: true },
})

export default function TermsPage() {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">Legal / Terms</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">Website terms</h1>
        <p className="mt-5 text-sm text-[#526078]">Last updated August 28, 2026</p>

        <div className="mt-12 space-y-10 text-base leading-8 text-[#526078]">
          <section>
            <h2 className="text-2xl font-semibold text-[#0A1533]">Using this website</h2>
            <p className="mt-3">You may use this website to learn about Surviant and contact us about potential work. Do not interfere with the site, attempt unauthorized access, submit harmful material, or use the contact system for spam.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-[#0A1533]">Informational content</h2>
            <p className="mt-3">Website content describes Surviant’s services and general engineering perspectives. It is not a commitment to a particular scope, outcome, schedule, price, or technical approach. Project obligations exist only in a separate written agreement.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-[#0A1533]">Intellectual property</h2>
            <p className="mt-3">Surviant owns or licenses the website’s design, text, graphics, and code, except for identified third-party material. You may reference and link to public pages, but you may not republish substantial portions as your own work.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-[#0A1533]">Third-party links</h2>
            <p className="mt-3">The website may link to external services or resources. Those services operate under their own terms and privacy practices, and Surviant is not responsible for their content or availability.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-[#0A1533]">Availability and changes</h2>
            <p className="mt-3">We may update, suspend, or remove website content when needed. We work to keep the site useful and accurate, but we do not promise that every page will always be available or error-free.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-[#0A1533]">Contact</h2>
            <p className="mt-3">Questions about these terms can be sent to <a className="font-semibold text-[#155EEF] underline decoration-[#DCE9FF] underline-offset-4" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.</p>
          </section>
        </div>
      </article>
    </PageShell>
  )
}
