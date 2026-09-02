import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Check, Sparkles, ExternalLink } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOpenShopifyExport: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenShopifyExport,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderCompleteRef, setOrderCompleteRef] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const discountedSubtotal = subtotal - discountAmount;
  const shipping = discountedSubtotal > 999 || items.length === 0 ? 0 : 99;
  const total = discountedSubtotal + shipping;

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'FORGE10' || couponCode.trim().toUpperCase() === 'SHOPIFY') {
      setDiscountPercent(10);
      setCouponApplied(true);
    } else {
      alert('Try promo code: FORGE10 for 10% off!');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      const fakeOrder = `F3D-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderCompleteRef(fakeOrder);
      onClearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fcfcfc] border-l border-slate-200 text-slate-900 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-slate-950" />
              <h2 className="text-base font-black uppercase tracking-tight text-slate-950 font-['Inter']">Your Cart</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono font-bold">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {orderCompleteRef ? (
              <div className="p-8 text-center space-y-4 bg-emerald-50 border border-emerald-200 rounded-3xl my-auto shadow-sm">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-slate-950">Order Confirmed!</h3>
                <p className="text-xs text-slate-600">
                  Your 3D print job is queued in our production slicer.
                </p>
                <div className="p-3 bg-white border border-emerald-300 rounded-2xl font-mono text-sm text-emerald-800 font-bold shadow-sm">
                  Order ID: {orderCompleteRef}
                </div>
                <p className="text-[11px] text-slate-500">
                  Order confirmation & dispatch updates will be sent via SMS & Email.
                </p>
                <button
                  onClick={() => {
                    setOrderCompleteRef(null);
                    onClose();
                  }}
                  className="w-full py-3 bg-slate-950 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-slate-800 mt-2 shadow-md cursor-pointer transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-3xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-black uppercase tracking-tight text-slate-950 mb-1">Your cart is empty</h3>
                <p className="text-xs text-slate-400 max-w-xs mb-6 font-medium">
                  Explore our ready-made engineered parts or upload custom CAD designs for instant pricing.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-slate-950 text-white text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-md cursor-pointer"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-100 rounded-2xl p-4 flex gap-4 transition-all shadow-sm"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-xl object-cover bg-slate-50 shrink-0 border border-slate-100"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-sm font-black uppercase tracking-tight text-slate-950 truncate">{item.title}</h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {item.subtitle && (
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">{item.subtitle}</p>
                    )}

                    {item.specs?.sizeMm && (
                      <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                        Size: {item.specs.sizeMm}
                      </p>
                    )}

                    {item.specs?.colorName && (
                      <p className="text-[10px] text-slate-500 mt-0.5 font-medium">
                        Color: {item.specs.colorName}
                      </p>
                    )}

                    {item.specs?.color && !item.specs?.colorName && (
                      <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Color: {item.specs.color}</p>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm font-mono font-bold text-slate-950">
                        ₹{item.price * item.quantity}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-slate-200 rounded-full bg-slate-50 overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2.5 py-0.5 text-xs text-slate-700 hover:bg-slate-200 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-mono font-bold text-slate-950">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2.5 py-0.5 text-xs text-slate-700 hover:bg-slate-200 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Checkout */}
          {items.length > 0 && !orderCompleteRef && (
            <div className="p-6 border-t border-slate-100 bg-white space-y-4 shadow-lg">
              {/* Promo code input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon code (FORGE10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-4 py-2 text-xs rounded-full bg-slate-50 border border-slate-200 text-slate-900 uppercase placeholder:normal-case placeholder:text-slate-400 focus:outline-none focus:border-slate-950"
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  className="px-4 py-2 text-xs font-black uppercase tracking-wider bg-slate-950 hover:bg-slate-800 text-white rounded-full transition-all cursor-pointer shadow-sm"
                >
                  Apply
                </button>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs text-slate-500 pt-1">
                <div className="flex justify-between">
                  <span className="uppercase tracking-wider font-semibold text-[10px]">Subtotal</span>
                  <span className="font-mono text-slate-950 font-bold">₹{subtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span className="uppercase tracking-wider font-semibold text-[10px]">Discount ({discountPercent}%)</span>
                    <span className="font-mono font-bold">-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="uppercase tracking-wider font-semibold text-[10px]">Standard Shipping</span>
                  <span className="font-mono text-slate-950 font-bold">
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>

                <div className="flex justify-between text-slate-500">
                  <span className="uppercase tracking-wider font-semibold text-[10px]">Taxes / GST</span>
                  <span className="font-mono text-emerald-600 font-bold text-[10px]">₹0 (Direct Maker Price)</span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex justify-between text-sm font-black uppercase tracking-tight text-slate-950">
                  <span>Total Payable</span>
                  <span className="font-mono text-base text-slate-950">₹{total}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                id="cart-checkout-btn"
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-3.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl shadow-slate-200 cursor-pointer disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <span>Processing Payment...</span>
                ) : (
                  <>
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              {/* Shopify Export action */}
              <button
                type="button"
                onClick={onOpenShopifyExport}
                className="w-full py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-950 border border-slate-200 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Export Cart Payload for Shopify Store</span>
              </button>

              <div className="text-center text-[10px] font-medium text-slate-400">
                🔒 256-Bit SSL Encrypted Checkout • Commercial Bill Provided
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
