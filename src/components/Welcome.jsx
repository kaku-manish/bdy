import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star, Gift, Music2 } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

// Ambient floating golden and ruby particles
const AMBIENT_PARTICLES = Array.from({ length: 26 }, (_, i) => ({
  id: i,
  x: Math.random() * 96,
  y: Math.random() * 96,
  size: Math.random() * 14 + 8,
  duration: Math.random() * 4 + 4,
  delay: Math.random() * 3,
  type: i % 3 === 0 ? 'heart' : i % 3 === 1 ? 'gold-star' : 'sparkle',
}));

export default function Welcome({ onStart, onNavigate }) {
  const { recipient, welcome } = birthdayData;
  const [clickHearts, setClickHearts] = useState([]);
  const [isHoveringBtn, setIsHoveringBtn] = useState(false);

  // Spawn mini floating heart where user taps/clicks on screen
  const handleScreenClick = (e) => {
    const newHeart = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
    };
    setClickHearts((prev) => [...prev.slice(-14), newHeart]);
    setTimeout(() => {
      setClickHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1600);
  };

  const handleNav = (stageIndex) => {
    if (onNavigate) {
      onNavigate(stageIndex);
    } else {
      onStart();
    }
  };

  return (
    <div
      onClick={handleScreenClick}
      className="relative min-h-screen w-full bg-[#07010A] text-white flex flex-col justify-between items-center overflow-x-hidden select-none cursor-pointer"
    >
      {/* 1. Deep Royal Velvet & Warm Gold Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[750px] h-[350px] sm:h-[750px] bg-gradient-to-tr from-rose-900/40 via-red-800/30 to-amber-700/20 rounded-full blur-[120px] sm:blur-[160px] animate-pulse-slow" />
        <div className="absolute top-10 left-10 w-96 h-96 bg-red-950/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-950/30 rounded-full blur-[100px]" />
      </div>

      {/* 2. Interactive Floating Particles & Rising Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {AMBIENT_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: 0, opacity: 0.2 }}
            animate={{
              y: [-18, 22, -18],
              x: [-12, 12, -12],
              opacity: [0.2, 0.85, 0.2],
              scale: [0.9, 1.25, 0.9],
              rotate: [0, 20, -20, 0],
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
          >
            {p.type === 'heart' && (
              <Heart
                style={{ width: p.size, height: p.size }}
                className="fill-red-500/50 text-rose-300 drop-shadow-[0_0_8px_rgba(244,63,94,0.7)]"
              />
            )}
            {p.type === 'gold-star' && (
              <Star
                style={{ width: p.size, height: p.size }}
                className="fill-amber-300/60 text-amber-200 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]"
              />
            )}
            {p.type === 'sparkle' && (
              <Sparkles
                style={{ width: p.size, height: p.size }}
                className="text-amber-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* 3. Screen Click Heart Burst */}
      <AnimatePresence>
        {clickHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, scale: 0.4, y: 0 }}
            animate={{ opacity: 0, scale: 1.8, y: -75 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            style={{ left: heart.x - 14, top: heart.y - 14 }}
            className="fixed pointer-events-none z-50 text-rose-400"
          >
            <Heart className="w-7 h-7 fill-red-500 text-amber-200 drop-shadow-[0_0_16px_rgba(225,29,72,0.9)]" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 4. Top Navigation Bar (Matches the Header in the Design Image) */}
      <header className="relative z-30 w-full max-w-[1400px] mx-auto px-4 sm:px-8 py-3.5 sm:py-5 flex items-center justify-between pointer-events-auto">
        {/* Brand / Title Left */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center shadow-[0_0_15px_rgba(225,29,72,0.6)] group-hover:scale-105 transition-transform">
            <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold tracking-wide font-serif text-amber-100 group-hover:text-white transition-colors flex items-center gap-1.5">
              <span>Lalli's Birthday</span>
              <span className="text-rose-400">♥</span>
            </span>
            <span className="text-[10px] text-amber-200/60 font-sans tracking-widest uppercase">
              Grand Celebration
            </span>
          </div>
        </div>

        {/* Center Navigation Pills */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-amber-500/20 shadow-inner">
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-[0_0_15px_rgba(225,29,72,0.65)] transition-all cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNav(2); // Memories
            }}
            className="px-3.5 py-1 rounded-full text-xs font-medium text-amber-100/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            Memories
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNav(5); // Wishes
            }}
            className="px-3.5 py-1 rounded-full text-xs font-medium text-amber-100/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            Wishes
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNav(2); // Gallery (Memories)
            }}
            className="px-3.5 py-1 rounded-full text-xs font-medium text-amber-100/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            Gallery
          </button>
        </nav>

        {/* Right Action Button ("♥ For Lalli ♡") */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNav(3); // Heart Notes / For Lalli
          }}
          className="flex items-center gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold text-amber-200 bg-amber-500/10 hover:bg-amber-500/25 border border-amber-400/40 shadow-[0_0_15px_rgba(251,191,36,0.25)] hover:shadow-[0_0_20px_rgba(251,191,36,0.45)] transition-all cursor-pointer"
        >
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-400" />
          <span>For Lalli</span>
          <span className="text-xs text-amber-300">♡</span>
        </button>
      </header>

      {/* 5. Main Hero Section (Matches the Grand Celebration Visual Art) */}
      <main className="relative z-10 w-full max-w-[1440px] mx-auto px-2 sm:px-6 my-auto flex flex-col items-center">
        {/* Visual Artwork Canvas Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_15px_60px_rgba(0,0,0,0.9),0_0_80px_rgba(225,29,72,0.3)] border border-amber-500/30"
        >
          {/* High-Resolution Hero Artwork */}
          <img
            src="/images/home-hero.jpg"
            alt="Happy Birthday Lalli - A Grand Celebration Just For You"
            className="w-full h-full object-cover select-none pointer-events-none"
            loading="eager"
          />

          {/* Subtle Ambient Vignette / Lighting Blend */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 pointer-events-none" />

          {/* Candle Flame Glow Accents on the Left Cake */}
          <div className="absolute top-[22%] left-[17%] w-10 h-10 bg-amber-400/30 rounded-full blur-md animate-pulse pointer-events-none" />
          <div className="absolute top-[24%] left-[19%] w-8 h-8 bg-amber-300/40 rounded-full blur-md animate-pulse pointer-events-none" />

          {/* Eiffel Tower Sparkling Ambient Glow on the Right */}
          <div className="absolute top-[40%] right-[23.5%] w-8 h-12 bg-amber-200/30 rounded-full blur-sm animate-pulse-slow pointer-events-none" />

          {/* Golden Crown Royal Shimmer Overlay at Center */}
          <div className="absolute top-[9%] left-1/2 -translate-x-1/2 w-28 h-10 bg-amber-300/20 rounded-full blur-lg pointer-events-none" />

          {/* Interactive Call-To-Action Button Overlaid on the Artwork Button */}
          <div className="absolute top-[69.2%] left-1/2 -translate-x-1/2 w-[34%] max-w-[360px] min-w-[210px] h-[8.2%] min-h-[42px] max-h-[58px] z-30">
            <motion.button
              whileHover={{
                scale: 1.04,
                boxShadow: '0 0 35px rgba(244, 63, 94, 0.9), 0 0 20px rgba(251, 191, 36, 0.8)',
              }}
              whileTap={{ scale: 0.97 }}
              onHoverStart={() => setIsHoveringBtn(true)}
              onHoverEnd={() => setIsHoveringBtn(false)}
              onClick={(e) => {
                e.stopPropagation();
                onStart();
              }}
              className="group relative w-full h-full rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-serif font-bold text-xs sm:text-base md:text-lg flex items-center justify-center gap-2 sm:gap-3 px-4 shadow-[0_0_25px_rgba(225,29,72,0.7),inset_0_1px_2px_rgba(255,255,255,0.4)] border border-amber-300/60 overflow-hidden cursor-pointer"
            >
              {/* Animated Light Shimmer Gleam */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

              {/* Heart Icon */}
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white group-hover:scale-125 transition-transform duration-300 drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]" />

              {/* Button Text */}
              <span className="tracking-wide drop-shadow-md text-amber-50">
                Celebrate Lalli's Birthday
              </span>

              {/* Arrow */}
              <span className="text-base sm:text-xl font-sans group-hover:translate-x-1 transition-transform duration-300 text-amber-200">
                ➔
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Mobile Dedicated Tap-To-Celebrate Card (Ensures effortless tap on phone screens) */}
        <div className="mt-4 sm:hidden w-full flex flex-col items-center gap-2.5">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={(e) => {
              e.stopPropagation();
              onStart();
            }}
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-serif font-bold text-base flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(225,29,72,0.8)] border border-amber-400/50"
          >
            <Heart className="w-4 h-4 fill-white text-white" />
            <span>Celebrate Lalli's Birthday ➔</span>
          </motion.button>
          <p className="text-[11px] text-amber-200/70 text-center font-sans">
            Tap anywhere to celebrate • Background melody ready
          </p>
        </div>
      </main>

      {/* 6. Footer Melody Indicator & Interactive Tap Hint */}
      <footer className="relative z-20 w-full max-w-[1400px] mx-auto px-4 sm:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-amber-200/70 font-sans">
        <div className="flex items-center gap-2">
          <Music2 className="w-4 h-4 text-rose-400 animate-pulse" />
          <span>Melody: {birthdayData.music.title}</span>
        </div>

        <div className="text-center sm:text-right text-[11px] text-amber-100/60 font-serif italic">
          "Happy Birthday, Lalli. Today and always." ♡
        </div>
      </footer>
    </div>
  );
}
