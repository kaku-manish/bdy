import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Cake, Camera, Mail, Clock, Heart, Gift, ChevronLeft, ChevronRight } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export const STAGES = [
  { id: 'welcome', label: 'Welcome', icon: Sparkles },
  { id: 'cake', label: 'Make A Wish', icon: Cake },
  { id: 'memories', label: 'Memories', icon: Camera },
  { id: 'notes', label: 'From Heart', icon: Mail },
  { id: 'timeline', label: 'Timeline', icon: Clock },
  { id: 'wishes', label: 'Wishes', icon: Heart },
  { id: 'gift', label: 'Surprise', icon: Gift },
];

export default function JourneyNav({ currentStageIndex, onSelectStage }) {
  const currentStage = STAGES[currentStageIndex];

  return (
    <header className="fixed top-3 inset-x-0 z-40 flex items-center justify-center px-3 pointer-events-none select-none">
      <div className="glass-panel-glow px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-pink-500/30 shadow-[0_0_25px_rgba(236,72,153,0.3)] backdrop-blur-xl flex items-center gap-2 sm:gap-4 pointer-events-auto">
        {/* Prev Stage Button */}
        <button
          onClick={() => onSelectStage(Math.max(0, currentStageIndex - 1))}
          disabled={currentStageIndex === 0}
          className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
          title="Previous section"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Current Stage Indicator */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-pink-300 font-serif hidden sm:inline">
            {birthdayData.recipient.name}'s Journey:
          </span>

          {/* Navigation Stage Dots / Pills */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = idx === currentStageIndex;
              const isPassed = idx < currentStageIndex;

              return (
                <button
                  key={stage.id}
                  onClick={() => onSelectStage(idx)}
                  title={`${stage.label} (Step ${idx + 1} of ${STAGES.length})`}
                  className={`group relative flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-pink-500 text-white shadow-[0_0_12px_rgba(236,72,153,0.6)]'
                      : isPassed
                      ? 'text-pink-300/80 hover:bg-white/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {isActive && (
                    <span className="hidden md:inline font-sans text-[11px]">
                      {stage.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Next Stage Button */}
        <button
          onClick={() => onSelectStage(Math.min(STAGES.length - 1, currentStageIndex + 1))}
          disabled={currentStageIndex === STAGES.length - 1}
          className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
          title="Next section"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
