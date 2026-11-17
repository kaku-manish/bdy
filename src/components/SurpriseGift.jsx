import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gift,
  Heart,
  Sparkles,
  PartyPopper,
  RotateCcw,
  Crown,
  Plane,
  Maximize2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayData } from '../data/birthdayData';

// Ambient floating particles around the surprise
const GIFT_PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 84 + 8,
  y: Math.random() * 84 + 8,
  size: Math.random() * 12 + 8,
  duration: Math.random() * 4 + 4,
  delay: Math.random() * 2,
}));

export default function SurpriseGift({ onReplay }) {
  const { surpriseGift, recipient } = birthdayData;

  // Box states: 'closed', 'opening', 'opened'
  const [boxState, setBoxState] = useState('closed');

  // Promise accepted state
  const [promiseAccepted, setPromiseAccepted] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Gentle magical chime sound synthesized via Web Audio API
  const playMagicChime = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      if (ctx.state === 'suspended') ctx.resume();

      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98]; // C5, E5, G5, C6, E6, G6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.09);

        gain.gain.setValueAtTime(0.001, ctx.currentTime + i * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + i * 0.09 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.09 + 0.7);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + i * 0.09);
        osc.stop(ctx.currentTime + i * 0.09 + 0.75);
      });
    } catch {
      // Audio not permitted / supported
    }
  };

  // Open the Gift Box with Animations & Confetti
  const handleOpenBox = () => {
    if (boxState !== 'closed') return;
    setBoxState('opening');
    playMagicChime();

    // Multistage celebratory burst
    confetti({
      particleCount: 180,
      spread: 95,
      origin: { y: 0.6 },
      colors: ['#FF2E93', '#FBBF24', '#00F0FF', '#F43F5E', '#FFFFFF'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 90,
        angle: 60,
        spread: 70,
        origin: { x: 0.15, y: 0.65 },
        colors: ['#FF2E93', '#FBBF24', '#FFFFFF'],
      });
      confetti({
        particleCount: 90,
        angle: 120,
        spread: 70,
        origin: { x: 0.85, y: 0.65 },
        colors: ['#FF2E93', '#FBBF24', '#FFFFFF'],
      });
    }, 350);

    // Transition to opened state
    setTimeout(() => {
      setBoxState('opened');
    }, 700);
  };

  const handleAcceptPromise = () => {
    setPromiseAccepted(true);
    playMagicChime();

    confetti({
      particleCount: 240,
      spread: 110,
      origin: { y: 0.6 },
      colors: ['#FF2E93', '#F43F5E', '#FBBF24', '#00F0FF', '#FFFFFF'],
    });
  };

  return (
    <section className="relative min-h-screen py-16 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col items-center justify-center select-none text-center">
      {/* 1. Ambient Background Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[450px] sm:w-[700px] h-[450px] sm:h-[700px] bg-gradient-to-tr from-pink-600/30 via-rose-600/25 to-amber-400/25 rounded-full blur-[140px] animate-pulse-slow" />
        <div className="absolute top-1/4 right-10 w-80 h-80 bg-rose-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-500/15 rounded-full blur-[100px]" />
      </div>

      {/* Floating particles around gift box in initial state */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {GIFT_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            animate={{
              y: [-14, 16, -14],
              x: [-8, 8, -8],
              opacity: [0.2, 0.75, 0.2],
              scale: [0.9, 1.25, 0.9],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            className="text-pink-400/50"
          >
            <Heart style={{ width: p.size, height: p.size }} className="fill-pink-500/40 text-pink-400" />
          </motion.div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* STAGE 1: INITIAL GIFT BOX SCREEN                                          */}
      {/* ========================================================================= */}
      <AnimatePresence mode="wait">
        {boxState !== 'opened' ? (
          <motion.div
            key="gift-box-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.6 }}
            className="relative z-10 max-w-xl w-full flex flex-col items-center"
          >
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-300 text-xs sm:text-sm font-semibold mb-3 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
              <Gift className="w-4 h-4 text-pink-400" />
              <span>{surpriseGift.badge}</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-5xl font-extrabold font-serif gradient-text-pink leading-tight">
              {surpriseGift.title}
            </h2>

            {/* Subtitle */}
            <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-md font-sans leading-relaxed">
              {surpriseGift.subtitle}
            </p>

            {/* 3D Luxury Gift Box Graphic */}
            <div
              onClick={handleOpenBox}
              className="relative my-8 cursor-pointer group flex flex-col items-center"
            >
              {/* Soft Pulsing Ambient Glow */}
              <div className="absolute -inset-8 bg-gradient-to-tr from-pink-500/35 via-rose-500/25 to-amber-400/30 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500" />

              {/* Gift Box Top Lid with Ribbon Bow */}
              <motion.div
                animate={
                  boxState === 'opening'
                    ? { y: -85, rotate: -15, opacity: 0, scale: 1.15 }
                    : { y: [-3, 3, -3] }
                }
                transition={
                  boxState === 'opening'
                    ? { duration: 0.6, ease: 'easeOut' }
                    : { repeat: Infinity, duration: 3, ease: 'easeInOut' }
                }
                className="relative z-20 w-48 sm:w-56 h-16 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 border-2 border-pink-300/60 shadow-[0_8px_30px_rgba(244,63,94,0.4)] flex items-center justify-center"
              >
                {/* Golden Ribbon Bow & Crown */}
                <div className="absolute -top-7 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-300 via-yellow-200 to-amber-500 border border-amber-100 shadow-lg transform -rotate-45" />
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-300 via-yellow-200 to-amber-500 border border-amber-100 shadow-lg transform rotate-45 -ml-4" />
                  <Crown className="absolute w-5 h-5 text-amber-900" />
                </div>
                {/* Vertical Ribbon Band */}
                <div className="w-7 h-full bg-gradient-to-b from-amber-300 via-yellow-200 to-amber-500 border-x border-amber-200/80 shadow-sm" />
              </motion.div>

              {/* Gift Box Main Body */}
              <motion.div
                animate={
                  boxState === 'opening'
                    ? { scale: [1, 1.08, 0.95], y: 10 }
                    : { y: [0, 2, 0] }
                }
                transition={
                  boxState === 'opening'
                    ? { duration: 0.6 }
                    : { repeat: Infinity, duration: 3, ease: 'easeInOut' }
                }
                className="relative z-10 w-44 sm:w-52 h-40 rounded-b-2xl bg-gradient-to-b from-purple-800 via-pink-800 to-rose-900 border-2 border-t-0 border-pink-400/50 shadow-2xl flex items-center justify-center -mt-2 overflow-hidden"
              >
                {/* Golden Ribbons */}
                <div className="w-7 h-full bg-gradient-to-b from-amber-400 via-yellow-300 to-amber-500 border-x border-amber-200/80" />
                <div className="absolute inset-x-0 h-7 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 border-y border-amber-200/80" />

                {/* Shimmer Light Bar */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              </motion.div>
            </div>

            {/* Interactive Open Button */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(244, 63, 94, 0.7)' }}
              whileTap={{ scale: 0.96 }}
              onClick={handleOpenBox}
              className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full text-base sm:text-lg font-bold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 shadow-[0_4px_30px_rgba(236,72,153,0.5)] border border-pink-300/40 cursor-pointer overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Sparkles className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
              <span>{surpriseGift.openButtonText}</span>
              <Sparkles className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
            </motion.button>
          </motion.div>
        ) : (
          /* ========================================================================= */
          /* STAGE 2: OPENED STATE - THE PARIS DREAM SURPRISE REVEAL                  */
          /* ========================================================================= */
          <motion.div
            key="revealed-screen"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-4xl flex flex-col items-center gap-6 sm:gap-8"
          >
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-500/20 via-pink-500/30 to-amber-500/20 border border-pink-400/40 text-pink-200 text-xs sm:text-sm font-semibold shadow-[0_0_20px_rgba(236,72,153,0.35)]">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>A Dream & Lifetime Promise For You</span>
              <Sparkles className="w-4 h-4 text-pink-300" />
            </div>

            {/* Romantic Heading */}
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-serif gradient-text-pink leading-tight">
              Under The Paris Sunset... Just For You, {recipient.name}! 🗼✨
            </h3>

            {/* The Masterpiece Paris Sunset Promise Card */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_60px_rgba(244,63,94,0.35)] border-2 border-amber-300/40 group bg-black/40"
            >
              {/* Paris Eiffel Tower Image */}
              <img
                src="/images/paris-surprise.jpg"
                alt="Paris Eiffel Tower Promise - Celebrating Lalli's 25th Birthday"
                className="w-full h-full object-cover select-none"
              />

              {/* Shimmer Light Gleam */}
              <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />

              {/* View Fullscreen / Zoom Trigger */}
              <button
                onClick={() => setIsZoomed(true)}
                title="View full image"
                className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer opacity-80 group-hover:opacity-100"
              >
                <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200" />
              </button>
            </motion.div>

            {/* The Heartfelt Promise Text Card */}
            <div className="w-full max-w-2xl glass-panel-glow p-6 sm:p-8 rounded-3xl border border-pink-400/40 shadow-[0_0_40px_rgba(236,72,153,0.3)] text-center">
              <div className="flex items-center justify-center gap-2 text-rose-400 mb-2">
                <Plane className="w-5 h-5 animate-bounce" />
                <span className="text-xs uppercase tracking-widest font-bold text-amber-200">
                  Our Special Destination
                </span>
                <Plane className="w-5 h-5 animate-bounce" />
              </div>

              <h4 className="text-xl sm:text-2xl font-serif font-bold text-white">
                "I love u Lalli, within 3 years we are going there to celebrate your 25th bdy" ❤️
              </h4>

              <p className="mt-3 text-sm sm:text-base text-purple-200/90 font-sans leading-relaxed">
                No gift in the whole world wrapped in a box can ever match the journey and memories
                we are going to build together. Paris is waiting for us, my love! 🗼🌅
              </p>

              {/* Interactive Acceptance / Celebration Button */}
              {!promiseAccepted ? (
                <div className="mt-6 flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(244, 63, 94, 0.8)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAcceptPromise}
                    className="inline-flex items-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-bold text-white bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 shadow-[0_4px_30px_rgba(244,63,94,0.6)] border border-pink-300/50 cursor-pointer"
                  >
                    <Heart className="w-5 h-5 fill-white" />
                    <span>YES! Can't Wait For Paris With You! 🥹🗼❤️</span>
                    <Sparkles className="w-5 h-5 text-amber-300" />
                  </motion.button>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-rose-500/25 via-pink-500/30 to-amber-500/25 border border-pink-400/50 text-center shadow-lg"
                >
                  <PartyPopper className="w-8 h-8 text-amber-300 mx-auto mb-2 animate-bounce" />
                  <h5 className="text-lg sm:text-xl font-bold font-serif text-white">
                    It's an unbreakable promise, Lalli! 🥹✈️💍
                  </h5>
                  <p className="text-xs sm:text-sm text-pink-200 mt-1.5 font-medium">
                    Paris for your 25th birthday is officially booked in our hearts forever!
                  </p>
                </motion.div>
              )}
            </div>

            {/* Replay Full Birthday Experience Button */}
            <div className="mt-4 flex flex-col items-center gap-2 pt-4 border-t border-white/10 w-full">
              <button
                onClick={onReplay}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 transition-all cursor-pointer border border-white/10"
              >
                <RotateCcw className="w-4 h-4 text-pink-400" />
                <span>{surpriseGift.replayButtonText}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* FULLSCREEN LIGHTBOX FOR PARIS PROMISE ARTWORK                             */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full rounded-2xl overflow-hidden border-2 border-amber-300/40 shadow-2xl cursor-default"
            >
              <img
                src="/images/paris-surprise.jpg"
                alt="Paris Sunset Celebration"
                className="w-full h-auto object-contain max-h-[85vh] mx-auto select-none"
              />
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 px-4 py-2 rounded-full bg-black/70 hover:bg-black/90 text-white text-xs font-bold border border-white/20 cursor-pointer"
              >
                Close ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
