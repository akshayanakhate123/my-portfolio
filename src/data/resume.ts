/* ─────────────────────────────────────────────────────────────
   resume.ts  —  Single source of truth
───────────────────────────────────────────────────────────── */

// Only prepend basePath in production builds — dev serves files at root
const bp = process.env.NODE_ENV === "production"
  ? (process.env.NEXT_PUBLIC_BASE_PATH ?? "")
  : "";

export const hero = {
  name:      "Akshaya Nakhate",
  oneLiner:  "Product-focused engineer with 2 years of experience building AI-enabled workflows, automation solutions, and user-centric products across healthcare and SaaS ecosystems.",
  manifesto: "Strong background in workflow automation, AI integrations, and product execution — translating user needs and business problems into scalable technical solutions.",
};

/* ── Education ────────────────────────────────────────────── */
export interface EducationEntry {
  degree:      string;
  institution: string;
  location:    string;
  duration:    string;
  cgpa?:       string;
  rank?:       string;
  current?:    boolean;
  highlight?:  string;
  bullets?:    string[];
}

export const education: EducationEntry[] = [
  {
    degree:      "PGP in Management and Technology",
    institution: "Scaler School of Business",
    location:    "Bangalore",
    duration:    "2025 – 2027",
    cgpa:        "3.69 / 4",
    rank:        "Top 10% of Cohort",
    current:     true,
    highlight:   "MBA",
  },
  {
    degree:      "B.Tech in Electrical & Electronics Engineering",
    institution: "Vellore Institute of Technology",
    location:    "Vellore, Tamil Nadu",
    duration:    "2018 – 2022",
    cgpa:        "9.07 / 10",
    highlight:   "UG",
  },
  {
    degree:      "Class 12 (CBSE)",
    institution: "Gyan Ganga International Academy",
    location:    "Bhopal, MP",
    duration:    "2018",
    cgpa:        "Percentage 82.00%",
  },
  {
    degree:      "Class 10 (CBSE)",
    institution: "Saint Joseph's Convent Idgah Hill",
    location:    "Bhopal, MP",
    duration:    "2016",
    cgpa:        "CGPA 10 / 10",
  },
];

/* ── Work Experience ──────────────────────────────────────── */
export interface JourneyEntry {
  company:     string;
  role:        string;
  location:    string;
  duration:    string;
  description: string;
  bullets?:    string[];
  tags?:       string[];
  type:        "work" | "internship" | "project";
}

export const workExperience: JourneyEntry[] = [
  {
    company:     "Accenture India Pvt Ltd",
    role:        "Advance Application Engineer Analyst",
    location:    "India",
    duration:    "Jul 2022 – Aug 2024",
    description: "Salesforce Developer building AI-enabled workflows and automation solutions across healthcare and SaaS clients. Solely owned a GenAI PoC integrating Data Cloud and Einstein LLM — reduced manual effort by 40% and improved agent query resolution speed by 30–50%. Resolved 50+ failed Apex and LWC test classes across enterprise clients, cutting deployment turnaround by 50%+ with zero SLA breaches. Automated recurring patient onboarding workflows, slashing intake time from 20 to 8 minutes. Drove 80% feature adoption across 2 engagements and automated 50+ survey cycles across 1,000+ patients, increasing repeat participation by 25%+.",
    tags: ["Salesforce", "Apex", "LWC", "GenAI", "Einstein LLM", "Data Cloud"],
    type: "work",
  },
];

/* ── Internships / Live Projects ──────────────────────────── */
export const internships: JourneyEntry[] = [
  {
    company:     "Intent Farm",
    role:        "Growth and Strategy Trainee",
    location:    "Bengaluru",
    duration:    "Feb 2026 – Apr 2026",
    description: "WalnutFolks Group — Google Premier, Meta, and Amazon Verified performance marketing agency. Surfaced category-level conversion gaps across 10+ D2C and B2B brands including Giordano Timewear, CodeYoung, and Soxy Sox by auditing PDP health, Meta/Google paid media inventory, and social content. Translated large unstructured datasets into actionable, data-backed client recommendations through standardised audit reports covering ad inventory, image-to-video ratios, and persona-channel fit. Designed a reusable 4-stage retention funnel (lead capture → nurture → reorder → referral) from cross-brand pattern analysis — now used as a standard playbook for new client engagements.",
    tags: ["Performance Marketing", "Growth Strategy", "D2C", "Meta Ads", "Google Ads"],
    type: "internship",
  },
  {
    company:     "MANIT Bhopal",
    role:        "Internship",
    location:    "Bhopal",
    duration:    "Dec 2020",
    description: "Designed and implemented Digital Circuits using Verilog code using Vivado software.",
    tags:        ["Verilog", "Digital Circuits"],
    type:        "internship",
  },
  {
    company:     "Andritz Hydro Private Limited",
    role:        "Industrial Trainee",
    location:    "Bhopal, MP",
    duration:    "June 2020",
    description: "Worked on the design and testing of components used in synchronous generators, gaining hands-on exposure to manufacturing and quality processes. Analyzed production workflows and documented key engineering practices, culminating in a detailed report on the end-to-end manufacturing process of synchronous generators.",
    tags:        ["Electrical Engineering", "Synchronous Generator"],
    type:        "internship",
  },
];

/* ── Projects ─────────────────────────────────────────────── */
export interface ProjectEntry {
  name:        string;
  description: string;
  stack:       string[];
  link?:       string;
  image?:      string;
  featured?:   boolean;
}

export const projects: ProjectEntry[] = [
  {
    name:        "2 AM Buddy – AI Voice Emotional Support Agent",
    description: "Developed a 24/7 AI voice companion that provides emotional support through natural conversations and safety-aware escalation workflows. Integrated voice AI, calendar booking, automated summaries, and counselor referrals into a single experience. Achieved 30–40% repeat usage across beta users with an average engagement time of 3–5 minutes. Won 1st place at a hackathon among 10 competing teams.",
    stack:       ["VAPI", "GPT-4o", "ElevenLabs", "Make.com", "Calendly", "Google APIs"],
    image:       `${bp}/projects/buddy.png`,
    featured:    true,
  },
  {
    name:        "AuditGPT – AI-Powered Growth Diagnostics Platform",
    description: "Built a self-serve SaaS platform that automates growth audits for D2C brands in minutes instead of hours. Analyzes websites across PDP health, creatives, social presence, retention signals, and SEO to generate actionable recommendations. Reduced audit turnaround time from 6 hours to 20 minutes and tested across 10+ live brands.",
    stack:       ["Next.js", "FastAPI", "Playwright", "Groq", "Supabase", "Railway"],
    image:       `${bp}/projects/audit.png`,
    link:        "https://audit-gpt-c.vercel.app",
    featured:    true,
  },
  {
    name:        "MindLoop – AI-Powered Structured Thinking Platform",
    description: "Built an audio-first platform that helps MBA students practice guesstimates and case interviews through voice interactions. Generates daily reasoning challenges and delivers AI feedback on structure, assumptions, accuracy, and creativity. Added streak-based progression and PDF exports. Implemented a multi-LLM fallback system to ensure uninterrupted performance.",
    stack:       ["Next.js", "Groq", "Gemini", "Speech-to-Text"],
    image:       `${bp}/projects/mindloop.png`,
    link:        "https://mind-loop-k3xq.vercel.app",
  },
  {
    name:        "Mentorship Booking Portal",
    description: "Built a full-stack mentorship booking platform enabling mentor discovery, conflict-free scheduling, automated meeting creation, and feedback-gated rebooking. Automated workflows across Google Sheets, Calendar, Gmail, Meet, and Drive. Reduced manual coordination effort by 10–15 minutes per booking. Tested across 7 mentors and 100+ students with role-based experiences for students, mentors, and admins.",
    stack:       ["Google Apps Script", "Sheets", "Calendar API", "Gmail", "Google Meet"],
    image:       `${bp}/projects/mentorship.png`,
  },
  {
    name:        "Enhanced LinkedIn – MBA Professional Networking Platform",
    description: "Built a mobile-first professional networking platform for verified MBA students and alumni. Features intent-based messaging replacing generic connection requests, bookable paid Office Hours for mentorship conversations, and cohort intelligence dashboards surfacing peer achievements and salary benchmarks by function. Designed to convert alumni networks into interviews, referrals, and offers during the critical 24-month MBA recruitment window. AI layer powers post rewriting, outreach intent classification, and personalised weekly cohort digests.",
    stack:       ["React 19", "TanStack Start", "TanStack Router", "Tailwind CSS v4", "Cloudflare Workers", "Supabase", "PostgreSQL"],
    link:        "https://github.com/akshayanakhate123/enchanced-linkedin",
  },
  {
    name:        "Enhanced Nykaa – AI-Powered Beauty Shopping App",
    description: "Built a fully functional Nykaa shopping experience enhanced with four feature solutions targeting real user pain points. Added an AI Store mode with interactive aisle mapping and a mock AI beauty assistant, a tier-based loyalty rewards program (Beauty Insider → Icon), BOPIS (Buy Online, Pick Up In Store) with express delivery, and a sample request system for home delivery testing. Deployed as a mobile-optimised React SPA with bottom-tab navigation and localStorage-backed cart persistence.",
    stack:       ["React 19", "TanStack Start", "Vite 7", "Tailwind CSS v4", "TypeScript", "TanStack Router"],
    link:        "https://enhanced-nykaa-beauty-app.lovable.app/",
  },
  {
    name:        "StudiSpot – Real-Time Study Space Finder",
    description: "Built a mobile-first web app that helps students find available study spaces across cafes, libraries, and coworking spaces in real-time. Features a proprietary Confidence Score (0–100%) predicting availability using historical patterns, time-of-day signals, and noise levels. Users can book instantly, check in via QR code, and complete the full flow in under 30 seconds. Includes an in-app wallet with preset top-ups, auto-release for no-shows, and swipeable discovery with one-tap filters like Exam Rush and Last-Minute.",
    stack:       ["React 18", "TypeScript", "Tailwind CSS", "Framer Motion", "React Router v6", "Vite 5", "Supabase"],
    link:        "https://github.com/akshayanakhate123/studispot",
  },
  {
    name:        "SuccessOS – AI-Powered Exam Prep Platform",
    description: "Built a behavioral-infrastructure platform that transforms exam preparation from passive consumption to active mastery. A Nudge Bot interrupts passive reading every 15 minutes with conceptual prompts, while Mastery Gates run weekly concept-transfer tests using unfamiliar question formats to validate true understanding. The system auto-generates 25 micro-tasks each Sunday from student-selected topics. A Topic Mastery Heatmap, cohort leaderboard, and peer doubt resolution via voice notes and annotated images drive structured learning and accountability.",
    stack:       ["React 18", "TypeScript", "Tailwind CSS", "shadcn/ui", "Supabase", "Vite 5", "Perplexity API"],
    link:        "https://github.com/akshayanakhate123/SuccessOS",
  },
  {
    name:        "Split Happens – OCR-Powered AI Bill Splitting App",
    description: "Built an AI-powered receipt scanning application that automatically calculates fair bill splits among groups. Used OCR and Gemini AI to extract line items, prices, taxes, and tips with high accuracy. Achieved 100% OCR accuracy across 30+ receipt formats and 80% flow completion during testing.",
    stack:       ["React", "Gemini API", "OCR"],
    image:       `${bp}/projects/split.png`,
    featured:    true,
  },
  {
    name:        "Mitti Mitra – AI-Powered Soil Intelligence Platform",
    description: "Built an AI-powered farming assistant that helps farmers diagnose soil and crop health using a simple photo. Provides instant recommendations, expert consultation access, and daily weather-aware farming guidance through a low-literacy-friendly interface. Designed to make agricultural expertise accessible to small farmers without expensive advisory services.",
    stack:       ["AI Image Analysis", "Conversational AI", "Mobile-First"],
    image:       `${bp}/projects/mitti.png`,
    link:        "https://github.com/akshayanakhate123/Mitti-Mitra",
  },
];

/* ── Achievements ─────────────────────────────────────────── */
export interface AchievementEntry {
  title:       string;
  event:       string;
  year:        string;
  description: string;
  image:       string;
  icon?:       string; // Lucide icon name
}

export const achievements: AchievementEntry[] = [
  {
    title:       "2 AM Buddy",
    event:       "Hackathon Winner — 1st / 10 Teams",
    year:        "2025",
    description: "Built a 24/7 AI voice emotional support agent; won 1st place at the hackathon.",
    image:       `${bp}/achievements/buddy.jpg`,
    icon:        "Trophy",
  },
  {
    title:       "IIM Lucknow — M-Day Ad Making",
    event:       "Winner — 1st / 500 Teams",
    year:        "2025",
    description: "Repositioned Fevicol for Gen Z via 'Commitment Level: Permanent' campaign with consumer insight → brand strategy → 3-phase media rollout.",
    image:       `${bp}/achievements/iim_lucknow.jpg`,
    icon:        "Medal",
  },
  {
    title:       "SIBM Pune — Marketing Case Competition",
    event:       "1st Runner-Up — 2nd / 400 Teams",
    year:        "2025",
    description: "Diagnosed Glowry's macro-influencer trust deficit; built a 70:30 micro-nano funnel targeting 10-25% conversion lift. Led to an internship at Intent Farm.",
    image:       `${bp}/achievements/sibm_pune.png`,
    icon:        "Award",
  },
  {
    title:       "COMET'26 × Flipkart PM Case (IIT Roorkee)",
    event:       "Top 10 / 500 Teams",
    year:        "2026",
    description: "Designed a 3-Layer Stickiness Engine (Incentives, Trust, Habit) to increase Gen Z engagement, retention, and wallet share on Flipkart.",
    image:       `${bp}/achievements/flipkart.png`,
    icon:        "Target",
  },
  {
    title:       "Spark Tank D2C Challenge",
    event:       "1st Runner-Up",
    year:        "2024",
    description: "Secured runner-up position with The Mombatti Co. — generated ₹2L revenue and ₹42.5K net profit from a 0→1 D2C scented candle venture.",
    image:       `${bp}/achievements/d2c.png`,
    icon:        "Flame",
  },
  {
    title:       "Practo GMV Growth Strategy",
    event:       "Top 3 / 10 Teams",
    year:        "2025",
    description: "Led 26 interviews + 130 surveys to diagnose 60-70% GMV leakage; presented full GTM strategy to Practo's CMO targeting 25-35% GMV lift in Year 1.",
    image:       `${bp}/achievements/practo.png`,
    icon:        "BarChart2",
  },
  {
    title:       "IETE National Conference",
    event:       "Research Publication — Top 10 / 50+ Papers",
    year:        "2022",
    description: "Co-authored a peer-reviewed paper on low-power flip-flop design presented at MANIT Bhopal; recognised in top 10 among 50+ submitted papers at the IETE-sponsored national conference.",
    image:       `${bp}/achievements/iete.jpg`,
    icon:        "FileText",
  },
  {
    title:       "Salesforce Data Cloud Consultant",
    event:       "Certified — Mar 2024",
    year:        "2024",
    description: "Expertise in managing and utilising Salesforce Data Cloud resources for enterprise data unification.",
    image:       `${bp}/achievements/sf_datacloud.png`,
    icon:        "Cloud",
  },
  {
    title:       "Salesforce Life Science Cloud",
    event:       "Certified — Jan 2024",
    year:        "2024",
    description: "Specialised certification for Salesforce applications in the life sciences industry.",
    image:       `${bp}/achievements/sf_lifescience.png`,
    icon:        "Microscope",
  },
  {
    title:       "Salesforce Platform App Builder",
    event:       "Certified — Nov 2023",
    year:        "2023",
    description: "Design and build custom applications on the Salesforce platform.",
    image:       `${bp}/achievements/sf_developer.png`,
    icon:        "Layers",
  },
  {
    title:       "Salesforce Platform Developer I",
    event:       "Certified — Jul 2023",
    year:        "2023",
    description: "Demonstrated skills in Apex, Visualforce, and Lightning components.",
    image:       `${bp}/achievements/sf_appbuilder.png`,
    icon:        "Code2",
  },
  {
    title:       "Salesforce Administrator",
    event:       "Certified — Mar 2023",
    year:        "2023",
    description: "Foundational certification for managing Salesforce instances and org configuration.",
    image:       `${bp}/achievements/sf_admin.png`,
    icon:        "Settings2",
  },
];

/* ── Connect ──────────────────────────────────────────────── */
export const connect = {
  email:    "akshaya.nakhate@gmail.com",
  linkedin: "https://www.linkedin.com/in/akshaya-nakhate/",
  github:   "https://github.com/akshayanakhate123",
};
