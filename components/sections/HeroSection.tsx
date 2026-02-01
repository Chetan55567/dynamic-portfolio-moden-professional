'use client';

import { useState, Suspense, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Download, 
  Briefcase, 
  Code, 
  GraduationCap, 
  Award, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter, 
  Globe,
  Instagram,
  Folder,
  ChevronDown,
  Sparkles,
  MapPin,
  Phone
} from 'lucide-react';
import { Profile, Settings } from '@/lib/storage';
import { AnimatedText, FadeIn, LiquidBlob, SkillBar } from '../animations/Animations';
import { SectionAvatar } from '../avatars/SectionAvatars';
import { FloatingCharacters } from '../avatars/FloatingCharacters';
import { 
  ExperienceModal, 
  SkillsModal, 
  ProjectsModal, 
  EducationModal, 
  CertificationsModal, 
  ContactModal 
} from './Modals';

// Dynamically import 3D scene (client-side only)
const Scene3D = dynamic(() => import('../3d/Scene3D'), { 
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
  )
});

interface HeroSectionProps {
  profile: Profile;
  settings: Settings;
}

export default function HeroSection({ profile, settings }: HeroSectionProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showAvatar, setShowAvatar] = useState(false);
  const [currentSection, setCurrentSection] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);
  const accentColor = settings.accentColor || '#0ea5e9';

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const detailsOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const detailsY = useTransform(scrollYProgress, [0.3, 0.5], [100, 0]);

  const handleSectionClick = (sectionId: string) => {
    setCurrentSection(sectionId);
    setShowAvatar(true);
  };

  const handleAvatarComplete = () => {
    setTimeout(() => {
      setShowAvatar(false);
      setActiveModal(currentSection);
    }, 500);
  };

  const navItems = [
    { id: 'experience', label: 'Experience', icon: Briefcase, count: profile.experience.length, color: '#3b82f6' },
    { id: 'skills', label: 'Skills', icon: Code, count: profile.skills.length, color: '#10b981' },
    { id: 'projects', label: 'Projects', icon: Folder, count: profile.projects.length, color: '#8b5cf6' },
    { id: 'education', label: 'Education', icon: GraduationCap, count: profile.education.length, color: '#f59e0b' },
    { id: 'certifications', label: 'Certs', icon: Award, count: profile.certifications.length, color: '#ef4444' },
    { id: 'contact', label: 'Contact', icon: Mail, count: null, color: '#ec4899' },
  ];

  const socialLinks = [
    { url: profile.social.github, icon: Github, label: 'GitHub' },
    { url: profile.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { url: profile.social.twitter, icon: Twitter, label: 'Twitter' },
    { url: settings.showInstagram ? profile.social.instagram : '', icon: Instagram, label: 'Instagram' },
    { url: profile.social.website, icon: Globe, label: 'Website' },
  ].filter(link => link.url);

  return (
    <>
      {/* Avatar Animation */}
      <SectionAvatar 
        section={currentSection} 
        isVisible={showAvatar} 
        onComplete={handleAvatarComplete}
      />

      {/* Floating Minions and Astronauts */}
      {settings.enableAnimations && (
        <FloatingCharacters accentColor={accentColor} />
      )}

      <div 
        ref={containerRef}
        className="relative w-screen overflow-x-hidden overflow-y-auto scroll-smooth"
        style={{ height: '200vh' }}
      >
        {/* 3D Background - Fixed */}
        <div className="fixed inset-0 z-0">
          {settings.enableAnimations ? (
            <Suspense fallback={<div className="absolute inset-0 bg-gray-950" />}>
              <Scene3D accentColor={accentColor} particleCount={settings.particleCount} />
            </Suspense>
          ) : (
            <div className="absolute inset-0 bg-gray-950">
              <LiquidBlob color={accentColor} size={600} className="top-0 right-0 -translate-y-1/2 translate-x-1/2" />
              <LiquidBlob color={accentColor} size={400} className="bottom-0 left-0 translate-y-1/2 -translate-x-1/2" />
            </div>
          )}
        </div>

        {/* First Section - Hero Intro */}
        <motion.section 
          className="relative z-10 h-screen flex flex-col sticky top-0"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          {/* Top bar */}
          <header className="flex items-center justify-between p-4 md:p-6">
            <FadeIn delay={0.2}>
              <motion.div 
                className="text-xl font-bold flex items-center gap-2"
                style={{ color: accentColor }}
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-5 h-5" />
                {profile.name.split(' ')[0]}.
              </motion.div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex items-center gap-3">
                {/* Social links */}
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-colors"
                    whileHover={{ scale: 1.1, borderColor: accentColor }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    title={link.label}
                  >
                    <link.icon className="w-4 h-4" />
                  </motion.a>
                ))}

                {/* Download Resume */}
                {profile.resumeFile && (
                  <motion.a
                    href={`/api/resume/download`}
                    className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border text-sm font-medium"
                    style={{ 
                      backgroundColor: `${accentColor}20`,
                      borderColor: accentColor,
                      color: accentColor
                    }}
                    whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${accentColor}40` }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Download className="w-4 h-4" />
                    <span>Resume</span>
                  </motion.a>
                )}
              </div>
            </FadeIn>
          </header>

          {/* Hero content - centered */}
          <main className="flex-1 flex items-center justify-center px-4">
            <div className="text-center max-w-4xl">
              {/* Profile Photo */}
              {profile.profilePhoto && (
                <FadeIn delay={0.2}>
                  <motion.div 
                    className="mb-6 flex justify-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div 
                      className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 shadow-2xl"
                      style={{ 
                        borderColor: accentColor,
                        boxShadow: `0 0 40px ${accentColor}40, 0 0 80px ${accentColor}20`
                      }}
                    >
                      <img 
                        src={profile.profilePhoto} 
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                </FadeIn>
              )}

              {/* Greeting */}
              <FadeIn delay={0.3}>
                <motion.p 
                  className="text-lg md:text-xl text-gray-400 mb-4"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  👋 Hello, I am
                </motion.p>
              </FadeIn>

              {/* Name with 3D effect */}
              <FadeIn delay={0.4}>
                <motion.h1 
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 relative whitespace-nowrap"
                  style={{ 
                    textShadow: `0 0 60px ${accentColor}40, 0 0 120px ${accentColor}20`
                  }}
                >
                  {profile.name}
                </motion.h1>
              </FadeIn>

              {/* Title with gradient */}
              <FadeIn delay={0.6}>
                <motion.h2 
                  className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 bg-clip-text text-transparent"
                  style={{ 
                    backgroundImage: `linear-gradient(135deg, ${accentColor}, #8b5cf6, #ec4899)`,
                  }}
                >
                  {profile.title}
                </motion.h2>
              </FadeIn>

              {/* Tagline */}
              <FadeIn delay={0.8}>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
                  {profile.tagline}
                </p>
              </FadeIn>

              {/* Quick stats with 3D cards */}
              <FadeIn delay={1}>
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
                  {[
                    { value: `${profile.experience.length}+`, label: 'Years Exp' },
                    { value: `${profile.projects.length}+`, label: 'Projects' },
                    { value: `${profile.skills.length}+`, label: 'Skills' },
                    { value: `${profile.certifications.length}`, label: 'Certs' },
                  ].map((stat, index) => (
                    <motion.div 
                      key={stat.label}
                      className="relative group"
                      whileHover={{ scale: 1.1, rotateY: 10 }}
                      style={{ perspective: '1000px' }}
                    >
                      <div 
                        className="px-6 py-4 rounded-xl backdrop-blur-sm border transition-all"
                        style={{ 
                          backgroundColor: 'rgba(15, 23, 42, 0.6)',
                          borderColor: 'rgba(75, 85, 99, 0.5)',
                          boxShadow: `0 10px 40px -10px ${accentColor}30`
                        }}
                      >
                        <div 
                          className="text-3xl md:text-4xl font-bold"
                          style={{ color: accentColor }}
                        >
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                      </div>
                      {/* 3D shadow */}
                      <div 
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"
                        style={{ 
                          background: `linear-gradient(135deg, ${accentColor}20, transparent)`,
                          transform: 'translateZ(-20px) scale(1.1)',
                          filter: 'blur(20px)'
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </main>

          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="text-gray-400 text-sm">Scroll to explore</span>
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </motion.div>
        </motion.section>

        {/* Second Section - Details & Navigation */}
        <motion.section 
          className="relative z-20 min-h-screen bg-gradient-to-b from-transparent via-gray-950/95 to-gray-950"
          style={{ opacity: detailsOpacity, y: detailsY }}
        >
          <div className="container mx-auto px-4 py-16 pt-32">
            {/* Summary */}
            <FadeIn delay={0.2}>
              <div className="max-w-3xl mx-auto text-center mb-16">
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                  style={{ backgroundColor: `${accentColor}20` }}
                >
                  <Sparkles className="w-4 h-4" style={{ color: accentColor }} />
                  <span style={{ color: accentColor }}>About Me</span>
                </motion.div>
                <p className="text-xl text-gray-300 leading-relaxed">
                  {profile.summary}
                </p>
              </div>
            </FadeIn>

            {/* Interactive Section Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleSectionClick(item.id)}
                  className="group relative p-6 rounded-2xl backdrop-blur-sm border border-gray-800 text-left overflow-hidden"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.4))'
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02,
                    borderColor: item.color,
                    boxShadow: `0 20px 40px -20px ${item.color}50`
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Glow effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ 
                      background: `radial-gradient(circle at 50% 50%, ${item.color}10, transparent 70%)`
                    }}
                  />
                  
                  {/* Icon */}
                  <motion.div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 relative z-10"
                    style={{ backgroundColor: `${item.color}20` }}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.icon className="w-7 h-7" style={{ color: item.color }} />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white mb-2 relative z-10">
                    {item.label}
                  </h3>
                  <p className="text-gray-400 text-sm relative z-10">
                    {item.id === 'experience' && `${item.count} positions held`}
                    {item.id === 'skills' && `${item.count} technologies mastered`}
                    {item.id === 'projects' && `${item.count} projects completed`}
                    {item.id === 'education' && `${item.count} qualifications`}
                    {item.id === 'certifications' && `${item.count} certifications earned`}
                    {item.id === 'contact' && 'Get in touch with me'}
                  </p>

                  {/* Count badge */}
                  {item.count !== null && (
                    <div 
                      className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium"
                      style={{ backgroundColor: item.color, color: 'white' }}
                    >
                      {item.count}
                    </div>
                  )}

                  {/* Hover arrow */}
                  <motion.div 
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    <span className="text-2xl">→</span>
                  </motion.div>
                </motion.button>
              ))}
            </div>

            {/* Quick Skills Preview */}
            <FadeIn delay={0.4}>
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl font-semibold text-white text-center mb-8">
                  Top Skills
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.skills.slice(0, 6).map((skill, index) => (
                    <SkillBar 
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      color={accentColor}
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Contact Info */}
            <FadeIn delay={0.6}>
              <div className="max-w-2xl mx-auto mt-16 text-center">
                <div className="flex flex-wrap justify-center gap-6">
                  {profile.email && settings.showEmail && (
                    <a 
                      href={`mailto:${profile.email}`}
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Mail className="w-5 h-5" style={{ color: accentColor }} />
                      {profile.email}
                    </a>
                  )}
                  {profile.phone && settings.showPhone && (
                    <a 
                      href={`tel:${profile.phone}`}
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Phone className="w-5 h-5" style={{ color: accentColor }} />
                      {profile.phone}
                    </a>
                  )}
                  {profile.location && (
                    <span className="flex items-center gap-2 text-gray-400">
                      <MapPin className="w-5 h-5" style={{ color: accentColor }} />
                      {profile.location}
                    </span>
                  )}
                </div>
              </div>
            </FadeIn>

            {/* Download Resume (if available) - Prominent button */}
            {profile.resumeFile && (
              <FadeIn delay={0.8}>
                <div className="flex justify-center mt-12">
                  <motion.a
                    href="/api/resume/download"
                    className="flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-lg"
                    style={{ 
                      background: `linear-gradient(135deg, ${accentColor}, #8b5cf6)`,
                      boxShadow: `0 10px 40px -10px ${accentColor}60`
                    }}
                    whileHover={{ scale: 1.05, boxShadow: `0 20px 60px -10px ${accentColor}80` }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download className="w-6 h-6" />
                    Download My Resume
                  </motion.a>
                </div>
              </FadeIn>
            )}

            {/* Footer */}
            <footer className="mt-20 pt-8 border-t border-gray-800 text-center">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} {profile.name}. Crafted with passion.
              </p>
            </footer>
          </div>
        </motion.section>
      </div>

      {/* Modals */}
      <ExperienceModal
        isOpen={activeModal === 'experience'}
        onClose={() => setActiveModal(null)}
        experience={profile.experience}
        accentColor={accentColor}
      />
      <SkillsModal
        isOpen={activeModal === 'skills'}
        onClose={() => setActiveModal(null)}
        skills={profile.skills}
        accentColor={accentColor}
      />
      <ProjectsModal
        isOpen={activeModal === 'projects'}
        onClose={() => setActiveModal(null)}
        projects={profile.projects}
        accentColor={accentColor}
      />
      <EducationModal
        isOpen={activeModal === 'education'}
        onClose={() => setActiveModal(null)}
        education={profile.education}
        accentColor={accentColor}
      />
      <CertificationsModal
        isOpen={activeModal === 'certifications'}
        onClose={() => setActiveModal(null)}
        certifications={profile.certifications}
        accentColor={accentColor}
      />
      <ContactModal
        isOpen={activeModal === 'contact'}
        onClose={() => setActiveModal(null)}
        profile={profile}
        accentColor={accentColor}
      />
    </>
  );
}
