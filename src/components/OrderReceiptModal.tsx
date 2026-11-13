import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, CheckCircle, MapPin, Phone, User, Bike, Clock, QrCode } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Order } from '../types';
import { RESTAURANT_COORDS } from '../utils/distance';
import { RESTAURANT_IMAGES } from '../data/menuData';

interface OrderReceiptModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderReceiptModal: React.FC<OrderReceiptModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const getWhatsAppShareUrl = () => {
    const itemsList = order.items
      .map(
        (it) =>
          `• ${it.quantity}x ${it.name} ${it.selectedSize ? `(${it.selectedSize})` : ''} - Rs. ${(it.price * it.quantity).toLocaleString()}`
      )
      .join('%0A');

    const msg =
      `*AL RIAZ FOODS - OFFICIAL ORDER RECEIPT*%0A` +
      `*Order ID:* ${order.id}%0A` +
      `*Date:* ${new Date(order.createdAt).toLocaleString()}%0A` +
      `*Customer:* ${order.customerName} (${order.customerPhone})%0A` +
      `*Delivery To:* ${order.deliveryAddress}%0A` +
      `*Distance:* ${order.distanceKm} km%0A%0A` +
      `*Items:*%0A${itemsList}%0A%0A` +
      `*Subtotal:* Rs. ${order.subtotal.toLocaleString()}%0A` +
      `*Delivery Fee:* Rs. ${order.deliveryFee}%0A` +
      `*Grand Total:* Rs. ${order.total.toLocaleString()}%0A` +
      `*Payment:* ${order.paymentMethod.toUpperCase()} (Cash on Delivery)%0A%0A` +
      `Thank you for ordering with Al Riaz Foods!`;

    return `https://wa.me/?text=${msg}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md print:p-0 print:bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md max-h-[92dvh] flex flex-col overflow-hidden rounded-t-3xl sm:rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-2xl print:max-h-none print:border-none print:shadow-none print:max-w-full"
        >
          {/* Action Toolbar (Pinned on mobile, hidden during print) */}
          <div className="shrink-0 p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between print:hidden">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="py-1 px-2.5 rounded-lg bg-white hover:bg-slate-200 text-slate-700 text-xs font-bold shadow-sm transition-colors cursor-pointer"
              >
                ← Back
              </button>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Receipt
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="p-1.5 rounded-lg bg-white hover:bg-slate-200 text-slate-700 transition-colors shadow-sm flex items-center gap-1.5 text-xs font-semibold px-2.5 cursor-pointer"
                title="Print Receipt"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg bg-white hover:bg-slate-200 text-slate-500 transition-colors shadow-sm cursor-pointer"
                aria-label="Close receipt"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto">
          {/* Thermal Paper Bill Styling */}
          <div className="p-6 sm:p-7 space-y-5 font-mono text-xs text-slate-800">
            {/* Restaurant Brand Header */}
            <div className="text-center space-y-1 border-b-2 border-dashed border-slate-300 pb-5">
              <img
                src={RESTAURANT_IMAGES.brandLogo}
                alt="Al Riaz Foods Official Logo"
                className="w-14 h-14 mx-auto rounded-2xl object-cover bg-[#18202c] ring-2 ring-slate-200 mb-2 shadow-sm"
              />
              <span className="text-[10px] font-sans font-black tracking-widest text-emerald-700 uppercase block">
                AL RIAZ FOODS & PAKWAN CENTER
              </span>
              <h2 className="text-xl font-sans font-black tracking-tight text-slate-900">
                AL RIAZ FOODS
              </h2>
              <p className="text-[11px] text-slate-600 font-sans">
                BBQ • Charcoal Grill • Pizza • Fast Food
              </p>
              <p className="text-[11px] text-slate-500">
                Sector 4, Surjani Town, Karachi
              </p>
              <p className="text-[11px] font-bold text-slate-700">
                Hotline / WhatsApp: {RESTAURANT_COORDS.phone}
              </p>
            </div>

            {/* Order Metadata */}
            <div className="grid grid-cols-2 gap-2 text-[11px] border-b border-dashed border-slate-300 pb-4">
              <div>
                <span className="text-slate-500 block">ORDER ID:</span>
                <span className="font-bold text-sm text-slate-900">#{order.id}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block">DATE & TIME:</span>
                <span className="font-semibold text-slate-800">
                  {new Date(order.createdAt).toLocaleDateString()}{' '}
                  {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              <div className="col-span-2 pt-1">
                <span className="text-slate-500 block">CUSTOMER:</span>
                <span className="font-bold text-slate-900">
                  {order.customerName} ({order.customerPhone})
                </span>
              </div>

              <div className="col-span-2">
                <span className="text-slate-500 block">DELIVERY ADDRESS:</span>
                <span className="text-slate-800 leading-tight block">
                  {order.deliveryAddress}
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold mt-0.5 block">
                  Distance: {order.distanceKm} km from Kitchen
                </span>
              </div>
            </div>

            {/* Itemized Table */}
            <div className="space-y-2 border-b-2 border-dashed border-slate-300 pb-4">
              <div className="flex justify-between font-bold text-[11px] text-slate-900 border-b border-slate-200 pb-1">
                <span>ITEM DESCRIPTION</span>
                <span>TOTAL</span>
              </div>

              {order.items.map((item, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="font-semibold">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-bold">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                  {item.selectedSize && (
                    <div className="text-[10px] text-slate-500 pl-4">
                      Option: {item.selectedSize}
                    </div>
                  )}
                  {item.addOns && item.addOns.length > 0 && (
                    <div className="text-[10px] text-slate-500 pl-4">
                      + {item.addOns.join(', ')}
                    </div>
                  )}
                  {item.spiceLevel && (
                    <div className="text-[10px] text-red-600 pl-4">
                      Spice: {item.spiceLevel}
                    </div>
                  )}
                  {item.specialInstructions && (
                    <div className="text-[10px] italic text-slate-400 pl-4">
                      Note: {item.specialInstructions}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Price Calculation */}
            <div className="space-y-1.5 text-xs border-b-2 border-dashed border-slate-300 pb-4">
              <div className="flex justify-between text-slate-600">
                <span>Food Subtotal:</span>
                <span>Rs. {order.subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>
                  Delivery Charge ({order.distanceKm} km):
                </span>
                <span>
                  {order.deliveryFee === 0 ? 'FREE' : `Rs. ${order.deliveryFee}`}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-300 flex justify-between font-black text-base text-slate-900">
                <span>GRAND TOTAL:</span>
                <span className="text-emerald-700">Rs. {order.total.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-[11px] font-bold text-slate-700 pt-1">
                <span>PAYMENT METHOD:</span>
                <span className="uppercase text-orange-600">
                  {order.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : order.paymentMethod.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Kitchen & Dispatch Dispatch Info */}
            <div className="space-y-1 text-center text-[10px] text-slate-500 pt-1">
              <p>Rider: {order.riderName || 'Muhammad Rashid'} (Surjani Fleet)</p>
              <p>Est. Kitchen Preparation & Dispatch: {order.estimatedDeliveryMinutes} Mins</p>
              <p className="font-semibold text-slate-700">Thank you for dining with Al Riaz Foods!</p>
            </div>

            {/* Simulated Barcode graphic */}
            <div className="pt-3 text-center space-y-1.5">
              <div className="h-9 w-48 mx-auto flex items-stretch justify-center gap-0.5 overflow-hidden">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className={`bg-slate-900 ${
                      i % 3 === 0 ? 'w-1' : i % 5 === 0 ? 'w-1.5' : 'w-0.5'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] font-mono tracking-widest text-slate-400">
                *{order.id}*
              </span>
            </div>
          </div>

          {/* Bottom Actions (Hidden during print) */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row gap-2 print:hidden">
            <a
              href={getWhatsAppShareUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-3 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/25 transition-all"
            >
              <WhatsAppIcon variant="mono" className="w-4 h-4 fill-white" />
              <span>Share Receipt to WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={handlePrint}
              className="py-2.5 px-4 rounded-xl font-bold text-xs text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
          </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
