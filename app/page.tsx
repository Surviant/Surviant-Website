import SiteFooter from "@/components/site-footer"
import SiteHeader from "@/components/site-header"
import ContactCtaSection from "@/components/sections/contact-cta-section"
import { HeroSection } from "@/components/sections/hero-section"
import LeadershipTeaserSection from "@/components/sections/leadership-teaser-section"
import PortfolioPreviewSection from "@/components/sections/portfolio-preview-section"
import PracticesSection from "@/components/sections/practices-section"
import ProcessOverviewSection from "@/components/sections/process-overview-section"
import WhySurviantSection from "@/components/sections/why-surviant-section"

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white text-[#0A1533]">
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <PracticesSection />
        <ProcessOverviewSection />
        <WhySurviantSection />

        <div id="portfolio" className="scroll-mt-24">
          <PortfolioPreviewSection />
        </div>

        <LeadershipTeaserSection />
        <ContactCtaSection />
      </main>
      <SiteFooter />
    </div>
  )
}
