import React from 'react';
import { ShoppingBag, Sun, Moon, Search, Clock, Phone } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { RESTAURANT_COORDS } from '../utils/distance';
import { RESTAURANT_IMAGES } from '../data/menuData';

interface HeaderProps {
  onSearchClick: () => void;
  onCateringClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchClick }) => {
  const { theme, toggleTheme } = useTheme();
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { user, setIsLoginModalOpen, setIsDashboardOpen } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full max-w-full overflow-hidden backdrop-blur-xl bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200 shadow-sm">
      {/* Top Announcement Bar (Darbar-e-Madina Style) */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-medium">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-semibold">
              <Clock className="w-3.5 h-3.5 text-amber-200" />
              Kitchen Open: 4:00 PM – 3:00 AM
            </span>
            <span className="hidden sm:inline text-white/50" aria-hidden="true">|</span>
            <span className="hidden sm:inline text-white/90">
              Sector 4, Surjani Town, Karachi
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${RESTAURANT_COORDS.phone}`}
              className="flex items-center gap-1 text-white hover:text-amber-200 font-mono font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-200" />
              <span>{RESTAURANT_COORDS.phone}</span>
            </a>
            <span className="hidden md:inline text-white/50" aria-hidden="true">|</span>
            <a
              href={`https://wa.me/${RESTAURANT_COORDS.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1 text-amber-100 hover:text-white font-semibold"
            >
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-8 h-16 sm:h-20">
          {/* Brand Logo Lockup */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a href="#" className="flex items-center gap-2 sm:gap-3 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl overflow-hidden bg-[#18202c] ring-2 ring-orange-500/40 shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform shrink-0">
                <img
                  src={RESTAURANT_IMAGES.brandLogo}
                  alt="Al Riaz Foods Official Logo"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-base sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-none group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  Al Riaz Foods
                </span>
                <span className="text-[9px] sm:text-[11px] font-bold text-orange-600 dark:text-orange-400 tracking-wider uppercase mt-0.5 sm:mt-1">
                  BBQ & Fast Food
                </span>
              </div>
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <a href="#menu" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors whitespace-nowrap">
              Full Menu
            </a>
            <a href="#deals" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors whitespace-nowrap">
              Special Deals
            </a>
            <a href="#counter" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors whitespace-nowrap">
              Our Kitchen
            </a>
            <a href="#reviews" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors whitespace-nowrap">
              Customer Reviews
            </a>
          </nav>

          {/* Action Area: Search, Theme Toggle, Google Profile, Cart */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={onSearchClick}
              className="p-2 sm:p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Search menu items"
              title="Search menu"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Premium Theme Switch (Dark / Light) */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              aria-label="Toggle theme mode"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 hover:rotate-90 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Google Profile / Sign In */}
            {user ? (
              <button
                type="button"
                onClick={() => setIsDashboardOpen(true)}
                className="flex items-center gap-2 p-1 sm:p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:border-orange-500 transition-all"
                title="Customer Dashboard"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg object-cover ring-1 ring-orange-500"
                  referrerPolicy="no-referrer"
                />
                <span className="hidden sm:inline text-xs font-bold text-slate-800 dark:text-slate-200 max-w-[90px] truncate">
                  {user.name}
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center gap-1.5 py-1.5 sm:py-2 px-2.5 sm:px-3.5 rounded-xl text-xs font-bold text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-orange-500 transition-all shadow-sm"
              >
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Desktop Cart Trigger (Mobile uses Bottom Navigation Bar with target ID) */}
            <button
              id="cart-icon-target"
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="hidden sm:flex relative items-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs shadow-md shadow-orange-500/25 active:scale-95 transition-all"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span>View Cart</span>
              {totalItemsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-white text-orange-600 font-black text-[11px] flex items-center justify-center font-mono shadow-sm">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
