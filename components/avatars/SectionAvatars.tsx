'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface AvatarProps {
  isVisible: boolean;
  onComplete?: () => void;
}

// Corporate Man Avatar for Experience
export function CorporateManAvatar({ isVisible, onComplete }: AvatarProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative"
            initial={{ scale: 0, rotate: -180, y: 200 }}
            animate={{ scale: 1, rotate: 0, y: 0 }}
            exit={{ scale: 0, rotate: 180, y: -200 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            onAnimationComplete={onComplete}
          >
            {/* Corporate Man SVG */}
            <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-2xl">
              {/* Body/Suit */}
              <motion.path
                d="M100 180 L60 180 L50 120 L70 100 L100 95 L130 100 L150 120 L140 180 Z"
                fill="#1e293b"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              />
              {/* Tie */}
              <motion.path
                d="M100 95 L95 120 L100 145 L105 120 Z"
                fill="#ef4444"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.3 }}
              />
              {/* Shirt collar */}
              <path d="M85 95 L100 105 L115 95 L110 90 L100 95 L90 90 Z" fill="white" />
              {/* Head */}
              <motion.circle
                cx="100"
                cy="60"
                r="35"
                fill="#fbbf24"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              />
              {/* Hair */}
              <motion.path
                d="M70 50 Q100 20 130 50 Q125 35 100 30 Q75 35 70 50"
                fill="#1e293b"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              />
              {/* Eyes */}
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <circle cx="85" cy="55" r="5" fill="#1e293b" />
                <circle cx="115" cy="55" r="5" fill="#1e293b" />
                <circle cx="87" cy="53" r="2" fill="white" />
                <circle cx="117" cy="53" r="2" fill="white" />
              </motion.g>
              {/* Smile */}
              <motion.path
                d="M85 70 Q100 85 115 70"
                stroke="#1e293b"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.6 }}
              />
              {/* Briefcase */}
              <motion.g
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
              >
                <rect x="145" y="130" width="40" height="30" rx="3" fill="#78350f" />
                <rect x="160" y="125" width="10" height="8" rx="2" fill="#92400e" />
                <rect x="155" y="140" width="20" height="3" rx="1" fill="#fbbf24" />
              </motion.g>
            </svg>
            {/* Sparkles */}
            <motion.div
              className="absolute -top-4 -right-4"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: [0, 1.2, 1], rotate: 360 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <span className="text-4xl">✨</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Plumber Avatar for Skills
export function PlumberAvatar({ isVisible, onComplete }: AvatarProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative"
            initial={{ scale: 0, x: -200 }}
            animate={{ scale: 1, x: 0 }}
            exit={{ scale: 0, x: 200 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            onAnimationComplete={onComplete}
          >
            <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-2xl">
              {/* Overalls */}
              <motion.path
                d="M100 180 L55 180 L50 110 L75 95 L100 90 L125 95 L150 110 L145 180 Z"
                fill="#3b82f6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              />
              {/* Overall straps */}
              <path d="M75 95 L80 130 L90 130 L85 95" fill="#2563eb" />
              <path d="M125 95 L120 130 L110 130 L115 95" fill="#2563eb" />
              {/* Pocket */}
              <rect x="90" y="140" width="20" height="15" rx="2" fill="#1d4ed8" />
              {/* Head */}
              <motion.circle
                cx="100"
                cy="55"
                r="35"
                fill="#fbbf24"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              />
              {/* Cap */}
              <motion.g
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
              >
                <ellipse cx="100" cy="30" rx="40" ry="15" fill="#ef4444" />
                <rect x="60" y="25" width="80" height="15" fill="#ef4444" />
                <rect x="95" y="15" width="30" height="15" rx="2" fill="#dc2626" />
              </motion.g>
              {/* Mustache */}
              <motion.path
                d="M80 68 Q90 75 100 68 Q110 75 120 68"
                fill="#78350f"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5 }}
              />
              {/* Eyes */}
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <circle cx="85" cy="50" r="6" fill="white" />
                <circle cx="115" cy="50" r="6" fill="white" />
                <circle cx="85" cy="50" r="3" fill="#1e293b" />
                <circle cx="115" cy="50" r="3" fill="#1e293b" />
              </motion.g>
              {/* Wrench */}
              <motion.g
                initial={{ rotate: -90, x: 50 }}
                animate={{ rotate: 0, x: 0 }}
                transition={{ delay: 0.4, type: 'spring' }}
              >
                <rect x="150" y="100" width="8" height="60" rx="2" fill="#6b7280" />
                <circle cx="154" cy="100" r="15" fill="none" stroke="#6b7280" strokeWidth="8" />
              </motion.g>
            </svg>
            <motion.div
              className="absolute -top-4 -left-4"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-4xl">🔧</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Pigeon Avatar for Contact
export function PigeonAvatar({ isVisible, onComplete }: AvatarProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative"
            initial={{ scale: 0, y: -200, rotate: -30 }}
            animate={{ scale: 1, y: 0, rotate: 0 }}
            exit={{ scale: 0, y: -200, rotate: 30 }}
            transition={{ type: 'spring', damping: 12, stiffness: 100 }}
            onAnimationComplete={onComplete}
          >
            <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-2xl">
              {/* Body */}
              <motion.ellipse
                cx="100"
                cy="120"
                rx="50"
                ry="40"
                fill="#9ca3af"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              {/* Wing */}
              <motion.path
                d="M60 100 Q30 120 50 150 Q80 140 70 110 Z"
                fill="#6b7280"
                initial={{ rotate: 30 }}
                animate={{ rotate: [30, -10, 30] }}
                transition={{ repeat: 2, duration: 0.3 }}
              />
              <motion.path
                d="M140 100 Q170 120 150 150 Q120 140 130 110 Z"
                fill="#6b7280"
                initial={{ rotate: -30 }}
                animate={{ rotate: [-30, 10, -30] }}
                transition={{ repeat: 2, duration: 0.3 }}
              />
              {/* Head */}
              <motion.circle
                cx="100"
                cy="70"
                r="30"
                fill="#d1d5db"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              />
              {/* Neck shimmer */}
              <motion.ellipse
                cx="100"
                cy="90"
                rx="20"
                ry="10"
                fill="#8b5cf6"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.7] }}
                transition={{ delay: 0.4, duration: 0.5 }}
              />
              {/* Beak */}
              <motion.path
                d="M100 75 L90 85 L100 82 L110 85 Z"
                fill="#f59e0b"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              />
              {/* Eyes */}
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <circle cx="88" cy="65" r="8" fill="#f97316" />
                <circle cx="112" cy="65" r="8" fill="#f97316" />
                <circle cx="88" cy="65" r="4" fill="#1e293b" />
                <circle cx="112" cy="65" r="4" fill="#1e293b" />
              </motion.g>
              {/* Feet */}
              <motion.g
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <path d="M85 160 L80 175 M85 160 L85 175 M85 160 L90 175" stroke="#f97316" strokeWidth="3" />
                <path d="M115 160 L110 175 M115 160 L115 175 M115 160 L120 175" stroke="#f97316" strokeWidth="3" />
              </motion.g>
              {/* Letter */}
              <motion.g
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.6, type: 'spring' }}
              >
                <rect x="95" y="78" width="30" height="20" fill="white" rx="2" />
                <path d="M95 78 L110 90 L125 78" stroke="#dc2626" strokeWidth="2" fill="none" />
              </motion.g>
            </svg>
            <motion.div
              className="absolute top-0 right-0"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.7 }}
            >
              <span className="text-3xl">💌</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Scientist Avatar for Projects
export function ScientistAvatar({ isVisible, onComplete }: AvatarProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative"
            initial={{ scale: 0, rotate: 360 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -360 }}
            transition={{ type: 'spring', damping: 15, stiffness: 150 }}
            onAnimationComplete={onComplete}
          >
            <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-2xl">
              {/* Lab coat */}
              <motion.path
                d="M100 180 L50 180 L45 100 L70 90 L100 85 L130 90 L155 100 L150 180 Z"
                fill="white"
                stroke="#e5e7eb"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              />
              {/* Coat buttons */}
              <circle cx="100" cy="110" r="4" fill="#1e293b" />
              <circle cx="100" cy="130" r="4" fill="#1e293b" />
              <circle cx="100" cy="150" r="4" fill="#1e293b" />
              {/* Head */}
              <motion.circle
                cx="100"
                cy="50"
                r="35"
                fill="#fbbf24"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              />
              {/* Wild hair */}
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <path d="M65 40 Q60 20 75 25 Q70 10 90 20 Q95 5 110 20 Q130 10 125 25 Q140 20 135 40" fill="#9ca3af" />
              </motion.g>
              {/* Glasses */}
              <motion.g
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <circle cx="80" cy="48" r="15" fill="none" stroke="#1e293b" strokeWidth="3" />
                <circle cx="120" cy="48" r="15" fill="none" stroke="#1e293b" strokeWidth="3" />
                <line x1="95" y1="48" x2="105" y2="48" stroke="#1e293b" strokeWidth="3" />
                <line x1="65" y1="48" x2="55" y2="45" stroke="#1e293b" strokeWidth="3" />
                <line x1="135" y1="48" x2="145" y2="45" stroke="#1e293b" strokeWidth="3" />
                {/* Lens reflection */}
                <circle cx="75" cy="45" r="3" fill="white" opacity="0.5" />
                <circle cx="115" cy="45" r="3" fill="white" opacity="0.5" />
              </motion.g>
              {/* Eyes behind glasses */}
              <circle cx="80" cy="50" r="3" fill="#1e293b" />
              <circle cx="120" cy="50" r="3" fill="#1e293b" />
              {/* Smile */}
              <path d="M90 65 Q100 75 110 65" stroke="#1e293b" strokeWidth="2" fill="none" />
              {/* Flask */}
              <motion.g
                initial={{ x: 50, rotate: 45, opacity: 0 }}
                animate={{ x: 0, rotate: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                <path d="M155 90 L160 90 L165 130 L145 130 L150 90 Z" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="2" />
                <ellipse cx="155" cy="120" rx="8" ry="5" fill="#22c55e" />
                <motion.g
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <circle cx="152" cy="115" r="2" fill="#22c55e" opacity="0.5" />
                  <circle cx="158" cy="112" r="1.5" fill="#22c55e" opacity="0.5" />
                </motion.g>
              </motion.g>
            </svg>
            <motion.div
              className="absolute -top-2 left-1/2 -translate-x-1/2"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-3xl">🧪</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Graduate Avatar for Education
export function GraduateAvatar({ isVisible, onComplete }: AvatarProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative"
            initial={{ scale: 0, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: -100 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            onAnimationComplete={onComplete}
          >
            <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-2xl">
              {/* Gown */}
              <motion.path
                d="M100 180 L45 180 L40 100 L70 85 L100 80 L130 85 L160 100 L155 180 Z"
                fill="#1e293b"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              />
              {/* Gown details */}
              <path d="M70 85 L75 180" stroke="#374151" strokeWidth="2" />
              <path d="M130 85 L125 180" stroke="#374151" strokeWidth="2" />
              {/* Head */}
              <motion.circle
                cx="100"
                cy="50"
                r="32"
                fill="#fbbf24"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              />
              {/* Graduation cap */}
              <motion.g
                initial={{ y: -50, rotate: -20 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ delay: 0.3, type: 'spring' }}
              >
                <polygon points="100,5 140,25 100,35 60,25" fill="#1e293b" />
                <rect x="75" y="25" width="50" height="8" fill="#1e293b" />
                {/* Tassel */}
                <motion.g
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <line x1="135" y1="20" x2="155" y2="40" stroke="#fbbf24" strokeWidth="3" />
                  <circle cx="155" cy="45" r="5" fill="#fbbf24" />
                </motion.g>
              </motion.g>
              {/* Eyes */}
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <circle cx="88" cy="48" r="5" fill="#1e293b" />
                <circle cx="112" cy="48" r="5" fill="#1e293b" />
                <circle cx="90" cy="46" r="2" fill="white" />
                <circle cx="114" cy="46" r="2" fill="white" />
              </motion.g>
              {/* Happy smile */}
              <motion.path
                d="M85 60 Q100 75 115 60"
                stroke="#1e293b"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5 }}
              />
              {/* Diploma */}
              <motion.g
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                <rect x="140" y="110" width="40" height="30" rx="3" fill="#fef3c7" />
                <line x1="150" y1="118" x2="170" y2="118" stroke="#92400e" strokeWidth="2" />
                <line x1="150" y1="125" x2="170" y2="125" stroke="#92400e" strokeWidth="2" />
                <line x1="150" y1="132" x2="165" y2="132" stroke="#92400e" strokeWidth="2" />
                <circle cx="175" cy="135" r="5" fill="#dc2626" />
              </motion.g>
            </svg>
            <motion.div
              className="absolute -top-4 right-0"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.7 }}
            >
              <span className="text-3xl">🎓</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Knight Avatar for Certifications
export function KnightAvatar({ isVisible, onComplete }: AvatarProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative"
            initial={{ scale: 0, x: 200 }}
            animate={{ scale: 1, x: 0 }}
            exit={{ scale: 0, x: -200 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            onAnimationComplete={onComplete}
          >
            <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-2xl">
              {/* Armor body */}
              <motion.path
                d="M100 180 L55 180 L50 110 L75 95 L100 90 L125 95 L150 110 L145 180 Z"
                fill="#6b7280"
                stroke="#9ca3af"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              />
              {/* Chest plate */}
              <ellipse cx="100" cy="130" rx="30" ry="25" fill="#4b5563" />
              {/* Emblem */}
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <polygon points="100,115 108,125 105,135 95,135 92,125" fill="#fbbf24" />
              </motion.g>
              {/* Helmet */}
              <motion.g
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <ellipse cx="100" cy="55" rx="38" ry="40" fill="#4b5563" />
                {/* Visor */}
                <rect x="70" y="45" width="60" height="25" rx="3" fill="#1e293b" />
                {/* Eye slits */}
                <rect x="75" y="52" width="15" height="4" fill="#0ea5e9" />
                <rect x="110" y="52" width="15" height="4" fill="#0ea5e9" />
                {/* Plume */}
                <motion.path
                  d="M100 15 Q90 25 95 40 Q100 20 105 40 Q110 25 100 15"
                  fill="#dc2626"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              </motion.g>
              {/* Shield */}
              <motion.g
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                <path d="M155 100 L185 100 L185 145 L170 165 L155 145 Z" fill="#6b7280" stroke="#9ca3af" strokeWidth="2" />
                <path d="M165 110 L175 110 L175 140 L170 150 L165 140 Z" fill="#0ea5e9" />
              </motion.g>
              {/* Sword */}
              <motion.g
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.6, type: 'spring' }}
              >
                <rect x="25" y="95" width="5" height="80" fill="#9ca3af" />
                <rect x="15" y="90" width="25" height="10" rx="2" fill="#fbbf24" />
                <polygon points="27.5,95 20,80 35,80" fill="#e5e7eb" />
              </motion.g>
            </svg>
            <motion.div
              className="absolute -top-2 left-1/2 -translate-x-1/2"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.7 }}
            >
              <span className="text-3xl">⚔️</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Avatar wrapper component
interface SectionAvatarProps {
  section: string;
  isVisible: boolean;
  onComplete: () => void;
}

export function SectionAvatar({ section, isVisible, onComplete }: SectionAvatarProps) {
  const avatarMap: Record<string, React.ComponentType<AvatarProps>> = {
    experience: CorporateManAvatar,
    skills: PlumberAvatar,
    contact: PigeonAvatar,
    projects: ScientistAvatar,
    education: GraduateAvatar,
    certifications: KnightAvatar,
  };

  const AvatarComponent = avatarMap[section];
  
  if (!AvatarComponent) return null;

  return <AvatarComponent isVisible={isVisible} onComplete={onComplete} />;
}
