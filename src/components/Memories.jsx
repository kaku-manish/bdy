import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart, ArrowRight, Eye } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import PhotoLightbox from './PhotoLightbox';

export default function Memories({ onNext }) {
  const [photos] = useState(birthdayData.memories);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);

  return (
    <section className="relative min-h-screen py-16 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col items-center select-none">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs sm:text-sm font-semibold mb-3"
        >
          <Camera className="w-4 h-4 text-pink-400" />
          <span>Our Beautiful Memories & Moments</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold font-serif gradient-text-pink"
        >
          Moments With {birthdayData.recipient.name} 📸
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-300 text-sm sm:text-base mt-3 font-sans leading-relaxed"
        >
          A collection of unforgettable smiles, spontaneous adventures, and memories etched in time. Click any photo to enlarge.
        </motion.p>
      </div>

      {/* Polaroid Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 w-full">
        {photos.map((photo, index) => {
          // Subtle natural polaroid tilt
          const tilts = [-2, 1.5, -1, 2, -1.8, 1.2, -2.2, 1.8, -1.5, 2.5];
          const tilt = tilts[index % tilts.length];

          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.4 }}
              whileHover={{ 
                scale: 1.04, 
                rotate: 0, 
                zIndex: 20,
                boxShadow: '0 20px 40px rgba(236, 72, 153, 0.35)' 
              }}
              style={{ transform: `rotate(${tilt}deg)` }}
              onClick={() => setActiveLightboxIndex(photos.findIndex((p) => p.id === photo.id))}
              className="group relative bg-[#1E1B2E] p-4 pb-6 rounded-2xl border border-pink-500/20 shadow-xl cursor-pointer transition-all flex flex-col"
            >
              {/* Tape Effect on Top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-white/20 backdrop-blur-md rounded-sm border border-white/30 rotate-2 pointer-events-none" />

              {/* Photo Frame Container */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-white/10 flex items-center justify-center">
                {/* Real Image */}
                <img
                  src={photo.image}
                  alt={photo.title}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.nextElementSibling) {
                      e.target.nextElementSibling.style.display = 'flex';
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Aesthetic Gradient Fallback if photo not found */}
                <div
                  className={`hidden w-full h-full bg-gradient-to-tr ${photo.fallbackGradient || 'from-pink-600 via-purple-600 to-amber-400'} flex-col items-center justify-center text-center p-4 text-white relative`}
                >
                  <Heart className="w-10 h-10 fill-white/80 text-white mb-2 animate-pulse" />
                  <span className="text-xs uppercase tracking-widest font-semibold text-white/90">
                    {photo.tag}
                  </span>
                  <span className="text-sm font-serif font-bold text-white mt-1">
                    {photo.title}
                  </span>
                </div>

                {/* Hover Overlay with View Icon */}
                <div className="absolute inset-0 bg-pink-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                  <span className="p-2.5 rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/30 transition-colors flex items-center gap-1.5 text-xs font-semibold">
                    <Eye className="w-4 h-4" /> View Photo
                  </span>
                </div>
              </div>

              {/* Polaroid Caption Section */}
              <div className="mt-3.5 flex flex-col flex-grow">
                <div className="flex items-center justify-between text-[11px] text-pink-300 font-medium">
                  <span className="px-2 py-0.5 rounded-md bg-pink-500/15 border border-pink-500/20">
                    {photo.tag}
                  </span>
                  <span className="text-purple-300">{photo.date}</span>
                </div>

                <h3 className="font-serif font-bold text-base sm:text-lg text-white mt-2 group-hover:text-pink-300 transition-colors">
                  {photo.title}
                </h3>

                <p className="font-handwriting text-base text-slate-300 line-clamp-2 mt-1 leading-tight">
                  "{photo.caption}"
                </p>

                {/* Bottom Bar */}
                <div className="mt-auto pt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/5">
                  <span className="italic text-pink-300/80">Click to view full photo</span>
                  <Eye className="w-3.5 h-3.5 text-pink-400" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <PhotoLightbox
          photos={photos}
          currentIndex={activeLightboxIndex}
          onClose={() => setActiveLightboxIndex(null)}
          onPrev={() =>
            setActiveLightboxIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1))
          }
          onNext={() =>
            setActiveLightboxIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0))
          }
        />
      )}

      {/* Next Step Button */}
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
            <span>Continue To Notes From Heart</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      )}
    </section>
  );
}
