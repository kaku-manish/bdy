import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MailOpen, Heart, Sparkles, X, ArrowRight, Feather } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function HeartNotes({ onNext }) {
  const [activeNote, setActiveNote] = useState(null);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Typewriter animation effect when an envelope opens
  useEffect(() => {
    if (!activeNote) {
      setDisplayedText('');
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    setDisplayedText('');
    const fullText = activeNote.content;
    let charIndex = 0;

    const timer = setInterval(() => {
      if (charIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 22);

    return () => clearInterval(timer);
  }, [activeNote]);

  return (
    <section className="relative min-h-screen py-16 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col items-center select-none">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-semibold mb-3"
        >
          <Feather className="w-4 h-4 text-rose-400" />
          <span>Written From The Deepest Corner Of My Heart</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold font-serif gradient-text-pink"
        >
          A Few Words From My Heart 💌
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-300 text-sm sm:text-base mt-3 font-sans leading-relaxed"
        >
          {birthdayData.recipient.name}, tap on any of the envelopes below to read what I've written for you.
        </motion.p>
      </div>

      {/* Envelopes Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
        {birthdayData.heartNotes.map((note, index) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveNote(note)}
            className="group relative cursor-pointer glass-panel-glow rounded-3xl p-6 border border-pink-500/30 hover:border-pink-400/60 shadow-lg hover:shadow-[0_0_35px_rgba(244,63,94,0.35)] transition-all flex flex-col justify-between"
          >
            {/* Top decorative seal */}
            <div className="flex items-center justify-between mb-4">
              <span className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500/30 to-purple-500/20 flex items-center justify-center text-pink-400 border border-pink-400/30 shadow-inner group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5 group-hover:hidden" />
                <MailOpen className="w-5 h-5 hidden group-hover:block text-amber-300" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-pink-300/80 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                Note {index + 1}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold font-serif text-white group-hover:text-pink-300 transition-colors">
                {note.title}
              </h3>
              <p className="text-sm text-slate-300/90 mt-2 font-sans line-clamp-2">
                {note.teaser}
              </p>
            </div>

            {/* Bottom prompt */}
            <div className="mt-6 pt-3 flex items-center justify-between text-xs border-t border-white/10 text-pink-300">
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-400" />
                Tap to open envelope
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Envelope Modal (Reading Mode) */}
      <AnimatePresence>
        {activeNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveNote(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
          >
            {/* Main Letter */}
            <motion.div
              initial={{ scale: 0.85, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl bg-gradient-to-b from-[#1C162E] via-[#161226] to-[#0E0B1A] rounded-3xl p-6 sm:p-8 border border-pink-400/40 shadow-[0_0_60px_rgba(236,72,153,0.35)] overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveNote(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Envelope Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="p-3 rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  <MailOpen className="w-6 h-6" />
                </span>
                <div>
                  <span className="text-xs font-semibold text-pink-300 tracking-wider uppercase">
                    From My Heart To {birthdayData.recipient.name}
                  </span>
                  <h3 className="text-2xl font-bold font-serif gradient-text-pink">
                    {activeNote.title}
                  </h3>
                </div>
              </div>

              {/* Letter Parchment Box */}
              <div className="relative p-5 sm:p-6 rounded-2xl bg-white/[0.04] border border-white/10 shadow-inner min-h-[160px]">
                {/* Floating mini heart */}
                <Heart className="absolute -top-3 -right-2 w-6 h-6 fill-rose-500 text-pink-300 animate-bounce" />

                {/* Typewriter text */}
                <p className="font-handwriting text-xl sm:text-2xl text-pink-100 leading-relaxed font-normal tracking-wide">
                  {displayedText}
                  {isTyping && (
                    <span className="inline-block w-1.5 h-5 bg-pink-400 ml-1 animate-pulse" />
                  )}
                </p>

                {/* Signature */}
                {!isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 text-right font-serif text-amber-300 font-semibold text-sm sm:text-base italic"
                  >
                    {activeNote.signature}
                  </motion.div>
                )}
              </div>

              {/* Modal footer */}
              <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Kept safe in memories forever</span>
                </span>
                <button
                  onClick={() => setActiveNote(null)}
                  className="px-4 py-2 rounded-full bg-pink-500/20 hover:bg-pink-500/40 text-pink-300 font-medium transition-colors cursor-pointer"
                >
                  Close Note
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue Button */}
      {onNext && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-14"
        >
          <button
            onClick={onNext}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 shadow-[0_4px_25px_rgba(236,72,153,0.4)] hover:shadow-[0_4px_35px_rgba(236,72,153,0.6)] transition-all cursor-pointer"
          >
            <span>Explore {birthdayData.recipient.name}'s Story & Timeline</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      )}
    </section>
  );
}
