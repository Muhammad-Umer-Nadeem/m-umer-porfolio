"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experiences } from "@/components/Data/mock";
import { Badge } from "@/components/ui/badge";

// Type definitions
interface Technology {
  name: string;
}

interface Experience {
  id: string | number;
  period: string;
  role: string;
  company: string;
  description: string;
  technologies: string[];
}

interface TimelineItemProps {
  experience: Experience;
  index: number;
  isLast: boolean;
}

/* ── TimelineItem component ──────────────────────────────────────────── */
const TimelineItem: React.FC<TimelineItemProps> = ({
  experience,
  index,
  isLast,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative pl-8 md:pl-12 pb-12 last:pb-0 group"
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[7px] md:left-[11px] top-3 bottom-0 w-[1px] bg-neutral-200 dark:bg-neutral-800" />
      )}

      {/* Timeline dot */}
      <motion.div
        className="absolute left-0 md:left-1 top-1.5 w-[15px] h-[15px] md:w-[23px] md:h-[23px] rounded-full border-2 border-neutral-300 dark:border-neutral-700 bg-[#FAFAFA] dark:bg-[#0A0A0A] flex items-center justify-center"
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <motion.div
          className="w-[5px] h-[5px] md:w-[7px] md:h-[7px] rounded-full bg-neutral-900 dark:bg-white"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
        />
      </motion.div>

      {/* Content */}
      <div className="group-hover:translate-x-1 transition-transform duration-300">
        {/* Period */}
        <span className="text-xs font-mono tracking-wider text-neutral-400 dark:text-neutral-500 mb-2 block">
          {experience.period}
        </span>

        {/* Role */}
        <h4 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-1">
          {experience.role}
        </h4>

        {/* Company */}
        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-3">
          {experience.company}
        </p>

        {/* Description */}
        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4">
          {experience.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech: string) => (
            <Badge
              key={tech}
              variant="outline"
              className="text-xs px-3 py-1 rounded-full border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

/* ── ExperienceSection component ──────────────────────────────────────── */
const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-32 bg-neutral-50 dark:bg-neutral-950 relative"
      aria-label="Work Experience"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500">
              03
            </span>
            <div className="h-[1px] w-12 bg-neutral-300 dark:bg-neutral-700" />
            <h2 className="text-sm font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500">
              Experience
            </h2>
          </div>

          <h3 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white leading-tight mb-16">
            Where I&apos;ve
            <br />
            <span className="text-neutral-400 dark:text-neutral-500">
              worked
            </span>
          </h3>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl">
          {experiences.length > 0 ? (
            experiences.map((exp: Experience, index: number) => (
              <TimelineItem
                key={exp.id || index}
                experience={exp}
                index={index}
                isLast={index === experiences.length - 1}
              />
            ))
          ) : (
            <p className="text-neutral-500 dark:text-neutral-400 text-center py-12">
              No experience data available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
