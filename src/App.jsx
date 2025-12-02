import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Check, 
  X, 
  ChevronRight, 
  Instagram, 
  Twitter, 
  Mail, 
  Phone, 
  Zap, 
  Film, 
  TrendingUp,
  Cpu,
  Layers,
  Youtube,
  Linkedin,
  Image as ImageIcon,
  AlertCircle
} from 'lucide-react';

/**
 * Motion Spear - Cinematic Web Experience
 * * Tech Stack: React, Tailwind CSS (via CDN in environment), Lucide React
 * Design System: Dark Mode, Glassmorphism, Faux-PBR materials, Cerulean Blue accents
 */

// --- CENTRALIZED TEXT CONTENT ---
// ! EDIT THIS OBJECT TO CHANGE WEBSITE TEXT
const SITE_CONTENT = {
  brandName: {
    main: "Motion",
    accent: "Spear",
    // ! REPLACE THIS URL WITH YOUR UPLOADED LOGO URL
    logo: "https://placehold.co/100x100/000000/0ea5e9?text=LOGO" 
  },
  hero: {
    titleLine1: "PIERCE THE",
    titleLine2: "NOISE",
    subtitle: "We forge visuals that don't just exist—they impact. Ultra-high fidelity motion design, editing, and 3D visualization tailored to cut through the digital clutter.",
    ctaPrimary: "Calculate Your Impact",
    ctaSecondary: "View Work"
  },
  calculator: {
    title: "Service Configuration",
    subtitle: "Select components to build your visual package.",
    meterTitle: "Impact Estimator",
    marketStandardLabel: "Market Standard",
    ourRateLabel: "Motion Spear Rate",
    lockPriceBtn: "Lock In Price",
    disclaimer: "*Estimated timeline varies based on complexity.",
    // New Modal Content
    lockPriceModal: {
      title: "Secure Your Quote",
      emailPlaceholder: "Enter your email address",
      checkboxLabel: "Receive member-only discounts! & time-saving resources.",
      submitBtn: "Proceed to Final Step",
      successMessage: "Redirecting to secure form..."
    },
    validationMessage: "Customize your service bundle",
    
    // ! GOOGLE FORM CONFIGURATION
    // 1. Create a Google Form with fields for: Email, Service Details, and Total Price.
    // 2. Use "Get pre-filled link" to find the entry IDs for each field.
    googleForm: {
      // The base URL of your form (ends in viewform)
      baseUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdSKNLuEvhedkx7fec4rgH7MVR6ckCL1GfTdOQcJSoUTHKHiA/viewform?usp=dialog",
      
      // The ID for the "Email" field (e.g., entry.10452367)
      emailEntryId: "entry.460318052", 
      
      // The ID for the "Service Details" paragraph field
      servicesEntryId: "entry.628554625",
      
      // The ID for the "Total Price" short answer field
      totalEntryId: "entry.2062846459"
    }
  },
  about: {
    title: "Origin of the Spear",
    storyParagraph1: "Motion Spear was forged in the void between sterile corporate design and chaotic artistic expression. We realized the digital landscape was becoming noisy, cluttered, and indistinct.",
    missionLabel: "Our Mission:",
    missionText: "To provide a weapon of mass attention. We don't just edit videos or design graphics; we engineer visual experiences that pierce through the scroll-fatigue of the modern web.",
    founderTitle: "The Founder",
    founderQuote: "\"I started Motion Spear because I was tired of seeing brilliant brands vanish in the background. We bring the foreground to you.\"",
    estDate: "EST. 2024",
    vanguardTitle: "We Are",
    vanguardSubtitle: "The Vanguard",
    features: [
      { icon: Zap, label: "Speed", desc: "Rapid Delivery" },
      { icon: Layers, label: "Depth", desc: "Multi-Layered" },
      { icon: Cpu, label: "Tech", desc: "Next-Gen Tools" }
    ]
  },
  portfolio: {
    title: "Selected Works"
  },
  contact: {
    title: "Ready to Strike?",
    subtitle: "The digital world is waiting. Let's create something that cannot be ignored.",
    emailLabel: "Email Us",
    phoneLabel: "Call Us",
    followLabel: "Follow Us",
    footerText: "Forged in the Digital Void.",
    copyright: "© 2024 Motion Spear. All Rights Reserved."
  }
};

// --- Configuration & Data ---

const SOCIAL_LINKS = {
  // ! UPDATED EMAIL ADDRESS
  email: "mailto:motionspear2019@gmail.com",
  phone: "tel:+15550000000",
  instagram: "https://www.instagram.com/motion.spear/",
  twitter: "https://twitter.com/motionspear",
  youtube: "https://www.youtube.com/@artistonsteroids343",
  linkedin: "https://www.linkedin.com/in/yuvraj-singh-384b20197/",
  displayPhone: "+91 6264243228",
  // ! UPDATED DISPLAY EMAIL
  displayEmail: "motionspear2019@gmail.com",
  displayHandle: "@motionspear"
};

const SERVICES_DATA = [
  { id: 1, name: 'High-End Thumbnails', category: 'Graphic', rate: 45, standardRate: 80, unit: 'per thumbnial' },
  { id: 2, name: 'Short Form Edits', category: 'Video', rate: 60, standardRate: 120, unit: 'per video' },
  { id: 3, name: 'Long Explainer Videos', category: 'Video', rate: 500, standardRate: 600, unit: 'per video' },
  { id: 4, name: 'Documentary Style', category: 'Video', rate: 800, standardRate: 900, unit: 'for 15 min' },
  { id: 5, name: '3D Product Visualization', category: '3D', rate: 800, standardRate: 1500, unit: 'project' },
  { id: 6, name: 'Animated Product Ads', category: 'Animation', rate: 450, standardRate: 850, unit: 'per ad' },
  { id: 7, name: 'Brand Promo Videos', category: 'Video', rate: 600, standardRate: 1100, unit: 'for 2 min' },
  { id: 8, name: 'Social Media Posts', category: 'Graphic', rate: 35, standardRate: 70, unit: 'per post' },
];

const PORTFOLIO_CATEGORIES = [
  "All",
  "Thumbnails", 
  "Short Form", 
  "Explainer Videos", 
  "Documentary Style Edits", 
  "3D Product Visualizations", 
  "Animated Product Ads", 
  "Promotional", 
  "Social Posts"
];

const PORTFOLIO_ITEMS = [
  { 
    id: 1, 
    title: 'Neon Cyberpunk City', 
    category: '3D Product Visualizations', 
    type: 'video',
    img: 'https://images.unsplash.com/photo-1615840287214-7ff58ee0489b?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 2, 
    title: 'Eco-Future Documentary', 
    category: 'Documentary Style Edits', 
    type: 'video',
    img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 3, 
    title: 'Viral Tech Review', 
    category: 'Thumbnails', 
    type: 'image',
    img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 4, 
    title: 'Crypto Explainer', 
    category: 'Explainer Videos', 
    type: 'video',
    img: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 5, 
    title: 'Luxury Watch Ad', 
    category: 'Animated Product Ads', 
    type: 'video',
    img: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 6, 
    title: 'Sneaker Drop Promo', 
    category: 'Promotional', 
    type: 'image',
    img: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800' 
  },
];

// --- Animation Components ---

const Reveal = ({ children, className = "", delay = 0, threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 cubic-bezier(0.17, 0.55, 0.55, 1) ${
        isVisible 
          ? 'opacity-100 translate-y-0 blur-0' 
          : 'opacity-0 translate-y-12 blur-sm'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2 group cursor-pointer">
        {/* Replaced CSS shape with Logo Image Placeholder */}
        <img 
          src={SITE_CONTENT.brandName.logo} 
          alt="Motion Spear Logo" 
          className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(14,165,233,0.5)] group-hover:scale-110 transition-transform duration-300"
        />
        <span className="text-2xl font-bold tracking-tighter text-white uppercase ml-3">
          {SITE_CONTENT.brandName.main}<span className="text-sky-400">{SITE_CONTENT.brandName.accent}</span>
        </span>
      </div>
      <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300 tracking-widest uppercase">
        {[
          { label: SITE_CONTENT.calculator.title, href: '#calculator' },
          { label: 'Portfolio', href: '#portfolio' },
          { label: 'About', href: '#about' },
          { label: 'Contact', href: '#contact' }
        ].map((item) => (
          <a key={item.label} href={item.href} className="hover:text-sky-400 transition-colors duration-300">
            {item.label}
          </a>
        ))}
      </div>
      <a href="#calculator" className="bg-white/10 hover:bg-sky-500 hover:text-black border border-white/20 px-6 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 backdrop-blur-sm">
        Start Project
      </a>
    </div>
  </nav>
);

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[4s]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-sky-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
      </div>

      <div className="relative z-10 text-center max-w-5xl px-6">
        <Reveal>
          {/* Hero text maintains heavy dark drop-shadow as requested previously */}
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 tracking-tighter mb-6 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            {SITE_CONTENT.hero.titleLine1} <br /> {SITE_CONTENT.hero.titleLine2}
          </h1>
        </Reveal>
        
        <Reveal delay={200}>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            {SITE_CONTENT.hero.subtitle}
          </p>
        </Reveal>
        
        <Reveal delay={400}>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <a href="#calculator" className="group relative px-8 py-4 bg-sky-500 text-black font-bold uppercase tracking-widest overflow-hidden rounded-sm transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(14,165,233,0.6)]">
              <span className="relative z-10 flex items-center gap-2">
                {SITE_CONTENT.hero.ctaPrimary} <ChevronRight size={18} />
              </span>
              <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12"></div>
            </a>
            <a href="#portfolio" className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/5 hover:border-white/40 transition-all rounded-sm backdrop-blur-md">
              {SITE_CONTENT.hero.ctaSecondary}
            </a>
          </div>
        </Reveal>
      </div>

      {/* Hero Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
    </section>
  );
};

const Calculator = () => {
  const [selectedServices, setSelectedServices] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isToastFading, setIsToastFading] = useState(false);
  const [email, setEmail] = useState("");
  const [isOptedIn, setIsOptedIn] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleToggle = (id) => {
    setSelectedServices(prev => {
      if (prev[id]) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: 1 };
    });
  };

  const handleQuantityChange = (id, delta) => {
    setSelectedServices(prev => {
      const current = prev[id] || 0;
      const newVal = Math.max(1, current + delta);
      return { ...prev, [id]: newVal };
    });
  };

  const totalCost = Object.entries(selectedServices).reduce((acc, [id, qty]) => {
    const service = SERVICES_DATA.find(s => s.id === parseInt(id));
    return acc + (service.rate * qty);
  }, 0);

  const handleLockPriceClick = () => {
    if (totalCost === 0) {
      setIsToastFading(false);
      setShowToast(true);
      
      // Start fading out after 2 seconds
      setTimeout(() => {
        setIsToastFading(true);
      }, 2000);

      // Unmount after fade out animation (2s visible + 0.5s fade)
      setTimeout(() => {
        setShowToast(false);
      }, 2500);
      
      return;
    }
    setIsModalOpen(true);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    
    // --- Generate Data for Google Form Pre-fill ---
    const selectedItemsList = Object.entries(selectedServices).map(([id, qty]) => {
      const service = SERVICES_DATA.find(s => s.id === parseInt(id));
      return `- ${service.name} (x${qty}): $${service.rate * qty}`;
    }).join('\n');

    // Combine selection data
    const fullServiceText = `${selectedItemsList}\n\nDiscount Opt-in: ${isOptedIn ? 'Yes' : 'No'}`;
    const totalPriceText = `$${totalCost}`;

    // --- Construct Google Form URL ---
    // Note: We use 'encodeURIComponent' to ensure text with spaces/symbols works in URLs
    const formConfig = SITE_CONTENT.calculator.googleForm;
    const finalUrl = `${formConfig.baseUrl}?usp=pp_url&${formConfig.emailEntryId}=${encodeURIComponent(email)}&${formConfig.servicesEntryId}=${encodeURIComponent(fullServiceText)}&${formConfig.totalEntryId}=${encodeURIComponent(totalPriceText)}`;

    // Open Form in new tab
    window.open(finalUrl, '_blank');

    // Show success state locally
    setIsSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
      setEmail("");
      setIsOptedIn(false);
    }, 3000);
  };

  const totalStandard = Object.entries(selectedServices).reduce((acc, [id, qty]) => {
    const service = SERVICES_DATA.find(s => s.id === parseInt(id));
    return acc + (service.standardRate * qty);
  }, 0);

  const savings = totalStandard - totalCost;
  const savingsPercent = totalStandard > 0 ? Math.round((savings / totalStandard) * 100) : 0;

  return (
    <section id="calculator" className="relative py-24 bg-black">
      {/* Toast Notification with Fade Off */}
      {showToast && (
        <div className="fixed top-24 left-0 w-full flex justify-center z-[60] pointer-events-none">
           <div className={`bg-red-500/10 backdrop-blur-md border border-red-500/50 text-red-400 px-6 py-3 rounded-full shadow-[0_0_30px_rgba(239,68,68,0.3)] flex items-center gap-3 pointer-events-auto ${isToastFading ? 'animate-fade-out' : 'animate-fade-in-up'}`}>
             <AlertCircle size={20} className="animate-pulse" />
             <span className="font-bold tracking-wide">{SITE_CONTENT.calculator.validationMessage}</span>
           </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-6 tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              {SITE_CONTENT.calculator.title}
            </h2>
            <div className="h-1 w-24 bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.8)]"></div>
            <p className="mt-4 text-gray-400">{SITE_CONTENT.calculator.subtitle}</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Service Selector */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICES_DATA.map((service, index) => {
              const isSelected = !!selectedServices[service.id];
              return (
                <Reveal key={service.id} delay={index * 50}>
                  <div 
                    className={`relative p-6 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden group h-full
                      ${isSelected 
                        ? 'bg-gray-900 border-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.15)]' 
                        : 'bg-gray-950 border-white/5 hover:border-white/20'}`}
                    onClick={() => !isSelected && handleToggle(service.id)}
                  >
                    {/* Metallic Sheen Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    <div className="flex justify-between items-start relative z-10">
                      <div>
                        <h3 className={`font-bold text-lg ${isSelected ? 'text-white' : 'text-gray-300'}`}>{service.name}</h3>
                        <p className="text-xs text-sky-400 font-mono mt-1 uppercase tracking-wide">{service.category}</p>
                      </div>
                      {isSelected ? (
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleToggle(service.id); }}
                          className="text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <X size={20} />
                        </button>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-gray-600 group-hover:border-sky-500 transition-colors"></div>
                      )}
                    </div>

                    <div className="mt-6 flex justify-between items-end relative z-10">
                      <div>
                        <span className="text-2xl font-bold text-white">${service.rate}</span>
                        <span className="text-xs text-gray-500 ml-1">/ {service.unit}</span>
                      </div>
                      
                      {isSelected && (
                        <div className="flex items-center gap-3 bg-black/50 rounded-lg px-3 py-1 border border-white/10" onClick={e => e.stopPropagation()}>
                          <button 
                            onClick={() => handleQuantityChange(service.id, -1)}
                            className="text-gray-400 hover:text-white"
                          >-</button>
                          <span className="text-sm font-mono text-sky-400 w-4 text-center">{selectedServices[service.id]}</span>
                          <button 
                            onClick={() => handleQuantityChange(service.id, 1)}
                            className="text-gray-400 hover:text-white"
                          >+</button>
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Dynamic Meter */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Reveal delay={400}>
                <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <TrendingUp size={20} className="text-sky-400" />
                    {SITE_CONTENT.calculator.meterTitle}
                  </h3>

                  <div className="space-y-6">
                    <div className="flex justify-between items-center pb-4 border-b border-white/5">
                      <span className="text-gray-400">{SITE_CONTENT.calculator.marketStandardLabel}</span>
                      <span className="text-gray-500 line-through decoration-red-500 decoration-2">${totalStandard}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{SITE_CONTENT.calculator.ourRateLabel}</span>
                      <span className="text-3xl font-bold text-white">${totalCost}</span>
                    </div>

                    {savings > 0 && (
                      <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 p-4 rounded-lg animate-pulse-slow">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-emerald-400 text-sm font-bold uppercase tracking-wider">Total Savings</span>
                          <span className="text-emerald-400 font-bold">{savingsPercent}% OFF</span>
                        </div>
                        <div className="text-2xl font-bold text-emerald-300">
                          ${savings} <span className="text-sm font-normal text-emerald-400/70">saved</span>
                        </div>
                      </div>
                    )}

                    <div className="pt-6">
                      <button 
                        onClick={handleLockPriceClick}
                        className="w-full py-4 bg-sky-500 hover:bg-sky-400 text-black font-bold uppercase tracking-widest rounded-sm shadow-[0_0_20px_rgba(14,165,233,0.4)] hover:shadow-[0_0_30px_rgba(14,165,233,0.6)] transition-all transform hover:-translate-y-1"
                      >
                        {SITE_CONTENT.calculator.lockPriceBtn}
                      </button>
                      <p className="text-center text-xs text-gray-500 mt-4">
                        {SITE_CONTENT.calculator.disclaimer}
                      </p>
                    </div>
                  </div>
                  
                  {/* Decorative dynamic bars */}
                  <div className="mt-8 flex gap-1 h-1">
                    {[...Array(20)].map((_, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-sky-500/20 rounded-full"
                        style={{ 
                          height: '100%', 
                          opacity: i / 20,
                          backgroundColor: i < (savingsPercent / 5) ? '#0ea5e9' : '' 
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* Lock In Price Modal */}
      {isModalOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in-up">
            <div className="bg-gray-900 border border-sky-500/30 p-8 rounded-2xl max-w-md w-full relative shadow-[0_0_50px_rgba(14,165,233,0.2)]">
               <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                 <X size={24} />
               </button>
               
               {!isSubmitted ? (
                 <form onSubmit={handleModalSubmit} className="space-y-6">
                   <div>
                     <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{SITE_CONTENT.calculator.lockPriceModal.title}</h3>
                     <p className="text-sm text-gray-400">Total Estimate: <span className="text-sky-400 font-bold">${totalCost}</span></p>
                   </div>
                   
                   <div>
                     <input 
                       type="email" 
                       required
                       placeholder={SITE_CONTENT.calculator.lockPriceModal.emailPlaceholder}
                       className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sky-500 transition-colors placeholder-gray-600"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                     />
                   </div>

                   <label className="flex items-start gap-3 cursor-pointer group">
                     <div className="relative mt-1">
                       <input 
                         type="checkbox" 
                         className="peer sr-only"
                         checked={isOptedIn}
                         onChange={(e) => setIsOptedIn(e.target.checked)}
                       />
                       <div className="w-5 h-5 border border-gray-500 rounded bg-transparent peer-checked:bg-sky-500 peer-checked:border-sky-500 transition-all"></div>
                       <Check size={14} className="absolute inset-0 m-auto text-black opacity-0 peer-checked:opacity-100" />
                     </div>
                     <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors select-none leading-tight">
                       {SITE_CONTENT.calculator.lockPriceModal.checkboxLabel}
                     </span>
                   </label>

                   <button type="submit" className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-black font-bold uppercase tracking-widest rounded-sm transition-all shadow-[0_0_20px_rgba(14,165,233,0.4)]">
                     {SITE_CONTENT.calculator.lockPriceModal.submitBtn}
                   </button>
                 </form>
               ) : (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-500 mb-4 animate-bounce">
                      <Check size={32} />
                    </div>
                    <h4 className="text-xl font-bold text-white">{SITE_CONTENT.calculator.lockPriceModal.successMessage}</h4>
                  </div>
               )}
            </div>
         </div>
       )}
    </section>
  );
};

const AboutUs = () => (
  <section id="about" className="py-24 bg-gray-950 relative overflow-hidden">
    {/* Background Texture */}
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
    
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-6 tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              {SITE_CONTENT.about.title}
            </h2>
            <div className="text-gray-400 space-y-6 leading-relaxed text-lg">
              <p>
                {SITE_CONTENT.about.storyParagraph1}
              </p>
              <p>
                <strong className="text-white">{SITE_CONTENT.about.missionLabel}</strong> {SITE_CONTENT.about.missionText}
              </p>
              <div className="pt-6">
                <h3 className="text-2xl font-bold text-white mb-2">{SITE_CONTENT.about.founderTitle}</h3>
                <p className="italic border-l-4 border-sky-500 pl-4 text-gray-300">
                  {SITE_CONTENT.about.founderQuote}
                </p>
              </div>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-3 gap-6 mt-12">
            {SITE_CONTENT.about.features.map((feature, i) => (
              <Reveal key={i} delay={i * 100 + 200}>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg text-center backdrop-blur-sm">
                  <feature.icon className="w-8 h-8 text-sky-400 mx-auto mb-2" />
                  <h4 className="font-bold text-white">{feature.label}</h4>
                  <p className="text-xs text-gray-500">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={300}>
          <div className="relative">
            <div className="aspect-[4/5] rounded-lg overflow-hidden relative shadow-2xl border border-white/10 group">
               {/* Simulating a Founder/Team Image with a placeholder */}
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" 
                alt="Workspace" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-8 left-8">
                <div className="text-6xl font-black text-white/10 absolute -top-12 -left-4 z-0">{SITE_CONTENT.about.estDate}</div>
                <h3 className="text-3xl font-bold text-white relative z-10">{SITE_CONTENT.about.vanguardTitle}<br />{SITE_CONTENT.about.vanguardSubtitle}</h3>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sky-500/20 rounded-full blur-2xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl"></div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

const Portfolio = () => {
  const [filter, setFilter] = useState("All");

  const filteredItems = filter === "All" 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(item => item.category === filter);

  return (
    <section id="portfolio" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Centered Heading and Navigation */}
        <Reveal>
          <div className="flex flex-col items-center mb-16">
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-6 tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                {SITE_CONTENT.portfolio.title}
              </h2>
              <div className="h-1 w-24 bg-sky-500 mx-auto shadow-[0_0_15px_rgba(14,165,233,0.8)]"></div>
            </div>
            
            {/* Scrollable Navigation Container */}
            <div className="w-full overflow-x-auto pb-4 no-scrollbar">
              <div className="flex md:justify-center min-w-max px-6">
                <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                  {PORTFOLIO_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`relative px-5 py-2 text-sm font-bold uppercase tracking-wider rounded-full transition-all duration-300 whitespace-nowrap overflow-hidden
                        ${filter === cat 
                          ? 'text-black shadow-[0_0_20px_rgba(14,165,233,0.5)]' 
                          : 'text-gray-400 hover:text-white'}`}
                    >
                      {/* Active Background Animation */}
                      <div className={`absolute inset-0 bg-sky-500 transition-transform duration-300 ${filter === cat ? 'translate-y-0' : 'translate-y-full'}`}></div>
                      <span className="relative z-10">{cat}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Portfolio Grid with Fade Animation */}
        <div key={filter} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <Reveal key={item.id} delay={index * 100}>
              <div className="group relative aspect-video bg-gray-900 rounded-lg overflow-hidden border border-white/5 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-500">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-40 transition-opacity duration-300"></div>
                
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.type === 'video' ? <Film size={16} className="text-sky-400" /> : <ImageIcon size={16} className="text-blue-400" />}
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">{item.category}</span>
                  <h3 className="text-xl font-bold text-white group-hover:text-sky-100 transition-colors">{item.title}</h3>
                  
                  <div className="mt-4 flex items-center gap-2 text-white/0 group-hover:text-white transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 delay-75">
                    <span className="text-sm font-medium">
                      {item.type === 'video' ? 'Watch Reel' : 'View Project'}
                    </span>
                    <ChevronRight size={14} className="text-sky-400" />
                  </div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 ease-in-out"></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-20px); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-out {
          animation: fadeOut 0.5s ease-in forwards;
        }
        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </section>
  );
};

const Contact = () => (
  <section id="contact" className="py-24 bg-gray-950 border-t border-white/10">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <Reveal>
        <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-6 tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          {SITE_CONTENT.contact.title}
        </h2>
        <p className="text-gray-400 mb-12 max-w-xl mx-auto">
          {SITE_CONTENT.contact.subtitle}
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          { 
            link: SOCIAL_LINKS.email, 
            icon: Mail, 
            label: SITE_CONTENT.contact.emailLabel, 
            text: SOCIAL_LINKS.displayEmail,
            colorClass: "group-hover:text-sky-400" 
          },
          { 
            link: SOCIAL_LINKS.phone, 
            icon: Phone, 
            label: SITE_CONTENT.contact.phoneLabel, 
            text: SOCIAL_LINKS.displayPhone,
            colorClass: "group-hover:text-sky-400" 
          },
          { 
            isSocial: true, 
            label: SITE_CONTENT.contact.followLabel, 
            text: SOCIAL_LINKS.displayHandle 
          }
        ].map((item, i) => (
          <Reveal key={i} delay={i * 100}>
            {item.isSocial ? (
              <div className="flex flex-col items-center justify-center p-8 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:border-sky-500/50 transition-all group h-full">
                <div className="flex gap-4 mb-4">
                  <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer">
                    <Instagram className="w-6 h-6 text-gray-400 hover:text-pink-500 transition-colors cursor-pointer hover:scale-110 transform duration-200" />
                  </a>
                  <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noreferrer">
                    <Twitter className="w-6 h-6 text-gray-400 hover:text-blue-400 transition-colors cursor-pointer hover:scale-110 transform duration-200" />
                  </a>
                  <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer">
                    <Youtube className="w-6 h-6 text-gray-400 hover:text-red-600 transition-colors cursor-pointer hover:scale-110 transform duration-200" />
                  </a>
                  <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer">
                    <Linkedin className="w-6 h-6 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer hover:scale-110 transform duration-200" />
                  </a>
                </div>
                <span className="text-white font-medium">{item.label}</span>
                <span className="text-sm text-gray-500 mt-1">{item.text}</span>
              </div>
            ) : (
              <a href={item.link} className="flex flex-col items-center justify-center p-8 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:border-sky-500/50 transition-all group h-full">
                <item.icon className={`w-8 h-8 text-gray-400 mb-4 transition-colors ${item.colorClass}`} />
                <span className="text-white font-medium">{item.label}</span>
                <span className="text-sm text-gray-500 mt-1">{item.text}</span>
              </a>
            )}
          </Reveal>
        ))}
      </div>

      <Reveal delay={300}>
        <footer className="text-gray-600 text-sm border-t border-white/5 pt-8">
          <p>{SITE_CONTENT.contact.copyright}</p>
          <p className="mt-2 text-xs">{SITE_CONTENT.contact.footerText}</p>
        </footer>
      </Reveal>
    </div>
  </section>
);

const App = () => {
  return (
    <div className="bg-black min-h-screen text-slate-200 selection:bg-sky-500 selection:text-black font-sans">
      <Navbar />
      <Hero />
      <Calculator />
      <AboutUs />
      <Portfolio />
      <Contact />
      
      {/* Global Grain Overlay for Cinematic Feel */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
    </div>
  );
};

export default App;