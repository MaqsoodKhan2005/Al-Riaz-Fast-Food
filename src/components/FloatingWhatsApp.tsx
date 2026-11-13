import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { RESTAURANT_COORDS } from '../utils/distance';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { WhatsAppIcon } from './WhatsAppIcon';

function buildDynamicQuickReply(
  hour: number,
  cartItems: { name: string; quantity: number }[],
  userName?: string
): { mealLabel: string; message: string } {
  let mealLabel = 'dinner';
  let baseGreeting = 'Hello Al Riaz Foods, I would like to order dinner';

  if (hour >= 5 && hour < 12) {
    mealLabel = 'breakfast';
    baseGreeting = 'Hello Al Riaz Foods, I would like to order breakfast';
  } else if (hour >= 12 && hour < 16) {
    mealLabel = 'lunch';
    baseGreeting = 'Hello Al Riaz Foods, I would like to order lunch';
  } else if (hour >= 16 && hour < 19) {
    mealLabel = 'evening snacks';
    baseGreeting = 'Hello Al Riaz Foods, I would like to order evening BBQ & fast food snacks';
  } else if (hour >= 19 && hour < 23) {
    mealLabel = 'dinner';
    baseGreeting = 'Hello Al Riaz Foods, I would like to order dinner';
  } else {
    mealLabel = 'late-night food';
    baseGreeting = 'Hello Al Riaz Foods, I would like to order late-night BBQ & fast food';
  }

  let message = userName
    ? `${baseGreeting} (Customer: ${userName}).`
    : `${baseGreeting}.`;

  if (cartItems.length > 0) {
    const summary = cartItems
      .slice(0, 3)
      .map((item) => `${item.quantity}x ${item.name}`)
      .join(', ');
    const extraCount = cartItems.length > 3 ? ` +${cartItems.length - 3} more` : '';
    message += ` My current session cart includes: ${summary}${extraCount}.`;
  }

  return { mealLabel, message };
}

export const FloatingWhatsApp: React.FC = () => {
  const { cart } = useCart();
  const { user } = useAuth();
  const [currentHour, setCurrentHour] = useState<number>(() => new Date().getHours());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60_000);
    return () => clearInterval(timer);
  }, []);

  const { mealLabel, message } = useMemo(
    () => buildDynamicQuickReply(currentHour, cart, user?.name),
    [currentHour, cart, user?.name]
  );

  const whatsappUrl = `https://wa.me/${RESTAURANT_COORDS.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      initial={{ opacity: 0, x: -90 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        type: 'spring',
        stiffness: 210,
        damping: 18,
        delay: 0.2,
      }}
      className="fixed bottom-20 md:bottom-6 left-3 sm:left-6 z-40 flex flex-col items-center pointer-events-auto group"
    >
      {/* Dynamic Quick Reply preview on desktop hover */}
      <div className="hidden sm:block pointer-events-none opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 mb-1.5 max-w-[230px] px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl text-[10px] text-slate-700 dark:text-slate-200 text-center leading-snug">
        <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase block text-[9px] tracking-wider">
          Quick Reply ({mealLabel})
        </span>
        <span className="line-clamp-2">&ldquo;{message}&rdquo;</span>
      </div>

      <motion.span
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        className="mb-1.5 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold tracking-tight bg-white/95 dark:bg-slate-900/95 text-emerald-700 dark:text-emerald-400 border border-emerald-500/35 shadow-md whitespace-nowrap"
      >
        Order on WhatsApp
      </motion.span>

      <motion.div
        animate={{
          y: [0, -8, 0],
          scale: [1, 1.06, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.8,
          ease: 'easeInOut',
        }}
        className="relative"
      >
        {/* Subtle Continuous Celebration Pulse Ring */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[#25D366]/45 animate-ping pointer-events-none"
        />

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Order on WhatsApp — ${message}`}
          title={message}
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-2xl shadow-emerald-600/45 hover:scale-110 active:scale-95 transition-transform ring-4 ring-white/85 dark:ring-slate-900/85"
        >
          <WhatsAppIcon variant="mono" className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
        </a>
      </motion.div>
    </motion.div>
  );
};
