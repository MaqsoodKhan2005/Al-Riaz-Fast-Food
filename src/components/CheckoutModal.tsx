import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft, CheckCircle, Bike, Phone, User, Home, CreditCard, Banknote, Printer } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useCart } from '../context/CartContext';
import { useLocation } from '../context/LocationContext';
import { useAuth } from '../context/AuthContext';
import { Order } from '../types';
import { RESTAURANT_COORDS } from '../utils/distance';
import { OrderReceiptModal } from './OrderReceiptModal';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, subtotal, clearCart } = useCart();
  const { selectedArea, orderType, deliveryFee, customAddress, setCustomAddress } = useLocation();
  const { user, addOrder, setIsOrderTrackingOpen } = useAuth();

  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [addressLine, setAddressLine] = useState(customAddress || user?.savedAddress || '');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'jazzcash' | 'easypaisa'>('cod');
  const [notes, setNotes] = useState('');
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  // Reset confirmation screen when reopened with new cart items
  useEffect(() => {
    if (isOpen && cart.length > 0) {
      setPlacedOrder(null);
    }
  }, [isOpen, cart.length]);

  if (!isOpen) return null;

  const total = subtotal + (orderType === 'takeaway' ? 0 : deliveryFee);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;
    if (orderType === 'delivery' && !addressLine.trim()) return;

    setIsSubmitting(true);
    setCustomAddress(addressLine);

    const newOrderId = `ARF-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: newOrderId,
      customerName,
      customerPhone,
      customerEmail: user?.email,
      orderType,
      deliveryArea: selectedArea.name,
      deliveryAddress: orderType === 'takeaway' ? 'Pick up at Kitchen' : `${addressLine}, ${selectedArea.name}`,
      distanceKm: selectedArea.distanceKm,
      items: [...cart],
      subtotal,
      deliveryFee: orderType === 'takeaway' ? 0 : deliveryFee,
      discount: 0,
      total,
      status: 'placed',
      paymentMethod,
      createdAt: new Date().toISOString(),
      estimatedDeliveryMinutes: selectedArea.estimatedMinutes,
      riderName: 'Muhammad Rashid',
      riderPhone: RESTAURANT_COORDS.phone,
    };

    setTimeout(() => {
      addOrder(newOrder);
      setPlacedOrder(newOrder);
      clearCart();
      setIsSubmitting(false);
    }, 600);
  };

  const generateWhatsAppMessage = (order: Order) => {
    const itemsList = order.items
      .map((it) => `• ${it.quantity}x ${it.name} ${it.selectedSize ? `(${it.selectedSize})` : ''} - Rs. ${it.price * it.quantity}`)
      .join('%0A');

    const msg = `*NEW ORDER - AL RIAZ FOODS*%0A` +
      `*Order ID:* ${order.id}%0A` +
      `*Customer:* ${order.customerName}%0A` +
      `*Phone:* ${order.customerPhone}%0A` +
      `*Order Type:* ${order.orderType === 'takeaway' ? 'Takeaway Pickup' : 'Home Delivery'}%0A` +
      `*Address:* ${order.deliveryAddress}%0A` +
      `*Distance:* ${order.distanceKm} km%0A%0A` +
      `*Items Ordered:*%0A${itemsList}%0A%0A` +
      `*Subtotal:* Rs. ${order.subtotal}%0A` +
      `*Delivery Fee:* Rs. ${order.deliveryFee}%0A` +
      `*Grand Total:* Rs. ${order.total}%0A` +
      `*Payment:* ${order.paymentMethod.toUpperCase()}%0A%0A` +
      `Please confirm my order and share preparation time. Thank you!`;

    return `https://wa.me/${RESTAURANT_COORDS.whatsapp}?text=${msg}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 24 }}
          className="relative w-full max-w-xl max-h-[92dvh] flex flex-col overflow-hidden rounded-t-3xl sm:rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl"
        >
          {/* Sticky Header with Back & Close */}
          <div className="shrink-0 p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/80">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1 py-1.5 px-2.5 rounded-xl bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-colors cursor-pointer"
                aria-label="Go back"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                  {placedOrder ? 'Order Placed Successfully!' : 'Confirm Your Order'}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                  Al Riaz Foods · Fast Food & BBQ Kitchen
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
          {placedOrder ? (
            <div className="p-6 space-y-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Order Reference</span>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-0.5">
                  #{placedOrder.id}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2">
                  Thank you, <span className="font-semibold">{placedOrder.customerName}</span>! Your order has been dispatched to our kitchen team.
                </p>
              </div>

              {/* Order Quick Summary Card */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Delivery To:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{placedOrder.deliveryArea} ({placedOrder.distanceKm} km)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Arrival:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{placedOrder.estimatedDeliveryMinutes} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Payable:</span>
                  <span className="font-bold text-sm text-slate-900 dark:text-white font-mono">Rs. {placedOrder.total.toLocaleString()} ({placedOrder.paymentMethod.toUpperCase()})</span>
                </div>
              </div>

              {/* Direct WhatsApp Order Confirmation */}
              <div className="space-y-3">
                <a
                  href={generateWhatsAppMessage(placedOrder)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
                >
                  <WhatsAppIcon variant="mono" className="w-5 h-5 fill-white" />
                  <span>Send Order Receipt to WhatsApp (Instant Kitchen Alert)</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsReceiptOpen(true)}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center gap-2 transition-colors border border-slate-300 dark:border-slate-700 shadow-sm"
                >
                  <Printer className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>View & Print Official Kitchen Receipt</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    setIsOrderTrackingOpen(true);
                  }}
                  className="w-full py-3 px-4 rounded-xl font-semibold text-xs text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Track Live Kitchen Progress & Rider
                </button>
              </div>

              {/* Order Receipt Modal */}
              <OrderReceiptModal
                order={placedOrder}
                isOpen={isReceiptOpen}
                onClose={() => setIsReceiptOpen(false)}
              />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Order Mode & Location preview */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Bike className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {orderType === 'takeaway' ? 'Takeaway Pickup' : 'Home Delivery'}
                    </span>
                    <span className="text-slate-400 mx-1">·</span>
                    <span className="text-slate-500">
                      {selectedArea.name.includes('km')
                        ? selectedArea.name
                        : `${selectedArea.name} (${selectedArea.distanceKm} km)`}
                    </span>
                  </div>
                </div>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0 ml-2">
                  {orderType === 'takeaway' ? 'Free' : `Rs. ${deliveryFee}`}
                </span>
              </div>

              {/* Customer Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq Mehmood"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    WhatsApp / Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0319-2635132"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              {orderType === 'delivery' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Complete Street Address & Landmark *
                  </label>
                  <div className="relative">
                    <Home className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <textarea
                        rows={3}
                        required
                        placeholder="House/Apartment #, Street, Near Landmark (e.g. Near 4K Roundabout)"
                        value={addressLine}
                        onChange={(e) => setAddressLine(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Payment Methods */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Select Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <Banknote className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                      <span className="text-xs block">Cash on Delivery</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('jazzcash')}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        paymentMethod === 'jazzcash'
                          ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 mx-auto mb-1 text-rose-500" />
                      <span className="text-xs block">JazzCash</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('easypaisa')}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        paymentMethod === 'easypaisa'
                          ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 mx-auto mb-1 text-emerald-500" />
                      <span className="text-xs block">EasyPaisa</span>
                    </button>
                  </div>
                </div>

                {/* Special Cooking Instructions */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Kitchen Notes (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Extra mint raita, less spicy, crispy fries"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Total Calculation Strip */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                  <div className="flex justify-between text-slate-500">
                    <span>Food Items Total:</span>
                    <span className="font-mono">Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Distance ({selectedArea.distanceKm} km) Fee:</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400">
                      {orderType === 'takeaway' ? 'Free (Pickup)' : `Rs. ${deliveryFee}`}
                    </span>
                  </div>
                  <div className="pt-1.5 border-t border-slate-200 dark:border-slate-800 flex justify-between font-bold text-sm text-slate-900 dark:text-white">
                    <span>Total Amount:</span>
                    <span className="font-mono text-base text-emerald-600 dark:text-emerald-400">
                      Rs. {total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:from-red-500 hover:to-amber-500 shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Dispatching to Kitchen...</span>
                  ) : (
                    <span>Place Order Now (Rs. {total.toLocaleString()})</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
