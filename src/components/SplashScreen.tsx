import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Sparkles, UtensilsCrossed, ChevronRight } from 'lucide-react';

interface SplashScreenProps {
  onComplete?: () => void;
  minDuration?: number; // Duration in ms
}

const COOKING_STEPS = [
  'Firing up the charcoal grill...',
  'Seasoning tender chicken tikka & seekh kababs...',
  'Preparing crispy broast & gourmet burgers...',
  'Warming stone-baked pizza ovens...',
  'Welcome to Al Riaz Foods!',
];

// Deterministic radial explosion particles for logo celebration burst
const CELEBRATION_PARTICLES = Array.from({ length: 18 }, (_, i) => {
  const angle = (i / 18) * Math.PI * 2;
  const radius = i % 2 === 0 ? 115 : 85;
  const colors = [
    'bg-orange-500',
    'bg-amber-400',
    'bg-emerald-400',
    'bg-red-500',
    'bg-yellow-300',
    'bg-teal-400',
  ];
  return {
    id: i,
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    size: i % 3 === 0 ? 'w-3 h-3' : i % 2 === 0 ? 'w-2.5 h-2.5' : 'w-2 h-2',
    color: colors[i % colors.length],
    rotate: i * 40,
    delay: (i % 4) * 0.04,
  };
});

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  minDuration = 1650,
}) => {
  // Always play splash screen animation on initial load and every page refresh
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      if (onComplete) onComplete();
      return;
    }

    const intervalTime = 50;
    const totalSteps = Math.max(1, minDuration / intervalTime);
    let stepCount = 0;

    const interval = setInterval(() => {
      stepCount++;
      const currentPercent = Math.min(100, Math.round((stepCount / totalSteps) * 100));
      setProgress(currentPercent);

      if (currentPercent < 25) {
        setStepIndex(0);
      } else if (currentPercent < 55) {
        setStepIndex(1);
      } else if (currentPercent < 80) {
        setStepIndex(2);
      } else if (currentPercent < 95) {
        setStepIndex(3);
      } else {
        setStepIndex(4);
      }

      if (currentPercent >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          if (onComplete) onComplete();
        }, 220);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isVisible, minDuration, onComplete]);

  const handleSkip = () => {
    setIsVisible(false);
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white select-none transition-colors"
        >
          {/* Ambient Background Glow */}
          <div className="absolute inset-0 pointer-events-none opacity-30 bg-gradient-to-br from-orange-200/60 via-slate-50 to-emerald-200/60 dark:from-orange-950/50 dark:via-slate-950 dark:to-emerald-950/50" />

          {/* Skip Button */}
          <div className="absolute top-5 right-5 z-20">
            <button
              type="button"
              onClick={handleSkip}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-200/80 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 border border-slate-300 dark:border-white/15 backdrop-blur-md transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>Skip</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Central Animated Branding Container */}
          <div className="relative z-10 flex flex-col items-center px-6 max-w-sm sm:max-w-md w-full text-center">
            {/* Exploding Celebration Particles + Zoom-In Logo Container */}
            <div className="relative mb-6 flex items-center justify-center">
              {/* Dual Expanding Celebration Shockwave Rings */}
              <motion.div
                initial={{ scale: 0.3, opacity: 0.9 }}
                animate={{ scale: 2.35, opacity: 0 }}
                transition={{ duration: 1.15, ease: 'easeOut', delay: 0.15 }}
                className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-orange-500/70 pointer-events-none"
              />
              <motion.div
                initial={{ scale: 0.25, opacity: 0.85 }}
                animate={{ scale: 2.75, opacity: 0 }}
                transition={{ duration: 1.35, ease: 'easeOut', delay: 0.25 }}
                className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-emerald-400/70 pointer-events-none"
              />

              {/* Exploding Confetti / Sparkle Burst */}
              {CELEBRATION_PARTICLES.map((p) => (
                <motion.span
                  key={p.id}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
                  animate={{
                    x: p.x,
                    y: p.y,
                    scale: [0, 1.35, 0.8, 0],
                    opacity: [0, 1, 1, 0],
                    rotate: p.rotate + 180,
                  }}
                  transition={{
                    duration: 1.15,
                    delay: 0.18 + p.delay,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`absolute rounded-sm pointer-events-none shadow-sm ${p.size} ${p.color}`}
                />
              ))}

              {/* Main Zoom-In Logo Badge */}
              <motion.div
                initial={{ scale: 0.1, opacity: 0, rotate: -18 }}
                animate={{
                  scale: [0.1, 1.24, 0.94, 1.06, 1],
                  opacity: [0, 1, 1, 1, 1],
                  rotate: [-18, 6, -3, 1, 0],
                }}
                transition={{
                  duration: 0.85,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-red-600 via-orange-500 to-amber-400 p-0.5 shadow-2xl shadow-orange-500/35">
                  <div className="w-full h-full rounded-[22px] bg-white dark:bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent" />
                    <motion.div
                      animate={{
                        scale: [1, 1.14, 1],
                        rotate: [0, -4, 4, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.6,
                        ease: 'easeInOut',
                      }}
                      className="relative z-10 flex items-center justify-center text-orange-500"
                    >
                      <Flame className="w-12 h-12 text-orange-500 fill-orange-500 drop-shadow-[0_0_14px_rgba(249,115,22,0.75)]" />
                    </motion.div>
                    <span className="relative z-10 text-[10px] font-black tracking-widest text-orange-600 dark:text-amber-400 uppercase mt-1">
                      AL RIAZ
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Restaurant Title Zoom-Up */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-1.5 mb-6"
            >
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center justify-center gap-2">
                <span>AL RIAZ FOODS</span>
              </h1>
              <p className="text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-amber-400">
                BBQ • Charcoal Grill • Pizza • Fast Food
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Sector 4, Surjani Town, Karachi
              </p>
            </motion.div>

            {/* Dynamic Status Text */}
            <motion.div
              key={stepIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.25 }}
              className="h-7 flex items-center justify-center text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-5"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-500 dark:text-orange-400 mr-2 shrink-0 animate-spin" />
              <span>{COOKING_STEPS[stepIndex]}</span>
            </motion.div>

            {/* Glowing Progress Bar */}
            <div className="w-full space-y-2">
              <div className="relative h-2.5 w-full rounded-full bg-slate-200 dark:bg-slate-800/80 overflow-hidden p-0.5 border border-slate-300 dark:border-slate-700/50">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-red-600 via-orange-500 to-amber-400 shadow-[0_0_12px_rgba(249,115,22,0.75)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 px-1">
                <span>Loading Menu Experience</span>
                <span className="font-bold text-orange-600 dark:text-amber-400">{progress}%</span>
              </div>
            </div>

            {/* Bottom Footer Note */}
            <div className="mt-8 flex items-center gap-2 text-[11px] text-slate-500">
              <UtensilsCrossed className="w-3.5 h-3.5 text-orange-500" />
              <span>Direct Kitchen Ordering • Express Home Delivery</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
