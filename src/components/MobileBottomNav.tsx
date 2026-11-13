import React from 'react';
import { Utensils, ShoppingBag, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_COORDS } from '../utils/distance';

export const MobileBottomNav: React.FC = () => {
  const { totalItemsCount, setIsCartOpen } = useCart();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 w-full max-w-full overflow-hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-3 py-2 shadow-2xl safe-area-pb">
      <div className="grid grid-cols-4 items-center gap-1 text-center">
        {/* Menu Tab */}
        <a
          href="#menu"
          className="flex flex-col items-center justify-center py-1 text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
        >
          <Utensils className="w-4 h-4" />
          <span className="text-[10px] font-semibold mt-0.5">Menu</span>
        </a>

        {/* Call Hotline */}
        <a
          href={`tel:${RESTAURANT_COORDS.phone}`}
          className="flex flex-col items-center justify-center py-1 text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
        >
          <Phone className="w-4 h-4 text-orange-600" />
          <span className="text-[10px] font-semibold mt-0.5">Call</span>
        </a>

        {/* WhatsApp Order */}
        <a
          href={`https://wa.me/${RESTAURANT_COORDS.whatsapp}?text=Hello%20Al%20Riaz%20Foods%2C%20I%20would%20like%20to%20place%20an%20order`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 text-emerald-600 hover:text-emerald-500 transition-colors"
        >
          <svg className="w-4 h-4 fill-[#25D366]" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
          <span className="text-[10px] font-semibold mt-0.5">WhatsApp</span>
        </a>

        {/* Cart */}
        <button
          id="mobile-cart-target"
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center py-1 text-orange-600 dark:text-orange-400"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-orange-600 text-white font-black text-[10px] flex items-center justify-center font-mono shadow">
                {totalItemsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold mt-0.5">Cart</span>
        </button>
      </div>
    </div>
  );
};
