import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, Sparkles, Key } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [flatDiscount, setFlatDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoApplied, setPromoApplied] = useState('');

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Free shipping threshold for India: ₹499
  const freeShippingThreshold = 499;
  const shippingCost = subtotal >= freeShippingThreshold || items.length === 0 ? 0 : 49;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();

    if (code === 'MOSS10') {
      setDiscountPercent(10);
      setFlatDiscount(0);
      setPromoApplied('10% off your keychain order applied!');
      setPromoCode('');
    } else if (code === 'SLOWCRAFT') {
      setFlatDiscount(50);
      setDiscountPercent(0);
      setPromoApplied('₹50 studio voucher applied!');
      setPromoCode('');
    } else {
      setPromoError('Unknown voucher code. Try MOSS10 or SLOWCRAFT');
    }
  };

  const discountAmount = Math.round(
    (subtotal * discountPercent) / 100 + (flatDiscount > 0 ? flatDiscount : 0)
  );
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1c1c17]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FCF9F0] border-l border-[#c8bfa8] shadow-cottage-lg flex flex-col justify-between">
          {/* Top Header */}
          <div className="p-6 border-b border-[#ebe5d6] bg-[#f6f3ea] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-[#2e4732]" />
              <h3 className="font-serif-heading text-xl font-bold text-[#18301d]">
                Your Keychain Basket
              </h3>
              <span className="text-xs bg-[#c8e8c4] text-[#18301d] font-bold px-2 py-0.5 rounded-full">
                {items.reduce((acc, item) => acc + item.quantity, 0)} charms
              </span>
            </div>
            <button
              id="btn-close-cart-drawer"
              type="button"
              onClick={onClose}
              className="p-1 rounded-full text-[#737971] hover:text-[#18301d] hover:bg-[#FAF8F3]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Bar across India */}
          <div className="bg-[#FAF8F3] px-6 py-3 border-b border-[#ebe5d6]">
            {subtotal >= freeShippingThreshold ? (
              <div className="flex items-center gap-1.5 text-xs text-[#2e4732] font-semibold">
                <Sparkles className="w-4 h-4 text-[#d87a56]" />
                <span>You unlocked Free Delivery across India! 🌿</span>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-[#434842]">
                  <span>Add ₹{amountToFreeShipping} more for Free Delivery</span>
                  <span className="font-bold text-[#18301d]">{progressPercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#ebe5d6] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2e4732] transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#f1eee5] flex items-center justify-center mx-auto text-2xl">
                  🗝️
                </div>
                <h4 className="font-serif-heading text-lg font-bold text-[#18301d]">
                  Your basket is quiet
                </h4>
                <p className="text-xs text-[#737971] max-w-xs mx-auto">
                  No crochet keychains have been adopted yet. Explore the Autumn Drop to choose your companion!
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 rounded-lg bg-[#2e4732] text-white text-xs font-semibold"
                >
                  Browse Keychains
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-[#FAF8F3] rounded-xl border border-[#EFE8D6] shadow-cottage-sm flex gap-3 items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover bg-[#f1eee5] shrink-0 border border-[#c8bfa8]"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <h5 className="font-serif-heading font-bold text-sm text-[#18301d] truncate">
                      {item.name}
                    </h5>
                    <p className="text-[11px] text-[#737971] truncate">
                      {item.isCustomKeychain && item.customDetails
                        ? `Bespoke: ${item.customDetails.yarnColorName} • ${item.customDetails.hardware}`
                        : item.subtitle}
                    </p>

                    <div className="flex items-center justify-between pt-1">
                      <span className="font-bold text-xs text-[#18301d]">
                        ₹{item.price} each
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#c8bfa8] rounded-md bg-[#fcf9f0]">
                        <button
                          type="button"
                          onClick={() => {
                            if (item.quantity === 1) {
                              onRemoveItem(item.id);
                            } else {
                              onUpdateQuantity(item.id, item.quantity - 1);
                            }
                          }}
                          className="px-2 py-0.5 text-xs text-[#434842] hover:bg-[#ebe5d6]"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold text-[#18301d]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-[#434842] hover:bg-[#ebe5d6]"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#737971] hover:text-[#ba1a1a] p-1"
                        title="Remove keychain"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Voucher Promo Code */}
            {items.length > 0 && (
              <div className="pt-2">
                <form onSubmit={applyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-[#737971]" />
                    <input
                      id="input-promo-code"
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo voucher (e.g. MOSS10)"
                      className="w-full text-xs pl-8 pr-3 py-2.5 rounded-lg border border-[#c8bfa8] bg-[#FAF8F3] text-[#18301d] placeholder-[#737971] outline-none uppercase"
                    />
                  </div>
                  <button
                    id="btn-apply-voucher"
                    type="submit"
                    className="px-3.5 py-2.5 bg-[#FAF8F3] hover:bg-[#f1eee5] text-[#18301d] border border-[#c8bfa8] rounded-lg text-xs font-semibold shrink-0"
                  >
                    Apply
                  </button>
                </form>

                {promoApplied && (
                  <p className="text-[11px] text-[#2e4732] font-semibold mt-1.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#d87a56]" />
                    <span>{promoApplied}</span>
                  </p>
                )}
                {promoError && (
                  <p className="text-[11px] text-[#ba1a1a] mt-1.5">{promoError}</p>
                )}
              </div>
            )}
          </div>

          {/* Bottom Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 bg-[#f6f3ea] border-t border-[#ebe5d6] space-y-3">
              <div className="space-y-1.5 text-xs text-[#434842]">
                <div className="flex justify-between">
                  <span>Keychain Subtotal:</span>
                  <span className="font-semibold text-[#18301d]">₹{subtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#2e4732] font-semibold">
                    <span>Voucher Discount:</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Pan-India Tracked Delivery:</span>
                  <span className="font-semibold text-[#18301d]">
                    {shippingCost === 0 ? (
                      <span className="text-[#2e4732] font-bold">Free</span>
                    ) : (
                      `₹${shippingCost}`
                    )}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#c8bfa8] flex justify-between text-base font-bold text-[#18301d]">
                  <span>Total (inc. GST):</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>

              <button
                id="btn-cart-checkout"
                type="button"
                onClick={onCheckout}
                className="w-full py-3.5 rounded-xl bg-[#2e4732] hover:bg-[#18301d] text-[#fcf9f0] font-bold text-sm transition-all shadow-cottage-sm flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Adopt Keychains • ₹{finalTotal}</span>
                <ArrowRight className="w-4 h-4 text-[#f4b9a0]" />
              </button>

              <div className="text-center text-[10px] text-[#737971] flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#6c8a6b]" />
                <span>Secure Checkout • Handmade in India by Ishani</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
