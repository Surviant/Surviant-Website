import type { Metadata } from "next"

import PageShell from "@/components/page-shell"
import { siteConfig } from "@/lib/content/site"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Privacy",
  description: "How Surviant handles information submitted through this website.",
  path: "/privacy",
  robots: { index: false, follow: true },
})

export default function PrivacyPage() {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">Legal / Privacy</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">Privacy policy</h1>
        <p className="mt-5 text-sm text-[#526078]">Last updated August 28, 2026</p>

        <div className="mt-12 space-y-10 text-base leading-8 text-[#526078]">
          <section>
            <h2 className="text-2xl font-semibold text-[#0A1533]">Information you provide</h2>
            <p className="mt-3">When you use the contact form, Surviant receives your name, email address, company, selected service, and the project information you choose to share. You can also contact us directly by email.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-[#0A1533]">How the information is used</h2>
            <p className="mt-3">We use inquiry information to understand your request, respond to you, evaluate whether Surviant can help, and maintain a record of the conversation.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-[#0A1533]">Service providers</h2>
            <p className="mt-3">The website is hosted on Railway. Contact messages are transmitted through Resend when the website form is used. These providers process limited technical or message information as needed to deliver their services.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-[#0A1533]">Technical information</h2>
            <p className="mt-3">The hosting platform may process standard request information such as an IP address, user agent, request time, and error details for security and reliability. The contact endpoint also uses an in-memory IP-based counter for a ten-minute abuse-prevention window. Expired counters are removed during later request processing or when the service restarts. Surviant does not add advertising trackers or behavioral analytics to this website.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-[#0A1533]">Retention and choices</h2>
            <p className="mt-3">We keep inquiry records only as long as they remain useful for the conversation, business records, security, or legal obligations. You may ask us to correct or delete information you submitted, subject to obligations that require us to retain it.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-[#0A1533]">Contact</h2>
            <p className="mt-3">Questions about this policy can be sent to <a className="font-semibold text-[#155EEF] underline decoration-[#DCE9FF] underline-offset-4" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.</p>
          </section>
        </div>
      </article>
    </PageShell>
  )
}
