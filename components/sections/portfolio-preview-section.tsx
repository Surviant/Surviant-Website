"use client"

import { useRef } from "react"
import { motion, useInView, easeInOut, AnimatePresence } from "framer-motion"
import { ExternalLink, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import TechIcon from "@/components/ui/tech-icon"

export default function PortfolioPreviewSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
  }

  const startAutoplay = () => {
    stopAutoplay()
    intervalRef.current = setInterval(() => {
      nextSlide()
    }, 5000)
  }

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const handleMouseEnter = () => stopAutoplay()
  const handleMouseLeave = () => startAutoplay()

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const projects = [
    {
      title: "AI-Powered Note Taking App",
      industry: "Productivity Tools",
      description: "Revolutionizing note-taking with AI assistance and powerful productivity features",
      technologies: ["React", "TypeScript", "Next.js", "OpenAI", "WebRTC", "IndexedDB", "Firebase", "AWS S3", "MongoDB", "Express.js", "Socket.io", "Web Speech API", "TailwindCSS", "Redux", "Jest", "Cypress"],
      image: "/autonomous-delivery-tracker.png",
      features: [
        "AI formatting into calendars, tables, and checklists",
        "Voice interactions with individual or all notes",
        "Meeting recording with transcription",
        "Document upload and parsing",
        "Drag-and-drop mixed formatting",
        "Local and cloud storage options",
        "AI chat assistants with web access",
        "Calendar app integration",
        "Social media sharing and code snippets",
      ],
    },
    {
      title: "Worcoor Operations Management",
      industry: "Enterprise Solutions",
      description: "Streamlining work across production, inventory, workforce, and tasks with comprehensive dashboard insights",
      technologies: ["Vue.js", "Vuex", "TypeScript", "Node.js", "Express", "MongoDB", "PostgreSQL", "Docker", "Kubernetes", "AWS", "Chart.js", "D3.js", "GraphQL", "Redis", "Elasticsearch", "Nginx", "JWT", "PWA"],
      image: "/neural-analytics-dashboard.png",
      features: [
        "Comprehensive operational dashboard with key insights",
        "Robust admin and user management panels",
        "Production tracking and inventory management",
        "Workforce scheduling and task assignment",
        "Data visualization and analytics",
        "Centralized operational control",
        "Mobile-responsive design",
        "Real-time performance metrics",
      ],
    },
    {
      title: "Foodiy: AI Meal Planning",
      industry: "Nutrition & Lifestyle",
      description: "Budget-friendly AI meal planning app with smart grocery integration and nutrition tracking",
      technologies: ["React Native", "Expo", "Redux", "Python", "Flask", "TensorFlow", "PyTorch", "Firebase", "Cloud Functions", "Firestore", "Stripe API", "Instacart API", "Kroger API", "Nutritionix API", "Google Vision API", "FastAPI"],
      image: "/delivery-tracking-app.png",
      features: [
        "AI-powered meal planning for daily/weekly/monthly periods",
        "Personalized recipes based on dietary preferences",
        "One-click grocery shopping via retail integrations",
        "Pantry tracking with expiry notifications",
        "Budget-friendly grocery selection and cost optimization",
        "Nutrition tracking with fitness goal integration",
        "Built-in referral system for growth",
      ],
    },
    {
      title: "Event Planning Platform",
      industry: "Events & Entertainment",
      description: "Comprehensive event planning solution for all cultures with end-to-end management features",
      technologies: ["Next.js", "React", "Express", "PostgreSQL", "Prisma", "AWS", "S3", "Lambda", "SES", "Stripe", "PayPal", "Google Maps API", "Twilio", "SendGrid", "Auth0", "Redis", "Vercel", "TailwindCSS", "Cloudinary"],
      image: "/social-media-analytics-dashboard.png",
      features: [
        "Multi-cultural event planning templates",
        "Automated shopping lists generation",
        "Budget tracking and expense management",
        "Digital invites with real-time confirmations",
        "Venue booking and comparison",
        "Equipment rental coordination",
        "Food procurement and catering management",
      ],
    },
    {
      title: "EduRoad: Career Guidance",
      industry: "Education & Career",
      description: "AI-driven education and career planning platform with personalized roadmaps",
      technologies: ["Angular", "NgRx", "RxJS", "TypeScript", "Django", "Django REST", "Python", "PostgreSQL", "TensorFlow", "scikit-learn", "NLP", "Azure", "CosmosDB", "Cognitive Services", "Azure ML", "Power BI", "OAuth2", "JWT"],
      image: "/intelligent-real-estate.png",
      features: [
        "AI-driven personality and aptitude testing",
        "Career compatibility scoring and matching",
        "Personalized education roadmap generation",
        "Skill-building hub with micro-certifications",
        "Scholarship and internship marketplace",
        "Financial planning for education",
        "Mentorship and peer network connections",
      ],
    },
    {
      title: "Comprehensive Fitness Platform",
      industry: "Health & Fitness",
      description: "All-in-one fitness solution with energy tracking, nutrition management, and recovery optimization",
      technologies: ["Flutter", "Dart", "Provider", "Bloc", "Node.js", "Express", "Firebase", "Firestore", "Cloud Functions", "Strava API", "Apple HealthKit", "Google Fit API", "Fitbit API", "Garmin API", "TensorFlow Lite", "CoreML", "GraphQL", "SQLite"],
      image: "/fitness-app-workout-tracking.png",
      features: [
        "Dynamic BMR and metabolism tracking",
        "Advanced nutrition and workout management",
        "Recovery and sleep optimization",
        "Mental wellness and mood tracking",
        "Hydration management system",
        "AI-powered progress analysis and recommendations",
        "Community features with gamification",
      ],
    },
    {
      title: "Theatricks",
      industry: "Arts & Entertainment",
      description: "Theater production management platform for planning, casting, and production tracking",
      technologies: ["React", "Redux", "Express", "MongoDB", "Mongoose", "Socket.io", "AWS", "S3", "EC2", "CloudFront", "PDF.js", "Draft.js", "Slate.js", "WebRTC", "Twilio", "Stripe Connect", "TailwindCSS", "Material-UI"],
      image: "/immersive-fitness-app.png",
      features: [
        "Script management and distribution",
        "Cast and crew coordination",
        "Rehearsal scheduling and tracking",
        "Production timeline management",
        "Budget and resource allocation",
        "Ticket sales and promotion tools",
        "Post-production analytics",
      ],
    },
    {
      title: "Finance Optimization Suite",
      industry: "Personal Finance",
      description: "Intelligent financial management platform that identifies savings opportunities and optimizes spending",
      technologies: ["React", "Redux Toolkit", "TypeScript", "Python", "FastAPI", "pandas", "NumPy", "scikit-learn", "XGBoost", "PostgreSQL", "TimescaleDB", "Plaid API", "Stripe API", "Yodlee API", "AWS", "Lambda", "DynamoDB", "SageMaker", "CloudWatch"],
      image: "/mobile-banking-app.png",
      features: [
        "Expenditure analysis and waste identification",
        "Subscription management and optimization",
        "Credit card and service recommendations",
        "Income and investment tracking",
        "Financial goal planning with AI assistance",
        "Tax preparation assistance",
        "Business integration with accounting services",
      ],
    },
    {
      title: "AI Implementation Marketplace",
      industry: "Business Services",
      description: "Platform connecting businesses with AI implementation specialists and solution providers",
      technologies: ["Next.js", "React", "TypeScript", "Apollo", "GraphQL", "PostgreSQL", "Hasura", "Azure", "Cognitive Services", "Azure Functions", "Cosmos DB", "Docker", "Kubernetes", "Stripe Connect", "Algolia", "Auth0", "Segment", "Intercom"],
      image: "/dark-ecommerce-website.png",
      features: [
        "AI-powered vendor matching system",
        "Team qualification verification",
        "Project scope definition tools",
        "Tech stack recommendation engine",
        "Service packages and custom solutions",
        "Vendor ratings and reviews system",
        "Project management and analytics dashboards",
      ],
    },
    {
      title: "Notes & News Platform",
      industry: "Information & Media",
      description: "Personalized news aggregation service with multi-perspective coverage and interactive features",
      technologies: ["React Native", "Redux", "Node.js", "Express", "MongoDB", "Elasticsearch", "HuggingFace", "BERT", "OpenAI", "Redis", "RabbitMQ", "News API", "Google Cloud", "App Engine", "BigQuery", "Firebase", "FCM", "OAuth2"],
      image: "/neuomorphic-ecommerce.png",
      features: [
        "Multi-perspective news summaries",
        "Customizable topic selection",
        "Daily, weekly, and monthly digest options",
        "Voice readout with conversational interaction",
        "Unbiased reporting with source transparency",
        "Local news personalization",
        "Impact assessment for relevance",
      ],
    },
    {
      title: "Real Estate Deep Dive",
      industry: "Real Estate",
      description: "Comprehensive property analysis platform with AI insights and neighborhood intelligence",
      technologies: ["React", "Redux", "TypeScript", "Django", "Django REST", "Celery", "PostgreSQL", "PostGIS", "Redis", "Elasticsearch", "Google Maps API", "Mapbox", "TensorFlow", "AWS", "S3", "EC2", "RDS", "MLS API", "Zillow API"],
      image: "/healthcare-management-interface.png",
      features: [
        "AI-powered property insights and analysis",
        "Proximity and accessibility assessments",
        "Traffic and noise level reporting",
        "Neighborhood amenity mapping",
        "School and safety zone information",
        "Historical price trends and projections",
        "Mortgage solution matching and comparisons",
      ],
    },
    {
      title: "AI Stock Trading Platform",
      industry: "FinTech",
      description: "Rule-based trading platform with AI-assisted strategy development and testing",
      technologies: ["React", "Redux", "TypeScript", "Python", "Django", "Flask", "pandas", "NumPy", "TensorFlow", "PyTorch", "TA-Lib", "PostgreSQL", "TimescaleDB", "RabbitMQ", "Redis", "Alpaca API", "IEX Cloud", "Polygon.io", "AWS", "Docker"],
      image: "/modern-dashboard-analytics-interface.png",
      features: [
        "Rule-based trading strategy builder",
        "Visual programming interface for trade rules",
        "Strategy marketplace and sharing",
        "Multi-asset class support",
        "Performance analytics and reporting",
        "Backtesting and simulation tools",
        "Risk management and portfolio optimization",
      ],
    },
    {
      title: "Health Management Platform",
      industry: "Healthcare",
      description: "Comprehensive health data platform integrating medical records, fitness data, and AI insights",
      technologies: ["React Native", "Redux", "TypeScript", "Node.js", "Express", "GraphQL", "PostgreSQL", "MongoDB", "FHIR API", "HL7", "Apple HealthKit", "Google Fit API", "TensorFlow", "scikit-learn", "Azure", "HIPAA Compliance", "OAuth2", "JWT"],
      image: "/adaptive-learning-system.png",
      features: [
        "Medical record integration and management",
        "Smart device data synchronization",
        "Doctor visit documentation and summaries",
        "Health condition tracking and monitoring",
        "Medication management and reminders",
        "Fitness and nutrition data integration",
        "Personalized health insights and recommendations",
      ],
    },
    {
      title: "AI Travel Planner",
      industry: "Travel & Hospitality",
      description: "End-to-end travel planning platform with AI assistance for itineraries and bookings",
      technologies: ["Vue.js", "Vuex", "Nuxt.js", "Node.js", "Express", "MongoDB", "Mongoose", "Redis", "Amadeus API", "Skyscanner API", "Booking.com API", "Expedia API", "TripAdvisor API", "Google Maps API", "Google Places API", "Stripe", "Google Cloud", "NLP"],
      image: "/delivery-tracking-app.png",
      features: [
        "AI-powered itinerary generation",
        "Flight and hotel booking integration",
        "Attraction ticket and restaurant reservations",
        "Travel document and permit management",
        "Road trip route optimization",
        "Budget tracking and expense management",
        "Local experience recommendations",
      ],
    },
    {
      title: "Car Buying Assistant",
      industry: "Automotive",
      description: "Smart car shopping platform with inventory aggregation and feature-based matching",
      technologies: ["React", "Redux", "Next.js", "Express", "MongoDB", "Mongoose", "Elasticsearch", "Redis", "CarGurus API", "TrueCar API", "Edmunds API", "Kelly Blue Book API", "AutoCheck API", "CarFax API", "Google Maps API", "AWS", "S3", "CloudFront"],
      image: "/car-buying-assistant.png",
      features: [
        "Comprehensive inventory search across dealers",
        "Feature-based filtering and matching",
        "New and used vehicle comparisons",
        "Dealership selection and filtering",
        "Price comparison and negotiation tools",
        "Vehicle history and review integration",
        "Test drive scheduling assistance",
      ],
    },
  ]

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
    }, 5000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [projects.length])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeInOut },
    },
  }

  const carouselVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  }

  return (
    <div className="min-h-[100dvh] min-h-screen py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="inline-block py-1 px-3 border border-blue-500/30 rounded-full text-blue-600 text-xs tracking-wider mb-3 sm:mb-4">
            RECENT WORK
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-2">
            Projects That <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
              Drive Results
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl mx-auto px-2">
            From startup MVPs to enterprise solutions, see how we've helped businesses transform their digital presence
            and achieve measurable growth.
          </p>
        </motion.div>

        <div
          className="relative overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="carousel-container relative h-[550px] sm:h-[580px] md:h-[600px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={carouselVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: easeInOut }}
                className="absolute inset-0 w-full h-full flex flex-col"
              >
                <div className="flex flex-col md:flex-row h-full overflow-hidden rounded-xl border border-slate-200 shadow-lg bg-white">
                  {/* Project information */}
                  <div className="flex-1 p-4 sm:p-5 md:p-6 flex flex-col rounded-xl w-full overflow-y-auto">
                    <div className="mb-2 sm:mb-3 md:mb-4">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold">{projects[currentIndex].title}</h3>
                      <p className="text-xs sm:text-sm text-slate-500">
                        {projects[currentIndex].industry}
                      </p>
                    </div>

                    <p className="text-slate-600 mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">
                      {projects[currentIndex].description}
                    </p>

                    <div className="mb-3 sm:mb-4">
                      <h4 className="text-xs sm:text-sm font-medium mb-2">Technologies</h4>
                      <div className="relative overflow-hidden h-16 sm:h-20">
                        <motion.div
                          className="flex gap-2 sm:gap-3 absolute whitespace-nowrap"
                          animate={{
                            x: [
                              0,
                              -1200 * (Math.ceil(projects[currentIndex].technologies.length / 6) - 1)
                            ],
                          }}
                          transition={{
                            x: {
                              repeat: Infinity,
                              repeatType: "reverse",
                              duration: 25,
                              ease: "linear",
                            },
                          }}
                        >
                          {[...projects[currentIndex].technologies, ...projects[currentIndex].technologies].map((tech, i) => (
                            <div
                              key={i}
                              className="flex flex-col items-center justify-center flex-shrink-0 w-16 sm:w-20 md:w-24"
                            >
                              <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-slate-100 text-slate-700 rounded-full mb-1 sm:mb-1.5 text-center whitespace-normal">
                                {tech}
                              </span>
                              <div className="h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center text-primary">
                                <TechIcon tech={tech} size={18} />
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      </div>
                    </div>

                    <div className="mb-3 sm:mb-4">
                      <h4 className="text-xs sm:text-sm font-medium mb-2">Key Features</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-0.5 sm:gap-y-1">
                        {projects[currentIndex].features.slice(0, projects[currentIndex].features.length >= 6 ? 6 : projects[currentIndex].features.length).map((feature, i) => (
                          <div key={i} className="text-xs sm:text-sm text-slate-700 flex items-start">
                            <span className="inline-block w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-blue-500 mt-1 sm:mt-1.5 mr-1.5 sm:mr-2 flex-shrink-0"></span>
                            <span className="line-clamp-2">{feature}</span>
                          </div>
                        ))}
                      </div>
                      {projects[currentIndex].features.length > 6 && (
                        <p className="text-[10px] sm:text-xs text-blue-600 mt-1 sm:mt-2">+{projects[currentIndex].features.length - 6} more features</p>
                      )}
                    </div>
                    
                    <div className="mb-2 sm:mb-3 md:mb-4 hidden sm:block">
                      <h4 className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">Best For</h4>
                      <p className="text-xs sm:text-sm text-slate-600">
                        {projects[currentIndex].industry === "Health & Fitness" && "Fitness enthusiasts and health-conscious users"}
                        {projects[currentIndex].industry === "Productivity Tools" && "Professionals and students managing complex information"}
                        {projects[currentIndex].industry === "Enterprise Solutions" && "Businesses looking to optimize operations"}
                        {projects[currentIndex].industry === "Nutrition & Lifestyle" && "Health-conscious individuals and families"}
                        {projects[currentIndex].industry === "Events & Entertainment" && "Event planners and social organizers"}
                        {projects[currentIndex].industry === "Education & Career" && "Students and professionals planning their future"}
                        {projects[currentIndex].industry === "Arts & Entertainment" && "Theater groups and production companies"}
                        {projects[currentIndex].industry === "Personal Finance" && "Budget-conscious individuals and families"}
                        {projects[currentIndex].industry === "Business Services" && "Businesses seeking AI integration"}
                        {projects[currentIndex].industry === "Information & Media" && "News enthusiasts and researchers"}
                        {projects[currentIndex].industry === "Real Estate" && "Homebuyers and real estate investors"}
                        {projects[currentIndex].industry === "FinTech" && "Investors and trading enthusiasts"}
                        {projects[currentIndex].industry === "Healthcare" && "Patients and healthcare providers"}
                        {projects[currentIndex].industry === "Travel & Hospitality" && "Travelers and trip planners"}
                        {projects[currentIndex].industry === "Automotive" && "Car shoppers and enthusiasts"}
                      </p>
                    </div>

                    <div className="mt-auto">
                      <h4 className="text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-gray-700">Time to Develop</h4>
                      <div className="flex items-center space-x-2">
                        {/* Get a consistent months value */}
                        {(() => {
                          // Use a consistent seed based on project index
                          const seed = currentIndex * 13 % 17;
                          const months = (seed % 6) + 1; // 1-6 months range

                          return (
                            <>
                              <div className="text-xs sm:text-sm text-gray-800 font-semibold">
                                {`${months} ${months === 1 ? 'month' : 'months'}`}
                              </div>

                              <div className="flex">
                                {[...Array(6)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`h-1 sm:h-1.5 w-2 sm:w-3 mx-0.5 rounded-sm ${i < months ? 'bg-blue-500' : 'bg-slate-300'}`}
                                  />
                                ))}
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* No image section anymore */}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation controls - hidden on mobile */}
            <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 hidden sm:block">
              <button
                onClick={prevSlide}
                className="bg-white/90 backdrop-blur-sm hover:bg-blue-500 text-slate-900 hover:text-white rounded-full p-2 sm:p-3 md:p-3.5 transition-all shadow-lg border border-slate-200 transform hover:scale-105 group min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Previous project"
              >
                <ChevronLeftIcon className="h-4 w-4 sm:h-5 sm:w-5 opacity-80 group-hover:opacity-100" />
              </button>
            </div>

            <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 hidden sm:block">
              <button
                onClick={nextSlide}
                className="bg-white/90 backdrop-blur-sm hover:bg-blue-500 text-slate-900 hover:text-white rounded-full p-2 sm:p-3 md:p-3.5 transition-all shadow-lg border border-slate-200 transform hover:scale-105 group min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Next project"
              >
                <ChevronRightIcon className="h-4 w-4 sm:h-5 sm:w-5 opacity-80 group-hover:opacity-100" />
              </button>
            </div>

            {/* Pagination dots - hidden on mobile */}
            <div className="absolute bottom-3 sm:bottom-6 left-0 right-0 hidden sm:flex justify-center gap-1.5 sm:gap-2 md:gap-3 z-10 flex-wrap max-w-full px-4">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all min-h-[20px] min-w-[20px] flex items-center justify-center ${
                    index === currentIndex
                      ? 'bg-blue-500 scale-110 shadow-md shadow-blue-500/20'
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                >
                  <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-slate-400'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Navigation - Below the card */}
          <div className="flex sm:hidden justify-center items-center gap-4 mt-4">
            <button
              onClick={prevSlide}
              className="bg-white hover:bg-blue-500 text-slate-900 hover:text-white rounded-full p-2 transition-all shadow-md border border-slate-200"
              aria-label="Previous project"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            
            <div className="flex gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-blue-500' : 'bg-slate-300'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="bg-white hover:bg-blue-500 text-slate-900 hover:text-white rounded-full p-2 transition-all shadow-md border border-slate-200"
              aria-label="Next project"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

              </div>
    </div>
  )
}
