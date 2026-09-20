import React, { useState } from 'react';
import { X, Printer, CheckCircle, Sparkles, Key } from 'lucide-react';
import { CartItem } from '../types';

interface AdoptionCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export const AdoptionCertificateModal: React.FC<AdoptionCertificateModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess
}) => {
  if (!isOpen) return null;

  const [adopterName, setAdopterName] = useState('Gentle Maker');
  const [shippingAddress, setShippingAddress] = useState({
    name: 'Priya Sharma',
    street: 'Flat 304, Green Glen Meadows',
    city: 'Bengaluru',
    postal: '560103'
  });
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Find first keychain or fallback
  const firstKeychain = items[0];
  const keychainName =
    firstKeychain?.customDetails?.adoptedName ||
    firstKeychain?.name ||
    'Sir Ribbit Toadstool Keychain';

  const serialNumber = `IN-MSY-${Math.floor(100000 + Math.random() * 900000)}`;
  const currentDate = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleConfirm = () => {
    setOrderConfirmed(true);
    setTimeout(() => {
      onOrderSuccess();
    }, 2400);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1c1c17]/65 backdrop-blur-xs overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#FCF9F0] border border-[#c8bfa8] rounded-2xl shadow-cottage-lg overflow-hidden z-10 my-6">
        {/* Close Button */}
        <button
          id="btn-close-certificate-modal"
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#fcf9f0] border border-[#c8bfa8] text-[#434842] hover:text-[#18301d] flex items-center justify-center shadow-xs"
        >
          <X className="w-4 h-4" />
        </button>

        {orderConfirmed ? (
          <div className="p-8 sm:p-12 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#e7efe6] text-[#2e4732] flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle className="w-9 h-9 text-[#2e4732]" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif-heading text-3xl font-bold text-[#18301d]">
                Keychain Adoption Confirmed!
              </h3>
              <p className="text-sm text-[#434842] max-w-md mx-auto">
                Ishani has received your order! Your handcrafted crochet keychain is being nestled into unbleached tissue paper sprinkled with lavender, and your official adoption card is being hand-stamped.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF8F3] border border-dashed border-[#6c8a6b] max-w-sm mx-auto text-xs text-[#2e4732]">
              <span className="font-bold block">Adoption Register: {serialNumber}</span>
              <span className="text-[#737971]">A India Post / Courier tracking link will be sent to your inbox.</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg bg-[#2e4732] text-white font-semibold text-xs"
            >
              Back to Studio
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="text-center space-y-1">
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#6c8a6b] flex items-center justify-center gap-1.5">
                <Key className="w-3 h-3 text-[#d87a56]" />
                Artisan Keepsake Tag Preview
              </span>
              <h3 className="font-serif-heading text-2xl font-bold text-[#18301d]">
                Official Keychain Certificate of Adoption
              </h3>
              <p className="text-xs text-[#737971]">
                This embossed registration card accompanies your keychain in the parcel.
              </p>
            </div>

            {/* Certificate Parchment Box */}
            <div className="p-6 sm:p-8 bg-[#FAF8F3] border-2 border-dashed border-[#c8bfa8] rounded-2xl relative shadow-cottage-sm space-y-6 text-center">
              {/* Corner Emblems */}
              <div className="absolute top-3 left-3 text-[#6c8a6b] text-sm">❦</div>
              <div className="absolute top-3 right-3 text-[#6c8a6b] text-sm">❦</div>
              <div className="absolute bottom-3 left-3 text-[#6c8a6b] text-sm">❦</div>
              <div className="absolute bottom-3 right-3 text-[#6c8a6b] text-sm">❦</div>

              <div className="space-y-1">
                <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#737971] block">
                  MOSSY BY ISHANI • OFFICIAL KEYCHAIN REGISTER
                </span>
                <h4 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#18301d]">
                  Certificate of Adoption
                </h4>
              </div>

              <div className="max-w-md mx-auto space-y-3 text-xs sm:text-sm text-[#434842] leading-relaxed">
                <p>
                  This certifies that the handcrafted crochet pocket companion &amp; keychain
                </p>
                <div className="py-1 px-4 inline-block bg-[#f6f3ea] border-b-2 border-[#2e4732] font-serif-heading font-bold text-xl sm:text-2xl text-[#18301d]">
                  {keychainName}
                </div>
                <p>
                  has been lovingly adopted into the pocket and daily travels of
                </p>
                <div className="py-0.5 px-4 inline-block bg-[#f6f3ea] border-b border-[#6c8a6b] font-medium text-sm text-[#2e4732]">
                  {adopterName || 'A Kindred Soul'}
                </div>
                <p className="text-xs text-[#737971] italic pt-1">
                  Hand-looped from 100% natural cotton with reinforced antique brass hardware &amp; a zero-waste scrap heart.
                </p>
              </div>

              {/* Bottom Signatures & Seal */}
              <div className="pt-4 border-t border-[#ebe5d6] flex items-center justify-between text-left text-xs">
                <div>
                  <span className="text-[10px] text-[#737971] block">Register Code:</span>
                  <span className="font-mono font-bold text-[#18301d]">{serialNumber}</span>
                  <span className="text-[10px] text-[#737971] block mt-1">Date Crafted:</span>
                  <span className="font-semibold text-[#18301d]">{currentDate}</span>
                </div>

                {/* Rotating Artisan Seal */}
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                    <path
                      id="modalSealPath"
                      d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                      fill="none"
                    />
                    <text className="text-[9px] font-bold fill-[#2e4732] tracking-[0.2em] uppercase">
                      <textPath href="#modalSealPath" startOffset="0%">
                        • HANDMADE IN INDIA • BY ISHANI •
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute w-8 h-8 rounded-full bg-[#d87a56] text-white flex items-center justify-center font-serif-heading font-bold text-xs shadow-xs">
                    M
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#737971] block">Artisan Signature:</span>
                  <span className="font-serif-heading italic text-lg text-[#18301d] block font-bold">
                    Ishani
                  </span>
                  <span className="text-[10px] text-[#6c8a6b] block">Handmade in India</span>
                </div>
              </div>
            </div>

            {/* Adopter Name Customization Input */}
            <div className="p-4 rounded-xl bg-[#f6f3ea] border border-[#ebe5d6] space-y-3">
              <label className="text-xs font-bold text-[#18301d] block">
                Customize Name on Adoption Tag:
              </label>
              <input
                id="input-certificate-adopter-name"
                type="text"
                value={adopterName}
                onChange={(e) => setAdopterName(e.target.value)}
                placeholder="Enter recipient name"
                className="w-full text-xs p-2.5 rounded-lg border border-[#c8bfa8] bg-[#fcf9f0] text-[#18301d] focus:ring-2 focus:ring-[#6c8a6b] outline-none"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handlePrint}
                className="px-5 py-3 rounded-xl border border-[#c8bfa8] bg-[#FAF8F3] hover:bg-white text-[#18301d] font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Printer className="w-4 h-4 text-[#737971]" />
                <span>Print Keepsake Tag</span>
              </button>

              <button
                id="btn-confirm-adoption"
                type="button"
                onClick={handleConfirm}
                className="flex-1 py-3.5 rounded-xl bg-[#2e4732] hover:bg-[#18301d] text-white font-bold text-sm transition-all shadow-cottage-sm flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#f4b9a0]" />
                <span>Confirm Adoption &amp; Place Order</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
