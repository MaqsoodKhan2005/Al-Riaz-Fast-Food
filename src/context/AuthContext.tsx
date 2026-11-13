import React, { createContext, useContext, useEffect, useState } from 'react';
import { Order, UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  orders: Order[];
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  isDashboardOpen: boolean;
  setIsDashboardOpen: (open: boolean) => void;
  loginWithGoogle: (customDetails?: Partial<UserProfile>) => void;
  logout: () => void;
  addOrder: (order: Order) => void;
  activeOrder: Order | null;
  isOrderTrackingOpen: boolean;
  setIsOrderTrackingOpen: (open: boolean) => void;
  trackedOrderId: string | null;
  setTrackedOrderId: (id: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('alriaz_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    // Return default demo logged-in user or null; let's allow null but easy one-click login
    return null;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('alriaz_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    // Initial sample order so the dashboard and tracker have immediate rich visual proof
    return [
      {
        id: 'ARF-7821',
        customerName: 'Muhammad Tariq',
        customerPhone: '0312-8765432',
        customerEmail: 'customer@gmail.com',
        orderType: 'delivery',
        deliveryArea: '4K Chowrangi',
        deliveryAddress: 'House 14-B, Sector 5-A, near 4K Chowrangi',
        distanceKm: 2.8,
        items: [
          {
            id: 'pizza-tikka-Medium (10")',
            menuItemId: 'pizza-tikka',
            name: 'Al Riaz Special Tikka Pizza',
            price: 950,
            quantity: 1,
            image: '/assets/images/product_pizza_special_1794331377696.jpg',
            selectedSize: 'Medium (10")'
          },
          {
            id: 'burger-crispy-zinger-standard',
            menuItemId: 'burger-crispy-zinger',
            name: 'Crispy Supreme Zinger Burger',
            price: 490,
            quantity: 2,
            image: '/assets/images/product_beef_burger_1794331379289.jpg'
          }
        ],
        subtotal: 1930,
        deliveryFee: 150,
        discount: 0,
        total: 2080,
        status: 'on_way',
        paymentMethod: 'cod',
        createdAt: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
        estimatedDeliveryMinutes: 25,
        riderName: 'Kamran Ali',
        riderPhone: '0319-2635132'
      }
    ];
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [trackedOrderId, setTrackedOrderId] = useState<string | null>('ARF-7821');

  useEffect(() => {
    if (user) {
      localStorage.setItem('alriaz_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('alriaz_auth_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('alriaz_orders', JSON.stringify(orders));
  }, [orders]);

  const loginWithGoogle = (customDetails?: Partial<UserProfile>) => {
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: customDetails?.name || 'Tariq Mehmood',
      email: customDetails?.email || 'tariq.mehmood@gmail.com',
      avatar:
        customDetails?.avatar ||
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
      phone: customDetails?.phone || '0319-2635132',
      savedAddress: customDetails?.savedAddress || 'Flat 402, Sector 4, Surjani Town, Karachi',
      loyaltyPoints: 340,
    };
    setUser(newUser);
    setIsLoginModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    setIsDashboardOpen(false);
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setTrackedOrderId(order.id);
  };

  const activeOrder = orders.find((o) => o.status !== 'delivered') || orders[0] || null;

  return (
    <AuthContext.Provider
      value={{
        user,
        orders,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isDashboardOpen,
        setIsDashboardOpen,
        loginWithGoogle,
        logout,
        addOrder,
        activeOrder,
        isOrderTrackingOpen,
        setIsOrderTrackingOpen,
        trackedOrderId,
        setTrackedOrderId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
