'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useInView, AnimatePresence } from 'framer-motion';
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
  Phone,
  ExternalLink,
  Calendar,
  Building,
  Send,
  Star,
  CheckCircle2,
  ArrowRight,
  Heart
} from 'lucide-react';
import { Profile, Settings } from '@/lib/storage';
import { FadeIn, LiquidBlob, SkillBar } from '../animations/Animations';
import { SectionAvatarPopup } from '../avatars/SectionAvatarPopup';
import { FloatingCharacters } from '../avatars/FloatingCharacters';
import { LoadingIndicator } from '../ui/LoadingIndicator';

// Dynamically import 3D scene (client-side only)
const Scene3D = dynamic(() => import('../3d/Scene3D'), { 
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
  )
});

interface PortfolioPageProps {
  profile: Profile;
  settings: Settings;
}

// Section wrapper with scroll animations
function Section({ 
  id, 
  children, 
  onInView,
  className = ''
}: { 
  id: string; 
  children: React.ReactNode; 
  onInView: (id: string, inView: boolean) => void;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.4 });

  useEffect(() => {
    onInView(id, isInView);
  }, [id, isInView, onInView]);

  return (
    <motion.section
      id={id}
      ref={ref}
      className={`min-h-screen relative py-20 px-4 md:px-8 flex items-center ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, amount: 0.3 }}
    >
      {children}
    </motion.section>
  );
}

// Section divider with animation
function SectionDivider({ color }: { color: string }) {
  return (
    <div className="relative h-32 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: false }}
      >
        <div 
          className="h-px w-full absolute top-1/2"
          style={{ background: `linear-gradient(90deg, transparent, ${color}40, transparent)` }}
        />
      </motion.div>
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
        style={{ backgroundColor: color }}
        initial={{ scale: 0 }}
        whileInView={{ scale: [0, 1.5, 1] }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: false }}
      />
    </div>
  );
}

export default function PortfolioPage({ profile, settings }: PortfolioPageProps) {
  const [currentSection, setCurrentSection] = useState<string>('hero');
  const containerRef = useRef<HTMLDivElement>(null);
  const accentColor = settings.accentColor || '#0ea5e9';

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Achievements' },
    { id: 'contact', label: 'Hire Me' },
  ];

  const handleSectionInView = (sectionId: string, inView: boolean) => {
    if (inView && sectionId !== currentSection) {
      setCurrentSection(sectionId);
    }
  };

  // Show floating characters only on hero and contact sections
  const showFloatingCharacters = currentSection === 'hero' || currentSection === 'contact';

  // Show section avatar when in that section (not hero or contact - those have floating characters)
  const showSectionAvatar = currentSection !== 'hero' && currentSection !== 'contact';

  const socialLinks = [
    { url: profile.social.github, icon: Github, label: 'GitHub' },
    { url: profile.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { url: profile.social.twitter, icon: Twitter, label: 'Twitter' },
    { url: settings.showInstagram ? profile.social.instagram : '', icon: Instagram, label: 'Instagram' },
    { url: profile.social.website, icon: Globe, label: 'Website' },
  ].filter(link => link.url);

  const sectionColors = {
    hero: accentColor,
    experience: '#3b82f6',
    skills: '#10b981',
    projects: '#8b5cf6',
    education: '#f59e0b',
    certifications: '#ef4444',
    contact: '#ec4899',
  };

  return (
    <>
      {/* Non-blocking Loading Indicator in top-right */}
      <LoadingIndicator accentColor={accentColor} />

      {/* Section Avatar Popups - visible while in section */}
      <SectionAvatarPopup section={currentSection} isVisible={showSectionAvatar} />

      {/* Floating Characters - only on hero and contact sections */}
      {settings.enableAnimations && showFloatingCharacters && (
        <FloatingCharacters accentColor={accentColor} />
      )}

      <div 
        ref={containerRef}
        className="relative w-screen overflow-x-hidden scroll-smooth"
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

        {/* Fixed Navigation with visible names */}
        <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-2">
          {navItems.map((item) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              className="group flex items-center gap-2 px-3 py-2 rounded-full transition-all"
              style={{ 
                backgroundColor: currentSection === item.id ? `${sectionColors[item.id as keyof typeof sectionColors]}20` : 'transparent',
              }}
              whileHover={{ x: -5 }}
            >
              <span 
                className={`text-sm transition-all ${
                  currentSection === item.id ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'
                }`}
                style={{ color: sectionColors[item.id as keyof typeof sectionColors] }}
              >
                {item.label}
              </span>
              <div 
                className="w-2 h-2 rounded-full transition-all"
                style={{ 
                  backgroundColor: currentSection === item.id 
                    ? sectionColors[item.id as keyof typeof sectionColors] 
                    : 'rgba(255,255,255,0.3)',
                  boxShadow: currentSection === item.id 
                    ? `0 0 10px ${sectionColors[item.id as keyof typeof sectionColors]}` 
                    : 'none'
                }}
              />
            </motion.a>
          ))}
        </nav>

        {/* ============================================ */}
        {/* HERO SECTION */}
        {/* ============================================ */}
        <Section id="hero" onInView={handleSectionInView}>
          <div className="container mx-auto relative z-10">
            {/* Top bar */}
            <header className="absolute top-0 left-0 right-0 flex items-center justify-between py-4">
              <motion.div 
                className="text-xl font-bold flex items-center gap-2"
                style={{ color: accentColor }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Sparkles className="w-5 h-5" />
                {profile.name.split(' ')[0]}.
              </motion.div>

              <div className="flex items-center gap-3">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-colors"
                    whileHover={{ scale: 1.1, borderColor: accentColor }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    title={link.label}
                  >
                    <link.icon className="w-4 h-4" />
                  </motion.a>
                ))}

                {profile.resumeFile && (
                  <motion.a
                    href="/api/resume/download"
                    className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border text-sm font-medium"
                    style={{ 
                      backgroundColor: `${accentColor}20`,
                      borderColor: accentColor,
                      color: accentColor
                    }}
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Download className="w-4 h-4" />
                    Resume
                  </motion.a>
                )}
              </div>
            </header>

            {/* Hero Content */}
            <div className="text-center max-w-4xl mx-auto pt-20">
              {profile.profilePhoto && (
                <motion.div 
                  className="mb-8 flex justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                >
                  <div 
                    className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 shadow-2xl"
                    style={{ 
                      borderColor: accentColor,
                      boxShadow: `0 0 60px ${accentColor}40`
                    }}
                  >
                    <img 
                      src={profile.profilePhoto} 
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              )}

              <motion.p 
                className="text-lg md:text-xl text-gray-400 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                👋 Hello, I am
              </motion.p>

              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 whitespace-nowrap"
                style={{ textShadow: `0 0 60px ${accentColor}40` }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {profile.name}
              </motion.h1>

              <motion.h2 
                className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${accentColor}, #8b5cf6, #ec4899)` }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {profile.title}
              </motion.h2>

              <motion.p 
                className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {profile.tagline}
              </motion.p>

              {/* Quick stats */}
              <motion.div 
                className="flex flex-wrap justify-center gap-6 mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                {[
                  { value: `${profile.experience.length}+`, label: 'Years Exp' },
                  { value: `${profile.projects.length}+`, label: 'Projects' },
                  { value: `${profile.skills.length}+`, label: 'Skills' },
                  { value: `${profile.certifications.length}`, label: 'Achievements' },
                ].map((stat) => (
                  <motion.div 
                    key={stat.label}
                    className="px-6 py-4 rounded-xl backdrop-blur-sm border border-gray-700"
                    style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)' }}
                    whileHover={{ scale: 1.05, borderColor: accentColor }}
                  >
                    <div className="text-3xl font-bold" style={{ color: accentColor }}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Scroll indicator */}
              <motion.div 
                className="flex flex-col items-center gap-2"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <span className="text-gray-400 text-sm">Scroll to explore</span>
                <ChevronDown className="w-6 h-6 text-gray-400" />
              </motion.div>
            </div>
          </div>
        </Section>

        <SectionDivider color={sectionColors.experience} />

        {/* ============================================ */}
        {/* EXPERIENCE SECTION */}
        {/* ============================================ */}
        <Section id="experience" onInView={handleSectionInView}>
          <div className="container mx-auto relative z-10 max-w-5xl">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: `${sectionColors.experience}20` }}>
                <Briefcase className="w-5 h-5" style={{ color: sectionColors.experience }} />
                <span style={{ color: sectionColors.experience }}>Work Experience</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">My Professional Journey</h2>
            </motion.div>

            <div className="space-y-8">
              {profile.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  className="relative pl-8 border-l-2"
                  style={{ borderColor: sectionColors.experience }}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: false }}
                >
                  {/* Timeline dot */}
                  <div 
                    className="absolute -left-3 top-0 w-6 h-6 rounded-full border-4 border-gray-950"
                    style={{ backgroundColor: sectionColors.experience }}
                  />

                  <motion.div
                    className="p-6 rounded-2xl backdrop-blur-sm border border-gray-800"
                    style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)' }}
                    whileHover={{ borderColor: sectionColors.experience, x: 10 }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{exp.position}</h3>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Building className="w-4 h-4" />
                          <span>{exp.company}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full text-sm" style={{ backgroundColor: `${sectionColors.experience}20`, color: sectionColors.experience }}>
                        <Calendar className="w-4 h-4" />
                        {exp.startDate} - {exp.endDate || 'Present'}
                      </div>
                    </div>

                    {exp.description && (
                      <p className="text-gray-400 mb-4">{exp.description}</p>
                    )}

                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="space-y-2">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-300">
                            <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: sectionColors.experience }} />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        <SectionDivider color={sectionColors.skills} />

        {/* ============================================ */}
        {/* SKILLS SECTION */}
        {/* ============================================ */}
        <Section id="skills" onInView={handleSectionInView}>
          <div className="container mx-auto relative z-10 max-w-5xl">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: `${sectionColors.skills}20` }}>
                <Code className="w-5 h-5" style={{ color: sectionColors.skills }} />
                <span style={{ color: sectionColors.skills }}>Skills & Technologies</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">What I Work With</h2>
            </motion.div>

            {/* Skills by category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Group skills by category */}
              {Object.entries(
                profile.skills.reduce((acc, skill) => {
                  const cat = skill.category || 'Other';
                  if (!acc[cat]) acc[cat] = [];
                  acc[cat].push(skill);
                  return acc;
                }, {} as Record<string, typeof profile.skills>)
              ).map(([category, skills], catIndex) => (
                <motion.div
                  key={category}
                  className="p-6 rounded-2xl backdrop-blur-sm border border-gray-800"
                  style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: catIndex * 0.1 }}
                  viewport={{ once: false }}
                  whileHover={{ borderColor: sectionColors.skills }}
                >
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: sectionColors.skills }} />
                    {category}
                  </h3>
                  <div className="space-y-3">
                    {skills.map((skill, index) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        color={sectionColors.skills}
                        delay={index * 0.05}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        <SectionDivider color={sectionColors.projects} />

        {/* ============================================ */}
        {/* PROJECTS SECTION */}
        {/* ============================================ */}
        <Section id="projects" onInView={handleSectionInView}>
          <div className="container mx-auto relative z-10 max-w-6xl">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: `${sectionColors.projects}20` }}>
                <Folder className="w-5 h-5" style={{ color: sectionColors.projects }} />
                <span style={{ color: sectionColors.projects }}>Featured Projects</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Things I&apos;ve Built</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="group p-6 rounded-2xl backdrop-blur-sm border border-gray-800 flex flex-col"
                  style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: false }}
                  whileHover={{ borderColor: sectionColors.projects, y: -5 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${sectionColors.projects}20` }}
                    >
                      <Folder className="w-6 h-6" style={{ color: sectionColors.projects }} />
                    </div>
                    <div className="flex gap-2">
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5 text-gray-400 hover:text-white" />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2">{project.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 flex-1">{project.description}</p>

                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span 
                          key={i}
                          className="px-2 py-1 rounded text-xs"
                          style={{ backgroundColor: `${sectionColors.projects}20`, color: sectionColors.projects }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        <SectionDivider color={sectionColors.education} />

        {/* ============================================ */}
        {/* EDUCATION SECTION */}
        {/* ============================================ */}
        <Section id="education" onInView={handleSectionInView}>
          <div className="container mx-auto relative z-10 max-w-4xl">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: `${sectionColors.education}20` }}>
                <GraduationCap className="w-5 h-5" style={{ color: sectionColors.education }} />
                <span style={{ color: sectionColors.education }}>Education</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Academic Background</h2>
            </motion.div>

            <div className="space-y-6">
              {profile.education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-2xl backdrop-blur-sm border border-gray-800"
                  style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)' }}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: false }}
                  whileHover={{ borderColor: sectionColors.education }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${sectionColors.education}20` }}
                      >
                        <GraduationCap className="w-7 h-7" style={{ color: sectionColors.education }} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
                        <p className="text-gray-400">{edu.field}</p>
                        <p className="text-gray-500">{edu.institution}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-2 text-sm" style={{ color: sectionColors.education }}>
                        <Calendar className="w-4 h-4" />
                        {edu.startDate} - {edu.endDate || 'Present'}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        <SectionDivider color={sectionColors.certifications} />

        {/* ============================================ */}
        {/* CERTIFICATIONS & ACHIEVEMENTS SECTION */}
        {/* ============================================ */}
        <Section id="certifications" onInView={handleSectionInView}>
          <div className="container mx-auto relative z-10 max-w-5xl">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: `${sectionColors.certifications}20` }}>
                <Award className="w-5 h-5" style={{ color: sectionColors.certifications }} />
                <span style={{ color: sectionColors.certifications }}>Certs & Achievements</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Recognition & Credentials</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-2xl backdrop-blur-sm border border-gray-800 flex gap-4"
                  style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)' }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: false }}
                  whileHover={{ borderColor: sectionColors.certifications }}
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${sectionColors.certifications}20` }}
                  >
                    <Award className="w-7 h-7" style={{ color: sectionColors.certifications }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">{cert.name}</h3>
                    <p className="text-gray-400 text-sm">{cert.issuer}</p>
                    {cert.date && (
                      <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" />
                        {cert.date}
                      </p>
                    )}
                    {cert.link && (
                      <a 
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-sm hover:underline"
                        style={{ color: sectionColors.certifications }}
                      >
                        View Credential <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        <SectionDivider color={sectionColors.contact} />

        {/* ============================================ */}
        {/* HIRE ME / CONTACT SECTION */}
        {/* ============================================ */}
        <Section id="contact" onInView={handleSectionInView}>
          <div className="container mx-auto relative z-10 max-w-4xl">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: `${sectionColors.contact}20` }}>
                <Heart className="w-5 h-5" style={{ color: sectionColors.contact }} />
                <span style={{ color: sectionColors.contact }}>Let&apos;s Work Together</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Hire Me</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                I&apos;m always open to discussing new opportunities, interesting projects, or partnerships. 
                Feel free to reach out!
              </p>
            </motion.div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {profile.email && settings.showEmail && (
                <motion.a
                  href={`mailto:${profile.email}`}
                  className="p-6 rounded-2xl backdrop-blur-sm border border-gray-800 flex flex-col items-center text-center"
                  style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  whileHover={{ borderColor: sectionColors.contact, y: -5 }}
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${sectionColors.contact}20` }}
                  >
                    <Mail className="w-8 h-8" style={{ color: sectionColors.contact }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                  <p className="text-gray-400 text-sm break-all">{profile.email}</p>
                </motion.a>
              )}

              {profile.phone && settings.showPhone && (
                <motion.a
                  href={`tel:${profile.phone}`}
                  className="p-6 rounded-2xl backdrop-blur-sm border border-gray-800 flex flex-col items-center text-center"
                  style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: false }}
                  whileHover={{ borderColor: sectionColors.contact, y: -5 }}
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${sectionColors.contact}20` }}
                  >
                    <Phone className="w-8 h-8" style={{ color: sectionColors.contact }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">Phone</h3>
                  <p className="text-gray-400 text-sm">{profile.phone}</p>
                </motion.a>
              )}

              {profile.location && (
                <motion.div
                  className="p-6 rounded-2xl backdrop-blur-sm border border-gray-800 flex flex-col items-center text-center"
                  style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: false }}
                  whileHover={{ borderColor: sectionColors.contact }}
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${sectionColors.contact}20` }}
                  >
                    <MapPin className="w-8 h-8" style={{ color: sectionColors.contact }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">Location</h3>
                  <p className="text-gray-400 text-sm">{profile.location}</p>
                </motion.div>
              )}
            </div>

            {/* Social Links */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: false }}
            >
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-full backdrop-blur-sm border border-gray-700 hover:border-gray-500 transition-all"
                  style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)' }}
                  whileHover={{ scale: 1.05, borderColor: sectionColors.contact }}
                >
                  <link.icon className="w-5 h-5" style={{ color: sectionColors.contact }} />
                  <span className="text-gray-300">{link.label}</span>
                </motion.a>
              ))}
            </motion.div>

            {/* CTA Button */}
            {profile.email && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: false }}
              >
                <motion.a
                  href={`mailto:${profile.email}?subject=Job Opportunity`}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-lg"
                  style={{ 
                    background: `linear-gradient(135deg, ${sectionColors.contact}, ${accentColor})`,
                    boxShadow: `0 10px 40px -10px ${sectionColors.contact}60`
                  }}
                  whileHover={{ scale: 1.05, boxShadow: `0 20px 60px -10px ${sectionColors.contact}80` }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-6 h-6" />
                  Send me an Offer
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </motion.div>
            )}

            {/* Resume Download */}
            {profile.resumeFile && (
              <motion.div
                className="text-center mt-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: false }}
              >
                <motion.a
                  href="/api/resume/download"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border text-sm font-medium"
                  style={{ borderColor: accentColor, color: accentColor }}
                  whileHover={{ scale: 1.05, backgroundColor: `${accentColor}10` }}
                >
                  <Download className="w-5 h-5" />
                  Download Resume
                </motion.a>
              </motion.div>
            )}
          </div>
        </Section>

        {/* Footer */}
        <footer className="relative z-10 py-8 border-t border-gray-800">
          <div className="container mx-auto text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} {profile.name}. Crafted with <Heart className="w-4 h-4 inline" style={{ color: sectionColors.contact }} /> and passion.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
