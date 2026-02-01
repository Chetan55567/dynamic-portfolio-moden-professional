'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
  accentColor?: string;
}

export function LoadingScreen({ onComplete, accentColor = '#0ea5e9' }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          setTimeout(onComplete, 500);
          return 100;
        }
        // Faster progress at start, slower near end
        const increment = prev < 50 ? 8 : prev < 80 ? 5 : prev < 95 ? 2 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-gray-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Animated background circles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full opacity-10"
                style={{
                  width: 200 + i * 100,
                  height: 200 + i * 100,
                  border: `2px solid ${accentColor}`,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          {/* Logo / Name */}
          <motion.div
            className="relative z-10 mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-24 h-24 rounded-full flex items-center justify-center border-4"
              style={{ borderColor: accentColor }}
              animate={{
                boxShadow: [
                  `0 0 20px ${accentColor}40`,
                  `0 0 40px ${accentColor}60`,
                  `0 0 20px ${accentColor}40`,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.span
                className="text-4xl font-bold"
                style={{ color: accentColor }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⚡
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Progress bar container */}
          <div className="relative z-10 w-64 md:w-80">
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: accentColor }}
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            {/* Percentage text */}
            <motion.div
              className="mt-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span
                className="text-4xl md:text-5xl font-bold tabular-nums"
                style={{ color: accentColor }}
              >
                {progress}
              </span>
              <span className="text-2xl md:text-3xl text-gray-500">%</span>
            </motion.div>

            {/* Loading text */}
            <motion.p
              className="mt-2 text-center text-gray-500 text-sm"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {progress < 30 && 'Initializing...'}
              {progress >= 30 && progress < 60 && 'Loading assets...'}
              {progress >= 60 && progress < 90 && 'Almost ready...'}
              {progress >= 90 && 'Welcome!'}
            </motion.p>
          </div>

          {/* Animated dots at bottom */}
          <div className="absolute bottom-12 flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: accentColor }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
