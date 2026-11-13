export type OrderType = 'delivery' | 'takeaway';

export interface KarachiArea {
  id: string;
  name: string;
  district: string;
  distanceKm: number; // Distance in KM from Al Riaz Foods (Sector 4, Surjani Town)
  estimatedMinutes: number;
  deliveryFee: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'pizza' | 'burger' | 'broast' | 'bbq' | 'roll' | 'deals' | 'beverages';
  description: string;
  price: number;
  image: string;
  badge?: string;
  spicyLevel?: 1 | 2 | 3;
  sizes?: { name: string; priceDelta: number }[];
  isPopular?: boolean;
  preparationTimeMinutes: number;
}

export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selectedSize?: string;
  specialInstructions?: string;
  addOns?: string[];
  spiceLevel?: string;
}

export type OrderStatus = 'placed' | 'kitchen' | 'on_way' | 'delivered';

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  orderType: OrderType;
  deliveryArea: string;
  deliveryAddress: string;
  distanceKm: number;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentMethod: 'cod' | 'jazzcash' | 'easypaisa';
  createdAt: string;
  estimatedDeliveryMinutes: number;
  riderName?: string;
  riderPhone?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  savedAddress: string;
  loyaltyPoints: number;
}
