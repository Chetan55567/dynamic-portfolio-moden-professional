'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// ============================================
// SKATING MINION - Zooming across the screen
// ============================================
export function SkatingMinion() {
  return (
    <motion.div
      className="fixed z-30 pointer-events-none"
      style={{ top: '60%', left: 0 }}
      animate={{ 
        x: [-150, typeof window !== 'undefined' ? window.innerWidth + 150 : 2000],
      }}
      transition={{ 
        duration: 12,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <motion.svg
        viewBox="0 0 140 160"
        className="w-20 h-24 md:w-28 md:h-32"
        animate={{ rotate: [-3, 3, -3], y: [0, -10, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Body */}
        <ellipse cx="70" cy="75" rx="30" ry="40" fill="#FFD93D" stroke="#E6C335" strokeWidth="2" />
        
        {/* Overalls */}
        <path d="M45 68 L45 105 Q45 115 57 115 L83 115 Q95 115 95 105 L95 68 Z" fill="#4169E1" />
        
        {/* Overall straps */}
        <rect x="50" y="58" width="8" height="22" fill="#4169E1" rx="2" />
        <rect x="82" y="58" width="8" height="22" fill="#4169E1" rx="2" />
        
        {/* Goggle band */}
        <rect x="35" y="32" width="70" height="7" fill="#333" rx="2" />
        
        {/* Goggle */}
        <circle cx="70" cy="36" r="18" fill="#888" stroke="#666" strokeWidth="3" />
        <circle cx="70" cy="36" r="13" fill="#E8E8E8" />
        
        {/* Eye */}
        <circle cx="70" cy="36" r="8" fill="white" />
        <motion.circle 
          cx="73" cy="34" r="5" fill="#5D4037"
          animate={{ cx: [73, 75, 73] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
        <circle cx="74" cy="33" r="1.5" fill="black" />
        
        {/* Happy mouth */}
        <path d="M60 52 Q70 62 80 52" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Hair - windswept */}
        <motion.path 
          d="M65 12 Q80 0 75 15" 
          fill="none" 
          stroke="#333" 
          strokeWidth="3" 
          strokeLinecap="round"
          animate={{ rotate: [15, 25, 15] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        />
        
        {/* Arms - spread for balance */}
        <ellipse cx="30" cy="70" rx="8" ry="15" fill="#FFD93D" transform="rotate(-30 30 70)" />
        <ellipse cx="110" cy="70" rx="8" ry="15" fill="#FFD93D" transform="rotate(30 110 70)" />
        
        {/* Legs on skates */}
        <ellipse cx="55" cy="125" rx="8" ry="12" fill="#FFD93D" />
        <ellipse cx="85" cy="125" rx="8" ry="12" fill="#FFD93D" />
        
        {/* Roller Skates */}
        <rect x="42" y="135" width="26" height="10" rx="3" fill="#E53935" />
        <circle cx="48" cy="150" r="5" fill="#333" />
        <circle cx="62" cy="150" r="5" fill="#333" />
        <rect x="72" y="135" width="26" height="10" rx="3" fill="#E53935" />
        <circle cx="78" cy="150" r="5" fill="#333" />
        <circle cx="92" cy="150" r="5" fill="#333" />
        
        {/* Speed lines */}
        <motion.g 
          animate={{ opacity: [1, 0.3, 1] }} 
          transition={{ duration: 0.2, repeat: Infinity }}
        >
          <line x1="5" y1="50" x2="-15" y2="50" stroke="#87CEEB" strokeWidth="2" />
          <line x1="0" y1="60" x2="-20" y2="60" stroke="#87CEEB" strokeWidth="2" />
          <line x1="5" y1="70" x2="-15" y2="70" stroke="#87CEEB" strokeWidth="2" />
        </motion.g>
      </motion.svg>
    </motion.div>
  );
}

// ============================================
// PARACHUTE MINION - Floating down with parachute
// ============================================
export function ParachuteMinion() {
  return (
    <motion.div
      className="fixed z-30 pointer-events-none"
      style={{ right: '15%' }}
      animate={{ 
        y: [-300, typeof window !== 'undefined' ? window.innerHeight + 300 : 1500],
        x: [0, -50, 30, -70, -100]
      }}
      transition={{ 
        duration: 30,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <motion.svg
        viewBox="0 0 200 280"
        className="w-28 h-40 md:w-36 md:h-48"
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {/* Parachute canopy */}
        <ellipse cx="100" cy="50" rx="80" ry="45" fill="#FF6B6B" />
        
        {/* Parachute segments */}
        <path d="M20 50 Q100 20 180 50" fill="none" stroke="#E55555" strokeWidth="3" />
        <path d="M30 50 Q65 30 100 50" fill="#FFE66D" opacity="0.7" />
        <path d="M100 50 Q135 30 170 50" fill="#4ECDC4" opacity="0.7" />
        
        {/* Parachute strings */}
        <line x1="25" y1="90" x2="85" y2="170" stroke="#333" strokeWidth="1.5" />
        <line x1="175" y1="90" x2="115" y2="170" stroke="#333" strokeWidth="1.5" />
        <line x1="60" y1="80" x2="90" y2="170" stroke="#333" strokeWidth="1.5" />
        <line x1="140" y1="80" x2="110" y2="170" stroke="#333" strokeWidth="1.5" />
        
        {/* Minion body */}
        <g transform="translate(50, 155)">
          <ellipse cx="50" cy="60" rx="28" ry="35" fill="#FFD93D" stroke="#E6C335" strokeWidth="2" />
          <path d="M27 55 L27 85 Q27 95 38 95 L62 95 Q73 95 73 85 L73 55 Z" fill="#4169E1" />
          <rect x="18" y="28" width="64" height="6" fill="#333" rx="2" />
          <circle cx="50" cy="32" r="16" fill="#888" stroke="#666" strokeWidth="2" />
          <circle cx="50" cy="32" r="11" fill="#E8E8E8" />
          <circle cx="50" cy="34" r="7" fill="white" />
          <circle cx="50" cy="37" r="4" fill="#5D4037" />
          <path d="M42 48 Q50 44 58 48" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" />
          
          {/* Arms */}
          <ellipse cx="15" cy="45" rx="7" ry="12" fill="#FFD93D" transform="rotate(-20 15 45)" />
          <ellipse cx="85" cy="45" rx="7" ry="12" fill="#FFD93D" transform="rotate(20 85 45)" />
          
          {/* Legs dangling */}
          <motion.ellipse 
            cx="38" cy="100" rx="7" ry="10" fill="#FFD93D"
            animate={{ rotate: [-10, 10, -10] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.ellipse 
            cx="62" cy="100" rx="7" ry="10" fill="#FFD93D"
            animate={{ rotate: [10, -10, 10] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </g>
      </motion.svg>
    </motion.div>
  );
}

// ============================================
// BANANA MINION - Eating banana happily
// ============================================
export function BananaMinion() {
  return (
    <motion.div
      className="fixed z-30 pointer-events-none"
      style={{ left: '8%', top: '20%' }}
      animate={{ 
        x: [0, 80, -30, 50, 0],
        y: [0, 60, 30, -20, 0]
      }}
      transition={{ 
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.svg
        viewBox="0 0 160 160"
        className="w-24 h-24 md:w-32 md:h-32"
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {/* Minion Body */}
        <ellipse cx="70" cy="95" rx="32" ry="42" fill="#FFD93D" stroke="#E6C335" strokeWidth="2" />
        
        {/* Overalls */}
        <path d="M43 88 L43 125 Q43 135 56 135 L84 135 Q97 135 97 125 L97 88 Z" fill="#4169E1" />
        <rect x="48" y="78" width="9" height="22" fill="#4169E1" rx="2" />
        <rect x="83" y="78" width="9" height="22" fill="#4169E1" rx="2" />
        
        {/* Goggle band */}
        <rect x="33" y="48" width="74" height="7" fill="#333" rx="2" />
        
        {/* Goggles - two eyes */}
        <circle cx="55" cy="52" r="15" fill="#888" stroke="#666" strokeWidth="2" />
        <circle cx="85" cy="52" r="15" fill="#888" stroke="#666" strokeWidth="2" />
        <circle cx="55" cy="52" r="10" fill="#E8E8E8" />
        <circle cx="85" cy="52" r="10" fill="#E8E8E8" />
        
        {/* Eyes */}
        <circle cx="55" cy="52" r="6" fill="white" />
        <circle cx="60" cy="50" r="4" fill="#5D4037" />
        <circle cx="85" cy="52" r="6" fill="white" />
        <circle cx="88" cy="50" r="4" fill="#5D4037" />
        
        {/* Happy eating mouth */}
        <motion.ellipse
          cx="70" cy="75"
          rx="10" ry="8"
          fill="#8B4513"
          stroke="#333"
          strokeWidth="2"
          animate={{ ry: [8, 5, 8] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
        
        {/* Hair */}
        <path d="M65 25 Q70 10 75 25" fill="none" stroke="#333" strokeWidth="3" strokeLinecap="round" />
        
        {/* Left arm holding banana */}
        <ellipse cx="28" cy="85" rx="8" ry="14" fill="#FFD93D" transform="rotate(-15 28 85)" />
        
        {/* BANANA! */}
        <motion.g 
          animate={{ rotate: [-10, 5, -10], y: [0, -3, 0] }} 
          transition={{ duration: 1, repeat: Infinity }}
        >
          <path 
            d="M5 70 Q-5 85 10 100 Q25 110 35 95 Q30 80 20 70 Q12 65 5 70" 
            fill="#FFE135" 
            stroke="#E6C335" 
            strokeWidth="2"
          />
          <ellipse cx="8" cy="68" rx="4" ry="3" fill="#8B7355" />
        </motion.g>
        
        {/* Right arm */}
        <ellipse cx="112" cy="90" rx="8" ry="14" fill="#FFD93D" transform="rotate(10 112 90)" />
        
        {/* Legs */}
        <ellipse cx="55" cy="142" rx="8" ry="10" fill="#FFD93D" />
        <ellipse cx="85" cy="142" rx="8" ry="10" fill="#FFD93D" />
        <ellipse cx="55" cy="153" rx="7" ry="5" fill="#333" />
        <ellipse cx="85" cy="153" rx="7" ry="5" fill="#333" />
        
        {/* Hearts */}
        <motion.text 
          x="100" y="40" fontSize="14" fill="#FF6B6B"
          animate={{ opacity: [0, 1, 0], y: [40, 25, 10] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ♥
        </motion.text>
      </motion.svg>
    </motion.div>
  );
}

// ============================================
// SPACE ASTRONAUT - Floating with tools
// ============================================
export function SpaceAstronaut() {
  return (
    <motion.div
      className="fixed z-30 pointer-events-none"
      style={{ right: '10%', top: '12%' }}
      animate={{ 
        x: [0, 60, -40, 30, 0],
        y: [0, 80, 40, -30, 0]
      }}
      transition={{ 
        duration: 25,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.svg
        viewBox="0 0 180 200"
        className="w-24 h-28 md:w-32 md:h-36"
        animate={{ rotate: [-8, 8, -8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Tether line */}
        <motion.path
          d="M90 100 Q150 80 180 20"
          stroke="#666"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5,5"
          animate={{ strokeDashoffset: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Jetpack flames */}
        <motion.g
          animate={{ opacity: [0.6, 1, 0.6], scaleY: [1, 1.4, 1] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        >
          <ellipse cx="55" cy="165" rx="6" ry="15" fill="#FF6B35" />
          <ellipse cx="55" cy="168" rx="4" ry="10" fill="#FFE66D" />
          <ellipse cx="85" cy="165" rx="6" ry="15" fill="#FF6B35" />
          <ellipse cx="85" cy="168" rx="4" ry="10" fill="#FFE66D" />
        </motion.g>
        
        {/* Jetpack */}
        <rect x="48" y="95" width="16" height="55" rx="5" fill="#546E7A" stroke="#455A64" strokeWidth="2" />
        <rect x="76" y="95" width="16" height="55" rx="5" fill="#546E7A" stroke="#455A64" strokeWidth="2" />
        <rect x="52" y="100" width="8" height="8" rx="2" fill="#F44336" />
        <rect x="80" y="100" width="8" height="8" rx="2" fill="#4CAF50" />
        
        {/* Body suit */}
        <ellipse cx="70" cy="105" rx="32" ry="40" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="2" />
        
        {/* Suit details */}
        <rect x="50" y="115" width="40" height="12" rx="3" fill="#B0BEC5" />
        <motion.circle 
          cx="58" cy="121" r="3" fill="#4CAF50"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <motion.circle 
          cx="70" cy="121" r="3" fill="#2196F3"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <circle cx="82" cy="121" r="3" fill="#F44336" />
        
        {/* NASA-style patch */}
        <circle cx="70" cy="90" r="10" fill="#1E3A5F" stroke="#B0BEC5" strokeWidth="1" />
        
        {/* Helmet */}
        <circle cx="70" cy="45" r="30" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="3" />
        
        {/* Visor */}
        <ellipse cx="70" cy="45" rx="22" ry="20" fill="#1E3A5F" />
        <ellipse cx="60" cy="38" rx="6" ry="8" fill="rgba(255,255,255,0.2)" />
        
        {/* Face inside */}
        <circle cx="62" cy="43" r="3" fill="#333" />
        <circle cx="78" cy="43" r="3" fill="#333" />
        <path d="M65 52 Q70 56 75 52" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" />
        
        {/* Antenna with blinking light */}
        <line x1="70" y1="15" x2="70" y2="5" stroke="#B0BEC5" strokeWidth="3" />
        <motion.circle
          cx="70" cy="2" r="4" fill="#F44336"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        
        {/* Left arm with wrench */}
        <motion.g 
          animate={{ rotate: [0, 15, 0] }} 
          transition={{ duration: 3, repeat: Infinity }}
          style={{ transformOrigin: '35px 90px' }}
        >
          <ellipse cx="30" cy="100" rx="12" ry="16" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="2" />
          <circle cx="25" cy="115" r="10" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="2" />
          <rect x="10" y="120" width="6" height="25" fill="#78909C" rx="2" transform="rotate(-45 13 132)" />
        </motion.g>
        
        {/* Right arm waving */}
        <motion.g 
          animate={{ rotate: [-15, 25, -15] }} 
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: '105px 90px' }}
        >
          <ellipse cx="110" cy="100" rx="12" ry="16" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="2" />
          <circle cx="115" cy="115" r="10" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="2" />
        </motion.g>
        
        {/* Legs */}
        <motion.ellipse 
          cx="55" cy="145" rx="12" ry="18" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="2"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <ellipse cx="55" cy="162" rx="10" ry="8" fill="#78909C" />
        <motion.ellipse 
          cx="85" cy="145" rx="12" ry="18" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="2"
          animate={{ rotate: [5, -5, 5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <ellipse cx="85" cy="162" rx="10" ry="8" fill="#78909C" />
      </motion.svg>
    </motion.div>
  );
}

// ============================================
// ASTRONAUT TAKING SELFIE
// ============================================
export function SelfieAstronaut() {
  return (
    <motion.div
      className="fixed z-30 pointer-events-none"
      style={{ left: '5%', bottom: '15%' }}
      animate={{ 
        x: [0, 70, -20, 40, 0],
        y: [0, -40, 30, -20, 0]
      }}
      transition={{ 
        duration: 18,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.svg
        viewBox="0 0 160 180"
        className="w-20 h-24 md:w-28 md:h-32"
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        {/* Body suit */}
        <ellipse cx="80" cy="100" rx="30" ry="38" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="2" />
        
        {/* Suit details */}
        <rect x="60" y="108" width="40" height="10" rx="2" fill="#B0BEC5" />
        <circle cx="70" cy="113" r="2" fill="#4CAF50" />
        <circle cx="80" cy="113" r="2" fill="#F44336" />
        <circle cx="90" cy="113" r="2" fill="#2196F3" />
        
        {/* Helmet */}
        <circle cx="80" cy="45" r="28" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="3" />
        <ellipse cx="80" cy="45" rx="20" ry="18" fill="#1E3A5F" />
        
        {/* Happy face inside */}
        <circle cx="73" cy="42" r="2.5" fill="#333" />
        <circle cx="87" cy="42" r="2.5" fill="#333" />
        <path d="M73 52 Q80 58 87 52" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" />
        
        {/* Selfie arm with phone */}
        <motion.g 
          animate={{ rotate: [-10, 10, -10] }} 
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: '115px 80px' }}
        >
          <ellipse cx="115" cy="75" rx="10" ry="14" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="2" />
          <ellipse cx="125" cy="60" rx="8" ry="12" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="2" />
          
          {/* Phone */}
          <g transform="translate(120, 35) rotate(15)">
            <rect x="0" y="0" width="22" height="35" rx="3" fill="#333" />
            <rect x="2" y="3" width="18" height="26" rx="1" fill="#4FC3F7" />
            <motion.circle
              cx="11" cy="16" r="8" fill="white"
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </g>
        </motion.g>
        
        {/* Peace sign arm */}
        <ellipse cx="45" cy="85" rx="10" ry="14" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="2" />
        <circle cx="35" cy="95" r="8" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="2" />
        <line x1="30" y1="95" x2="25" y2="80" stroke="#ECEFF1" strokeWidth="5" strokeLinecap="round" />
        <line x1="35" y1="95" x2="35" y2="78" stroke="#ECEFF1" strokeWidth="5" strokeLinecap="round" />
        
        {/* Legs floating */}
        <motion.ellipse 
          cx="65" cy="140" rx="10" ry="15" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="2"
          animate={{ rotate: [-8, 8, -8] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <ellipse cx="65" cy="155" rx="8" ry="6" fill="#78909C" />
        <motion.ellipse 
          cx="95" cy="140" rx="10" ry="15" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="2"
          animate={{ rotate: [8, -8, 8] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <ellipse cx="95" cy="155" rx="8" ry="6" fill="#78909C" />
        
        {/* Jetpack flames */}
        <motion.g 
          animate={{ scaleY: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }} 
          transition={{ duration: 0.3, repeat: Infinity }}
        >
          <ellipse cx="70" cy="145" rx="4" ry="8" fill="#FF6B35" />
          <ellipse cx="90" cy="145" rx="4" ry="8" fill="#FF6B35" />
        </motion.g>
      </motion.svg>
    </motion.div>
  );
}

// ============================================
// FLOATING STARS BACKGROUND
// ============================================
function FloatingStars({ accentColor }: { accentColor: string }) {
  const stars = [
    { left: '15%', top: '20%', size: 3, delay: 0 },
    { left: '85%', top: '35%', size: 2, delay: 0.5 },
    { left: '25%', top: '80%', size: 4, delay: 1 },
    { left: '70%', top: '70%', size: 2, delay: 1.5 },
    { left: '45%', top: '15%', size: 3, delay: 2 },
    { left: '90%', top: '85%', size: 2, delay: 2.5 },
    { left: '5%', top: '50%', size: 3, delay: 3 },
    { left: '60%', top: '45%', size: 2, delay: 3.5 },
  ];

  return (
    <>
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-20"
          style={{ left: star.left, top: star.top }}
          animate={{ 
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1]
          }}
          transition={{ 
            duration: 2 + i * 0.3, 
            repeat: Infinity,
            delay: star.delay
          }}
        >
          <div 
            className="rounded-full"
            style={{ 
              width: star.size * 4,
              height: star.size * 4,
              backgroundColor: i % 2 === 0 ? accentColor : '#FFD93D',
              boxShadow: `0 0 ${star.size * 6}px ${i % 2 === 0 ? accentColor : '#FFD93D'}`
            }}
          />
        </motion.div>
      ))}
    </>
  );
}

// ============================================
// MAIN FLOATING CHARACTERS COMPONENT
// ============================================
export function FloatingCharacters({ accentColor = '#0ea5e9' }: { accentColor?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Background stars */}
      <FloatingStars accentColor={accentColor} />
      
      {/* Skating Minion - zooms across screen */}
      <SkatingMinion />
      
      {/* Parachute Minion - falls from top */}
      <ParachuteMinion />
      
      {/* Banana Minion - floating and eating */}
      <BananaMinion />
      
      {/* Space Astronaut - working in space */}
      <SpaceAstronaut />
      
      {/* Selfie Astronaut - taking photos */}
      <SelfieAstronaut />
    </>
  );
}
