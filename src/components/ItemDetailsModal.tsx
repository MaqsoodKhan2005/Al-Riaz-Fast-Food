import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Flame, Clock, Check, Utensils, Sparkles, MessageSquare } from 'lucide-react';
import { MenuItem } from '../types';
import { useCart } from '../context/CartContext';

interface ItemDetailsModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const AVAILABLE_ADDONS = [
  { id: 'cheese', name: 'Extra Melted Mozzarella Cheese', price: 100 },
  { id: 'garlic_mayo', name: 'Creamy Garlic Mayo Dip', price: 50 },
  { id: 'raita', name: 'Special Mint Raita & Fresh Salad', price: 40 },
  { id: 'fries', name: 'Crispy Masala Crinkle Fries', price: 120 },
  { id: 'drink', name: 'Chilled Cold Drink Can (345ml)', price: 110 },
];

const SPICE_LEVELS = ['Mild Flavor', 'Standard Medium', 'Extra Hot & Spicy'];

export const ItemDetailsModal: React.FC<ItemDetailsModalProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  const { addToCart } = useCart();
  const imgRef = useRef<HTMLImageElement>(null);

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedSpice, setSelectedSpice] = useState('Standard Medium');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  // Reset local state when a new item opens
  useEffect(() => {
    if (item) {
      setSelectedSizeIndex(0);
      setSelectedSpice('Standard Medium');
      setSelectedAddons([]);
      setSpecialInstructions('');
      setQuantity(1);
      setIsAddedFeedback(false);
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const currentSize = item.sizes ? item.sizes[selectedSizeIndex] : null;
  const sizePriceDelta = currentSize ? currentSize.priceDelta : 0;

  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const found = AVAILABLE_ADDONS.find((a) => a.id === addonId);
    return sum + (found ? found.price : 0);
  }, 0);

  const singleItemPrice = item.price + sizePriceDelta + addonsTotal;
  const totalPrice = singleItemPrice * quantity;

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  const handleAddToCart = () => {
    const addonNames = selectedAddons.map((id) => {
      const found = AVAILABLE_ADDONS.find((a) => a.id === id);
      return found ? found.name : id;
    });

    addToCart(
      item,
      sizePriceDelta + addonsTotal,
      currentSize?.name,
      specialInstructions.trim() || undefined,
      imgRef.current,
      quantity,
      addonNames,
      selectedSpice
    );

    setIsAddedFeedback(true);
    setTimeout(() => {
      setIsAddedFeedback(false);
      onClose();
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-lg overflow-hidden rounded-t-3xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[92dvh]"
        >
          {/* Back button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 left-4 z-20 inline-flex items-center gap-1 py-1.5 px-3 rounded-full bg-black/55 hover:bg-black/75 text-white text-xs font-bold backdrop-blur-md transition-colors cursor-pointer"
            aria-label="Go back"
          >
            <span>← Back</span>
          </button>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/55 hover:bg-black/75 text-white backdrop-blur-md transition-colors cursor-pointer"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scrollable Content */}
          <div className="overflow-y-auto flex-1">
            {/* Food Image Banner */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
              <img
                ref={imgRef}
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {item.badge && (
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold text-white bg-gradient-to-r from-red-600 to-orange-600">
                        {item.badge}
                      </span>
                    )}
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-orange-400">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black">{item.name}</h3>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
                  <Clock className="w-3.5 h-3.5 text-amber-300" />
                  <span>{item.preparationTimeMinutes} Mins</span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-6">
              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.description}
              </p>

              {/* Size / Portion Selection */}
              {item.sizes && item.sizes.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5 text-orange-500" />
                      Select Portion / Size:
                    </span>
                    <span className="text-[11px] text-slate-400">Required</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {item.sizes.map((sz, idx) => {
                      const isSelected = selectedSizeIndex === idx;
                      const isLastOdd = item.sizes!.length % 2 === 1 && idx === item.sizes!.length - 1;
                      return (
                        <button
                          key={sz.name}
                          type="button"
                          onClick={() => setSelectedSizeIndex(idx)}
                          className={`p-2.5 rounded-xl text-left border transition-all ${
                            isLastOdd ? 'col-span-2 sm:col-span-1' : 'col-span-1'
                          } ${
                            isSelected
                              ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-500 ring-2 ring-orange-500/30'
                              : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <span className="text-xs font-bold block text-slate-900 dark:text-white">
                            {sz.name}
                          </span>
                          <span className="text-[11px] font-mono text-orange-600 dark:text-orange-400 font-semibold">
                            {sz.priceDelta > 0 ? `+Rs. ${sz.priceDelta}` : 'Standard Price'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Spice Level Preference */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-red-500" />
                  Spice Level:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {SPICE_LEVELS.map((spice) => {
                    const isSelected = selectedSpice === spice;
                    return (
                      <button
                        key={spice}
                        type="button"
                        onClick={() => setSelectedSpice(spice)}
                        className={`py-2 px-2 rounded-xl text-center text-xs font-semibold border transition-all ${
                          isSelected
                            ? 'bg-red-50 dark:bg-red-950/40 border-red-500 text-red-600 dark:text-red-400 ring-2 ring-red-500/30'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {spice}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Gourmet Add-ons */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Recommended Add-ons:
                  </span>
                  <span className="text-[11px] text-slate-400">Optional</span>
                </div>
                <div className="space-y-2">
                  {AVAILABLE_ADDONS.map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <label
                        key={addon.id}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500'
                            : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleAddon(addon.id)}
                            className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 rounded border-slate-300 cursor-pointer"
                          />
                          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                            {addon.name}
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                          +Rs. {addon.price}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Kitchen Instructions */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                  Special Kitchen Instructions:
                </label>
                <textarea
                  rows={2}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g., Please make it crispy, pack raita separately, extra napkins..."
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Footer Action Bar */}
          <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 flex items-center justify-between gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-mono font-bold text-sm text-slate-900 dark:text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex-1 py-3 px-5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 ${
                isAddedFeedback
                  ? 'bg-emerald-600 shadow-emerald-600/30'
                  : 'bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:from-red-500 hover:to-amber-500 shadow-orange-500/25'
              }`}
            >
              {isAddedFeedback ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <span>Add to Order</span>
                  <span>·</span>
                  <span className="font-mono">Rs. {totalPrice.toLocaleString()}</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
