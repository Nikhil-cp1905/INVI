/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  MapPin, 
} from 'lucide-react';

// 1. Ensure img.jpeg is in the same folder as this App.tsx file
import invitationImg from './img.jpeg';

// --- Constants ---

// --- Constants ---

const EVENT_DATE = new Date('2026-05-31T10:30:00');
const VENUE_NAME = "Vadayar Samooham Community Hall";

// This is the direct search link for the venue in Vaikom
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Vadayar+Samooham+Community+Hall+Vaikom+Kottayam";
// --- Components ---

const CountdownTimer = () => {
  const calculateTimeLeft = useCallback(() => {
    const difference = +EVENT_DATE - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }, []);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <div className="flex justify-center gap-4 sm:gap-6">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          <div className="text-2xl sm:text-3xl font-display font-bold text-[#1a4d2e]">
            {value.toString().padStart(2, '0')}
          </div>
          <div className="text-[10px] uppercase tracking-widest text-stone-500">
            {unit}
          </div>
        </div>
      ))}
    </div>
  );
};

const Envelope = ({ onOpen, isOpen }: { onOpen: () => void, isOpen: boolean }) => {
  return (
    <div className="relative w-full h-[100dvh] bg-[#1a4d2e] flex items-center justify-center overflow-hidden perspective-1000">
      <div className="absolute inset-0 opacity-[0.1] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 cursor-pointer group preserve-3d"
        onClick={!isOpen ? onOpen : undefined}
      >
        <div className="relative w-[320px] h-[220px] sm:w-[540px] sm:h-[380px] bg-[#fdfaf5] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-stone-300 preserve-3d">
          
          <motion.div 
            className="absolute inset-4 bg-white shadow-md z-10 p-2 flex items-center justify-center border border-gold-200"
            animate={isOpen ? { y: -350, opacity: 0 } : { y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
             <img src={invitationImg} alt="Preview" className="w-full h-full object-contain opacity-50" />
          </motion.div>

          <motion.div 
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#f9f5f0] origin-top z-30"
            style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}
            animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 border-b border-stone-200" />
          </motion.div>

          <div className="absolute inset-0 z-20 pointer-events-none">
             <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#fdfaf5] border-r border-stone-200" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }} />
             <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#fdfaf5] border-l border-stone-200" style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }} />
             <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#f5f1ea] border-t border-stone-200 shadow-inner" style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }} />
          </div>

          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
            animate={isOpen ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
          >
            <div className="w-16 h-16 bg-[#b8860b] rounded-full shadow-xl flex items-center justify-center border-2 border-[#d4af37]">
               <Heart className="text-white w-8 h-8 fill-red-500/20" />
            </div>
          </motion.div>
        </div>

        {!isOpen && (
          <motion.div className="mt-12 text-center">
            <p className="font-serif italic text-[#d4af37] text-xl">An Invitation Awaits You</p>
            <div className="flex items-center justify-center gap-4 mt-2">
              <div className="h-px w-8 bg-[#d4af37]" />
              <p className="text-[10px] uppercase tracking-[0.5em] text-white font-bold animate-pulse">Tap to Open</p>
              <div className="h-px w-8 bg-[#d4af37]" />
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

const InvitationContent = () => {
  return (
    <div className="min-h-screen bg-[#1a4d2e] p-2 sm:p-12 flex flex-col items-center justify-center overflow-x-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="max-w-2xl w-full bg-[#fdfaf5] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative flex flex-col items-center"
      >
        <div className="relative w-full">
           <img 
             src={invitationImg} 
             alt="Wedding Invitation" 
             className="w-full h-auto block shadow-lg"
           />
           <div className="absolute inset-0 pointer-events-none border-[1px] border-[#d4af37] m-2 opacity-30" />
        </div>

        <div className="w-full bg-[#fdfaf5] p-8 text-center border-t border-stone-200 border-x-0 relative z-10">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#fdfaf5] px-6 py-2 border border-stone-200 rounded-full shadow-sm">
             <Heart className="w-6 h-6 text-[#b8860b] fill-stone-50" />
          </div>

          <div className="mb-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 mb-6">Ceremony Countdown</p>
            <CountdownTimer />
          </div>
          
          <div className="flex flex-col items-center gap-6">
            <h3 className="font-display text-xl sm:text-2xl text-[#1a4d2e]">{VENUE_NAME}</h3>
            <motion.a 
              href={MAPS_URL} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05, backgroundColor: "#064e3b" }} whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#1a4d2e] text-white rounded-sm text-xs uppercase tracking-[0.2em] font-bold shadow-2xl transition-all"
            >
              Get Directions <MapPin className="w-4 h-4" />
            </motion.a>
          </div>

          <div className="mt-12 opacity-30 flex items-center justify-center gap-4">
             <div className="h-px w-10 bg-[#b8860b]" />
             <p className="font-serif italic text-stone-800 text-xs">Auspicious Celebration</p>
             <div className="h-px w-10 bg-[#b8860b]" />
          </div>
        </div>
      </motion.div>
      
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 1 }}
         className="mt-8 text-[#d4af37] text-[10px] uppercase tracking-[0.5em] font-bold"
      >
        #RahulWedsGauri • 2026
      </motion.div>
    </div>
  );
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowInvitation(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div className="antialiased selection:bg-[#1a4d2e] selection:text-white">
      <AnimatePresence mode="wait">
        {!showInvitation ? (
          <motion.div 
            key="envelope-view"
            className="fixed inset-0 z-50"
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
          >
            <Envelope onOpen={() => setIsOpen(true)} isOpen={isOpen} />
          </motion.div>
        ) : (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <InvitationContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}