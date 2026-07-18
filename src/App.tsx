import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Check, 
  ChevronDown, 
  Settings as SettingsIcon,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  MapPin,
  Mail,
  Phone,
  Rocket,
  Globe,
  MessageCircle,
  BarChart3,
  Sun,
  Moon,
  Users,
  Shield,
  Zap
} from 'lucide-react';
import { SiteConfig, Language, Partner, Feature, StatItem, ProcessStep, Testimonial, PricingPlan, FAQItem, TeamMember, BlogPost, Translation } from './types';
import Admin from './Admin';

const t = (trans: Translation, lang: Language): string => {
  return trans[lang] || trans['ru'] || '';
};

const Logo = () => (
  <div className="flex items-center gap-2">
    <span className="material-icons-round text-primary text-4xl">diversity_3</span>
    <div className="flex flex-col leading-none">
      <span className="text-2xl font-bold text-primary tracking-tight uppercase">Robitai</span>
      <span className="text-lg font-bold text-secondary tracking-widest uppercase">Nav</span>
    </div>
  </div>
);

const Navbar = ({ isDark, toggleTheme, lang, setLang, config, onAdminClick }: { isDark: boolean, toggleTheme: () => void, lang: Language, setLang: (l: Language) => void, config: SiteConfig, onAdminClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages = [
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'uz', label: 'O\'zbekcha', flag: '🇺🇿' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'tj', label: 'Тоҷикӣ', flag: '🇹🇯' }
  ] as const;

  const currentLang = languages.find(l => l.code === lang) || languages[0];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4">
        <a href="#" className="flex items-center gap-2 group">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F65cef22e306b487d9320306863a9ac53%2F3744ebc5900142e9b8409025fd213155?format=webp&width=800&height=1200"
            alt="Robitai Nav Logo"
            className="h-12 w-auto group-hover:scale-105 transition-transform"
          />
        </a>
        
        <div className="flex md:order-2 gap-3 items-center">
          {/* Theme Toggle - Clearer Icons */}
          <button 
            onClick={toggleTheme}
            className="relative w-14 h-8 flex items-center rounded-full bg-gray-100 dark:bg-white/5 p-1 transition-all border border-gray-200 dark:border-white/10 shrink-0"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <motion.div
              animate={{ x: isDark ? 24 : 0 }}
              className="w-6 h-6 bg-white dark:bg-primary rounded-full shadow-sm flex items-center justify-center text-primary dark:text-white"
            >
              {isDark ? <Moon size={14} /> : <Sun size={14} />}
            </motion.div>
          </button>

          {/* Language Selector - Stable Layout */}
          <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-full border border-gray-200 dark:border-white/10 w-[144px] justify-between shrink-0">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code as Language)}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition-all ${
                  lang === l.code ? 'bg-white dark:bg-primary shadow-sm' : 'opacity-50 hover:opacity-100'
                }`}
                title={l.label}
              >
                {l.flag}
              </button>
            ))}
          </div>

          {/* Admin Button - Clearer */}
          <button 
            onClick={onAdminClick}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-all text-gray-400 hover:text-primary border border-transparent hover:border-primary/30 shrink-0"
            title="Admin Panel"
          >
            <SettingsIcon size={18} />
            <span className="hidden lg:inline text-[10px] font-black uppercase tracking-widest">Admin</span>
          </button>
          
          <button className="btn-primary hidden md:block py-2.5 px-6 rounded-xl text-sm shrink-0 min-w-[160px]">
            {t(config.hero.cta, lang)}
          </button>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl md:hidden text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10"
          >
            <span className="material-icons-round">{isOpen ? 'close' : 'menu'}</span>
          </button>
        </div>

        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <li><a href="#features" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 dark:text-white dark:hover:text-primary transition-colors">{lang === 'ru' ? 'Преимущества' : lang === 'uz' ? 'Afzalliklar' : lang === 'en' ? 'Features' : 'Афзалиятҳо'}</a></li>
            <li><a href="#process" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 dark:text-white dark:hover:text-primary transition-colors">{lang === 'ru' ? 'Процесс' : lang === 'uz' ? 'Jarayon' : lang === 'en' ? 'Process' : 'Раванд'}</a></li>
            <li><a href="#pricing" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 dark:text-white dark:hover:text-primary transition-colors">{lang === 'ru' ? 'Цены' : lang === 'uz' ? 'Narxlar' : lang === 'en' ? 'Pricing' : 'Нархҳо'}</a></li>
            <li><a href="#faq" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 dark:text-white dark:hover:text-primary transition-colors">FAQ</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ data, lang, config }: { data: SiteConfig['hero'], lang: Language, config: SiteConfig }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dots, setDots] = useState<Array<{ id: number; x: number; y: number; size: number; color: 'orange' | 'blue'; speed: number; delay: number }>>([]);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newX = e.clientX - rect.left;
    const newY = e.clientY - rect.top;
    
    // Add new floating dots on mouse move
    if (Math.random() > 0.7) {
      const newDot = {
        id: Date.now(),
        x: newX + (Math.random() - 0.5) * 100,
        y: newY + (Math.random() - 0.5) * 100,
        size: Math.random() * 6 + 4,
        color: Math.random() > 0.5 ? 'orange' : 'blue',
        speed: Math.random() * 0.5 + 0.5,
        delay: Math.random() * 2
      };
      
      setDots(prev => [...prev.slice(-15), newDot]);
    }
    
    setMousePosition({ x: newX, y: newY });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.filter(dot => dot.y > -100));
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden" onMouseMove={handleMouseMove}>
      {/* New background design - Animated mesh gradient waves */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Layered wave gradients */}
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/2 -left-1/4 w-full h-full bg-gradient-to-br from-primary/10 via-blue-500/5 to-transparent rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, -80, 0],
            y: [0, -60, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-1/4 -right-1/4 w-3/4 h-3/4 bg-gradient-to-bl from-secondary/10 via-purple-500/5 to-transparent rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, 60, 0],
            y: [0, -80, 0]
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 10 }}
          className="absolute -bottom-1/4 left-1/3 w-2/3 h-2/3 bg-gradient-to-tr from-cyan-500/10 via-blue-400/5 to-transparent rounded-full blur-3xl"
        />
        
        {/* Diagonal accent bands */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[100%] left-[20%] w-[80%] h-[200%] bg-gradient-to-b from-primary/[0.03] to-transparent rotate-12"></div>
          <div className="absolute -top-[80%] left-[30%] w-[60%] h-[180%] bg-gradient-to-b from-secondary/[0.03] to-transparent rotate-12"></div>
          <div className="absolute -top-[60%] left-[40%] w-[40%] h-[160%] bg-gradient-to-b from-blue-500/[0.02] to-transparent rotate-12"></div>
        </div>
        
        {/* Interactive dot pattern overlay with cursor effect */}
        <div 
          className="absolute inset-0 opacity-[0.3] dark:opacity-[0.25] transition-all duration-300"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 4px, transparent 0)',
            backgroundSize: '48px 48px',
            color: '#d1d5db',
            maskImage: `radial-gradient(circle 280px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle 280px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`
          }}
        >
          {/* Hover effect layer - brighter orange/blue dots follow cursor */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 6px, transparent 0)',
              backgroundSize: '48px 48px',
              opacity: 1,
              maskImage: `radial-gradient(circle 220px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(circle 220px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`
            }}
          >
            {/* Alternating orange and blue dots */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, #fb923c 0px, #fb923c 3px, transparent 3px, transparent 48px),
                                  repeating-linear-gradient(-45deg, #60a5fa 0px, #60a5fa 3px, transparent 3px, transparent 48px)`,
                backgroundSize: '48px 48px',
                opacity: 0.7
              }}
            />
          </div>
        </div>
        
        {/* Anti-gravity floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {dots.map((dot) => (
            <motion.div
              key={dot.id}
              initial={{ 
                x: dot.x, 
                y: dot.y, 
                opacity: 0,
                scale: 0
              }}
              animate={{ 
                y: dot.y - 300,
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0.5]
              }}
              transition={{ 
                duration: 3 / dot.speed,
                delay: dot.delay,
                ease: "easeOut"
              }}
              className={`absolute rounded-full blur-[1px] ${
                dot.color === 'orange' 
                  ? 'bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 shadow-xl shadow-orange-500/70'
                  : 'bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 shadow-xl shadow-blue-500/70'
              }`}
              style={{
                width: dot.size,
                height: dot.size,
                left: 0,
                top: 0,
              }}
            />
          ))}
        </div>
        
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white dark:from-gray-900 dark:via-transparent dark:to-gray-900"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest"
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-ping"></span>
              {lang === 'ru' ? 'Инновации в VAS' : lang === 'uz' ? 'VAS dagi innovatsiyalar' : 'Innovation in VAS'}
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-gray-900 dark:text-white leading-[1.1] uppercase"
            >
              {t(data.title, lang).split('Robitai Nav')[0]}
              <span className="text-primary block">Robitai Nav</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-lg font-medium leading-relaxed"
            >
              {t(data.subtitle, lang)}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <button className="btn-primary px-8 py-4 rounded-2xl shadow-2xl shadow-primary/30 flex items-center gap-2 group">
                {t(data.cta, lang)} 
                <Rocket size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openTawkChat}
                className="px-8 py-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition-all flex items-center gap-2 shadow-xl hover:shadow-primary/30"
              >
                <MessageCircle size={20} className="text-primary" />
                {lang === 'ru' ? 'Поддержка' : lang === 'uz' ? 'Yordam' : 'Support'}
              </motion.button>
            </motion.div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} src={`https://picsum.photos/seed/${i}/100/100`} className="w-12 h-12 rounded-2xl border-4 border-white dark:border-gray-900 object-cover" referrerPolicy="no-referrer" />
                ))}
              </div>
              <div>
                <p className="text-sm font-black text-gray-900 dark:text-white">1200+</p>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{lang === 'ru' ? 'Довольных клиентов' : 'Happy Clients'}</p>
              </div>
            </div>
          </div>

          {/* Right side - Interactive 3D floating cards */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
            className="relative"
          >
            <div className="relative h-[500px] w-full perspective-1000">
              {/* Background gradient card */}
              <motion.div
                initial={{ rotateY: -15, rotateX: 10, scale: 0.9 }}
                animate={{ rotateY: -15, rotateX: 10, scale: 0.9 }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="absolute top-0 right-0 w-4/5 h-4/5 bg-gradient-to-br from-primary/20 via-secondary/20 to-blue-500/20 dark:from-primary/30 dark:via-secondary/30 dark:to-blue-500/30 rounded-[3rem] blur-xl"
              />
              
              {/* Main content card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md"
              >
                <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 dark:border-gray-700">
                  {/* Animated header with gradient */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="h-1 bg-gradient-to-r from-primary via-secondary to-blue-500 rounded-full mb-6"
                  />
                  
                  {/* Central icon with pulse effect */}
                  <div className="relative flex justify-center mb-6">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-2xl"
                    >
                      <Globe className="w-12 h-12 text-white" />
                    </motion.div>
                    {/* Orbiting ring */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-2 border-dashed border-primary/30 rounded-full"
                    />
                  </div>
                  
                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-2xl font-black text-center text-gray-900 dark:text-white mb-3 uppercase tracking-tight"
                  >
                    {config.hero.cardTitle ? t(config.hero.cardTitle, lang) : (lang === 'ru' ? 'Цифровые решения' : lang === 'uz' ? 'Raqamli yechimlar' : 'Digital Solutions')}
                  </motion.h3>
                  
                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-center text-gray-500 dark:text-gray-400 mb-8 font-medium"
                  >
                    {config.hero.cardSubtitle ? t(config.hero.cardSubtitle, lang) : (lang === 'ru' ? 'Трансформируем ваш бизнес с помощью инновационных технологий' : lang === 'uz' ? 'Biznesingizni innovatsion texnologiyalar bilan o\'zgartiramiz' : 'Transforming your business with innovative technologies')}
                  </motion.p>
                  
                  {/* Feature pills */}
                  <div className="space-y-3">
                    {(config.hero.features || [
                      { icon: 'rocket', label: { ru: 'Быстрая интеграция', uz: 'Tez integratsiya', en: 'Fast Integration', tj: 'Интегратсияи зуд' } },
                      { icon: 'chart', label: { ru: 'Глубокая аналитика', uz: 'Chuqur tahlil', en: 'Deep Analytics', tj: 'Таҳлили чуқур' } },
                      { icon: 'zap', label: { ru: 'Масштабируемость', uz: 'Masshtablash', en: 'Scalability', tj: 'Масштабнокунӣ' } }
                    ]).map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + (i * 0.1) }}
                        className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-2xl group hover:bg-primary/10 dark:hover:bg-primary/10 transition-colors cursor-default"
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          feature.icon === 'rocket' ? 'bg-blue-500' :
                          feature.icon === 'chart' ? 'bg-purple-500' : 'bg-green-500'
                        }`}>
                          {feature.icon === 'rocket' && <Rocket className="w-5 h-5 text-white" />}
                          {feature.icon === 'chart' && <BarChart3 className="w-5 h-5 text-white" />}
                          {feature.icon === 'zap' && <Zap className="w-5 h-5 text-white" />}
                        </div>
                        <span className="font-bold text-gray-700 dark:text-gray-300 flex-1">
                          {t(feature.label, lang)}
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Bottom CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700"
                  >
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href="#features"
                      className="block w-full py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-black uppercase tracking-widest hover:shadow-xl hover:shadow-primary/30 transition-all text-center"
                    >
                      {lang === 'ru' ? 'Подробнее' : lang === 'uz' ? 'Batafsil' : 'Learn More'}
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Floating decorative elements */}
              <motion.div
                animate={{ 
                  y: [-10, 10, -10],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-10 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl opacity-20 blur-md"
              />
              <motion.div
                animate={{ 
                  y: [10, -10, 10],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-32 left-10 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl opacity-20 blur-md"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Partners = ({ data, lang }: { data: Partner[], lang: Language }) => {
  return (
    <div className="w-full py-8 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="relative flex overflow-x-hidden group">
        <div className="py-2 animate-marquee whitespace-nowrap flex items-center space-x-16 mx-8">
          {data.concat(data).map((p, i) => (
            <span key={`${p.id}-${i}`} className="text-2xl font-bold text-gray-300 dark:text-gray-600 uppercase tracking-tighter">
              {p.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Features = ({ data, lang }: { data: Feature[], lang: Language }) => {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const icons = ['rocket_launch', 'analytics', 'security', 'support_agent', 'devices', 'payments'];
  
  return (
    <section id="features" className="py-20 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
            {lang === 'ru' ? 'Почему мы?' : lang === 'uz' ? 'Nega biz?' : 'Why Us?'}
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {lang === 'ru' ? 'Комплексные решения для вашего успеха' : lang === 'uz' ? 'Sizning muvaffaqiyatingiz uchun kompleks yechimlar' : 'Comprehensive Solutions for Your Success'}
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
            {lang === 'ru' ? 'Мы объединяем технологии и креатив, чтобы предоставить лучший сервис в регионе.' : lang === 'uz' ? 'Biz mintaqadagi eng yaxshi xizmatni taqdim etish uchun texnologiya va ijodni birlashtiramiz.' : 'We combine technology and creativity to provide the best service in the region.'}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((f, i) => {
            const iconName = f.icon || icons[i % icons.length];
            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedFeature(f)}
                className="bg-surface-light dark:bg-surface-dark p-8 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-1 group border border-gray-100 dark:border-gray-800 cursor-pointer h-[320px] flex flex-col overflow-hidden"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shrink-0 ${i % 2 === 0 ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-yellow-50 dark:bg-yellow-900/20'}`}>
                  <span className={`material-icons-round text-3xl ${i % 2 === 0 ? 'text-primary' : 'text-secondary'}`}>
                    {iconName}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-1">{t(f.title, lang)}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 flex-grow">{t(f.desc, lang)}</p>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 flex items-center justify-between text-sm">
                  <span className="text-primary font-bold">Подробнее</span>
                  <ArrowRight size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal for full content */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFeature(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 dark:border-gray-700"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${data.indexOf(selectedFeature) % 2 === 0 ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-yellow-100 dark:bg-yellow-900/30'}`}>
                  <span className={`material-icons-round text-4xl ${data.indexOf(selectedFeature) % 2 === 0 ? 'text-primary' : 'text-secondary'}`}>
                    {selectedFeature.icon || icons[data.indexOf(selectedFeature) % icons.length]}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-6">
                {t(selectedFeature.title, lang)}
              </h3>
              
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {t(selectedFeature.desc, lang)}
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="btn-primary px-8 py-3 rounded-2xl font-bold"
                >
                  {lang === 'ru' ? 'Закрыть' : lang === 'uz' ? 'Yopish' : 'Close'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Stats = ({ data, lang }: { data: StatItem[], lang: Language }) => {
  return (
    <section className="py-20 bg-hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {data.map((s, i) => (
            <motion.div 
              key={s.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-4"
            >
              <div className="text-4xl lg:text-5xl font-extrabold text-white mb-2">{s.value}</div>
              <div className="text-blue-100 font-medium">{t(s.label, lang)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = ({ data, lang }: { data: ProcessStep[], lang: Language }) => {
  return (
    <section id="process" className="py-20 bg-surface-light dark:bg-surface-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {lang === 'ru' ? 'Как мы работаем' : lang === 'uz' ? 'Biz qanday ishlaymiz' : 'How We Work'}
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            {lang === 'ru' ? 'Простой путь к интеграции' : lang === 'uz' ? 'Integratsiyaga oddiy yo\'l' : 'Simple path to integration'}
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 relative">
          {data.map((s, i) => (
            <motion.div 
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className={`w-24 h-24 bg-white dark:bg-gray-800 rounded-full border-4 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 ${i % 2 === 0 ? 'border-primary' : 'border-secondary'}`}>
                <span className={`text-3xl font-bold ${i % 2 === 0 ? 'text-primary' : 'text-secondary'}`}>{s.num}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t(s.title, lang)}</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-xs">{t(s.desc, lang)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = ({ data, lang }: { data: Testimonial[], lang: Language }) => {
  return (
    <section className="py-20 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">
          {lang === 'ru' ? 'Отзывы партнеров' : lang === 'uz' ? 'Hamkorlar fikrlari' : 'Partner Testimonials'}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {data.map((r, i) => (
            <motion.div 
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-surface-light dark:bg-surface-dark p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 relative"
            >
              <span className={`text-6xl absolute top-4 left-4 font-serif ${i % 2 === 0 ? 'text-primary/20' : 'text-secondary/20'}`}>"</span>
              <div className="flex items-center gap-1 mb-4 text-secondary">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="material-icons-round">star</span>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 relative z-10">
                {t(r.content, lang)}
              </p>
              <div className="flex items-center gap-4">
                <img src={r.img} alt={r.name} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{r.name}</h4>
                  <p className="text-sm text-gray-500">{t(r.role, lang)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = ({ data, lang }: { data: PricingPlan[], lang: Language }) => {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {lang === 'ru' ? 'Тарифные планы' : lang === 'uz' ? 'Tarif rejalari' : 'Pricing Plans'}
          </h2>
          <div className="mt-6 flex justify-center items-center space-x-4">
            <span className={`text-sm font-medium transition-colors ${!annual ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
              {lang === 'ru' ? 'Ежемесячно' : lang === 'uz' ? 'Har oy' : 'Monthly'}
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={annual} onChange={() => setAnnual(!annual)} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
            <span className={`text-sm font-medium transition-colors ${annual ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
              {lang === 'ru' ? 'Ежегодно' : lang === 'uz' ? 'Har yili' : 'Annually'} <span className="text-secondary text-sm ml-1">-20%</span>
            </span>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {data.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-2xl border transition-all duration-300 ${
                p.isPopular 
                  ? 'bg-gradient-to-b from-surface-light to-blue-50 dark:from-surface-dark dark:to-blue-900/10 border-2 border-primary relative shadow-xl transform scale-105 z-10' 
                  : 'bg-surface-light dark:bg-surface-dark border-gray-200 dark:border-gray-700 hover:shadow-lg'
              }`}
            >
              {p.isPopular && (
                <div className="absolute top-0 right-0 bg-secondary text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg text-gray-900 uppercase tracking-wide">
                  {lang === 'ru' ? 'Популярный' : lang === 'uz' ? 'Ommabop' : 'Popular'}
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t(p.name, lang)}</h3>
              <div className="my-4">
                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                  ${annual ? Math.floor(Number(p.price) * 0.8) : p.price}
                </span>
                <span className="text-gray-500">/{t(p.period, lang)}</span>
              </div>
              <p className="text-gray-500 mb-6 text-sm">
                {p.isPopular ? (lang === 'ru' ? 'Для быстрорастущих компаний' : lang === 'uz' ? 'Tez o\'sayotgan kompaniyalar uchun' : 'For fast-growing companies') : (lang === 'ru' ? 'Идеально для малого бизнеса' : lang === 'uz' ? 'Kichik бизнес uchun ideal' : 'Ideal for small business')}
              </p>
              <ul className="space-y-4 mb-8">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center text-gray-600 dark:text-gray-300">
                    <span className={`material-icons-round mr-2 text-sm ${p.isPopular ? 'text-primary' : 'text-green-500'}`}>
                      {p.isPopular ? 'check_circle' : 'check'}
                    </span>
                    {t(f, lang)}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 px-4 font-bold rounded-xl transition-all ${
                p.isPopular 
                  ? 'bg-primary text-white hover:bg-blue-700 shadow-lg shadow-primary/30' 
                  : 'border border-primary text-primary hover:bg-primary hover:text-white'
              }`}>
                {lang === 'ru' ? 'Выбрать план' : lang === 'uz' ? 'Rejani tanlash' : 'Choose Plan'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = ({ data, lang }: { data: FAQItem[], lang: Language }) => {
  return (
    <section id="faq" className="py-20 bg-background-light dark:bg-background-dark">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          {lang === 'ru' ? 'Часто задаваемые вопросы' : lang === 'uz' ? 'Ko\'p so\'raladigan savollar' : 'Frequently Asked Questions'}
        </h2>
        <div className="space-y-4">
          {data.map((f, i) => (
            <details key={f.id} className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm [&_summary::-webkit-details-marker]:hidden border border-gray-100 dark:border-gray-700">
              <summary className="flex cursor-pointer items-center justify-between text-gray-900 dark:text-white font-medium">
                <h3 className="text-lg">{t(f.question, lang)}</h3>
                <span className="ml-1.5 shrink-0 rounded-full bg-white dark:bg-gray-700 p-1.5 text-gray-900 dark:text-white sm:p-3 group-open:bg-primary group-open:text-white transition-colors">
                  <svg className="size-5 shrink-0 transition duration-300 group-open:-rotate-180" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-300">
                {t(f.answer, lang)}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

const Team = ({ data, lang }: { data: TeamMember[], lang: Language }) => {
  return (
    <section id="team" className="py-20 bg-surface-light dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {lang === 'ru' ? 'Наша команда' : lang === 'uz' ? 'Bizning jamoamiz' : 'Our Team'}
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            {lang === 'ru' ? 'Профессионалы своего дела' : lang === 'uz' ? 'O\'z ishining ustalari' : 'Professionals in their field'}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-square mb-4">
                <img src={m.img} alt={m.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6 gap-4">
                  {m.telegram && (
                    <a href={m.telegram} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-colors">
                      <span className="material-icons-round">send</span>
                    </a>
                  )}
                  {m.whatsapp && (
                    <a href={m.whatsapp} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-colors">
                      <span className="material-icons-round">chat</span>
                    </a>
                  )}
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">{m.name}</h4>
              <p className="text-primary font-medium">{t(m.role, lang)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Blog = ({ data, lang }: { data: BlogPost[], lang: Language }) => {
  return (
    <section id="blog" className="py-20 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              {lang === 'ru' ? 'Наш блог' : lang === 'uz' ? 'Bizning blogimiz' : 'Our Blog'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl">
              {lang === 'ru' ? 'Свежие новости и экспертные мнения о рынке телекоммуникаций.' : lang === 'uz' ? 'Telekommunikatsiya bozori haqida so\'nggi yangiliklar va ekspert fikrlari.' : 'Fresh news and expert opinions on the telecommunications market.'}
            </p>
          </div>
          <button className="btn-secondary flex items-center gap-2">
            {lang === 'ru' ? 'Все статьи' : lang === 'uz' ? 'Barcha maqolalar' : 'All Articles'} <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {data.map((p, i) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-3xl mb-6 aspect-video">
                <img src={p.img} alt={t(p.title, lang)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-dark/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-primary">
                  {t(p.category, lang)}
                </div>
              </div>
              <p className="text-xs text-gray-400 mb-2 font-bold uppercase tracking-widest">{p.date}</p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors leading-tight">
                {t(p.title, lang)}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = ({ data, lang }: { data: SiteConfig['ctaSection'], lang: Language }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setEmail('');
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden relative shadow-2xl">
        <div className="absolute inset-0 bg-hero-gradient"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
        <div className="absolute top-0 right-0 p-12 opacity-20">
          <span className="material-icons-round text-9xl text-white rotate-12">send</span>
        </div>
        <div className="relative z-10 p-10 md:p-16 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">{t(data.title, lang)}</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">{t(data.subtitle, lang)}</p>
          
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-6"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={lang === 'ru' ? 'Ваш Email' : lang === 'uz' ? 'Sizning Emailingiz' : 'Your Email'}
                  required
                  className="flex-1 px-6 py-4 rounded-full border-0 focus:ring-4 focus:ring-yellow-400/50 text-gray-900 placeholder-gray-400 outline-none shadow-lg"
                />
                <button type="submit" className="px-8 py-4 bg-secondary text-gray-900 font-bold rounded-full hover:bg-yellow-300 transition-colors shadow-lg hover:shadow-yellow-400/50">
                  {t(data.buttonText, lang)}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-8 max-w-lg mx-auto mb-6"
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Check size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {lang === 'ru' ? 'Спасибо!' : lang === 'uz' ? 'Rahmat!' : 'Thank You!'}
                </h3>
                <p className="opacity-80">
                  {lang === 'ru' ? 'Мы свяжемся с вами в ближайшее время.' : lang === 'uz' ? 'Tez orada siz bilan bog\'lanamiz.' : 'We will contact you shortly.'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openTawkChat}
              className="px-8 py-4 bg-secondary text-gray-900 font-bold rounded-full hover:bg-yellow-300 transition-all shadow-lg hover:shadow-yellow-400/50 flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              {lang === 'ru' ? 'Связаться с нами' : lang === 'uz' ? 'Biz bilan bog\'lanish' : 'Contact Us'}
            </motion.button>
          </div>
          
          <p className="mt-4 text-xs text-blue-200">
            {lang === 'ru' ? 'Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.' : lang === 'uz' ? 'Tugmani bosish orqali siz maxfiylik siyosatiga rozilik bildirasiz.' : 'By clicking the button, you agree to the privacy policy.'}
          </p>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ data, lang }: { data: SiteConfig['footer'], lang: Language }) => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F65cef22e306b487d9320306863a9ac53%2F3744ebc5900142e9b8409025fd213155?format=webp&width=800&height=1200"
                alt="Robitai Nav Logo"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {lang === 'ru' ? 'Ведущий поставщик цифрового контента и технологических решений в Центральной Азии.' : lang === 'uz' ? 'Markaziy Osiyoda raqamli kontent va texnologik yechimlarning yetakchi yetkazib beruvchisi.' : 'Leading provider of digital content and technological solutions in Central Asia.'}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram size={24} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-gray-900 dark:text-white font-bold mb-4">{lang === 'ru' ? 'Компания' : lang === 'uz' ? 'Kompaniya' : 'Company'}</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">{lang === 'ru' ? 'О нас' : lang === 'uz' ? 'Biz haqimizda' : 'About Us'}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{lang === 'ru' ? 'Карьера' : lang === 'uz' ? 'Karyera' : 'Careers'}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{lang === 'ru' ? 'Блог' : lang === 'uz' ? 'Blog' : 'Blog'}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{lang === 'ru' ? 'Контакты' : lang === 'uz' ? 'Kontaktlar' : 'Contacts'}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-900 dark:text-white font-bold mb-4">{lang === 'ru' ? 'Продукт' : lang === 'uz' ? 'Mahsulot' : 'Product'}</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#features" className="hover:text-primary transition-colors">{lang === 'ru' ? 'Функции' : lang === 'uz' ? 'Funksiyalar' : 'Features'}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{lang === 'ru' ? 'Интеграции' : lang === 'uz' ? 'Integratsiyalar' : 'Integrations'}</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-colors">{lang === 'ru' ? 'Цены' : lang === 'uz' ? 'Narxlar' : 'Pricing'}</a></li>
              <li><a href="#faq" className="hover:text-primary transition-colors">{lang === 'ru' ? 'FAQ' : lang === 'uz' ? 'FAQ' : 'FAQ'}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-900 dark:text-white font-bold mb-4">{lang === 'ru' ? 'Контакты' : lang === 'uz' ? 'Kontaktlar' : 'Contacts'}</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li className="flex items-start">
                <span className="material-icons-round text-primary text-sm mr-2 mt-0.5">place</span>
                {t(data.address, lang)}
              </li>
              <li className="flex items-center">
                <span className="material-icons-round text-primary text-sm mr-2">email</span>
                {data.email}
              </li>
              <li className="flex items-center">
                <span className="material-icons-round text-primary text-sm mr-2">phone</span>
                {data.phone}
              </li>
              <li className="flex items-center">
                <span className="material-icons-round text-primary text-sm mr-2">help</span>
                <button
                  onClick={openTawkChat}
                  className="hover:text-primary transition-colors cursor-pointer text-gray-500 dark:text-gray-400 hover:text-inherit"
                >
                  {lang === 'ru' ? 'Центр помощи' : lang === 'uz' ? 'Yordam markazi' : 'Help Center'}
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">© 2023 Robitai Nav. {lang === 'ru' ? 'Все права защищены.' : lang === 'uz' ? 'Barcha huquqlar himoyalangan.' : 'All rights reserved.'}</p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-primary transition-colors">{lang === 'ru' ? 'Политика конфиденциальности' : lang === 'uz' ? 'Maxfiylik siyosati' : 'Privacy Policy'}</a>
            <a href="#" className="hover:text-primary transition-colors">{lang === 'ru' ? 'Условия использования' : lang === 'uz' ? 'Foydalanish shartlari' : 'Terms of Use'}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper function to open Tawk chat
const openTawkChat = () => {
  const tawkAPI = (window as any).Tawk_API;
  if (tawkAPI) {
    if (typeof tawkAPI.toggle === 'function') {
      tawkAPI.toggle();
    } else if (typeof tawkAPI.maximize === 'function') {
      tawkAPI.maximize();
    } else if (typeof tawkAPI.showWidget === 'function') {
      tawkAPI.showWidget();
    }
  }
};

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(window.location.pathname === '/admin');
  const [lang, setLang] = useState<Language>('ru');

 useEffect(() => {
    const fetchConfig = async () => {
      try {
        const data = {
          botName: "Robita",
          apiUrl: "",
          active: true
        };
        setConfig(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchConfig();
  }, []); // <--- ИНҶОРО ДИҚҚАТ КУНЕД! Бояд ҳамин хел қавсҳо ва вергул бошад.

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    if (config?.tawkId) {
      const s1 = document.createElement("script");
      const s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = `https://embed.tawk.to/${config.tawkId}`;
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode?.insertBefore(s1, s0);
      return () => {
        s1.remove();
      };
    }
  }, [config?.tawkId]);

  if (loading || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (isAdmin) {
    return <Admin config={config} onSave={(newConfig) => setConfig(newConfig)} />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen selection:bg-primary selection:text-white bg-background-light dark:bg-background-dark transition-colors duration-500"
    >
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-transparent z-[60] origin-left"
        style={{ width: `${scrollProgress}%` }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      <Navbar 
        isDark={isDark} 
        toggleTheme={() => setIsDark(!isDark)} 
        lang={lang} 
        setLang={setLang} 
        config={config}
        onAdminClick={() => {
          setIsAdmin(true);
          window.history.pushState({}, '', '/admin');
        }}
      />
      
      {config.layout.map((section) => (
        <React.Fragment key={section}>
          {section === 'Hero' && <Hero data={config.hero} lang={lang} config={config} />}
          {section === 'Partners' && <Partners data={config.partners} lang={lang} />}
          {section === 'Features' && <Features data={config.features} lang={lang} />}
          {section === 'Stats' && <Stats data={config.stats} lang={lang} />}
          {section === 'Process' && <Process data={config.process} lang={lang} />}
          {section === 'Testimonials' && <Testimonials data={config.testimonials} lang={lang} />}
          {section === 'Pricing' && <Pricing data={config.pricing} lang={lang} />}
          {section === 'Team' && <Team data={config.team} lang={lang} />}
          {section === 'FAQ' && <FAQ data={config.faq} lang={lang} />}
          {section === 'Blog' && <Blog data={config.blog} lang={lang} />}
          {section === 'CTA' && <CTA data={config.ctaSection} lang={lang} />}
        </React.Fragment>
      ))}

      <Footer data={config.footer} lang={lang} />
    </motion.div>
  );
}
