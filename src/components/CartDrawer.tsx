import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLocation } from '../context/LocationContext';

interface CartDrawerProps {
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    subtotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const {
    orderType,
    selectedArea,
    deliveryFee,
    setIsLocationModalOpen,
  } = useLocation();

  const finalDeliveryFee = orderType === 'takeaway' ? 0 : deliveryFee;
  const total = subtotal + finalDeliveryFee;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          {/* Backdrop click to close */}
          <div
            className="flex-1"
            onClick={() => setIsCartOpen(false)}
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="w-full max-w-md h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="shrink-0 p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/70">
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="sm:hidden py-1.5 px-2.5 rounded-xl bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold cursor-pointer"
                  aria-label="Go back"
                >
                  ← Back
                </button>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-orange-600 text-white flex items-center justify-center shadow-md shadow-orange-500/20">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Your Food Cart
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Al Riaz Foods · Sector 4, Surjani Town
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {cart.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-xs font-semibold text-rose-500 hover:text-rose-600 px-2 py-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-200/60 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Delivery Area Banner inside Cart */}
            <div className="px-5 py-3 bg-emerald-50/70 dark:bg-emerald-950/30 border-b border-emerald-200/70 dark:border-emerald-900/40 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div className="truncate">
                  <span className="font-bold text-slate-900 dark:text-white">
                    {orderType === 'takeaway' ? 'Takeaway Pickup' : selectedArea.name}
                  </span>
                  {orderType === 'delivery' && (
                    <span className="text-slate-500 dark:text-slate-400 ml-1">
                      ({selectedArea.distanceKm} km)
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsLocationModalOpen(true)}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline shrink-0 ml-2"
              >
                Change
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Your cart is empty
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
                    Browse our sizzling BBQ, pizzas, burgers, and crispy broast to add items to your order.
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/50 flex items-center gap-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={(e) => {
                        e.currentTarget.src = '/assets/images/product_bbq_platter_1794331380474.jpg';
                      }}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-200 dark:bg-slate-700"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                        {item.name}
                      </h4>
                      <div className="flex flex-wrap items-center gap-1.5 mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                        {item.selectedSize && <span>{item.selectedSize}</span>}
                        {item.spiceLevel && <span>· {item.spiceLevel}</span>}
                      </div>
                      {item.addOns && item.addOns.length > 0 && (
                        <p className="text-[10px] text-orange-600 dark:text-orange-400 truncate mt-0.5">
                          + {item.addOns.join(', ')}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-mono font-bold text-xs text-slate-900 dark:text-white">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </span>

                        <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-0.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-5 text-center font-mono text-xs font-bold text-slate-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors shrink-0"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Totals & Checkout */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 space-y-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Subtotal</span>
                    <span className="font-mono font-semibold">Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>
                      {orderType === 'takeaway'
                        ? 'Takeaway Pickup'
                        : `Delivery (${selectedArea.distanceKm} km)`}
                    </span>
                    <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                      {finalDeliveryFee === 0 ? 'Free' : `Rs. ${finalDeliveryFee}`}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-sm font-black text-slate-900 dark:text-white">
                    <span>Grand Total</span>
                    <span className="font-mono text-lg text-orange-600 dark:text-orange-400">
                      Rs. {total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    onCheckout();
                  }}
                  className="w-full py-3.5 px-5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:from-red-500 hover:to-amber-500 shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
