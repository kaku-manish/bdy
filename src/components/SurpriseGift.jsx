import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gift,
  Heart,
  Sparkles,
  PartyPopper,
  RotateCcw,
  Crown,
  X,
  CheckCircle2,
  Lock,
  ArrowRight,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayData } from '../data/birthdayData';

// Ambient floating particles around the gift box
const GIFT_PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  x: Math.random() * 80 + 10,
  y: Math.random() * 80 + 10,
  size: Math.random() * 12 + 8,
  duration: Math.random() * 4 + 4,
  delay: Math.random() * 2,
}));

export default function SurpriseGift({ onReplay }) {
  const { surpriseGift, recipient } = birthdayData;

  // Box states: 'closed', 'opening', 'opened'
  const [boxState, setBoxState] = useState('closed');

  // Typing state for the personalized message
  const [typedMessage, setTypedMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Active digital gift modal (e.g., bouquet, sweetness, etc.)
  const [activeGiftModal, setActiveGiftModal] = useState(null);
  const [openedGiftIds, setOpenedGiftIds] = useState(new Set());

  // Final invitation state
  const [showInvitation, setShowInvitation] = useState(false);
  const [invitationAccepted, setInvitationAccepted] = useState(false);

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
      // Audio not supported / permitted
    }
  };

  // Open the Gift Box with Animations & Confetti
  const handleOpenBox = () => {
    if (boxState !== 'closed') return;
    setBoxState('opening');
    playMagicChime();

    // Multistage celebratory burst
    confetti({
      particleCount: 160,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#FF2E93', '#FBBF24', '#00F0FF', '#F43F5E', '#FFFFFF'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 65,
        origin: { x: 0.15, y: 0.65 },
        colors: ['#FF2E93', '#FBBF24', '#FFFFFF'],
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 65,
        origin: { x: 0.85, y: 0.65 },
        colors: ['#FF2E93', '#FBBF24', '#FFFFFF'],
      });
    }, 350);

    // Transition to opened state
    setTimeout(() => {
      setBoxState('opened');
    }, 700);
  };

  // Typewriter effect for the revealed message
  useEffect(() => {
    if (boxState === 'opened') {
      setIsTyping(true);
      setTypedMessage('');
      const fullText = surpriseGift.typingMessage;
      let index = 0;

      const timer = setInterval(() => {
        if (index < fullText.length) {
          setTypedMessage(fullText.slice(0, index + 1));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(timer);
        }
      }, 18);

      return () => clearInterval(timer);
    }
  }, [boxState, surpriseGift.typingMessage]);

  const handleOpenGiftCard = (gift) => {
    setActiveGiftModal(gift);
    setOpenedGiftIds((prev) => new Set([...prev, gift.id]));
  };

  const handleAcceptInvitation = () => {
    setInvitationAccepted(true);
    playMagicChime();

    confetti({
      particleCount: 220,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FF2E93', '#F43F5E', '#FBBF24', '#00F0FF', '#FFFFFF'],
    });
  };

  return (
    <section className="relative min-h-screen py-16 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col items-center justify-center select-none text-center">
      {/* 1. Ambient Background Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] bg-gradient-to-tr from-pink-600/30 via-purple-600/25 to-amber-400/20 rounded-full blur-[140px] animate-pulse-slow" />
        <div className="absolute top-1/4 right-10 w-72 h-72 bg-rose-500/15 rounded-full blur-[90px]" />
      </div>

      {/* Floating particles around gift box in initial state */}
      {boxState === 'closed' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {GIFT_PARTICLES.map((p) => (
            <motion.div
              key={p.id}
              animate={{
                y: [-12, 14, -12],
                x: [-6, 6, -6],
                opacity: [0.2, 0.7, 0.2],
                scale: [0.9, 1.2, 0.9],
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
      )}

      {/* ========================================================================= */}
      {/* SECTION 1: INITIAL GIFT BOX SCREEN                                       */}
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
                    ? { y: -80, rotate: -15, opacity: 0, scale: 1.1 }
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
          /* SECTION 2: OPENED STATE - MESSAGE + 5 DIGITAL GIFTS + INVITATION          */
          /* ========================================================================= */
          <motion.div
            key="revealed-screen"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full flex flex-col items-center gap-10"
          >
            {/* 1. Personalized Birthday Message with Typewriter Effect */}
            <div className="relative max-w-2xl w-full glass-panel-glow p-6 sm:p-10 rounded-3xl border border-pink-400/50 shadow-[0_0_60px_rgba(236,72,153,0.4)] text-center overflow-hidden">
              {/* Top Sparkle Icon */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-pink-500/30 to-amber-400/20 border border-pink-400/40 flex items-center justify-center mx-auto mb-4 text-pink-300 shadow-inner">
                <Heart className="w-8 h-8 fill-rose-500 text-pink-400 animate-pulse" />
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold font-serif gradient-text-pink">
                {recipient.name}, You Are Truly One Of A Kind! 💗
              </h3>

              {/* Typewriter Message Box */}
              <div className="mt-5 p-5 sm:p-7 rounded-2xl bg-white/[0.04] border border-white/10 text-left min-h-[160px]">
                <p className="text-slate-100 font-sans text-base sm:text-lg leading-relaxed whitespace-pre-line font-medium">
                  {typedMessage}
                  {isTyping && (
                    <span className="inline-block w-2 h-5 bg-pink-400 ml-1 animate-pulse" />
                  )}
                </p>
                {isTyping && (
                  <button
                    onClick={() => {
                      setTypedMessage(surpriseGift.typingMessage);
                      setIsTyping(false);
                    }}
                    className="mt-3 text-xs text-pink-300 hover:text-white underline cursor-pointer"
                  >
                    Read full message ↷
                  </button>
                )}
              </div>
            </div>

            {/* 2. Hidden Gift Reveal - Five Interactive Gift Cards */}
            <div className="w-full max-w-4xl flex flex-col items-center">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold mb-2 border border-purple-500/30">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Hidden Digital Gifts Inside The Box</span>
                </div>
                <h4 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
                  Five Little Keepsakes For You 🎁
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Click on each gift card below to unwrap its secret message!
                </p>
              </div>

              {/* 5 Gift Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
                {surpriseGift.gifts.map((gift, idx) => {
                  const isOpened = openedGiftIds.has(gift.id);

                  return (
                    <motion.div
                      key={gift.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * idx, duration: 0.5 }}
                      whileHover={{ scale: 1.04, y: -4 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleOpenGiftCard(gift)}
                      className={`relative cursor-pointer rounded-2xl p-5 border transition-all duration-300 text-left flex flex-col justify-between ${
                        isOpened
                          ? 'bg-purple-950/40 border-pink-500/50 shadow-[0_0_20px_rgba(236,72,153,0.3)]'
                          : 'bg-slate-900/70 border-white/10 hover:border-pink-400/50 hover:shadow-[0_0_25px_rgba(236,72,153,0.25)]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-3xl p-2 rounded-xl bg-white/5 border border-white/10 shadow-inner">
                          {gift.emoji}
                        </span>
                        {isOpened ? (
                          <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                            <CheckCircle2 className="w-3 h-3" /> Opened
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold text-pink-300/80 px-2.5 py-0.5 rounded-full bg-pink-500/15 border border-pink-500/20 flex items-center gap-1">
                            <Lock className="w-3 h-3" /> Tap to open
                          </span>
                        )}
                      </div>

                      <div>
                        <h5 className="font-serif font-bold text-base sm:text-lg text-white group-hover:text-pink-300 transition-colors">
                          {gift.title}
                        </h5>
                        <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                          {gift.subtitle}
                        </p>
                      </div>

                      <div className="mt-4 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs text-pink-300">
                        <span className="font-medium">Gift #{idx + 1}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* 3. Final Special Surprise - Special Invitation Trigger */}
            {!showInvitation ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex flex-col items-center"
              >
                <button
                  onClick={() => setShowInvitation(true)}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 shadow-[0_0_35px_rgba(236,72,153,0.5)] hover:shadow-[0_0_50px_rgba(236,72,153,0.7)] border border-pink-300/40 transition-all cursor-pointer overflow-hidden animate-pulse-slow"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <Heart className="w-5 h-5 fill-white text-white group-hover:scale-125 transition-transform" />
                  <span>{surpriseGift.invitation.unlockPrompt}</span>
                  <Heart className="w-5 h-5 fill-white text-white group-hover:scale-125 transition-transform" />
                </button>
              </motion.div>
            ) : (
              /* The Revealed Special Invitation Card */
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 280 }}
                className="relative max-w-xl w-full glass-panel-glow p-6 sm:p-10 rounded-3xl border-2 border-rose-400/60 shadow-[0_0_60px_rgba(244,63,94,0.45)] text-center overflow-hidden"
              >
                <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center mx-auto mb-3 border border-rose-400/30">
                  <Heart className="w-6 h-6 fill-rose-500 text-rose-400 animate-pulse" />
                </div>

                <h4 className="text-2xl sm:text-3xl font-extrabold font-serif gradient-text-pink">
                  {surpriseGift.invitation.heading}
                </h4>

                <div className="mt-4 p-5 sm:p-6 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
                  <p className="text-slate-100 font-sans text-base sm:text-lg leading-relaxed whitespace-pre-line font-medium">
                    {surpriseGift.invitation.text}
                  </p>
                </div>

                {!invitationAccepted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 flex justify-center"
                  >
                    <motion.button
                      whileHover={{ scale: 1.06, boxShadow: '0 0 35px rgba(244, 63, 94, 0.8)' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAcceptInvitation}
                      className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base sm:text-lg font-bold text-white bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 shadow-[0_4px_30px_rgba(244,63,94,0.6)] border border-pink-300/50 cursor-pointer"
                    >
                      <Heart className="w-5 h-5 fill-white" />
                      <span>{surpriseGift.invitation.acceptButton}</span>
                      <Sparkles className="w-5 h-5 text-amber-300" />
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-rose-500/20 via-pink-500/25 to-purple-500/20 border border-pink-400/50 text-center shadow-lg"
                  >
                    <PartyPopper className="w-8 h-8 text-amber-300 mx-auto mb-2 animate-bounce" />
                    <h5 className="text-xl sm:text-2xl font-bold font-serif text-white">
                      {surpriseGift.invitation.acceptedMessage}
                    </h5>
                    <p className="text-xs sm:text-sm text-pink-200 mt-2 font-medium">
                      {surpriseGift.invitation.closingSubtitle}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Replay Full Birthday Experience Button */}
            <div className="mt-8 flex flex-col items-center gap-2 pt-6 border-t border-white/10 w-full">
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
      {/* GIFT REVEAL MODAL                                                         */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeGiftModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveGiftModal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full glass-panel-glow p-6 sm:p-8 rounded-3xl border border-pink-400/50 shadow-[0_0_60px_rgba(236,72,153,0.5)] text-center cursor-default"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveGiftModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Big Emoji / Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500/20 to-purple-500/20 border border-pink-400/30 flex items-center justify-center mx-auto mb-4 text-4xl shadow-inner">
                {activeGiftModal.emoji}
              </div>

              <div className="text-xs uppercase tracking-widest text-pink-300 font-semibold mb-1">
                A Keepsake For Lalli
              </div>

              <h4 className="text-2xl font-bold font-serif gradient-text-pink">
                {activeGiftModal.title}
              </h4>

              {/* Message Box */}
              <div className="mt-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10 text-left">
                <p className="font-handwriting text-xl sm:text-2xl text-pink-100 leading-relaxed font-normal">
                  "{activeGiftModal.message}"
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 text-pink-300">
                  <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-400" />
                  Kept safe in memories
                </span>
                <button
                  onClick={() => setActiveGiftModal(null)}
                  className="px-4 py-1.5 rounded-full bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 font-semibold transition-colors cursor-pointer"
                >
                  Close ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
