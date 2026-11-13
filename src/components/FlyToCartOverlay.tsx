import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';

export const FlyToCartOverlay: React.FC = () => {
  const { flyingItems, removeFlyingItem } = useCart();

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] w-full max-w-full overflow-hidden">
      <AnimatePresence>
        {flyingItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{
              x: item.startX - 32,
              y: item.startY - 32,
              scale: 1,
              opacity: 1,
            }}
            animate={{
              x: item.targetX - 16,
              y: item.targetY - 16,
              scale: 0.25,
              opacity: 0.85,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.75,
              ease: [0.2, 0.8, 0.2, 1], // Smooth parabolic arc feeling
            }}
            onAnimationComplete={() => removeFlyingItem(item.id)}
            className="absolute top-0 left-0 w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-400 shadow-2xl shadow-emerald-500/50 bg-slate-900"
          >
            <img
              src={item.image}
              alt="Flying cart item"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
