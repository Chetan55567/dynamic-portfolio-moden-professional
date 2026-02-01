'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  Upload,
  Save,
  LogOut,
  User,
  Briefcase,
  Code,
  GraduationCap,
  Award,
  Folder,
  Settings,
  Plus,
  Trash2,
  Eye,
  Sparkles,
  FileText,
  Palette,
  X,
  ChevronDown,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { Profile, Settings as SettingsType } from '@/lib/storage';

type TabType = 'profile' | 'experience' | 'skills' | 'projects' | 'education' | 'certifications' | 'settings';

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [settings, setSettings] = useState<SettingsType | null>(null);
  const [aiAvailable, setAiAvailable] = useState(false);
  const [aiProvider, setAiProvider] = useState('openai');
  const [isUploading, setIsUploading] = useState(false);

  // Fetch profile data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, aiRes] = await Promise.all([
          fetch('/api/profile'),
          fetch('/api/resume'),
        ]);

        if (!profileRes.ok) {
          throw new Error('Failed to fetch profile');
        }

        const profileData = await profileRes.json();
        setProfile(profileData.profile);
        setSettings(profileData.settings);

        if (aiRes.ok) {
          const aiData = await aiRes.json();
          setAiAvailable(aiData.aiAvailable);
          setAiProvider(aiData.provider);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        // Redirect to login if not authenticated
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  // Save profile
  const handleSave = async () => {
    if (!profile || !settings) return;

    setIsSaving(true);
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, settings }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save');
      }

      toast.success('Changes saved successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle resume upload
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('extractWithAI', aiAvailable ? 'true' : 'false');

    try {
      const response = await fetch('/api/resume', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      if (data.extractedProfile) {
        setProfile((prev) => prev ? { ...prev, ...data.extractedProfile } : prev);
        toast.success('Resume uploaded and data extracted!');
      } else if (data.extractionError) {
        toast.error(data.extractionError);
        setProfile((prev) => prev ? { ...prev, resumeFile: data.path } : prev);
      } else {
        setProfile((prev) => prev ? { ...prev, resumeFile: data.path } : prev);
        toast.success('Resume uploaded successfully!');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  }, [aiAvailable]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
  });

  // Logout
  const handleLogout = async () => {
    try {
      await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' }),
      });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading || !profile || !settings) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  const tabs: { id: TabType; label: string; icon: typeof User }[] = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Folder },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            <span className="text-sm text-gray-400">Manage your portfolio</span>
          </div>
          <div className="flex items-center gap-3">
            <motion.a
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye className="w-4 h-4" />
              View Site
            </motion.a>
            <motion.button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save
            </motion.button>
            <motion.button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </motion.button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Resume Upload Section */}
        <div className="mb-8">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-primary-500 bg-primary-500/10'
                : 'border-gray-700 hover:border-gray-600'
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4">
              {isUploading ? (
                <>
                  <div className="w-12 h-12 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                  <p className="text-gray-400">Uploading and processing...</p>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                    <Upload className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {isDragActive ? 'Drop your resume here' : 'Upload your resume'}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      PDF, DOC, DOCX, or TXT (max 10MB)
                    </p>
                  </div>
                  {aiAvailable && (
                    <div className="flex items-center gap-2 text-sm text-primary-400">
                      <Sparkles className="w-4 h-4" />
                      AI extraction available ({aiProvider})
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'profile' && (
              <ProfileTab profile={profile} setProfile={setProfile} />
            )}
            {activeTab === 'experience' && (
              <ExperienceTab profile={profile} setProfile={setProfile} />
            )}
            {activeTab === 'skills' && (
              <SkillsTab profile={profile} setProfile={setProfile} />
            )}
            {activeTab === 'projects' && (
              <ProjectsTab profile={profile} setProfile={setProfile} />
            )}
            {activeTab === 'education' && (
              <EducationTab profile={profile} setProfile={setProfile} />
            )}
            {activeTab === 'certifications' && (
              <CertificationsTab profile={profile} setProfile={setProfile} />
            )}
            {activeTab === 'settings' && (
              <SettingsTab settings={settings} setSettings={setSettings} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Profile Tab
function ProfileTab({
  profile,
  setProfile,
}: {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
}) {
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  
  const updateField = (field: keyof Profile, value: any) => {
    setProfile((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const updateSocial = (field: keyof Profile['social'], value: string) => {
    setProfile((prev) =>
      prev ? { ...prev, social: { ...prev.social, [field]: value } } : prev
    );
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);
    const formData = new FormData();
    formData.append('photo', file);

    try {
      const response = await fetch('/api/photo', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setProfile((prev) => prev ? { ...prev, profilePhoto: data.path } : prev);
        toast.success('Photo uploaded successfully!');
      } else {
        toast.error(data.error || 'Failed to upload photo');
      }
    } catch (error) {
      toast.error('Failed to upload photo');
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleRemovePhoto = async () => {
    try {
      const response = await fetch('/api/photo', { method: 'DELETE' });
      if (response.ok) {
        setProfile((prev) => prev ? { ...prev, profilePhoto: null } : prev);
        toast.success('Photo removed');
      }
    } catch (error) {
      toast.error('Failed to remove photo');
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Photo Upload */}
      <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
        <h2 className="text-lg font-semibold text-white mb-6">Profile Photo</h2>
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-800 border-2 border-gray-700 flex items-center justify-center">
              {profile.profilePhoto ? (
                <img 
                  src={profile.profilePhoto} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-gray-500" />
              )}
            </div>
            {isUploadingPhoto && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <span className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors inline-flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Photo
              </span>
            </label>
            {profile.profilePhoto && (
              <button
                onClick={handleRemovePhoto}
                className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors inline-flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Remove Photo
              </button>
            )}
            <p className="text-sm text-gray-500">
              JPEG, PNG, WebP, or GIF. Max 5MB.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
        <h2 className="text-lg font-semibold text-white mb-6">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Full Name"
            value={profile.name}
            onChange={(v) => updateField('name', v)}
            placeholder="John Doe"
          />
          <InputField
            label="Title / Role"
            value={profile.title}
            onChange={(v) => updateField('title', v)}
            placeholder="DevOps Engineer"
          />
          <InputField
            label="Tagline"
            value={profile.tagline}
            onChange={(v) => updateField('tagline', v)}
            placeholder="Building scalable infrastructure"
            className="md:col-span-2"
          />
          <InputField
            label="Email"
            type="email"
            value={profile.email}
            onChange={(v) => updateField('email', v)}
            placeholder="john@example.com"
          />
          <InputField
            label="Phone"
            type="tel"
            value={profile.phone}
            onChange={(v) => updateField('phone', v)}
            placeholder="+1 (555) 123-4567"
          />
          <InputField
            label="Location"
            value={profile.location}
            onChange={(v) => updateField('location', v)}
            placeholder="San Francisco, CA"
          />
          <InputField
            label="Avatar URL"
            value={profile.avatar}
            onChange={(v) => updateField('avatar', v)}
            placeholder="/avatar.png"
          />
        </div>

        <div className="mt-6">
          <TextareaField
            label="Professional Summary"
            value={profile.summary}
            onChange={(v) => updateField('summary', v)}
            placeholder="Write a brief summary about yourself..."
            rows={4}
          />
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
        <h2 className="text-lg font-semibold text-white mb-6">Social Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="GitHub"
            value={profile.social.github}
            onChange={(v) => updateSocial('github', v)}
            placeholder="https://github.com/username"
          />
          <InputField
            label="LinkedIn"
            value={profile.social.linkedin}
            onChange={(v) => updateSocial('linkedin', v)}
            placeholder="https://linkedin.com/in/username"
          />
          <InputField
            label="Twitter"
            value={profile.social.twitter}
            onChange={(v) => updateSocial('twitter', v)}
            placeholder="https://twitter.com/username"
          />
          <InputField
            label="Instagram"
            value={profile.social.instagram || ''}
            onChange={(v) => updateSocial('instagram', v)}
            placeholder="https://instagram.com/username"
          />
          <InputField
            label="Website"
            value={profile.social.website}
            onChange={(v) => updateSocial('website', v)}
            placeholder="https://yourwebsite.com"
          />
        </div>
      </div>
    </div>
  );
}

// Experience Tab
function ExperienceTab({
  profile,
  setProfile,
}: {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
}) {
  const addExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      highlights: [],
    };
    setProfile((prev) =>
      prev ? { ...prev, experience: [...prev.experience, newExp] } : prev
    );
  };

  const updateExperience = (id: string, field: string, value: any) => {
    setProfile((prev) =>
      prev
        ? {
            ...prev,
            experience: prev.experience.map((exp) =>
              exp.id === id ? { ...exp, [field]: value } : exp
            ),
          }
        : prev
    );
  };

  const removeExperience = (id: string) => {
    setProfile((prev) =>
      prev
        ? { ...prev, experience: prev.experience.filter((exp) => exp.id !== id) }
        : prev
    );
  };

  return (
    <div className="space-y-6">
      {profile.experience.map((exp, index) => (
        <motion.div
          key={exp.id}
          className="bg-gray-900/50 rounded-xl p-6 border border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              Experience {index + 1}
            </h3>
            <button
              onClick={() => removeExperience(exp.id)}
              className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Company"
              value={exp.company}
              onChange={(v) => updateExperience(exp.id, 'company', v)}
              placeholder="Company Name"
            />
            <InputField
              label="Position"
              value={exp.position}
              onChange={(v) => updateExperience(exp.id, 'position', v)}
              placeholder="Job Title"
            />
            <InputField
              label="Start Date"
              value={exp.startDate}
              onChange={(v) => updateExperience(exp.id, 'startDate', v)}
              placeholder="2020-01"
            />
            <InputField
              label="End Date"
              value={exp.endDate}
              onChange={(v) => updateExperience(exp.id, 'endDate', v)}
              placeholder="Present"
            />
          </div>

          <div className="mt-6">
            <TextareaField
              label="Description"
              value={exp.description}
              onChange={(v) => updateExperience(exp.id, 'description', v)}
              placeholder="Describe your role and responsibilities..."
              rows={3}
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Highlights (one per line)
            </label>
            <textarea
              value={exp.highlights.join('\n')}
              onChange={(e) =>
                updateExperience(
                  exp.id,
                  'highlights',
                  e.target.value.split('\n').filter((h) => h.trim())
                )
              }
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors resize-none"
              rows={4}
              placeholder="• Achievement 1&#10;• Achievement 2&#10;• Achievement 3"
            />
          </div>
        </motion.div>
      ))}

      <motion.button
        onClick={addExperience}
        className="w-full py-4 border-2 border-dashed border-gray-700 rounded-xl text-gray-400 hover:border-primary-500 hover:text-primary-400 transition-colors flex items-center justify-center gap-2"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <Plus className="w-5 h-5" />
        Add Experience
      </motion.button>
    </div>
  );
}

// Skills Tab
function SkillsTab({
  profile,
  setProfile,
}: {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
}) {
  const addSkill = () => {
    const newSkill = {
      name: '',
      level: 75,
      category: 'General',
    };
    setProfile((prev) =>
      prev ? { ...prev, skills: [...prev.skills, newSkill] } : prev
    );
  };

  const updateSkill = (index: number, field: string, value: any) => {
    setProfile((prev) =>
      prev
        ? {
            ...prev,
            skills: prev.skills.map((skill, i) =>
              i === index ? { ...skill, [field]: value } : skill
            ),
          }
        : prev
    );
  };

  const removeSkill = (index: number) => {
    setProfile((prev) =>
      prev ? { ...prev, skills: prev.skills.filter((_, i) => i !== index) } : prev
    );
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
        <h2 className="text-lg font-semibold text-white mb-6">Skills</h2>
        <div className="space-y-4">
          {profile.skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg"
            >
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(index, 'name', e.target.value)}
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  placeholder="Skill name"
                />
                <input
                  type="text"
                  value={skill.category}
                  onChange={(e) => updateSkill(index, 'category', e.target.value)}
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  placeholder="Category"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={skill.level}
                    onChange={(e) =>
                      updateSkill(index, 'level', parseInt(e.target.value))
                    }
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-400 w-10">{skill.level}%</span>
                </div>
              </div>
              <button
                onClick={() => removeSkill(index)}
                className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <motion.button
          onClick={addSkill}
          className="mt-4 w-full py-3 border-2 border-dashed border-gray-700 rounded-lg text-gray-400 hover:border-primary-500 hover:text-primary-400 transition-colors flex items-center justify-center gap-2"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Plus className="w-5 h-5" />
          Add Skill
        </motion.button>
      </div>
    </div>
  );
}

// Projects Tab
function ProjectsTab({
  profile,
  setProfile,
}: {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
}) {
  const addProject = () => {
    const newProject = {
      id: `proj-${Date.now()}`,
      name: '',
      description: '',
      technologies: [],
      link: '',
      image: null,
    };
    setProfile((prev) =>
      prev ? { ...prev, projects: [...prev.projects, newProject] } : prev
    );
  };

  const updateProject = (id: string, field: string, value: any) => {
    setProfile((prev) =>
      prev
        ? {
            ...prev,
            projects: prev.projects.map((proj) =>
              proj.id === id ? { ...proj, [field]: value } : proj
            ),
          }
        : prev
    );
  };

  const removeProject = (id: string) => {
    setProfile((prev) =>
      prev
        ? { ...prev, projects: prev.projects.filter((proj) => proj.id !== id) }
        : prev
    );
  };

  return (
    <div className="space-y-6">
      {profile.projects.map((proj, index) => (
        <motion.div
          key={proj.id}
          className="bg-gray-900/50 rounded-xl p-6 border border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Project {index + 1}</h3>
            <button
              onClick={() => removeProject(proj.id)}
              className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Name"
              value={proj.name}
              onChange={(v) => updateProject(proj.id, 'name', v)}
              placeholder="Project Name"
            />
            <InputField
              label="Link"
              value={proj.link}
              onChange={(v) => updateProject(proj.id, 'link', v)}
              placeholder="https://github.com/..."
            />
          </div>

          <div className="mt-6">
            <TextareaField
              label="Description"
              value={proj.description}
              onChange={(v) => updateProject(proj.id, 'description', v)}
              placeholder="Describe your project..."
              rows={3}
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Technologies (comma separated)
            </label>
            <input
              type="text"
              value={proj.technologies.join(', ')}
              onChange={(e) =>
                updateProject(
                  proj.id,
                  'technologies',
                  e.target.value.split(',').map((t) => t.trim()).filter((t) => t)
                )
              }
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              placeholder="React, Node.js, TypeScript"
            />
          </div>
        </motion.div>
      ))}

      <motion.button
        onClick={addProject}
        className="w-full py-4 border-2 border-dashed border-gray-700 rounded-xl text-gray-400 hover:border-primary-500 hover:text-primary-400 transition-colors flex items-center justify-center gap-2"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <Plus className="w-5 h-5" />
        Add Project
      </motion.button>
    </div>
  );
}

// Education Tab
function EducationTab({
  profile,
  setProfile,
}: {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
}) {
  const addEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    setProfile((prev) =>
      prev ? { ...prev, education: [...prev.education, newEdu] } : prev
    );
  };

  const updateEducation = (id: string, field: string, value: any) => {
    setProfile((prev) =>
      prev
        ? {
            ...prev,
            education: prev.education.map((edu) =>
              edu.id === id ? { ...edu, [field]: value } : edu
            ),
          }
        : prev
    );
  };

  const removeEducation = (id: string) => {
    setProfile((prev) =>
      prev
        ? { ...prev, education: prev.education.filter((edu) => edu.id !== id) }
        : prev
    );
  };

  return (
    <div className="space-y-6">
      {profile.education.map((edu, index) => (
        <motion.div
          key={edu.id}
          className="bg-gray-900/50 rounded-xl p-6 border border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Education {index + 1}</h3>
            <button
              onClick={() => removeEducation(edu.id)}
              className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Institution"
              value={edu.institution}
              onChange={(v) => updateEducation(edu.id, 'institution', v)}
              placeholder="University Name"
            />
            <InputField
              label="Degree"
              value={edu.degree}
              onChange={(v) => updateEducation(edu.id, 'degree', v)}
              placeholder="Bachelor of Science"
            />
            <InputField
              label="Field of Study"
              value={edu.field}
              onChange={(v) => updateEducation(edu.id, 'field', v)}
              placeholder="Computer Science"
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Start"
                value={edu.startDate}
                onChange={(v) => updateEducation(edu.id, 'startDate', v)}
                placeholder="2018"
              />
              <InputField
                label="End"
                value={edu.endDate}
                onChange={(v) => updateEducation(edu.id, 'endDate', v)}
                placeholder="2022"
              />
            </div>
          </div>

          <div className="mt-6">
            <TextareaField
              label="Description"
              value={edu.description}
              onChange={(v) => updateEducation(edu.id, 'description', v)}
              placeholder="Additional details..."
              rows={2}
            />
          </div>
        </motion.div>
      ))}

      <motion.button
        onClick={addEducation}
        className="w-full py-4 border-2 border-dashed border-gray-700 rounded-xl text-gray-400 hover:border-primary-500 hover:text-primary-400 transition-colors flex items-center justify-center gap-2"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <Plus className="w-5 h-5" />
        Add Education
      </motion.button>
    </div>
  );
}

// Certifications Tab
function CertificationsTab({
  profile,
  setProfile,
}: {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
}) {
  const addCertification = () => {
    const newCert = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: '',
      link: '',
    };
    setProfile((prev) =>
      prev ? { ...prev, certifications: [...prev.certifications, newCert] } : prev
    );
  };

  const updateCertification = (id: string, field: string, value: any) => {
    setProfile((prev) =>
      prev
        ? {
            ...prev,
            certifications: prev.certifications.map((cert) =>
              cert.id === id ? { ...cert, [field]: value } : cert
            ),
          }
        : prev
    );
  };

  const removeCertification = (id: string) => {
    setProfile((prev) =>
      prev
        ? {
            ...prev,
            certifications: prev.certifications.filter((cert) => cert.id !== id),
          }
        : prev
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
        <h2 className="text-lg font-semibold text-white mb-6">Certifications</h2>
        <div className="space-y-4">
          {profile.certifications.map((cert, index) => (
            <div
              key={cert.id}
              className="p-4 bg-gray-800/50 rounded-lg"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) =>
                      updateCertification(cert.id, 'name', e.target.value)
                    }
                    className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    placeholder="Certification name"
                  />
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) =>
                      updateCertification(cert.id, 'issuer', e.target.value)
                    }
                    className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    placeholder="Issuer"
                  />
                  <input
                    type="text"
                    value={cert.date}
                    onChange={(e) =>
                      updateCertification(cert.id, 'date', e.target.value)
                    }
                    className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    placeholder="Date"
                  />
                  <input
                    type="text"
                    value={cert.link}
                    onChange={(e) =>
                      updateCertification(cert.id, 'link', e.target.value)
                    }
                    className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    placeholder="Link (optional)"
                  />
                </div>
                <button
                  onClick={() => removeCertification(cert.id)}
                  className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <motion.button
          onClick={addCertification}
          className="mt-4 w-full py-3 border-2 border-dashed border-gray-700 rounded-lg text-gray-400 hover:border-primary-500 hover:text-primary-400 transition-colors flex items-center justify-center gap-2"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Plus className="w-5 h-5" />
          Add Certification
        </motion.button>
      </div>
    </div>
  );
}

// Settings Tab
function SettingsTab({
  settings,
  setSettings,
}: {
  settings: SettingsType;
  setSettings: React.Dispatch<React.SetStateAction<SettingsType | null>>;
}) {
  const updateSetting = (field: keyof SettingsType, value: any) => {
    setSettings((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const colorPresets = [
    '#0ea5e9', // Sky blue
    '#8b5cf6', // Purple
    '#10b981', // Emerald
    '#f59e0b', // Amber
    '#ef4444', // Red
    '#ec4899', // Pink
    '#06b6d4', // Cyan
    '#84cc16', // Lime
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
        <h2 className="text-lg font-semibold text-white mb-6">Appearance</h2>

        <div className="space-y-6">
          {/* Theme */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Theme
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => updateSetting('theme', 'dark')}
                className={`flex-1 py-3 px-4 rounded-lg border transition-colors ${
                  settings.theme === 'dark'
                    ? 'border-primary-500 bg-primary-500/10'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <span className="text-white">Dark</span>
              </button>
              <button
                onClick={() => updateSetting('theme', 'light')}
                className={`flex-1 py-3 px-4 rounded-lg border transition-colors ${
                  settings.theme === 'light'
                    ? 'border-primary-500 bg-primary-500/10'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <span className="text-white">Light</span>
              </button>
            </div>
          </div>

          {/* Accent Color */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Accent Color
            </label>
            <div className="flex flex-wrap gap-3">
              {colorPresets.map((color) => (
                <button
                  key={color}
                  onClick={() => updateSetting('accentColor', color)}
                  className={`w-10 h-10 rounded-full border-2 transition-transform ${
                    settings.accentColor === color
                      ? 'border-white scale-110'
                      : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
              <input
                type="color"
                value={settings.accentColor}
                onChange={(e) => updateSetting('accentColor', e.target.value)}
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
        <h2 className="text-lg font-semibold text-white mb-6">Privacy</h2>
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-gray-300">Show email on portfolio</span>
            <input
              type="checkbox"
              checked={settings.showEmail}
              onChange={(e) => updateSetting('showEmail', e.target.checked)}
              className="w-5 h-5 rounded border-gray-700 bg-gray-800 text-primary-500 focus:ring-primary-500"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-gray-300">Show phone on portfolio</span>
            <input
              type="checkbox"
              checked={settings.showPhone}
              onChange={(e) => updateSetting('showPhone', e.target.checked)}
              className="w-5 h-5 rounded border-gray-700 bg-gray-800 text-primary-500 focus:ring-primary-500"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-gray-300">Show Instagram on portfolio</span>
            <input
              type="checkbox"
              checked={settings.showInstagram ?? true}
              onChange={(e) => updateSetting('showInstagram', e.target.checked)}
              className="w-5 h-5 rounded border-gray-700 bg-gray-800 text-primary-500 focus:ring-primary-500"
            />
          </label>
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
        <h2 className="text-lg font-semibold text-white mb-6">Animations</h2>
        <div className="space-y-6">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-gray-300 block">Enable 3D animations</span>
              <span className="text-sm text-gray-500">
                Disable for better performance on older devices
              </span>
            </div>
            <input
              type="checkbox"
              checked={settings.enableAnimations}
              onChange={(e) => updateSetting('enableAnimations', e.target.checked)}
              className="w-5 h-5 rounded border-gray-700 bg-gray-800 text-primary-500 focus:ring-primary-500"
            />
          </label>

          {settings.enableAnimations && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Particle count: {settings.particleCount}
              </label>
              <input
                type="range"
                min="20"
                max="200"
                value={settings.particleCount}
                onChange={(e) =>
                  updateSetting('particleCount', parseInt(e.target.value))
                }
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Fewer (faster)</span>
                <span>More (prettier)</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Reusable Input Components
function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  className = '',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
        placeholder={placeholder}
      />
    </div>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors resize-none"
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  );
}
