import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight, Flame } from 'lucide-react';
import { RESTAURANT_IMAGES } from '../data/menuData';
import { RESTAURANT_COORDS } from '../utils/distance';
import { WhatsAppIcon } from './WhatsAppIcon';

interface Slide {
  id: number;
  title: string;
  highlight: string;
  subtitle: string;
  tag: string;
  badge: string;
  image: string;
  categoryLink: string;
  buttonText: string;
}

interface HeroProps {
  onCategoryAction?: (category: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onCategoryAction }) => {
  const slides: Slide[] = [
    {
      id: 0,
      title: 'Charcoal Smoked Sizzler',
      highlight: 'Royal BBQ Platters',
      subtitle: 'Tender chicken tikka, spicy beef seekh kababs & creamy malai boti grilled over red-hot coals.',
      tag: 'Fresh from Grill',
      badge: 'Best Seller',
      image: RESTAURANT_IMAGES.bbqPlatter,
      categoryLink: 'bbq',
      buttonText: 'Order BBQ Now',
    },
    {
      id: 1,
      title: 'Stone-Baked Hand Tossed',
      highlight: 'Gourmet Pizzas',
      subtitle: 'Loaded with gooey mozzarella cheese, marinated tikka chicken chunks, bell peppers & oregano.',
      tag: 'Chef Recommendation',
      badge: 'Cheesy Crust',
      image: RESTAURANT_IMAGES.pizzaSpecial,
      categoryLink: 'pizza',
      buttonText: 'Order Hot Pizza',
    },
    {
      id: 2,
      title: 'Double Smash Beef &',
      highlight: 'Crispy Zinger Burgers',
      subtitle: 'Juicy smashed beef patties, cheddar cheese slice & golden crispy chicken fillet in warm brioche buns.',
      tag: 'Crunch & Juicy',
      badge: 'Popular',
      image: RESTAURANT_IMAGES.beefBurger,
      categoryLink: 'burger',
      buttonText: 'Order Burgers',
    },
    {
      id: 3,
      title: 'Ultra-Crunchy Golden',
      highlight: 'Fried Chicken Broast',
      subtitle: 'Crispy skin, juicy tender chicken meat, served hot with crinkle fries and signature garlic mayo dip.',
      tag: 'Crispy & Spicy',
      badge: 'Karachi Favorite',
      image: RESTAURANT_IMAGES.crispyBroast,
      categoryLink: 'broast',
      buttonText: 'Order Broast',
    },
    {
      id: 4,
      title: 'Authentic Karachi Food at',
      highlight: 'Al Riaz Live Kitchen',
      subtitle: 'Visit our open cooking counter in Sector 4, Surjani Town, or get your favorite meals delivered fresh.',
      tag: 'Live Cooking Station',
      badge: 'Open Daily',
      image: RESTAURANT_IMAGES.storeFrontNight,
      categoryLink: 'deals',
      buttonText: 'Explore All Deals',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const [isPaused, setIsPaused] = useState(false);

  // Exact 2-second slide transition requested by user
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setDirection('right');
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const handleNext = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  const currentSlide = slides[currentIndex];

  const slideVariants = {
    enter: (dir: string) => ({
      x: dir === 'right' ? 30 : -30,
      opacity: 0,
      scale: 1.02,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 220, damping: 25 },
        opacity: { duration: 0.35 },
        scale: { duration: 0.4 },
      },
    },
    exit: (dir: string) => ({
      x: dir === 'right' ? -30 : 30,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring' as const, stiffness: 220, damping: 25 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  const handlePrimaryCtaClick = () => {
    if (onCategoryAction) {
      onCategoryAction(currentSlide.categoryLink);
    }
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative w-full max-w-full overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white select-none transition-colors duration-200"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 2-Second Sliding Banner Viewport - Strictly Fit to Mobile Screen */}
      <div className="relative w-full max-w-full h-[400px] sm:h-[480px] lg:h-[540px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full overflow-hidden"
          >
            {/* Background High-Res Food Photo (Bottom-to-Top Reveal) */}
            <motion.img
              src={currentSlide.image}
              alt={currentSlide.title}
              initial={{ opacity: 0, y: 28, scale: 1.04 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full object-cover object-center pointer-events-none"
              referrerPolicy="no-referrer"
            />

            {/* Theme-Aware Gradient Scrim: Crisp light cream-white scrim in Light Mode, rich obsidian in Dark Mode */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/15 dark:from-slate-950 dark:via-slate-950/85 dark:to-transparent transition-colors duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-white/25 dark:from-slate-950 dark:via-transparent dark:to-black/30 transition-colors duration-300" />

            {/* Slide Content Caption Box */}
            <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="max-w-xl space-y-3 sm:space-y-4 text-left">
                {/* Floating Tag */}
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-orange-600 text-white text-[11px] font-bold shadow-md"
                >
                  <Flame className="w-3.5 h-3.5 fill-white shrink-0" />
                  <span>{currentSlide.tag}</span>
                  <span className="text-white/70">·</span>
                  <span className="text-amber-100">{currentSlide.badge}</span>
                </motion.div>

                {/* Big Promotional Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.12] text-slate-900 dark:text-white break-words"
                >
                  {currentSlide.title}{' '}
                  <span className="bg-gradient-to-r from-red-600 via-orange-600 to-amber-500 dark:from-orange-400 dark:via-amber-400 dark:to-yellow-300 bg-clip-text text-transparent block mt-0.5">
                    {currentSlide.highlight}
                  </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xs sm:text-base text-slate-700 dark:text-slate-200 max-w-md line-clamp-2 sm:line-clamp-none leading-relaxed font-medium"
                >
                  {currentSlide.subtitle}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="flex flex-wrap items-center gap-2.5 pt-1"
                >
                  <button
                    type="button"
                    onClick={handlePrimaryCtaClick}
                    className="inline-flex items-center gap-1.5 py-2.5 sm:py-3.5 px-4 sm:px-6 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:from-red-500 hover:to-amber-500 shadow-lg shadow-orange-600/30 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>{currentSlide.buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`https://wa.me/${RESTAURANT_COORDS.whatsapp}?text=Hello%20Al%20Riaz%20Foods%2C%20I%20want%20to%20order%20${encodeURIComponent(currentSlide.highlight)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 py-2.5 sm:py-3.5 px-3.5 sm:px-5 rounded-xl font-bold text-xs sm:text-sm text-slate-900 dark:text-white bg-white/90 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 backdrop-blur-md border border-slate-300 dark:border-white/20 shadow-sm transition-all"
                  >
                    <WhatsAppIcon variant="badge" className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span>WhatsApp</span>
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Arrow Controls */}
        <button
          type="button"
          onClick={handlePrev}
          className="hidden md:flex absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 dark:bg-black/40 hover:bg-white dark:hover:bg-black/70 backdrop-blur-md border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="hidden md:flex absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 dark:bg-black/40 hover:bg-white dark:hover:bg-black/70 backdrop-blur-md border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Bottom Carousel Indicator Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/85 dark:bg-black/50 backdrop-blur-md py-1.5 px-3 rounded-full border border-slate-200 dark:border-white/10 shadow-sm">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                setDirection(idx > currentIndex ? 'right' : 'left');
                setCurrentIndex(idx);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-7 bg-orange-500'
                  : 'w-2 bg-slate-400/60 dark:bg-white/40 hover:bg-slate-600 dark:hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Live Kitchen Operations Ribbon (Full Light & Dark Theme Aware) */}
      <div className="w-full bg-emerald-50 dark:bg-gradient-to-r dark:from-emerald-950 dark:via-slate-900 dark:to-emerald-950 border-t border-b border-emerald-200 dark:border-emerald-900/60 py-2.5 px-4 sm:px-6 transition-colors duration-200">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 dark:bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600 dark:bg-emerald-500" />
            </span>
            <span className="font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider text-[11px]">
              Live Kitchen Open
            </span>
            <span className="text-emerald-300 dark:text-slate-600 hidden sm:inline">·</span>
            <span className="text-slate-700 dark:text-slate-300 hidden sm:inline font-medium">
              Charcoal Grills & Pizza Ovens Running Sizzling Hot
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-700 dark:text-slate-300 font-mono font-semibold">
            <span>Hours: 4:00 PM – 3:00 AM</span>
            <span className="text-emerald-300 dark:text-slate-600 hidden md:inline">|</span>
            <span className="hidden md:inline text-emerald-700 dark:text-emerald-400 font-bold">
              Fleet Dispatched from Sector 4, Surjani Town
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
