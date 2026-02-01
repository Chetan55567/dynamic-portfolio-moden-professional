import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');
const PROFILE_FILE = path.join(DATA_DIR, 'profile.json');

// Ensure directories exist
export function ensureDirectories() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
}

// Profile data types
export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link: string;
  image: string | null;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface Social {
  github: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  website: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  profilePhoto: string | null;
  resumeFile: string | null;
  social: Social;
  summary: string;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
}

export interface Settings {
  theme: 'dark' | 'light';
  accentColor: string;
  showEmail: boolean;
  showPhone: boolean;
  showInstagram: boolean;
  enableAnimations: boolean;
  particleCount: number;
}

export interface ProfileData {
  profile: Profile;
  settings: Settings;
}

// Read profile data
export function getProfileData(): ProfileData {
  ensureDirectories();
  
  if (!fs.existsSync(PROFILE_FILE)) {
    const defaultData: ProfileData = {
      profile: {
        name: 'Your Name',
        title: 'Your Title',
        tagline: 'Your tagline here',
        email: 'email@example.com',
        phone: '',
        location: '',
        avatar: '/avatar.png',
        profilePhoto: null,
        resumeFile: null,
        social: {
          github: '',
          linkedin: '',
          twitter: '',
          instagram: '',
          website: '',
        },
        summary: '',
        skills: [],
        experience: [],
        projects: [],
        education: [],
        certifications: [],
      },
      settings: {
        theme: 'dark',
        accentColor: '#0ea5e9',
        showEmail: true,
        showPhone: false,
        showInstagram: true,
        enableAnimations: true,
        particleCount: 100,
      },
    };
    fs.writeFileSync(PROFILE_FILE, JSON.stringify(defaultData, null, 2));
    return defaultData;
  }

  const data = fs.readFileSync(PROFILE_FILE, 'utf-8');
  return JSON.parse(data);
}

// Save profile data
export function saveProfileData(data: ProfileData): void {
  ensureDirectories();
  fs.writeFileSync(PROFILE_FILE, JSON.stringify(data, null, 2));
}

// Update profile
export function updateProfile(profile: Partial<Profile>): ProfileData {
  const data = getProfileData();
  data.profile = { ...data.profile, ...profile };
  saveProfileData(data);
  return data;
}

// Update settings
export function updateSettings(settings: Partial<Settings>): ProfileData {
  const data = getProfileData();
  data.settings = { ...data.settings, ...settings };
  saveProfileData(data);
  return data;
}

// Save uploaded file
export async function saveUploadedFile(
  file: Buffer,
  filename: string
): Promise<string> {
  ensureDirectories();
  const ext = path.extname(filename);
  const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(7)}${ext}`;
  const filePath = path.join(UPLOADS_DIR, uniqueName);
  fs.writeFileSync(filePath, file);
  return `/api/uploads/${uniqueName}`;
}

// Get uploaded file path
export function getUploadedFilePath(filename: string): string {
  return path.join(UPLOADS_DIR, filename);
}

// Delete uploaded file
export function deleteUploadedFile(filename: string): boolean {
  const filePath = path.join(UPLOADS_DIR, filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return true;
  }
  return false;
}

// Generate unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
