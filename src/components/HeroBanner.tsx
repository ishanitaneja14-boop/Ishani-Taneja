import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Key } from 'lucide-react';

interface HeroBannerProps {
  onExploreDrop: () => void;
  onOpenStudio: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreDrop, onOpenStudio }) => {
  return (
    <section className="relative overflow-hidden bg-[#f6f3ea] border-b border-[#ebe5d6] py-12 md:py-18 bg-woven-texture">
      {/* Decorative botanical accents */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[#c8e8c4]/30 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 -mb-20 w-72 h-72 rounded-full bg-[#ffdbcf]/30 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Editorial Narrative */}
          <div className="lg:col-span-7 space-y-6">
            {/* Hand-stitched badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fcf9f0] border border-[#c8bfa8] text-xs font-semibold text-[#2e4732] shadow-cottage-sm">
              <span className="w-2 h-2 rounded-full bg-[#d87a56]"></span>
              <span>Autumn Keychain Drop #12 Live</span>
              <span className="text-[#737971]">•</span>
              <span className="text-[#6c8a6b]">Handmade by Ishani in India</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#18301d] leading-[1.15] tracking-tight">
              Handcrafted crochet keychains &amp; pocket companions.
            </h1>

            {/* Body Description */}
            <p className="text-base sm:text-lg text-[#434842] leading-relaxed max-w-2xl font-normal">
              Every miniature frog, spotted toadstool, and woodland critter keychain is patiently looped by hand
              from pure botanical cotton and fitted with heavy-duty antique brass swivel clasps to brighten your keys and bags.
            </p>

            {/* Quick Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#e7efe6] text-[#2e4732] border border-[#bacbba]">
                <Key className="w-3 h-3 text-[#6c8a6b]" />
                Heavy-Duty Antique Brass Clasps
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#fbe8e0] text-[#712b0d] border border-[#ffb59a]">
                <Heart className="w-3 h-3 text-[#d87a56]" />
                Zero-Waste Scrap Hearts Inside
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#f1eee5] text-[#434842] border border-[#c8bfa8]">
                <ShieldCheck className="w-3 h-3 text-[#737971]" />
                Free India Delivery Over ₹499
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                id="btn-hero-explore"
                type="button"
                onClick={onExploreDrop}
                className="bg-[#2e4732] hover:bg-[#18301d] text-[#fcf9f0] px-7 py-3.5 rounded-lg font-semibold text-sm transition-all shadow-cottage-md hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>Adopt a Keychain</span>
                <ArrowRight className="w-4 h-4 text-[#f4b9a0]" />
              </button>

              <button
                id="btn-hero-studio"
                type="button"
                onClick={onOpenStudio}
                className="bg-[#fcf9f0] hover:bg-[#ffffff] text-[#2e4732] border border-[#c8bfa8] px-6 py-3.5 rounded-lg font-semibold text-sm transition-all shadow-cottage-sm hover:border-[#6c8a6b] flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#d87a56]" />
                <span>Custom Keychain Builder</span>
              </button>
            </div>
          </div>

          {/* Right Visual Showcase with Artisan Stamp & Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              {/* Main Handcrafted Card Frame */}
              <div className="bg-[#FAF8F3] p-4 sm:p-5 rounded-2xl border border-[#EFE8D6] shadow-cottage-lg relative">
                <div className="relative aspect-4/3 rounded-xl overflow-hidden mb-4 bg-[#ebe5d6]">
                  <img
                    src="https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=1000&q=80"
                    alt="Sir Ribbit and Toadstool Keychain by Ishani"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#18301d]/90 backdrop-blur-sm text-[#fcf9f0] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Bestselling Keychain
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#fcf9f0]/95 backdrop-blur-sm text-[#2e4732] text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm border border-[#c8bfa8]">
                    ₹349 • Antique Brass Clasp
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-serif-heading text-lg font-bold text-[#18301d]">
                      Sir Ribbit Toadstool Keychain
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#c8e8c4] text-[#18301d] font-semibold">
                      Only 4 Left
                    </span>
                  </div>
                  <p className="text-xs text-[#434842] line-clamp-2">
                    Hand-looped in botanical sage cotton with removable toadstool cap, brass swivel clasp, and cheerful golden chime bell.
                  </p>
                </div>
              </div>

              {/* Bespoke Rotating Artisan Stamp */}
              <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 w-28 h-28 sm:w-32 sm:h-32 pointer-events-none">
                <div className="relative w-full h-full flex items-center justify-center">
                  <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                    <path
                      id="circlePath"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="none"
                    />
                    <text className="text-[8.5px] font-bold fill-[#2e4732] tracking-[0.22em] uppercase">
                      <textPath href="#circlePath" startOffset="0%">
                        • CROCHET KEYCHAINS BY ISHANI • EST. 2024
                      </textPath>
                    </text>
                  </svg>
                  {/* Stamp Center Emblem */}
                  <div className="absolute w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#d87a56] text-white flex items-center justify-center shadow-md border-2 border-[#fcf9f0]">
                    <span className="font-serif-heading text-lg sm:text-xl font-bold">M</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
