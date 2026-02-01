'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SectionAvatarPopupProps {
  section: string;
  isVisible: boolean;
}

// Corporate Man for Experience - enters from left with briefcase
function CorporateMan() {
  return (
    <motion.svg
      viewBox="0 0 160 200"
      className="w-32 h-40 md:w-40 md:h-48"
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -200, opacity: 0 }}
      transition={{ type: 'spring', damping: 15 }}
    >
      {/* Suit body */}
      <rect x="45" y="90" width="70" height="80" rx="8" fill="#1e293b" />
      <polygon points="80,90 60,110 100,110" fill="#1e293b" />
      
      {/* White shirt */}
      <polygon points="80,90 70,105 90,105" fill="white" />
      
      {/* Tie */}
      <motion.polygon
        points="80,95 75,120 80,135 85,120"
        fill="#ef4444"
        animate={{ rotate: [0, -5, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Head */}
      <circle cx="80" cy="55" r="32" fill="#fbbf24" />
      
      {/* Hair */}
      <path d="M50 45 Q80 15 110 45 Q105 30 80 25 Q55 30 50 45" fill="#1e293b" />
      
      {/* Eyes */}
      <motion.g animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}>
        <circle cx="68" cy="50" r="5" fill="#1e293b" />
        <circle cx="92" cy="50" r="5" fill="#1e293b" />
      </motion.g>
      <circle cx="70" cy="48" r="2" fill="white" />
      <circle cx="94" cy="48" r="2" fill="white" />
      
      {/* Smile */}
      <path d="M65 68 Q80 82 95 68" fill="none" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      
      {/* Glasses */}
      <rect x="58" y="42" width="18" height="14" rx="3" fill="none" stroke="#374151" strokeWidth="2" />
      <rect x="84" y="42" width="18" height="14" rx="3" fill="none" stroke="#374151" strokeWidth="2" />
      <line x1="76" y1="49" x2="84" y2="49" stroke="#374151" strokeWidth="2" />
      
      {/* Arms */}
      <ellipse cx="35" cy="115" rx="10" ry="18" fill="#1e293b" />
      <circle cx="35" cy="135" r="8" fill="#fbbf24" />
      
      <motion.g
        animate={{ rotate: [-10, 10, -10] }}
        transition={{ duration: 1, repeat: Infinity }}
        style={{ transformOrigin: '125px 115px' }}
      >
        <ellipse cx="125" cy="115" rx="10" ry="18" fill="#1e293b" />
        <circle cx="125" cy="135" r="8" fill="#fbbf24" />
      </motion.g>
      
      {/* Briefcase */}
      <motion.g
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        <rect x="120" y="140" width="35" height="28" rx="4" fill="#78350f" />
        <rect x="132" y="135" width="11" height="8" rx="2" fill="#92400e" />
        <line x1="127" y1="152" x2="148" y2="152" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
      </motion.g>
      
      {/* Legs */}
      <rect x="55" y="165" width="15" height="30" rx="3" fill="#374151" />
      <rect x="90" y="165" width="15" height="30" rx="3" fill="#374151" />
      <ellipse cx="62" cy="196" rx="12" ry="5" fill="#1e293b" />
      <ellipse cx="98" cy="196" rx="12" ry="5" fill="#1e293b" />
    </motion.svg>
  );
}

// Tech Wizard for Skills - enters from bottom with floating code
function TechWizard() {
  return (
    <motion.svg
      viewBox="0 0 180 220"
      className="w-36 h-44 md:w-44 md:h-52"
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 200, opacity: 0 }}
      transition={{ type: 'spring', damping: 15 }}
    >
      {/* Magical glow */}
      <motion.ellipse
        cx="90" cy="200"
        rx="60" ry="15"
        fill="#8b5cf6"
        opacity="0.3"
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Robe */}
      <path d="M90 80 L40 190 Q90 200 140 190 L90 80" fill="#4c1d95" />
      <path d="M90 80 L50 190 Q90 195 130 190 L90 80" fill="#6d28d9" />
      
      {/* Stars on robe */}
      <motion.g animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
        <text x="65" y="130" fill="#fbbf24" fontSize="12">★</text>
        <text x="100" y="150" fill="#fbbf24" fontSize="10">★</text>
        <text x="75" y="170" fill="#fbbf24" fontSize="8">★</text>
      </motion.g>
      
      {/* Head */}
      <circle cx="90" cy="55" r="30" fill="#fbbf24" />
      
      {/* Wizard hat */}
      <motion.g
        animate={{ rotate: [-3, 3, -3] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ transformOrigin: '90px 40px' }}
      >
        <polygon points="90,0 55,40 125,40" fill="#4c1d95" />
        <ellipse cx="90" cy="40" rx="38" ry="10" fill="#6d28d9" />
        <text x="78" y="32" fill="#fbbf24" fontSize="16">✧</text>
      </motion.g>
      
      {/* Beard */}
      <ellipse cx="90" cy="75" rx="20" ry="25" fill="#e5e7eb" />
      <ellipse cx="85" cy="85" rx="12" ry="18" fill="#f3f4f6" />
      <ellipse cx="95" cy="85" rx="12" ry="18" fill="#f3f4f6" />
      
      {/* Eyes */}
      <motion.g animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}>
        <circle cx="78" cy="50" r="5" fill="#1e293b" />
        <circle cx="102" cy="50" r="5" fill="#1e293b" />
      </motion.g>
      
      {/* Staff arm */}
      <motion.g
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ transformOrigin: '140px 100px' }}
      >
        <rect x="138" y="60" width="8" height="130" rx="3" fill="#92400e" />
        <motion.circle
          cx="142" cy="55"
          r="15"
          fill="transparent"
          stroke="#8b5cf6"
          strokeWidth="4"
          animate={{ filter: ['drop-shadow(0 0 10px #8b5cf6)', 'drop-shadow(0 0 20px #8b5cf6)', 'drop-shadow(0 0 10px #8b5cf6)'] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <motion.circle
          cx="142" cy="55"
          r="8"
          fill="#a855f7"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.g>
      
      {/* Floating code symbols */}
      <motion.text
        x="30" y="70"
        fill="#10b981"
        fontSize="14"
        fontFamily="monospace"
        animate={{ y: [70, 50, 70], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {'</>'}
      </motion.text>
      <motion.text
        x="145" y="100"
        fill="#3b82f6"
        fontSize="12"
        fontFamily="monospace"
        animate={{ y: [100, 85, 100], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      >
        {'{ }'}
      </motion.text>
    </motion.svg>
  );
}

// Rocket Scientist for Projects - enters from right with rocket
function RocketScientist() {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="w-40 h-40 md:w-48 md:h-48"
      initial={{ x: 200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 200, opacity: 0 }}
      transition={{ type: 'spring', damping: 15 }}
    >
      {/* Lab coat */}
      <path d="M100 75 L50 180 L150 180 L100 75" fill="white" />
      <path d="M100 75 L55 180 L85 180 L100 120 L115 180 L145 180 L100 75" fill="#f1f5f9" />
      
      {/* Pockets */}
      <rect x="60" y="140" width="25" height="20" rx="3" fill="#e2e8f0" />
      <rect x="115" y="140" width="25" height="20" rx="3" fill="#e2e8f0" />
      
      {/* Head */}
      <circle cx="100" cy="50" r="28" fill="#fbbf24" />
      
      {/* Crazy hair */}
      <motion.g
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{ transformOrigin: '100px 35px' }}
      >
        <path d="M75 35 Q70 15 80 25 Q85 10 95 20 Q100 5 110 20 Q115 10 125 25 Q130 15 125 35" fill="#374151" />
      </motion.g>
      
      {/* Goggles on forehead */}
      <ellipse cx="85" cy="38" rx="12" ry="8" fill="#06b6d4" stroke="#0891b2" strokeWidth="2" />
      <ellipse cx="115" cy="38" rx="12" ry="8" fill="#06b6d4" stroke="#0891b2" strokeWidth="2" />
      <rect x="95" y="35" width="10" height="6" fill="#0891b2" />
      
      {/* Eyes - excited */}
      <motion.g animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>
        <circle cx="88" cy="50" r="5" fill="#1e293b" />
        <circle cx="112" cy="50" r="5" fill="#1e293b" />
      </motion.g>
      
      {/* Excited smile */}
      <ellipse cx="100" cy="62" rx="12" ry="8" fill="#1e293b" />
      <ellipse cx="100" cy="60" rx="10" ry="5" fill="#fbbf24" />
      
      {/* Arms holding clipboard */}
      <ellipse cx="45" cy="120" rx="12" ry="18" fill="white" />
      <ellipse cx="155" cy="120" rx="12" ry="18" fill="white" />
      
      {/* Clipboard */}
      <motion.g
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ transformOrigin: '170px 120px' }}
      >
        <rect x="155" y="100" width="35" height="45" rx="3" fill="#78350f" />
        <rect x="158" y="105" width="29" height="37" rx="2" fill="white" />
        <line x1="162" y1="115" x2="183" y2="115" stroke="#94a3b8" strokeWidth="2" />
        <line x1="162" y1="125" x2="180" y2="125" stroke="#94a3b8" strokeWidth="2" />
        <line x1="162" y1="135" x2="175" y2="135" stroke="#94a3b8" strokeWidth="2" />
      </motion.g>
      
      {/* Rocket launching */}
      <motion.g
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <polygon points="25,100 35,70 45,100" fill="#ef4444" />
        <rect x="28" y="100" width="14" height="25" rx="2" fill="#dc2626" />
        <polygon points="25,125 28,125 28,110" fill="#f97316" />
        <polygon points="45,125 42,125 42,110" fill="#f97316" />
        <circle cx="35" cy="85" r="5" fill="#bfdbfe" />
        
        {/* Flames */}
        <motion.g
          animate={{ scaleY: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 0.2, repeat: Infinity }}
        >
          <ellipse cx="35" cy="135" rx="8" ry="15" fill="#f97316" />
          <ellipse cx="35" cy="132" rx="5" ry="10" fill="#fbbf24" />
        </motion.g>
      </motion.g>
    </motion.svg>
  );
}

// Graduate for Education - enters from top with diploma
function Graduate() {
  return (
    <motion.svg
      viewBox="0 0 160 200"
      className="w-32 h-40 md:w-40 md:h-48"
      initial={{ y: -200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -200, opacity: 0 }}
      transition={{ type: 'spring', damping: 15 }}
    >
      {/* Gown */}
      <path d="M80 75 L30 190 L130 190 L80 75" fill="#1e293b" />
      
      {/* Stole */}
      <path d="M60 80 L40 180 L50 180 L65 90 Z" fill="#f59e0b" />
      <path d="M100 80 L120 180 L110 180 L95 90 Z" fill="#f59e0b" />
      
      {/* Head */}
      <circle cx="80" cy="50" r="28" fill="#fbbf24" />
      
      {/* Graduation cap */}
      <motion.g
        animate={{ rotate: [-3, 3, -3] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ transformOrigin: '80px 30px' }}
      >
        <polygon points="80,10 30,35 80,50 130,35" fill="#1e293b" />
        <rect x="70" y="5" width="20" height="5" fill="#1e293b" />
        {/* Tassel */}
        <motion.g
          animate={{ rotate: [0, 20, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ transformOrigin: '120px 25px' }}
        >
          <line x1="120" y1="25" x2="135" y2="50" stroke="#f59e0b" strokeWidth="3" />
          <circle cx="137" cy="55" r="6" fill="#f59e0b" />
        </motion.g>
      </motion.g>
      
      {/* Happy eyes */}
      <path d="M68 45 Q73 40 78 45" stroke="#1e293b" strokeWidth="3" fill="none" />
      <path d="M82 45 Q87 40 92 45" stroke="#1e293b" strokeWidth="3" fill="none" />
      
      {/* Big smile */}
      <path d="M65 58 Q80 75 95 58" fill="none" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      
      {/* Arms */}
      <ellipse cx="30" cy="115" rx="12" ry="20" fill="#1e293b" />
      <motion.ellipse
        cx="130" cy="110"
        rx="12" ry="20"
        fill="#1e293b"
        animate={{ rotate: [-10, 30, -10] }}
        transition={{ duration: 1, repeat: Infinity }}
        style={{ transformOrigin: '130px 90px' }}
      />
      
      {/* Diploma in raised hand */}
      <motion.g
        animate={{ rotate: [-10, 30, -10], y: [0, -10, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <rect x="130" y="75" width="30" height="20" rx="3" fill="#fef3c7" />
        <circle cx="135" cy="85" r="5" fill="#dc2626" />
        <line x1="140" y1="80" x2="155" y2="80" stroke="#92400e" strokeWidth="2" />
        <line x1="140" y1="85" x2="150" y2="85" stroke="#92400e" strokeWidth="2" />
      </motion.g>
      
      {/* Celebration effects */}
      <motion.text
        x="20" y="30"
        fontSize="16"
        animate={{ y: [30, 15, 30], opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🎉
      </motion.text>
      <motion.text
        x="120" y="60"
        fontSize="14"
        animate={{ y: [60, 45, 60], opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        ✨
      </motion.text>
    </motion.svg>
  );
}

// Trophy Champion for Certifications & Achievements - enters with trophy
function TrophyChampion() {
  return (
    <motion.svg
      viewBox="0 0 180 200"
      className="w-36 h-40 md:w-44 md:h-48"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0, rotate: 180 }}
      transition={{ type: 'spring', damping: 15 }}
    >
      {/* Body - athletic wear */}
      <rect x="55" y="95" width="70" height="75" rx="8" fill="#3b82f6" />
      <rect x="75" y="95" width="30" height="10" fill="#1d4ed8" />
      
      {/* Medal */}
      <motion.g
        animate={{ rotate: [-10, 10, -10] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{ transformOrigin: '90px 120px' }}
      >
        <path d="M80 100 L90 95 L100 100 L90 130 Z" fill="#ef4444" />
        <circle cx="90" cy="130" r="15" fill="#fbbf24" stroke="#f59e0b" strokeWidth="3" />
        <text x="84" y="136" fill="#92400e" fontSize="16" fontWeight="bold">1</text>
      </motion.g>
      
      {/* Head */}
      <circle cx="90" cy="60" r="30" fill="#fbbf24" />
      
      {/* Headband */}
      <rect x="60" y="45" width="60" height="10" rx="3" fill="#ef4444" />
      
      {/* Determined eyes */}
      <motion.g animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 4, repeat: Infinity }}>
        <rect x="73" y="55" width="10" height="6" rx="2" fill="#1e293b" />
        <rect x="97" y="55" width="10" height="6" rx="2" fill="#1e293b" />
      </motion.g>
      
      {/* Confident smile */}
      <path d="M78 72 Q90 85 102 72" fill="white" stroke="#1e293b" strokeWidth="2" />
      
      {/* Arms holding trophy */}
      <ellipse cx="40" cy="110" rx="12" ry="18" fill="#3b82f6" />
      <ellipse cx="140" cy="110" rx="12" ry="18" fill="#3b82f6" />
      <circle cx="40" cy="95" r="8" fill="#fbbf24" />
      <circle cx="140" cy="95" r="8" fill="#fbbf24" />
      
      {/* Giant Trophy above head */}
      <motion.g
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {/* Trophy cup */}
        <path d="M65 20 L65 5 L115 5 L115 20 Q115 45 90 50 Q65 45 65 20" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
        {/* Trophy handles */}
        <path d="M65 15 Q45 15 50 35 Q55 40 65 35" fill="none" stroke="#f59e0b" strokeWidth="4" />
        <path d="M115 15 Q135 15 130 35 Q125 40 115 35" fill="none" stroke="#f59e0b" strokeWidth="4" />
        {/* Base */}
        <rect x="80" y="50" width="20" height="15" fill="#f59e0b" />
        <rect x="70" y="65" width="40" height="8" rx="2" fill="#92400e" />
        {/* Shine */}
        <motion.ellipse
          cx="80" cy="25"
          rx="8" ry="12"
          fill="white"
          opacity="0.4"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        {/* Star on trophy */}
        <motion.text
          x="82" y="38"
          fill="#92400e"
          fontSize="20"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          ★
        </motion.text>
      </motion.g>
      
      {/* Confetti */}
      <motion.g animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
        <rect x="30" y="40" width="6" height="6" fill="#ef4444" transform="rotate(45 33 43)" />
        <rect x="145" y="50" width="6" height="6" fill="#10b981" transform="rotate(45 148 53)" />
        <rect x="50" y="80" width="5" height="5" fill="#8b5cf6" transform="rotate(30 52 82)" />
      </motion.g>
    </motion.svg>
  );
}

// Friendly Helper for Contact/Hire Me - waving with phone
function FriendlyHelper() {
  return (
    <motion.svg
      viewBox="0 0 180 200"
      className="w-36 h-40 md:w-44 md:h-48"
      initial={{ y: 200, scale: 0.5 }}
      animate={{ y: 0, scale: 1 }}
      exit={{ y: 200, scale: 0.5 }}
      transition={{ type: 'spring', damping: 12 }}
    >
      {/* Body - casual */}
      <rect x="55" y="90" width="70" height="80" rx="10" fill="#10b981" />
      
      {/* Shirt pattern */}
      <circle cx="75" cy="110" r="3" fill="#059669" />
      <circle cx="90" cy="125" r="3" fill="#059669" />
      <circle cx="105" cy="110" r="3" fill="#059669" />
      
      {/* Head */}
      <circle cx="90" cy="55" r="32" fill="#fbbf24" />
      
      {/* Friendly hair */}
      <path d="M60 45 Q70 25 90 30 Q110 25 120 45 Q115 35 90 32 Q65 35 60 45" fill="#78350f" />
      
      {/* Big friendly eyes */}
      <circle cx="75" cy="50" r="8" fill="white" />
      <circle cx="105" cy="50" r="8" fill="white" />
      <motion.g animate={{ x: [0, 2, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <circle cx="77" cy="52" r="4" fill="#1e293b" />
        <circle cx="107" cy="52" r="4" fill="#1e293b" />
      </motion.g>
      <circle cx="78" cy="50" r="1.5" fill="white" />
      <circle cx="108" cy="50" r="1.5" fill="white" />
      
      {/* Big welcoming smile */}
      <path d="M70 68 Q90 88 110 68" fill="white" stroke="#1e293b" strokeWidth="2" />
      <path d="M75 72 Q90 82 105 72" fill="#ec4899" />
      
      {/* Waving arm */}
      <motion.g
        animate={{ rotate: [-20, 30, -20] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        style={{ transformOrigin: '140px 100px' }}
      >
        <ellipse cx="145" cy="95" rx="12" ry="20" fill="#10b981" />
        <circle cx="155" cy="75" r="10" fill="#fbbf24" />
        {/* Fingers waving */}
        <motion.g animate={{ rotate: [-10, 10, -10] }} transition={{ duration: 0.3, repeat: Infinity }}>
          <rect x="155" y="60" width="4" height="12" rx="2" fill="#fbbf24" />
          <rect x="161" y="58" width="4" height="14" rx="2" fill="#fbbf24" />
          <rect x="167" y="60" width="4" height="12" rx="2" fill="#fbbf24" />
        </motion.g>
      </motion.g>
      
      {/* Arm holding phone */}
      <ellipse cx="35" cy="110" rx="12" ry="20" fill="#10b981" />
      <circle cx="30" cy="130" r="8" fill="#fbbf24" />
      
      {/* Phone */}
      <motion.g
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <rect x="10" y="120" width="25" height="40" rx="4" fill="#1e293b" />
        <rect x="13" y="125" width="19" height="30" rx="2" fill="#60a5fa" />
        <motion.circle
          cx="22" cy="140"
          r="8"
          fill="white"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <text x="18" y="145" fontSize="10">📧</text>
      </motion.g>
      
      {/* Speech bubble */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
      >
        <ellipse cx="140" cy="30" rx="35" ry="22" fill="white" />
        <polygon points="120,45 130,52 135,42" fill="white" />
        <text x="115" y="35" fill="#1e293b" fontSize="12" fontWeight="bold">Hi! 👋</text>
      </motion.g>
    </motion.svg>
  );
}

// Main component that shows appropriate avatar based on section
export function SectionAvatarPopup({ section, isVisible }: SectionAvatarPopupProps) {
  const [showingSection, setShowingSection] = useState<string | null>(null);

  useEffect(() => {
    if (isVisible && section) {
      setShowingSection(section);
    } else if (!isVisible) {
      // Delay clearing to allow exit animation
      const timer = setTimeout(() => setShowingSection(null), 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, section]);

  const getPosition = (sectionId: string) => {
    switch (sectionId) {
      case 'experience': return 'left-4 top-1/3';
      case 'skills': return 'right-4 bottom-1/4';
      case 'projects': return 'right-4 top-1/3';
      case 'education': return 'left-4 top-1/4';
      case 'certifications': return 'left-1/2 -translate-x-1/2 top-4';
      case 'contact': return 'right-4 bottom-1/4';
      default: return 'right-4 top-1/3';
    }
  };

  const renderAvatar = () => {
    switch (showingSection) {
      case 'experience': return <CorporateMan />;
      case 'skills': return <TechWizard />;
      case 'projects': return <RocketScientist />;
      case 'education': return <Graduate />;
      case 'certifications': return <TrophyChampion />;
      case 'contact': return <FriendlyHelper />;
      default: return null;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && showingSection && (
        <motion.div
          className={`fixed z-[60] pointer-events-none ${getPosition(showingSection)}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {renderAvatar()}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
