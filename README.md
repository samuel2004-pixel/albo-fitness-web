# ALBO FITNESS - Gym Website

A professional React-based gym website showcasing trainers, testimonials, FAQs, and customer enquiries management system integrated with Supabase.

## Features

✅ **Trainer Showcase** - Interactive slider to display trainers with their certifications and experience
✅ **Testimonials** - Display customer reviews and ratings
✅ **FAQs** - Frequently asked questions section
✅ **Customer Enquiries** - Form to collect customer information
✅ **Admin Dashboard** - Manage all content (trainers, testimonials, FAQs, gym info)
✅ **Gym Information** - Display gym address, contact, hours, and about section
✅ **Responsive Design** - Works on all devices

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- Supabase (PostgreSQL backend)
- Lucide Icons

## Project Structure

```
albo-fitness/
├── src/
│   ├── components/
│   │   ├── admin/                 # Admin management components
│   │   │   ├── TrainerManagement.jsx
│   │   │   ├── TestimonialManagement.jsx
│   │   │   ├── FAQManagement.jsx
│   │   │   ├── GymInfoManagement.jsx
│   │   │   └── EnquiriesViewer.jsx
│   │   ├── AdminDashboard.jsx    # Main admin panel
│   │   ├── TrainerSlider.jsx     # Trainer carousel
│   │   ├── Testimonials.jsx
│   │   ├── FAQSection.jsx
│   │   ├── EnquiryForm.jsx
│   │   ├── GymInfo.jsx
│   │   ├── Header.jsx
│   │   └── Hero.jsx
│   ├── services/
│   │   ├── supabase.js           # Supabase client
│   │   └── dbSetup.js            # Database SQL templates
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example                  # Environment variables template
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

## Setup Instructions

### 1. Supabase Setup

#### Option A: Quick Setup (Recommended)
```bash
# 1. Go to https://supabase.com
# 2. Sign up with Google/GitHub
# 3. Click "New Project"
#    - Project name: albo-fitness
#    - Password: (create a secure password)
#    - Region: Choose closest to you
# 4. Wait for project to be created
```

#### Option B: Using SQL Editor
Once your project is created in Supabase:

1. Go to **SQL Editor** → **New Query**
2. Copy and paste **each** SQL block from `src/services/dbSetup.js`
3. Run each query to create tables

**Tables to create:**
- trainers
- testimonials
- faqs
- gym_info
- enquiries

### 2. Get Supabase Credentials

1. Go to **Settings → API**
2. Copy **Project URL** (looks like: `https://xxxxx.supabase.co`)
3. Copy **Anon Public Key** (the long string)

### 3. Setup Local Project

```bash
# 1. Clone or extract the project
cd albo-fitness

# 2. Create .env file (copy from .env.example)
cp .env.example .env

# 3. Edit .env and add your credentials
# VITE_SUPABASE_URL=https://your-project-id.supabase.co
# VITE_SUPABASE_ANON_KEY=your-anon-key-here

# 4. Install dependencies
npm install

# 5. Start development server
npm run dev
```

The website will be available at `http://localhost:5173`

## Usage

### Public Website
- **Home**: Hero section with call-to-action
- **Trainers**: Slide through trainers with arrow buttons or dots
- **Testimonials**: Read client reviews
- **FAQs**: Common questions answered
- **Contact**: Submit enquiry form
- **Gym Info**: View address, hours, contact info

### Admin Dashboard
- **URL**: Click "Admin" button on website or go to `/admin`
- **Password**: `admin123` (Change this in `AdminDashboard.jsx`)
- **Tabs**:
  - **Trainers**: Add/edit/delete trainers
  - **Testimonials**: Manage client testimonials
  - **FAQs**: Create FAQ items
  - **Gym Info**: Update gym information
  - **Enquiries**: View customer enquiries (CSV export available)

## Enquiry Form Fields

When customers submit an enquiry, the following information is collected:
- Name
- Email
- Phone Number
- Age
- Gender
- Goal/Physique (Weight Loss, Muscle Gain, Toning, etc.)
- Height (cm)
- Weight (kg)

## Customization

### Change Admin Password
Edit `src/components/AdminDashboard.jsx`:
```jsx
if (adminPassword === 'admin123') {  // Change this
  setIsLoggedIn(true);
}
```

### Change Branding Colors
Edit `tailwind.config.js` to customize colors, or use the gray-900 (dark) theme currently in place.

### Update Trainer Slider
Edit `src/components/TrainerSlider.jsx` to customize the trainer card layout.

## Database Schema

### trainers
```sql
- id: BIGINT PRIMARY KEY
- name: TEXT
- photo_url: TEXT
- certifications: TEXT
- experience_years: INT
- specialization: TEXT
- bio: TEXT
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### testimonials
```sql
- id: BIGINT PRIMARY KEY
- client_name: TEXT
- message: TEXT
- rating: INT (1-5)
- created_at: TIMESTAMP
```

### faqs
```sql
- id: BIGINT PRIMARY KEY
- question: TEXT
- answer: TEXT
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### gym_info
```sql
- id: BIGINT PRIMARY KEY
- name: TEXT (default: 'ALBO FITNESS')
- address: TEXT
- phone: TEXT
- email: TEXT
- hours: TEXT
- about: TEXT
- updated_at: TIMESTAMP
```

### enquiries
```sql
- id: BIGINT PRIMARY KEY
- name: TEXT
- email: TEXT
- phone: TEXT
- age: INT
- gender: TEXT
- goal_physique: TEXT
- height: DECIMAL
- weight: DECIMAL
- created_at: TIMESTAMP
```

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload the dist/ folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Deploy dist/ to GitHub Pages
```

## Important Notes

⚠️ **Security**
- Change the admin password immediately
- Enable Row-Level Security (RLS) on Supabase if making this production-ready
- Keep your Supabase anon key safe

📧 **Enquiries**
- Enquiries are stored in Supabase
- Export as CSV from admin panel
- No automatic email notifications (integrate email service if needed)

🔄 **Data Updates**
- All changes in admin panel update immediately in the website
- No page refresh needed

## Support

For issues or questions, refer to:
- Supabase Docs: https://supabase.com/docs
- React Docs: https://react.dev
- Tailwind CSS: https://tailwindcss.com

---

**Built with ❤️ for ALBO FITNESS**
