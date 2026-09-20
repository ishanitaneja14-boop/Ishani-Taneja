import React from 'react';
import { Heart, Sparkles, Key } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickAdopt: (product: Product, e: React.MouseEvent) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickAdopt,
  isWishlisted,
  onToggleWishlist
}) => {
  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onSelect(product)}
      className="group relative bg-[#FAF8F3] border border-[#EFE8D6] rounded-xl overflow-hidden shadow-cottage-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-cottage-md cursor-pointer flex flex-col h-full"
    >
      {/* Top Media Frame */}
      <div className="relative aspect-4/3 overflow-hidden bg-[#f1eee5]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 items-start">
          {product.isNewDrop && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-[#2e4732] text-[#fcf9f0] shadow-sm">
              New Keychain
            </span>
          )}
          {product.isBestSeller && !product.isNewDrop && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-[#d87a56] text-white shadow-sm">
              Bestseller
            </span>
          )}
          <span className="stitch-border px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#fcf9f0]/90 text-[#434842] backdrop-blur-xs">
            {product.batchNumber.split('•')[0]}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          id={`btn-wishlist-${product.id}`}
          type="button"
          onClick={(e) => onToggleWishlist(product, e)}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-transform active:scale-90 backdrop-blur-xs ${
            isWishlisted
              ? 'bg-[#d87a56] text-white'
              : 'bg-[#fcf9f0]/90 text-[#737971] hover:text-[#d87a56] hover:bg-white'
          }`}
          aria-label="Save to wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Stock urgency alert */}
        {product.stockLeft <= 3 && (
          <div className="absolute bottom-2 left-2.5 bg-[#ffdad6]/95 border border-[#ffb59a] text-[#93000a] text-[10px] font-bold px-2 py-0.5 rounded-full">
            Only {product.stockLeft} in current batch
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-grow justify-between gap-3">
        <div className="space-y-1.5">
          {/* Hardware & Fiber Specifier */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#496549]">
            <Key className="w-3.5 h-3.5 text-[#d87a56] shrink-0" />
            <span className="font-semibold text-[#2e4732] truncate">
              {product.hardware.split('+')[0].trim()}
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif-heading text-lg font-bold text-[#18301d] leading-snug group-hover:text-[#2e4732] transition-colors">
            {product.name}
          </h3>

          {/* Subtitle */}
          <p className="text-xs text-[#434842] line-clamp-2 leading-relaxed">
            {product.subtitle}
          </p>
        </div>

        {/* Price in Rupees (₹) & Action Row */}
        <div className="pt-2 border-t border-[#ebe5d6] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-[#18301d]">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#737971] line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            {product.includesCertificate && (
              <span className="text-[10px] text-[#6c8a6b] font-medium flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5 text-[#d87a56]" />
                Includes Adoption Tag
              </span>
            )}
          </div>

          <button
            id={`btn-adopt-${product.id}`}
            type="button"
            onClick={(e) => onQuickAdopt(product, e)}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-cottage-sm active:scale-95 bg-[#2e4732] hover:bg-[#18301d] text-[#fcf9f0]"
          >
            <Key className="w-3.5 h-3.5 text-[#f4b9a0]" />
            <span>Adopt</span>
          </button>
        </div>
      </div>
    </div>
  );
};
