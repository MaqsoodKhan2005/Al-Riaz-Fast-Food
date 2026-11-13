import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem } from '../types';

export interface FlyingItem {
  id: string;
  image: string;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItemsCount: number;
  subtotal: number;
  addToCart: (
    item: MenuItem,
    sizePriceDelta?: number,
    selectedSize?: string,
    specialInstructions?: string,
    sourceElement?: HTMLElement | null,
    quantity?: number,
    addOns?: string[],
    spiceLevel?: string
  ) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  flyingItems: FlyingItem[];
  removeFlyingItem: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('alriaz_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('alriaz_cart', JSON.stringify(cart));
    } catch {
      // ignore storage quota errors
    }
  }, [cart]);

  const totalItemsCount = cart.reduce((sum, it) => sum + it.quantity, 0);
  const subtotal = cart.reduce((sum, it) => sum + it.price * it.quantity, 0);

  const removeFlyingItem = (id: string) => {
    setFlyingItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addToCart = (
    item: MenuItem,
    sizePriceDelta = 0,
    selectedSize?: string,
    specialInstructions?: string,
    sourceElement?: HTMLElement | null,
    quantity = 1,
    addOns?: string[],
    spiceLevel?: string
  ) => {
    const unitPrice = item.price + sizePriceDelta;
    const normalizedAddOns = addOns && addOns.length > 0 ? [...addOns].sort() : [];
    const variantKey = [
      item.id,
      selectedSize || 'default',
      spiceLevel || 'default',
      normalizedAddOns.join('|'),
      specialInstructions || '',
    ].join('::');

    setCart((prev) => {
      const existingIndex = prev.findIndex((c) => c.id === variantKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      const newItem: CartItem = {
        id: variantKey,
        menuItemId: item.id,
        name: item.name,
        price: unitPrice,
        quantity,
        image: item.image,
        selectedSize,
        specialInstructions,
        addOns: normalizedAddOns.length > 0 ? normalizedAddOns : undefined,
        spiceLevel,
      };
      return [...prev, newItem];
    });

    // Trigger fly-to-cart animation if source element is available
    if (sourceElement && typeof window !== 'undefined') {
      const sourceRect = sourceElement.getBoundingClientRect();
      const targetEl =
        document.getElementById('cart-icon-target')?.offsetParent !== null
          ? document.getElementById('cart-icon-target')
          : document.getElementById('mobile-cart-target');

      const targetRect = targetEl?.getBoundingClientRect();
      if (targetRect) {
        const flyId = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        setFlyingItems((prev) => [
          ...prev,
          {
            id: flyId,
            image: item.image,
            startX: sourceRect.left + sourceRect.width / 2,
            startY: sourceRect.top + sourceRect.height / 2,
            targetX: targetRect.left + targetRect.width / 2,
            targetY: targetRect.top + targetRect.height / 2,
          },
        ]);
      }
    }
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        totalItemsCount,
        subtotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        flyingItems,
        removeFlyingItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }
  return ctx;
};
