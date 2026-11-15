import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, PartyPopper, ArrowRight, Eye, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayData } from '../data/birthdayData';

export default function BirthdayWishes({ onNext }) {
  const { recipient } = birthdayData;
  const [isZoomed, setIsZoomed] = useState(false);

  // Celebratory confetti on section mount
  useEffect(() => {
    const end = Date.now() + 1.2 * 1000;
    const colors = ['#FF2E93', '#F43F5E', '#FBBF24', '#A855F7', '#FFFFFF'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const triggerConfettiBlast = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#FF2E93', '#F43F5E', '#FBBF24', '#FFFFFF', '#FF8A00'],
    });
  };

  return (
    <section className="relative min-h-screen py-12 sm:py-16 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col items-center justify-center select-none">
      {/* Background Ambient Red/Rose Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] bg-gradient-to-tr from-rose-700/35 via-pink-600/25 to-amber-500/15 rounded-full blur-[140px] animate-pulse-slow" />
      </div>

      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs sm:text-sm font-semibold mb-3 shadow-[0_0_15px_rgba(244,63,94,0.3)]"
        >
          <PartyPopper className="w-4 h-4 text-amber-300" />
          <span>A Special Birthday Wish For {recipient.name}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold font-serif gradient-text-pink leading-tight"
        >
          Happy Birthday, {recipient.name}! 🎂
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-amber-300 font-medium text-xs sm:text-sm mt-2"
        >
          To the girl who turns simple moments into golden memories ✨
        </motion.p>
      </div>

      {/* Main Feature: The Complete Beautiful Birthday Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-2xl w-full flex flex-col items-center"
      >
        <div
          onClick={() => setIsZoomed(true)}
          className="group relative cursor-pointer rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-rose-600/50 via-pink-700/30 to-purple-900/40 border-2 border-rose-400/60 shadow-[0_0_50px_rgba(244,63,94,0.45)] hover:shadow-[0_0_75px_rgba(244,63,94,0.75)] transition-all duration-300 overflow-hidden w-full"
        >
          {/* Shimmer light pass */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-10" />

          {/* Card Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[2/3] bg-slate-950 flex items-center justify-center">
            <img
              src="/images/birthday-card.jpg"
              alt="Happy Birthday Lalli"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs sm:text-sm font-semibold backdrop-blur-[2px]">
              <Eye className="w-5 h-5" />
              <span>Tap to view full screen</span>
            </div>
          </div>

          {/* Bottom Card Footer Bar */}
          <div className="py-2.5 px-3 sm:px-4 flex items-center justify-between text-xs sm:text-sm text-rose-200">
            <span className="flex items-center gap-1.5 font-serif font-bold text-amber-300">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-400 animate-pulse" />
              Stay Happy Always, {recipient.name}
            </span>
            <span className="text-xs text-pink-300 italic">Click to zoom</span>
          </div>
        </div>

        {/* Action Buttons Below the Card */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={triggerConfettiBlast}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-500/25 hover:bg-rose-500/40 border border-rose-400/50 text-rose-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:shadow-[0_0_30px_rgba(244,63,94,0.5)]"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Celebrate {recipient.name} With Confetti 🎉</span>
          </button>
        </div>
      </motion.div>

      {/* Lightbox / Zoom Modal for the Card */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-xl cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.88 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.88 }}
              className="relative max-w-xl w-full rounded-3xl overflow-hidden border-2 border-rose-500/60 shadow-[0_0_70px_rgba(244,63,94,0.7)]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="/images/birthday-card.jpg"
                alt="Birthday Card Full"
                className="w-full h-auto object-contain max-h-[90vh] rounded-3xl mx-auto"
              />
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-black/80 hover:bg-black text-white text-xs font-semibold backdrop-blur-md border border-white/20 cursor-pointer"
              >
                Close ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue to Final Surprise Gift */}
      {onNext && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10"
        >
          <button
            onClick={onNext}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 shadow-[0_4px_25px_rgba(244,63,94,0.4)] hover:shadow-[0_4px_35px_rgba(244,63,94,0.6)] transition-all cursor-pointer"
          >
            <span>Open {recipient.name}'s Surprise Gift 🎁</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      )}
    </section>
  );
}
