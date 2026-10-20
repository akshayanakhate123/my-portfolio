"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, MessageCircle } from "lucide-react";

interface Message {
  from: "bot" | "user";
  text: string;
}

const FAQS: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["who", "about", "introduce", "akshaya", "yourself", "background"],
    answer:
      "Akshaya Nakhate is an Associate Product Manager specialising in Growth & AI Products. She's an Engineer turned MBA candidate at Scaler School of Business, with 2+ years at Accenture building Salesforce & GenAI solutions, and internship experience at InCred Wealth and Intent Farm.",
  },
  {
    keywords: ["work", "experience", "accenture", "job", "career", "professional", "engineer", "analyst"],
    answer:
      "Akshaya worked as an Advance Application Engineering Analyst at Accenture India (Jul 2022 - Aug 2024), building AI-enabled Salesforce workflows for healthcare and SaaS clients. Key wins: GenAI PoC cutting manual effort by 40%, LWC automation driving 80% adoption, and reducing patient intake time from 20 to 8 minutes.",
  },
  {
    keywords: ["incred", "wealth", "product intern", "fintech", "crm", "zoho"],
    answer:
      "Akshaya interned as a Product Intern at InCred Wealth (Aug–Oct 2026), a SEBI-registered wealth management platform. She built a Zoho CRM for AMC sales workflows saving 25-35% daily manual tracking per RM, led discovery for a self-serve distributor onboarding portal, and consolidated 10+ metric sources into a single analytics dashboard.",
  },
  {
    keywords: ["intent farm", "marketing", "growth", "d2c", "meta", "google ads", "internship"],
    answer:
      "Akshaya did a Growth & Strategy Traineeship at Intent Farm (Feb–Apr 2026), a Google Premier & Meta Verified performance marketing agency. She audited 10+ D2C brands including Giordano and CodeYoung, and designed a reusable 4-stage retention funnel now used as a standard playbook for new client engagements.",
  },
  {
    keywords: ["education", "study", "mba", "scaler", "college", "university", "degree", "vit", "vellore"],
    answer:
      "Akshaya is pursuing a PGP in Management and Technology at Scaler School of Business (2025–2027), ranked in the Top 10% of her cohort with a 3.71/4 GPA. She holds a B.Tech in Electrical & Electronics Engineering from VIT Vellore (2018–2022), graduating with a 9.07/10 CGPA.",
  },
  {
    keywords: ["project", "build", "built", "product", "app", "portfolio", "work"],
    answer:
      "Akshaya has built 12 products:\n• 2AM Buddy - AI voice emotional support agent (Hackathon winner)\n• AuditGPT - AI growth diagnostics for D2C brands\n• MindLoop - AI case interview practice platform\n• Ola Link - Urban commute guarantee engine\n• CreVa - AI deal intelligence for micro-creators\n• Enhanced LinkedIn, Nykaa, StudiSpot, SuccessOS (Lovable prototypes)\n• Mentorship Booking Portal, Split Happens, Mitti Mitra\n\nAsk me about any specific one!",
  },
  {
    keywords: ["2am", "buddy", "voice", "emotional", "support", "hackathon", "vapi"],
    answer:
      "2AM Buddy is a 24/7 AI voice companion for emotional support, built using VAPI, GPT-4o, ElevenLabs, and Make.com. It includes calendar booking, automated summaries, and counselor referrals. It achieved 30-40% repeat usage across beta users with 3-5 min avg engagement time - and won 1st place at a hackathon among 10 teams. Live at: 2am-buddy-sable.vercel.app/home",
  },
  {
    keywords: ["auditgpt", "audit", "growth", "diagnostic", "d2c", "saas"],
    answer:
      "AuditGPT is a self-serve SaaS platform that automates growth audits for D2C brands. It analyzes websites across PDP health, creatives, social presence, retention signals, and SEO to generate recommendations. It reduced audit turnaround from 6 hours to 20 minutes and was tested across 10+ live brands. Built with Next.js, FastAPI, Playwright, Groq, and Supabase.",
  },
  {
    keywords: ["mindloop", "case", "interview", "guesstimate", "mba", "practice"],
    answer:
      "MindLoop is an audio-first platform helping MBA students practice guesstimates and case interviews via voice. It generates daily reasoning challenges, delivers AI feedback on structure and accuracy, includes streak-based progression and PDF exports. Built with a multi-LLM fallback system using Next.js, Groq, and Gemini.",
  },
  {
    keywords: ["ola", "link", "commute", "electric", "feeder", "transit", "guarantee"],
    answer:
      "Ola Link is an APM product proposal for Ola Electric (India 2035). It's a 3-layer system: a unified Link Pass across transit legs, a managed electric feeder network, and a Guarantee Engine that detects missed-connection risk before the commuter notices and dispatches recovery. It includes a working corridor simulator to stress-test the system. Built with React and TypeScript.",
  },
  {
    keywords: ["creva", "creator", "deal", "influencer", "micro", "brand", "negotiation"],
    answer:
      "CreVa is a PM take-home for Certinal - a creator-side commercial command center for micro-creators (10K-100K followers). It includes AI deal valuation, contract review converting usage rights into rupees, 3-mode negotiation drafts, and a deal tracker. Built with Groq LLM, Supabase, React, and TypeScript.",
  },
  {
    keywords: ["achievement", "award", "win", "competition", "hackathon", "iim", "competition"],
    answer:
      "Key achievements:\n🏆 1st place - 2AM Buddy Hackathon (10 teams)\n🥇 1st place - IIM Lucknow M-Day Ad Making (500 teams)\n🥈 1st Runner-Up - SIBM Pune Marketing Case (400 teams)\n🎯 Top 10 - COMET'26 x Flipkart PM Case @ IIT Roorkee (500 teams)\n🔥 1st Runner-Up - Spark Tank D2C Challenge (₹2L revenue)\n📊 Top 3 - Practo GMV Growth Strategy\n📄 Top 10 Paper - IETE National Conference 2022",
  },
  {
    keywords: ["salesforce", "certification", "certified", "apex", "lwc", "lightning"],
    answer:
      "Akshaya holds 5 Salesforce certifications:\n• Data Cloud Consultant (Mar 2024)\n• Life Science Cloud (Jan 2024)\n• Platform App Builder (Nov 2023)\n• Platform Developer I (Jul 2023)\n• Administrator (Mar 2023)\n\nShe built GenAI PoCs on Salesforce Data Cloud + Einstein LLM at Accenture.",
  },
  {
    keywords: ["skill", "tech", "stack", "language", "tool", "technology"],
    answer:
      "Tech stack: Salesforce (Apex, LWC, Data Cloud, Einstein LLM), React, Next.js, TypeScript, Supabase, Python, Groq, Gemini, VAPI, Make.com, Zoho CRM, Vercel, Figma. Product skills: PRDs, user research, growth strategy, A/B testing, analytics dashboards, product discovery.",
  },
  {
    keywords: ["contact", "reach", "email", "linkedin", "github", "connect", "hire"],
    answer:
      "You can reach Akshaya at:\n📧 akshaya.nakhate@gmail.com\n💼 linkedin.com/in/akshaya-nakhate\n💻 github.com/akshayanakhate123",
  },
  {
    keywords: ["genai", "ai", "artificial intelligence", "llm", "gpt", "generative"],
    answer:
      "Akshaya has built multiple GenAI products: a Salesforce + Einstein LLM PoC at Accenture (cut manual effort by 40%), 2AM Buddy (GPT-4o + ElevenLabs voice AI), AuditGPT (Groq-powered analysis), MindLoop (multi-LLM fallback), and CreVa (Groq LLM waterfall for deal valuation). She specialises in shipping GenAI into real workflows.",
  },
];

const SUGGESTED = [
  "What projects has Akshaya built?",
  "Where has she worked?",
  "What competitions has she won?",
];

function match(input: string): string {
  const lower = input.toLowerCase();
  let best = { score: 0, answer: "" };
  for (const faq of FAQS) {
    const score = faq.keywords.filter((k) => lower.includes(k)).length;
    if (score > best.score) best = { score, answer: faq.answer };
  }
  return best.score > 0
    ? best.answer
    : "I'm not sure about that one. Try asking about Akshaya's projects, work experience, education, skills, achievements, or how to contact her!";
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: "Hi — I'm Akshaya's portfolio assistant. Ask me about her projects, experience, skills, or achievements!",
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
    setMessages((m) => [...m, { from: "user", text: q }, { from: "bot", text: match(q) }]);
    setInput("");
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Chat with Akshaya's assistant"
        className={`fixed bottom-6 right-6 z-[200] w-14 h-14 rounded-full bg-accent shadow-[0_0_30px_rgba(249,115,22,0.5)] flex items-center justify-center text-black transition-all duration-300 hover:scale-110 ${open ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <MessageCircle size={24} strokeWidth={2} />
      </button>

      {/* Chat panel */}
      <div
        className={`fixed bottom-6 right-6 z-[200] w-[340px] sm:w-[380px] max-h-[560px] flex flex-col rounded-3xl bg-[#0e0e11] border border-white/8 shadow-[0_32px_80px_rgba(0,0,0,0.8)] transition-all duration-300 origin-bottom-right ${
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
            <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed whitespace-pre-line ${
                  msg.from === "user"
                    ? "bg-accent text-black font-mono font-bold"
                    : "bg-white/[0.06] text-white/70 border border-white/5"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Suggested questions — only show before first user message */}
          {messages.length === 1 && (
            <div className="space-y-2 pt-1">
              {SUGGESTED.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="w-full text-left text-xs text-white/50 border border-white/8 rounded-xl px-4 py-2.5 hover:border-accent/40 hover:text-accent transition-all font-mono"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

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
