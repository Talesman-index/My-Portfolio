import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Calendar,
  Linkedin,
  Github,
  Mail,
  Download,
  X,
  Sparkles,
  ShieldCheck,
  QrCode,
  Layers,
  BarChart3,
  Smartphone,
  Globe,
  Zap,
  Paintbrush,
  Code,
  Cpu,
  Target,
  Shield,
  Award,
  Compass,
  Layout,
  Activity,
  RefreshCw,
  LayoutDashboard
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';
import { caseStudiesData } from './caseStudiesData';

// Register ScrollTrigger client-side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────────────────────────
   ILLUSTRATION SVG COMPONENTS (inline, animated)
   Icon.svg  → 8-point star
   shape.svg → flower/petal bloom
   svgexport-5.svg → organic cross/orb
───────────────────────────────────────────── */
const IlluStar = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 116 116" xmlns="http://www.w3.org/2000/svg" fill="none" className={`illu-svg ${className}`}>
    <path fill="currentColor" d="m58 0 1.865 53.499 39.147-36.511-36.51 39.148L116 58l-53.499 1.865 36.511 39.147-39.147-36.51L58 116l-1.864-53.499-39.148 36.511 36.51-39.147L0 58l53.499-1.864-36.511-39.148 39.148 36.51L58 0Z"/>
  </svg>
);

const IlluShape = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg" fill="none" className={`illu-svg ${className}`}>
    <path fill="currentColor" d="M75 0c2.546 40.32 34.68 72.454 75 75-40.32 2.546-72.454 34.68-75 75-2.546-40.32-34.68-72.454-75-75 40.32-2.546 72.454-34.68 75-75Z"/>
  </svg>
);

const IlluOrb = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg" fill="none" className={`illu-svg ${className}`}>
    <path fill="currentColor" d="M29 58C28.16 30.526 27.474 29.844 0 29 27.474 28.16 28.156 27.474 29 0c.84 27.474 1.526 28.156 29 29-28.474.84-29.156 1.526-29 29Z"/>
  </svg>
);
// Custom Premium 3D Isometric SVG Icons for the Services Cards
const ServiceIcon01 = () => (
  <svg viewBox="0 0 100 100" className="service-svg-illustration" fill="none">
    <defs>
      <linearGradient id="pdGradBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#051b3d" />
        <stop offset="100%" stopColor="#031129" />
      </linearGradient>
      <linearGradient id="pdGradGlass" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(238, 237, 228, 0.3)" />
        <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
      </linearGradient>
      <linearGradient id="pdGradAccent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#eeede4" />
        <stop offset="100%" stopColor="#eeede4" />
      </linearGradient>
      <radialGradient id="pdGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#eeede4" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#eeede4" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Base shadow */}
    <ellipse cx="50" cy="85" rx="32" ry="8" fill="rgba(0,0,0,0.5)" filter="blur(4px)" />
    
    {/* Center radial glow */}
    <circle cx="50" cy="45" r="22" fill="url(#pdGlow)" />
    
    {/* Bottom Layer: Base grid canvas */}
    <path d="M50 72 L88 53 L50 34 L12 53 Z" fill="url(#pdGradBg)" stroke="rgba(238, 237, 228, 0.25)" strokeWidth="1.2" />
    
    {/* Middle Layer: Floating glassmorphic wireframe screen */}
    <path d="M50 54 L88 35 L50 16 L12 35 Z" fill="url(#pdGradGlass)" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1.2" />
    
    {/* Wireframe details on the glass pane */}
    <path d="M30 35 L50 45 L70 35" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" />
    <path d="M35 30 L50 37 L65 30" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" />
    <path d="M50 22 L70 32" stroke="url(#pdGradAccent)" strokeWidth="1.5" fill="none" opacity="0.6" />
    
    {/* Top floating elements */}
    <ellipse cx="50" cy="32" rx="10" ry="5" fill="url(#pdGradAccent)" />
    <circle cx="50" cy="29" r="2.5" fill="#ffffff" opacity="0.75" />
    
    {/* Floating 3D Cursor Arrow */}
    <path d="M60 40 L68 32 L62 48 L59 43 Z" fill="#ffffff" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.4))" />
    <path d="M68 32 L69 33 L63 49 L62 48 Z" fill="rgba(0,0,0,0.25)" />
  </svg>
);

const ServiceIcon02 = () => (
  <svg viewBox="0 0 100 100" className="service-svg-illustration" fill="none">
    <defs>
      <linearGradient id="uxGradTarget" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#031129" />
        <stop offset="100%" stopColor="#051b3d" />
      </linearGradient>
      <linearGradient id="uxGradGlass" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(238, 237, 228, 0.25)" />
        <stop offset="100%" stopColor="rgba(238, 237, 228, 0.08)" />
      </linearGradient>
      <linearGradient id="uxGradMetal" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
        <stop offset="50%" stopColor="#eeede4" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#051b3d" stopOpacity="0.95" />
      </linearGradient>
      <radialGradient id="uxGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#eeede4" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#eeede4" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Base shadow */}
    <ellipse cx="50" cy="85" rx="34" ry="7" fill="rgba(0,0,0,0.5)" filter="blur(4px)" />
    
    {/* Radar/Sonar Target Base Plate */}
    <path d="M50 76 L86 58 L50 40 L14 58 Z" fill="url(#uxGradTarget)" stroke="rgba(238, 237, 228, 0.3)" strokeWidth="1.5" />
    <ellipse cx="50" cy="58" rx="24" ry="12" stroke="rgba(238, 237, 228, 0.18)" strokeWidth="1.2" fill="none" />
    <ellipse cx="50" cy="58" rx="14" ry="7" stroke="rgba(238, 237, 228, 0.3)" strokeWidth="1.2" fill="none" />
    
    {/* Floating 3D Column 1 (Left-back, teal) */}
    <path d="M30 46 L36 43 L42 46 L36 49 Z" fill="#eeede4" />
    <path d="M30 46 L30 62 L36 65 L36 49 Z" fill="#092454" />
    <path d="M36 49 L36 65 L42 62 L42 46 Z" fill="#0d3479" />
    
    {/* Floating 3D Column 2 (Right-front, taller, neon green) */}
    <path d="M46 32 L52 29 L58 32 L52 35 Z" fill="#eeede4" />
    <path d="M46 32 L46 54 L52 57 L52 35 Z" fill="#051b3d" />
    <path d="M52 35 L52 57 L58 54 L58 32 Z" fill="#0d3479" />
    
    {/* Shadow of magnifying glass on base */}
    <ellipse cx="52" cy="54" rx="14" ry="7" fill="rgba(0,0,0,0.4)" filter="blur(3px)" />
    
    {/* 3D Magnifying glass ring */}
    <ellipse cx="43" cy="36" rx="17" ry="12" fill="url(#uxGradGlass)" stroke="url(#uxGradMetal)" strokeWidth="2.5" />
    
    {/* Lens reflection glare */}
    <path d="M29 33 A 17 12 0 0 1 55 28" stroke="#ffffff" strokeWidth="1.2" fill="none" opacity="0.6" />
    
    {/* Magnifying glass handle */}
    <path d="M55 45 L74 63 L71 66 L52 48 Z" fill="url(#uxGradMetal)" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.3))" />
    <circle cx="72.5" cy="64.5" r="2" fill="#eeede4" />
  </svg>
);

const ServiceIcon03 = () => (
  <svg viewBox="0 0 100 100" className="service-svg-illustration" fill="none">
    <defs>
      <linearGradient id="stGradTop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#eeede4" />
        <stop offset="100%" stopColor="#eeede4" />
      </linearGradient>
      <linearGradient id="stGradLeft" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#051b3d" />
        <stop offset="100%" stopColor="#031129" />
      </linearGradient>
      <linearGradient id="stGradRight" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#092454" />
        <stop offset="100%" stopColor="#051b3d" />
      </linearGradient>
    </defs>
    
    {/* Base shadow */}
    <ellipse cx="50" cy="88" rx="34" ry="7" fill="rgba(0,0,0,0.6)" filter="blur(5px)" />
    
    {/* Cube 1 (Left base block) */}
    <path d="M26 56 L40 49 L54 56 L40 63 Z" fill="url(#stGradTop)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
    <path d="M26 56 L26 74 L40 81 L40 63 Z" fill="url(#stGradLeft)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
    <path d="M40 63 L40 81 L54 74 L54 56 Z" fill="url(#stGradRight)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
    
    {/* Cube 2 (Right base block) */}
    <path d="M50 64 L64 57 L78 64 L64 71 Z" fill="url(#stGradTop)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
    <path d="M50 64 L50 82 L64 89 L64 71 Z" fill="url(#stGradLeft)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
    <path d="M64 71 L64 89 L78 82 L78 64 Z" fill="url(#stGradRight)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
    
    {/* Cube 3 (Center top growth block) */}
    <path d="M38 38 L52 31 L66 38 L52 45 Z" fill="url(#stGradTop)" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />
    <path d="M38 38 L38 56 L52 63 L52 45 Z" fill="url(#stGradLeft)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
    <path d="M52 45 L52 63 L66 56 L66 38 Z" fill="url(#stGradRight)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
    
    {/* Connectors & Nodes representing strategy/roadmap logic overlay */}
    <line x1="52" y1="31" x2="64" y2="57" stroke="#eeede4" strokeWidth="1.5" strokeDasharray="3 2" />
    <line x1="52" y1="31" x2="40" y2="49" stroke="#eeede4" strokeWidth="1.5" strokeDasharray="3 2" />
    
    {/* Glowing Nodes */}
    <circle cx="52" cy="31" r="3.5" fill="#ffffff" filter="drop-shadow(0 0 3px #eeede4)" />
    <circle cx="64" cy="57" r="3" fill="#eeede4" />
    <circle cx="40" cy="49" r="3" fill="#eeede4" />
  </svg>
);

const ServiceIcon04 = () => (
  <svg viewBox="0 0 100 100" className="service-svg-illustration" fill="none">
    <defs>
      <linearGradient id="devGradBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#031129" />
        <stop offset="100%" stopColor="#051b3d" />
      </linearGradient>
      <linearGradient id="devGradAccent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#eeede4" />
        <stop offset="100%" stopColor="#eeede4" />
      </linearGradient>
      <radialGradient id="devGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#eeede4" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#eeede4" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Base shadow */}
    <ellipse cx="50" cy="85" rx="30" ry="7" fill="rgba(0,0,0,0.5)" filter="blur(4px)" />
    
    {/* 3D Isometric Terminal Window back extrusion (adds depth) */}
    <path d="M19 45 L59 23 L60 25 L20 47 Z" fill="rgba(255,255,255,0.15)" />
    <path d="M59 23 L60 25 L60 59 L59 57 Z" fill="rgba(0,0,0,0.3)" />
    
    {/* Window front face */}
    <path d="M20 45 L59 23 L59 57 L20 79 Z" fill="url(#devGradBg)" stroke="rgba(238, 237, 228, 0.35)" strokeWidth="1.2" />
    
    {/* Terminal buttons (Red, Yellow, Green in perspective) */}
    <circle cx="27" cy="41.5" r="1.5" fill="#ff5f56" />
    <circle cx="32" cy="38.7" r="1.5" fill="#ffbd2e" />
    <circle cx="37" cy="36" r="1.5" fill="#27c93f" />
    
    {/* Syntax code bars */}
    <line x1="27" y1="50" x2="44" y2="40.5" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" />
    <line x1="27" y1="56" x2="48" y2="44" stroke="#eeede4" strokeWidth="2" strokeLinecap="round" />
    <line x1="33" y1="60" x2="45" y2="53" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" />
    <line x1="27" y1="66" x2="40" y2="58.5" stroke="url(#devGradAccent)" strokeWidth="2" strokeLinecap="round" />
    
    {/* Glowing background behind brackets */}
    <circle cx="50" cy="45" r="12" fill="url(#devGlow)" />
    
    {/* Floating 3D Code Brackets and slash */}
    <path d="M48 41 L40 50 L48 59" stroke="url(#devGradAccent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))" />
    <path d="M60 34 L52 43 L60 52" stroke="url(#devGradAccent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))" />
    <line x1="56" y1="36" x2="44" y2="57" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))" />
  </svg>
);

// Custom Premium 3D Isometric SVG Illustrations for the Bento Grid cards
const BentoIconBio = () => (
  <svg viewBox="0 0 120 120" className="bento-svg-illustration" fill="none">
    <defs>
      <linearGradient id="bioBaseGlass" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(13, 52, 121, 0.05)" />
        <stop offset="100%" stopColor="rgba(13, 52, 121, 0.01)" />
      </linearGradient>
      <linearGradient id="bioFloatGlass" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(13, 52, 121, 0.1)" />
        <stop offset="100%" stopColor="rgba(13, 52, 121, 0.02)" />
      </linearGradient>
      <radialGradient id="bioGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0d3479" stopOpacity="0.06" />
        <stop offset="100%" stopColor="#0d3479" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Soft background glow */}
    <circle cx="60" cy="55" r="45" fill="url(#bioGlow)" />
    <ellipse cx="60" cy="98" rx="40" ry="8" fill="rgba(13, 52, 121, 0.06)" filter="blur(3px)" />
    
    {/* Isometric base plate (lower screen/dashboard) */}
    <path d="M60 88 L104 68 L60 48 L16 68 Z" fill="url(#bioBaseGlass)" stroke="rgba(13, 52, 121, 0.15)" strokeWidth="1" />
    <path d="M40 76 L84 56" stroke="rgba(13, 52, 121, 0.08)" strokeWidth="1" />
    <path d="M30 71 L74 51" stroke="rgba(13, 52, 121, 0.08)" strokeWidth="1" />
    
    {/* Isometric floating glass window */}
    <path d="M60 68 L96 52 L60 36 L24 52 Z" fill="url(#bioFloatGlass)" stroke="rgba(13, 52, 121, 0.35)" strokeWidth="1.2" />
    
    {/* Floating elements inside window */}
    <path d="M40 52 L52 46" stroke="#0d3479" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M40 58 L72 44" stroke="rgba(13, 52, 121, 0.3)" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="84" cy="46" r="2.5" fill="#0d3479" />
    
    {/* UI controls in the corner */}
    <circle cx="34" cy="48" r="1.2" fill="rgba(13, 52, 121, 0.4)" />
    <circle cx="38" cy="45.5" r="1.2" fill="rgba(13, 52, 121, 0.4)" />
    <circle cx="42" cy="43" r="1.2" fill="rgba(13, 52, 121, 0.4)" />
    
    {/* 3D Floating Arrow cursor */}
    <path d="M72 56 L82 48 L76 66 L72 59 Z" fill="#0d3479" />
  </svg>
);

const BentoIconApproach = () => (
  <svg viewBox="0 0 120 120" className="bento-svg-illustration" fill="none">
    <defs>
      <linearGradient id="appBaseGlass" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(13, 52, 121, 0.05)" />
        <stop offset="100%" stopColor="rgba(13, 52, 121, 0.01)" />
      </linearGradient>
      <radialGradient id="appGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0d3479" stopOpacity="0.06" />
        <stop offset="100%" stopColor="#0d3479" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Soft background glow */}
    <circle cx="60" cy="55" r="45" fill="url(#appGlow)" />
    <ellipse cx="60" cy="98" rx="40" ry="8" fill="rgba(13, 52, 121, 0.06)" filter="blur(3px)" />
    
    {/* Isometric base target plate */}
    <path d="M60 88 L100 68 L60 48 L20 68 Z" fill="url(#appBaseGlass)" stroke="rgba(13, 52, 121, 0.18)" strokeWidth="1" />
    <ellipse cx="60" cy="68" rx="28" ry="13" stroke="rgba(13, 52, 121, 0.12)" strokeWidth="1" fill="none" />
    <ellipse cx="60" cy="68" rx="16" ry="7.5" stroke="rgba(13, 52, 121, 0.25)" strokeWidth="1.2" fill="none" />
    
    {/* Isometric connecting layout lines */}
    <line x1="42" y1="58" x2="60" y2="42" stroke="#0d3479" strokeWidth="1.2" strokeDasharray="3 2" />
    <line x1="60" y1="42" x2="78" y2="58" stroke="#0d3479" strokeWidth="1.2" strokeDasharray="3 2" />
    <line x1="42" y1="58" x2="78" y2="58" stroke="rgba(13, 52, 121, 0.2)" strokeWidth="1" />
    
    {/* Floating isometric node points */}
    <circle cx="42" cy="58" r="4" fill="#0d3479" />
    <circle cx="78" cy="58" r="4" fill="#0d3479" />
    <circle cx="60" cy="42" r="5.5" fill="#0d3479" />
  </svg>
);



const getFeatureIcon = (projectId: string, index: number) => {
  if (projectId === 'asset-iq') {
    const icons = [QrCode, Calendar, Layers, BarChart3];
    return icons[index] || Sparkles;
  }
  if (projectId === 'ehadj') {
    const icons = [ShieldCheck, RefreshCw, LayoutDashboard];
    return icons[index] || Sparkles;
  }
  if (projectId === 'sagana') {
    const icons = [Smartphone, Globe, Zap];
    return icons[index] || Sparkles;
  }
  if (projectId === 'vortex') {
    const icons = [Paintbrush, Code, Cpu];
    return icons[index] || Sparkles;
  }
  if (projectId === 'sport-advisor') {
    const icons = [Target, Shield, Award];
    return icons[index] || Sparkles;
  }
  if (projectId === 'beans') {
    const icons = [Award, Zap, Activity, Layers];
    return icons[index] || Sparkles;
  }
  if (projectId === 'truvox') {
    const icons = [Globe, Compass, Code, Layout];
    return icons[index] || Sparkles;
  }
  if (projectId === 'dolce-riviera') {
    const icons = [Layers, Paintbrush, Smartphone, Sparkles];
    return icons[index] || Sparkles;
  }
  const defaultIcons = [Sparkles, Shield, Zap, Activity];
  return defaultIcons[index % defaultIcons.length] || Sparkles;
};

const serviceIcons = [ServiceIcon01, ServiceIcon02, ServiceIcon03, ServiceIcon04];

const serviceButtonLabels: Record<'en' | 'fr', string[]> = {
  en: [
    "Let's design your product",
    "Optimize your experience",
    "Define your strategy",
    "Build your website"
  ],
  fr: [
    "Concevons votre produit",
    "Optimisez votre expérience",
    "Définissez votre stratégie",
    "Développez votre site"
  ]
};

const vortexScreens = [
  { src: '/imgs/Vortex_gallery/Welcome.png', alt: 'Welcome Screen', title: 'Welcome Screen' },
  { src: '/imgs/Vortex_gallery/Login - Mobile Phone.png', alt: 'Login', title: 'Login & Verification' },
  { src: '/imgs/Vortex_gallery/Welcome Screen-2.png', alt: 'OTP verification', title: 'OTP Verification' },
  { src: '/imgs/Vortex_gallery/Screen 5.png', alt: 'Profile Details', title: 'Onboarding - Profile' },
  { src: '/imgs/Vortex_gallery/Screen - 5.png', alt: 'Skills Selection', title: 'Onboarding - Skills' },
  { src: '/imgs/Vortex_gallery/Screen - 6.png', alt: 'Sign Up', title: 'Onboarding - Sign Up' },
  { src: '/imgs/Vortex_gallery/Home.png', alt: 'Home Dashboard', title: 'Main Dashboard' },
  { src: '/imgs/Vortex_gallery/Home-1.png', alt: 'Wallet Details', title: 'Wallet & Profile' },
  { src: '/imgs/Vortex_gallery/Scan.jpg', alt: 'Scan QR Code', title: 'QR Scan Payment' },
  { src: '/imgs/Vortex_gallery/Frame 1410103881.png', alt: 'Profile View', title: 'Profile Summary' },
  { src: '/imgs/Vortex_gallery/Frame 1410103882.png', alt: 'Edit Profile', title: 'Profile Management' }
];


const getContrastBadgeColor = (color: string) => {
  const c = color.toLowerCase();
  if (c === '#ffd700' || c === '#ffd800' || c === '#ffe600' || c === 'yellow') {
    return '#876600'; // Darker gold/ochre for high contrast readability
  }
  if (c === '#00e5ff') {
    return '#007b8f'; // Darker cyan
  }
  if (c === '#00fa9a') {
    return '#00804b'; // Darker spring green for Sport Advisor badge
  }
  if (c === '#10b981') {
    return '#047857'; // Darker emerald green
  }
  return color;
};

const CaseStudy = ({ 
  id, 
  mousePos, 
  setCurrentView,
  onBack,
  lang
}: { 
  id: 'asset-iq' | 'ehadj' | 'beans' | 'sagana' | 'vortex' | 'sport-advisor' | 'truvox' | 'tavares' | 'the-refuge' | 'strategy-arena' | 'dolce-riviera', 
  mousePos: { x: number, y: number }, 
  setCurrentView: any,
  onBack?: () => void,
  lang: 'en' | 'fr'
}) => {
  const data = caseStudiesData[lang][id];
  const isConcise = id === 'tavares' || id === 'the-refuge' || id === 'strategy-arena';

  return (
    <div className="cs-view-new" style={{ 
      '--mouse-x': `${mousePos.x}%`, 
      '--mouse-y': `${mousePos.y}%` 
    } as any}>
      <div className="cs-gradient-overlay" style={{ '--glow-color': data.color } as any}></div>

      <header className="cs-hero-new">
        <div className="cs-hero-bg" style={{ backgroundImage: `url(${data.bgImage})` }} />
        <div className="container">
          <button onClick={onBack || (() => setCurrentView('home'))} className="cs-back-btn">
            <ArrowLeft size={18} style={{ marginRight: '8px' }} />
            <span>{lang === 'fr' ? 'Retour au Portfolio' : 'Back to Portfolio'}</span>
          </button>
          <div className="cs-hero-content">
            <span className="cs-hero-tag">{data.label}</span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {data.title}
            </motion.h1>
            {!isConcise && data.externalLink && data.externalLink !== '#' && (
              <motion.a 
                href={data.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="cs-external-cta"
                style={{ '--accent-color': data.color } as any}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <span>{data.ctaLabel || (lang === 'fr' ? 'VISITER LE SITE' : 'VISIT SITE')}</span>
                <ArrowRight size={16} />
              </motion.a>
            )}
          </div>
        </div>
      </header>

      <section className="cs-body-new">
        <div className="container">
          <div className="cs-layout-new">
            {isConcise ? (
              <div className="cs-main-content">
                {/* Section 01: Context & Challenge Combined */}
                <motion.div 
                  className="cs-section-new"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <h2>{data.contextTitle || (lang === 'fr' ? "Le Projet & Le Défi." : "Overview & Challenge.")}</h2>
                  <p>{data.context}</p>
                  <p style={{ marginTop: '16px' }}>{data.challenge}</p>
                </motion.div>

                {/* Main Showcase Image */}
                {data.dashboardImg && (
                  <motion.div 
                    className="cs-section-new"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <div className="cs-dashboard-frame-new" style={{ marginTop: '12px' }}>
                      <div className="mockup-frame-new">
                        <div className="mockup-header-new">
                          <span className="mockup-dot" />
                          <span className="mockup-dot" />
                          <span className="mockup-dot" />
                        </div>
                        <div className="mockup-screen-new" style={{ height: '480px' }}>
                          <img src={data.dashboardImg} alt={`${data.title} - ${data.label} Dashboard Showcase`} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Section 02: Solution UX/UI */}
                {data.solution && (
                  <motion.div 
                    className="cs-section-new"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <h2>{data.solutionTitle || (lang === 'fr' ? "La réponse apportée." : "The solution.")}</h2>
                    <p>{data.solution}</p>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="cs-main-content">
                <motion.div 
                  className="cs-section-new"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <h2>{data.contextTitle || (lang === 'fr' ? "La fragmentation des données opérationnelles." : "Fragmentation of operational data.")}</h2>
                  <p>{data.context}</p>
                  {data.contextImg && (
                    <div className="cs-inline-mockup">
                      <img src={data.contextImg} alt={`${data.title} - ${lang === 'fr' ? 'Contexte & Présentation' : 'Project Context'}`} />
                    </div>
                  )}
                </motion.div>

                {data.problem && (
                  <motion.div 
                    className="cs-section-new"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <h2>{data.problemTitle || (lang === 'fr' ? "Processus manuels et erreurs critiques." : "Manual processes and critical errors.")}</h2>
                    <p>{data.problem}</p>
                  </motion.div>
                )}

                <motion.div 
                  className="cs-section-new highlighted-section"
                  style={{ borderLeftColor: data.color }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2>{data.challengeTitle || (lang === 'fr' ? "Sécuriser le parcours de 2300 utilisateurs." : "Securing the onboarding of 2,300 users.")}</h2>
                  <p>{data.challenge}</p>
                  {data.challengeImg && (
                    <div className="cs-inline-mockup">
                      <img src={data.challengeImg} alt={`${data.title} - ${lang === 'fr' ? 'Défi Produit & UX' : 'Product & UX Challenge'}`} />
                    </div>
                  )}
                </motion.div>

                {data.decisions && (
                  <div className="cs-section-new">
                    <div className="cs-decisions-grid-new">
                      {data.decisions.map((d: any, i: number) => (
                        <div key={i} className="cs-decision-card-new">
                          <h3>{d.title}</h3>
                          <p>{d.desc}</p>
                          <div className="cs-why-box-new">
                            <span className="cs-why-badge-new" style={{ 
                              backgroundColor: `${data.color}15`, 
                              color: getContrastBadgeColor(data.color),
                              borderColor: `${getContrastBadgeColor(data.color)}30`
                            }}>
                              {lang === 'fr' ? 'POURQUOI' : 'WHY'}
                            </span>
                            <p className="cs-why-text-new">{d.why}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {data.solution && (
                  <div className="cs-section-new">
                    <h2>{data.solutionTitle || (lang === 'fr' ? "Intégrité par le design et validation stricte." : "Design integrity and strict validation.")}</h2>
                    <p>{data.solution}</p>
                    {data.uxSolutions && <div className="cs-pull-quote">{data.uxSolutions}</div>}
                    {data.dashboardImg && (
                      <div className="cs-dashboard-frame-new">
                        <div className="mockup-frame-new">
                          <div className="mockup-header-new">
                            <span className="mockup-dot" />
                            <span className="mockup-dot" />
                            <span className="mockup-dot" />
                          </div>
                          <div className="mockup-screen-new">
                            <img src={data.dashboardImg} alt={`${data.title} - ${lang === 'fr' ? 'Dashboard & Solution UX' : 'Dashboard & UX Solution'}`} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {data.interfaceImg && (
                  <div className="cs-section-new">
                    <h2>{lang === 'fr' ? "L'application de pilotage centralisée." : "The centralized orchestration dashboard."}</h2>
                    <div className="cs-dashboard-frame-new">
                      <div className="mockup-frame-new">
                        <div className="mockup-header-new">
                          <span className="mockup-dot" />
                          <span className="mockup-dot" />
                          <span className="mockup-dot" />
                        </div>
                        <div className="mockup-screen-new">
                          <img src={data.interfaceImg} alt={`${data.title} - ${lang === 'fr' ? 'Interface Principale' : 'Main Interface Overview'}`} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="cs-features-grid-new">
                  {data.features.map((f, i) => (
                    <div key={i} className="cs-feature-box-new">
                      <div className="feature-icon-wrapper-new">
                        {(() => {
                          const IconComponent = getFeatureIcon(id, i);
                          return <IconComponent size={20} className="feature-icon-new" />;
                        })()}
                      </div>
                      <h3>{f.title}</h3>
                      <p>{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <aside className="cs-sidebar-new">
              <div className="cs-sidebar-sticky">
                {data.insight && (
                  <div className="cs-sidebar-block">
                    <label>{lang === 'fr' ? 'INSIGHT PRODUIT' : 'PRODUCT INSIGHT'}</label>
                    <p>{data.insight}</p>
                  </div>
                )}
                
                {data.impact && data.impact.length > 0 && (
                  <div className="cs-sidebar-block">
                    <label>{lang === 'fr' ? 'IMPACT CLÉ' : 'KEY IMPACT'}</label>
                    <ul className="cs-impact-list">
                      {data.impact.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {isConcise && data.externalLink && data.externalLink !== '#' && (
                  <div className="cs-sidebar-block">
                    <label>{lang === 'fr' ? 'LIEN DU PROJET' : 'PROJECT LINK'}</label>
                    <a 
                      href={data.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cs-external-cta"
                      style={{ '--accent-color': data.color, width: '100%', justifyContent: 'center' } as any}
                    >
                      <span>{data.ctaLabel || (lang === 'fr' ? 'VISITER LE SITE' : 'VISIT SITE')}</span>
                      <ArrowRight size={16} />
                    </a>
                  </div>
                )}

                <button onClick={onBack || (() => setCurrentView('home'))} className="cs-final-back-btn">
                  {lang === 'fr' ? 'RETOUR AU PORTFOLIO' : 'BACK TO PORTFOLIO'}
                </button>
              </div>
            </aside>
          </div>

          {id === 'vortex' && (
            <div className="cs-gallery-section-new">
              <h2 className="cs-section-title-center-new" style={{ display: 'block', margin: '0 auto clamp(24px, 4vw, 48px) auto', textAlign: 'center', maxWidth: '1200px', padding: '0 24px' }}>
                {lang === 'fr' ? 'Galerie des écrans' : 'Screen Gallery'}
              </h2>
              
              <div className="cs-gallery-ticker-wrapper">
                <div className="cs-gallery-ticker">
                  <span>{Array(12).fill(lang === 'fr' ? 'Galerie •' : 'Gallery •').join('  ')}</span>
                  <span>{Array(12).fill(lang === 'fr' ? 'Galerie •' : 'Gallery •').join('  ')}</span>
                </div>
              </div>

              <div className="cs-gallery-grid-new">
                <div className="cs-gallery-track">
                  {vortexScreens.map((screen, idx) => (
                    <div key={idx} className="cs-gallery-card-new">
                      <div className="cs-gallery-img-wrapper">
                        <img src={screen.src} alt={screen.alt} loading="lazy" />
                      </div>
                      <span className="cs-gallery-card-title">{screen.title}</span>
                    </div>
                  ))}
                  {/* Duplicate for infinite loop */}
                  {vortexScreens.map((screen, idx) => (
                    <div key={`dup-${idx}`} className="cs-gallery-card-new">
                      <div className="cs-gallery-img-wrapper">
                        <img src={screen.src} alt={screen.alt} loading="lazy" />
                      </div>
                      <span className="cs-gallery-card-title">{screen.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <footer className="cs-footer-new">
        <div className="container">
          <div className="cs-footer-content">
            <h2>{data.conclusion}</h2>
            <p>© 2026 sacca dafia. all rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const CVView = ({ setCurrentView }: { setCurrentView: any }) => {
    return (
      <div className="cv-view-new anim-fade-in">
        <nav className="cv-nav-new no-print">
          <div className="container cv-nav-flex">
            <button onClick={() => setCurrentView('home')} className="cv-back-btn">
              <ArrowRight size={18} style={{ transform: 'rotate(180deg)' }} />
              <span>RETOUR</span>
            </button>
            <div className="cv-nav-actions">
              <motion.a 
                href="https://drive.google.com/file/d/14q3ARxXM3rk82VKS6dKYmyGJCk9UWruu/view?usp=sharing" 
                target="_blank"
                rel="noopener noreferrer"
                className="cv-download-pill"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={14} /> <span>PDF</span>
              </motion.a>
            </div>
          </div>
        </nav>

        <div className="container cv-main-container">
          {/* Print Layout - Hidden on Web */}
          <div className="cv-print-only no-web">
            <div className="print-header">
              <h1>SACCA DAFIA</h1>
              <p>PRODUCT DESIGNER / WEB DESIGNER</p>
            </div>
            <div className="print-contact">
              <span>Cotonou, Bénin</span> • <span>+229 01 60 35 90 22</span> • <span>dafiashalom@gmail.com</span>
            </div>
            {/* Simple content for print */}
          </div>

          {/* Web Editorial Narrative */}
          <div className="cv-narrative-flow no-print">
            <header className="cv-hero-editorial">
              <motion.div 
                className="cv-hero-meta"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                PRODUCT DESIGNER / 2026
              </motion.div>
              <motion.h1 
                className="cv-massive-name"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                SACCA DAFIA.
              </motion.h1>
              <motion.div 
                className="cv-hero-bio"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p>Ambition créative. Rigueur produit. Je transforme les problématiques complexes en solutions digitales fluides, alliant vision stratégique et excellence visuelle.</p>
              </motion.div>
            </header>

            <section className="cv-experience-narrative">
              <div className="cv-section-label-new">01 / EXPÉRIENCES</div>
              
              <div className="cv-experience-grid">
                {[
                  {
                    company: "CACTUCE",
                    role: "Product Designer",
                    date: "OCT. 25 — PRÉSENT",
                    desc: "Orchestration des parcours utilisateurs pour des produits SaaS complexes tels que eHadj et Asset IQ.",
                    points: [
                      "Optimisation UX/UI et identification des frictions.",
                      "Définition de la logique produit et parcours critiques.",
                      "Supervision QA et accompagnement technique."
                    ],
                    active: true
                  },
                  {
                    company: "TRELLIX",
                    role: "Product Designer Lead",
                    date: "FÉV. 24 — SEP. 25",
                    desc: "Pilotage du programme de fidélité Beans. Coordination entre design, technique et produit.",
                    points: [
                      "Rédaction de PRDs et spécifications fonctionnelles.",
                      "Conception de systèmes de fidélisation innovants.",
                      "Leadership de projet et coordination d’équipe."
                    ]
                  },
                  {
                    company: "CREAFIX",
                    role: "Web Designer",
                    date: "AOÛT 22 — FÉV. 24",
                    desc: "Focus sur l’identité visuelle et la hiérarchie de l’information pour des interfaces orientées conversion."
                  }
                ].map((exp, i) => (
                  <motion.div 
                    key={exp.company}
                    className={`cv-exp-block ${exp.active ? 'active' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="exp-header">
                      <h3>{exp.company}</h3>
                      <span className="exp-date">{exp.date}</span>
                    </div>
                    <div className="exp-content">
                      <div className="exp-role">{exp.role}</div>
                      <p>{exp.desc}</p>
                      {exp.points && (
                        <ul className="exp-points-new">
                          {exp.points.map((p, pi) => <li key={pi}>{p}</li>)}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <div className="cv-footer-blocks">
              <section className="cv-block-mini">
                <div className="cv-section-label-new">02 / ÉDUCATION</div>
                <div className="cv-edu-list">
                  <div className="edu-item-new">
                    <strong>UX Design Certificate</strong>
                    <span>Google (2025)</span>
                  </div>
                  <div className="edu-item-new">
                    <strong>Web Designer Certifié</strong>
                    <span>EIGB (2023)</span>
                  </div>
                </div>
              </section>

              <section className="cv-block-mini">
                <div className="cv-section-label-new">03 / SKILLS</div>
                <div className="cv-skills-pills">
                  {['Figma', 'Illustrator', 'Notion', 'Product Logic', 'UX Audit', 'QA Strategy'].map(skill => (
                    <span key={skill} className="skill-pill-new">{skill}</span>
                  ))}
                </div>
              </section>
            </div>

            <footer className="cv-final-actions">
              <div className="footer-line-accent"></div>
              <div className="cv-contact-row">
                <a href="mailto:dafiashalom@gmail.com" className="cv-email-link">dafiashalom@gmail.com</a>
                <motion.a 
                  href="https://drive.google.com/file/d/14q3ARxXM3rk82VKS6dKYmyGJCk9UWruu/view?usp=sharing" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cv-cta-premium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  TÉLÉCHARGER LE CV
                </motion.a>
              </div>
            </footer>
          </div>
        </div>
        
        <footer className="cv-minimal-footer">
          <p>© 2026 Portfolio — Sacca Dafia</p>
        </footer>
      </div>
    );
  };

const ProjectsView = ({
  projects,
  setCurrentView,
  setPreviousView,
  t,
  lang
}: {
  projects: any[];
  setCurrentView: any;
  setPreviousView: any;
  t: any;
  lang: 'en' | 'fr';
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'design' | 'dev'>('all');

  const filteredProjects = projects.filter((project: any) => {
    if (activeFilter === 'all') return true;
    const isDesign = project.id === 'vortex' || project.id === 'sport-advisor' || project.id === 'dolce-riviera';
    if (activeFilter === 'design') return isDesign;
    if (activeFilter === 'dev') return !isDesign;
    return true;
  });

  return (
    <div className="projects-page-view">
      <div className="saas-gradient-overlay" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(238, 237, 228, 0.05) 0%, transparent 60%)' }} />
      
      <header className="projects-page-header">
        <div className="container">
          <button onClick={() => { setCurrentView('home'); }} className="cs-back-btn">
            <ArrowLeft size={18} style={{ marginRight: '8px' }} />
            <span>{lang === 'fr' ? 'Retour au Portfolio' : 'Back to Portfolio'}</span>
          </button>
          <span className="saas-eyebrow">06 / Projects</span>
          <h1 className="projects-page-title">
            {lang === 'en' ? <>All <span className="highlight">Projects.</span></> : <>Tous les <span className="highlight">Projets.</span></>}
          </h1>

          {/* Dynamic Filter Tabs */}
          <div className="filter-tabs-container" style={{ display: 'inline-flex', marginTop: '8px' }}>
            {[
              { id: 'all', label: lang === 'en' ? 'All Work' : 'Tous les projets' },
              { id: 'design', label: 'Product Design' },
              { id: 'dev', label: 'Web Design' }
            ].map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as any)}
                  className={`filter-tab-btn ${isActive ? 'active' : ''}`}
                  style={{ position: 'relative' }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="filter-active-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="filter-tab-label">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>


      <div className="container" style={{ paddingBottom: '120px' }}>
        <motion.div layout className="projects-grid-dznr">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: any, i: number) => (
              <motion.div 
                layout
                key={project.id}
                className="project-card-dznr"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* 1. Image Showcase Container */}
                <div 
                  className="project-card-image-wrapper"
                  onClick={() => {
                    setPreviousView('projects');
                    setCurrentView(project.id);
                  }}
                >
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="project-card-image" 
                  />
                  <div className="project-card-overlay-dznr" />
                  
                  {/* Floating Category Tag */}
                  <span className="project-card-category-tag">{project.category}</span>
                </div>
                
                {/* 2. Detailed Metadata & Content Container */}
                <div className="project-card-info-dznr">
                  <div className="project-card-meta-row">
                    <span className="project-card-index">0{i + 1} /</span>
                    <span className="project-card-role">{project.role}</span>
                  </div>
                  
                  <h3 
                    className="project-card-title-detailed"
                    onClick={() => {
                      setPreviousView('projects');
                      setCurrentView(project.id);
                    }}
                  >
                    {project.title}
                  </h3>
                  
                  <p className="project-card-desc-detailed">
                    {project.description}
                  </p>
                  
                  {/* Tech stack pills */}
                  <div className="project-card-tech-pills">
                    {project.techs.map((tech: string) => (
                      <span key={tech} className="project-card-tech-pill">{tech}</span>
                    ))}
                  </div>
                  
                  {/* Interactive Action Footer */}
                  <div className="project-card-actions">
                    <button 
                      onClick={() => {
                        setPreviousView('projects');
                        setCurrentView(project.id);
                      }}
                      className="project-action-btn-primary"
                    >
                      {t.projects.viewCaseStudy}
                      <ArrowRight size={16} />
                    </button>
                    
                    {project.link && project.link !== '#' && (
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-action-link-secondary"
                      >
                        {project.linkType === 'behance' ? t.projects.viewProject : t.projects.visitSite}
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

const VALID_PROJECT_IDS = [
  'asset-iq',
  'ehadj',
  'beans',
  'sagana',
  'vortex',
  'sport-advisor',
  'truvox',
  'tavares',
  'the-refuge',
  'strategy-arena',
  'dolce-riviera'
];

const getViewFromHash = (): 'home' | 'projects' | 'asset-iq' | 'ehadj' | 'beans' | 'sagana' | 'vortex' | 'sport-advisor' | 'truvox' | 'tavares' | 'the-refuge' | 'strategy-arena' | 'dolce-riviera' | 'cv' => {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.replace('#', '').trim();
  if (hash === 'projects') return 'projects';
  if (hash === 'cv') return 'cv';
  if (VALID_PROJECT_IDS.includes(hash)) return hash as any;
  return 'home';
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  if (scrolled) { /* no-op for TS check */ }
  const [currentView, setCurrentView] = useState<'home' | 'projects' | 'asset-iq' | 'ehadj' | 'beans' | 'sagana' | 'vortex' | 'sport-advisor' | 'truvox' | 'tavares' | 'the-refuge' | 'strategy-arena' | 'dolce-riviera' | 'cv'>(() => getViewFromHash());
  const [previousView, setPreviousView] = useState<'home' | 'projects'>('home');
  if (previousView) { /* no-op for TS check */ }
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [activeExpIndex, setActiveExpIndex] = useState(0);
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const mousePos = { x: 50, y: 50 };
  const [time, setTime] = useState(new Date());

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.documentElement.lang = lang;

    // Dynamic Title & Meta Description for SEO and Recruiter Clarity
    const viewTitles: Record<string, { en: string; fr: string; descEn: string; descFr: string }> = {
      home: {
        en: "Sacca Dafia | Digital Solution & Product Designer",
        fr: "Sacca Dafia | Conception de Solutions & Produits Numériques",
        descEn: "Sacca Dafia, Digital Solution & Product Designer (+4 years exp). Designing intuitive digital products, B2B SaaS platforms & web solutions.",
        descFr: "Sacca Dafia, Conception de Solutions & Produits Numériques (+4 ans d'expérience). Création de produits numériques complets & SaaS B2B."
      },
      projects: {
        en: "Projects & Selected Works | Sacca Dafia",
        fr: "Projets & Travaux Sélectionnés | Sacca Dafia",
        descEn: "Explore case studies and web design projects designed by Sacca Dafia.",
        descFr: "Découvrez les études de cas et projets de design web conçus par Sacca Dafia."
      },
      'asset-iq': {
        en: "Asset IQ — B2B SaaS Case Study | Sacca Dafia",
        fr: "Asset IQ — Étude de Cas SaaS B2B | Sacca Dafia",
        descEn: "Asset IQ: Intelligent multi-site resource tracking and operational governance platform. Product Strategy & UX design by Sacca Dafia.",
        descFr: "Asset IQ : Système intelligent de suivi et gouvernance de ressources physiques multi-sites. Stratégie Produit & UX par Sacca Dafia."
      },
      ehadj: {
        en: "eHadj — Logistics Orchestration Case Study | Sacca Dafia",
        fr: "eHadj — Étude de Cas Orchestration Logistique | Sacca Dafia",
        descEn: "eHadj: Digitalization and process orchestration for national pilgrimage logistics. Lead Product Designer Sacca Dafia.",
        descFr: "eHadj : Digitalisation et orchestration logistique globale du pèlerinage. Lead Product Designer Sacca Dafia."
      },
      beans: {
        en: "Beans — Customer Loyalty B2B SaaS Case Study | Sacca Dafia",
        fr: "Beans — Étude de Cas SaaS B2B Fidélisation | Sacca Dafia",
        descEn: "Beans Integration Hub: End-to-end PRDs, UX flow design, integration specs, and engineering team lead by Sacca Dafia.",
        descFr: "Pôle d'intégrations Beans : Rédaction de PRD, flow UX, spécifications et supervision technique par Sacca Dafia."
      },
      sagana: {
        en: "Sagana — Digital Agency & Design System Case Study | Sacca Dafia",
        fr: "Sagana — Agence Digitale & Design System | Sacca Dafia",
        descEn: "Sagana digital agency showcase & design system. Brand experience and high performance web design.",
        descFr: "Site vitrine et design system pour l'agence digitale Sagana. Performance et esthétique haut de gamme."
      },
      vortex: {
        en: "Vortex Gallery — Web3 Immersive Experience | Sacca Dafia",
        fr: "Vortex Gallery — Expérience Immersive Web3 | Sacca Dafia",
        descEn: "Vortex Gallery: Interactive digital art gallery interface design by Sacca Dafia.",
        descFr: "Vortex Gallery : Interface interactive de galerie d'art numérique par Sacca Dafia."
      },
      'sport-advisor': {
        en: "Sport Advisor — Mobile & Web Platform Case Study | Sacca Dafia",
        fr: "Sport Advisor — Application & Plateforme Sportive | Sacca Dafia",
        descEn: "Sport Advisor UX/UI design: Personalized athletic recommendation engine.",
        descFr: "Design UX/UI Sport Advisor : Application de recommandation et coaching sportif personnalisé."
      },
      truvox: {
        en: "Truvox Studio — Brand & Web Experience | Sacca Dafia",
        fr: "Truvox Studio — Design Web & Identité | Sacca Dafia",
        descEn: "Truvox Studio: Web experience and digital product studio identity designed by Sacca Dafia.",
        descFr: "Truvox Studio : Studio d'expériences numériques apportant clarté et croissance."
      },
      'the-refuge': {
        en: "The Refuge — Social Impact Web Portal | Sacca Dafia",
        fr: "The Refuge — Portail Web à Impact Social | Sacca Dafia",
        descEn: "The Refuge: Transparent live impact tracking and donation flow web portal.",
        descFr: "The Refuge : Portails web d'action sociale avec suivi d'impact en direct et dons."
      },
      'strategy-arena': {
        en: "Strategy Arena — Consulting & Digital Transformation | Sacca Dafia",
        fr: "Strategy Arena — Conseil en Stratégie & Web Design | Sacca Dafia",
        descEn: "Strategy Arena consulting firm branding, web design, and digital showcase.",
        descFr: "Strategy Arena : Cabinet de conseil en stratégie et transformation digitale pour PME."
      },
      'dolce-riviera': {
        en: "Dolce Riviera — Luxury E-Commerce Case Study | Sacca Dafia",
        fr: "Dolce Riviera — E-Commerce Luxe | Sacca Dafia",
        descEn: "Dolce Riviera: Immersive luxury brand e-commerce experience designed by Sacca Dafia.",
        descFr: "Dolce Riviera : Boutique e-commerce et expérience de marque haut de gamme."
      },
      cv: {
        en: "Curriculum Vitae & Journey | Sacca Dafia - Product Designer",
        fr: "Parcours & Curriculum Vitae | Sacca Dafia - Product Designer",
        descEn: "Detailed career narrative, technical skills, and design philosophies of Sacca Dafia.",
        descFr: "Parcours professionnel détaillé, compétences techniques et philosophie design de Sacca Dafia."
      }
    };

    const info = viewTitles[currentView] || viewTitles.home;
    document.title = info[lang];
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', info[lang === 'fr' ? 'descFr' : 'descEn']);
    }
  }, [currentView, lang]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
          }, 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 12) + 4;
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || loading) return;

    // Scroll progress bar indicator
    gsap.to('.scroll-progress-bar', {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.1,
      }
    });

    // Magnetic effect for buttons and CTAs
    const magneticElements = document.querySelectorAll('.magnetic-button');
    magneticElements.forEach((el) => {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(el, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.3,
          ease: 'power2.out',
        });
      };
      
      const handleMouseLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)',
        });
      };
      
      el.addEventListener('mousemove', handleMouseMove as EventListener);
      el.addEventListener('mouseleave', handleMouseLeave as EventListener);
    });

    // Reveal headers scroll triggers
    const revealTitles = document.querySelectorAll('.gsap-reveal-title');
    revealTitles.forEach((title) => {
      const parent = title.parentElement;
      if (parent) {
        parent.style.overflow = 'hidden';
      }
      
      gsap.fromTo(title, 
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    // Parallax on hero portrait image
    gsap.to('.hero-portrait-img', {
      y: '10%',
      ease: 'none',
      scrollTrigger: {
        trigger: '#home',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // Stagger reveal of Editorial Sheet columns
    gsap.fromTo('.sheet-col', 
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-editorial-sheet',
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Stagger reveal of Services cards with a slight 3D rotation
    gsap.fromTo('.service-card-dznr',
      { y: 80, opacity: 0, rotateX: -8 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: 'power4.out',
        transformPerspective: 1000,
        scrollTrigger: {
          trigger: '.services-grid-dznr',
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Stagger reveal of Projects cards
    gsap.fromTo('.project-card-dznr',
      { y: 70, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-grid-dznr',
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Parallax scrolling on Project card images
    const projectCards = document.querySelectorAll('.project-card-dznr');
    projectCards.forEach((card) => {
      const img = card.querySelector('.project-card-image');
      if (img) {
        gsap.fromTo(img, 
          { y: '-6%' },
          {
            y: '6%',
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      }
    });
  }, [loading]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Select all sections that have an id
    const sectionElements = Array.from(document.querySelectorAll('section')).filter(s => s.id);

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;

          // Update desktop nav links active class directly in DOM to avoid page re-renders
          document.querySelectorAll('.nav-center-links a').forEach(a => {
            const href = a.getAttribute('href');
            let isCurrent = href === `#${id}`;
            if (href === '#saas' && (id === 'saas' || id === 'projects')) {
              isCurrent = true;
            }
            if (href === '#services' && id === 'experience') {
              isCurrent = true;
            }
            
            if (isCurrent) {
              a.classList.add('active');
            } else {
              a.classList.remove('active');
            }
          });

          // Update mobile nav links active class directly in DOM to avoid page re-renders
          document.querySelectorAll('.mobile-link-item').forEach(a => {
            const href = a.getAttribute('href');
            let isCurrent = href === `#${id}`;
            if (href === '#saas' && (id === 'saas' || id === 'projects')) {
              isCurrent = true;
            }
            if (href === '#services' && id === 'experience') {
              isCurrent = true;
            }

            if (isCurrent) {
              a.classList.add('active');
            } else {
              a.classList.remove('active');
            }
          });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionElements.forEach(element => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [currentView]); // Re-run whenever view resets

  const translations = {
    en: {
      nav: { home: 'Home', about: 'About', services: 'Services', experience: 'Experience', focus: 'Focus', projects: 'Projects', process: 'Process', contact: 'Contact' },
      process: {
        label: '07 / Process',
        title: <>My <span className="highlight">Methodology.</span></>,
        items: [
          { num: '01', title: 'Competitor Analysis & Benchmarking', desc: 'I analyze market solutions, dissect competitor user flows, and identify industry best practices to define a clear product positioning.' },
          { num: '02', title: 'Discovery & UX Audit', desc: 'I gather user insights, pinpoint usability issues and friction points in existing products, and align user needs with business goals.' },
          { num: '03', title: 'Product Thinking & IA', desc: 'I map complex user flows, establish clear information architecture, and structure product requirements (PRD) to guide visual design.' },
          { num: '04', title: 'High-Fidelity UI Design', desc: 'I craft beautiful, accessible, responsive interface designs and interactive prototypes using scalable Design Systems.' },
          { num: '05', title: 'QA & Implementation Review', desc: 'I don\'t just hand off Figma links. I work closely with engineers and run comprehensive QA reviews to ensure pixel-perfect deployment.' }
        ]
      },
      contact: {
        label: '08 / Contact',
        title: <>Ready to create<br /><span className="highlight">together?</span></>,
        subtitle: '30 minutes to discuss your project, your needs, and see how I can help.',
        bookCall: 'Book a call',
        availability: 'Available for new projects',
        emailText: 'Let\'s turn your idea into reality.',
        rights: 'All rights reserved.'
      },
      hero: {
        label: '00 / Home',
        title: <>Building scalable<br /><span className="highlight">digital products.</span></>,
        subtitle: 'CLEAR. USEFUL. SUSTAINABLE.',
        viewProjects: 'VIEW MY PROJECTS',
        contactMe: 'CONTACT ME',
        topText: 'DEDICATED TO BUILDING EXCELLENT DIGITAL PRODUCTS, I AM A',
        titleLine1: 'PRODUCT & DIGITAL',
        titleLine2: 'EXPERIENCE',
        titleHighlight: 'DESIGNER',
        bottomText: 'focused on creating clear, useful, and sustainable digital systems from strategy to code.',
        ctaText: 'Book a Discovery Call'
      },
      services: {
        label: '03 / Services',
        title: <>What <span className="highlight-green">Services</span> do I provide?</>,
        subtitle: 'Comprehensive solutions for your digital projects.',
        items: [
          {
            id: '01',
            title: 'Product Design',
            subtitle: 'Interfaces & Experience',
            desc: 'Creating seamless user journeys and high-fidelity interfaces that prioritize clarity and user engagement.',
            tags: ['Figma', 'UX Research', 'Prototyping'],
            color: '#0d3479'
          },
          {
            id: '02',
            title: 'UX Audit',
            subtitle: 'Optimization & Analysis',
            desc: 'Identifying friction points and usability bottlenecks to improve conversion rates and overall user satisfaction.',
            tags: ['Heuristic Eval', 'User Testing', 'Analytics'],
            color: '#A855F7'
          },
          {
            id: '03',
            title: 'Product Strategy',
            subtitle: 'Vision & Roadmapping',
            desc: 'Bridging the gap between business goals and user needs by defining MVPs and scalable product architectures.',
            tags: ['Roadmap', 'User Personas', 'MVP'],
            color: '#F97316'
          },
          {
            id: '04',
            title: 'Design & Development',
            subtitle: 'Design Systems & Front-End',
            desc: 'Bridging the gap between design and code by building reusable component libraries and clean, interactive React/Next.js interfaces.',
            tags: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Vibe Coding'],
            color: '#eeede4'
          }
        ]
      },
      about: {
        title: <>What I <br/><span className="highlight">really do.</span></>,
        bio: 'Web & Product Designer. I design websites and SaaS products using a single, unified process: Competitor Analysis → Discovery → Information Architecture → High-Fidelity Design → QA. This direct methodology ensures every interface is clear, useful, and fully optimized for development.',
        approach: 'Translating complex visions into obvious interfaces. I combine empirical research, high-fidelity prototyping, and technical rigor to craft products that perform as beautifully as they look.',
        label: '02 / About'
      },
      experience: {
        title: 'Experience',
        label: '04 / EXPERIENCE',
        items: [
          {
            id: '01',
            role: 'Product Designer',
            company: 'CACTUCE',
            date: 'OCTOBER 2025 — PRESENT',
            desc: 'Working on the structuring and optimization of complex products like eHadj and Asset IQ. Identifying friction points, defining user journeys, and overseeing QA to ensure execution matches the product vision.',
            skills: ['Interfaces Logic', 'UX Analysis', 'Hi-Fi Design', 'QA Oversight'],
            color: '#A855F7'
          },
          {
            id: '02',
            role: 'Product Designer',
            company: 'TRELLIX',
            date: 'FEBRUARY 2024 — SEPTEMBER 2025',
            desc: 'Evolved from a design-focused to a product-focused approach, working on integrations for the Beans loyalty program. Defined features, structured user journeys, and ensured global product consistency.',
            skills: ['PRD & Specs', 'Beans Journey', 'Dev Coordination', 'QA Validation'],
            color: '#0d3479'
          },
          {
            id: '03',
            role: 'Web Designer',
            company: 'CREAFIX',
            date: 'AUGUST 2022 — FEBRUARY 2024',
            desc: 'Started in digital design with a focus on creating web interfaces and visual execution. Developed visual hierarchy, readability, and graphic coherence for various client websites.',
            skills: ['Visual Design', 'Info Hierarchy', 'Web Layouts', 'Project Delivery'],
            color: '#F97316'
          }
        ]
      },
      projects: {
        label: '06 / Projects',
        title: <>Quick look at <span className="highlight-green">My work.</span></>,
        viewCaseStudy: 'View Case Study',
        visitSite: 'Visit Site',
        viewProject: 'View Project',
        seeMore: 'See more projects',
        backToHome: 'Back to Home',
        items: [
          {
            id: 'tavares',
            title: 'Tavares',
            role: 'Web Designer & Developer',
            category: 'Cinematic Portfolio',
            image: '/imgs/tavares.png',
            description: "Modern website for director Tavares, designed as a minimalist showcase for his cinematic work, putting his projects front and center.",
            techs: ['Figma', 'React', 'Tailwind', 'Framer Motion'],
            link: 'https://portfolio-tavares.vercel.app/',
            color: '#E50914',
            linkType: 'site',
          },
          {
            id: 'strategy-arena',
            title: 'Strategy Arena',
            role: 'Web Designer & Developer',
            category: 'Consulting Website',
            image: '/imgs/Strategy-Arena.png',
            description: "Full branding, visual identity, and development of Strategy Arena's showcase website. A modern, high-performance platform featuring interactive micro-animations, structured services, and business cases to attract growing SMEs in West Africa.",
            techs: ['Branding', 'Figma', 'Vite', 'HTML5', 'CSS3'],
            link: 'https://strategie-arena.com/',
            color: '#F4E723',
            linkType: 'site',
          },
          {
            id: 'vortex',
            title: 'Vortex',
            role: 'Product Designer',
            category: 'Mobile App',
            image: '/imgs/vortex.webp',
            description: "Mobile app for fuel purchase and wallet management. Optimized transactional flows designed for mobility with smooth onboarding and integrated wallet.",
            techs: ['Figma', 'UX Research', 'Prototyping', 'Design System'],
            link: 'https://www.behance.net/gallery/218017715/Mobile-App-to-buy-fuel',
            color: '#FFD700',
            linkType: 'behance',
          },
          {
            id: 'sport-advisor',
            title: 'Sport Advisor',
            role: 'Product Designer',
            category: 'AI & Analytics',
            image: '/imgs/advisor.webp',
            description: "Landing page for an AI-powered sports analytics platform. Dense information hierarchy made readable at first glance with strong visual storytelling.",
            techs: ['Figma', 'UX Strategy', 'Visual Design', 'Motion'],
            link: 'https://www.behance.net/gallery/232665713/Sport-Advisor-IA-dAnalyse-Sportive',
            color: '#00FA9A',
            linkType: 'behance',
          },
          {
            id: 'beans',
            title: 'Beans',
            role: 'Integration Project Manager & Designer',
            category: 'SaaS Integrations Hub',
            image: '/imgs/beans_cover.png',
            description: "Led functional project management and UX design for Beans Integration Hub: connecting Shopify, WooCommerce, Klaviyo, Instagram, and POS into the customer loyalty platform.",
            techs: ['Project Management', 'SaaS Integrations', 'Figma', 'API Spec'],
            link: 'https://www.trybeans.com',
            color: '#F59E0B',
            linkType: 'site',
          },
          {
            id: 'truvox',
            title: 'Truvox Studio',
            role: 'Product & Web Designer',
            category: 'Brand & Web Studio',
            image: '/imgs/truvox_cover.png',
            description: "Digital design studio crafting exceptional digital experiences that bring clarity, build trust, and support business growth through Strategy, Design, and Development.",
            techs: ['Brand Strategy', 'Web Design', 'Development', 'Framer Motion'],
            link: 'https://www.truvox.studio/',
            color: '#10B981',
            linkType: 'site',
          },
          {
            id: 'the-refuge',
            title: 'The Refuge',
            role: 'Web Designer & Developer',
            category: 'Website',
            image: '/imgs/your-refuge.jpg',
            description: "A digital portal and real-time impact tracker for a Christian humanitarian organization in Cotonou, Benin. We built a responsive web application that features custom donation flows (FCFA/Mobile Money), volunteer recruitment, and visual progress gauges tracking clothing donations, menstrual hygiene kits for women in need, and active social reinsertion.",
            techs: ['Figma', 'UX Research', 'Design System', 'Prototyping'],
            link: 'https://your-refuge.vercel.app/',
            color: '#0d3479',
            linkType: 'site',
          },
          {
            id: 'sagana',
            title: 'Sagana',
            role: 'Web Designer & Developer',
            category: 'Digital Agency',
            image: '/imgs/SAGANA-—-Agence-Digitale-Premium-04-26-2026_10_55_AM.png',
            description: "Full design and development of Sagana's website. A modern platform combining premium design and performance to support businesses in their digital growth.",
            techs: ['Figma', 'React', 'Tailwind', 'Framer Motion'],
            link: 'https://www.sagana-agency.com/',
            color: '#DFFF00',
            linkType: 'site',
          },
          {
            id: 'dolce-riviera',
            title: 'Dolce Riviera',
            role: 'Product Designer (UX/UI)',
            category: 'Landing Page',
            image: '/imgs/dolce_cover.png',
            description: "Immersive luxury landing page concept inspired by the Mediterranean Riviera. Designed to elevate brand exclusivity and credibility through a clean visual hierarchy, premium art direction, and a conversion-oriented user journey.",
            techs: ['Figma', 'UX/UI Design', 'Art Direction', 'Prototyping'],
            link: 'https://www.behance.net/gallery/252335895/Dolce-Riviera-Luxury-Hospitality-Landing-Page-Concept',
            color: '#C5A059',
            linkType: 'behance',
          },
        ]
      }
    },
    fr: {
      nav: { home: 'Accueil', about: 'À propos', services: 'Services', experience: 'Expérience', focus: 'Focus', projects: 'Projets', process: 'Process', contact: 'Contact' },
      process: {
        label: '07 / Process',
        title: <>Ma <span className="highlight">Méthodologie.</span></>,
        items: [
          { num: '01', title: 'Analyse Concurrentielle & Benchmark', desc: 'J\'étudie les solutions du marché, dissèque les flux concurrents et identifie les meilleures pratiques pour définir un positionnement produit clair.' },
          { num: '02', title: 'Discovery & Audit UX', desc: 'J\'analyse le comportement des utilisateurs, repère les points de friction sur le produit existant et aligne les objectifs business avec les besoins réels.' },
          { num: '03', title: 'Product Thinking & Architecture', desc: 'Je structure les parcours utilisateurs, définis l\'architecture de l\'information et pose la logique produit (PRD) avant de concevoir l\'interface.' },
          { num: '04', title: 'Design UI & Prototypage', desc: 'Je conçois des interfaces haute-fidélité modernes, interactives et responsives en m\'appuyant sur un Design System structuré et évolutif.' },
          { num: '05', title: 'Recette QA & Suivi Dev', desc: 'Je ne me limite pas à livrer des maquettes. Je collabore étroitement avec les développeurs et réalise une recette QA rigoureuse (pixel-perfect) avant la mise en ligne.' }
        ]
      },
      contact: {
        label: '08 / Contact',
        title: <>Prêt à créer<br /><span className="highlight">ensemble ?</span></>,
        subtitle: '30 minutes pour discuter de votre projet, de vos besoins et voir comment je peux vous aider.',
        bookCall: 'Réserver un appel',
        availability: 'Disponible pour de nouveaux projets',
        emailText: 'Transformons votre idée en réalité.',
        rights: 'Tous droits réservés.'
      },
      hero: {
        label: '00 / Accueil',
        title: <>Concevoir des produits<br /><span className="highlight">numériques évolutifs.</span></>,
        subtitle: 'CLAIRS. UTILES. DURABLES.',
        viewProjects: 'VOIR MES PROJETS',
        contactMe: 'ME CONTACTER',
        topText: 'DÉDIÉ À LA CONCEPTION DE PRODUITS EXCELLENTS, JE SUIS UN',
        titleLine1: 'DESIGNER PRODUIT',
        titleLine2: '& EXPÉRIENCES',
        titleHighlight: 'DIGITALES',
        bottomText: 'axé sur la création de systèmes numériques clairs, utiles et durables, de la stratégie au code.',
        ctaText: 'Réserver un appel découverte'
      },
      services: {
        label: '03 / Services',
        title: <>Quels <span className="highlight-green">services</span> puis-je vous offrir ?</>,
        subtitle: 'Des solutions complètes pour vos projets digitaux.',
        items: [
          {
            id: '01',
            title: 'Product Design',
            subtitle: 'Interfaces & Expérience',
            desc: 'Création de parcours fluides et d\'interfaces haute fidélité privilégiant la clarté et l\'engagement.',
            tags: ['Figma', 'UX Research', 'Prototypage'],
            color: '#0d3479'
          },
          {
            id: '02',
            title: 'Audit UX',
            subtitle: 'Optimisation & Analyse',
            desc: 'Identification des points de friction pour améliorer les taux de conversion et la satisfaction globale.',
            tags: ['Éval Heuristique', 'Tests Utilisateurs', 'Analytics'],
            color: '#A855F7'
          },
          {
            id: '03',
            title: 'Stratégie Produit',
            subtitle: 'Vision & Roadmap',
            desc: 'Réconciliation des objectifs business et besoins utilisateurs via la définition de MVPs évolutifs.',
            tags: ['Roadmap', 'Personas', 'MVP'],
            color: '#F97316'
          },
          {
            id: '04',
            title: 'Design & Développement',
            subtitle: 'Design Systems & Front-End',
            desc: 'Faire le pont entre le design et le code en concevant des systèmes de composants réutilisables et des interfaces React/Next.js propres, interactives et performantes.',
            tags: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Vibe Coding'],
            color: '#eeede4'
          }
        ]
      },
      about: {
        title: <>Ce que je fais <br/><span className="highlight">vraiment.</span></>,
        bio: 'Designer Web & Produit. Je conçois des sites web et des produits SaaS à travers un processus unique et structuré : Analyse concurrentielle → Discovery → Architecture de l\'information → Design Haute-Fidélité → QA. Une méthodologie directe qui garantit des interfaces claires, utiles et prêtes pour le développement.',
        approach: 'Traduire des visions complexes en interfaces évidentes. Je combine recherche empirique, prototypage de haute fidélité et rigueur technique pour concevoir des produits qui fonctionnent aussi bien qu\'ils en ont l\'air.',
        label: '02 / À propos'
      },
      experience: {
        title: 'Expérience',
        label: '04 / EXPÉRIENCE',
        items: [
          {
            id: '01',
            role: 'Product Designer',
            company: 'CACTUCE',
            date: 'OCTOBRE 2025 — PRÉSENT',
            desc: 'Intervention sur la structuration et l\'optimisation de produits complexes comme eHadj et Asset IQ. Identification des points de friction et supervision de la phase de QA.',
            skills: ['Logique d\'interfaces', 'Analyse UX', 'Design Haute-fidélité', 'Supervision QA'],
            color: '#A855F7'
          },
          {
            id: '02',
            role: 'Product Designer',
            company: 'TRELLIX',
            date: 'FÉVRIER 2024 — SEPTEMBRE 2025',
            desc: 'Évolution vers une approche produit structurée sur le programme Beans. Définition des fonctionnalités et coordination avec l\'équipe dev.',
            skills: ['PRD & Specs', 'Parcours Beans', 'Coordination Dev', 'Validation QA'],
            color: '#0d3479'
          },
          {
            id: '03',
            role: 'Web Designer',
            company: 'CREAFIX',
            date: 'AOÛT 2022 — FÉVRIER 2024',
            desc: 'Création d\'interfaces web et exécution visuelle. Travail sur la hiérarchie visuelle, la lisibilité et la cohérence graphique.',
            skills: ['Visual Design', 'Hiérarchie Info', 'Web Layouts', 'Livraison Projet'],
            color: '#F97316'
          }
        ]
      },
      projects: {
        label: '06 / Projets',
        title: <>Un coup d'œil sur <span className="highlight-green">mon travail.</span></>,
        viewCaseStudy: "Voir l'étude de cas",
        visitSite: 'Visiter le site',
        viewProject: 'Visualiser le projet',
        seeMore: 'Voir plus de projets',
        backToHome: "Retour à l'accueil",
        items: [
          {
            id: 'tavares',
            title: 'Tavares',
            role: 'Web Designer & Développeur',
            category: 'Portfolio Cinématographique',
            image: '/imgs/tavares.png',
            description: "Site web moderne pour le réalisateur Tavares, conçu comme un écrin minimaliste pour ses œuvres cinématographiques afin de mettre ses projets au premier plan.",
            techs: ['Figma', 'React', 'Tailwind', 'Framer Motion'],
            link: 'https://portfolio-tavares.vercel.app/',
            color: '#E50914',
            linkType: 'site',
          },
          {
            id: 'strategy-arena',
            title: 'Strategy Arena',
            role: 'Web Designer & Développeur',
            category: 'Site Cabinet de Conseil',
            image: '/imgs/Strategy-Arena.png',
            description: "Branding complet, identité visuelle et développement du site vitrine de Strategy Arena. Une plateforme moderne, ultra-performante et asymétrique, avec des micro-animations fluides et des pages de services structurées pour attirer les PME d'Afrique de l'Ouest.",
            techs: ['Branding', 'Figma', 'Vite', 'HTML5', 'CSS3'],
            link: 'https://strategie-arena.com/',
            color: '#F4E723',
            linkType: 'site',
          },
          {
            id: 'vortex',
            title: 'Vortex',
            role: 'Product Designer',
            category: 'Application Mobile',
            image: '/imgs/vortex.webp',
            description: "Application mobile d'achat de carburant et de gestion de portefeuille. Parcours transactionnels optimisés pour la mobilité avec onboarding fluide et gestion de wallet intégrée.",
            techs: ['Figma', 'UX Research', 'Prototyping', 'Design System'],
            link: 'https://www.behance.net/gallery/218017715/Mobile-App-to-buy-fuel',
            color: '#FFD700',
            linkType: 'behance',
          },
          {
            id: 'sport-advisor',
            title: 'Sport Advisor',
            role: 'Product Designer',
            category: 'IA & Analytics',
            image: '/imgs/advisor.webp',
            description: "Landing page pour une plateforme d'analyse sportive basée sur l'IA. Hiérarchie d'information dense rendue lisible au premier coup d'œil avec un storytelling visuel fort.",
            techs: ['Figma', 'UX Strategy', 'Visual Design', 'Motion'],
            link: 'https://www.behance.net/gallery/232665713/Sport-Advisor-IA-dAnalyse-Sportive',
            color: '#00FA9A',
            linkType: 'behance',
          },
          {
            id: 'beans',
            title: 'Beans',
            role: 'Chef de Projet Intégrations & Designer',
            category: 'Hub d\'Intégrations SaaS',
            image: '/imgs/beans_cover.png',
            description: "Pilotage fonctionnel et design UX du pôle d'intégrations Beans : connexion des écosystèmes Shopify, WooCommerce, Klaviyo, Instagram et POS à la plateforme de fidélisation.",
            techs: ['Gestion de projet', 'Intégrations SaaS', 'Figma', 'Spécifications API'],
            link: 'https://www.trybeans.com',
            color: '#F59E0B',
            linkType: 'site',
          },
          {
            id: 'truvox',
            title: 'Truvox Studio',
            role: 'Product & Web Designer',
            category: 'Brand & Web Studio',
            image: '/imgs/truvox_cover.png',
            description: "Studio de création digitale qui conçoit des expériences numériques d'exception pour apporter de la clarté, renforcer la confiance et soutenir la croissance des entreprises.",
            techs: ['Brand Strategy', 'Web Design', 'Development', 'Framer Motion'],
            link: 'https://www.truvox.studio/',
            color: '#10B981',
            linkType: 'site',
          },
          {
            id: 'the-refuge',
            title: 'Le Refuge',
            role: 'Web Designer & Développeur',
            category: 'Site Web',
            image: '/imgs/your-refuge.jpg',
            description: "Portail numérique et suivi d'impact en temps réel pour une organisation chrétienne humanitaire à Cotonou (Bénin). Nous avons conçu une application web responsive intégrant des tunnels de don (FCFA & Mobile Money), le recrutement de bénévoles, et des jauges d'avancement pour le suivi des vêtements distribués, des kits d'hygiène menstruelle pour femmes démunies, et des réinsertions sociales.",
            techs: ['Figma', 'UX Research', 'Design System', 'Prototyping'],
            link: 'https://your-refuge.vercel.app/',
            color: '#0d3479',
            linkType: 'site',
          },
          {
            id: 'sagana',
            title: 'Sagana',
            role: 'Web Designer & Développeur',
            category: 'Agence Digitale',
            image: '/imgs/SAGANA-—-Agence-Digitale-Premium-04-26-2026_10_55_AM.png',
            description: "Conception et développement intégral du site web de Sagana. Une plateforme moderne alliant design premium et performance pour accompagner les entreprises dans leur croissance digitale.",
            techs: ['Figma', 'React', 'Tailwind', 'Framer Motion'],
            link: 'https://www.sagana-agency.com/',
            color: '#DFFF00',
            linkType: 'site',
          },
          {
            id: 'dolce-riviera',
            title: 'Dolce Riviera',
            role: 'Product Designer (UX/UI)',
            category: 'Landing Page',
            image: '/imgs/dolce_cover.png',
            description: "Concept de landing page immersive haut de gamme inspirée de la Riviera méditerranéenne. Conçu pour valoriser l'exclusivité et la crédibilité de la marque à travers une hiérarchie visuelle claire, une direction artistique premium et un parcours utilisateur orienté conversion.",
            techs: ['Figma', 'UX/UI Design', 'Art Direction', 'Prototyping'],
            link: 'https://www.behance.net/gallery/252335895/Dolce-Riviera-Luxury-Hospitality-Landing-Page-Concept',
            color: '#C5A059',
            linkType: 'behance',
          },
        ]
      }
    }
  };

  const t = translations[lang];



  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync currentView changes with URL hash & browser history
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const targetHash = currentView === 'home' ? '' : `#${currentView}`;
    const currentHash = window.location.hash;
    
    if (currentHash !== targetHash && !(currentView === 'home' && (currentHash === '' || currentHash === '#home'))) {
      window.history.pushState({ view: currentView }, '', targetHash || window.location.pathname);
    }
    window.scrollTo(0, 0);
  }, [currentView]);

  // Handle browser Back / Forward buttons & URL hash changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handlePopState = () => {
      const view = getViewFromHash();
      setCurrentView(view);
      if (view === 'home') {
        const section = window.location.hash.replace('#', '');
        if (section && section !== 'home' && !VALID_PROJECT_IDS.includes(section)) {
          setTimeout(() => {
            const el = document.getElementById(section);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  const handleNavClick = (sectionId: string) => {
    if (currentView === 'home') {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${sectionId}`);
    } else {
      setCurrentView('home');
      window.history.pushState(null, '', `#${sectionId}`);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (currentView === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', window.location.pathname);
    } else {
      setCurrentView('home');
      window.history.pushState(null, '', window.location.pathname);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
    setIsMenuOpen(false);
  };

  // Calendly Integration
  const openCalendly = (e: React.MouseEvent) => {
    e.preventDefault();
    if ((window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/dafiashalom/30min' });
    }
  };

  const projects: any[] = t.projects.items;


  return (
    <>
      {/* Scroll Progress Indicator */}
      <div className="scroll-progress-bar"></div>

      {/* Intro Preloader */}
      {(loading || progress < 100) && (
        <div className={`preloader-overlay ${!loading ? 'hide' : ''}`}>
          <div className="preloader-content">
            <div className="preloader-logo-wrapper">
              <svg className="preloader-logo-svg" width="90" height="90" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background track path */}
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M20.8333 16.6667C20.8333 7.46192 28.2953 0 37.5 0C46.7047 0 54.1667 7.46192 54.1667 16.6667V20.8333H58.3333C67.5381 20.8333 75 28.2953 75 37.5C75 46.7047 67.5381 54.1667 58.3333 54.1667H54.1667V58.3333C54.1667 67.5381 46.7047 75 37.5 75C28.2953 75 20.8333 67.5381 20.8333 58.3333V54.1667H16.6667C7.46192 54.1667 0 46.7047 0 37.5C0 28.2953 7.46192 20.8333 16.6667 20.8333H20.8333V16.6667ZM19.7917 38.0208C26.5306 39.6159 35.509 49.3697 37.5 57.2917C39.491 49.3697 48.4694 39.6159 55.2083 38.0208C48.4694 36.4257 39.491 26.6719 37.5 18.75C35.509 26.6719 26.5306 36.4257 19.7917 38.0208Z" 
                  stroke="rgba(238, 237, 228, 0.08)" 
                  strokeWidth="1.5"
                />
                {/* Active animated drawing path */}
                <path 
                  className="preloader-active-path"
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M20.8333 16.6667C20.8333 7.46192 28.2953 0 37.5 0C46.7047 0 54.1667 7.46192 54.1667 16.6667V20.8333H58.3333C67.5381 20.8333 75 28.2953 75 37.5C75 46.7047 67.5381 54.1667 58.3333 54.1667H54.1667V58.3333C54.1667 67.5381 46.7047 75 37.5 75C28.2953 75 20.8333 67.5381 20.8333 58.3333V54.1667H16.6667C7.46192 54.1667 0 46.7047 0 37.5C0 28.2953 7.46192 20.8333 16.6667 20.8333H20.8333V16.6667ZM19.7917 38.0208C26.5306 39.6159 35.509 49.3697 37.5 57.2917C39.491 49.3697 48.4694 39.6159 55.2083 38.0208C48.4694 36.4257 39.491 26.6719 37.5 18.75C35.509 26.6719 26.5306 36.4257 19.7917 38.0208Z" 
                  stroke="#FFFFFF" 
                  strokeWidth="1.5"
                  strokeDasharray="600"
                  strokeDashoffset={600 - (600 * progress) / 100}
                  strokeLinecap="round"
                  style={{
                    fill: progress >= 100 ? 'url(#paint0_radial_preloader)' : 'transparent',
                    transition: 'stroke-dashoffset 0.08s ease, fill 0.4s ease'
                  }}
                />
                <defs>
                  <radialGradient id="paint0_radial_preloader" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(37.5 37.5) rotate(90) scale(37.5)">
                    <stop stopColor="#FFFFFF"/>
                    <stop offset="1" stopColor="rgba(255, 255, 255, 0.6)" stopOpacity="0.8"/>
                  </radialGradient>
                </defs>
              </svg>
            </div>
            <div className="preloader-percentage">{Math.min(progress, 100)}%</div>
            <div className="preloader-title">Sacca Dafia // Portfolio</div>
          </div>
        </div>
      )}

      {/* Global Navigation */}
      {currentView !== 'cv' && (
        <header role="banner" className="site-header">
          <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} aria-label="Navigation principale">
            <div className="container nav-container-new">
              <div className="logo-new" onClick={handleLogoClick}>
                <img src="/imgs/Logo.png" alt="Logo Sacca Dafia" className="logo-img-new" />
              </div>
              
              <div className="nav-center-links hide-mobile">
                <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>{t.nav.about}</a>
                <a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>{t.nav.services}</a>
                <a href="#saas" onClick={(e) => { e.preventDefault(); handleNavClick('saas'); }}>{t.nav.projects}</a>
                <a href="#process" onClick={(e) => { e.preventDefault(); handleNavClick('process'); }}>{t.nav.process}</a>
                <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>{t.nav.contact}</a>
              </div>

              <div className="nav-right-new">
                <div className="lang-switch hide-mobile">
                  <button 
                    className={`lang-btn ${lang === 'en' ? 'active' : ''}`} 
                    onClick={() => setLang('en')}
                  >
                    EN
                  </button>
                  <span className="lang-sep">/</span>
                  <button 
                    className={`lang-btn ${lang === 'fr' ? 'active' : ''}`} 
                    onClick={() => setLang('fr')}
                  >
                    FR
                  </button>
                </div>
                <button onClick={openCalendly} className="nav-contact-cta-pentos hide-mobile magnetic-button">
                  {lang === 'fr' ? 'Me contacter' : 'Contact me'} ↗
                </button>
                <button className={`menu-icon-btn hide-desktop ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Ouvrir le menu">
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
          </nav>

          <div className={`mobile-nav-overlay ${isMenuOpen ? 'open' : ''}`}>
            <div className="mobile-nav-noise"></div>
            <div className="mobile-nav-bg-vignette"></div>
            <div className="mobile-nav-bg"></div>
            
            <div className="container mobile-nav-container">
              <div className="mobile-nav-header">
                <div className="logo-new" onClick={() => { setIsMenuOpen(false); handleLogoClick(); }}>
                  <img src="/imgs/Logo.png" alt="Logo Sacca Dafia" className="logo-img-new" />
                </div>
                <div className="mobile-nav-right">
                  <div className="mobile-nav-lang">
                    <button className={`lang-pill ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
                    <span className="lang-sep" style={{ opacity: 0.3, color: '#fff', fontSize: '12px' }}>/</span>
                    <button className={`lang-pill ${lang === 'fr' ? 'active' : ''}`} onClick={() => setLang('fr')}>FR</button>
                  </div>
                  <button className="mobile-close-btn" onClick={() => setIsMenuOpen(false)} aria-label="Fermer le menu">
                    <X size={28} />
                  </button>
                </div>
              </div>

              <div className="mobile-nav-meta-top hide-mobile-small">
                <div className="meta-item-new">
                  <span className="meta-label-new">LOCATION</span>
                  <span className="meta-value-new">COTONOU, BENIN</span>
                </div>
                <div className="meta-item-new">
                  <span className="meta-label-new">LOCAL TIME</span>
                  <span className="meta-value-new">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                </div>
              </div>
              
              <div className="mobile-nav-content">
                <div className="mobile-nav-links">
                  {[
                    { id: 'about', label: t.nav.about },
                    { id: 'services', label: t.nav.services },
                    { id: 'saas', label: t.nav.projects },
                    { id: 'process', label: t.nav.process },
                    { id: 'contact', label: t.nav.contact }
                  ].map((link, i) => (
                    <motion.div 
                      key={link.id}
                      className="mobile-link-wrapper"
                      initial={{ opacity: 0, x: -30 }}
                      animate={isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                      transition={{ delay: i * 0.08 + 0.2, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <a
                        href={`#${link.id}`}
                        className={`mobile-link-item ${i === 0 ? 'active' : ''}`}
                        onClick={(e) => { e.preventDefault(); handleNavClick(link.id); }}
                      >
                        <span className="mobile-link-text">{link.label}</span>
                      </a>
                    </motion.div>
                  ))}
                </div>

                {/* CTA button – Book a call */}
                <div className="mobile-nav-cta">
                  <button
                    className="mobile-nav-cta-btn"
                    onClick={(e) => { setIsMenuOpen(false); openCalendly(e); }}
                  >
                    {lang === 'fr' ? 'Me contacter' : 'Contact me'} <ArrowRight size={14} style={{ transform: 'rotate(-45deg)' }} />
                  </button>
                </div>
              </div>

              <div className="mobile-nav-footer-new">
                <div className="mobile-socials-new">
                  <span className="meta-label-new">PROFILS &amp; CONTACT</span>
                  <div className="social-links-row">
                    <a href="https://www.linkedin.com/in/dafia-s-860290218/" target="_blank" rel="noopener noreferrer me">LINKEDIN</a>
                    <a href="https://github.com/shalomtalesman" target="_blank" rel="noopener noreferrer me">GITHUB</a>
                    <a href="https://www.behance.net/shalomsacca" target="_blank" rel="noopener noreferrer me">BEHANCE</a>
                    <a href="mailto:dafiashalom@gmail.com" rel="me" itemProp="email">EMAIL</a>
                  </div>
                </div>
                <div className="mobile-copyright-new">
                  <p>© 2026 SACCA DAFIA. ALL RIGHTS RESERVED.</p>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}

      {currentView === 'cv' && <CVView setCurrentView={setCurrentView} />}
      {currentView === 'projects' && (
        <ProjectsView 
          projects={projects} 
          setCurrentView={setCurrentView} 
          setPreviousView={setPreviousView} 
          t={t} 
          lang={lang} 
        />
      )}
      {currentView !== 'home' && currentView !== 'cv' && currentView !== 'projects' && (
        <CaseStudy 
          id={currentView as any} 
          mousePos={mousePos} 
          setCurrentView={setCurrentView} 
          onBack={() => {
            const targetSection = (currentView === 'ehadj' || currentView === 'asset-iq') ? 'saas' : 'projects';
            handleNavClick(targetSection);
          }} 
          lang={lang}
        />
      )}
      {currentView === 'home' && (
        <main id="main-content" className="main-content" role="main">
          <div className="app anim-fade-in">
            {/* Hero Section */}
            <section id="home" className="hero-premium" style={{ 
              '--mouse-x': `${mousePos.x}%`, 
              '--mouse-y': `${mousePos.y}%` 
            } as any}>
              <div className="hero-portrait-container">
                {/* Profile Portrait */}
                <div className="hero-portrait-parallax-wrapper" style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: 'inherit' }}>
                  <motion.img 
                    src="/imgs/hero_image.png" 
                    alt="Sacca Dafia Profile" 
                    className="hero-portrait-img"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>

                {/* Bottom Green Glow */}
                <div className="hero-glow-green" />

                {/* Sketch Arrow and Text */}
                <motion.div 
                  className="sketch-arrow-wrapper"
                  initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                >
                  <span className="sketch-arrow-text">
                    {lang === 'fr' ? 'Concevons votre prochain produit !' : "Let's design your next product!"}
                  </span>
                  <svg className="sketch-arrow-svg" viewBox="0 0 100 60">
                    <motion.path 
                      d="M10,10 C40,20 60,10 90,30 M90,30 L80,20 M90,30 L85,42" 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 1.0, ease: "easeInOut" }}
                      stroke="#111111"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.div>

                {/* Bio text overlay & Recruiter Presentation */}
                <div className="hero-greeting-overlay">
                  <motion.h1 
                    className="hero-greeting-text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    {lang === 'fr' ? "Je suis SACCA Dafia, Designer de Solutions & Produits Numériques." : "I'm SACCA Dafia, a Digital Solution & Product Designer."}
                  </motion.h1>
                  <motion.p
                    className="hero-presentation-desc"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    {lang === 'fr' 
                      ? "Spécialisé dans la conception de solutions digitales sur mesure, de produits numériques complets et de plateformes SaaS B2B intuitives et performantes."
                      : "Specialized in designing tailored digital solutions, complete digital products, and intuitive B2B SaaS platforms."}
                  </motion.p>
                  <motion.div
                    className="hero-contact-actions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <a href="mailto:dafiashalom@gmail.com" className="hero-cta-contact-btn" rel="me" itemProp="email" title="Me contacter par Email">
                      <Mail size={16} />
                      <span>dafiashalom@gmail.com</span>
                    </a>
                    <a href="https://www.linkedin.com/in/dafia-s-860290218/" target="_blank" rel="noopener noreferrer me" itemProp="sameAs" className="hero-cta-profile-btn" title="Voir mon profil LinkedIn">
                      <Linkedin size={16} />
                      <span>LinkedIn</span>
                    </a>
                    <button onClick={openCalendly} className="hero-cta-call-btn" title="Réserver un appel">
                      <Calendar size={16} />
                      <span>{t.contact.bookCall}</span>
                    </button>
                  </motion.div>
                </div>

                {/* Scroll Down Indicator */}
                <motion.div 
                  className="scroll-down-indicator"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  <span className="scroll-text">
                    {lang === 'fr' ? 'Défiler' : 'Scroll'}
                  </span>
                  <div className="scroll-mouse">
                    <div className="scroll-wheel" />
                  </div>
                </motion.div>
              </div>
            </section>

      {/* About Section */}
      <section id="about" className="about-pentos">
        {/* Illustration decorations – About */}
        <IlluOrb className="illu-about-orb" />
        <div className="container about-container-pentos">
          <div className="about-header-pentos">
            <div className="about-header-left">

              <motion.h2 
                className="about-title-pentos gsap-reveal-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {t.about.title}
              </motion.h2>
            </div>
            
            <div className="about-chevron-wrapper">
              <svg viewBox="0 0 100 100" className="about-chevron-icon" fill="var(--pentos-lime)">
                <polygon points="20,20 70,20 90,40 40,40" />
                <polygon points="10,50 60,50 80,70 30,70" />
              </svg>
            </div>
          </div>
          
          <div className="about-editorial-sheet">
            {/* Column 1: Profile & Bio */}
            <div className="sheet-col sheet-col-profile">
              <div className="sheet-profile-container">
                <img 
                  src="/imgs/hero_image.png" 
                  alt="Sacca Dafia Profile" 
                  className="sheet-profile-img" 
                />
              </div>
              <div className="sheet-bio-wrapper">
                <span className="sheet-label">01 // {lang === 'en' ? 'IDENTITY' : 'IDENTITÉ'}</span>
                <h3 className="sheet-headline">{lang === 'en' ? 'Web & Product Designer' : 'Designer Web & Produit'}</h3>
                <p className="sheet-text">{t.about.bio}</p>
                <div style={{ marginTop: '24px' }}>
                  <motion.a 
                    href="https://drive.google.com/file/d/14q3ARxXM3rk82VKS6dKYmyGJCk9UWruu/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-cv-btn"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Download size={14} />
                    <span>{lang === 'en' ? 'Download CV' : 'Télécharger CV'}</span>
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Column 2: Approach & Stack */}
            <div className="sheet-col sheet-col-approach">
              <div className="sheet-approach-wrapper">
                <span className="sheet-label">02 // {lang === 'en' ? 'PHILOSOPHY' : 'PHILOSOPHIE'}</span>
                <h3 className="sheet-headline">{lang === 'en' ? 'Method & Clarity' : 'Méthode & Clarté'}</h3>
                <p className="sheet-text">{t.about.approach}</p>
              </div>
              <div className="sheet-approach-illu">
                <BentoIconApproach />
              </div>
              <div className="sheet-stack-wrapper">
                <span className="sheet-label">03 // {lang === 'en' ? 'CORE TOOLBOX' : 'BOÎTE À OUTILS'}</span>
                <div className="sheet-stack-list">
                  <span className="sheet-stack-item notranslate" translate="no">Figma</span>
                  <span className="sheet-stack-item notranslate" translate="no">Antigravity</span>
                  <span className="sheet-stack-item notranslate" translate="no">Notion</span>
                  <span className="sheet-stack-item notranslate" translate="no">Linear</span>
                  <span className="sheet-stack-item notranslate" translate="no">Framer</span>
                </div>
              </div>
            </div>

            {/* Column 3: Metrics & Creative Illustration */}
            <div className="sheet-col sheet-col-metrics">
              <div className="sheet-metrics-wrapper">
                <span className="sheet-label">04 // {lang === 'en' ? 'METRICS' : 'CHIFFRES'}</span>
                <div className="sheet-metrics-list">
                  <div className="sheet-metric-item">
                    <span className="sheet-metric-val notranslate" translate="no">+4</span>
                    <span className="sheet-metric-lbl">{lang === 'en' ? 'Years of Experience' : "Ans d'expérience"}</span>
                  </div>
                  <div className="sheet-metric-item">
                    <span className="sheet-metric-val notranslate" translate="no">+50</span>
                    <span className="sheet-metric-lbl">{lang === 'en' ? 'Projects Delivered' : 'Projets livrés'}</span>
                  </div>
                  <div className="sheet-metric-item">
                    <span className="sheet-metric-val notranslate" translate="no">+15</span>
                    <span className="sheet-metric-lbl">{lang === 'en' ? 'Clients Supported' : 'Clients accompagnés'}</span>
                  </div>
                </div>
              </div>
              
              <div className="sheet-art-wrapper">
                <BentoIconBio />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section-dznr">
        <div className="container">
          <div className="services-header-dznr">
            <motion.h2 
              className="services-title-dznr"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {t.services.title}
            </motion.h2>
          </div>
          
          <div className="services-grid-dznr">
            {t.services.items.map((service : any, index : number) => (
              <div 
                key={service.id}
                className={`service-card-dznr ${index === 0 ? 'featured-card' : ''}`}
              >
                <div className="service-card-content-dznr">
                  <h3 className="service-card-title-dznr">
                    {(() => {
                      const words = service.title.split(' ');
                      if (words.length <= 1) return service.title;
                      const lastWord = words[words.length - 1];
                      const rest = words.slice(0, words.length - 1).join(' ');
                      return (
                        <>
                          {rest} <span className="highlight-green">{lastWord}</span>
                        </>
                      );
                    })()}
                  </h3>
                  
                  <p className="service-card-desc-dznr">{service.desc}</p>
                  
                  <div className="service-card-tags-dznr">
                    {service.tags.map((tag: string) => (
                      <span key={tag} className="service-card-tag-pill-dznr">{tag}</span>
                    ))}
                  </div>

                  <button 
                    className="service-card-btn-dznr"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <span>{serviceButtonLabels[lang][index]}</span>
                    <ArrowRight size={16} className="service-card-btn-arrow-dznr" />
                  </button>
                </div>

                <div className="service-card-graphic-dznr">
                  {(() => {
                    const Icon = serviceIcons[index];
                    return <Icon />;
                  })()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience-section-new" style={{ 
        '--mouse-x': `${mousePos.x}%`, 
        '--mouse-y': `${mousePos.y}%` 
      } as any}>
        <div className="experience-gradient-overlay"></div>
        {/* Illustration decorations – Experience */}
        <IlluShape className="illu-exp-shape" />
        <IlluStar className="illu-exp-star" />
        <div className="container experience-container-new">
          <div className="experience-header-new">

            <motion.h2 
              className="gsap-reveal-title"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {t.experience.title}
            </motion.h2>
          </div>
          
          <div className="experience-interactive-tabs-container">
            {/* Left Column: Tab Buttons */}
            <div className="exp-tabs-column">
              {t.experience.items.map((exp: any, index: number) => (
                <button
                  key={index}
                  className={`exp-tab-button ${activeExpIndex === index ? 'active' : ''}`}
                  onClick={() => setActiveExpIndex(index)}
                >
                  {activeExpIndex === index && (
                    <motion.div
                      layoutId="activeExpTabPill"
                      className="exp-tab-active-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="exp-tab-number">0{index + 1}</span>
                  <span className="exp-tab-company">{exp.company}</span>
                </button>
              ))}
            </div>

            {/* Right Column: Animated Details Panel */}
            <div className="exp-content-column">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeExpIndex}
                  className="exp-content-panel"
                  initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="exp-panel-glow" />
                  <div className="exp-panel-header">
                    <span className="exp-panel-date">{t.experience.items[activeExpIndex].date}</span>
                    <h3 className="exp-panel-role">
                      {t.experience.items[activeExpIndex].role}
                    </h3>
                  </div>

                  <p className="exp-panel-desc">{t.experience.items[activeExpIndex].desc}</p>

                  <div className="exp-panel-footer">
                    <span className="exp-panel-tag-label">Key Focus & Skills</span>
                    <div className="exp-panel-skills">
                      {t.experience.items[activeExpIndex].skills.map((skill: string, idx: number) => (
                        <motion.span
                          key={skill}
                          className="exp-panel-skill-tag"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 + 0.1, duration: 0.3 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Produits & SaaS Section */}
      <section id="saas" className="saas-section-new" style={{ 
        '--mouse-x': `${mousePos.x}%`, 
        '--mouse-y': `${mousePos.y}%` 
      } as any}>
        <div className="saas-gradient-overlay"></div>
        {/* Illustration decorations – SaaS */}
        <IlluOrb className="illu-saas-orb" />
        <IlluStar className="illu-saas-star" />
        <div className="saas-container-new">

          {/* Top header bar */}
          <div className="saas-top-bar">
            <span className="saas-eyebrow">05 / Focus</span>
            <motion.h2 
              className="saas-section-title gsap-reveal-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Produits &amp; <span className="highlight">SaaS.</span>
            </motion.h2>
          </div>

          {/* Showcase grid cards */}
          <div className="saas-showcase-container">
            {[
              {
                id: 'ehadj',
                index: '01',
                label: 'Process Orchestration',
                title: 'eHadj',
                year: '2026',
                role: lang === 'en' ? 'Lead Product Designer' : 'Lead Product Designer',
                metrics: lang === 'en' 
                  ? ['+45% scheduling efficiency', 'Centralized booking flow', 'Real-time sync']
                  : ['+45% d\'efficacité logistique', 'Flux de réservation centralisé', 'Synchro en temps réel'],
                tags: ['UX Design', 'Product Strategy', 'B2B SaaS'],
                desc: lang === 'en'
                  ? 'Digitalisation of pilgrimage organisation: registrations, logistics, transport and centralised financial flows.'
                  : 'Digitalisation de l\'organisation du pèlerinage : inscriptions, logistique, transports et flux financiers centralisés.',
                image: '/imgs/ehadj/cover_Ehadj.jpg',
                mockup: '/imgs/ehadj/cover_Ehadj.jpg',
                color: '#eeede4',
                view: 'ehadj'
              },
              {
                id: 'asset-iq',
                index: '02',
                label: 'Product Design & Strategy',
                title: 'Asset IQ',
                year: '2026',
                role: lang === 'en' ? 'Product & UX Strategist' : 'Stratégiste Produit & UX',
                metrics: lang === 'en'
                  ? ['30% downtime reduction', 'Automated resource audit', 'Real-time telemetry']
                  : ['-30% de temps d\'arrêt', 'Audit automatisé des ressources', 'Télémétrie en temps réel'],
                tags: ['Product Design', 'UX Strategy', 'Dashboard'],
                desc: lang === 'en'
                  ? 'Intelligent system for tracking and operational governance of physical resources across multi-site infrastructures.'
                  : 'Système intelligent de suivi et de gouvernance opérationnelle des ressources physiques.',
                image: '/imgs/assetiQ/cover_Asset.jpg',
                mockup: '/imgs/assetiQ/cover_Asset.jpg',
                color: '#A855F7',
                view: 'asset-iq'
              },
              {
                id: 'beans',
                index: '03',
                label: 'Loyalty & Customer Engagement',
                title: 'Beans',
                year: '2024 - 2025',
                role: lang === 'en' ? 'Integration Lead Project Manager & Product Designer' : 'Chef de Projet Intégrations & Lead Designer',
                metrics: lang === 'en'
                  ? ['Competitor Analysis & PRDs', 'Feature Visuals & UX Flow', 'Dev Supervision & QA Testing']
                  : ['Competitor Analysis & PRDs', 'Feature Images & Design UX', 'Supervision Dev & QA Testing'],
                tags: ['Project Management', 'PRD & Specs', 'QA & Dev Lead', 'Feature Images'],
                desc: lang === 'en'
                  ? 'End-to-end management of Beans Integration Hub: competitor analysis, writing PRDs, designing feature images, supervising engineering dev teams, and leading Quality Assurance (QA).'
                  : 'Pilotage de bout en bout du pôle d\'intégrations Beans : analyse concurrentielle, rédaction des PRD, design des feature images, supervision dev et Quality Assurance (QA).',
                image: '/imgs/beans_cover.png',
                mockup: '/imgs/beans_cover.png',
                color: '#F59E0B',
                view: 'beans'
              }
            ].map((product, index) => (
              <motion.a
                key={product.id}
                href={`#${product.view}`}
                className="saas-showcase-card"
                style={{ textDecoration: 'none', color: 'inherit' }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.15, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                onClick={(e) => { e.preventDefault(); setCurrentView(product.view as any); }}
              >
                {/* Glowing spot background */}
                <div className="saas-card-glow" style={{ '--accent-glow': product.color } as any} />
                
                {/* Left side: details */}
                <div className="saas-card-left">
                  <div className="saas-card-meta">
                    <span className="saas-card-index">{product.index}</span>
                    <span className="saas-card-label">{product.label}</span>
                    <span className="saas-card-year">{product.year}</span>
                  </div>

                  <h3 className="saas-card-title">{product.title}</h3>
                  <div className="saas-card-role">
                    <span className="role-label">{lang === 'en' ? 'Role:' : 'Rôle :'}</span>
                    <span className="role-val">{product.role}</span>
                  </div>

                  <p className="saas-card-desc">{product.desc}</p>

                  <div className="saas-card-metrics">
                    {product.metrics.map((metric, i) => (
                      <div key={i} className="saas-metric-item">
                        <span className="metric-dot" style={{ backgroundColor: product.color }} />
                        <span className="metric-text">{metric}</span>
                      </div>
                    ))}
                  </div>

                  <div className="saas-card-tags">
                    {product.tags.map(tag => (
                      <span key={tag} className="saas-card-tag">{tag}</span>
                    ))}
                  </div>

                  <div className="saas-card-cta">
                    <span className="saas-cta-text">
                      {lang === 'en' ? 'View Case Study' : "Voir l'étude"}
                    </span>
                    <div className="saas-cta-arrow" style={{ backgroundColor: product.color }}>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>

                {/* Right side: Mockup */}
                <div className="saas-card-right">
                  <div className="browser-mockup">
                    <div className="browser-header">
                      <div className="browser-dots">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                      </div>
                      <div className="browser-address">
                        <span className="address-protocol">https://</span>
                        <span className="address-url">{product.title.toLowerCase()}.design</span>
                      </div>
                    </div>
                    <div className="browser-body">
                      <img src={product.mockup} alt={`${product.title} Mockup`} loading="lazy" />
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section-dznr" style={{ 
        '--mouse-x': `${mousePos.x}%`, 
        '--mouse-y': `${mousePos.y}%` 
      } as any}>
        <div className="container">
          <div className="projects-header-dznr">
            <motion.h2 
              className="projects-title-dznr"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {t.projects.title}
            </motion.h2>
          </div>

          <div className="projects-grid-dznr">
            {(() => {
              const homepageIds = ['dolce-riviera', 'vortex', 'sport-advisor', 'tavares'];
              const homepageProjects = homepageIds
                .map(id => projects.find((p: any) => p.id === id))
                .filter(Boolean) as any[];

              return homepageProjects.map((project: any, i: number) => (
                <div 
                  key={project.id}
                  className="project-card-dznr"
                >
                  {/* 1. Image Showcase Container */}
                  <div 
                    className="project-card-image-wrapper"
                    onClick={() => {
                      setPreviousView('home');
                      setCurrentView(project.id);
                    }}
                  >
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="project-card-image" 
                    />
                    <div className="project-card-overlay-dznr" />
                    
                    {/* Floating Category Tag */}
                    <span className="project-card-category-tag">{project.category}</span>
                  </div>
                  
                  {/* 2. Detailed Metadata & Content Container */}
                  <div className="project-card-info-dznr">
                    <div className="project-card-meta-row">
                      <span className="project-card-index">0{i + 1} /</span>
                      <span className="project-card-role">{project.role}</span>
                    </div>
                    
                    <h3 
                      className="project-card-title-detailed"
                      onClick={() => {
                        setPreviousView('home');
                        setCurrentView(project.id);
                      }}
                    >
                      {project.title}
                    </h3>
                    
                    <p className="project-card-desc-detailed">
                      {project.description}
                    </p>
                    
                    {/* Tech stack pills */}
                    <div className="project-card-tech-pills">
                      {project.techs.map((tech: string) => (
                        <span key={tech} className="project-card-tech-pill">{tech}</span>
                      ))}
                    </div>
                    
                    {/* Interactive Action Footer */}
                    <div className="project-card-actions">
                      <a 
                        href={`#${project.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setPreviousView('home');
                          setCurrentView(project.id);
                        }}
                        className="project-action-btn-primary"
                        style={{ textDecoration: 'none' }}
                      >
                        {t.projects.viewCaseStudy}
                        <ArrowRight size={16} />
                      </a>
                      
                      {project.link && project.link !== '#' && (
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-action-link-secondary"
                        >
                          {project.linkType === 'behance' ? t.projects.viewProject : t.projects.visitSite}
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ));
            })()}
          </div>

          {/* See More Button */}
          <div className="projects-see-more-container">
            <motion.button
              className="projects-see-more-btn"
              onClick={() => {
                setCurrentView('projects');
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.4 }}
            >
              <span>{t.projects.seeMore}</span>
              <ArrowRight size={16} />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="methodology-section-new" style={{ 
        '--mouse-x': `${mousePos.x}%`, 
        '--mouse-y': `${mousePos.y}%` 
      } as any}>
        <div className="methodology-gradient-overlay"></div>
        {/* Illustration decorations – Process */}
        <IlluShape className="illu-process-shape" />
        <IlluOrb className="illu-process-orb" />
        <IlluStar className="illu-process-star" />
        
        <div className="container methodology-container-new">
          <div className="methodology-header-new">
            <motion.h2 
              className="gsap-reveal-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t.process.title}
            </motion.h2>
          </div>

          <div className="methodology-dashboard-new">
            {/* Left Column: List of Steps */}
            <div className="methodology-nav-new">
              {t.process.items.map((step: any, i: number) => {
                const isActive = activeProcessStep === i;
                return (
                  <motion.div
                    key={i}
                    className={`methodology-nav-item-new ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveProcessStep(i)}
                    onMouseEnter={() => setActiveProcessStep(i)}
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="nav-item-num-new">{step.num}</div>
                    <div className="nav-item-meta-new">
                      <h4>{step.title}</h4>
                    </div>
                    {isActive && (
                      <motion.div 
                        className="nav-active-bar-new"
                        layoutId="activeProcessBar"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Right Column: Active Step Details Panel */}
            <div className="methodology-panel-new">
              <div className="methodology-panel-bg-new"></div>
              
              {(() => {
                const currentStep = t.process.items[activeProcessStep] as any;
                const stepTags = [
                  ['Market Audit', 'Competitor Flows', 'Benchmark'],
                  ['UX Audit', 'Friction Mapping', 'User Feedback'],
                  ['Sitemaps', 'Info Architecture', 'Flow Diagrams'],
                  ['Figma Prototypes', 'Design Systems', 'Accessibility'],
                  ['Implementation review', 'Pixel QA', 'Code alignment']
                ][activeProcessStep] || [];

                return (
                  <motion.div
                    key={activeProcessStep}
                    className="methodology-panel-content-new"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="panel-header-new">
                      <span className="panel-tag-new">0{activeProcessStep + 1} / METHODOLOGY</span>
                    </div>

                    <h3 className="panel-title-new">{currentStep.title}</h3>
                    <p className="panel-desc-new">{currentStep.desc}</p>

                    {/* Step illustration */}
                    <div className="panel-visual-new">
                      {activeProcessStep === 0 && (
                        <div className="visual-analysis-new">
                          <div className="visual-row-new visual-header-new">
                            <span>COMPETITOR</span>
                            <span>FLOWS</span>
                            <span>SCORE</span>
                          </div>
                          <div className="visual-row-new">
                            <span>SaaS Platform A</span>
                            <span className="visual-progress-line-new"><span style={{ width: '60%' }}></span></span>
                            <span className="visual-score-new text-red">60%</span>
                          </div>
                          <div className="visual-row-new active">
                            <span>My Optimized Architecture</span>
                            <span className="visual-progress-line-new active"><span style={{ width: '94%' }}></span></span>
                            <span className="visual-score-new text-green">94%</span>
                          </div>
                        </div>
                      )}
                      
                      {activeProcessStep === 1 && (
                        <div className="visual-audit-new">
                          <div className="visual-node-new bad">
                            <span className="visual-node-icon-new">✕</span>
                            <div className="visual-node-text-new">
                              <strong>Usability Friction</strong>
                              <span>4-step complex form flow</span>
                            </div>
                          </div>
                          <div className="visual-node-arrow-new">↓</div>
                          <div className="visual-node-new good">
                            <span className="visual-node-icon-new">✓</span>
                            <div className="visual-node-text-new">
                              <strong>UX Optimization</strong>
                              <span>Single page multi-step stepper</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeProcessStep === 2 && (
                        <div className="visual-ia-new">
                          <div className="ia-card-node-new root">Dashboard</div>
                          <div className="ia-card-branches-new">
                            <div className="ia-card-node-new">Analytics</div>
                            <div className="ia-card-node-new">Access Control</div>
                            <div className="ia-card-node-new">Settings</div>
                          </div>
                        </div>
                      )}

                      {activeProcessStep === 3 && (
                        <div className="visual-ui-new">
                          <div className="ui-header-bar-new">
                            <span className="ui-dot-new"></span>
                            <span className="ui-dot-new"></span>
                            <span className="ui-dot-new"></span>
                          </div>
                          <div className="ui-body-mockup-new">
                            <div className="ui-card-mockup-new">
                              <span className="ui-avatar-mockup-new"></span>
                              <span className="ui-text-mockup-new"></span>
                            </div>
                            <div className="ui-system-lines-new">
                              <span className="sys-line-new select">Button // Primary</span>
                              <span className="sys-line-new token">#0d3479</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeProcessStep === 4 && (
                        <div className="visual-qa-new">
                          <div className="qa-terminal-header-new">RECETTE QA TERMINAL</div>
                          <div className="qa-terminal-body-new">
                            <span className="qa-log-line-new pass">[PASS] Layout container width matches 1400px specification</span>
                            <span className="qa-log-line-new pass">[PASS] Typography sizing fluid clamp checks completed</span>
                            <span className="qa-log-line-new warn">[WARN] Accessibility color contrast check passed (AAA)</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Step Tags */}
                    <div className="panel-tags-new">
                      {stepTags.map((tag: string, index: number) => (
                        <span key={index} className="panel-skill-tag-new">{tag}</span>
                      ))}
                    </div>
                  </motion.div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

            {/* Contact Section */}
      <section id="contact" className="contact-section-new" style={{ 
        '--mouse-x': `${mousePos.x}%`, 
        '--mouse-y': `${mousePos.y}%` 
      } as any}>
        <div className="contact-gradient-overlay"></div>
        {/* Illustration decorations – Contact */}
        <IlluStar className="illu-contact-star" />
        <IlluShape className="illu-contact-shape" />
        <div className="container contact-container-new">
          <div className="contact-header-new">

            <motion.h2 
              className="contact-title-large gsap-reveal-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t.contact.title}
            </motion.h2>
          </div>
          
          <div className="contact-grid-new">
            <div className="book-card-premium magnetic-button" onClick={openCalendly}>
              <div className="book-card-left">
                <div className="book-icon-wrapper">
                  <Calendar size={24} />
                </div>
                <h3>{t.contact.bookCall}</h3>
                <p>{t.contact.subtitle}</p>
              </div>
              <div className="book-card-right">
                <div className="book-cta-circle">
                  <ArrowRight size={40} style={{ transform: 'rotate(-45deg)' }} />
                </div>
              </div>
            </div>

            <div className="contact-info-new">
              <div className="availability-row">
                <span className="dot"></span>
                <span className="availability-text">{t.contact.availability}</span>
              </div>
              <div className="email-wrapper-new">
                <p>{t.contact.emailText}</p>
                <a href="mailto:dafiashalom@gmail.com" className="email-link-huge">
                  dafiashalom@gmail.com 
                </a>
              </div>
            </div>
          </div>

          <footer className="footer-bottom-bar" role="contentinfo">
            <div className="footer-bottom-left">
              <span className="footer-brand-logo">SACCA DAFIA.</span>
              <div className="social-simple-links">
                <a href="https://www.linkedin.com/in/dafia-s-860290218/" target="_blank" rel="noopener noreferrer me" title="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href="https://github.com/shalomtalesman" target="_blank" rel="noopener noreferrer me" title="GitHub">
                  <Github size={20} />
                </a>
                <a href="https://www.behance.net/shalomsacca" target="_blank" rel="noopener noreferrer me" className="social-icon" title="Behance">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.011.022 3.038-2.998.05-3.016z"/>
                  </svg>
                </a>
                <a href="mailto:dafiashalom@gmail.com" rel="me" itemProp="email" title="Me contacter par Email">
                  <Mail size={20} />
                </a>
              </div>
            </div>
            
            <div className="footer-bottom-right">
              <nav className="footer-nav-simple" aria-label="Navigation secondaire de pied de page">
                <a href="#projects" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}>{t.nav.projects}</a>
                <a href="#experience" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
                }}>{t.nav.experience}</a>
                <a href="#about" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                }}>{t.nav.about}</a>
                <a href="mailto:dafiashalom@gmail.com" rel="me">Contact</a>
              </nav>
              <span className="copyright">© 2026 Sacca Dafia. {t.contact.rights}</span>
            </div>
          </footer>
        </div>
      </section>
        </div>
      </main>
      )}
    </>
  );
}

export default App;
