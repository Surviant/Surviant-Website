import React from 'react';
import { 
  SiReact, SiTypescript, SiNextdotjs, SiOpenai, SiFirebase, SiAmazon, SiMongodb, 
  SiExpress, SiSocketdotio, SiTailwindcss, SiRedux, SiJest, SiCypress, SiNodedotjs, 
  SiVuedotjs, SiDocker, SiKubernetes, SiChartdotjs, SiGraphql, 
  SiRedis, SiElasticsearch, SiNginx, SiJavascript, SiPython, SiTensorflow, 
  SiPytorch, SiFlask, SiStripe, SiGooglecloud, SiFastapi, SiExpo, SiPostgresql, SiPrisma, 
  SiAuth0, SiVercel, SiCloudinary, SiAngular, SiDjango, 
  SiFlutter, SiDart, SiApple, SiNpm, SiYarn, SiWebpack, 
  SiGit, SiGithub, SiJira, SiBitbucket, SiBootstrap, SiSass, SiLess, 
  SiStyledcomponents, SiFramer, SiStorybook, SiSupabase, SiServerless, 
  SiNuxtdotjs, SiSvelte, SiLaravel, SiPhp, SiMysql, SiSqlite, SiGo,
  SiRust, SiSwift, SiKotlin, SiDotnet, SiSpring
} from 'react-icons/si';

import { AiFillApi, AiFillCloud, AiFillDatabase, AiFillCode } from 'react-icons/ai';
import { FaAws, FaMicrosoft, FaGoogle, FaApple } from 'react-icons/fa';

// A mapping of technology names to their corresponding icon components
const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  // Frontend Frameworks & Libraries
  'React': SiReact,
  'ReactJS': SiReact,
  'React.js': SiReact,
  'React Native': SiReact,
  'Vue.js': SiVuedotjs,
  'Vue': SiVuedotjs,
  'Angular': SiAngular,
  'Next.js': SiNextdotjs,
  'Next': SiNextdotjs,
  'Nuxt.js': SiNuxtdotjs,
  'Nuxt': SiNuxtdotjs,
  'Svelte': SiSvelte,
  'SvelteKit': SiSvelte,
  
  // State Management
  'Redux': SiRedux,
  'Redux Toolkit': SiRedux,
  'NgRx': SiAngular,
  'Recoil': SiReact,
  'MobX': SiReact,
  'Pinia': SiVuedotjs,
  'Vuex': SiVuedotjs, // First occurrence
  
  // Mobile Development
  'Flutter': SiFlutter,
  'Dart': SiDart,
  'Expo': SiExpo,
  'Swift': SiSwift,
  'Kotlin': SiKotlin,

  // Languages
  'TypeScript': SiTypescript,
  'JavaScript': SiJavascript,
  'Python': SiPython,
  'PHP': SiPhp,
  'Go': SiGo,
  'Rust': SiRust,
  'C#': SiDotnet,
  
  // Backend Frameworks
  'Node.js': SiNodedotjs,
  'Express': SiExpress,
  'Express.js': SiExpress,
  'Django': SiDjango,
  'Flask': SiFlask,
  'FastAPI': SiFastapi,
  'Laravel': SiLaravel,
  '.NET': SiDotnet,
  'Spring': SiSpring,
  
  // Databases
  'MongoDB': SiMongodb,
  'Mongoose': SiMongodb,
  'PostgreSQL': SiPostgresql,
  'MySQL': SiMysql,
  'SQLite': SiSqlite,
  'Firebase': SiFirebase,
  'Firestore': SiFirebase,
  'Supabase': SiSupabase,
  'Redis': SiRedis,
  'Elasticsearch': SiElasticsearch,
  'TimescaleDB': SiPostgresql,
  'CosmosDB': FaMicrosoft,
  
  // Cloud Services
  'AWS': FaAws,
  'S3': FaAws,
  'Lambda': FaAws,
  'EC2': FaAws,
  'RDS': FaAws,
  'DynamoDB': FaAws,
  'CloudFront': FaAws,
  'SES': FaAws,
  'CloudWatch': FaAws,
  'SageMaker': FaAws,
  'Google Cloud': FaGoogle,
  'App Engine': FaGoogle,
  'BigQuery': FaGoogle,
  'Azure': FaMicrosoft,
  'Azure Functions': FaMicrosoft,
  'Cognitive Services': FaMicrosoft,
  'Azure ML': FaMicrosoft,
  'Vercel': SiVercel,
  'Serverless': SiServerless,
  
  // DevOps & Infrastructure
  'Docker': SiDocker,
  'Kubernetes': SiKubernetes,
  'Nginx': SiNginx,
  'Git': SiGit,
  'GitHub': SiGithub,
  'BitBucket': SiBitbucket,
  'Jira': SiJira,
  
  // API & Communication
  'REST': SiNodedotjs,
  'GraphQL': SiGraphql,
  'Apollo': SiGraphql,
  'Hasura': SiGraphql,
  'Socket.io': SiSocketdotio,
  'WebRTC': SiJavascript,
  'Web Speech API': SiJavascript,
  'WebSocket': SiJavascript,
  'gRPC': SiNodedotjs,
  
  // Payment & Auth
  'Stripe': SiStripe,
  'Stripe API': SiStripe,
  'Stripe Connect': SiStripe,
  'PayPal': SiJavascript,
  'Auth0': SiAuth0,
  'OAuth2': SiNodedotjs,
  'JWT': SiNodedotjs,
  
  // AI & ML
  'OpenAI': SiOpenai,
  'TensorFlow': SiTensorflow,
  'PyTorch': SiPytorch,
  'scikit-learn': SiPython,
  'ML/AI': SiPython,
  'NLP': SiPython,
  'BERT': SiPython,
  'HuggingFace': SiPython,
  'AI/ML': SiPython,
  'CoreML': SiApple,
  'TensorFlow Lite': SiTensorflow,
  'pandas': SiPython,
  'NumPy': SiPython,
  'XGBoost': SiPython,
  
  // Data Visualization
  'Chart.js': SiChartdotjs,
  'Charts.js': SiChartdotjs,
  'D3.js': SiJavascript,
  'Power BI': FaMicrosoft,
  
  // CSS & Styling
  'TailwindCSS': SiTailwindcss,
  'Tailwind': SiTailwindcss,
  'Material-UI': SiReact,
  'Bootstrap': SiBootstrap,
  'Sass': SiSass,
  'Less': SiLess,
  'Styled Components': SiStyledcomponents,
  
  // Testing
  'Jest': SiJest,
  'Cypress': SiCypress,
  
  // Storage & Caching
  'IndexedDB': SiJavascript,
  'LocalStorage': SiJavascript,
  'Cloud Storage': AiFillCloud,
  'Cloudinary': SiCloudinary,
  
  // Other libraries & tools
  'Prisma': SiPrisma,
  'RabbitMQ': SiJavascript,
  'Celery': SiPython,
  'Framer Motion': SiFramer,
  'Storybook': SiStorybook,
  'Draft.js': SiReact,
  'Slate.js': SiReact,
  'PDF.js': SiJavascript,
  'Webpack': SiWebpack,
  'VSCode': SiJavascript,
  'npm': SiNpm,
  'Yarn': SiYarn,
  
  // Device & Platform APIs
  'Wearable APIs': SiJavascript,
  'Apple HealthKit': FaApple,
  'Google Fit API': FaGoogle,
  'Fitbit API': AiFillApi,
  'Garmin API': AiFillApi,
  
  // Generic fallback
  'PWA': SiJavascript,
  'FCM': SiFirebase,
};

// Default size for icons
const DEFAULT_SIZE = 16;

interface TechIconProps {
  tech: string;
  size?: number;
  className?: string;
}

const TechIcon: React.FC<TechIconProps> = ({ tech, size = DEFAULT_SIZE, className = "" }) => {
  // Try to find the exact match first
  let Icon = iconMap[tech];
  
  // If no exact match, try to find a partial match
  if (!Icon) {
    const matchedKey = Object.keys(iconMap).find(
      key => tech.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(tech.toLowerCase())
    );
    if (matchedKey) {
      Icon = iconMap[matchedKey];
    }
  }
  
  // If still no match, return a default icon or null
  if (!Icon) {
    // Return a default icon (e.g., code icon) or null
    return null;
  }
  
  // Use React.createElement to handle custom props properly
  return React.createElement(Icon, { 
    className, 
    style: { fontSize: size } 
  });
};

export default TechIcon;
