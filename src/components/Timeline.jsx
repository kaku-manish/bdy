import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Sparkles, Music, Compass, HeartHandshake, Gift, ArrowRight } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

const iconMap = {
  Sparkles: Sparkles,
  Music: Music,
  Compass: Compass,
  HeartHandshake: HeartHandshake,
  Gift: Gift,
};

export default function Timeline({ onNext }) {
  return (
    <section className="relative min-h-screen py-16 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col items-center select-none">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-semibold mb-3"
        >
          <Clock className="w-4 h-4 text-purple-400" />
          <span>Our Journey Through Time</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold font-serif gradient-text-pink"
        >
          The Story of Us & {birthdayData.recipient.name} 💫
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-300 text-sm sm:text-base mt-3 font-sans leading-relaxed"
        >
          Every chapter with you has been a cherished memory. Here's a brief walk through the milestones we've shared.
        </motion.p>
      </div>

      {/* Timeline Container */}
      <div className="relative w-full max-w-3xl">
        {/* Central Glowing Line */}
        <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-pink-500 via-purple-500 to-amber-400 shadow-[0_0_15px_rgba(236,72,153,0.6)]" />

        <div className="space-y-10 sm:space-y-12">
          {birthdayData.timeline.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Sparkles;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12, duration: 0.5 }}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                  isEven ? 'sm:flex-row-reverse' : ''
                } gap-6 sm:gap-12 pl-14 sm:pl-0`}
              >
                {/* Node Milestone Icon */}
                <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#181129] border-2 border-pink-400 flex items-center justify-center text-pink-300 shadow-[0_0_20px_rgba(236,72,153,0.5)] z-10">
                  <IconComponent className="w-5 h-5 text-amber-300" />
                </div>

                {/* Content Card */}
                <div className={`w-full sm:w-1/2 ${isEven ? 'sm:text-right' : 'sm:text-left'}`}>
                  <div className="glass-panel-glow p-5 sm:p-6 rounded-3xl border border-pink-500/20 hover:border-pink-500/50 shadow-lg transition-all group">
                    <div className={`flex items-center gap-2 mb-2 ${isEven ? 'sm:justify-end' : 'justify-start'}`}>
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-500/20 text-pink-300 border border-pink-500/30">
                        {item.year}
                      </span>
                      <span className="text-xs text-amber-300 font-semibold">
                        {item.highlight}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-serif text-white group-hover:text-pink-300 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-300 mt-2 font-sans leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Continue Button */}
      {onNext && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16"
        >
          <button
            onClick={onNext}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 shadow-[0_4px_25px_rgba(236,72,153,0.4)] hover:shadow-[0_4px_35px_rgba(236,72,153,0.6)] transition-all cursor-pointer"
          >
            <span>Read Your Special Birthday Wishes</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      )}
    </section>
  );
}
