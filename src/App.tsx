import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LocationProvider } from './context/LocationContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { CateringSection } from './components/CateringSection';
import { StoreShowcase } from './components/StoreShowcase';
import { CartDrawer } from './components/CartDrawer';
import { LocationModal } from './components/LocationModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { GoogleLoginModal } from './components/GoogleLoginModal';
import { CustomerDashboardModal } from './components/CustomerDashboardModal';
import { FlyToCartOverlay } from './components/FlyToCartOverlay';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { SplashScreen } from './components/SplashScreen';

function MainApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleFocusSearch = () => {
    const menuEl = document.getElementById('menu-search-input') || document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (menuEl instanceof HTMLInputElement) {
        setTimeout(() => menuEl.focus(), 350);
      }
    }
  };

  const handleCateringScroll = () => {
    const cateringEl = document.getElementById('catering');
    if (cateringEl) {
      cateringEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (category: string) => {
    setSearchQuery('');
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Premium initial loading splash screen */}
      <SplashScreen minDuration={1600} />

      {/* Visual flying item animation layer */}
      <FlyToCartOverlay />

      {/* Top Header */}
      <Header
        onSearchClick={handleFocusSearch}
        onCateringClick={handleCateringScroll}
      />

      {/* Main Content Sections */}
      <main className="flex-1 pb-16 md:pb-0">
        <Hero onCategoryAction={handleSelectCategory} />
        <MenuSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <CateringSection />
        <StoreShowcase />
      </main>

      {/* Footer */}
      <Footer onSelectCategory={handleSelectCategory} />

      {/* Modals & Drawers */}
      <LocationModal />
      <CartDrawer onCheckout={() => setIsCheckoutOpen(true)} />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
      <OrderTrackingModal />
      <GoogleLoginModal />
      <CustomerDashboardModal />

      {/* Floating & Mobile Controls */}
      <FloatingWhatsApp />
      <MobileBottomNav />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LocationProvider>
        <CartProvider>
          <AuthProvider>
            <MainApp />
          </AuthProvider>
        </CartProvider>
      </LocationProvider>
    </ThemeProvider>
  );
}
