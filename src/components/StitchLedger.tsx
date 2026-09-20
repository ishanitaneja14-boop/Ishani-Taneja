import React, { useState } from 'react';
import { STORIES } from '../data/stories';
import { Sparkles, Calendar, Clock, Feather } from 'lucide-react';
import { Story } from '../types';

export const StitchLedger: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  return (
    <div className="py-8 sm:py-12 bg-[#FCF9F0] bg-woven-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fbe8e0] text-[#712b0d] text-xs font-bold border border-[#ffb59a]">
            <Feather className="w-3.5 h-3.5 text-[#d87a56]" />
            <span>Studio Journal &amp; Botanical Essays</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#18301d]">
            The Stitch Ledger
          </h2>
          <p className="text-sm sm:text-base text-[#434842]">
            Notes on slow living, natural dyeing with foraged tannins, and the quiet philosophy
            of looping wool into companionable forms.
          </p>
        </div>

        {/* Meet Ishani Hero Feature Card */}
        <div className="bg-[#FAF8F3] border border-[#EFE8D6] rounded-2xl p-6 sm:p-10 shadow-cottage-md mb-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 relative">
              <div className="aspect-4/3 rounded-xl overflow-hidden shadow-cottage-sm border border-[#c8bfa8]">
                <img
                  src="https://images.unsplash.com/photo-1598462047020-d7a0e988020a?auto=format&fit=crop&w=800&q=80"
                  alt="Ishani crafting in studio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-[#2e4732] text-white text-xs font-serif-heading px-4 py-1.5 rounded-full shadow-sm border border-[#c8e8c4]">
                Ishani • Hand-crafter
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#6c8a6b] block">
                The Artisan's Promise
              </span>
              <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#18301d]">
                "Every stitch is a moment of attention given to the world."
              </h3>
              <p className="text-sm text-[#434842] leading-relaxed">
                I started <strong>Mossy By Ishani</strong> in a timber cottage overlooking the foggy pine line. In an age of synthetic, hyper-speed fashion, I wanted to create things that age gracefully like leather and cedar.
              </p>
              <p className="text-sm text-[#434842] leading-relaxed">
                When you adopt one of our frogs or wrap yourself in a hexagonal cardigan, you hold days of quiet human focus. Thank you for making space on your desk and in your heart for slow handmade work.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-[#f6f3ea] border border-[#ebe5d6] text-center">
                  <span className="font-serif-heading font-bold text-xl text-[#18301d] block">
                    100%
                  </span>
                  <span className="text-[10px] text-[#737971]">Mulesing-Free Fleece</span>
                </div>
                <div className="p-3 rounded-lg bg-[#f6f3ea] border border-[#ebe5d6] text-center">
                  <span className="font-serif-heading font-bold text-xl text-[#2e4732] block">
                    Zero
                  </span>
                  <span className="text-[10px] text-[#737971]">Discarded Fiber Waste</span>
                </div>
                <div className="p-3 rounded-lg bg-[#f6f3ea] border border-[#ebe5d6] text-center">
                  <span className="font-serif-heading font-bold text-xl text-[#d87a56] block">
                    1 to 1
                  </span>
                  <span className="text-[10px] text-[#737971]">Handmade by Ishani</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Story Journal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STORIES.map((story) => (
            <article
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className="group bg-[#FAF8F3] border border-[#EFE8D6] rounded-xl overflow-hidden shadow-cottage-sm hover:-translate-y-1 hover:shadow-cottage-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 overflow-hidden bg-[#e5e2da]">
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5 flex gap-1">
                    {story.tags.slice(0, 2).map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-bold bg-[#fcf9f0]/90 backdrop-blur-xs text-[#2e4732] px-2 py-0.5 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-3 text-[11px] text-[#737971]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#6c8a6b]" />
                      {story.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#6c8a6b]" />
                      {story.readTime}
                    </span>
                  </div>

                  <h4 className="font-serif-heading text-lg font-bold text-[#18301d] leading-snug group-hover:text-[#2e4732] transition-colors">
                    {story.title}
                  </h4>

                  <p className="text-xs text-[#434842] line-clamp-3 leading-relaxed">
                    {story.snippet}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <span className="text-xs font-bold text-[#2e4732] group-hover:text-[#18301d] inline-flex items-center gap-1">
                  Read studio entry <span>→</span>
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Story Modal Detail */}
        {selectedStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1c1c17]/60 backdrop-blur-xs overflow-y-auto">
            <div className="bg-[#FCF9F0] border border-[#c8bfa8] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-cottage-lg space-y-5 my-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#ebe5d6] pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#2e4732] bg-[#e7efe6] px-2.5 py-0.5 rounded-full">
                    {selectedStory.date}
                  </span>
                  <span className="text-xs text-[#737971]">{selectedStory.readTime}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedStory(null)}
                  className="text-xs font-bold text-[#737971] hover:text-[#18301d] px-2 py-1 rounded-md"
                >
                  Close ✕
                </button>
              </div>

              <div className="aspect-16/9 rounded-xl overflow-hidden border border-[#c8bfa8]">
                <img
                  src={selectedStory.coverImage}
                  alt={selectedStory.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#18301d]">
                  {selectedStory.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6c8a6b] font-medium italic">
                  {selectedStory.subtitle}
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#28231d] leading-relaxed pt-2 border-t border-[#ebe5d6]">
                {selectedStory.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-4 border-t border-[#ebe5d6] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#2e4732] text-white flex items-center justify-center font-serif-heading text-xs font-bold">
                    I
                  </div>
                  <span className="text-xs font-semibold text-[#18301d]">Written by Ishani</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedStory(null)}
                  className="px-4 py-2 rounded-lg bg-[#2e4732] text-white text-xs font-semibold"
                >
                  Return to Journal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
