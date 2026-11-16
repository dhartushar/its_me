/**
 * All portfolio text lives here. Nothing in this file imports 3D code,
 * so content can be edited without touching the scene.
 */

export type PanelId = "profile" | "about" | "projects" | "skills" | "door" | "help";

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
  eyebrow: string;
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
  role: "Software Developer · Full Stack & AI applications",
  tagline: "A passionate full-stack developer creating seamless digital experiences.",
};

export const panels: Record<PanelId, PanelContent> = {
  profile: {
    id: "profile",
    eyebrow: "The pedestal",
    title: owner.name,
    subtitle: owner.role,
    menuLabel: "Profile & contact",
    paragraphs: [
      "Hey there, awesome humans! I'm a full stack developer who builds dynamic, responsive web applications.",
      "My expertise lies primarily in frontend development, where I bring ideas to life through innovative design and user-centric solutions.",
    ],
    links: [
      { label: "Email", value: "tushardhar2000@gmail.com", href: "mailto:tushardhar2000@gmail.com" },
      {
        label: "LinkedIn",
        value: "tushar-dhar",
        href: "https://www.linkedin.com/in/tushar-dhar-28a8b622a/",
      },
      { label: "GitHub", value: "dhartushar", href: "https://github.com/dhartushar" },
      { label: "Location", value: "Ahmedabad ⇄ Gurgaon" },
    ],
  },
  about: {
    id: "about",
    eyebrow: "The ember pillar",
    title: "About me",
    subtitle: "Crafting seamless digital experiences with code",
    menuLabel: "About",
    paragraphs: [
      "I specialize in creating dynamic full stack web applications using modern frameworks and tools. I work across both frontend and backend, which keeps my approach to a product holistic.",
      "JavaScript, Python, React, Node.js and responsive design are my key strengths.",
    ],
    itemsHeading: "Journey",
    items: [
      {
        meta: "2024",
        title: "Software Developer · Crest Data",
        text: "Full-stack developer specializing in frontend technologies, with a focus on user-friendly interfaces.",
      },
      {
        meta: "2023",
        title: "Developer Intern · BioXcel",
        text: "Worked on a variety of projects and gained hands-on experience in software development, mainly WordPress and React.",
      },
    ],
  },
  projects: {
    id: "projects",
    eyebrow: "The stacked pillar",
    title: "Projects",
    subtitle: "A few things I have built",
    menuLabel: "Projects",
    items: [
      {
        title: "Real-Time Chat Application",
        text: "A real-time chat application built with React and Socket.io.",
      },
      {
        title: "E-commerce Platform",
        text: "A scalable e-commerce platform built with React, FastAPI and MongoDB.",
      },
      {
        title: "Web 3.0 Blockchain App",
        text: "A modern Web 3.0 blockchain application built with Solidity and React.",
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
      { label: "Languages", tags: ["Python", "JavaScript", "C++", "SQL"] },
      { label: "Front-end", tags: ["React", "HTML", "CSS"] },
      { label: "Backend & databases", tags: ["FastAPI", "MySQL", "MongoDB"] },
      { label: "Tools", tags: ["Git", "Docker", "Kubernetes", "Splunk"] },
      { label: "Other", tags: ["REST APIs", "Linux", "Ubuntu", "AI applications"] },
    ],
  },
  door: {
    id: "door",
    eyebrow: "Beyond the door",
    title: "New room coming soon",
    paragraphs: [
      "Something is glowing back there, but the passage is not finished yet.",
      "Check back later. This door will lead to the next room.",
    ],
  },
  help: {
    id: "help",
    eyebrow: "How to explore",
    title: "Finding your way",
    items: [
      { title: "Look around", text: "Drag to rotate the room. Scroll or pinch to zoom." },
      {
        title: "Inspect things",
        text: "Click or tap the pedestal, the three pillars and the door. Each one holds something.",
      },
      { title: "Lost?", text: "The button in the bottom-left corner puts the camera back." },
      { title: "Prefer a list?", text: "The menu in the top-left corner opens every panel directly." },
    ],
  },
};

export const menuPanels: PanelContent[] = Object.values(panels).filter(
  (panel) => panel.menuLabel !== undefined,
);
