import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Phone, Utensils } from 'lucide-react';
import { RESTAURANT_IMAGES } from '../data/menuData';
import { RESTAURANT_COORDS } from '../utils/distance';
import { WhatsAppIcon } from './WhatsAppIcon';

export const CateringSection: React.FC = () => {
  const [guestsCount, setGuestsCount] = useState<number>(50);
  const [selectedPackage, setSelectedPackage] = useState<'daawat' | 'bbq_live' | 'fastfood'>('daawat');

  const packages = {
    daawat: {
      name: 'Family Daawat & Degh Feast',
      pricePerHead: 850,
      features: [
        'Fresh Chicken Biryani / Pulao Degh',
        'Charcoal Chicken Tikka (Breast/Leg)',
        'Beef Seekh Kababs with Chutney',
        'Tandoori Roghani Naan / Paratha',
        'Fresh Mint Raita & Salad',
        'Special Shahi Kheer / Sweet Dish',
      ],
    },
    bbq_live: {
      name: 'Live Charcoal BBQ Grill Service',
      pricePerHead: 1100,
      features: [
        'Live On-Site Charcoal Grilling Chefs',
        'Chicken Malai Boti & Chicken Tikka',
        'Beef Seekh Kababs & Reshmi Kababs',
        'Hot Fresh Puri Parathas & Tandoori Naan',
        'Assorted Chutneys & Fresh Salad Bar',
        'Cold Drinks (Choice of 345ml Cans)',
      ],
    },
    fastfood: {
      name: 'Fast Food & Pizza Party Package',
      pricePerHead: 750,
      features: [
        'Assorted Medium Hand-Tossed Pizzas',
        'Crispy Chicken Zinger Burgers',
        'Golden Chicken Broast Pieces',
        'Crispy Crinkle Fries with Dips',
        'Spicy Buffalo Wings (6 Pcs)',
        'Chilled 1.5L Cold Drinks',
      ],
    },
  };

  const currentPkg = packages[selectedPackage];
  const estimatedCost = guestsCount * currentPkg.pricePerHead;

  return (
    <section id="catering" className="w-full max-w-full overflow-hidden py-14 md:py-20 bg-slate-100 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-2">
            <Utensils className="w-3.5 h-3.5" />
            <span>Al Riaz Pakwan & Event Catering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Catering for Parties, Weddings & Daawats
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 font-sans">
            Fresh deghs, live BBQ stations, and bulk fast-food catering across Karachi
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Packages selection */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(['daawat', 'bbq_live', 'fastfood'] as const).map((pkgKey) => {
                const pkg = packages[pkgKey];
                const isSelected = selectedPackage === pkgKey;
                return (
                  <button
                    key={pkgKey}
                    type="button"
                    onClick={() => setSelectedPackage(pkgKey)}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      isSelected
                        ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-500 ring-2 ring-orange-500/30 shadow-md'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 block mb-1">
                      Rs. {pkg.pricePerHead}/head
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug">
                      {pkg.name}
                    </h4>
                  </button>
                );
              })}
            </div>

            {/* Package details */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {currentPkg.name}
                  </h3>
                  <p className="text-xs text-orange-600 dark:text-orange-400 font-mono font-semibold">
                    Complete Food & Packing Service
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black font-mono text-orange-600 dark:text-orange-400">
                    Rs. {currentPkg.pricePerHead}
                  </span>
                  <span className="text-xs text-slate-400 block">per person</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                {currentPkg.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-2xl overflow-hidden aspect-[16/7] border border-slate-200 dark:border-slate-800 shadow-md group"
              >
                <img
                  src={RESTAURANT_IMAGES.royalBuffetSpread}
                  alt="Al Riaz Pakwan & Catering Feast"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white">
                  <span className="text-xs font-bold">Live Charcoal &amp; Fresh Deghs</span>
                  <span className="text-[10px] font-mono bg-orange-600/90 px-2 py-0.5 rounded-full">Karachi Wide</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Calculator Card */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                  Instant Estimate
                </span>
                <h4 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                  Plan Your Event Menu
                </h4>
              </div>

              {/* Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Gathering Size:</span>
                  <span className="font-mono font-bold text-orange-600 dark:text-orange-400 text-sm">
                    {guestsCount} Guests
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>20 Persons</span>
                  <span>100 Persons</span>
                  <span>250 Persons</span>
                  <span>500+ Persons</span>
                </div>
              </div>

              {/* Cost Box */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                    Estimated Package Total
                  </span>
                  <span className="text-2xl font-black font-mono text-orange-600 dark:text-orange-400">
                    Rs. {estimatedCost.toLocaleString()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-700 dark:text-slate-300 font-bold block">
                    Fresh Degh Service
                  </span>
                  <span className="text-[10px] text-slate-500">Delivered Warm</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <a
                  href={`https://wa.me/${RESTAURANT_COORDS.whatsapp}?text=${
                    `*AL RIAZ PAKWAN & CATERING INQUIRY*%0A` +
                    `*Package:* ${encodeURIComponent(currentPkg.name)}%0A` +
                    `*Guests:* ${guestsCount} Persons%0A` +
                    `*Rate Per Head:* Rs. ${currentPkg.pricePerHead}%0A` +
                    `*Estimated Total:* Rs. ${estimatedCost.toLocaleString()}%0A%0A` +
                    `Please%20contact%20me%20to%20discuss%20booking%20date%2C%20venue%2C%20and%20delivery%20arrangements.`
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:from-red-500 hover:to-amber-500 transition-all shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <WhatsAppIcon variant="mono" className="w-4 h-4 fill-white" />
                  <span>Send Catering Inquiry via WhatsApp</span>
                </a>

                <a
                  href={`tel:${RESTAURANT_COORDS.phone}`}
                  className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 bg-slate-100 dark:bg-slate-800 flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-orange-500" />
                  <span>Call Catering Hotline: {RESTAURANT_COORDS.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
