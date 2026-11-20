/**
 * All portfolio text lives here. Nothing in this file imports 3D code,
 * so content can be edited without touching the scene.
 */

export type PanelId = "profile" | "about" | "projects" | "skills" | "help" | "brick-note" | "bedchamber-lock" | "contact-email";

export interface PanelLink {
  label: string;
  value: string;
  href?: string;
}

export interface PanelItem {
  title: string;
  text: string;
  meta?: string;
}

export interface PanelGroup {
  label: string;
  tags: string[];
}

export interface PanelContent {
  id: PanelId;
  /** Small label above the title. */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  paragraphs?: string[];
  items?: PanelItem[];
  itemsHeading?: string;
  groups?: PanelGroup[];
  links?: PanelLink[];
  /** Label in the top-left menu. Panels without one are not listed there. */
  menuLabel?: string;
}

export const owner = {
  name: "Tushar Dhar",
  role: "AI Lead · Agentic & Voice AI",
  tagline: "Building production AI systems for travel.",
};

export const contact = {
  email: "tssdhar@gmail.com",
  linkedIn: "https://www.linkedin.com/in/tushar-dhar-28a8b622a/",
  gitHub: "https://github.com/dhartushar",
};

export const panels: Record<PanelId, PanelContent> = {
  profile: {
    id: "profile",
    eyebrow: "The pedestal",
    title: owner.name,
    subtitle: "AI Lead at EaseMyTrip, Gurgaon",
    menuLabel: "Profile & contact",
    paragraphs: [
      "Hey there, awesome humans! I build AI systems that run in production: agentic assistants, real-time voice agents and retrieval pipelines.",
      "Founding member of the EaseMyTrip AI team, where I lead a team of five shipping conversational, voice and email automation for millions of travellers.",
    ],
    links: [
      { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
      {
        label: "LinkedIn",
        value: "tushar-dhar",
        href: contact.linkedIn,
      },
      { label: "GitHub", value: "dhartushar", href: contact.gitHub },
      { label: "Location", value: "Gurgaon" },
    ],
  },
  about: {
    id: "about",
    eyebrow: "The ember pillar",
    title: "About me",
    subtitle: "From full-stack engineering to leading AI",
    menuLabel: "About",
    paragraphs: [
      "I started out building dashboards and backend services, moved into applied AI, and now lead the AI team at EaseMyTrip. I care about systems that hold up in production: low latency, clear architecture and steady releases.",
    ],
    itemsHeading: "Journey",
    items: [
      {
        meta: "May 2026 · present",
        title: "AI Lead · EaseMyTrip",
        text: "Lead EVA (agentic travel assistant on web and WhatsApp), real-time voice AI for booking recovery and Easemail. Lead and mentor a team of 5 with biweekly production releases.",
      },
      {
        meta: "Oct 2025 · Apr 2026",
        title: "AI Engineer · EaseMyTrip",
        text: "Built the enterprise MCP server behind the EaseMyTrip ChatGPT App, plus EasyDarshan itinerary planning, smart flight filters and AI hotel review summaries.",
      },
      {
        meta: "Jan 2024 · Sep 2025",
        title: "Software Engineer · Crest Data",
        text: "Connected Splunk, Google SecOps and Sentinel to LLMs over MCP, built OAuth flows for MCP tools, and shipped a ColBERT + s-BERT RAG search with 65% better precision.",
      },
      {
        meta: "Education",
        title: "BTech ICT · DA-IICT, Gandhinagar",
        text: "Dhirubhai Ambani Institute of Information and Communication Technology.",
      },
    ],
  },
  projects: {
    id: "projects",
    eyebrow: "The stacked pillar",
    title: "Projects",
    subtitle: "Selected work",
    menuLabel: "Projects",
    items: [
      {
        meta: "LangChain · LangGraph · RAG · WhatsApp",
        title: "EVA, agentic travel assistant",
        text: "Production chatbot for EaseMyTrip web and WhatsApp covering flights, hotels, trains, bookings and agent handoff. Cut support workload by ~50% and resolution time to under 2 minutes.",
      },
      {
        meta: "Deepgram · Groq · WebRTC · telephony",
        title: "Real-time voice AI",
        text: "STT–LLM–TTS pipeline for outbound calls and browser conversations with sub-900ms latency and barge-in. Recovers abandoned bookings; +10% conversions.",
      },
      {
        meta: "LangGraph · BM25 · Presidio",
        title: "Easemail",
        text: "10-stage pipeline drafting booking-aware support emails across 21 departments and 434 templates, with confidence-gated evaluation. 30% faster turnaround.",
      },
      {
        meta: "MCP · OpenAI",
        title: "EaseMyTrip MCP server & ChatGPT App",
        text: "Exposes flight, hotel and train booking plus the knowledge base to external AI assistants, with tool orchestration and intent validation.",
      },
      {
        meta: "RAG · OpenAI · Firebase",
        title: "AI compliance assistant for Cycore",
        text: "RAG over 10k+ compliance documents inside a trust center, helping auditors and GRC analysts answer questions and fill security questionnaires faster.",
      },
    ],
  },
  skills: {
    id: "skills",
    eyebrow: "The ring pillar",
    title: "Skills",
    subtitle: "Tools I reach for",
    menuLabel: "Skills",
    groups: [
      { label: "Languages", tags: ["Python", "TypeScript", "JavaScript", "C/C++", "SQL", "Bash"] },
      {
        label: "AI & ML",
        tags: ["LLMs", "RAG", "LangChain", "LangGraph", "MCP", "Pipecat", "OpenAI Agents SDK", "LoRA / QLoRA", "PyTorch"],
      },
      { label: "Backend", tags: ["FastAPI", "Node.js", "Flask", "React", "REST / gRPC", "Redis", "Celery"] },
      {
        label: "Data & cloud",
        tags: ["PostgreSQL + pgvector", "MongoDB", "Pinecone", "Elasticsearch", "GCP", "AWS", "Docker", "CI/CD"],
      },
    ],
  },
  "brick-note": { id: "brick-note", title: "A folded note" },
  "bedchamber-lock": { id: "bedchamber-lock", title: "Bedchamber", subtitle: "Enter three digits" },
  "contact-email": { id: "contact-email", title: contact.email },
  help: {
    id: "help",
    eyebrow: "How to explore",
    title: "Finding your way",
    items: [
      { title: "Look around", text: "Drag to rotate the room." },
      {
        title: "Inspect things",
        text: "Click or tap the pedestal to open the profile. The menu opens every portfolio panel.",
      },
      { title: "Explore the Entry Hall", text: "Click or tap objects to see how they respond." },
      { title: "Return to the hall", text: "Follow the white arrow on the pavement outside either room." },
      { title: "Lost?", text: "The button in the bottom-left corner puts the camera back." },
    ],
  },
};

export const menuPanels: PanelContent[] = Object.values(panels).filter(
  (panel) => panel.menuLabel !== undefined,
);
