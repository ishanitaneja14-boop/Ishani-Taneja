import React, { useState } from 'react';
import { Sparkles, Check, Key, ShieldCheck, Heart } from 'lucide-react';
import { CartItem } from '../types';

interface CritterStudioProps {
  onAddCustomCritter: (item: CartItem) => void;
}

export const CritterStudio: React.FC<CritterStudioProps> = ({ onAddCustomCritter }) => {
  const [charmType, setCharmType] = useState<'frog' | 'toad' | 'snail' | 'strawberry' | 'bear' | 'sprout'>('frog');
  const [hardware, setHardware] = useState<'brass-swivel' | 'gold-heart' | 'gunmetal-hook' | 'beaded-ring'>('brass-swivel');
  const [topper, setTopper] = useState<'mushroom' | 'leaf' | 'flower' | 'none'>('mushroom');
  const [yarnColor, setYarnColor] = useState<{ id: string; name: string; hex: string; secondary: string }>({
    id: 'moss',
    name: 'Deep Forest Moss',
    hex: '#2E4732',
    secondary: '#496549'
  });
  const [accent, setAccent] = useState<'bell' | 'wood-bead' | 'initial-tag' | 'none'>('bell');
  const [initialChar, setInitialChar] = useState('I');
  const [keychainName, setKeychainName] = useState('Sir Clover Ribbit');
  const [adopterName, setAdopterName] = useState('Gentle Maker');
  const [isCommissioning, setIsCommissioning] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);

  // Rupee base prices for keychains
  const basePrices: Record<string, number> = {
    frog: 349,
    toad: 329,
    snail: 319,
    strawberry: 289,
    bear: 359,
    sprout: 249
  };

  const hardwarePrices: Record<string, number> = {
    'brass-swivel': 0,
    'gold-heart': 30,
    'gunmetal-hook': 20,
    'beaded-ring': 15
  };

  const topperPrices: Record<string, number> = {
    mushroom: 40,
    leaf: 25,
    flower: 30,
    none: 0
  };

  const accentPrices: Record<string, number> = {
    bell: 25,
    'wood-bead': 20,
    'initial-tag': 35,
    none: 0
  };

  const totalPrice =
    basePrices[charmType] + hardwarePrices[hardware] + topperPrices[topper] + accentPrices[accent];

  const handleAdopt = () => {
    setIsCommissioning(true);

    const customItem: CartItem = {
      id: `custom-keychain-${Date.now()}`,
      productId: `bespoke-keychain-${charmType}`,
      name: `${keychainName.trim() || 'Custom'} Keychain`,
      subtitle: `Bespoke Handcrafted ${charmType.toUpperCase()} Keychain with ${hardware.replace('-', ' ')}`,
      price: totalPrice,
      image:
        charmType === 'frog'
          ? 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=800&q=80'
          : charmType === 'toad'
          ? 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=800&q=80'
          : charmType === 'snail'
          ? 'https://images.unsplash.com/photo-1598462047020-d7a0e988020a?auto=format&fit=crop&w=800&q=80'
          : 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
      quantity: 1,
      fiber: '100% Botanical Combed Cotton',
      hardware: hardware === 'brass-swivel' ? 'Antique Brass Swivel Lobster Clasp' : hardware.replace('-', ' '),
      isCustomKeychain: true,
      customDetails: {
        charmType: charmType.charAt(0).toUpperCase() + charmType.slice(1),
        topper: topper === 'none' ? 'Natural' : topper.charAt(0).toUpperCase() + topper.slice(1),
        yarnColorName: yarnColor.name,
        hardware: hardware.replace('-', ' '),
        charmAccent: accent === 'initial-tag' ? `Initial Tag "${initialChar}"` : accent.replace('-', ' '),
        initialChar: accent === 'initial-tag' ? initialChar : undefined,
        adoptedName: keychainName.trim() || 'Clover'
      }
    };

    setTimeout(() => {
      onAddCustomCritter(customItem);
      setIsCommissioning(false);
      setSuccessNotice(true);
      setTimeout(() => setSuccessNotice(false), 4000);
    }, 600);
  };

  return (
    <div className="py-8 sm:py-12 bg-[#FCF9F0] bg-woven-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fbe8e0] text-[#712b0d] text-xs font-bold border border-[#ffb59a]">
            <Key className="w-3.5 h-3.5 text-[#d87a56]" />
            <span>Interactive Custom Keychain Workshop</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#18301d]">
            Build Your Bespoke Crochet Keychain
          </h2>
          <p className="text-sm sm:text-base text-[#434842]">
            Design a one-of-a-kind amigurumi bag charm or keyring. Ishani will hand-loop your charm
            from pure cotton, mount your chosen metal hardware, and tuck an adoption certificate into your parcel.
          </p>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Live Render / Stage */}
          <div className="lg:col-span-5 bg-[#FAF8F3] border border-[#EFE8D6] rounded-2xl p-6 sm:p-8 shadow-cottage-md sticky top-28">
            <div className="relative aspect-square max-w-sm mx-auto rounded-xl bg-[#f6f3ea] border border-[#c8bfa8] flex flex-col items-center justify-center p-6 shadow-inner overflow-hidden">
              {/* Soft background light */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none transition-colors duration-500"
                style={{ backgroundColor: yarnColor.hex }}
              />

              {/* Dynamic SVG Keychain Graphic */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 transition-transform duration-300 hover:scale-105">
                <svg viewBox="0 0 200 220" className="w-full h-full filter drop-shadow-md">
                  {/* Metal Keychain Hardware Clasp at Top */}
                  <g transform="translate(100, 20)">
                    {hardware === 'brass-swivel' && (
                      <g>
                        {/* Antique Brass Swivel Lobster Clasp */}
                        <circle cx="0" cy="0" r="10" fill="none" stroke="#b8860b" strokeWidth="3" />
                        <rect x="-3" y="10" width="6" height="8" rx="2" fill="#b8860b" />
                        <path d="M -5 18 L 5 18 L 3 28 L -3 28 Z" fill="#996515" />
                        <line x1="0" y1="28" x2="0" y2="38" stroke="#b8860b" strokeWidth="2.5" />
                      </g>
                    )}

                    {hardware === 'gold-heart' && (
                      <g>
                        {/* Rose Gold Heart Carabiner */}
                        <path
                          d="M 0 6 C -8 -4, -18 2, -18 12 C -18 22, 0 32, 0 34 C 0 32, 18 22, 18 12 C 18 2, 8 -4, 0 6 Z"
                          fill="none"
                          stroke="#e08d79"
                          strokeWidth="3"
                        />
                        <line x1="0" y1="34" x2="0" y2="40" stroke="#e08d79" strokeWidth="2.5" />
                      </g>
                    )}

                    {hardware === 'gunmetal-hook' && (
                      <g>
                        {/* Gunmetal Snap Hook */}
                        <circle cx="0" cy="4" r="11" fill="none" stroke="#4a4a4a" strokeWidth="3.5" />
                        <rect x="-4" y="15" width="8" height="12" rx="2" fill="#333333" />
                        <line x1="0" y1="27" x2="0" y2="38" stroke="#4a4a4a" strokeWidth="2.5" />
                      </g>
                    )}

                    {hardware === 'beaded-ring' && (
                      <g>
                        {/* Split Ring + Wood Bead */}
                        <circle cx="0" cy="0" r="12" fill="none" stroke="#a0a0a0" strokeWidth="2.5" strokeDasharray="3,1" />
                        <circle cx="0" cy="20" r="6" fill="#c49a6c" stroke="#8b5a2b" strokeWidth="1" />
                        <line x1="0" y1="26" x2="0" y2="38" stroke="#8b5a2b" strokeWidth="2" />
                      </g>
                    )}
                  </g>

                  {/* Connecting yarn loop */}
                  <line x1="100" y1="58" x2="100" y2="68" stroke={yarnColor.hex} strokeWidth="4" strokeLinecap="round" />

                  {/* Keychain Charm Body */}
                  <g transform="translate(0, 15)">
                    {/* Shadow under charm */}
                    <ellipse cx="100" cy="180" rx="50" ry="9" fill="#1c1c17" opacity="0.1" />

                    {charmType === 'frog' && (
                      <g>
                        <circle cx="72" cy="76" r="18" fill={yarnColor.hex} />
                        <circle cx="128" cy="76" r="18" fill={yarnColor.hex} />
                        <circle cx="72" cy="76" r="11" fill="#FCF9F0" />
                        <circle cx="128" cy="76" r="11" fill="#FCF9F0" />
                        <circle cx="73" cy="76" r="6" fill="#18301d" />
                        <circle cx="127" cy="76" r="6" fill="#18301d" />
                        <ellipse cx="100" cy="120" rx="54" ry="44" fill={yarnColor.hex} />
                        <ellipse cx="100" cy="126" rx="35" ry="28" fill="#f6f3ea" opacity="0.9" />
                        <path d="M 85 118 Q 100 130 115 118" stroke="#18301d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                        <circle cx="75" cy="118" r="5" fill="#f4b9a0" opacity="0.8" />
                        <circle cx="125" cy="118" r="5" fill="#f4b9a0" opacity="0.8" />
                        <ellipse cx="80" cy="158" rx="11" ry="6" fill={yarnColor.hex} />
                        <ellipse cx="120" cy="158" rx="11" ry="6" fill={yarnColor.hex} />
                      </g>
                    )}

                    {charmType === 'toad' && (
                      <g>
                        <ellipse cx="100" cy="124" rx="60" ry="42" fill={yarnColor.hex} />
                        <circle cx="68" cy="100" r="6" fill={yarnColor.secondary} opacity="0.7" />
                        <circle cx="132" cy="104" r="7" fill={yarnColor.secondary} opacity="0.7" />
                        <path d="M 70 94 Q 80 88 90 94" stroke="#18301d" strokeWidth="3" strokeLinecap="round" fill="none" />
                        <path d="M 110 94 Q 120 88 130 94" stroke="#18301d" strokeWidth="3" strokeLinecap="round" fill="none" />
                        <path d="M 90 118 Q 100 124 110 118" stroke="#18301d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                        <ellipse cx="72" cy="112" rx="7" ry="4" fill="#f4b9a0" opacity="0.6" />
                        <ellipse cx="128" cy="112" rx="7" ry="4" fill="#f4b9a0" opacity="0.6" />
                        <ellipse cx="74" cy="160" rx="14" ry="7" fill={yarnColor.hex} />
                        <ellipse cx="126" cy="160" rx="14" ry="7" fill={yarnColor.hex} />
                      </g>
                    )}

                    {charmType === 'strawberry' && (
                      <g>
                        <path d="M 100 165 C 60 145, 60 90, 100 85 C 140 90, 140 145, 100 165 Z" fill="#d87a56" />
                        <circle cx="85" cy="105" r="2" fill="#ffd700" />
                        <circle cx="115" cy="105" r="2" fill="#ffd700" />
                        <circle cx="100" cy="120" r="2" fill="#ffd700" />
                        <circle cx="85" cy="135" r="2" fill="#ffd700" />
                        <circle cx="115" cy="135" r="2" fill="#ffd700" />
                        <circle cx="100" cy="148" r="2" fill="#ffd700" />
                        {/* Calyx Green Leaves */}
                        <path d="M 100 85 L 85 75 L 94 85 L 100 70 L 106 85 L 115 75 Z" fill="#6c8a6b" />
                      </g>
                    )}

                    {charmType === 'snail' && (
                      <g>
                        <path d="M 55 155 C 55 135, 80 140, 95 148 C 125 152, 155 154, 165 156 C 168 157, 168 162, 165 163 C 140 165, 65 165, 55 155 Z" fill={yarnColor.hex} />
                        <circle cx="115" cy="120" r="36" fill={yarnColor.secondary} />
                        <path d="M 115 120 m -24 0 a 24 24 0 1 1 48 0 a 16 16 0 1 1 -32 0" fill="none" stroke="#FAF8F3" strokeWidth="3" strokeLinecap="round" />
                        <circle cx="60" cy="144" r="2.5" fill="#18301d" />
                      </g>
                    )}

                    {charmType === 'bear' && (
                      <g>
                        <circle cx="70" cy="74" r="14" fill={yarnColor.hex} />
                        <circle cx="70" cy="74" r="8" fill="#f4b9a0" />
                        <circle cx="130" cy="74" r="14" fill={yarnColor.hex} />
                        <circle cx="130" cy="74" r="8" fill="#f4b9a0" />
                        <circle cx="100" cy="105" r="38" fill={yarnColor.hex} />
                        <ellipse cx="100" cy="145" rx="42" ry="30" fill={yarnColor.hex} />
                        <ellipse cx="100" cy="112" rx="18" ry="13" fill="#FAF8F3" />
                        <ellipse cx="100" cy="107" rx="5" ry="4" fill="#18301d" />
                        <circle cx="86" cy="100" r="4" fill="#18301d" />
                        <circle cx="114" cy="100" r="4" fill="#18301d" />
                      </g>
                    )}

                    {charmType === 'sprout' && (
                      <g>
                        <path d="M 100 150 Q 80 130 75 110 C 70 85, 110 80, 100 110 Z" fill={yarnColor.hex} />
                        <path d="M 100 150 Q 120 130 125 110 C 130 85, 90 80, 100 110 Z" fill={yarnColor.secondary} />
                        <circle cx="100" cy="148" r="16" fill="#712b0d" />
                      </g>
                    )}

                    {/* Topper on Head */}
                    {topper === 'mushroom' && (
                      <g transform="translate(100, 68)">
                        <path d="M -30 0 C -30 -24, 30 -24, 30 0 C 30 4, -30 4, -30 0 Z" fill="#d87a56" />
                        <ellipse cx="0" cy="1" rx="30" ry="5" fill="#FAF8F3" />
                        <circle cx="-14" cy="-8" r="3" fill="#FAF8F3" />
                        <circle cx="0" cy="-14" r="3.5" fill="#FAF8F3" />
                        <circle cx="14" cy="-7" r="3" fill="#FAF8F3" />
                      </g>
                    )}

                    {topper === 'leaf' && (
                      <g transform="translate(100, 70)">
                        <path d="M 0 0 C -12 -8, -16 -24, 0 -30 C 16 -24, 12 -8, 0 0 Z" fill="#6c8a6b" />
                        <line x1="0" y1="0" x2="0" y2="-26" stroke="#496549" strokeWidth="1.5" />
                      </g>
                    )}

                    {topper === 'flower' && (
                      <g transform="translate(100, 70)">
                        <circle cx="-12" cy="-3" r="5" fill="#FAF8F3" />
                        <circle cx="-12" cy="-3" r="2" fill="#d87a56" />
                        <circle cx="0" cy="-6" r="7" fill="#FAF8F3" />
                        <circle cx="0" cy="-6" r="3" fill="#d87a56" />
                        <circle cx="12" cy="-3" r="5" fill="#FAF8F3" />
                        <circle cx="12" cy="-3" r="2" fill="#d87a56" />
                      </g>
                    )}

                    {/* Dangling Charm Accent */}
                    {accent === 'bell' && (
                      <g transform="translate(136, 120)">
                        <circle cx="0" cy="0" r="7" fill="#ffd700" stroke="#b8860b" strokeWidth="1.2" />
                        <circle cx="0" cy="2" r="1.5" fill="#712b0d" />
                      </g>
                    )}

                    {accent === 'wood-bead' && (
                      <g transform="translate(136, 120)">
                        <circle cx="0" cy="0" r="8" fill="#c49a6c" stroke="#8b5a2b" strokeWidth="1.5" />
                        <circle cx="0" cy="0" r="2" fill="#8b5a2b" />
                      </g>
                    )}

                    {accent === 'initial-tag' && (
                      <g transform="translate(136, 120)">
                        <circle cx="0" cy="0" r="9" fill="#fcf9f0" stroke="#b8860b" strokeWidth="1.5" />
                        <text x="0" y="3.5" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#18301d" fontFamily="serif">
                          {initialChar || 'I'}
                        </text>
                      </g>
                    )}
                  </g>
                </svg>
              </div>

              {/* Dynamic Name Tag */}
              <div className="mt-4 text-center">
                <span className="font-serif-heading font-bold text-lg text-[#18301d]">
                  {keychainName || 'Custom Keychain'}
                </span>
                <span className="block text-[11px] text-[#6c8a6b] font-medium tracking-wide">
                  To be crafted for: {adopterName || 'A Kindred Spirit'}
                </span>
              </div>
            </div>

            {/* Artisan Keychain Craftsmanship Details */}
            <div className="mt-5 space-y-2 text-xs text-[#434842]">
              <div className="flex items-center justify-between py-1.5 border-b border-[#ebe5d6]">
                <span className="text-[#737971]">Hand-looped by:</span>
                <span className="font-semibold text-[#18301d]">Ishani in India</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-[#ebe5d6]">
                <span className="text-[#737971]">Estimated craft time:</span>
                <span className="font-semibold text-[#2e4732]">2 to 3 patient hours</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-[#ebe5d6]">
                <span className="text-[#737971]">Key hardware mount:</span>
                <span className="font-semibold text-[#18301d]">{hardware.replace('-', ' ')}</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-[#737971]">Included:</span>
                <span className="font-semibold text-[#d87a56]">Certificate Card + Seed Tag</span>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Base Keychain Charm */}
            <div className="bg-[#FAF8F3] border border-[#EFE8D6] rounded-xl p-5 shadow-cottage-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-heading font-bold text-base text-[#18301d] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#2e4732] text-white text-xs flex items-center justify-center font-sans">
                    1
                  </span>
                  Choose Keychain Charm Base
                </h3>
                <span className="text-xs text-[#737971]">Base from ₹{basePrices[charmType]}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'frog', label: 'Moss Frog', price: 349, emoji: '🐸', desc: 'Curious & Wide-Eyed' },
                  { id: 'toad', label: 'Sleepy Toad', price: 329, emoji: '🪵', desc: 'Chubby & Content' },
                  { id: 'strawberry', label: 'Wild Berry', price: 289, emoji: '🍓', desc: 'Juicy Seed Knots' },
                  { id: 'snail', label: 'Forest Snail', price: 319, emoji: '🐌', desc: 'Spiraled Shell' },
                  { id: 'bear', label: 'Acorn Bear', price: 359, emoji: '🐻', desc: 'Fuzzy Backpack Buddy' },
                  { id: 'sprout', label: 'Twin Sprout', price: 249, emoji: '🌱', desc: 'Minimalist Cord Wrap' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCharmType(item.id as any)}
                    className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
                      charmType === item.id
                        ? 'bg-[#e7efe6] border-[#2e4732] ring-2 ring-[#6c8a6b]/30 shadow-xs'
                        : 'bg-[#fcf9f0] border-[#c8bfa8] hover:border-[#6c8a6b]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{item.emoji}</span>
                      <span className="text-xs font-bold text-[#18301d]">₹{item.price}</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-xs font-bold text-[#18301d] block">{item.label}</span>
                      <span className="text-[10px] text-[#737971] leading-tight block">
                        {item.desc}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Keychain Metal Hardware */}
            <div className="bg-[#FAF8F3] border border-[#EFE8D6] rounded-xl p-5 shadow-cottage-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-heading font-bold text-base text-[#18301d] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#2e4732] text-white text-xs flex items-center justify-center font-sans">
                    2
                  </span>
                  Choose Metal Key Hardware
                </h3>
                <span className="text-xs text-[#737971]">
                  {hardwarePrices[hardware] > 0 ? `+ ₹${hardwarePrices[hardware]}` : 'Included'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'brass-swivel', label: 'Antique Brass Swivel Lobster Clasp', price: 0, desc: 'Rotates 360°, heavy-duty' },
                  { id: 'gold-heart', label: 'Rose Gold Heart Carabiner', price: 30, desc: 'Spring-loaded heart clip' },
                  { id: 'gunmetal-hook', label: 'Gunmetal Snap Hook + Keyring', price: 20, desc: 'Matte dark finish for EDC' },
                  { id: 'beaded-ring', label: 'Stainless Split Ring + Wood Bead', price: 15, desc: 'Classic 25mm ring with pine bead' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setHardware(item.id as any)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      hardware === item.id
                        ? 'bg-[#e7efe6] border-[#2e4732] ring-2 ring-[#6c8a6b]/30'
                        : 'bg-[#fcf9f0] border-[#c8bfa8] hover:border-[#6c8a6b]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#18301d]">{item.label}</span>
                      <span className="text-[10px] text-[#737971]">
                        {item.price > 0 ? `+₹${item.price}` : 'Free'}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#737971] block mt-0.5">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Botanical Yarn Colorway */}
            <div className="bg-[#FAF8F3] border border-[#EFE8D6] rounded-xl p-5 shadow-cottage-sm space-y-3">
              <h3 className="font-serif-heading font-bold text-base text-[#18301d] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#2e4732] text-white text-xs flex items-center justify-center font-sans">
                  3
                </span>
                Cotton Yarn Shade
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'moss', name: 'Deep Forest Moss', hex: '#2E4732', secondary: '#496549', plant: 'Walnut & Fern' },
                  { id: 'sage', name: 'Warm Sage Whisper', hex: '#6C8A6B', secondary: '#86A485', plant: 'Eucalyptus Leaf' },
                  { id: 'terracotta', name: 'Terracotta Clay', hex: '#D87A56', secondary: '#E69273', plant: 'Madder Root' },
                  { id: 'oatmeal', name: 'Oatmeal Linen', hex: '#DDD5BF', secondary: '#C8BFA8', plant: 'Unbleached Cotton' },
                  { id: 'berry', name: 'Dusky Wildberry', hex: '#7E4A62', secondary: '#965E79', plant: 'Elderberry Tannin' }
                ].map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => setYarnColor(color)}
                    className={`p-2.5 rounded-lg border text-left flex items-center gap-3 transition-all ${
                      yarnColor.id === color.id
                        ? 'bg-[#e7efe6] border-[#2e4732] ring-2 ring-[#6c8a6b]/30'
                        : 'bg-[#fcf9f0] border-[#c8bfa8] hover:border-[#6c8a6b]'
                    }`}
                  >
                    <span
                      className="w-7 h-7 rounded-full border border-black/10 shrink-0 shadow-xs"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="overflow-hidden">
                      <span className="text-xs font-bold text-[#18301d] block truncate">
                        {color.name}
                      </span>
                      <span className="text-[10px] text-[#737971] block truncate">
                        {color.plant}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Topper & Dangle Accent */}
            <div className="bg-[#FAF8F3] border border-[#EFE8D6] rounded-xl p-5 shadow-cottage-sm space-y-4">
              <h3 className="font-serif-heading font-bold text-base text-[#18301d] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#2e4732] text-white text-xs flex items-center justify-center font-sans">
                  4
                </span>
                Topper &amp; Dangling Accents
              </h3>

              {/* Topper */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#18301d]">Headgear / Topper:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'mushroom', label: 'Toadstool Cap', price: 40 },
                    { id: 'leaf', label: 'Sprout Leaf', price: 25 },
                    { id: 'flower', label: 'Daisy Crown', price: 30 },
                    { id: 'none', label: 'No Hat', price: 0 }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTopper(item.id as any)}
                      className={`p-2 rounded-lg border text-left text-xs ${
                        topper === item.id
                          ? 'bg-[#e7efe6] border-[#2e4732] font-bold'
                          : 'bg-[#fcf9f0] border-[#c8bfa8]'
                      }`}
                    >
                      <span className="block truncate">{item.label}</span>
                      <span className="text-[10px] text-[#737971]">
                        {item.price > 0 ? `+₹${item.price}` : 'Free'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dangling Accent */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#18301d]">Keyring Dangle Accent:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'bell', label: 'Golden Bell', price: 25 },
                    { id: 'wood-bead', label: 'Pine Bead', price: 20 },
                    { id: 'initial-tag', label: 'Initial Charm', price: 35 },
                    { id: 'none', label: 'None', price: 0 }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setAccent(item.id as any)}
                      className={`p-2 rounded-lg border text-left text-xs ${
                        accent === item.id
                          ? 'bg-[#e7efe6] border-[#2e4732] font-bold'
                          : 'bg-[#fcf9f0] border-[#c8bfa8]'
                      }`}
                    >
                      <span className="block truncate">{item.label}</span>
                      <span className="text-[10px] text-[#737971]">
                        {item.price > 0 ? `+₹${item.price}` : 'Free'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {accent === 'initial-tag' && (
                <div className="p-3 bg-[#f6f3ea] rounded-lg border border-[#c8bfa8] flex items-center gap-3">
                  <span className="text-xs font-bold text-[#18301d]">Choose Letter:</span>
                  <input
                    type="text"
                    maxLength={1}
                    value={initialChar}
                    onChange={(e) => setInitialChar(e.target.value.toUpperCase())}
                    className="w-10 h-10 text-center font-bold font-serif text-lg bg-white border border-[#2e4732] rounded-lg text-[#18301d]"
                  />
                  <span className="text-[11px] text-[#737971]">
                    Hand-stamped metal tag attached to keyring loop
                  </span>
                </div>
              )}
            </div>

            {/* Step 5: Name & Adoption Details */}
            <div className="bg-[#FAF8F3] border border-[#EFE8D6] rounded-xl p-5 shadow-cottage-sm space-y-4">
              <h3 className="font-serif-heading font-bold text-base text-[#18301d] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#2e4732] text-white text-xs flex items-center justify-center font-sans">
                  5
                </span>
                Adoption Card &amp; Gifting Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#18301d] block mb-1">
                    Keychain's Given Name:
                  </label>
                  <input
                    id="input-keychain-name"
                    type="text"
                    value={keychainName}
                    onChange={(e) => setKeychainName(e.target.value)}
                    placeholder="e.g. Sir Clover, Little Moss"
                    className="w-full text-xs p-2.5 rounded-lg border border-[#c8bfa8] bg-[#fcf9f0] focus:ring-2 focus:ring-[#6c8a6b] outline-none text-[#18301d]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#18301d] block mb-1">
                    Owner's Name (for Certificate):
                  </label>
                  <input
                    id="input-owner-name"
                    type="text"
                    value={adopterName}
                    onChange={(e) => setAdopterName(e.target.value)}
                    placeholder="e.g. Ishani, Priya, Aditi"
                    className="w-full text-xs p-2.5 rounded-lg border border-[#c8bfa8] bg-[#fcf9f0] focus:ring-2 focus:ring-[#6c8a6b] outline-none text-[#18301d]"
                  />
                </div>
              </div>
            </div>

            {/* Total Summary & Commission Button in Rupees */}
            <div className="bg-[#2e4732] text-[#fcf9f0] p-6 rounded-2xl shadow-cottage-lg space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#98b59a] uppercase tracking-wider block font-semibold">
                    Bespoke Keychain Total
                  </span>
                  <span className="font-serif-heading text-3xl font-bold text-white">
                    ₹{totalPrice}
                  </span>
                </div>
                <div className="text-right text-xs text-[#98b59a]">
                  <span>GST Included</span>
                  <span className="block text-white font-medium">Free delivery over ₹499</span>
                </div>
              </div>

              {successNotice && (
                <div className="p-3 rounded-lg bg-[#6c8a6b] text-white text-xs font-semibold flex items-center gap-2 animate-bounce">
                  <Check className="w-4 h-4" />
                  <span>Your custom {keychainName} keychain was added to your basket!</span>
                </div>
              )}

              <button
                id="btn-adopt-custom-keychain"
                type="button"
                onClick={handleAdopt}
                disabled={isCommissioning}
                className="w-full py-4 rounded-xl bg-[#d87a56] hover:bg-[#c36440] text-white font-bold text-sm transition-all shadow-cottage-md flex items-center justify-center gap-2 active:scale-98"
              >
                {isCommissioning ? (
                  <span>Threading Clasp onto Hook...</span>
                ) : (
                  <>
                    <Key className="w-4 h-4 text-[#f4b9a0]" />
                    <span>Adopt {keychainName || 'This Keychain'} • Add to Basket</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-[#98b59a] pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#f4b9a0]" />
                  Includes Official Adoption Tag
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-[#f4b9a0]" />
                  Slow-looped by Ishani
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
