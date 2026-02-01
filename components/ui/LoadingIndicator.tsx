'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface LoadingIndicatorProps {
  accentColor?: string;
}

export function LoadingIndicator({ accentColor = '#0ea5e9' }: LoadingIndicatorProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsComplete(true), 500);
          return 100;
        }
        // Faster progress
        const increment = prev < 50 ? 12 : prev < 80 ? 8 : prev < 95 ? 4 : 2;
        return Math.min(prev + increment, 100);
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed top-4 right-4 z-[100] flex items-center gap-3"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          {/* Progress circle */}
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
              {/* Background circle */}
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="3"
              />
              {/* Progress circle */}
              <motion.circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke={accentColor}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 20}
                strokeDashoffset={2 * Math.PI * 20 * (1 - progress / 100)}
                style={{
                  filter: `drop-shadow(0 0 6px ${accentColor})`,
                }}
              />
            </svg>
            {/* Percentage text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-xs font-bold tabular-nums"
                style={{ color: accentColor }}
              >
                {progress}
              </span>
            </div>
          </div>

          {/* Loading text */}
          {progress < 100 && (
            <motion.span
              className="text-sm text-gray-400 hidden sm:block"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Loading...
            </motion.span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
