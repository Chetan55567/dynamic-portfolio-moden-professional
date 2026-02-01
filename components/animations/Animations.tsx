'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

// Letter-by-letter animation
export function AnimatedText({ text, className = '', delay = 0 }: AnimatedTextProps) {
  const letters = text.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{ display: letter === ' ' ? 'inline' : 'inline-block' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Fade in animation
interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  duration?: number;
}

export function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  duration = 0.5,
}: FadeInProps) {
  const directions = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  };

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        ...directions[direction],
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// Scale in animation
interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function ScaleIn({ children, delay = 0, className = '' }: ScaleInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// Stagger container for child animations
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Stagger item for use inside StaggerContainer
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.4, 0.25, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Glowing button with hover effects
interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  accentColor?: string;
}

export function GlowButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  accentColor = '#0ea5e9',
}: GlowButtonProps) {
  const variants = {
    primary: {
      background: accentColor,
      boxShadow: `0 0 20px ${accentColor}40`,
    },
    secondary: {
      background: 'transparent',
      border: `2px solid ${accentColor}`,
    },
    ghost: {
      background: 'transparent',
    },
  };

  return (
    <motion.button
      className={`px-6 py-3 rounded-lg font-medium transition-all ${className}`}
      style={variants[variant]}
      onClick={onClick}
      whileHover={{
        scale: 1.05,
        boxShadow: `0 0 30px ${accentColor}60`,
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}

// Liquid/morphing background blob
interface LiquidBlobProps {
  color?: string;
  size?: number;
  className?: string;
}

export function LiquidBlob({ color = '#0ea5e9', size = 400, className = '' }: LiquidBlobProps) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-30 ${className}`}
      style={{
        background: color,
        width: size,
        height: size,
      }}
      animate={{
        scale: [1, 1.2, 1],
        borderRadius: ['40% 60% 70% 30%', '60% 40% 30% 70%', '40% 60% 70% 30%'],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

// Skill bar with animation
interface SkillBarProps {
  name: string;
  level: number;
  color?: string;
  delay?: number;
}

export function SkillBar({ name, level, color = '#0ea5e9', delay = 0 }: SkillBarProps) {
  return (
    <div className="mb-2">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-gray-300">{name}</span>
        <span className="text-sm text-gray-400">{level}%</span>
      </div>
      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{
            duration: 1,
            delay,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        />
      </div>
    </div>
  );
}

// Card with hover effect
interface HoverCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function HoverCard({ children, className = '', onClick }: HoverCardProps) {
  return (
    <motion.div
      className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 cursor-pointer ${className}`}
      whileHover={{
        scale: 1.02,
        borderColor: 'rgba(14, 165, 233, 0.5)',
        boxShadow: '0 0 20px rgba(14, 165, 233, 0.2)',
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

// Typing effect
interface TypingEffectProps {
  texts: string[];
  className?: string;
}

export function TypingEffect({ texts, className = '' }: TypingEffectProps) {
  return (
    <motion.span className={className}>
      {texts.map((text, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 2, duration: 0.5 }}
          style={{ display: index === texts.length - 1 ? 'inline' : 'none' }}
        >
          {text}
        </motion.span>
      ))}
    </motion.span>
  );
}
