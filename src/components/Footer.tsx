import React, { useState } from 'react';
import { Heart, Send, Sparkles, ShieldCheck, Key } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 2000);
    }
  };

  return (
    <footer className="bg-[#18301d] text-[#fcf9f0] pt-14 pb-12 border-t border-[#2e4732]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Newsletter & Studio Motto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pb-12 border-b border-[#2e4732]">
          <div className="lg:col-span-6 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#98b59a] font-bold block">
              The Sunday Skein Newsletter
            </span>
            <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white">
              Quiet notes from Ishani's studio.
            </h3>
            <p className="text-xs sm:text-sm text-[#cdeacd] leading-relaxed max-w-md">
              Receive notifications for seasonal batch drops 24 hours before public release, free micro-patterns, and secret keychain charm recipes.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="p-4 rounded-xl bg-[#2e4732] border border-[#6c8a6b] text-xs text-[#cdeacd] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#f4b9a0]" />
                <span>Thank you, kindred spirit! You're subscribed to The Sunday Skein.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  id="footer-newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@domain.com"
                  required
                  className="flex-1 text-xs px-4 py-3 rounded-lg bg-[#2e4732] border border-[#496549] text-white placeholder-[#98b59a] focus:ring-2 focus:ring-[#cdeacd] outline-none"
                />
                <button
                  id="btn-footer-subscribe"
                  type="submit"
                  className="px-5 py-3 rounded-lg bg-[#d87a56] hover:bg-[#c36440] text-white font-semibold text-xs transition-colors flex items-center gap-2 shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <span className="text-[10px] text-[#98b59a] mt-2 block">
              Free delivery across India on all keychain orders over ₹499. No spam, ever.
            </span>
          </div>
        </div>

        {/* 4-Column Footer Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          {/* Brand Info */}
          <div className="space-y-3 col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#d87a56] text-white flex items-center justify-center font-serif-heading font-bold text-xs">
                M
              </div>
              <span className="font-serif-heading font-bold text-base text-white">
                Mossy By Ishani
              </span>
            </div>
            <p className="text-[#98b59a] leading-relaxed">
              Artisanal crochet boutique handcrafting amigurumi keychains, purse charms, and pocket companions in India.
            </p>
            <div className="text-[11px] text-[#cdeacd] pt-1">
              <span>Studio: Hand-looped in India</span>
              <span className="block">All prices shown in Indian Rupees (INR ₹)</span>
            </div>
          </div>

          {/* Boutique Links */}
          <div className="space-y-2">
            <h4 className="font-serif-heading font-bold text-sm text-white uppercase tracking-wider">
              Keychain Drops
            </h4>
            <ul className="space-y-1.5 text-[#cdeacd]">
              <li><span className="hover:text-white transition-colors cursor-pointer">Frog &amp; Toad Charms</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Amanita Mushroom Keyrings</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Strawberry Bag Charms</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Woodland Gift Trio Box (₹799)</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Bespoke Custom Keychain Studio</span></li>
            </ul>
          </div>

          {/* Maker Corner */}
          <div className="space-y-2">
            <h4 className="font-serif-heading font-bold text-sm text-white uppercase tracking-wider">
              Maker's Corner
            </h4>
            <ul className="space-y-1.5 text-[#cdeacd]">
              <li><span className="hover:text-white transition-colors cursor-pointer">Keychain Pattern Vault</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Digital Stitch Tally Counter</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">US Stitch Glossary</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Key Hardware Attachment Guide</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Care &amp; Cleaning Tips</span></li>
            </ul>
          </div>

          {/* Studio Ethics */}
          <div className="space-y-2">
            <h4 className="font-serif-heading font-bold text-sm text-white uppercase tracking-wider">
              Studio Ethics
            </h4>
            <ul className="space-y-1.5 text-[#cdeacd]">
              <li className="flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-[#f4b9a0]" />
                <span>Heavy-Duty Antique Brass Clasps</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#f4b9a0]" />
                <span>Zero-Waste Scrap Hearts Inside</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#f4b9a0]" />
                <span>100% Pure Botanical Cotton</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#f4b9a0]" />
                <span>Compostable Seed-Paper Packaging</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#2e4732] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#98b59a] gap-3">
          <div className="flex items-center gap-1">
            <span>Hand-crafted with</span>
            <Heart className="w-3 h-3 text-[#d87a56] fill-current inline" />
            <span>by Ishani in India • © 2024–2026 Mossy. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Prices displayed in INR (₹)</span>
            <span>•</span>
            <span>Crochet Keychains &amp; Bag Charms Atelier</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
