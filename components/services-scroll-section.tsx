"use client";
import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const ContainerScroll = ({ titleComponent, children }: { titleComponent: React.ReactNode; children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    // Find scrollable parent container
    if (containerRef.current) {
      let parent = containerRef.current.parentElement;
      while (parent) {
        const style = window.getComputedStyle(parent);
        if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
          scrollContainerRef.current = parent;
          break;
        }
        parent = parent.parentElement;
      }
    }
    setIsReady(true);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainerRef.current ? { current: scrollContainerRef.current } : undefined,
    offset: ["start end", "end start"]
  });

  const scaleDimensions = () => isMobile ? [0.8, 1] : [0.9, 1];
  const rotate = useTransform(scrollYProgress, [0, 0.5], [25, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  
  return (
    <div className="min-h-screen flex items-center justify-center relative p-4 md:p-10" ref={containerRef}>
      <div className="py-6 md:py-10 w-full relative" style={{ perspective: "1200px" }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale}>{children}</Card>
      </div>
    </div>
  );
};

const Header = ({ translate, titleComponent }: { translate: any; titleComponent: React.ReactNode }) => (
  <motion.div style={{ translateY: translate }} className="max-w-5xl mx-auto text-center mb-8">
    {titleComponent}
  </motion.div>
);

const Card = ({ rotate, scale, children }: { rotate: any; scale: any; children: React.ReactNode }) => (
  <motion.div
    style={{
      rotateX: rotate,
      scale,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 12px 24px -8px rgba(0, 0, 0, 0.25)",
      borderColor: "#1a1a1a",
      backgroundColor: "#1a1a1a"
    }}
    className="max-w-5xl mx-auto h-[32rem] md:h-[40rem] w-full border-[6px] p-2 md:p-4 rounded-[28px]"
  >
    <div className="h-full w-full overflow-hidden rounded-2xl bg-slate-100">{children}</div>
  </motion.div>
);

// Services Data
const services = [
  { title: "Startup Strategy & Consulting", desc: "Market validation, product-market fit assessment, funding roadmaps, and grant research.", isFirst: true },
  { title: "Frontend Development", desc: "Crafting responsive, high-performance interfaces with React, Vue, and Next.js.", isFirst: false },
  { title: "Backend Engineering", desc: "Building robust APIs and server architectures with Node.js, Python, and Go.", isFirst: false },
  { title: "UI/UX Design", desc: "Creating intuitive user experiences with Figma, Adobe XD, and prototyping tools.", isFirst: false },
  { title: "Mobile Development", desc: "Developing cross-platform mobile applications with React Native and Flutter.", isFirst: false },
  { title: "Cloud & DevOps Solutions", desc: "Scalable cloud infrastructure, CI/CD pipelines, and automated deployment systems.", isFirst: false },
  { title: "API Development & Integration", desc: "Custom API development, third-party integrations, and microservices architecture.", isFirst: false },
  { title: "Quality Assurance & Testing", desc: "Comprehensive testing strategies, automated test suites, and performance testing.", isFirst: false },
  { title: "AI Solutions & Development", desc: "Custom AI models, large language model applications, and intelligent automation.", isFirst: false },
  { title: "Data Visualization", desc: "Transforming complex data into intuitive, interactive visual representations.", isFirst: false },
  { title: "Full-Stack Solutions", desc: "End-to-end development from concept to deployment with enterprise-grade architecture.", isFirst: false },
  { title: "Generative AI Applications", desc: "Creating next-gen applications powered by generative AI for content and images.", isFirst: false },
];

// Service Card Component
const ServiceCard = ({ title, desc, isFirst }: { title: string; desc: string; isFirst: boolean }) => (
  <div 
    className="bg-white rounded-2xl p-5 transition-all duration-300 hover:shadow-md cursor-pointer"
  >
    <div className="w-2.5 h-2.5 rounded-full bg-teal-500 mb-4"></div>
    <h3 className="text-gray-800 font-semibold text-base mb-2 leading-tight">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

// Main Export Component
export default function ServicesScrollSection() {
  return (
    <section className="bg-white">
      <ContainerScroll
        titleComponent={
          <>
            <span className="inline-block px-4 py-1.5 bg-cyan-50 border border-cyan-200 rounded-full text-cyan-600 text-xs font-medium tracking-widest mb-4">
              SERVICES
            </span>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight">
              A Full-Stack Team Crafting
              <br />
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                Tomorrow&apos;s Products Today
              </span>
            </h1>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
              Strategy, design, engineering, and AI expertise delivered through transparent partnerships.
            </p>
          </>
        }
      >
        <div className="h-full w-full p-4 md:p-6 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4 md:gap-5">
            {services.map((service, i) => (
              <ServiceCard key={i} title={service.title} desc={service.desc} isFirst={service.isFirst} />
            ))}
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
