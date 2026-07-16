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
  ArrowRight,
  Lock,
  ExternalLink,
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
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium bg-[#0D0F13] border border-neutral-800 text-neutral-300 shadow-lg">
      <span
        className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`}
        aria-hidden="true"
      />
      <Icon size={10} className="opacity-70" aria-hidden="true" />
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
      <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 h-full flex flex-col bg-white dark:bg-[#0D0F13] shadow-xl transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-700">
        {/* Project visual area */}
        <div
          className={`relative aspect-video w-full overflow-hidden bg-linear-to-br ${gradients[index % 3]}`}
        >
          {/* Animated background pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] transition-transform duration-700 group-hover:scale-105 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, ${'#000'} 1px, transparent 0)`,
              backgroundSize: '16px 16px'
            }}
          />

          {/* Project image */}
          {project.image && (
            <motion.div
              className="absolute inset-0"
              animate={hovered ? { scale: 1.04 } : { scale: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
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
          <div className="absolute top-3 left-3 z-10">
            <StatusBadge status={project.status} />
          </div>

          {/* Private badge - Top Right (if private) */}
          {(project as any).isPrivate && (
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase bg-[#0D0F13] border border-neutral-800 text-neutral-400 shadow-lg">
                <Lock size={10} className="text-neutral-500" />
                Private
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 md:p-6 flex flex-col flex-1">
          {/* Category & Status */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500 font-semibold">
              {project.category}
            </span>
            {project.link && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold uppercase text-emerald-400/80">
                <ExternalLink size={10} />
                Public
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors duration-300 line-clamp-1">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mt-3 mb-5 flex-1 font-light">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-[11px] font-mono font-medium px-2.5 py-1 bg-[#FAFAFA] dark:bg-[#121418] border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-full transition-colors duration-200 hover:border-neutral-300 dark:hover:border-neutral-700"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800/60 mb-4" />

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto">
            {/* Demo text or link indicator */}
            <div className="flex items-center gap-1.5 text-neutral-400 dark:text-neutral-500 font-medium text-xs">
              {project.link ? (
                <>
                  <ExternalLink size={12} className="text-neutral-500" />
                  <span>View Project</span>
                </>
              ) : (
                <>
                  <Lock size={12} className="text-neutral-500" />
                  <span>{project.demoText || "Demo Available on Request"}</span>
                </>
              )}
            </div>

            {/* Action button */}
            <motion.div
              className="w-9 h-9 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center justify-center bg-[#FAFAFA] dark:bg-[#101216]/50 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white group-hover:border-neutral-300 dark:group-hover:border-neutral-600 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-800/40 transition-all duration-300"
              animate={hovered ? { scale: 1.05 } : { scale: 1 }}
            >
              <motion.div
                animate={hovered ? { x: 3 } : { x: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {project.link ? (
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full h-full"
                  >
                    <ArrowRight size={16} />
                  </Link>
                ) : (
                  <Link
                    href="#contact"
                    className="flex items-center justify-center w-full h-full"
                  >
                    <ArrowRight size={16} />
                  </Link>
                )}
              </motion.div>
            </motion.div>
          </div>
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
            href="https://github.com/Muhammad-Umer-Nadeem"
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
