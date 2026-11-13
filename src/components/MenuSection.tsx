import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, X, Sparkles, Tag } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS, RESTAURANT_IMAGES } from '../data/menuData';
import { MenuItemCard } from './MenuItemCard';
import { MenuGridSkeleton } from './MenuSkeleton';
import { ItemDetailsModal } from './ItemDetailsModal';
import { MenuItem } from '../types';

interface MenuSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

// Visual category icons for circular category bar
const CATEGORY_VISUALS: Record<string, { label: string; iconImage: string }> = {
  all: { label: 'All Items', iconImage: RESTAURANT_IMAGES.bbqPlatter },
  bbq: { label: 'BBQ', iconImage: RESTAURANT_IMAGES.bbqPlatter },
  pizza: { label: 'Pizzas', iconImage: RESTAURANT_IMAGES.pizzaSpecial },
  burger: { label: 'Burgers', iconImage: RESTAURANT_IMAGES.beefBurger },
  broast: { label: 'Broast', iconImage: RESTAURANT_IMAGES.crispyBroast },
  roll: { label: 'Rolls', iconImage: RESTAURANT_IMAGES.bbqPlatter },
  deals: { label: 'Deals', iconImage: RESTAURANT_IMAGES.pizzaSpecial },
  beverages: { label: 'Drinks', iconImage: RESTAURANT_IMAGES.crispyBroast },
};

interface QuickChip {
  key: string;
  label: string;
  categoryTarget: string;
}

// Quick Filter Chips (NO "All" button per user request)
const INITIAL_QUICK_CHIPS: QuickChip[] = [
  { key: 'bbq', label: 'BBQ', categoryTarget: 'bbq' },
  { key: 'pizza', label: 'Pizza', categoryTarget: 'pizza' },
  { key: 'fastfood', label: 'Fast Food', categoryTarget: 'fastfood' },
  { key: 'burger', label: 'Burgers', categoryTarget: 'burger' },
  { key: 'broast', label: 'Crispy Broast', categoryTarget: 'broast' },
  { key: 'roll', label: 'Paratha Rolls', categoryTarget: 'roll' },
  { key: 'deals', label: 'Family Deals', categoryTarget: 'deals' },
];

export const MenuSection: React.FC<MenuSectionProps> = ({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
}) => {
  const [chipOrder, setChipOrder] = useState<QuickChip[]>(INITIAL_QUICK_CHIPS);
  const [activeChipKey, setActiveChipKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initial load skeleton simulation to prevent layout shifts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // Sync activeChipKey & rotate chip to front when activeCategory changes externally (e.g. Hero/Footer/Category avatars)
  useEffect(() => {
    if (activeCategory === 'all') {
      setActiveChipKey(null);
      return;
    }
    const matching = INITIAL_QUICK_CHIPS.find((c) => c.categoryTarget === activeCategory);
    if (matching) {
      setActiveChipKey(matching.key);
      setChipOrder((prev) => {
        const idx = prev.findIndex((c) => c.key === matching.key);
        if (idx <= 0) return prev;
        return [...prev.slice(idx), ...prev.slice(0, idx)];
      });
    } else {
      setActiveChipKey(null);
    }
  }, [activeCategory]);

  const rotateChipToFront = (targetKey: string) => {
    setChipOrder((prev) => {
      const idx = prev.findIndex((c) => c.key === targetKey);
      if (idx <= 0) return prev;
      return [...prev.slice(idx), ...prev.slice(0, idx)];
    });
  };

  const handleChipClick = (chip: QuickChip) => {
    if (activeChipKey === chip.key) {
      // Toggle off to show all dishes cleanly
      setActiveChipKey(null);
      setActiveCategory('all');
      return;
    }
    rotateChipToFront(chip.key);
    setActiveChipKey(chip.key);
    setActiveCategory(chip.categoryTarget);
  };

  const handleCategoryVisualClick = (catId: string) => {
    setActiveCategory(catId);
    if (catId === 'all') {
      setActiveChipKey(null);
      setSearchQuery('');
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setActiveChipKey(null);
    setChipOrder(INITIAL_QUICK_CHIPS);
  };

  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return MENU_ITEMS.filter((item) => {
      let matchesCategory = true;
      if (activeCategory === 'fastfood') {
        matchesCategory =
          item.category === 'burger' ||
          item.category === 'broast' ||
          item.category === 'pizza' ||
          item.category === 'roll';
      } else if (activeCategory !== 'all') {
        matchesCategory = item.category === activeCategory;
      }

      if (!q) return matchesCategory;

      const matchesSearch =
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (q === 'fast food' &&
          (item.category === 'burger' ||
            item.category === 'broast' ||
            item.category === 'pizza' ||
            item.category === 'roll'));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Show 3 full-width chips on mobile, 5 full-width chips on tablet/desktop (zero cut-offs, zero empty space)
  const visibleChipCount = isMobile ? 3 : 5;
  const visibleChips = chipOrder.slice(0, visibleChipCount);

  const activeCategoryLabel =
    activeCategory === 'fastfood'
      ? 'Fast Food'
      : MENU_CATEGORIES.find((c) => c.id === activeCategory)?.label || activeCategory;

  return (
    <section id="menu" className="w-full max-w-full overflow-hidden py-8 md:py-16 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      {/* Circular Category Nav Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500" />
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
              Explore By Categories
            </h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
            Scroll horizontally to view all
          </span>
        </div>

        {/* Circular Category Avatars Row */}
        <div className="flex items-start gap-2 sm:gap-4 overflow-x-auto px-2 py-2 no-scrollbar scroll-smooth snap-x snap-mandatory">
          {MENU_CATEGORIES.map((cat, idx) => {
            const visual = CATEGORY_VISUALS[cat.id];
            const isSelected = activeCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                type="button"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleCategoryVisualClick(cat.id)}
                className="w-20 sm:w-24 shrink-0 flex flex-col items-center text-center group focus:outline-none snap-start cursor-pointer"
              >
                <div className="p-1">
                  <div
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden p-0.5 transition-all duration-300 transform group-hover:scale-105 ${
                      isSelected
                        ? 'ring-4 ring-orange-500 shadow-lg shadow-orange-500/30 scale-105'
                        : 'ring-2 ring-slate-200 dark:ring-slate-800 group-hover:ring-orange-400'
                    }`}
                  >
                    <img
                      src={visual?.iconImage || RESTAURANT_IMAGES.bbqPlatter}
                      alt={cat.label}
                      onError={(e) => {
                        e.currentTarget.src = '/assets/images/product_bbq_platter_1794331380474.jpg';
                      }}
                      className="w-full h-full rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-orange-600/20 rounded-full" />
                    )}
                  </div>
                </div>
                <span
                  className={`text-xs font-bold text-center leading-tight line-clamp-2 w-full mt-1 transition-colors ${
                    isSelected
                      ? 'text-orange-600 dark:text-orange-400'
                      : 'text-slate-700 dark:text-slate-300 group-hover:text-orange-500'
                  }`}
                >
                  {cat.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* QUICK FILTER CHIPS CAROUSEL (Rotating Bouncing Animation, Full Width Fill, No "All" Button) */}
      <div className="p-3.5 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Quick Filter Chips:
            </span>
          </div>

          {(activeCategory !== 'all' || searchQuery) && (
            <div className="flex items-center gap-2 text-xs text-orange-600 dark:text-orange-400 font-semibold">
              <span>
                Showing:{' '}
                {activeCategory !== 'all' ? `"${activeCategoryLabel}"` : ''}
                {activeCategory !== 'all' && searchQuery ? ' + ' : ''}
                {searchQuery ? `"${searchQuery}"` : ''}
              </span>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 py-1 px-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                title="Clear filters & show all dishes"
              >
                <X className="w-3.5 h-3.5" />
                <span className="text-[11px]">Reset</span>
              </button>
            </div>
          )}
        </div>

        {/* Full-Width Bouncing Carousel Row (No arrows, maximum width so labels never cut off) */}
        <div className="w-full overflow-hidden py-1">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2 sm:gap-2.5 w-full">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleChips.map((chip) => {
                const isChipActive = activeChipKey === chip.key;
                return (
                  <motion.button
                    key={chip.key}
                    layout
                    type="button"
                    onClick={() => handleChipClick(chip)}
                    initial={{ opacity: 0, scale: 0.8, x: 28 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -28 }}
                    transition={{
                      type: 'spring',
                      stiffness: 440,
                      damping: 20,
                      mass: 0.85,
                    }}
                    whileTap={{ scale: 0.92 }}
                    className={`w-full py-2.5 px-1.5 sm:px-3 rounded-xl text-[11px] sm:text-xs font-bold text-center whitespace-nowrap cursor-pointer transition-colors ${
                      isChipActive
                        ? 'bg-gradient-to-r from-red-600 via-orange-600 to-amber-500 text-white shadow-md shadow-orange-500/30 ring-2 ring-orange-400/50'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/70'
                    }`}
                  >
                    {chip.label}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Live Search Input Box */}
        <div className="relative w-full pt-0.5">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="menu-search-input"
            type="text"
            placeholder="Search dish name, ingredients, e.g. Tikka, Zinger, Broast, Malai Boti..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-inner"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Results Count Strip */}
      <div id="menu-results" className="flex items-center justify-between mb-5 px-0.5">
        <h3 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          {activeCategory === 'all' && !searchQuery
            ? 'All Delicious Dishes'
            : `Showing ${activeCategory !== 'all' ? activeCategoryLabel : 'Search'} (${filteredItems.length})`}
        </h3>
        <span className="text-[11px] sm:text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
          {filteredItems.length} items
        </span>
      </div>

      {/* Grid of Food Items: Strictly 2 columns on mobile (grid-cols-2) + 3-4 on tablet/desktop */}
      {isLoading ? (
        <MenuGridSkeleton count={8} />
      ) : filteredItems.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
            {filteredItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onCustomize={(it) => setCustomizingItem(it)}
              />
            ))}
          </div>

          {/* Interactive Item Customization Modal */}
          <ItemDetailsModal
            item={customizingItem}
            isOpen={Boolean(customizingItem)}
            onClose={() => setCustomizingItem(null)}
          />
        </>
      ) : (
        <div className="p-10 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900">
          <Filter className="w-8 h-8 mx-auto text-slate-400 mb-2" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            No dishes found matching your filter
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Try clearing your search or picking another category chip above.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-4 px-4 py-2 rounded-lg text-xs font-semibold bg-orange-600 text-white hover:bg-orange-500 transition-colors cursor-pointer"
          >
            Show All Menu Items
          </button>
        </div>
      )}

      {/* Special Deals Banner */}
      <div id="deals" className="mt-14 pt-10 border-t border-slate-200 dark:border-slate-800">
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                Value Saving Combos
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                Family & Friends Feast Deals
              </h3>
              <p className="text-xs sm:text-sm text-white/90 max-w-xl">
                Get full bundle combos featuring medium tikka pizzas, crispy zinger burgers, BBQ platters, and chilled cold drinks.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('deals');
                document.getElementById('menu-results')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="py-3 px-6 rounded-xl font-bold text-sm text-orange-950 bg-white hover:bg-amber-100 transition-colors shrink-0 shadow-lg cursor-pointer"
            >
              Explore Combo Deals
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
