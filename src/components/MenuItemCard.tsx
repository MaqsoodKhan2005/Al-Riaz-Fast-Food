import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Flame, Clock, Check, SlidersHorizontal } from 'lucide-react';
import { MenuItem } from '../types';
import { useCart } from '../context/CartContext';

interface MenuItemCardProps {
  item: MenuItem;
  onCustomize?: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onCustomize }) => {
  const { cart, addToCart, setIsCartOpen } = useCart();
  const imgRef = useRef<HTMLImageElement>(null);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const currentSize = item.sizes ? item.sizes[selectedSizeIndex] : null;
  const currentPrice = item.price + (currentSize ? currentSize.priceDelta : 0);

  // Persistent Added state tied directly to CartContext
  const isInCart = cart.some(
    (c) =>
      c.menuItemId === item.id &&
      (currentSize ? c.selectedSize === currentSize.name : true)
  );

  // If image is already loaded from cache, immediately show it
  React.useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsImageLoaded(true);
    }
  }, [item.image]);

  const handleCardClick = () => {
    if (onCustomize) {
      onCustomize(item);
    }
  };

  const handleAddOrViewCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInCart) {
      setIsCartOpen(true);
      return;
    }

    addToCart(
      item,
      currentSize?.priceDelta || 0,
      currentSize?.name,
      undefined,
      imgRef.current
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      onClick={handleCardClick}
      className="group flex flex-col rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:border-orange-500/50 dark:hover:border-orange-500/50 transition-all duration-300 cursor-pointer"
    >
      {/* Food Image Container with Bottom-to-Top Reveal & Zero-CLS Skeleton Shimmer Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800"
      >
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
          </div>
        )}

        <img
          ref={imgRef}
          src={item.image}
          alt={item.name}
          onLoad={() => setIsImageLoaded(true)}
          onError={(e) => {
            e.currentTarget.src = '/assets/images/product_bbq_platter_1794331380474.jpg';
            setIsImageLoaded(true);
          }}
          className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-300 ease-out ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Badge */}
        {item.badge && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[9px] sm:text-[11px] font-bold text-white bg-gradient-to-r from-red-600 to-orange-600 shadow-md max-w-[70%] truncate">
            {item.badge}
          </div>
        )}

        {/* Spicy indicator */}
        {item.spicyLevel && item.spicyLevel > 1 && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2.5 py-0.5 rounded-full bg-black/65 backdrop-blur-md text-amber-400 text-[9px] sm:text-[11px] font-semibold">
            <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
            <span className="hidden xs:inline sm:inline">Spicy</span>
          </div>
        )}
      </motion.div>

      {/* Card Details (Optimized for 2-column Mobile + Desktop) */}
      <div className="p-2.5 sm:p-4 lg:p-5 flex flex-col flex-1 justify-between gap-2.5 sm:gap-4">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-1.5 text-[9px] sm:text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span className="uppercase tracking-wider font-bold text-orange-600 dark:text-orange-400">
              {item.category}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-0.5 sm:gap-1">
              <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-400" />
              {item.preparationTimeMinutes}m
            </span>
          </div>

          {/* Item Title */}
          <h3 className="text-xs sm:text-base lg:text-lg font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
            {item.name}
          </h3>

          {/* Description */}
          <p className="mt-1 text-[10px] sm:text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Size Selection */}
        {item.sizes && item.sizes.length > 0 && (
          <div className="space-y-1">
            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
              Size / Option:
            </span>
            <div className="grid grid-cols-2 gap-1 sm:gap-1.5">
              {item.sizes.map((sz, idx) => {
                const isLastOdd = item.sizes!.length % 2 === 1 && idx === item.sizes!.length - 1;
                return (
                  <button
                    key={sz.name}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSizeIndex(idx);
                    }}
                    className={`py-1 sm:py-1.5 px-1 sm:px-2.5 rounded-lg text-[10px] sm:text-xs font-semibold text-center truncate transition-all ${
                      isLastOdd ? 'col-span-2' : 'col-span-1'
                    } ${
                      selectedSizeIndex === idx
                        ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {sz.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Price & Actions */}
        <div className="pt-2 sm:pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between gap-1.5">
            <div className="min-w-0">
              <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 block leading-none">
                Price
              </span>
              <span className="text-sm sm:text-lg font-black text-slate-900 dark:text-white font-mono tabular-nums truncate block">
                Rs. {currentPrice.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              {onCustomize && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCustomize(item);
                  }}
                  className="hidden sm:inline-flex py-2 px-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Customize ingredients & portions"
                >
                  Customize
                </button>
              )}

              <button
                type="button"
                onClick={handleAddOrViewCart}
                className={`flex items-center gap-1 py-1.5 sm:py-2 px-2.5 sm:px-3.5 rounded-xl font-bold text-[11px] sm:text-xs transition-all duration-200 active:scale-95 ${
                  isInCart
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/25 ring-2 ring-emerald-400/40'
                    : 'bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white shadow-md shadow-orange-500/20'
                }`}
              >
                {isInCart ? (
                  <>
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5 shrink-0" />
                    <span>Add</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {onCustomize && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onCustomize(item);
              }}
              className="sm:hidden w-full py-1 px-2 rounded-lg text-[10px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center gap-1 transition-colors"
            >
              <SlidersHorizontal className="w-2.5 h-2.5" />
              <span>Customize Options</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
