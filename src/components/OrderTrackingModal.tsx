import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Clock, ChefHat, Bike, MapPin, Phone, Search } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useAuth } from '../context/AuthContext';
import { RESTAURANT_COORDS } from '../utils/distance';

export const OrderTrackingModal: React.FC = () => {
  const { isOrderTrackingOpen, setIsOrderTrackingOpen, orders, trackedOrderId, setTrackedOrderId } = useAuth();
  const [searchInput, setSearchInput] = useState('');

  if (!isOrderTrackingOpen) return null;

  const currentOrder = orders.find((o) => o.id === trackedOrderId) || orders[0] || null;

  const steps = [
    { key: 'placed', label: 'Order Received', desc: 'Verified by counter', icon: CheckCircle },
    { key: 'kitchen', label: 'In the Kitchen', desc: 'Live BBQ & Pizza baking', icon: ChefHat },
    { key: 'on_way', label: 'Out for Delivery', desc: 'Rider dispatched', icon: Bike },
    { key: 'delivered', label: 'Delivered', desc: 'Enjoy your hot meal', icon: MapPin },
  ];

  const getStepStatus = (stepKey: string, currentStatus: string) => {
    const orderRanks: Record<string, number> = {
      placed: 1,
      kitchen: 2,
      on_way: 3,
      delivered: 4,
    };
    const currentRank = orderRanks[currentStatus] || 1;
    const targetRank = orderRanks[stepKey] || 1;

    if (currentRank > targetRank) return 'completed';
    if (currentRank === targetRank) return 'current';
    return 'pending';
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const cleanId = searchInput.trim().toUpperCase().replace('#', '');
    const found = orders.find((o) => o.id.toUpperCase() === cleanId || o.id.toUpperCase().includes(cleanId));
    if (found) {
      setTrackedOrderId(found.id);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl max-h-[92dvh] flex flex-col overflow-hidden rounded-t-3xl sm:rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl"
        >
          {/* Sticky Header with Back & Close */}
          <div className="shrink-0 p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/80">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsOrderTrackingOpen(false)}
                className="inline-flex items-center gap-1 py-1.5 px-2.5 rounded-xl bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                <span>← Back</span>
              </button>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                  Live Order Tracking
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                  Al Riaz Foods Kitchen & Dispatch
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOrderTrackingOpen(false)}
              className="p-2 rounded-xl bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Close tracking modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* Search Track Order by ID input */}
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Enter Order ID (e.g. ARF-7821)..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>
              <button
                type="submit"
                className="py-2 px-4 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors cursor-pointer"
              >
                Track
              </button>
            </form>

            {currentOrder ? (
              <div className="space-y-6">
                {/* Status Hero Card (Light & Dark Mode Compatible) */}
                <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-gradient-to-br dark:from-emerald-950 dark:via-slate-900 dark:to-sky-950 border border-emerald-200 dark:border-emerald-800/40 text-slate-900 dark:text-white">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div>
                      <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                        Order ID: #{currentOrder.id}
                      </span>
                      <h4 className="text-lg font-black mt-0.5">
                        {currentOrder.status === 'placed' && 'Order Received & Queued'}
                        {currentOrder.status === 'kitchen' && 'Sizzling on Charcoal & In Oven'}
                        {currentOrder.status === 'on_way' && 'Rider on the Way to Your Door'}
                        {currentOrder.status === 'delivered' && 'Order Delivered'}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-bold font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        Est. {currentOrder.estimatedDeliveryMinutes} Mins
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Destination: <span className="font-semibold text-slate-900 dark:text-white">{currentOrder.deliveryAddress}</span>
                  </p>
                </div>

                {/* 4-Step Vertical Timeline */}
                <div className="space-y-4 px-2">
                  {steps.map((st, idx) => {
                    const status = getStepStatus(st.key, currentOrder.status);
                    const Icon = st.icon;
                    return (
                      <div key={st.key} className="flex items-start gap-4 relative">
                        {/* Connecting Line */}
                        {idx < steps.length - 1 && (
                          <div
                            className={`absolute left-5 top-10 bottom-0 w-0.5 -ml-[1px] ${
                              status === 'completed'
                                ? 'bg-emerald-500'
                                : 'bg-slate-200 dark:bg-slate-800'
                            }`}
                          />
                        )}

                        {/* Icon Node */}
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                            status === 'completed'
                              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                              : status === 'current'
                              ? 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white ring-4 ring-emerald-500/20 shadow-md'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        {/* Text */}
                        <div className="pt-1 flex-1">
                          <h5
                            className={`text-sm font-bold ${
                              status === 'current'
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-slate-900 dark:text-white'
                            }`}
                          >
                            {st.label}
                          </h5>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {st.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Rider & Hotline Contact Bar */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      Rider: {currentOrder.riderName || 'Al Riaz Express Rider'}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Surjani / 4K Chowrangi Fleet
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${RESTAURANT_COORDS.phone}`}
                      className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200"
                      title="Call Dispatcher"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <a
                      href={`https://wa.me/${RESTAURANT_COORDS.whatsapp}?text=Tracking%20Order%20${currentOrder.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500"
                      title="WhatsApp Dispatcher"
                    >
                      <WhatsAppIcon variant="mono" className="w-4 h-4 fill-white" />
                    </a>
                  </div>
                </div>

                {/* Itemized Order List */}
                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                  <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px]">
                    Items in This Order:
                  </span>
                  {currentOrder.items.map((it) => (
                    <div key={it.id} className="flex justify-between text-slate-700 dark:text-slate-300">
                      <span>{it.quantity}x {it.name} {it.selectedSize ? `(${it.selectedSize})` : ''}</span>
                      <span className="font-mono font-bold">Rs. {(it.price * it.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between font-bold text-sm text-slate-900 dark:text-white">
                    <span>Grand Total:</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400">Rs. {currentOrder.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500">
                <p>No active order found. Place an order or enter your order ID above.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
