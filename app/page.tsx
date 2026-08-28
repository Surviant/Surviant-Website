import DevelopmentProcess from "@/components/development-process"
import ServicesScrollSection from "@/components/services-scroll-section"
import SiteFooter from "@/components/site-footer"
import SiteHeader from "@/components/site-header"
import AboutSection from "@/components/sections/about-section"
import { HeroSection } from "@/components/sections/hero-section"
import PortfolioPreviewSection from "@/components/sections/portfolio-preview-section"
import TechnologiesSection from "@/components/sections/technologies-section"

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white text-slate-950">
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
        <ServicesScrollSection />
        <DevelopmentProcess />
        <TechnologiesSection />

        <div id="portfolio" className="scroll-mt-24">
          <PortfolioPreviewSection />
        </div>

        <div id="about" className="scroll-mt-24">
          <AboutSection />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
