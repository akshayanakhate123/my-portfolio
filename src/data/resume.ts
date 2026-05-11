/* ─────────────────────────────────────────────────────────────
   resume.ts  —  Single source of truth derived from ResumeDraft.pdf
───────────────────────────────────────────────────────────── */

export const hero = {
  name:      "Akshaya Nakhate",
  oneLiner:  "PGP in Management and Technology @ Scaler School of Business. Salesforce Developer. GenAI Explorer.",
  manifesto: "I am passionate about building products and constantly learning. Every day, I'm exploring something new.",
};

/* ── Education ────────────────────────────────────────────── */
export interface EducationEntry {
  degree:      string;
  institution: string;
  location:    string;
  duration:    string;
  cgpa?:       string;
  current?:    boolean;
  highlight?:  string;
}

export const education: EducationEntry[] = [
  {
    degree:      "PGP in Management and Technology",
    institution: "Scaler School of Business",
    location:    "Bangalore",
    duration:    "2025 – 2027",
    cgpa:        "3.54",
    current:     true,
    highlight:   "MBA",
  },
  {
    degree:      "B.Tech Electrical and Electronics Engineering",
    institution: "Vellore Institute of Technology",
    location:    "Vellore, Tamil Nadu",
    duration:    "2018 – 2022",
    cgpa:        "9.07",
    highlight:   "UG",
  },
  {
    degree:      "Class 12 CBSE",
    institution: "Gyan Ganga International Academy",
    location:    "Bhopal, MP",
    duration:    "2018",
    cgpa:        "82.00%",
  },
  {
    degree:      "Class 10 CBSE",
    institution: "Gyan Ganga International Academy",
    location:    "Bhopal, MP",
    duration:    "2016",
    cgpa:        "10 CGPA",
  },
];

/* ── Work Experience ──────────────────────────────────────── */
export interface JourneyEntry {
  company:     string;
  role:        string;
  location:    string;
  duration:    string;
  description: string;
  tags?:       string[];
  type:        "work" | "internship" | "project";
}

export const workExperience: JourneyEntry[] = [
  {
    company:     "Accenture India",
    role:        "Advance Application Engineer Analyst",
    location:    "India",
    duration:    "July 2022 – Aug 2024",
    description: "Salesforce Developer specializing in configuration and customization. Resolved 100+ errors in test classes and transitioned to complex orgs like ALEXION and INITIENT, building GenAI assets and Einstein LLM templates.",
    tags:        ["Salesforce", "GenAI", "Apex", "Einstein LLM"],
    type:        "work",
  },
];

/* ── Internships / Live Projects ──────────────────────────── */
export const internships: JourneyEntry[] = [
  {
    company:     "Intent Farm",
    role:        "Performance Marketing (Live Project)",
    location:    "Bengaluru",
    duration:    "Jan 2026 – Present",
    description: "Market research for brands and providing growth recommendations in the performance marketing space.",
    tags:        ["Marketing", "Strategy", "Research"],
    type:        "internship",
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
    company:     "ANDRITZ",
    role:        "Vocational Training",
    location:    "Bhopal, MP",
    duration:    "June 2021 – July 2021",
    description: "Studied single phase & three phase motor, induction motors.",
    tags:        ["Electrical Engineering", "Motors"],
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
    name:        "2 Am Buddy – N8N AI Agent",
    description: "AI-powered voice support agent using n8n automation for mental health support.",
    stack:       ["N8N", "AI", "Voice Interface"],
    image:       "/projects/buddy.png",
    featured:    true,
  },
  {
    name:        "Split Happens",
    description: "Smart expense-splitting app with OCR-based receipt scanning.",
    stack:       ["Replit AI", "OCR", "React"],
    image:       "/projects/split.png",
    featured:    true,
  },
  {
    name:        "Mitti-Mitra",
    description: "Social-impact prototype for community collaboration for sustainability.",
    stack:       ["Vibe Coding", "Sustainability"],
    image:       "/projects/mitti.png",
    link:        "https://github.com/ak-na-ja/Mitti-Mitra.git",
  },
];

/* ── Achievements ─────────────────────────────────────────── */
export interface AchievementEntry {
  title:       string;
  event:       string;
  year:        string;
  description: string;
  image:       string;
  icon?:       string;
}

export const achievements: AchievementEntry[] = [
  {
    title:       "Spark Tank D2C Challenge",
    event:       "2nd Position",
    year:        "2024",
    description: "Secured runner-up position in a prestigious D2C business case competition.",
    image:       "/achievements/spark.png",
    icon:        "🥈",
  },
  {
    title:       "Salesforce Data Cloud Consultant",
    event:       "Certified",
    year:        "2024",
    description: "Expertise in managing and utilizing data cloud resources.",
    image:       "/achievements/salesforce.png",
    icon:        "☁️",
  },
  {
    title:       "Salesforce Platform App Builder",
    event:       "Certified",
    year:        "2024",
    description: "Design and build custom applications on the Salesforce platform.",
    image:       "/achievements/salesforce.png",
    icon:        "☁️",
  },
  {
    title:       "Salesforce Platform Developer I",
    event:       "Certified",
    year:        "2023",
    description: "Demonstrated skills in Apex, Visualforce, and Lightning components.",
    image:       "/achievements/salesforce.png",
    icon:        "☁️",
  },
  {
    title:       "Salesforce Administrator",
    event:       "Certified",
    year:        "2023",
    description: "Foundational certification for managing Salesforce instances.",
    image:       "/achievements/salesforce.png",
    icon:        "☁️",
  },
  {
    title:       "Salesforce Associate",
    event:       "Certified",
    year:        "2023",
    description: "Entry-level certification demonstrating platform knowledge.",
    image:       "/achievements/salesforce.png",
    icon:        "☁️",
  },
];

/* ── Connect ──────────────────────────────────────────────── */
export const connect = {
  email:    "akshaya.nakhate@gmail.com",
  linkedin: "https://www.linkedin.com/in/akshaya-nakhate/",
  github:   "https://github.com/ak-na-ja",
};
