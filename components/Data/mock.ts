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
  link?: string;
  featured: boolean;
  status: ProjectStatus;
  demoText?: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  responsibilities: string[];
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
  name: "Muhammad Umer Nadeem",
  firstName: "Muhammad Umer",
  lastName: "Nadeem",
  title: "Software Engineer",
  tagline:
    "Software Engineer passionate about building scalable web applications, backend systems, and modern SaaS platforms.",
  email: "umernadeem005@gmail.com",
  phone: "+92 348 412005",
  location: "Lahore, Pakistan",
  bio: "Backend-focused Software Engineer with a full-stack skill set and hands-on experience owning products end-to-end, from system architecture and database design through production deployment and infrastructure management. Builds scalable SaaS platforms, ERPs, and role-based admin systems using Laravel, PHP, MySQL, and RESTful APIs, with working knowledge of React. Comfortable managing Linux production environments and third-party integrations (Stripe, auth providers, email delivery), and experienced mentoring junior developers through code review and architecture guidance.",
  resumeUrl: "#",
  social: {
    github: "https://github.com/Muhammad-Umer-Nadeem",
    linkedin: "https://www.linkedin.com/in/muhammad-umer-nadeem/",
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

export const skillTags: string[] = [
  "PHP",
  "JavaScript",
  "HTML5",
  "CSS3",
  "SQL",
  "Laravel",
  "React",
  "Bootstrap",
  "Tailwind CSS",
  "Material UI",
  "jQuery",
  "AJAX",
  "MySQL",
  "SQL Server",
  "Redis",
  "RESTful APIs",
  "Stripe",
  "Postman",
  "GitHub",
  "Linux",
  "CloudPanel",
  "Supervisor",
  "Cron Jobs",
  "Queue Workers",
  "VPS Management",
  "WordPress",
  "Shopify",
  "ERP",
  "RBAC",
  "POS",
  "CRM",
  "LMS",
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Syb Ecosystem",
    image: "/mocks/syb.webp",
    description:
      "Multi-service business platform with separate customer/admin dashboards, social login (Google, Facebook, email), dynamic service - request form builder, Stripe invoicing, and full RBAC administration. ",
    tags: ["Laravel", "React", "MySQL", "Stripe", "REST APIs"],
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
      "A full-stack perfume eCommerce platform developed using Laravel and React, featuring secure Stripe and Cash on Delivery payments, product and inventory management, order processing, customer authentication, and a role-based admin dashboard designed for scalable business operations.",
    tags: ["Laravel", "React", "MySQL", "Stripe", "Tailwind CSS"],
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
      "A multilingual visa consultancy platform built with Laravel and React, featuring dynamic inquiry forms, service management, content administration, and a responsive user experience designed to streamline client consultations and lead generation.",
    tags: ["Laravel", "React", "MySQL", "Tailwind CSS"],
    category: "Business Website",
    year: "2025-2026",
    link: "https://applyvisas.co.uk",
    featured: true,
    status: "completed",
  },
  {
    id: 4,
    title: "Solicitors Chambers",
    description:
      "A full-stack legal case management platform built with Laravel and React, featuring dedicated Admin, Client, and Solicitor portals, case assignment, contract management, secure document storage, messaging, and Stripe-powered payment workflows.",
    tags: ["Laravel", "React", "MySQL", "Stripe", "Tailwind CSS", "Next.js"],
    category: "Legal Case Management Platform",
    year: "2026",
    link: "https://solicitorschambers.com",
    featured: false,
    status: "ongoing",
  },
  {
    id: 5,
    title: "SYB Hedayat",
    description:
      "A full-stack online Quran learning platform built with Laravel and React, featuring Admin, Teacher, and Student dashboards, teacher approval workflows, course and enrollment management, class scheduling, attendance tracking, and role-based administration.",
    tags: ["Laravel", "React", "MySQL", "Tailwind CSS", "Stripe"],
    category: "Learning Management System (LMS)",
    year: "2026",
    link: "https://sybhedayat.com/",
    featured: false,
    status: "ongoing",
  },
  {
    id: 6,
    title: "Study2Uni",
    description:
      "A UK-focused student admission website built with Laravel and React, featuring a comprehensive database of UK universities and academic programs populated through a custom Python web scraper, along with application tracking, document uploads, and admission inquiry management.",
    tags: ["Laravel", "React", "Python", "MySQL", "Tailwind CSS"],
    category: "Educational Consultancy Website",
    year: "2026",
    link: "https://study2uni.com",
    featured: false,
    status: "completed",
  },
  {
    id: 7,
    title: "DiscountOye.pk",
    image: "/mocks/discountoye.webp",
    description:
      "A fully custom Shopify eCommerce store for a consumer electronics retailer, developed using Liquid and JavaScript with a performance-optimized theme, advanced product filtering, promotional campaign management, and a responsive shopping experience.",
    tags: ["Shopify", "Liquid", "JavaScript", "HTML", "CSS"],
    category: "Shopify eCommerce Store",
    year: "2026",
    link: "https://discountoye.pk",
    featured: false,
    status: "completed",
  },
  {
    id: 8,
    title: "Super Max Filters",
    image: "/mocks/supermaxfilters.webp",
    description:
      "A Laravel-based product catalog website for an industrial filtration company, featuring an administrative dashboard for managing products, categories, types, and models, along with advanced search and filtering capabilities to help customers quickly find compatible products.",
    tags: ["Laravel", "PHP", "MySQL", "Blade", "Bootstrap"],
    category: "Product Catalog Website",
    year: "2025",
    link: "https://supermaxfilter.com/",
    featured: false,
    status: "completed",
  },
  {
    id: 9,
    title: "Algo ERP System",
    image: "/mocks/algo-erp.webp",
    description:
      "A highly scalable, multi-module ERP platform developed with Laravel and MySQL, featuring procurement and inventory management, HRIS and payroll, financial accounting, sales and CRM, project management, business intelligence reporting, and role-based access control, built on a reusable architecture for enterprise-scale operations.",
    tags: [
      "Laravel",
      "PHP",
      "MySQL",
      "ERP",
      "RBAC",
      "Bootstrap"
    ],
    category: "Enterprise Resource Planning (ERP)",
    year: "2025",
    featured: true,
    status: "completed",
    demoText: "Demo Available on Request"
  },
  {
    id: 10,
    title: "Digital Invoicing System",
    image: "/mocks/digital-invoicing.webp",
    description:
      "An FBR-integrated point-of-sale and digital invoicing system developed with Laravel and MySQL, featuring product and inventory management, real-time sales processing, custom PDF invoice and receipt generation, tax-compliant invoicing, and role-based access control for secure business operations.",
    tags: [
      "Laravel",
      "MySQL",
      "POS",
      "FBR",
      "PDF Generation",
      "RBAC"
    ],
    category: "Point of Sale (POS) & Digital Invoicing System",
    year: "2025",
    featured: true,
    status: "completed",
    demoText: "Demo Available on Request",
  },
  {
    id: 11,
    title: "Textile Import Solutions ERP",
    image: "/mocks/textile-import-solutions.webp",
    description:
      "An ERP solution for a textile import business developed with Laravel and SQL Server, featuring point-of-sale operations, inventory and stock management, product catalog administration, purchase tracking, sales reporting, and role-based access control to streamline day-to-day business operations.",
    tags: [
      "Laravel",
      "SQL Server",
      "ERP",
      "POS",
      "Inventory Management",
      "RBAC"
    ],
    category: "Enterprise Resource Planning (ERP)",
    year: "2025",
    featured: true,
    status: "completed",
    demoText: "Demo Available on Request",
  },
  {
    id: 12,
    title: "ArenaX",
    image: "/mocks/arenax.webp",
    description:
      "A gaming and event management platform developed with Laravel and MySQL, featuring secure online ticket purchases, event registration, real-time sales analytics, digital entry-card generation for participants, and an administrative dashboard for managing events and customer registrations.",
    tags: [
      "Laravel",
      "MySQL",
      "E-commerce",
      "Event Management",
      "Analytics",
      "RBAC"
    ],
    category: "Gaming & Event Management Platform",
    year: "2025",
    featured: false,
    status: "completed",
    demoText: "Demo Available on Request",
  },
  {
    id: 13,
    title: "Algo Soft Tech",
    image: "/mocks/algosofttech.webp",
    description:
      "A modern corporate website for a software development company, designed and developed using Laravel, Blade, and MySQL. Built a responsive, SEO-friendly frontend with dynamic content management, service pages, portfolio showcase, contact forms, and an administrative panel for managing website content.",
    tags: [
      "Laravel",
      "Blade",
      "MySQL",
      "Bootstrap",
      "JavaScript"
    ],
    category: "Corporate Website",
    year: "2024",
    link: "https://www.algosofttech.com/",
    featured: false,
    status: "completed",
  }
];

export const experiences: Experience[] = [
  {
    id: 1,
    role: "Software Engineer",
    company: "SYB Business Ecosystem",
    period: "Aug 2025 — Present",
    responsibilities: [
      "Own end-to-end backend development for multiple SaaS products and business web applications, including system architecture, database design, and production deployment using Laravel, PHP, MySQL, and RESTful APIs.",
      "Build reusable CMS modules and role-based admin panels for content management, user management, reporting, and payment workflows across the company's product suite.",
      "Integrate Stripe, social authentication providers, and other third-party APIs, while delivering custom WordPress and Shopify solutions for business requirements.",
      "Manage Linux-based production infrastructure, including VPS administration, CloudPanel, Redis, Supervisor, CRON jobs, queues, and business email infrastructure (DNS, SPF, DKIM, and DMARC).",
      "Mentor junior developers through code reviews and architecture guidance while collaborating with cross-functional teams to deliver scalable technical solutions on schedule.",
    ],
    technologies: [
      "Laravel",
      "PHP",
      "MySQL",
      "RESTful APIs",
      "Stripe",
      "WordPress",
      "Shopify",
      "Redis",
      "CloudPanel",
      "Linux",
      "Supervisor",
    ],
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "Algo Soft Tech",
    period: "Jun 2024 — Jul 2025",
    responsibilities: [
      "Built dynamic, SEO-optimized, high-performance web applications using Laravel and Bootstrap with a focus on reusable components and frontend optimization.",
      "Designed optimized MySQL and SQL Server database schemas and implemented complex queries to improve application performance across multiple client projects.",
      "Designed and implemented secure RESTful APIs to enable seamless communication between frontend and backend systems.",
    ],
    technologies: [
      "Laravel",
      "Blade",
      "PHP",
      "jQuery",
      "AJAX",
      "Axios",
      "Bootstrap",
      "MySQL",
      "SQL Server",
      "RESTful APIs",
      "JavaScript",
      "HTML5",
      "CSS3",
    ],
  },
  {
    id: 3,
    role: "Email Marketing & Fiverr Team Manager",
    company: "Prism Design Studios",
    period: "Oct 2020 — May 2024",
    responsibilities: [
      "Managed the Fiverr team, overseeing multiple team members, account performance, and sales strategies across multiple Fiverr profiles.",
      "Led client communication, order management, and coordinated project delivery to maintain service quality and client satisfaction.",
      "Managed email marketing campaigns, lead generation, and outreach while completing a full-time BS Information Technology degree.",
      "Improved campaign efficiency and reporting through Excel automation and data-driven analysis.",
    ],
    technologies: [
      "Email Marketing",
      "Lead Generation",
      "Excel",
      "Client Management",
      "Fiverr",
      "Team Leadership",
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sheryaar Baig",
    role: "CEO, SYB Business Ecosystem",
    text: "Umer has played a key role in developing multiple products across our ecosystem. From backend architecture and database design to production deployment, he consistently delivers scalable, reliable solutions and takes ownership of every stage of development.",
  },
  {
    id: 2,
    name: "M. Nabeel",
    role: "CEO, Algo Soft Tech",
    text: "Umer consistently delivered high-quality Laravel solutions, from enterprise ERP systems to client websites. His problem-solving ability, code quality, and commitment to delivering projects on time made him a valuable member of our engineering team.",
  },
  {
    id: 3,
    name: "M. Shafiq",
    role: "Owner, Super Max Filters",
    text: "Umer developed a powerful product catalog platform that made managing our products significantly easier. The advanced search, filtering, and admin panel greatly improved both our internal workflow and customer experience.",
  },
  {
    id: 4,
    name: "M. Sohail",
    role: "Partner, ArenaX",
    text: "Umer transformed our requirements into a reliable eCommerce and event management platform. His technical expertise and attention to detail ensured a smooth development process and a solid final product.",
  },
  {
    id: 5,
    name: "M. Arshad",
    role: "Manager, Textile Import Solutions",
    text: "Working closely with Umer throughout the ERP development process was a great experience. He understood our operational requirements, provided practical technical solutions, and delivered a system that streamlined our inventory and sales operations.",
  },
  {
    id: 6,
    name: "Humaira Qasim",
    role: "Founder, SYB Hedayat",
    text: "Umer developed our learning platform with professionalism and care. The teacher, student, and administration workflows were implemented thoughtfully, making the platform easy to manage and scale.",
  },
  {
    id: 7,
    name: "Siddharth Oak",
    role: "Website Operations, ApplyVisas",
    text: "Umer delivered a well-structured and responsive platform that improved how we manage content and client inquiries. His communication and technical execution were excellent throughout the project.",
  },
  {
    id: 8,
    name: "Jamil Khan",
    role: "CEO, DiscountOye",
    text: "Umer developed a custom Shopify solution tailored to our business requirements. His focus on performance, user experience, and advanced product filtering resulted in a faster, more scalable storefront that supports our day-to-day operations.",
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