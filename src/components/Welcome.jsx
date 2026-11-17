import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star, Music2 } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

// Ambient floating golden and ruby particles
const AMBIENT_PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: Math.random() * 96,
  y: Math.random() * 96,
  size: Math.random() * 12 + 6,
  duration: Math.random() * 4 + 4,
  delay: Math.random() * 3,
  type: i % 3 === 0 ? 'heart' : i % 3 === 1 ? 'gold-star' : 'sparkle',
}));

export default function Welcome({ onStart, onNavigate }) {
  const [clickHearts, setClickHearts] = useState([]);
  const [hoveredNav, setHoveredNav] = useState(null);

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
    }, 1500);
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
      className="relative w-full h-screen min-h-[580px] bg-[#07010A] text-white flex items-center justify-center overflow-hidden select-none cursor-pointer"
    >
      {/* 1. Seamless Full-Bleed Ambient Backdrop (Matches Laptop Screen Edge-to-Edge) */}
      <img
        src="/images/home-hero.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-105 pointer-events-none select-none"
      />

      {/* Atmospheric Vignette & Deep Velvet Tint */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#07010A]/30 to-[#07010A] pointer-events-none" />

      {/* 2. Interactive Floating Particles & Rising Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {AMBIENT_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: 0, opacity: 0.2 }}
            animate={{
              y: [-16, 18, -16],
              x: [-10, 10, -10],
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

      {/* 4. Complete Laptop-Size Hero Artwork Stage (Single Cohesive Canvas, Zero Double Frame) */}
      <div className="relative w-full h-full max-w-[177.78vh] max-h-[56.25vw] aspect-[16/9] mx-auto flex items-center justify-center overflow-hidden">
        {/* The Master Visual Artwork */}
        <img
          src="/images/home-hero.jpg"
          alt="Happy Birthday Lalli - A Grand Celebration Just For You"
          className="w-full h-full object-fill select-none pointer-events-none"
          loading="eager"
        />

        {/* Ambient Candle & Fairy Light Accents */}
        <div className="absolute top-[22%] left-[17%] w-10 h-10 bg-amber-400/25 rounded-full blur-md animate-pulse pointer-events-none" />
        <div className="absolute top-[40%] right-[23.5%] w-8 h-12 bg-amber-200/25 rounded-full blur-sm animate-pulse-slow pointer-events-none" />
        <div className="absolute top-[9%] left-1/2 -translate-x-1/2 w-28 h-10 bg-amber-300/15 rounded-full blur-lg pointer-events-none" />

        {/* =========================================================================
            INTERACTIVE HOTSPOTS OVER THE EMBEDDED NAVIGATION BAR (NO DUPLICATE HTML)
           ========================================================================= */}

        {/* Brand Hotspot: "Lalli's Birthday Celebration ♥" (Left) */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          title="Lalli's Birthday Celebration"
          className="absolute rounded-lg cursor-pointer transition-all hover:bg-white/5 active:scale-95"
          style={{
            top: '2.5%',
            left: '16.5%',
            width: '16.5%',
            height: '6.5%',
          }}
        />

        {/* Nav Hotspot: "Home" */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onMouseEnter={() => setHoveredNav('home')}
          onMouseLeave={() => setHoveredNav(null)}
          title="Home"
          className="absolute rounded-full cursor-pointer transition-all hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] active:scale-95"
          style={{
            top: '2.5%',
            left: '38.0%',
            width: '6.8%',
            height: '6.5%',
          }}
        />

        {/* Nav Hotspot: "Memories" */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleNav(2);
          }}
          onMouseEnter={() => setHoveredNav('memories')}
          onMouseLeave={() => setHoveredNav(null)}
          title="Go to Memories"
          className="absolute rounded-full cursor-pointer transition-all hover:bg-white/10 hover:shadow-[0_0_12px_rgba(251,191,36,0.3)] active:scale-95"
          style={{
            top: '2.5%',
            left: '45.8%',
            width: '6.8%',
            height: '6.5%',
          }}
        />

        {/* Nav Hotspot: "Wishes" */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleNav(5);
          }}
          onMouseEnter={() => setHoveredNav('wishes')}
          onMouseLeave={() => setHoveredNav(null)}
          title="Go to Wishes"
          className="absolute rounded-full cursor-pointer transition-all hover:bg-white/10 hover:shadow-[0_0_12px_rgba(251,191,36,0.3)] active:scale-95"
          style={{
            top: '2.5%',
            left: '53.6%',
            width: '6.2%',
            height: '6.5%',
          }}
        />

        {/* Nav Hotspot: "Gallery" */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleNav(2);
          }}
          onMouseEnter={() => setHoveredNav('gallery')}
          onMouseLeave={() => setHoveredNav(null)}
          title="Go to Gallery"
          className="absolute rounded-full cursor-pointer transition-all hover:bg-white/10 hover:shadow-[0_0_12px_rgba(251,191,36,0.3)] active:scale-95"
          style={{
            top: '2.5%',
            left: '60.8%',
            width: '7.0%',
            height: '6.5%',
          }}
        />

        {/* Nav Hotspot: "♥ For Lalli ♡" (Right Pill) */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleNav(3);
          }}
          onMouseEnter={() => setHoveredNav('for-lalli')}
          onMouseLeave={() => setHoveredNav(null)}
          title="From The Heart - For Lalli"
          className="absolute rounded-full cursor-pointer transition-all hover:bg-amber-400/10 hover:shadow-[0_0_16px_rgba(251,191,36,0.4)] active:scale-95"
          style={{
            top: '2.5%',
            left: '70.8%',
            width: '11.0%',
            height: '6.5%',
          }}
        />

        {/* =========================================================================
            MAIN INTERACTIVE CALL-TO-ACTION BUTTON ("Celebrate Lalli's Birthday ➔")
           ========================================================================= */}
        <div
          style={{
            top: '68.8%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '32.0%',
            height: '8.2%',
          }}
          className="absolute z-30"
        >
          <motion.button
            whileHover={{
              scale: 1.035,
              boxShadow: '0 0 35px rgba(244, 63, 94, 0.85), 0 0 20px rgba(251, 191, 36, 0.75)',
            }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => {
              e.stopPropagation();
              onStart();
            }}
            title="Start Lalli's Birthday Celebration"
            className="group relative w-full h-full rounded-full cursor-pointer overflow-hidden transition-all flex items-center justify-center border border-amber-300/40 bg-red-600/15 hover:bg-red-600/30 shadow-[0_0_20px_rgba(225,29,72,0.5)]"
          >
            {/* Animated Light Shimmer Gleam */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

            {/* Glowing Aura Ring */}
            <span className="absolute inset-0 rounded-full border border-amber-300/30 group-hover:border-amber-200/60 transition-colors pointer-events-none" />
          </motion.button>
        </div>
      </div>

      {/* 5. Mobile Dedicated Floating Action Button (Ensures smooth phone access) */}
      <div className="sm:hidden fixed bottom-6 inset-x-4 z-40 flex flex-col items-center gap-2 pointer-events-auto">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={(e) => {
            e.stopPropagation();
            onStart();
          }}
          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-serif font-bold text-base flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(225,29,72,0.9)] border border-amber-400/60"
        >
          <Heart className="w-4 h-4 fill-white text-white" />
          <span>Celebrate Lalli's Birthday ➔</span>
        </motion.button>
        <span className="text-[11px] text-amber-200/80 font-sans tracking-wide">
          Tap anywhere to celebrate with music 🎵
        </span>
      </div>

      {/* 6. Subtle Bottom Ambient Music Note */}
      <div className="hidden sm:flex absolute bottom-3 right-6 z-20 items-center gap-2 text-xs text-amber-200/60 pointer-events-none font-sans">
        <Music2 className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
        <span>Melody: {birthdayData.music.title}</span>
      </div>
    </div>
  );
}
