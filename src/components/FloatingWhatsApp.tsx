import React from 'react';
import { motion } from 'motion/react';
import { RESTAURANT_COORDS } from '../utils/distance';
import { WhatsAppIcon } from './WhatsAppIcon';

export const FloatingWhatsApp: React.FC = () => {
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
      className="fixed bottom-20 md:bottom-6 left-3 sm:left-6 z-40 flex flex-col items-center pointer-events-auto"
    >
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
          href={`https://wa.me/${RESTAURANT_COORDS.whatsapp}?text=Hello%20Al%20Riaz%20Foods%2C%20I%20would%20like%20to%20place%20an%20order`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Order on WhatsApp"
          title="Order on WhatsApp"
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-2xl shadow-emerald-600/45 hover:scale-110 active:scale-95 transition-transform ring-4 ring-white/85 dark:ring-slate-900/85"
        >
          <WhatsAppIcon variant="mono" className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
        </a>
      </motion.div>
    </motion.div>
  );
};
