import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Sparkles, X, Menu, Key } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  activeTab: 'shop' | 'studio' | 'ledger' | 'patterns';
  setActiveTab: (tab: 'shop' | 'studio' | 'ledger' | 'patterns') => void;
  cartItems: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  wishlistCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartItems,
  setIsCartOpen,
  searchQuery,
  setSearchQuery,
  wishlistCount
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#fcf9f0]/95 backdrop-blur-md border-b border-[#ebe5d6]">
      {/* Top Announcement Bar in Rupees */}
      <div className="bg-[#18301d] text-[#f7f4eb] text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#f4b9a0] animate-pulse"></span>
        <span>
          Autumn Keychain Drop is live • Free botanical seed card with every charm • Free delivery across India over ₹499!
        </span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <button
            id="btn-mobile-menu"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#2e4732] hover:bg-[#f1eee5] transition-colors"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo & Brand Identity */}
          <button
            id="brand-logo"
            type="button"
            onClick={() => {
              setActiveTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-11 h-11 rounded-full bg-[#2e4732] text-[#fcf9f0] flex items-center justify-center shadow-cottage-sm transition-transform duration-300 group-hover:scale-105 border border-[#496549] relative">
              {/* Cute Stylized Frog with Keyring Loop */}
              <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                <circle cx="7" cy="9" r="3" fill="#6c8a6b" />
                <circle cx="17" cy="9" r="3" fill="#6c8a6b" />
                <circle cx="7" cy="9" r="1.2" fill="#18301d" />
                <circle cx="17" cy="9" r="1.2" fill="#18301d" />
                <ellipse cx="12" cy="15" rx="7" ry="5.5" fill="#fcf9f0" />
                <ellipse cx="12" cy="15" rx="5.5" ry="4" fill="#6c8a6b" opacity="0.4" />
                <path d="M9 15.5 Q12 18 15 15.5" stroke="#18301d" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                <circle cx="9" cy="14.5" r="0.8" fill="#d87a56" />
                <circle cx="15" cy="14.5" r="0.8" fill="#d87a56" />
                {/* Brass ring top loop */}
                <circle cx="12" cy="3.5" r="2.5" fill="none" stroke="#d87a56" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <span className="font-serif-heading text-2xl font-bold text-[#18301d] tracking-tight block leading-tight">
                Mossy
              </span>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#6c8a6b] block">
                By Ishani • Crochet Keychains
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              id="nav-shop"
              type="button"
              onClick={() => setActiveTab('shop')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'shop'
                  ? 'bg-[#2e4732] text-[#fcf9f0] shadow-sm'
                  : 'text-[#1c1c17] hover:text-[#2e4732] hover:bg-[#f1eee5]'
              }`}
            >
              Shop Keychains
            </button>
            <button
              id="nav-studio"
              type="button"
              onClick={() => setActiveTab('studio')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'studio'
                  ? 'bg-[#2e4732] text-[#fcf9f0] shadow-sm'
                  : 'text-[#1c1c17] hover:text-[#2e4732] hover:bg-[#f1eee5]'
              }`}
            >
              <Key className="w-3.5 h-3.5 text-[#d87a56]" />
              <span>Custom Keychain Studio</span>
              <span className="text-[10px] bg-[#fbe8e0] text-[#d87a56] px-1.5 py-0.5 rounded-full font-bold ml-0.5">
                Bespoke
              </span>
            </button>
            <button
              id="nav-patterns"
              type="button"
              onClick={() => setActiveTab('patterns')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'patterns'
                  ? 'bg-[#2e4732] text-[#fcf9f0] shadow-sm'
                  : 'text-[#1c1c17] hover:text-[#2e4732] hover:bg-[#f1eee5]'
              }`}
            >
              Keychain Patterns
            </button>
            <button
              id="nav-ledger"
              type="button"
              onClick={() => setActiveTab('ledger')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'ledger'
                  ? 'bg-[#2e4732] text-[#fcf9f0] shadow-sm'
                  : 'text-[#1c1c17] hover:text-[#2e4732] hover:bg-[#f1eee5]'
              }`}
            >
              Studio Diary
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            {/* Search Bar / Toggle */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center bg-[#f1eee5] rounded-full px-3 py-1.5 border border-[#c3c8c0] shadow-inner transition-all w-48 sm:w-64">
                  <Search className="w-4 h-4 text-[#737971] mr-2 shrink-0" />
                  <input
                    id="search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search frogs, mushrooms, charms..."
                    className="bg-transparent text-sm w-full outline-none text-[#1c1c17] placeholder-[#737971]"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setIsSearchOpen(false);
                    }}
                    className="p-1 hover:text-[#ba1a1a]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  id="btn-search-open"
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2.5 rounded-full text-[#1c1c17] hover:bg-[#f1eee5] transition-colors"
                  aria-label="Search keychains"
                >
                  <Search className="w-5 h-5 text-[#2e4732]" />
                </button>
              )}
            </div>

            {/* Wishlist Indicator */}
            <div className="relative hidden sm:block">
              <div
                className="p-2.5 rounded-full text-[#1c1c17] hover:bg-[#f1eee5] transition-colors relative"
                title="Your Wishlist"
              >
                <Heart className="w-5 h-5 text-[#2e4732]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#d87a56] text-[#ffffff] text-[10px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </div>
            </div>

            {/* Slide-over Basket Button */}
            <button
              id="btn-open-cart"
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-[#2e4732] hover:bg-[#18301d] text-[#fcf9f0] px-4 py-2.5 rounded-full transition-all shadow-cottage-sm active:scale-95"
              aria-label="View basket"
            >
              <ShoppingBag className="w-4 h-4 text-[#f4b9a0]" />
              <span className="text-sm font-semibold hidden sm:inline">Basket</span>
              <span className="w-5 h-5 rounded-full bg-[#d87a56] text-white text-xs font-bold flex items-center justify-center">
                {totalCartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#ebe5d6] flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setActiveTab('shop');
                setMobileMenuOpen(false);
              }}
              className={`px-4 py-3 rounded-lg text-left font-medium ${
                activeTab === 'shop' ? 'bg-[#2e4732] text-white' : 'text-[#1c1c17]'
              }`}
            >
              Shop Keychains
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('studio');
                setMobileMenuOpen(false);
              }}
              className={`px-4 py-3 rounded-lg text-left font-medium flex items-center justify-between ${
                activeTab === 'studio' ? 'bg-[#2e4732] text-white' : 'text-[#1c1c17]'
              }`}
            >
              <span>Custom Keychain Studio</span>
              <span className="text-xs bg-[#fbe8e0] text-[#d87a56] px-2 py-0.5 rounded-full font-bold">
                Bespoke Builder
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('patterns');
                setMobileMenuOpen(false);
              }}
              className={`px-4 py-3 rounded-lg text-left font-medium ${
                activeTab === 'patterns' ? 'bg-[#2e4732] text-white' : 'text-[#1c1c17]'
              }`}
            >
              Keychain Patterns &amp; DIY
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('ledger');
                setMobileMenuOpen(false);
              }}
              className={`px-4 py-3 rounded-lg text-left font-medium ${
                activeTab === 'ledger' ? 'bg-[#2e4732] text-white' : 'text-[#1c1c17]'
              }`}
            >
              Studio Diary
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
