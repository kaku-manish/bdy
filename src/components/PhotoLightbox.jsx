import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar, Tag, Heart } from 'lucide-react';

export default function PhotoLightbox({ photos, currentIndex, onClose, onPrev, onNext }) {
  const currentPhoto = photos[currentIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!currentPhoto) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl select-none"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition-all border border-white/10 backdrop-blur-md cursor-pointer"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Previous Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-3 sm:left-6 z-50 p-3 rounded-full bg-white/10 hover:bg-pink-500/80 text-white transition-all border border-white/15 backdrop-blur-md cursor-pointer group"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-3 sm:right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-pink-500/80 text-white transition-all border border-white/15 backdrop-blur-md cursor-pointer group"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Main Lightbox Polaroid Container */}
        <motion.div
          key={currentPhoto.id}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-2xl w-full bg-slate-900/90 rounded-3xl border border-pink-500/30 p-4 sm:p-6 shadow-[0_0_60px_rgba(236,72,153,0.35)] overflow-hidden flex flex-col items-center"
        >
          {/* Polaroid Image Box */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center border border-white/10">
            {currentPhoto.image ? (
              <img
                src={currentPhoto.image}
                alt={currentPhoto.title}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
                className="w-full h-full object-cover"
              />
            ) : null}

            {/* Stylized aesthetic fallback if image file not on disk */}
            <div
              className={`w-full h-full bg-gradient-to-tr ${currentPhoto.fallbackGradient || 'from-pink-600 via-purple-600 to-amber-400'} flex flex-col items-center justify-center text-center p-6 text-white`}
              style={{ display: 'none' }}
            >
              <Heart className="w-12 h-12 fill-white/80 text-white mb-3 animate-pulse" />
              <h4 className="text-xl font-bold font-serif">{currentPhoto.title}</h4>
              <p className="text-xs text-white/80 mt-1 max-w-xs">{currentPhoto.caption}</p>
            </div>
          </div>

          {/* Caption & Metadata */}
          <div className="w-full mt-4 text-left">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                <Tag className="w-3 h-3" /> {currentPhoto.tag}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-purple-300 font-medium">
                <Calendar className="w-3 h-3" /> {currentPhoto.date}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-serif gradient-text-pink mt-2">
              {currentPhoto.title}
            </h3>

            <p className="text-slate-200 text-sm sm:text-base mt-1.5 leading-relaxed font-sans">
              {currentPhoto.caption}
            </p>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-400 border-t border-white/10 pt-3">
              <span>Photo {currentIndex + 1} of {photos.length}</span>
              <span className="text-pink-300 italic">Use ← → arrow keys to navigate</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
