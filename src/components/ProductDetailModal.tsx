import React, { useState } from 'react';
import { X, Heart, ShieldCheck, Sparkles, Check, Key, RotateCcw } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, giftWrap: boolean) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [includeGiftWrap, setIncludeGiftWrap] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const giftWrapPrice = 49; // in INR (₹)

  const handleAdd = () => {
    onAddToCart(product, quantity, includeGiftWrap);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 900);
  };

  const totalPrice = product.price * quantity + (includeGiftWrap ? giftWrapPrice : 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#1c1c17]/60 backdrop-blur-xs">
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#FCF9F0] border border-[#EFE8D6] rounded-2xl shadow-cottage-lg overflow-hidden z-10 my-8">
        {/* Close Button */}
        <button
          id="btn-modal-close"
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#fcf9f0]/90 text-[#434842] hover:text-[#18301d] hover:bg-white border border-[#c8bfa8] flex items-center justify-center transition-colors shadow-sm"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image Gallery & Previews */}
          <div className="md:col-span-6 p-6 bg-[#f6f3ea] border-b md:border-b-0 md:border-r border-[#ebe5d6] flex flex-col justify-between">
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-[#e5e2da] border border-[#c8bfa8] shadow-cottage-sm">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#18301d]/90 text-[#fcf9f0] text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {product.batchNumber}
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#2e4732] scale-105 shadow-sm'
                          : 'border-[#c8bfa8] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Adoption Certificate Badge */}
            {product.includesCertificate && (
              <div className="mt-6 p-3.5 rounded-xl bg-[#FAF8F3] border border-dashed border-[#6c8a6b] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c8e8c4] flex items-center justify-center text-[#18301d] shrink-0 font-serif-heading font-bold text-lg">
                  ❦
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#18301d] flex items-center gap-1">
                    Official Keychain Adoption Card
                    <Sparkles className="w-3 h-3 text-[#d87a56]" />
                  </h4>
                  <p className="text-[11px] text-[#434842] leading-tight mt-0.5">
                    Includes a mini adoption certificate card stamped with Ishani's wax seal and serial number.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Specifications, Story & Cart Actions */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Hardware Pill */}
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-wider text-[#6c8a6b] bg-[#e7efe6] px-2.5 py-1 rounded-full">
                  {product.category} Keychain
                </span>
                <button
                  type="button"
                  onClick={(e) => onToggleWishlist(product, e)}
                  className="text-xs font-semibold text-[#434842] hover:text-[#d87a56] flex items-center gap-1"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#d87a56] text-[#d87a56]' : ''}`} />
                  <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>

              {/* Title & Price in Rupees */}
              <div>
                <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#18301d] leading-tight">
                  {product.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#434842] mt-1">{product.subtitle}</p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#18301d]">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#737971] line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                  <span className="text-xs text-[#6c8a6b] font-medium ml-2">
                    GST included • Free India delivery over ₹499
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#434842] leading-relaxed">
                {product.description}
              </p>

              {/* Ishani's Artisan Note Box */}
              <div className="p-3.5 rounded-xl bg-[#FAF8F3] stitch-border text-xs text-[#28231d] space-y-1">
                <span className="font-bold text-[#2e4732] flex items-center gap-1 font-serif-heading">
                  <span>✦</span> Ishani's Studio Note
                </span>
                <p className="italic text-[#434842]">{product.artisanNote}</p>
              </div>

              {/* Specifications Table */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-[#f6f3ea] p-3 rounded-lg border border-[#ebe5d6]">
                <div className="col-span-2">
                  <span className="text-[#737971] block">Metal Hardware:</span>
                  <span className="font-bold text-[#18301d] flex items-center gap-1">
                    <Key className="w-3.5 h-3.5 text-[#d87a56]" />
                    {product.hardware}
                  </span>
                </div>
                <div>
                  <span className="text-[#737971] block">Yarn Fiber:</span>
                  <span className="font-semibold text-[#18301d]">{product.fiber}</span>
                </div>
                <div>
                  <span className="text-[#737971] block">Dimensions:</span>
                  <span className="font-semibold text-[#18301d]">{product.dimensions}</span>
                </div>
                <div>
                  <span className="text-[#737971] block">Hook Gauge:</span>
                  <span className="font-semibold text-[#18301d]">{product.hookSize}</span>
                </div>
                <div>
                  <span className="text-[#737971] block">Batch Tag:</span>
                  <span className="font-semibold text-[#18301d]">{product.batchNumber}</span>
                </div>
              </div>

              {/* Care Instructions */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-[#18301d] uppercase tracking-wider">
                  Care Guidelines for Keychains:
                </h4>
                <ul className="text-xs text-[#434842] space-y-0.5 list-disc pl-4">
                  {product.careInstructions.map((rule, idx) => (
                    <li key={idx}>{rule}</li>
                  ))}
                </ul>
              </div>

              {/* Gift Wrapping Add-on in Rupees */}
              <label className="flex items-center gap-2.5 p-3 rounded-lg border border-[#c8bfa8] bg-[#fcf9f0] cursor-pointer hover:bg-[#FAF8F3] transition-colors">
                <input
                  type="checkbox"
                  checked={includeGiftWrap}
                  onChange={(e) => setIncludeGiftWrap(e.target.checked)}
                  className="rounded border-[#737971] text-[#2e4732] focus:ring-[#6c8a6b] w-4 h-4"
                />
                <div className="text-xs">
                  <span className="font-bold text-[#18301d]">
                    Handmade Pine Gift Box with Botanical Tag (+ ₹{giftWrapPrice})
                  </span>
                  <p className="text-[#737971] text-[11px]">
                    Nestled in shredded unbleached kraft paper, dried lavender sprig, and plantable wildflower seed card.
                  </p>
                </div>
              </label>
            </div>

            {/* Actions: Quantity and Add to Basket */}
            <div className="pt-4 border-t border-[#ebe5d6] space-y-3">
              <div className="flex items-center gap-4">
                {/* Quantity */}
                <div className="flex items-center border border-[#c8bfa8] rounded-lg bg-[#FAF8F3]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-[#434842] hover:bg-[#f1eee5] rounded-l-lg font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-sm font-semibold text-[#18301d] min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(product.stockLeft, quantity + 1))}
                    className="px-3 py-2 text-[#434842] hover:bg-[#f1eee5] rounded-r-lg font-bold text-sm"
                  >
                    +
                  </button>
                </div>

                {/* Add to Basket Button */}
                <button
                  id="btn-modal-add-to-basket"
                  type="button"
                  onClick={handleAdd}
                  disabled={product.stockLeft === 0}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold text-sm transition-all shadow-cottage-sm active:scale-95 flex items-center justify-center gap-2 ${
                    product.stockLeft === 0
                      ? 'bg-[#c3c8c0] text-[#737971] cursor-not-allowed'
                      : addedAnimation
                      ? 'bg-[#6c8a6b] text-white'
                      : 'bg-[#2e4732] hover:bg-[#18301d] text-[#fcf9f0]'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Basket!</span>
                    </>
                  ) : product.stockLeft === 0 ? (
                    <span>Sold Out (Next Drop Soon)</span>
                  ) : (
                    <>
                      <Key className="w-4 h-4 text-[#f4b9a0]" />
                      <span>Adopt Keychain • ₹{totalPrice}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Guarantees */}
              <div className="flex items-center justify-center gap-4 text-[11px] text-[#737971]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#6c8a6b]" />
                  Durable Reinforced Clasp
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-[#6c8a6b]" />
                  Handmade by Ishani
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
