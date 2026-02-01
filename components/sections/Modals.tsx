'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase, GraduationCap, Award, Code, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import { Profile } from '@/lib/storage';
import { SkillBar, FadeIn, StaggerContainer, StaggerItem } from '../animations/Animations';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  accentColor?: string;
}

function Modal({ isOpen, onClose, title, children, accentColor = '#0ea5e9' }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-4 md:inset-10 lg:inset-20 bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-800 z-50 overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between p-4 md:p-6 border-b border-gray-800"
              style={{ borderBottomColor: `${accentColor}30` }}
            >
              <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
              <motion.button
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Experience Modal Content
export function ExperienceModal({
  isOpen,
  onClose,
  experience,
  accentColor,
}: {
  isOpen: boolean;
  onClose: () => void;
  experience: Profile['experience'];
  accentColor?: string;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Experience" accentColor={accentColor}>
      <StaggerContainer className="space-y-6">
        {experience.map((exp, index) => (
          <StaggerItem key={exp.id}>
            <div className="relative pl-6 border-l-2 border-gray-700 hover:border-primary-500 transition-colors">
              <div 
                className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-gray-800 border-2"
                style={{ borderColor: accentColor }}
              />
              <div className="mb-2">
                <h3 className="text-lg font-semibold text-white">{exp.position}</h3>
                <p className="text-primary-400 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  {exp.company}
                </p>
                <p className="text-sm text-gray-400">
                  {exp.startDate} - {exp.endDate}
                </p>
              </div>
              <p className="text-gray-300 mb-3">{exp.description}</p>
              {exp.highlights.length > 0 && (
                <ul className="space-y-1">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                      <span style={{ color: accentColor }}>▹</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Modal>
  );
}

// Skills Modal Content
export function SkillsModal({
  isOpen,
  onClose,
  skills,
  accentColor,
}: {
  isOpen: boolean;
  onClose: () => void;
  skills: Profile['skills'];
  accentColor?: string;
}) {
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Skills" accentColor={accentColor}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(groupedSkills).map(([category, categorySkills], catIndex) => (
          <FadeIn key={category} delay={catIndex * 0.1}>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Code className="w-5 h-5" style={{ color: accentColor }} />
                {category}
              </h3>
              <div className="space-y-3">
                {categorySkills.map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={accentColor}
                    delay={catIndex * 0.1 + index * 0.05}
                  />
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Modal>
  );
}

// Projects Modal Content
export function ProjectsModal({
  isOpen,
  onClose,
  projects,
  accentColor,
}: {
  isOpen: boolean;
  onClose: () => void;
  projects: Profile['projects'];
  accentColor?: string;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Projects" accentColor={accentColor}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <FadeIn key={project.id} delay={index * 0.1}>
            <motion.div
              className="bg-gray-800/50 rounded-xl p-4 h-full flex flex-col border border-gray-700 hover:border-primary-500 transition-colors"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-lg font-semibold text-white mb-2">{project.name}</h3>
              <p className="text-gray-400 text-sm mb-4 flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:underline"
                  style={{ color: accentColor }}
                >
                  <ExternalLink className="w-4 h-4" />
                  View Project
                </a>
              )}
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </Modal>
  );
}

// Education Modal Content
export function EducationModal({
  isOpen,
  onClose,
  education,
  accentColor,
}: {
  isOpen: boolean;
  onClose: () => void;
  education: Profile['education'];
  accentColor?: string;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Education" accentColor={accentColor}>
      <StaggerContainer className="space-y-6">
        {education.map((edu) => (
          <StaggerItem key={edu.id}>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="flex items-start gap-4">
                <div 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${accentColor}20` }}
                >
                  <GraduationCap className="w-6 h-6" style={{ color: accentColor }} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{edu.degree} in {edu.field}</h3>
                  <p className="text-primary-400">{edu.institution}</p>
                  <p className="text-sm text-gray-400">{edu.startDate} - {edu.endDate}</p>
                  {edu.description && (
                    <p className="text-gray-300 mt-2">{edu.description}</p>
                  )}
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Modal>
  );
}

// Certifications Modal Content
export function CertificationsModal({
  isOpen,
  onClose,
  certifications,
  accentColor,
}: {
  isOpen: boolean;
  onClose: () => void;
  certifications: Profile['certifications'];
  accentColor?: string;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Certifications" accentColor={accentColor}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certifications.map((cert, index) => (
          <FadeIn key={cert.id} delay={index * 0.1}>
            <motion.div
              className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-primary-500 transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${accentColor}20` }}
                >
                  <Award className="w-6 h-6" style={{ color: accentColor }} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{cert.name}</h3>
                  <p className="text-gray-400">{cert.issuer}</p>
                  <p className="text-sm text-gray-500">{cert.date}</p>
                </div>
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </Modal>
  );
}

// Contact Modal Content
export function ContactModal({
  isOpen,
  onClose,
  profile,
  accentColor,
}: {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
  accentColor?: string;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Contact" accentColor={accentColor}>
      <div className="max-w-md mx-auto space-y-6">
        <FadeIn delay={0.1}>
          <div className="bg-gray-800/50 rounded-xl p-6 text-center">
            <div 
              className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold"
              style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
            >
              {profile.name.charAt(0)}
            </div>
            <h3 className="text-xl font-semibold text-white">{profile.name}</h3>
            <p className="text-gray-400">{profile.title}</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="space-y-4">
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors"
              >
                <Mail className="w-5 h-5" style={{ color: accentColor }} />
                <span className="text-gray-300">{profile.email}</span>
              </a>
            )}
            
            {profile.phone && (
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors"
              >
                <Phone className="w-5 h-5" style={{ color: accentColor }} />
                <span className="text-gray-300">{profile.phone}</span>
              </a>
            )}
            
            {profile.location && (
              <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl">
                <MapPin className="w-5 h-5" style={{ color: accentColor }} />
                <span className="text-gray-300">{profile.location}</span>
              </div>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex justify-center gap-4">
            {profile.social.github && (
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
            {profile.social.linkedin && (
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            )}
            {profile.social.twitter && (
              <a
                href={profile.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            )}
          </div>
        </FadeIn>
      </div>
    </Modal>
  );
}
