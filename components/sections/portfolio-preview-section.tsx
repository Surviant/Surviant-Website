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

  useEffect(() => {
    startAutoplay()
    return () => stopAutoplay()
  }, [])

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
    <div className="min-h-screen py-20 px-4" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1 px-3 border border-cyan-500/30 rounded-full text-cyan-500 text-xs tracking-wider mb-4">
            RECENT WORK
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Projects That <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">
              Drive Results
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            From startup MVPs to enterprise solutions, see how we've helped businesses transform their digital presence
            and achieve measurable growth.
          </p>
        </motion.div>

        <div 
          className="relative overflow-hidden" 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="carousel-container relative h-[650px] md:h-[600px]">
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
                <div className="flex flex-col md:flex-row h-full">
                  {/* Project information - left side */}
                  <div className="flex-1 p-6 md:w-3/5 flex flex-col">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold">{projects[currentIndex].title}</h3>
                      <p className="text-sm text-gray-400">
                        {projects[currentIndex].industry}
                      </p>
                    </div>

                    <p className="text-gray-400 mb-4">
                      {projects[currentIndex].description}
                    </p>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Technologies</h4>
                      <div className="relative overflow-hidden h-20"> 
                        <motion.div 
                          className="flex gap-3 absolute whitespace-nowrap"
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
                              className="flex flex-col items-center justify-center flex-shrink-0 w-24"
                            >
                              <span className="text-xs px-2 py-1 bg-gray-800 text-gray-200 rounded-full mb-1.5 text-center whitespace-normal">
                                {tech}
                              </span>
                              <div className="h-8 w-8 flex items-center justify-center text-primary">
                                <TechIcon tech={tech} size={22} />
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Key Features</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                        {projects[currentIndex].features.slice(0, projects[currentIndex].features.length >= 8 ? 8 : projects[currentIndex].features.length).map((feature, i) => (
                          <div key={i} className="text-sm text-gray-300 flex items-start">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 mr-2 flex-shrink-0"></span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      {projects[currentIndex].features.length > 8 && (
                        <p className="text-xs text-cyan-500/80 mt-2">+{projects[currentIndex].features.length - 8} more features</p>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Best For</h4>
                      <p className="text-sm text-gray-300">
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
                      <h4 className="text-sm font-medium mb-2">Time to Develop</h4>
                      <div className="flex items-center space-x-2">
                        {/* Get a consistent months value */}
                        {(() => {
                          // Use a consistent seed based on project index
                          const seed = currentIndex * 13 % 17;
                          const months = (seed % 6) + 1; // 1-6 months range
                          
                          return (
                            <>
                              <div className="text-sm text-primary font-medium">
                                {`${months} ${months === 1 ? 'month' : 'months'}`}
                              </div>
                              
                              <div className="flex">
                                {[...Array(6)].map((_, i) => (
                                  <div 
                                    key={i} 
                                    className={`h-1.5 w-3 mx-0.5 rounded-sm ${i < months ? 'bg-primary' : 'bg-gray-600'}`}
                                  />
                                ))}
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                  
                  {/* Project image - right side */}
                  <div className="md:w-2/5 relative overflow-hidden bg-gray-900 md:h-auto h-48">
                    <img
                      src={projects[currentIndex].image || "/placeholder.svg"}
                      alt={projects[currentIndex].title}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent md:bg-gradient-to-l" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation controls */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
              <button 
                onClick={prevSlide} 
                className="bg-primary/80 hover:bg-primary text-white rounded-r-full p-3 transition-colors"
                aria-label="Previous project"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
              <button 
                onClick={nextSlide} 
                className="bg-primary/80 hover:bg-primary text-white rounded-l-full p-3 transition-colors"
                aria-label="Next project"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </div>
            
            {/* Pagination dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-primary' : 'bg-primary/30'}`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 rounded-full px-8"
          >
            View Case Studies
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
