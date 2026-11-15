import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Star, ArrowRight, Gift, Music2 } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

// Background floating elements config
const FLOATING_PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: Math.random() * 95,
  y: Math.random() * 95,
  size: Math.random() * 16 + 10,
  duration: Math.random() * 5 + 5,
  delay: Math.random() * 3,
  type: i % 3 === 0 ? 'heart' : i % 3 === 1 ? 'star' : 'sparkle',
}));

export default function Welcome({ onStart }) {
  const { recipient, welcome } = birthdayData;
  const [clickHearts, setClickHearts] = useState([]);

  // Spawn mini floating heart where user taps/clicks on screen
  const handleScreenClick = (e) => {
    const newHeart = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
    };
    setClickHearts((prev) => [...prev.slice(-12), newHeart]);
    setTimeout(() => {
      setClickHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1500);
  };

  return (
    <section 
      onClick={handleScreenClick}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 py-12 select-none cursor-pointer"
    >
      {/* 1. Ambient Glowing Nebula Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-tr from-pink-600/30 via-purple-600/25 to-indigo-600/20 rounded-full blur-[100px] sm:blur-[140px] animate-pulse-slow" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-rose-500/15 rounded-full blur-[90px]" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-amber-400/15 rounded-full blur-[90px]" />
      </div>

      {/* 2. Floating Ambient Hearts & Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {FLOATING_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: 0, opacity: 0.2 }}
            animate={{
              y: [-15, 20, -15],
              x: [-10, 10, -10],
              opacity: [0.2, 0.7, 0.2],
              scale: [0.9, 1.15, 0.9],
              rotate: [0, 15, -15, 0],
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
            {p.type === 'heart' && (
              <Heart style={{ width: p.size, height: p.size }} className="fill-pink-500/40 text-pink-400" />
            )}
            {p.type === 'star' && (
              <Star style={{ width: p.size, height: p.size }} className="fill-amber-300/30 text-amber-300" />
            )}
            {p.type === 'sparkle' && (
              <Sparkles style={{ width: p.size, height: p.size }} className="text-purple-300" />
            )}
          </motion.div>
        ))}
      </div>

      {/* 3. Interactive Spawned Hearts on Click */}
      <AnimatePresence>
        {clickHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, scale: 0.5, y: 0 }}
            animate={{ opacity: 0, scale: 1.6, y: -60 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ left: heart.x - 12, top: heart.y - 12 }}
            className="fixed pointer-events-none z-50 text-pink-400"
          >
            <Heart className="w-6 h-6 fill-rose-500 text-pink-300 drop-shadow-[0_0_10px_rgba(244,63,94,0.8)]" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 4. Central Hero Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-xl mx-auto glass-panel-glow rounded-3xl p-6 sm:p-10 text-center border border-pink-500/30 shadow-[0_0_50px_rgba(236,72,153,0.25)]"
      >
        {/* Subtle decorative glow ring */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/30 to-amber-500/20 border border-pink-400/40 backdrop-blur-md flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-xs font-semibold uppercase tracking-widest text-pink-200">
            {welcome.badge}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-pink-300 animate-spin" style={{ animationDuration: '6s' }} />
        </div>

        {/* Decorative Top Floating Cake/Gift Icon */}
        <motion.div
          animate={{ y: [-4, 6, -4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-4 mb-3 inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-pink-500/20 via-purple-600/30 to-amber-400/20 border border-pink-400/30 shadow-inner"
        >
          <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-pink-300 drop-shadow-[0_0_12px_rgba(236,72,153,0.7)]" />
        </motion.div>

        {/* Big Greeting */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-3xl sm:text-5xl md:text-5xl font-extrabold tracking-tight"
        >
          <span className="gradient-text-pink drop-shadow-sm font-serif">
            {welcome.greeting}
          </span>
        </motion.h1>

        {/* Name Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="mt-2 text-2xl sm:text-4xl font-extrabold font-serif gradient-text-gold tracking-wide"
        >
          ✨ {recipient.name} ✨
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-3 text-lg sm:text-xl font-medium text-purple-200 font-sans"
        >
          {welcome.subheading}
        </motion.p>

        {/* Heartfelt Quote/Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="mt-3 text-sm sm:text-base text-slate-300/90 italic font-serif max-w-md mx-auto leading-relaxed"
        >
          "{welcome.quote}"
        </motion.p>

        {/* Interactive Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(244, 63, 94, 0.6)' }}
            whileTap={{ scale: 0.96 }}
            onClick={(e) => {
              e.stopPropagation(); // prevent screen click duplicate
              onStart();
            }}
            className="group relative inline-flex items-center gap-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-bold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 shadow-[0_4px_25px_rgba(236,72,153,0.45)] border border-pink-300/40 transition-all cursor-pointer overflow-hidden"
          >
            {/* Shimmer light pass */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            
            <Heart className="w-5 h-5 fill-white text-white group-hover:scale-125 transition-transform duration-300" />
            <span>{welcome.buttonText}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>

          {/* Micro hint */}
          <div className="flex items-center gap-1.5 text-xs text-pink-300/70 font-medium">
            <Music2 className="w-3.5 h-3.5 animate-bounce" />
            <span>Click to start the celebration with music & surprises</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
