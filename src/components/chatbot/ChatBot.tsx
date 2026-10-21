"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, MessageCircle, Trophy, Medal, Award, Target, Flame, BarChart2 } from "lucide-react";

interface RichLine { icon: React.ElementType; text: string }
interface Message {
  from: "bot" | "user";
  text: string;
  richLines?: RichLine[];
  suggestions?: string[];
}

const FAQS: { keywords: string[]; answer: string; richLines?: RichLine[]; suggestions: string[] }[] = [
  {
    keywords: ["who", "about", "introduce", "akshaya", "yourself", "background"],
    answer:
      "Akshaya Nakhate is an Associate Product Manager specialising in Growth & AI Products. She's an Engineer turned MBA candidate at Scaler School of Business, with 2+ years at Accenture building Salesforce & GenAI solutions, and internship experience at InCred Wealth and Intent Farm.",
    suggestions: ["Where has she worked?", "What projects has she built?", "What are her achievements?"],
  },
  {
    keywords: ["work", "experience", "accenture", "job", "career", "professional", "engineer", "analyst"],
    answer:
      "Akshaya worked as an Advance Application Engineering Analyst at Accenture India (Jul 2022 - Aug 2024), building AI-enabled Salesforce workflows for healthcare and SaaS clients. Key wins: GenAI PoC cutting manual effort by 40%, LWC automation driving 80% adoption, and reducing patient intake time from 20 to 8 minutes.",
    suggestions: ["What about her internships?", "What Salesforce skills does she have?", "What GenAI work has she done?"],
  },
  {
    keywords: ["incred", "wealth", "product intern", "fintech", "crm", "zoho"],
    answer:
      "Akshaya interned as a Product Intern at InCred Wealth (Aug-Oct 2026), a SEBI-registered wealth management platform. She built a Zoho CRM for AMC sales workflows saving 25-35% daily manual tracking per RM, led discovery for a self-serve distributor onboarding portal, and consolidated 10+ metric sources into a single analytics dashboard.",
    suggestions: ["Tell me about Intent Farm internship", "What PM skills does she have?", "What's her education?"],
  },
  {
    keywords: ["intent farm", "marketing", "growth", "d2c", "meta", "google ads", "internship"],
    answer:
      "Akshaya did a Growth & Strategy Traineeship at Intent Farm (Feb-Apr 2026), a Google Premier & Meta Verified performance marketing agency. She audited 10+ D2C brands including Giordano and CodeYoung, and designed a reusable 4-stage retention funnel now used as a standard playbook.",
    suggestions: ["Tell me about InCred internship", "What projects has she built?", "What are her skills?"],
  },
  {
    keywords: ["education", "study", "mba", "scaler", "college", "university", "degree", "vit", "vellore"],
    answer:
      "Akshaya is pursuing a PGP in Management and Technology at Scaler School of Business (2025-2027), ranked in the Top 10% of her cohort with a 3.71/4 GPA. She holds a B.Tech in Electrical & Electronics Engineering from VIT Vellore (2018-2022), graduating with a 9.07/10 CGPA.",
    suggestions: ["What competitions has she won?", "Where has she worked?", "What has she built?"],
  },
  {
    keywords: ["project", "build", "built", "product", "app", "portfolio"],
    answer:
      "Akshaya has built 12 products across AI, fintech, and SaaS:\n• 2AM Buddy - AI voice emotional support (Hackathon winner)\n• AuditGPT - Growth diagnostics for D2C brands\n• MindLoop - AI case interview practice\n• Ola Link - Urban commute guarantee engine\n• CreVa - AI deal intelligence for creators\n• Enhanced LinkedIn, Nykaa, StudiSpot, SuccessOS, and more\n\nAsk me about any specific one!",
    suggestions: ["Tell me about 2AM Buddy", "What's AuditGPT?", "Tell me about Ola Link"],
  },
  {
    keywords: ["2am", "buddy", "voice", "emotional", "support", "hackathon", "vapi"],
    answer:
      "2AM Buddy is a 24/7 AI voice companion for emotional support, built using VAPI, GPT-4o, ElevenLabs, and Make.com. It includes calendar booking, automated summaries, and counselor referrals. It achieved 30-40% repeat usage across beta users and won 1st place at a hackathon among 10 teams.",
    suggestions: ["What's AuditGPT?", "Tell me about MindLoop", "What other AI projects has she built?"],
  },
  {
    keywords: ["auditgpt", "audit", "diagnostic", "saas"],
    answer:
      "AuditGPT is a self-serve SaaS platform that automates growth audits for D2C brands. It analyzes websites across PDP health, creatives, social presence, and SEO. It reduced audit turnaround from 6 hours to 20 minutes and was tested across 10+ live brands. Built with Next.js, FastAPI, Playwright, and Groq.",
    suggestions: ["Tell me about 2AM Buddy", "What's MindLoop?", "Tell me about CreVa"],
  },
  {
    keywords: ["mindloop", "case", "interview", "guesstimate", "practice"],
    answer:
      "MindLoop is an audio-first platform helping MBA students practice guesstimates and case interviews via voice. It generates daily reasoning challenges, delivers AI feedback on structure and accuracy, and includes streak-based progression. Built with a multi-LLM fallback using Next.js, Groq, and Gemini.",
    suggestions: ["Tell me about AuditGPT", "What's StudiSpot?", "Tell me about SuccessOS"],
  },
  {
    keywords: ["ola", "link", "commute", "electric", "feeder", "transit", "guarantee"],
    answer:
      "Ola Link is an APM product proposal for Ola Electric (India 2035) - a 3-layer system with a unified Link Pass, managed electric feeder network, and a Guarantee Engine that detects missed-connection risk and dispatches recovery. Includes a working corridor simulator built with React and TypeScript.",
    suggestions: ["Tell me about CreVa", "What other PM work has she done?", "What competitions has she won?"],
  },
  {
    keywords: ["creva", "creator", "deal", "influencer", "micro", "brand", "negotiation"],
    answer:
      "CreVa is a creator-side commercial command center for micro-creators (10K-100K followers). It includes AI deal valuation, contract review converting usage rights into rupees, 3-mode negotiation drafts, and a deal tracker. Built with Groq LLM, Supabase, React, and TypeScript.",
    suggestions: ["Tell me about Ola Link", "Tell me about 2AM Buddy", "What's her tech stack?"],
  },
  {
    keywords: ["achievement", "award", "win", "competition", "iim", "sibm", "comet", "flipkart", "practo"],
    answer:
      "Key achievements:",
    richLines: [
      { icon: Trophy,   text: "1st place - 2AM Buddy Hackathon (10 teams)" },
      { icon: Medal,    text: "1st place - IIM Lucknow M-Day Ad Making (500 teams)" },
      { icon: Award,    text: "1st Runner-Up - SIBM Pune Marketing Case (400 teams)" },
      { icon: Target,   text: "Top 10 - COMET'26 x Flipkart PM Case @ IIT Roorkee (500 teams)" },
      { icon: Flame,    text: "1st Runner-Up - Spark Tank D2C Challenge (₹2L revenue)" },
      { icon: BarChart2, text: "Top 3 - Practo GMV Growth Strategy" },
    ],
    suggestions: ["What certifications does she have?", "Tell me about 2AM Buddy", "What projects has she built?"],
  },
  {
    keywords: ["salesforce", "certification", "certified", "apex", "lwc", "lightning"],
    answer:
      "Akshaya holds 5 Salesforce certifications:\n• Data Cloud Consultant (Mar 2024)\n• Life Science Cloud (Jan 2024)\n• Platform App Builder (Nov 2023)\n• Platform Developer I (Jul 2023)\n• Administrator (Mar 2023)\n\nShe built GenAI PoCs on Salesforce Data Cloud + Einstein LLM at Accenture.",
    suggestions: ["What's her tech stack?", "Tell me about her Accenture work", "What GenAI work has she done?"],
  },
  {
    keywords: ["skill", "tech", "stack", "language", "tool", "technology"],
    answer:
      "Tech stack: Salesforce (Apex, LWC, Data Cloud, Einstein LLM), React, Next.js, TypeScript, Supabase, Python, Groq, Gemini, VAPI, Make.com, Zoho CRM, Vercel, Figma. Product skills: PRDs, user research, growth strategy, A/B testing, analytics dashboards, product discovery.",
    suggestions: ["What certifications does she have?", "What GenAI work has she done?", "What projects has she built?"],
  },
  {
    keywords: ["contact", "reach", "email", "linkedin", "github", "connect", "hire"],
    answer:
      "You can reach Akshaya at:\n📧 akshaya.nakhate@gmail.com\n💼 linkedin.com/in/akshaya-nakhate\n💻 github.com/akshayanakhate123",
    suggestions: ["What projects has she built?", "Tell me about her experience", "What are her achievements?"],
  },
  {
    keywords: ["genai", "ai", "artificial intelligence", "llm", "gpt", "generative"],
    answer:
      "Akshaya has built multiple GenAI products: a Salesforce + Einstein LLM PoC at Accenture (cut manual effort by 40%), 2AM Buddy (GPT-4o + ElevenLabs voice AI), AuditGPT (Groq-powered analysis), MindLoop (multi-LLM fallback), and CreVa (Groq LLM for deal valuation). She specialises in shipping GenAI into real workflows.",
    suggestions: ["Tell me about 2AM Buddy", "What's AuditGPT?", "What Salesforce AI work has she done?"],
  },
];

const INITIAL_SUGGESTIONS = [
  "What projects has she built?",
  "Where has she worked?",
  "What competitions has she won?",
];

function match(input: string): { answer: string; richLines?: RichLine[]; suggestions: string[] } {
  const lower = input.toLowerCase();
  let best = { score: 0, answer: "", richLines: undefined as RichLine[] | undefined, suggestions: [] as string[] };
  for (const faq of FAQS) {
    const score = faq.keywords.filter((k) => lower.includes(k)).length;
    if (score > best.score) best = { score, answer: faq.answer, richLines: faq.richLines, suggestions: faq.suggestions };
  }
  return best.score > 0
    ? { answer: best.answer, richLines: best.richLines, suggestions: best.suggestions }
    : {
        answer: "I'm not sure about that one. Try asking about Akshaya's projects, work experience, education, skills, achievements, or how to contact her!",
        suggestions: ["What projects has she built?", "Where has she worked?", "What are her achievements?"],
      };
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: "Hi - I'm Akshaya's portfolio assistant. Ask me about her projects, experience, skills, or achievements!",
      suggestions: INITIAL_SUGGESTIONS,
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    const { answer, richLines, suggestions } = match(q);
    setMessages((m) => [
      ...m,
      { from: "user", text: q },
      { from: "bot", text: answer, richLines, suggestions },
    ]);
    setInput("");
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Chat with Akshaya's assistant"
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[200] w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-accent shadow-[0_0_30px_rgba(249,115,22,0.5)] flex items-center justify-center text-black transition-all duration-300 hover:scale-110 ${open ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <MessageCircle size={22} strokeWidth={2} />
      </button>

      {/* Chat panel — full-width on mobile, fixed on desktop */}
      <div
        className={`fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 sm:w-[380px] z-[200] max-h-[calc(100vh-5rem)] sm:max-h-[580px] flex flex-col rounded-2xl sm:rounded-3xl bg-[#0e0e11] border border-white/8 shadow-[0_32px_80px_rgba(0,0,0,0.8)] transition-all duration-300 origin-bottom-right ${
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center font-display font-black text-black text-sm">A</div>
            <div>
              <p className="text-sm font-display font-black text-white uppercase tracking-tight">Ask Akshaya AI</p>
              <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Portfolio assistant</p>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="text-white/30 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.1)_transparent]">
          {messages.map((msg, i) => (
            <div key={i}>
              {/* Bubble */}
              <div className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed whitespace-pre-line ${
                    msg.from === "user"
                      ? "bg-accent text-black font-mono font-bold"
                      : "bg-white/[0.06] text-white/70 border border-white/5"
                  }`}
                >
                  {msg.text}
                  {msg.richLines && (
                    <ul className="mt-2 space-y-1.5">
                      {msg.richLines.map((line, j) => {
                        const Icon = line.icon;
                        return (
                          <li key={j} className="flex items-start gap-2">
                            <Icon size={12} className="text-accent mt-0.5 flex-shrink-0" strokeWidth={2} />
                            <span>{line.text}</span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>

              {/* Suggestions after every bot message */}
              {msg.from === "bot" && msg.suggestions && msg.suggestions.length > 0 && (
                <div className="mt-2 flex flex-col gap-1.5 pl-1">
                  {msg.suggestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="text-left text-[10px] text-white/40 border border-white/8 rounded-xl px-3 py-2 hover:border-accent/40 hover:text-accent transition-all font-mono leading-snug"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 px-4 py-3 border-t border-white/8 flex-shrink-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            placeholder="Ask about Akshaya's work..."
            className="flex-1 bg-white/[0.04] border border-white/8 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/25 outline-none focus:border-accent/40 transition-colors font-mono"
          />
          <button
            onClick={() => send(input)}
            className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center text-black hover:bg-accent/80 transition-colors flex-shrink-0"
          >
            <Send size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </>
  );
}
