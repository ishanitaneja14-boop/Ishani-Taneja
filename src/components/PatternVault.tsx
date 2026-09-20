import React, { useState } from 'react';
import { CROCHET_PATTERNS } from '../data/patterns';
import { CrochetPattern } from '../types';
import { Check, RotateCcw, Sparkles, BookOpen, Clock, Key } from 'lucide-react';

export const PatternVault: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState<CrochetPattern>(CROCHET_PATTERNS[0]);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [stitchCounter, setStitchCounter] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<'instructions' | 'glossary'>('instructions');

  const toggleStep = (roundNumber: number) => {
    if (completedSteps.includes(roundNumber)) {
      setCompletedSteps(completedSteps.filter((s) => s !== roundNumber));
    } else {
      setCompletedSteps([...completedSteps, roundNumber]);
    }
  };

  const resetProgress = () => {
    setCompletedSteps([]);
    setStitchCounter(0);
  };

  const progressPercentage = Math.round(
    (completedSteps.length / selectedPattern.steps.length) * 100
  );

  return (
    <div className="py-10 bg-[#FCF9F0] bg-woven-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e7efe6] text-[#2e4732] text-xs font-bold border border-[#bacbba]">
            <Key className="w-3.5 h-3.5 text-[#6c8a6b]" />
            <span>Maker's Workshop &amp; Keychain Guides</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#18301d]">
            The Keychain Pattern Vault
          </h2>
          <p className="text-sm sm:text-base text-[#434842]">
            Learn how Ishani hand-loops miniature amigurumi charms and secures metal key rings with reinforced stitches.
            Track your round-by-round progress with our interactive stitch counter.
          </p>
        </div>

        {/* Pattern Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {CROCHET_PATTERNS.map((pattern) => {
            const isSelected = selectedPattern.id === pattern.id;
            return (
              <div
                key={pattern.id}
                onClick={() => {
                  setSelectedPattern(pattern);
                  setCompletedSteps([]);
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex gap-4 items-center ${
                  isSelected
                    ? 'bg-[#f6f3ea] border-[#2e4732] ring-2 ring-[#6c8a6b]/30 shadow-cottage-sm'
                    : 'bg-[#FAF8F3] border-[#c8bfa8] hover:border-[#6c8a6b]'
                }`}
              >
                <img
                  src={pattern.image}
                  alt={pattern.title}
                  className="w-20 h-20 rounded-xl object-cover border border-[#c8bfa8] shrink-0"
                />
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#c8e8c4] text-[#18301d]">
                      {pattern.difficulty}
                    </span>
                    <span className="text-xs text-[#737971] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {pattern.estimatedTime}
                    </span>
                  </div>
                  <h3 className="font-serif-heading font-bold text-base text-[#18301d] truncate">
                    {pattern.title}
                  </h3>
                  <p className="text-xs text-[#434842] line-clamp-1">{pattern.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Pattern Workspace */}
        <div className="bg-[#FAF8F3] border border-[#EFE8D6] rounded-2xl p-6 sm:p-8 shadow-cottage-md max-w-5xl mx-auto space-y-8">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#ebe5d6]">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#6c8a6b]">
                Active Project • {selectedPattern.difficulty}
              </span>
              <h3 className="font-serif-heading text-2xl font-bold text-[#18301d]">
                {selectedPattern.title}
              </h3>
              <p className="text-xs text-[#434842] mt-1">{selectedPattern.description}</p>
            </div>

            {/* Pattern Tab Toggle */}
            <div className="flex rounded-lg bg-[#f1eee5] p-1 border border-[#c8bfa8] shrink-0">
              <button
                type="button"
                onClick={() => setSelectedTab('instructions')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  selectedTab === 'instructions'
                    ? 'bg-[#2e4732] text-white shadow-xs'
                    : 'text-[#434842] hover:text-[#18301d]'
                }`}
              >
                Rounds &amp; Hardware Mount
              </button>
              <button
                type="button"
                onClick={() => setSelectedTab('glossary')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  selectedTab === 'glossary'
                    ? 'bg-[#2e4732] text-white shadow-xs'
                    : 'text-[#434842] hover:text-[#18301d]'
                }`}
              >
                Stitch Glossary
              </button>
            </div>
          </div>

          {/* Quick Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-[#f6f3ea] p-4 rounded-xl border border-[#ebe5d6]">
            <div>
              <span className="text-[#737971] block">Hook Needed:</span>
              <span className="font-bold text-[#18301d]">{selectedPattern.hookRecommended}</span>
            </div>
            <div>
              <span className="text-[#737971] block">Yarn Type:</span>
              <span className="font-bold text-[#18301d]">{selectedPattern.yarnRecommended}</span>
            </div>
            <div>
              <span className="text-[#737971] block">Metal Key Hardware:</span>
              <span className="font-bold text-[#2e4732] flex items-center gap-1">
                <Key className="w-3 h-3 text-[#d87a56]" />
                {selectedPattern.hardwareNeeded}
              </span>
            </div>
            <div>
              <span className="text-[#737971] block">Completion:</span>
              <span className="font-bold text-[#18301d]">
                {completedSteps.length} of {selectedPattern.steps.length} Rounds ({progressPercentage}%)
              </span>
            </div>
          </div>

          {/* Live Digital Stitch Counter */}
          <div className="p-4 bg-[#2e4732] text-[#fcf9f0] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-cottage-sm">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-[#f4b9a0] text-[#18301d] flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5 text-[#712b0d]" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-[#98b59a] block">
                  Studio Digital Stitch Tally Counter
                </span>
                <span className="text-sm text-white">Tap to count stitches for current round</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStitchCounter(Math.max(0, stitchCounter - 1))}
                className="w-9 h-9 rounded-full bg-[#496549] text-white hover:bg-[#6c8a6b] font-bold text-lg flex items-center justify-center transition-colors"
                title="Decrease count"
              >
                -
              </button>

              <div className="px-5 py-2 rounded-lg bg-[#18301d] font-mono text-2xl font-bold text-white border border-[#496549] min-w-16 text-center">
                {stitchCounter}
              </div>

              <button
                type="button"
                onClick={() => setStitchCounter(stitchCounter + 1)}
                className="w-9 h-9 rounded-full bg-[#d87a56] text-white hover:bg-[#c36440] font-bold text-lg flex items-center justify-center transition-colors shadow-xs"
                title="Increase count"
              >
                +
              </button>

              <button
                type="button"
                onClick={() => setStitchCounter(0)}
                className="text-xs text-[#98b59a] hover:text-white ml-2 underline"
                title="Reset counter"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Tab 1: Rounds Checklist with Checkmarks */}
          {selectedTab === 'instructions' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-serif-heading text-lg font-bold text-[#18301d]">
                  Round-by-Round Keychain Instructions
                </h4>
                <button
                  type="button"
                  onClick={resetProgress}
                  className="text-xs text-[#737971] hover:text-[#ba1a1a] flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset checklist</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {selectedPattern.steps.map((step) => {
                  const isDone = completedSteps.includes(step.round);
                  return (
                    <div
                      key={step.round}
                      onClick={() => toggleStep(step.round)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        isDone
                          ? 'bg-[#e7efe6] border-[#6c8a6b] opacity-80'
                          : 'bg-[#fcf9f0] border-[#c8bfa8] hover:border-[#6c8a6b]'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                          isDone
                            ? 'bg-[#2e4732] text-white'
                            : 'border-2 border-[#c8bfa8] bg-white'
                        }`}
                      >
                        {isDone && <Check className="w-4 h-4" />}
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-bold text-xs ${
                              isDone ? 'line-through text-[#737971]' : 'text-[#18301d]'
                            }`}
                          >
                            Round {step.round}
                          </span>
                          <span className="text-[11px] font-mono text-[#6c8a6b] font-semibold">
                            [{step.stitchCount} sts]
                          </span>
                        </div>

                        <p
                          className={`text-xs leading-relaxed ${
                            isDone ? 'line-through text-[#737971]' : 'text-[#434842]'
                          }`}
                        >
                          {step.instruction}
                        </p>

                        {step.tip && (
                          <p className="text-[11px] italic text-[#d87a56] flex items-center gap-1 pt-0.5">
                            <Sparkles className="w-3 h-3 shrink-0" />
                            <span>Tip: {step.tip}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 2: Stitch Glossary */}
          {selectedTab === 'glossary' && (
            <div className="space-y-4">
              <h4 className="font-serif-heading text-lg font-bold text-[#18301d]">
                US Crochet Terminology &amp; Abbreviations
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedPattern.glossary.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#fcf9f0] border border-[#c8bfa8] rounded-xl flex items-start gap-2.5"
                  >
                    <span className="font-mono font-bold text-sm text-[#2e4732] bg-[#e7efe6] px-2 py-0.5 rounded-md shrink-0">
                      {item.term}
                    </span>
                    <span className="text-xs text-[#434842] leading-tight pt-0.5">
                      {item.explanation}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
