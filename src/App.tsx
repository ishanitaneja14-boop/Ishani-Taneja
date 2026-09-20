import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, Category } from './types';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CritterStudio } from './components/CritterStudio';
import { StitchLedger } from './components/StitchLedger';
import { PatternVault } from './components/PatternVault';
import { CartDrawer } from './components/CartDrawer';
import { AdoptionCertificateModal } from './components/AdoptionCertificateModal';
import { Footer } from './components/Footer';
import { Sparkles, Key } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'shop' | 'studio' | 'ledger' | 'patterns'>('shop');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [selectedFiber, setSelectedFiber] = useState<string>('all');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);

  // Initial cart seeded with a delightful keychain in Rupees
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mossy_keychain_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'cart-init-01',
        productId: 'keychain-frog-ribbit',
        name: 'Sir Ribbit & The Toadstool Keychain',
        subtitle: 'Pocket-sized moss frog bag charm with removable mushroom cap & brass bell',
        price: 349, // in INR (₹)
        image: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=800&q=80',
        quantity: 1,
        fiber: '100% Botanical Mercerized Cotton Yarn',
        hardware: 'Antique Brass 360° Swivel Lobster Clasp + Golden Chime Bell',
        isCustomKeychain: false
      }
    ];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mossy_keychain_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ['keychain-amanita-mushroom'];
  });

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('mossy_keychain_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('mossy_keychain_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Add to cart handlers
  const handleAddToCart = (product: Product, quantity = 1, giftWrap = false) => {
    const itemPrice = product.price + (giftWrap ? 49 : 0);
    const existingIndex = cartItems.findIndex(
      (item) => item.productId === product.id && !item.isCustomKeychain
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        id: `keychain-item-${Date.now()}`,
        productId: product.id,
        name: product.name,
        subtitle: product.subtitle + (giftWrap ? ' (+ Gift Box)' : ''),
        price: itemPrice,
        image: product.images[0],
        quantity,
        fiber: product.fiber,
        hardware: product.hardware,
        isCustomKeychain: false
      };
      setCartItems([...cartItems, newItem]);
    }
    showToast(`Added ${product.name} to basket!`);
  };

  const handleQuickAdopt = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    handleAddToCart(product, 1, false);
  };

  const handleAddCustomCritter = (customItem: CartItem) => {
    setCartItems([...cartItems, customItem]);
    showToast(`Adopted custom ${customItem.name}!`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleWishlist = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    if (wishlist.includes(product.id)) {
      setWishlist(wishlist.filter((id) => id !== product.id));
      showToast(`Removed from wishlist`);
    } else {
      setWishlist([...wishlist, product.id]);
      showToast(`Saved ${product.name} to wishlist ♡`);
    }
  };

  // Filter and sort products
  const filteredProducts = PRODUCTS.filter((product) => {
    // Category filter
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    // Fiber filter
    if (selectedFiber !== 'all') {
      if (!product.fiber.toLowerCase().includes(selectedFiber.toLowerCase())) {
        return false;
      }
    }
    // In-stock filter
    if (onlyInStock && product.stockLeft === 0) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchSubtitle = product.subtitle.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchHardware = product.hardware.toLowerCase().includes(q);
      if (!matchName && !matchSubtitle && !matchDesc && !matchHardware) {
        return false;
      }
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured default
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F0] text-[#1C1C17]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#18301d] text-[#fcf9f0] px-4 py-3 rounded-xl shadow-cottage-lg border border-[#496549] text-xs font-semibold flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-[#f4b9a0]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartItems={cartItems}
        setIsCartOpen={setIsCartOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        wishlistCount={wishlist.length}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {activeTab === 'shop' && (
          <div>
            {/* Storybook Hero Banner */}
            <HeroBanner
              onExploreDrop={() => {
                const el = document.getElementById('catalog-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenStudio={() => {
                setActiveTab('studio');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Boutique Catalog Section */}
            <section id="catalog-section" className="py-10 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Category Filter Pills */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#ebe5d6]">
                <div>
                  <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#18301d]">
                    Handcrafted Crochet Keychains &amp; Bag Charms
                  </h2>
                  <p className="text-xs sm:text-sm text-[#434842] mt-0.5">
                    Autumn Drop #12 • Looped in 100% natural cotton with reinforced antique brass hardware
                  </p>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'all', label: 'All Keychains', count: PRODUCTS.length },
                    {
                      id: 'critters',
                      label: 'Frog & Critters',
                      count: PRODUCTS.filter((p) => p.category === 'critters').length
                    },
                    {
                      id: 'botanical',
                      label: 'Botanical & Fungi',
                      count: PRODUCTS.filter((p) => p.category === 'botanical').length
                    },
                    {
                      id: 'sweets',
                      label: 'Fruits & Berries',
                      count: PRODUCTS.filter((p) => p.category === 'sweets').length
                    },
                    {
                      id: 'bundles',
                      label: 'Gift Sets & Boxes',
                      count: PRODUCTS.filter((p) => p.category === 'bundles').length
                    },
                    {
                      id: 'patterns',
                      label: 'Keychain Patterns',
                      count: PRODUCTS.filter((p) => p.category === 'patterns').length
                    }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id as Category)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        selectedCategory === cat.id
                          ? 'bg-[#2e4732] text-white shadow-xs'
                          : 'bg-[#FAF8F3] text-[#434842] border border-[#c8bfa8] hover:border-[#6c8a6b]'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                          selectedCategory === cat.id
                            ? 'bg-[#496549] text-[#cdeacd]'
                            : 'bg-[#f1eee5] text-[#737971]'
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub-Filters: Fiber selection, Stock toggle, Sort selector */}
              <div className="py-4 flex flex-wrap items-center justify-between gap-4 text-xs text-[#434842]">
                <div className="flex flex-wrap items-center gap-3">
                  {/* Fiber Filter */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#737971]">Yarn:</span>
                    <select
                      id="select-fiber-filter"
                      value={selectedFiber}
                      onChange={(e) => setSelectedFiber(e.target.value)}
                      className="bg-[#FAF8F3] border border-[#c8bfa8] rounded-lg px-2.5 py-1 text-xs text-[#18301d] focus:ring-1 focus:ring-[#6c8a6b] outline-none"
                    >
                      <option value="all">All Natural Cottons</option>
                      <option value="mercerized">Mercerized Cotton</option>
                      <option value="organic">Organic Combed Cotton</option>
                      <option value="tweed">Tweed / Milk Cotton Blend</option>
                    </select>
                  </div>

                  {/* Only in stock toggle */}
                  <label className="flex items-center gap-1.5 cursor-pointer select-none">
                    <input
                      id="checkbox-in-stock"
                      type="checkbox"
                      checked={onlyInStock}
                      onChange={(e) => setOnlyInStock(e.target.checked)}
                      className="rounded border-[#c8bfa8] text-[#2e4732] focus:ring-[#6c8a6b] w-3.5 h-3.5"
                    />
                    <span>Ready to Ship in India</span>
                  </label>

                  {/* Active search filter badge */}
                  {searchQuery && (
                    <span className="bg-[#fbe8e0] text-[#712b0d] px-2.5 py-1 rounded-full text-xs flex items-center gap-1">
                      <span>Matching: "{searchQuery}"</span>
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="hover:text-black font-bold ml-1"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>

                {/* Sort selector in Rupees */}
                <div className="flex items-center gap-2">
                  <span className="text-[#737971]">Sort:</span>
                  <select
                    id="select-sort-by"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-[#FAF8F3] border border-[#c8bfa8] rounded-lg px-2.5 py-1 text-xs text-[#18301d] focus:ring-1 focus:ring-[#6c8a6b] outline-none"
                  >
                    <option value="featured">Featured Batch Order</option>
                    <option value="price-asc">Price: Low to High (₹)</option>
                    <option value="price-desc">Price: High to Low (₹)</option>
                    <option value="rating">Top Loved (5.0 ★)</option>
                  </select>
                </div>
              </div>

              {/* Product Cards Grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-[#FAF8F3] rounded-2xl border border-[#EFE8D6] my-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#f1eee5] flex items-center justify-center mx-auto text-xl">
                    🔍
                  </div>
                  <h3 className="font-serif-heading text-lg font-bold text-[#18301d]">
                    No keychains found matching your filter
                  </h3>
                  <p className="text-xs text-[#737971] max-w-sm mx-auto">
                    Try clearing your yarn selection or search keywords to see all available hand-looped charms.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedFiber('all');
                      setSearchQuery('');
                      setOnlyInStock(false);
                    }}
                    className="px-4 py-2 bg-[#2e4732] text-white text-xs font-semibold rounded-lg"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelect={(p) => setSelectedProduct(p)}
                      onQuickAdopt={handleQuickAdopt}
                      isWishlisted={wishlist.includes(product.id)}
                      onToggleWishlist={handleToggleWishlist}
                    />
                  ))}
                </div>
              )}

              {/* Custom Keychain Studio Callout Banner */}
              <div className="mt-16 bg-[#f6f3ea] border-2 border-dashed border-[#c8bfa8] rounded-2xl p-6 sm:p-10 shadow-cottage-sm relative overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-8 space-y-2">
                    <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-bold text-[#d87a56]">
                      <Key className="w-3.5 h-3.5" />
                      <span>Bespoke Keychain Workshop</span>
                    </div>
                    <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#18301d]">
                      Want a custom charm for your keys or bag?
                    </h3>
                    <p className="text-xs sm:text-sm text-[#434842] leading-relaxed max-w-xl">
                      Choose your favorite charm base (moss frog, mushroom toad, forest snail, or juicy strawberry), pick your hardware (antique brass swivel clasp, rose gold heart carabiner, or gunmetal clip), add an initial letter tag, and get a personalized adoption card from ₹249.
                    </p>
                  </div>

                  <div className="md:col-span-4 flex justify-start md:justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('studio');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-6 py-3.5 rounded-xl bg-[#d87a56] hover:bg-[#c36440] text-white font-bold text-xs transition-all shadow-cottage-sm flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Launch Custom Keychain Studio</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Adopt-A-Keychain Bespoke Builder View */}
        {activeTab === 'studio' && (
          <CritterStudio onAddCustomCritter={handleAddCustomCritter} />
        )}

        {/* Keychain Pattern Vault View */}
        {activeTab === 'patterns' && <PatternVault />}

        {/* Stitch Ledger Journal View */}
        {activeTab === 'ledger' && <StitchLedger />}
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Cart Drawer in Rupees */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCertificateOpen(true);
        }}
      />

      {/* Adoption Certificate & Final Checkout Modal */}
      <AdoptionCertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        items={cartItems}
        onOrderSuccess={() => {
          setCartItems([]);
          setIsCertificateOpen(false);
          showToast('Order confirmed! Keychain adoption certificate generated.');
        }}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
