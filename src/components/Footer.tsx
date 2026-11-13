import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { RESTAURANT_COORDS } from '../utils/distance';
import { RESTAURANT_IMAGES } from '../data/menuData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FooterProps {
  onSelectCategory?: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const handleCategoryJump = (category: string) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    }
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full max-w-full overflow-hidden bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden bg-[#18202c] ring-2 ring-orange-500/35 shadow-md shrink-0">
                <img
                  src={RESTAURANT_IMAGES.brandLogo}
                  alt="Al Riaz Foods Official Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight block leading-none">
                  Al Riaz Foods
                </span>
                <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 tracking-wider uppercase mt-1 block">
                  BBQ & Fast Food
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              Authentic Karachi BBQ, stone-baked pizzas, crunchy chicken broast, and juicy smash burgers. Prepared fresh daily at our live kitchen in Sector 4, Surjani Town.
            </p>
          </div>

          {/* Quick Menu Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Menu Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryJump('bbq')}
                  className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left"
                >
                  Charcoal Chicken Tikka & Seekh Kababs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryJump('pizza')}
                  className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left"
                >
                  Hand-Tossed Tikka & Fajita Pizzas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryJump('burger')}
                  className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left"
                >
                  Double Smash Beef & Zinger Burgers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryJump('broast')}
                  className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left"
                >
                  Golden Crispy Chicken Broast
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryJump('deals')}
                  className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left"
                >
                  Family & Friends Feast Combos
                </button>
              </li>
              <li>
                <a href="#catering" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                  Event Deghs & Catering
                </a>
              </li>
            </ul>
          </div>

          {/* Operational Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Operating Hours
            </h4>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold">
                <Clock className="w-4 h-4" />
                <span>Monday – Sunday</span>
              </div>
              <p className="text-slate-900 dark:text-slate-300 font-semibold">4:00 PM – 3:00 AM</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                Late night food ordering and takeaway available throughout Karachi.
              </p>
            </div>
          </div>

          {/* Contact & Map */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Contact & Location
            </h4>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
                <span>{RESTAURANT_COORDS.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0" />
                <a href={`tel:${RESTAURANT_COORDS.phone}`} className="hover:underline font-mono font-bold text-slate-900 dark:text-white">
                  {RESTAURANT_COORDS.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <WhatsAppIcon variant="badge" className="w-4 h-4 shrink-0" />
                <a
                  href={`https://wa.me/${RESTAURANT_COORDS.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline font-mono text-emerald-700 dark:text-emerald-400 font-bold"
                >
                  WhatsApp: 0319-2635132
                </a>
              </p>
              <div className="pt-1">
                <a
                  href={RESTAURANT_COORDS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400 hover:text-orange-500 dark:hover:text-orange-300 font-bold"
                >
                  View on Google Maps &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Al Riaz Foods. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
            <span>Online Food Ordering & Fresh Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
