import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Phone, MapPin, Award, Clock, RotateCcw, LogOut, ChevronRight, ShoppingBag, Printer } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { OrderReceiptModal } from './OrderReceiptModal';
import { Order } from '../types';

export const CustomerDashboardModal: React.FC = () => {
  const { user, orders, isDashboardOpen, setIsDashboardOpen, logout, setTrackedOrderId, setIsOrderTrackingOpen } = useAuth();
  const { addToCart, setIsCartOpen } = useCart();
  const [receiptOrder, setReceiptOrder] = useState<Order | null>(null);

  if (!isDashboardOpen || !user) return null;

  const handleReorder = (order: typeof orders[0]) => {
    order.items.forEach((item) => {
      // Re-add to cart
      addToCart(
        {
          id: item.menuItemId,
          name: item.name,
          category: 'deals',
          description: '',
          price: item.price,
          image: item.image,
          preparationTimeMinutes: 20,
        },
        0,
        item.selectedSize
      );
    });
    setIsDashboardOpen(false);
    setIsCartOpen(true);
  };

  const handleTrack = (orderId: string) => {
    setTrackedOrderId(orderId);
    setIsDashboardOpen(false);
    setIsOrderTrackingOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl max-h-[92dvh] flex flex-col overflow-hidden rounded-t-3xl sm:rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl"
        >
          {/* Sticky Header */}
          <div className="shrink-0 p-5 sm:p-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 text-white relative">
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={() => setIsDashboardOpen(false)}
                className="inline-flex items-center gap-1 py-1 px-2.5 rounded-full bg-black/25 hover:bg-black/35 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <span>← Back</span>
              </button>
              <button
                type="button"
                onClick={() => setIsDashboardOpen(false)}
                className="p-1.5 rounded-full bg-black/25 hover:bg-black/35 text-white transition-colors cursor-pointer"
                aria-label="Close dashboard"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover ring-2 ring-white/60 shadow-lg"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-200">
                  Al Riaz Club Member
                </span>
                <h3 className="text-xl sm:text-2xl font-black">{user.name}</h3>
                <p className="text-xs text-emerald-100">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* Quick Metrics / Rewards Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Loyalty Points</span>
                  <p className="text-base font-black font-mono text-slate-900 dark:text-white">
                    {user.loyaltyPoints} Pts
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Total Orders</span>
                  <p className="text-base font-black font-mono text-slate-900 dark:text-white">
                    {orders.length}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Primary Hub</span>
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[110px]">
                    Sector 4, Surjani
                  </p>
                </div>
              </div>
            </div>

            {/* Past Orders History */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                Recent Orders & Live Deliveries
              </h4>

              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {orders.length === 0 ? (
                  <p className="text-xs text-slate-500 py-4 text-center">No orders placed yet.</p>
                ) : (
                  orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-slate-900 dark:text-white">
                            #{order.id}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              order.status === 'delivered'
                                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                                : 'bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 animate-pulse'
                            }`}
                          >
                            {order.status === 'on_way'
                              ? 'Out for Delivery'
                              : order.status === 'kitchen'
                              ? 'Preparing'
                              : order.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                          {order.items.map((it) => `${it.quantity}x ${it.name}`).join(', ')}
                        </p>
                        <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                          Rs. {order.total.toLocaleString()} · {order.deliveryArea} ({order.distanceKm} km)
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => setReceiptOrder(order)}
                          className="flex items-center gap-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-colors"
                          title="View receipt"
                        >
                          <Printer className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>Receipt</span>
                        </button>
                        {order.status !== 'delivered' && (
                          <button
                            type="button"
                            onClick={() => handleTrack(order.id)}
                            className="py-1.5 px-3 rounded-lg text-xs font-semibold bg-sky-600 text-white hover:bg-sky-500 transition-colors"
                          >
                            Track Live
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleReorder(order)}
                          className="flex items-center gap-1 py-1.5 px-3 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Re-Order</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Logout Action */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-500">
                Logged in as {user.email}
              </span>
              <button
                type="button"
                onClick={logout}
                className="flex items-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Receipt View Modal */}
          <OrderReceiptModal
            order={receiptOrder}
            isOpen={Boolean(receiptOrder)}
            onClose={() => setReceiptOrder(null)}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
