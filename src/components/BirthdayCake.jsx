import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Flame, ArrowRight, RotateCcw, Wind } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayData } from '../data/birthdayData';

export default function BirthdayCake({ onNext }) {
  const { cake } = birthdayData;
  const candleCount = cake.candleCount || 5;

  // Track state of each candle (true = lit, false = extinguished)
  const [candles, setCandles] = useState(Array(candleCount).fill(true));
  const [isLightingActive, setIsLightingActive] = useState(false);
  const [hasAutoBlown, setHasAutoBlown] = useState(false);

  const allBlown = candles.every((c) => !c);
  const autoBlowTimerRef = useRef(null);

  // Synthesize a gentle magical sparkle sound
  const playBlowSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      if (ctx.state === 'suspended') ctx.resume();

      // Soft wind-whoosh followed by bright chimes
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.4);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);

      // Chimes
      [587.33, 880.00, 1174.66, 1760.00].forEach((freq, i) => {
        const chimeOsc = ctx.createOscillator();
        const chimeGain = ctx.createGain();
        chimeOsc.type = 'triangle';
        chimeOsc.frequency.setValueAtTime(freq, ctx.currentTime + 0.15 + i * 0.08);

        chimeGain.gain.setValueAtTime(0.001, ctx.currentTime + 0.15 + i * 0.08);
        chimeGain.gain.exponentialRampToValueAtTime(0.09, ctx.currentTime + 0.15 + i * 0.08 + 0.03);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15 + i * 0.08 + 0.5);

        chimeOsc.connect(chimeGain);
        chimeGain.connect(ctx.destination);

        chimeOsc.start(ctx.currentTime + 0.15 + i * 0.08);
        chimeOsc.stop(ctx.currentTime + 0.15 + i * 0.08 + 0.55);
      });
    } catch {
      // Audio not supported / permission blocked
    }
  };

  // Grand Confetti Blast
  const triggerGrandCelebration = () => {
    const count = 220;
    const defaults = {
      origin: { y: 0.65 },
      zIndex: 1000,
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#EC4899', '#F43F5E', '#FBBF24'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#00F0FF', '#A855F7', '#FFFFFF'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  // Perform the magical candle blow-off with lighting effects
  const performMagicalBlowOff = () => {
    // 1. Trigger lighting flash / shockwave effect
    setIsLightingActive(true);
    playBlowSound();

    // 2. Extinguish all candles simultaneously with smoke puffs
    setCandles(Array(candleCount).fill(false));
    setHasAutoBlown(true);

    // 3. Trigger grand confetti celebration
    triggerGrandCelebration();

    // 4. Fade lighting flash after 700ms
    setTimeout(() => {
      setIsLightingActive(false);
    }, 700);
  };

  // AUTO-BLOW: Trigger 2 seconds after entering this page
  useEffect(() => {
    autoBlowTimerRef.current = setTimeout(() => {
      performMagicalBlowOff();
    }, 2000); // exactly 2 seconds

    return () => {
      if (autoBlowTimerRef.current) {
        clearTimeout(autoBlowTimerRef.current);
      }
    };
  }, []);

  const extinguishCandle = (index) => {
    if (!candles[index]) return;

    const nextCandles = [...candles];
    nextCandles[index] = false;
    setCandles(nextCandles);

    if (nextCandles.every((c) => !c)) {
      performMagicalBlowOff();
    }
  };

  const blowAllCandles = () => {
    if (autoBlowTimerRef.current) clearTimeout(autoBlowTimerRef.current);
    performMagicalBlowOff();
  };

  const relightCandles = () => {
    setCandles(Array(candleCount).fill(true));
    setHasAutoBlown(false);

    // Give another 2.5s timer if they want to experience the auto-blow again
    if (autoBlowTimerRef.current) clearTimeout(autoBlowTimerRef.current);
    autoBlowTimerRef.current = setTimeout(() => {
      performMagicalBlowOff();
    }, 2500);
  };

  return (
    <section className="relative min-h-screen py-16 px-4 sm:px-6 max-w-4xl mx-auto flex flex-col items-center justify-center select-none overflow-hidden">
      {/* MAGICAL LIGHTING EFFECT: Expanding luminous shockwave bloom when candles blow */}
      <AnimatePresence>
        {isLightingActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: [0, 0.9, 0], scale: [0.3, 2.2, 3.2] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute z-30 w-72 h-72 rounded-full bg-gradient-to-tr from-amber-300 via-pink-400 to-yellow-100 blur-2xl pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Screen flash light effect */}
      <AnimatePresence>
        {isLightingActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-20 bg-gradient-to-b from-amber-200/30 via-pink-500/20 to-transparent pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs sm:text-sm font-semibold mb-3"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{cake.badge}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold font-serif gradient-text-pink"
        >
          {cake.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-300 text-sm sm:text-base mt-2 font-sans"
        >
          {!allBlown ? (
            <span className="flex items-center justify-center gap-1.5 text-amber-300 animate-pulse">
              <Sparkles className="w-4 h-4" />
              <span>Make your secret wish... Blowing in 2 seconds!</span>
              <Sparkles className="w-4 h-4" />
            </span>
          ) : (
            cake.blownSuccessTitle
          )}
        </motion.p>
      </div>

      {/* Interactive Birthday Cake Graphic */}
      <div className="relative w-full max-w-md flex flex-col items-center justify-center my-6">
        {/* Glow ambient circle */}
        <div
          className={`absolute w-72 h-72 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
            allBlown
              ? 'bg-gradient-to-tr from-pink-600/15 via-purple-600/15 to-transparent'
              : 'bg-gradient-to-tr from-pink-600/35 via-amber-400/30 to-purple-600/20'
          }`}
        />

        {/* Candles Row */}
        <div className="relative z-20 flex items-end justify-center gap-4 sm:gap-6 mb-[-6px]">
          {candles.map((isLit, i) => (
            <div
              key={i}
              onClick={() => extinguishCandle(i)}
              className="flex flex-col items-center cursor-pointer group"
              title={isLit ? 'Click to blow out candle!' : 'Blown out!'}
            >
              {/* Flame */}
              <div className="h-10 flex items-end justify-center relative">
                {isLit ? (
                  <motion.div
                    animate={{
                      scaleY: [1, 1.18, 0.92, 1],
                      scaleX: [1, 0.92, 1.06, 1],
                      rotate: [-2, 3, -3, 2],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.6 + i * 0.1,
                      ease: 'easeInOut',
                    }}
                    className="w-4 h-8 bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 rounded-full rounded-b-md shadow-[0_0_18px_rgba(251,191,36,0.95),0_0_30px_rgba(244,63,94,0.7)]"
                  />
                ) : (
                  // Smoke puff animation after blowing
                  <motion.div
                    initial={{ opacity: 0.9, y: 0, scale: 0.4 }}
                    animate={{ opacity: 0, y: -30, scale: 1.6 }}
                    transition={{ duration: 1.8, ease: 'easeOut' }}
                    className="w-3 h-7 bg-slate-300/60 rounded-full blur-[2px]"
                  />
                )}
              </div>

              {/* Candle Wick */}
              <div className="w-0.5 h-2 bg-slate-700" />

              {/* Candle Body */}
              <div className="w-3.5 sm:w-4 h-12 rounded-t-sm bg-gradient-to-b from-pink-300 via-purple-300 to-indigo-400 border border-white/30 shadow-md group-hover:brightness-110 transition-all flex flex-col justify-around items-center py-1">
                <span className="w-full h-1 bg-white/40" />
                <span className="w-full h-1 bg-white/40" />
              </div>
            </div>
          ))}
        </div>

        {/* Cake Tier 1 (Top Tier) */}
        <div className="relative z-10 w-44 sm:w-52 h-16 rounded-2xl bg-gradient-to-r from-pink-400 via-rose-300 to-pink-400 border-2 border-pink-200/50 shadow-lg flex items-center justify-center overflow-hidden">
          {/* Frosting drips */}
          <div className="absolute top-0 inset-x-0 h-4 bg-white/60 rounded-b-xl flex justify-around">
            <span className="w-3 h-5 bg-white/60 rounded-b-full -mt-1" />
            <span className="w-4 h-6 bg-white/60 rounded-b-full -mt-1" />
            <span className="w-3 h-5 bg-white/60 rounded-b-full -mt-1" />
            <span className="w-4 h-6 bg-white/60 rounded-b-full -mt-1" />
          </div>
          <span className="font-serif font-bold text-pink-900/80 text-xs tracking-wider">
            ★ {birthdayData.recipient.name.toUpperCase()} ★
          </span>
        </div>

        {/* Cake Tier 2 (Middle Tier) */}
        <div className="relative z-10 w-60 sm:w-72 h-20 -mt-2 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 border-2 border-pink-300/40 shadow-xl flex items-center justify-center overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-5 bg-pink-100/70 rounded-b-2xl flex justify-around">
            <span className="w-4 h-7 bg-pink-100/70 rounded-b-full -mt-1" />
            <span className="w-5 h-8 bg-pink-100/70 rounded-b-full -mt-1" />
            <span className="w-4 h-6 bg-pink-100/70 rounded-b-full -mt-1" />
            <span className="w-5 h-7 bg-pink-100/70 rounded-b-full -mt-1" />
          </div>
          <div className="flex items-center gap-2 text-white font-serif font-bold text-sm tracking-widest mt-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            HAPPY BIRTHDAY
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </div>
        </div>

        {/* Cake Tier 3 (Bottom Base Tier) */}
        <div className="relative z-10 w-72 sm:w-88 h-24 -mt-2 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 border-2 border-purple-300/40 shadow-2xl flex items-center justify-center overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-5 bg-amber-100/70 rounded-b-2xl flex justify-around">
            <span className="w-5 h-8 bg-amber-100/70 rounded-b-full -mt-1" />
            <span className="w-4 h-6 bg-amber-100/70 rounded-b-full -mt-1" />
            <span className="w-6 h-9 bg-amber-100/70 rounded-b-full -mt-1" />
            <span className="w-5 h-7 bg-amber-100/70 rounded-b-full -mt-1" />
            <span className="w-4 h-6 bg-amber-100/70 rounded-b-full -mt-1" />
          </div>
          <div className="flex items-center gap-1 text-pink-200 text-xs font-medium mt-3">
            <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
            <span>Baked With Infinite Love</span>
            <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
          </div>
        </div>

        {/* Cake Stand Plate */}
        <div className="w-80 sm:w-96 h-5 rounded-full bg-gradient-to-r from-slate-400 via-slate-100 to-slate-400 shadow-2xl border border-white/50 -mt-1 z-0" />
        <div className="w-24 h-6 bg-gradient-to-b from-slate-300 to-slate-500 rounded-b-xl shadow-lg -mt-1" />
      </div>

      {/* Interactive Controls & Wish Reveal */}
      <AnimatePresence>
        {allBlown ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="text-center mt-6 p-6 rounded-3xl glass-panel-glow border border-pink-400/50 max-w-md w-full shadow-[0_0_40px_rgba(236,72,153,0.4)]"
          >
            <div className="w-12 h-12 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center mx-auto mb-3">
              <Heart className="w-7 h-7 fill-rose-500 text-pink-400 animate-pulse" />
            </div>

            <h3 className="text-2xl font-bold font-serif gradient-text-gold">
              {cake.blownSuccessTitle}
            </h3>

            <p className="text-sm text-pink-200 mt-1">
              {cake.blownSuccessSubtitle}
            </p>

            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                onClick={relightCandles}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Relight & Experience Again
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={blowAllCandles}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-500/20 hover:bg-pink-500/30 border border-pink-400/30 text-pink-300 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
            >
              <Flame className="w-4 h-4 text-amber-300" />
              <span>Blow Out Now</span>
            </button>
          </div>
        )}
      </AnimatePresence>

      {/* Continue to Next Section */}
      {onNext && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12"
        >
          <button
            onClick={onNext}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 shadow-[0_4px_25px_rgba(236,72,153,0.4)] hover:shadow-[0_4px_35px_rgba(236,72,153,0.6)] transition-all cursor-pointer"
          >
            <span>See {birthdayData.recipient.name}'s Special Memories 📸</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      )}
    </section>
  );
}
