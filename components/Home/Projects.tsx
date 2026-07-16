"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useInView, useScroll, useTransform, MotionValue } from "framer-motion";
import { projects } from "@/components/Data/mock";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Wrench,
  Construction,
} from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

// Type definitions
type ProjectStatus = "completed" | "ongoing" | "maintenance" | "planned";

interface Project {
  id: string | number;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  category: string;
  year: string | number;
  link?: string; // <-- Optional now
  status: ProjectStatus;
  featured: boolean;

  demoText?: string;
}

interface StatusConfig {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  dot: string;
}

interface StatusBadgeProps {
  status: ProjectStatus;
}

interface FeaturedProjectProps {
  project: Project;
  index: number;
}

interface SmallProjectCardProps {
  project: Project;
  index: number;
}

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

interface TiltState {
  x: number;
  y: number;
}

interface GlareState {
  x: number;
  y: number;
}

// Status configuration
const statusConfig: Record<ProjectStatus, StatusConfig> = {
  completed: {
    label: "Completed",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    icon: CheckCircle2,
    dot: "bg-emerald-500",
  },
  ongoing: {
    label: "Ongoing",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-200 dark:border-blue-800",
    icon: Clock,
    dot: "bg-blue-500",
  },
  maintenance: {
    label: "Maintenance",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    borderColor: "border-amber-200 dark:border-amber-800",
    icon: Wrench,
    dot: "bg-amber-500",
  },
  planned: {
    label: "Planned",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    borderColor: "border-purple-200 dark:border-purple-800",
    icon: Construction,
    dot: "bg-purple-500",
  },
};

/* ── StatusBadge component ──────────────────────────────────────────── */
const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config: StatusConfig = statusConfig[status] || statusConfig.planned;
  const Icon = config.icon;

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#FAFAFA] dark:bg-[#0A0A0A] text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 shadow-sm">
      <span
        className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`}
        aria-hidden="true"
      />
      <Icon size={12} className="opacity-70" aria-hidden="true" />
      <span>{config.label}</span>
    </div>
  );
};

/* ── FeaturedProject component ───────────────────────────────────────── */
const FeaturedProject: React.FC<FeaturedProjectProps> = ({ project, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hovered, setHovered] = useState<boolean>(false);

  const gradients: string[] = [
    "from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800",
    "from-neutral-200 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900",
    "from-neutral-50 to-neutral-200 dark:from-neutral-950 dark:to-neutral-800",
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 h-full flex flex-col">
        {/* Project visual area */}
        <div
          className={`relative h-64 md:h-80 bg-linear-to-br ${gradients[index % 3]} overflow-hidden`}
        >
          {/* Animated pattern */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0,0,0,0.03) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
            animate={hovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.6 }}
            aria-hidden="true"
          />

          {/* Project image - Use Next.js Image component for local images */}
          {project.image && (
            <motion.div
              className="absolute inset-0"
              animate={hovered ? { scale: 1.05 } : { scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          )}

          {/* Status badge - Top Left */}
          <motion.div
            className="absolute top-4 left-4 z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={
              hovered
                ? { opacity: 1, y: 0 }
                : { opacity: 0.8, y: 0 }
            }
            transition={{ delay: 0.1 }}
          >
            <StatusBadge status={project.status} />
          </motion.div>

          {/* Floating tags */}
          <div className="absolute bottom-6 left-8 flex gap-2">
            {project.tags.map((tag: string, i: number) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, y: 10 }}
                animate={
                  hovered
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0.9, y: 0 }
                }
                transition={{ delay: i * 0.05 }}
              >
                <Badge className="bg-[#FAFAFA] dark:bg-[#0A0A0A] text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 text-xs px-3 py-1 rounded-full shadow-sm">
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>

          {/* Arrow link */}
          <motion.div
            className="absolute top-6 right-8 z-10"
            animate={
              hovered
                ? { scale: 1.2 }
                : { scale: 1 }
            }
            transition={{ type: "spring", stiffness: 300 }}
          >
            {project.link ? (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="View"
                className="w-12 h-12 rounded-full bg-[#FAFAFA] dark:bg-[#0A0A0A] border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:bg-neutral-900 dark:hover:bg-white hover:text-white dark:hover:text-black hover:border-neutral-900 dark:hover:border-white transition-colors duration-300"
              >
                <ArrowUpRight size={18} />
              </Link>
            ) : (
              <div className="rounded-full bg-[#FAFAFA] dark:bg-[#0A0A0A] border border-neutral-200 dark:border-neutral-700 px-4 py-2 text-xs font-medium whitespace-nowrap text-neutral-700 dark:text-neutral-300">
                🔒 {project.demoText ?? "Demo Available on Request"}
              </div>
            )}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-8 bg-white dark:bg-neutral-900 flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
              {project.category}
            </span>
            <span className="text-neutral-300 dark:text-neutral-700">/</span>
            {/* <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
              {project.year}
            </span> */}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-2 leading-tight">
            {project.title}
          </h3>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Animated bottom border */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 dark:bg-white origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
};

/* ── SmallProjectCard component ──────────────────────────────────────── */
const SmallProjectCard: React.FC<SmallProjectCardProps> = ({
  project,
  index,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors duration-300 h-full flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono tracking-wider text-neutral-400 dark:text-neutral-500">
            {project.category}
            {/* / {project.year} */}
          </span>
          <StatusBadge status={project.status} />
        </div>
        {project.link ? (
          <motion.div
            animate={hovered ? { rotate: 45 } : { rotate: 0 }}
          >
            <ArrowUpRight
              size={16}
              className="text-neutral-400 dark:text-neutral-500"
            />
          </motion.div>
        ) : (
          <Badge
            variant="outline"
            className="text-[10px]"
          >
            🔒 {project.demoText ?? "Demo Available"}
          </Badge>
        )}
      </div>
      <h4 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
        {project.title}
      </h4>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4 flex-1">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag: string) => (
          <span
            key={tag}
            className="text-[11px] px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

/* ── TiltCard component ──────────────────────────────────────────────── */
const TiltCard: React.FC<TiltCardProps> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltState>({ x: 0, y: 0 });
  const [glare, setGlare] = useState<GlareState>({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * -12,
      y: (x - 0.5) * 12,
    });
    setGlare({ x: x * 100, y: y * 100 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50 });
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
};

/* ── ProjectsSection component ───────────────────────────────────────── */
const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 1],
    [100, -100]
  );

  const featured: Project[] = projects.filter((p: Project) => p.featured);
  const others: Project[] = projects.filter((p: Project) => !p.featured);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-32 bg-[#FAFAFA] dark:bg-[#0A0A0A] relative"
      aria-label="Projects"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header with parallax */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500">
                02
              </span>
              <div className="h-px w-12 bg-neutral-300 dark:bg-neutral-700" />
              <h2 className="text-sm font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500">
                Projects
              </h2>
            </div>
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 dark:text-white leading-[0.9] tracking-tight">
              Selected
              <br />
              <span className="text-neutral-300 dark:text-neutral-700">
                works
              </span>
            </h3>
          </motion.div>

          <motion.div
            style={{ y: parallaxY, willChange: "transform" }}
            className="hidden md:block"
            aria-hidden="true"
          >
            <span className="text-8xl font-bold text-neutral-100 dark:text-neutral-900 select-none">
              ({String(projects.length).padStart(2, "0")})
            </span>
          </motion.div>
        </div>

        {/* Featured projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 items-stretch">
          {featured.map((project: Project, index: number) => (
            <FeaturedProject
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* Other projects */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <h4 className="text-sm font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500 mb-8">
            Other notable projects
          </h4>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 items-stretch">
          {others.map((project: Project, index: number) => (
            project.link ? (
              <Link
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <SmallProjectCard project={project} index={index} />
              </Link>
            ) : (
              <div key={project.id} className="block h-full">
                <SmallProjectCard project={project} index={index} />
              </div>
            )
          ))}
        </div>

        {/* GitHub link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="https://github.com/sarib2005"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors duration-300"
            aria-label="View more projects on GitHub"
          >
            <motion.span
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-2"
            >
              <Github size={16} aria-hidden="true" />
              View more on GitHub
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
