// Data/mock.ts

// Type definitions
export type Theme = "light" | "dark";

export type ProjectStatus = "completed" | "ongoing" | "maintenance" | "planned";

export interface PersonalInfo {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  resumeUrl: string;
  social: SocialLinks;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  dribbble: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface Project {
  id: number;
  title: string;
  image?: string;
  description: string;
  tags: string[];
  category: string;
  year: string;
  link: string;
  featured: boolean;
  status: ProjectStatus;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
}

// Data exports
export const personalInfo: PersonalInfo = {
  name: "Sarib Ali",
  firstName: "Sarib",
  lastName: "Ali",
  title: "Frontend Developer",
  tagline:
    "Frontend Developer building fast, conversion-focused websites and web apps with React, Next.js, WordPress, and Shopify.",
  email: "notyourbotbut@gmail.com",
  phone: "+92 323 3232541",
  location: "Lahore, Pakistan",
  bio: "I'm a Frontend Developer focused on building high-performance, user-friendly websites and web applications. I specialize in React, Next.js, and Tailwind CSS, with hands-on experience building custom WordPress themes and Shopify storefronts — from client portals to e-commerce sites. My work prioritizes speed, clean UI, and real business outcomes like better engagement and conversions.",
  resumeUrl: "#",
  social: {
    github: "https://github.com/sarib2005",
    linkedin: "https://www.linkedin.com/in/sarib-ali-khan/",
    twitter: "https://x.com/CraizFox",
    dribbble: "https://dribbble.com",
  },
};

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const stats: Stat[] = [
  { value: 10, suffix: "+", label: "Projects Completed" },
  { value: 1, suffix: "+", label: "Years Experience" },
  { value: 5, suffix: "+", label: "Happy Clients" },
  { value: 3, suffix: "", label: "Companies Experience" },
];

export const skills: Skill[] = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Node.js", level: 88 },
  { name: "Three.js / WebGL", level: 82 },
  { name: "Python", level: 85 },
  { name: "Figma / Design", level: 78 },
  { name: "AWS / Cloud", level: 80 },
  { name: "MongoDB / PostgreSQL", level: 85 },
];

export const skillTags: string[] = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "GSAP",
  "Framer Motion",
  "Tailwind CSS",
  "WordPress",
  "Custom Themes",
  "Elementor",
  "GitHub",
  "REST APIs",
  "Shopify",
  "Next.js",
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Syb Ecosystem",
    image: "/mocks/syb.webp",
    description:
      "A comprehensive digital innovation platform for a UK-based IT services company, featuring service showcases for web/mobile development, digital marketing, and etc.",
    tags: ["React", "Vite", "Tailwind CSS","Laravel"],
    category: "Corporate Ecosystem",
    year: "2025-2026",
    link: "https://sybecosystem.com",
    featured: true,
    status: "completed",
  },
  {
    id: 2,
    title: "Seth SYB",
    image: "/mocks/sethsyb.webp",
    description:
      "A modern eCommerce website for a perfume brand featuring product browsing, category filtering, and a smooth shopping experience with a focus on clean UI and responsive design.",
    tags: ["React", "Vite", "Tailwind CSS","Laravel"],
    category: "E-commerce Website",
    year: "2026",
    link: "https://seth-syb-frontend.vercel.app/",
    featured: true,
    status: "ongoing",
  },
  {
    id: 3,
    title: "ApplyVisas",
    image: "/mocks/applyvisas.webp",
    description:
      "A professional visa consultancy website showcasing immigration services, visa guidance, and client inquiry features with a structured and conversion-focused layout.",
    tags: ["React", "Vite", "Tailwind CSS","Laravel"],
    category: "Business Website",
    year: "2025-2026",
    link: "https://applyvisas.co.uk",
    featured: true,
    status: "completed",
  },
  // {
  //   id: 4,
  //   title: "Client Portfolio",
  //   description:
  //     "A modern graphic design portfolio built with React, showcasing creative design work, projects, skills, and services with smooth animations and a responsive interface.",
  //   tags: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
  //   category: "Graphic Portfolio",
  //   year: "2026",
  //   link: "https://laiba-portfolioo.vercel.app/",
  //   featured: false,
  //   status: "completed",
  // },
  {
    id: 4,
    title: "Klyro",
    description:
      "A modern e-commerce storefront featuring a clean shopping experience, responsive layouts, intuitive product browsing, engaging UI, and a conversion-focused design.",
    tags: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    category: "E-commerce",
    year: "2026",
    link: "https://klyro-chi.vercel.app/",
    featured: false,
    status: "ongoing",
  },
  {
    id: 5,
    title: "Solicitors Chambers",
    description:
      "A professional legal services website providing comprehensive information about legal expertise, practice areas, and client representation with a dignified and authoritative online presence.",
    tags: ["React", "Next.js", "Tailwind CSS","Laravel"],
    category: "Legal Website",
    year: "2026",
    link: "https://solicitorschambers.com",
    featured: false,
    status: "ongoing",
  },
  {
    id: 6,
    title: "Syb Hedayat",
    description:
      "A Quran-based online learning platform with separate teacher and student portals, enabling class management, student registration, and centralized admin control for system operations.",
    tags: ["React", "Vite", "Tailwind CSS", "Laravel"],
    category: "Educational Platform",
    year: "2026",
    link: "https://sybhedayat.com/",
    featured: false,
    status: "ongoing",
  },
  {
    id: 7,
    title: "Ranabaig Law Firm",
    description:
      "A sophisticated law firm website showcasing legal services, attorney profiles, case studies, and consultation booking with a professional and trust-building design approach.",
    tags: ["WordPress", "Elementor", "PHP"],
    category: "Legal Website",
    year: "2026",
    link: "https://ranabaiglawfirm.com",
    featured: false,
    status: "completed",
  },
  {
    id: 8,
    title: "Study2Uni",
    description:
      "An educational consultancy platform connecting students with university opportunities, featuring course browsing, application guidance, and comprehensive admission support services.",
    tags: ["React", "Vite", "Tailwind CSS", "Laravel"],
    category: "Educational Consultancy",
    year: "2026",
    link: "https://study2uni.com",
    featured: false,
    status: "completed",
  },
  {
    id: 9,
    title: "Charity4Humanity",
    description:
      "A compassionate charity organization website facilitating donations, volunteer coordination, and transparent reporting for humanitarian causes with a warm and engaging user experience.",
    tags: ["WordPress", "Elementor", "PHP"],
    category: "Non-Profit Website",
    year: "2026",
    link: "https://charity4humanity.org",
    featured: false,
    status: "completed",
  },
];

export const experiences: Experience[] = [
  {
    id: 1,
    role: "Frontend Developer",
    company: "SYB Business Ecosystem",
    period: "Jan 2025 — Present",
    description:
      "Developing and maintaining high-performance websites and web applications using WordPress, React, and Next.js. Building scalable, user-focused digital solutions across multiple projects.",
    technologies: ["WordPress", "React", "Next.js", "Shopify"],
  },
  {
    id: 2,
    role: "Game Developer",
    company: "ArtSphere",
    period: "April 2024 — Jan 2025",
    description:
      "Developed 2D games using C# and Unity, gaining hands-on experience in game mechanics, scripting, and interactive design.",
    technologies: ["C#", "Unity 2D"],
  },
  {
    id: 3,
    role: "Web Development Intern",
    company: "Rise Rox Tech",
    period: "Jan 2024 — April 2024",
    description:
      "Started the professional journey learning the fundamentals of web development. Built small projects using HTML, CSS, and Java, gaining a solid foundation in frontend and programming basics.",
    technologies: ["HTML", "CSS", "Java"],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sheryaar Baig",
    role: "CEO, SYB Business Ecosystem",
    text: "Sarib is a rare talent who combines sharp technical skill with genuine care for his clients. He's been instrumental in bringing our digital ecosystem to life.",
  },
  {
    id: 2,
    name: "Jamil Khan",
    role: "CEO, DiscountOye",
    text: "Sarib understood our vision instantly and built an experience that truly represents DiscountOye. His dedication and attention to detail are unmatched.",
  },
  {
    id: 3,
    name: "Siddharth Oak",
    role: "Website Operations, ApplyVisas",
    text: "Sarib brought structure, polish, and real reliability to our operations. Working with him has been an absolute pleasure, precise, and always on point.",
  },
  {
    id: 4,
    name: "Humaira Qasim",
    role: "Founder, SYB Hedayat",
    text: "Sarib approached our project with genuine empathy and care. He built something beautiful and meaningful for our community, we're truly grateful.",
  },
  {
    id: 5,
    name: "Scott Blanchard",
    role: "Founder, Inspire Interiors",
    text: "Sarib captured the soul of Inspire Interiors perfectly in our website. Creative, responsive, and a true professional from start to finish.",
  },
];

// Utility types and helpers
export type SectionId = "about" | "projects" | "experience" | "contact";

export const sectionIds: Record<string, SectionId> = {
  about: "about",
  projects: "projects",
  experience: "experience",
  contact: "contact",
};

// Helper function to get project by ID
export const getProjectById = (id: number): Project | undefined => {
  return projects.find((project) => project.id === id);
};

// Helper function to get featured projects
export const getFeaturedProjects = (): Project[] => {
  return projects.filter((project) => project.featured);
};

// Helper function to get non-featured projects
export const getOtherProjects = (): Project[] => {
  return projects.filter((project) => !project.featured);
};

// Helper function to get projects by status
export const getProjectsByStatus = (status: ProjectStatus): Project[] => {
  return projects.filter((project) => project.status === status);
};

// Helper function to get experience by ID
export const getExperienceById = (id: number): Experience | undefined => {
  return experiences.find((exp) => exp.id === id);
};

// Helper function to get testimonial by ID
export const getTestimonialById = (id: number): Testimonial | undefined => {
  return testimonials.find((testimonial) => testimonial.id === id);
};

// Helper function to get skills by level range
export const getSkillsByLevel = (minLevel: number, maxLevel: number): Skill[] => {
  return skills.filter(
    (skill) => skill.level >= minLevel && skill.level <= maxLevel
  );
};

// Helper function to get all unique technologies from experiences
export const getAllTechnologies = (): string[] => {
  const techSet = new Set<string>();
  experiences.forEach((exp) => {
    exp.technologies.forEach((tech) => techSet.add(tech));
  });
  return Array.from(techSet);
};

// Helper function to get all unique tags from projects
export const getAllProjectTags = (): string[] => {
  const tagSet = new Set<string>();
  projects.forEach((project) => {
    project.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet);
};

// Helper function to format skills as tags
export const getSkillsAsTags = (): string[] => {
  return skills.map((skill) => skill.name);
};

// Helper function to get social link by platform
export const getSocialLink = (platform: keyof SocialLinks): string => {
  return personalInfo.social[platform];
};

// Constants
export const CURRENT_YEAR = new Date().getFullYear();
export const TOTAL_PROJECTS = projects.length;
export const TOTAL_EXPERIENCES = experiences.length;
export const TOTAL_TESTIMONIALS = testimonials.length;
export const FEATURED_PROJECTS_COUNT = getFeaturedProjects().length;