# Dynamic Portfolio

A stunning, highly configurable portfolio website with 3D animations, AI-powered resume extraction, and a powerful admin panel.

![Portfolio Preview](https://via.placeholder.com/1200x630/0a0a0f/0ea5e9?text=Dynamic+Portfolio)

## ✨ Features

### 🎨 Design & Animation
- **3D Hero Scene**: Stunning Three.js-powered morphing sphere with floating particles
- **Liquid Animations**: Smooth Framer Motion transitions throughout
- **Single-Page Experience**: All information visible without scrolling
- **Modal-Based Navigation**: Click to explore different sections
- **Customizable Themes**: Choose accent colors and toggle animations
- **Responsive Design**: Works beautifully on all devices

### 👤 Portfolio Sections
- **Hero Introduction**: Animated name, title, and tagline
- **Experience**: Work history with highlights
- **Skills**: Categorized skills with proficiency bars
- **Projects**: Showcase your work with technologies used
- **Education**: Academic background
- **Certifications**: Professional certifications
- **Contact**: Email, phone, location, and social links

### 🔧 Admin Panel
- **Resume Upload**: Drag & drop PDF/DOC/TXT files
- **AI Extraction**: Automatically extract profile data from resume
- **Manual Editing**: Full control over all profile fields
- **Settings**: Customize theme, colors, and animations
- **Secure Auth**: JWT-based authentication

### 🤖 AI Integration
Supports multiple AI providers for resume parsing:
- **OpenAI** (GPT-4)
- **Anthropic** (Claude)
- **Custom LLM** (Any OpenAI-compatible API)

### 📦 Storage
- **File-Based**: No database required
- **JSON Storage**: Simple and portable
- **Easy Backup**: Just copy the `data/` folder

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd dynamic-portfolio

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000` for the portfolio and `http://localhost:3000/admin` for the admin panel.

### Default Admin Credentials
- **Username**: `admin`
- **Password**: `admin123`

⚠️ **Change these in production!**

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file:

```env
# Admin Credentials (CHANGE THESE!)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-min-32-chars

# AI Provider (openai | anthropic | custom)
AI_PROVIDER=openai

# OpenAI Configuration
OPENAI_API_KEY=sk-...

# Anthropic Configuration (if using Claude)
ANTHROPIC_API_KEY=sk-ant-...

# Custom LLM Configuration (for other providers)
CUSTOM_LLM_API_KEY=your-api-key
CUSTOM_LLM_BASE_URL=https://api.your-provider.com/v1
CUSTOM_LLM_MODEL=model-name

# Site URL (for production)
SITE_URL=https://your-domain.com
```

### AI Provider Setup

#### OpenAI
1. Get API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Set `AI_PROVIDER=openai` and `OPENAI_API_KEY=sk-...`

#### Anthropic (Claude)
1. Get API key from [Anthropic Console](https://console.anthropic.com/)
2. Set `AI_PROVIDER=anthropic` and `ANTHROPIC_API_KEY=sk-ant-...`

#### Custom LLM (Cursor, Emergent, etc.)
1. Get your API credentials
2. Set:
   ```env
   AI_PROVIDER=custom
   CUSTOM_LLM_API_KEY=your-key
   CUSTOM_LLM_BASE_URL=https://api.provider.com/v1
   CUSTOM_LLM_MODEL=model-name
   ```

## 📖 Admin Panel Guide

### Accessing the Admin Panel

1. Navigate to `http://your-domain.com/admin/login`
2. Enter your admin credentials
3. You'll be redirected to the dashboard

### Uploading a Resume

1. Go to the Admin Panel
2. Drag & drop your resume (PDF, DOC, DOCX, or TXT)
3. If AI extraction is configured:
   - Your profile will be automatically populated
   - Review and edit the extracted data
4. If AI is not configured:
   - File will be uploaded for download
   - Fill in profile manually

### Managing Content

Navigate through tabs to edit:
- **Profile**: Basic info, summary, social links
- **Experience**: Work history
- **Skills**: Technical skills with proficiency
- **Projects**: Portfolio projects
- **Education**: Academic background
- **Certifications**: Professional certs
- **Settings**: Theme, colors, animations

### Saving Changes

Click the **Save** button in the header to persist all changes.

---

## 🚀 Deployment on GCP Virtual Machine

### Step 1: Create a GCP VM Instance

```bash
# Create a VM instance (using gcloud CLI)
gcloud compute instances create portfolio-vm \
  --zone=us-central1-a \
  --machine-type=e2-small \
  --image-family=ubuntu-2204-lts \
  --image-project=ubuntu-os-cloud \
  --boot-disk-size=20GB \
  --tags=http-server,https-server

# Create firewall rules for HTTP/HTTPS
gcloud compute firewall-rules create allow-http \
  --direction=INGRESS \
  --priority=1000 \
  --network=default \
  --action=ALLOW \
  --rules=tcp:80,tcp:443,tcp:3000 \
  --target-tags=http-server,https-server
```

### Step 2: Connect to Your VM

```bash
gcloud compute ssh portfolio-vm --zone=us-central1-a
```

### Step 3: Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install git
sudo apt install -y git

# Install PM2 for process management
sudo npm install -g pm2
```

### Step 4: Clone and Setup Project

```bash
# Clone your repository
cd /home/$USER
git clone <your-repo-url> portfolio
cd portfolio

# Install dependencies
npm install

# Create environment file
nano .env.local
```

Add your environment variables:
```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password-here
JWT_SECRET=generate-a-random-32-char-string-here
AI_PROVIDER=openai
OPENAI_API_KEY=your-key-here
SITE_URL=http://your-vm-external-ip:3000
```

### Step 5: Build and Run

```bash
# Build the application
npm run build

# Start with PM2
pm2 start npm --name "portfolio" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Run the command it outputs
```

### Step 6: Access Your Portfolio

1. Get your VM's external IP:
   ```bash
   gcloud compute instances describe portfolio-vm \
     --zone=us-central1-a \
     --format='get(networkInterfaces[0].accessConfigs[0].natIP)'
   ```

2. Visit: `http://<EXTERNAL-IP>:3000`
3. Admin panel: `http://<EXTERNAL-IP>:3000/admin`

### Step 7: (Optional) Setup Nginx and SSL

```bash
# Install Nginx
sudo apt install -y nginx

# Install Certbot for SSL
sudo apt install -y certbot python3-certbot-nginx

# Create Nginx config
sudo nano /etc/nginx/sites-available/portfolio
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Get SSL certificate (if you have a domain)
sudo certbot --nginx -d your-domain.com
```

---

## 📱 Using the Admin Panel

### Quick Access
- **URL**: `http://your-domain.com/admin`
- **Default Login**: admin / admin123

### Workflow

1. **Login** at `/admin/login`
2. **Upload Resume** (optional) - AI will extract your data
3. **Edit Profile** - Fill in or modify your information
4. **Customize Settings** - Choose theme colors and animations
5. **Save Changes** - Click the Save button
6. **Preview** - Click "View Site" to see your portfolio

### Tips
- Use PDF format for best AI extraction results
- Adjust particle count in Settings for better performance
- Choose an accent color that matches your personality
- Keep your summary concise (2-3 sentences)

---

## 🔒 Security Recommendations

1. **Change Default Credentials**: Update `ADMIN_USERNAME` and `ADMIN_PASSWORD`
2. **Use Strong JWT Secret**: Generate a random 32+ character string
3. **Enable HTTPS**: Use SSL/TLS in production
4. **Regular Updates**: Keep dependencies updated
5. **Backup Data**: Regularly backup the `data/` folder

---

## 📁 Project Structure

```
dynamic-portfolio/
├── app/
│   ├── admin/
│   │   ├── login/page.tsx    # Admin login
│   │   ├── layout.tsx        # Admin layout
│   │   └── page.tsx          # Admin dashboard
│   ├── api/
│   │   ├── auth/route.ts     # Authentication API
│   │   ├── profile/route.ts  # Profile CRUD API
│   │   └── resume/
│   │       ├── route.ts      # Resume upload API
│   │       └── download/route.ts
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Homepage
├── components/
│   ├── 3d/
│   │   └── Scene3D.tsx       # Three.js 3D scene
│   ├── animations/
│   │   └── Animations.tsx    # Framer Motion components
│   └── sections/
│       ├── HeroSection.tsx   # Main hero section
│       └── Modals.tsx        # Content modals
├── lib/
│   ├── ai-extractor.ts       # AI resume parsing
│   ├── auth.ts               # Authentication helpers
│   └── storage.ts            # File-based storage
├── data/
│   ├── profile.json          # Profile data
│   └── uploads/              # Uploaded files
├── middleware.ts             # Auth middleware
├── .env.example              # Environment template
└── README.md                 # This file
```

---

## 🛠️ Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

---

## 📄 License

MIT License - feel free to use for your personal portfolio!

---

## 🙏 Credits

Built with:
- [Next.js 14](https://nextjs.org/)
- [Three.js](https://threejs.org/) & [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

---

**Made with ❤️ for developers who want to stand out**