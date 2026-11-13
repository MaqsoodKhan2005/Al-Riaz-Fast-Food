import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, Bike, ShoppingBag, X, Check, Loader2 } from 'lucide-react';
import { useLocation } from '../context/LocationContext';
import { KARACHI_AREAS, RESTAURANT_COORDS } from '../utils/distance';

export const LocationModal: React.FC = () => {
  const {
    orderType,
    setOrderType,
    selectedArea,
    setSelectedArea,
    isLocationModalOpen,
    setIsLocationModalOpen,
    detectCurrentLocation,
    isDetectingLocation,
    locationError,
  } = useLocation();

  const [tempAreaId, setTempAreaId] = useState<string>(selectedArea.id);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isLocationModalOpen) return null;

  const filteredAreas = KARACHI_AREAS.filter(
    (area) =>
      area.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      area.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentSelection =
    KARACHI_AREAS.find((a) => a.id === tempAreaId) || selectedArea;

  const handleConfirm = () => {
    const area = KARACHI_AREAS.find((a) => a.id === tempAreaId);
    if (area) {
      setSelectedArea(area);
    }
    localStorage.setItem('alriaz_has_chosen_location', 'true');
    setIsLocationModalOpen(false);
  };

  const handleAutoDetect = async () => {
    const success = await detectCurrentLocation();
    if (success) {
      setTimeout(() => {
        setIsLocationModalOpen(false);
      }, 500);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-lg max-h-[92dvh] flex flex-col overflow-hidden rounded-t-3xl sm:rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl"
        >
          {/* Top Brand Banner Header (Pinned) */}
          <div className="shrink-0 relative p-5 sm:p-6 text-center bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 text-white">
            <button
              type="button"
              onClick={() => setIsLocationModalOpen(false)}
              className="absolute top-4 left-4 inline-flex items-center gap-1 py-1 px-2.5 rounded-full bg-black/25 hover:bg-black/35 text-white text-xs font-bold transition-colors cursor-pointer"
              aria-label="Go back"
            >
              <span>← Back</span>
            </button>

            <button
              type="button"
              onClick={() => setIsLocationModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-black/25 hover:bg-black/35 text-white transition-colors cursor-pointer"
              aria-label="Close location modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center justify-center w-12 h-12 mb-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Select Your Order Type</h2>
            <p className="mt-1 text-xs text-emerald-100 font-medium">
              Serving Sector 4, 4K Chowrangi, Surjani Town & across Karachi
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
            {/* Order Type Tabs: Delivery vs Takeaway */}
            <div className="grid grid-cols-2 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                  orderType === 'delivery'
                    ? 'bg-gradient-to-r from-emerald-500 to-sky-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Bike className="w-4 h-4" />
                Delivery
              </button>
              <button
                type="button"
                onClick={() => setOrderType('takeaway')}
                className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                  orderType === 'takeaway'
                    ? 'bg-gradient-to-r from-emerald-500 to-sky-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                Takeaway / Pickup
              </button>
            </div>

            {orderType === 'takeaway' ? (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-center">
                <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
                  Pick up your order fresh & hot from our counter
                </p>
                <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-300">
                  {RESTAURANT_COORDS.address}
                </p>
                <p className="mt-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Delivery Fee: Rs. 0 (Free)
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
                    Please select your delivery area
                  </p>
                </div>

                {/* GPS Auto-Detect Button */}
                <button
                  type="button"
                  onClick={handleAutoDetect}
                  disabled={isDetectingLocation}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-dashed border-emerald-500/50 dark:border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100/60 dark:hover:bg-emerald-950/40 transition-colors text-sm font-medium"
                >
                  {isDetectingLocation ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-emerald-600 dark:text-emerald-400" />
                      <span>Getting your exact location...</span>
                    </>
                  ) : (
                    <>
                      <Navigation className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Use Current Location (Auto-Detect)</span>
                    </>
                  )}
                </button>

                {locationError && (
                  <p className="text-xs text-amber-600 dark:text-amber-400 text-center font-medium">
                    {locationError}
                  </p>
                )}

                {/* Search & Area List Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Select Karachi Area
                  </label>
                  <input
                    type="text"
                    placeholder="Search area (e.g. 4K Chowrangi, Surjani, North Karachi)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-2"
                  />

                  <div className="max-h-48 overflow-y-auto space-y-1 rounded-lg border border-slate-200 dark:border-slate-800 p-1 bg-slate-50 dark:bg-slate-950/50">
                    {filteredAreas.map((area) => {
                      const isSelected = tempAreaId === area.id;
                      return (
                        <button
                          key={area.id}
                          type="button"
                          onClick={() => setTempAreaId(area.id)}
                          className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between text-xs transition-colors ${
                            isSelected
                              ? 'bg-emerald-600 text-white font-semibold'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800'
                          }`}
                        >
                          <div>
                            <span className="font-medium">{area.name}</span>
                            <span className={`ml-2 text-[11px] ${isSelected ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400'}`}>
                              · {area.district}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="tabular-nums font-mono">
                              {area.distanceKm} km · Rs. {area.deliveryFee}
                            </span>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Distance & Delivery Fee Summary Card */}
                {currentSelection && (
                  <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                        {currentSelection.name}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Approx. {currentSelection.distanceKm} km away from Al Riaz Foods
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
                        Delivery: Rs. {currentSelection.deliveryFee}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        Est. {currentSelection.estimatedMinutes} mins
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Confirm Button */}
            <button
              type="button"
              onClick={handleConfirm}
              className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:from-emerald-500 hover:to-sky-500 shadow-lg shadow-emerald-500/25 transition-all"
            >
              Confirm & Start Ordering
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
