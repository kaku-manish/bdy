import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Welcome from './components/Welcome';
import BirthdayCake from './components/BirthdayCake';
import Memories from './components/Memories';
import HeartNotes from './components/HeartNotes';
import Timeline from './components/Timeline';
import BirthdayWishes from './components/BirthdayWishes';
import SurpriseGift from './components/SurpriseGift';
import MusicPlayer from './components/MusicPlayer';
import JourneyNav, { STAGES } from './components/JourneyNav';
import { birthdayData } from './data/birthdayData';

export default function App() {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [musicTrigger, setMusicTrigger] = useState(false);

  const startJourney = () => {
    setMusicTrigger(true);
    setCurrentStageIndex(1); // Proceed to Cake
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToStage = (index) => {
    setMusicTrigger(true);
    setCurrentStageIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const replayJourney = () => {
    setCurrentStageIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0B0A1A] text-slate-100 relative selection:bg-pink-500 selection:text-white overflow-x-hidden">
      {/* 1. Global Navigation Bar across all stages except Welcome initial state */}
      {currentStageIndex > 0 && (
        <JourneyNav
          currentStageIndex={currentStageIndex}
          onSelectStage={goToStage}
        />
      )}

      {/* 2. Persistent Background Music Player */}
      <MusicPlayer autoPlayTrigger={musicTrigger} />

      {/* 3. Main Stage Content with Smooth Transitions */}
      <main className="w-full pt-10 sm:pt-14 pb-20 sm:pb-24">
        <AnimatePresence mode="wait">
          {currentStageIndex === 0 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
              transition={{ duration: 0.5 }}
            >
              <Welcome onStart={startJourney} />
            </motion.div>
          )}

          {currentStageIndex === 1 && (
            <motion.div
              key="cake"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.5 }}
            >
              <BirthdayCake onNext={() => goToStage(2)} />
            </motion.div>
          )}

          {currentStageIndex === 2 && (
            <motion.div
              key="memories"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.5 }}
            >
              <Memories onNext={() => goToStage(3)} />
            </motion.div>
          )}

          {currentStageIndex === 3 && (
            <motion.div
              key="notes"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.5 }}
            >
              <HeartNotes onNext={() => goToStage(4)} />
            </motion.div>
          )}

          {currentStageIndex === 4 && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.5 }}
            >
              <Timeline onNext={() => goToStage(5)} />
            </motion.div>
          )}

          {currentStageIndex === 5 && (
            <motion.div
              key="wishes"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.5 }}
            >
              <BirthdayWishes onNext={() => goToStage(6)} />
            </motion.div>
          )}

          {currentStageIndex === 6 && (
            <motion.div
              key="gift"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <SurpriseGift onReplay={replayJourney} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
