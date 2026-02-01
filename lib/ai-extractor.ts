import { Profile } from './storage';

export type AIProvider = 'openai' | 'anthropic' | 'custom';

interface AIConfig {
  provider: AIProvider;
  apiKey: string;
  baseUrl?: string;
  model?: string;
}

// Get AI configuration from environment
export function getAIConfig(): AIConfig {
  const provider = (process.env.AI_PROVIDER || 'openai') as AIProvider;
  
  switch (provider) {
    case 'anthropic':
      return {
        provider: 'anthropic',
        apiKey: process.env.ANTHROPIC_API_KEY || '',
        model: 'claude-3-sonnet-20240229',
      };
    case 'custom':
      return {
        provider: 'custom',
        apiKey: process.env.CUSTOM_LLM_API_KEY || '',
        baseUrl: process.env.CUSTOM_LLM_BASE_URL || '',
        model: process.env.CUSTOM_LLM_MODEL || '',
      };
    case 'openai':
    default:
      return {
        provider: 'openai',
        apiKey: process.env.OPENAI_API_KEY || '',
        model: 'gpt-4-turbo-preview',
      };
  }
}

// System prompt for resume extraction
const EXTRACTION_PROMPT = `You are a resume/CV parser. Extract structured information from the provided resume text and return it as valid JSON.

Extract the following fields:
- name: Full name
- title: Job title/Role
- tagline: A brief professional tagline (generate if not present)
- email: Email address
- phone: Phone number
- location: City, State/Country
- summary: Professional summary/objective (2-3 sentences)
- skills: Array of skills with name, level (0-100 estimate), and category
- experience: Array of work experience with company, position, startDate, endDate, description, highlights
- education: Array of education with institution, degree, field, startDate, endDate, description
- certifications: Array of certifications with name, issuer, date
- social: Object with github, linkedin, twitter, website URLs (if found)

Return ONLY valid JSON, no markdown formatting or explanations.`;

// Extract profile from resume text using OpenAI
async function extractWithOpenAI(text: string, config: AIConfig): Promise<Partial<Profile>> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model || 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: EXTRACTION_PROMPT },
        { role: 'user', content: `Parse this resume:\n\n${text}` },
      ],
      temperature: 0.1,
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${error}`);
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content;
  
  if (!content) {
    throw new Error('No response from OpenAI');
  }

  return JSON.parse(content);
}

// Extract profile from resume text using Anthropic
async function extractWithAnthropic(text: string, config: AIConfig): Promise<Partial<Profile>> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': config.apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: config.model || 'claude-3-sonnet-20240229',
      max_tokens: 4096,
      system: EXTRACTION_PROMPT,
      messages: [
        { role: 'user', content: `Parse this resume:\n\n${text}` },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Anthropic API error: ${error}`);
  }

  const data = await response.json();
  const content = data.content[0]?.text;
  
  if (!content) {
    throw new Error('No response from Anthropic');
  }

  // Extract JSON from the response
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('No JSON found in response');
  }

  return JSON.parse(jsonMatch[0]);
}

// Extract profile from resume text using custom LLM
async function extractWithCustomLLM(text: string, config: AIConfig): Promise<Partial<Profile>> {
  if (!config.baseUrl) {
    throw new Error('Custom LLM base URL not configured');
  }

  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages: [
        { role: 'system', content: EXTRACTION_PROMPT },
        { role: 'user', content: `Parse this resume:\n\n${text}` },
      ],
      temperature: 0.1,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Custom LLM API error: ${error}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  
  if (!content) {
    throw new Error('No response from custom LLM');
  }

  // Try to extract JSON
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('No JSON found in response');
  }

  return JSON.parse(jsonMatch[0]);
}

// Main extraction function
export async function extractProfileFromResume(resumeText: string): Promise<{
  success: boolean;
  profile?: Partial<Profile>;
  error?: string;
  provider?: string;
}> {
  const config = getAIConfig();

  if (!config.apiKey) {
    return {
      success: false,
      error: `No API key configured for ${config.provider}. Please configure in environment variables.`,
    };
  }

  try {
    let profile: Partial<Profile>;

    switch (config.provider) {
      case 'anthropic':
        profile = await extractWithAnthropic(resumeText, config);
        break;
      case 'custom':
        profile = await extractWithCustomLLM(resumeText, config);
        break;
      case 'openai':
      default:
        profile = await extractWithOpenAI(resumeText, config);
        break;
    }

    // Normalize the extracted data
    const normalizedProfile = normalizeExtractedProfile(profile);

    return {
      success: true,
      profile: normalizedProfile,
      provider: config.provider,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      provider: config.provider,
    };
  }
}

// Normalize extracted profile data
function normalizeExtractedProfile(data: Record<string, any>): Partial<Profile> {
  const profile: Partial<Profile> = {};

  // Basic fields
  if (data.name) profile.name = String(data.name);
  if (data.title) profile.title = String(data.title);
  if (data.tagline) profile.tagline = String(data.tagline);
  if (data.email) profile.email = String(data.email);
  if (data.phone) profile.phone = String(data.phone);
  if (data.location) profile.location = String(data.location);
  if (data.summary) profile.summary = String(data.summary);

  // Skills
  if (Array.isArray(data.skills)) {
    profile.skills = data.skills.map((skill: any, index: number) => ({
      name: skill.name || `Skill ${index + 1}`,
      level: Math.min(100, Math.max(0, Number(skill.level) || 75)),
      category: skill.category || 'General',
    }));
  }

  // Experience
  if (Array.isArray(data.experience)) {
    profile.experience = data.experience.map((exp: any, index: number) => ({
      id: `exp-${Date.now()}-${index}`,
      company: exp.company || '',
      position: exp.position || exp.title || '',
      startDate: exp.startDate || '',
      endDate: exp.endDate || 'Present',
      description: exp.description || '',
      highlights: Array.isArray(exp.highlights) ? exp.highlights : [],
    }));
  }

  // Education
  if (Array.isArray(data.education)) {
    profile.education = data.education.map((edu: any, index: number) => ({
      id: `edu-${Date.now()}-${index}`,
      institution: edu.institution || edu.school || '',
      degree: edu.degree || '',
      field: edu.field || edu.major || '',
      startDate: edu.startDate || '',
      endDate: edu.endDate || '',
      description: edu.description || '',
    }));
  }

  // Certifications
  if (Array.isArray(data.certifications)) {
    profile.certifications = data.certifications.map((cert: any, index: number) => ({
      id: `cert-${Date.now()}-${index}`,
      name: cert.name || '',
      issuer: cert.issuer || '',
      date: cert.date || '',
      link: cert.link || '',
    }));
  }

  // Social
  if (data.social && typeof data.social === 'object') {
    profile.social = {
      github: data.social.github || '',
      linkedin: data.social.linkedin || '',
      twitter: data.social.twitter || '',
      instagram: data.social.instagram || '',
      website: data.social.website || '',
    };
  }

  return profile;
}

// Check if AI extraction is available
export function isAIExtractionAvailable(): boolean {
  const config = getAIConfig();
  return !!config.apiKey;
}
