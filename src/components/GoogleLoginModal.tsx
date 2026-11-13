import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, User, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { RESTAURANT_IMAGES } from '../data/menuData';

export const GoogleLoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, loginWithGoogle } = useAuth();
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleInstantGoogleLogin = () => {
    setIsSigningIn(true);
    setTimeout(() => {
      loginWithGoogle();
      setIsSigningIn(false);
    }, 700);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || !customEmail.trim()) return;
    setIsSigningIn(true);
    setTimeout(() => {
      loginWithGoogle({
        name: customName,
        email: customEmail,
      });
      setIsSigningIn(false);
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md max-h-[92dvh] flex flex-col overflow-hidden rounded-t-3xl sm:rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl"
        >
          {/* Sticky Header */}
          <div className="shrink-0 p-5 sm:p-6 text-center bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 text-white relative">
            <button
              type="button"
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-4 left-4 inline-flex items-center gap-1 py-1 px-2.5 rounded-full bg-black/25 hover:bg-black/35 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <span>← Back</span>
            </button>
            <button
              type="button"
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-black/25 hover:bg-black/35 text-white transition-colors cursor-pointer"
              aria-label="Close login modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl overflow-hidden bg-[#18202c] border-2 border-white/40 mb-3 shadow-lg">
              <img
                src={RESTAURANT_IMAGES.brandLogo}
                alt="Al Riaz Foods Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold tracking-tight">Customer Account</h3>
            <p className="text-xs text-emerald-100 mt-1">
              Save favorite addresses, track orders, and earn Al Riaz loyalty points
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
            {/* Official Google Sign-In Button */}
            <button
              type="button"
              onClick={handleInstantGoogleLogin}
              disabled={isSigningIn}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-sm shadow-sm transition-all hover:shadow cursor-pointer"
            >
              {/* Google official SVG logo */}
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{isSigningIn ? 'Connecting to Google...' : 'Continue with Google'}</span>
            </button>

            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <span className="relative bg-white dark:bg-slate-900 px-3 text-xs text-slate-400 font-medium">
                Or fill details directly
              </span>
            </div>

            {/* Direct Form Fallback */}
            <form onSubmit={handleCustomSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Asad Ullah Khan"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. asad@gmail.com"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Sign In & Continue
              </button>
            </form>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Safe & Secure login for Al Riaz Foods customers</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
