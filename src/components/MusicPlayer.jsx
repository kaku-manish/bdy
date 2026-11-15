import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Disc3, Sparkles } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function MusicPlayer({ autoPlayTrigger }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSynthPlaying, setIsSynthPlaying] = useState(false);

  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const synthTimerRef = useRef(null);

  // Web Audio API Synthesizer fallback in case local playback is interrupted
  const playChimeMelody = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const melody = [
        { note: 261.63, dur: 0.35 },
        { note: 261.63, dur: 0.35 },
        { note: 293.66, dur: 0.7 },
        { note: 261.63, dur: 0.7 },
        { note: 349.23, dur: 0.7 },
        { note: 329.63, dur: 1.4 },

        { note: 261.63, dur: 0.35 },
        { note: 261.63, dur: 0.35 },
        { note: 293.66, dur: 0.7 },
        { note: 261.63, dur: 0.7 },
        { note: 392.00, dur: 0.7 },
        { note: 349.23, dur: 1.4 },
      ];

      let noteIndex = 0;
      const playNextNote = () => {
        if (!isSynthPlaying && noteIndex > 0) return;
        const current = melody[noteIndex % melody.length];
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(current.note, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + current.dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + current.dur);

        noteIndex++;
        synthTimerRef.current = setTimeout(playNextNote, current.dur * 1000);
      };

      setIsSynthPlaying(true);
      playNextNote();
    } catch {
      // Audio context error ignore
    }
  };

  const stopChimeMelody = () => {
    setIsSynthPlaying(false);
    if (synthTimerRef.current) {
      clearTimeout(synthTimerRef.current);
    }
  };

  // Start music when trigger is received from user interaction
  useEffect(() => {
    if (autoPlayTrigger) {
      const playPromise = audioRef.current?.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            playChimeMelody();
            setIsPlaying(true);
          });
      }
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      stopChimeMelody();
      setIsPlaying(false);
    } else {
      if (audioRef.current && !isSynthPlaying) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            playChimeMelody();
            setIsPlaying(true);
          });
      } else {
        playChimeMelody();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={birthdayData.music.src}
        loop
        preload="auto"
      />

      {/* Floating Bottom Music Bar */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 select-none"
      >
        <div className="relative group glass-panel-glow p-2.5 sm:p-3 rounded-full sm:rounded-2xl flex items-center gap-3 border border-pink-500/30 shadow-[0_0_25px_rgba(236,72,153,0.35)] backdrop-blur-xl">
          {/* Rotating Vinyl Disc */}
          <div
            onClick={togglePlay}
            className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full cursor-pointer overflow-hidden flex-shrink-0 flex items-center justify-center bg-gradient-to-tr from-slate-950 via-slate-900 to-pink-950 border border-pink-400/40 shadow-inner"
          >
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              className="w-full h-full flex items-center justify-center"
            >
              <Disc3 className="w-9 h-9 sm:w-10 sm:h-10 text-pink-400 group-hover:text-pink-300 transition-colors" />
              <div className="absolute w-3 h-3 rounded-full bg-pink-500 border border-white" />
            </motion.div>
          </div>

          {/* Song Info (Desktop & Tablet) */}
          <div className="hidden sm:flex flex-col max-w-[170px] text-left">
            <span className="text-xs font-bold text-white truncate flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300 flex-shrink-0" />
              {birthdayData.music.title}
            </span>
            <span className="text-[10px] text-pink-300 truncate">
              {birthdayData.music.artist}
            </span>

            {/* Sound Wave Equalizer animation */}
            <div className="flex items-end gap-0.5 h-3 mt-1">
              {[0.4, 0.9, 0.5, 0.8, 0.3].map((val, i) => (
                <motion.span
                  key={i}
                  animate={{
                    height: isPlaying ? ['3px', '12px', '4px', '10px'] : '3px',
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8 + i * 0.15,
                    ease: 'easeInOut',
                  }}
                  className="w-1 bg-pink-400 rounded-full"
                />
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              className="p-2 sm:p-2.5 rounded-full bg-pink-500/30 hover:bg-pink-500 text-white transition-all cursor-pointer"
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
            </button>

            {/* Mute / Unmute */}
            <button
              onClick={toggleMute}
              className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 transition-all cursor-pointer"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
