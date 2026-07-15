"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring, MotionValue } from "framer-motion";
import { personalInfo, stats, skillTags } from "@/components/Data/mock";
import { MapPin, Briefcase, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

// Type definitions
interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

interface PersonalInfo {
  bio: string;
  location: string;
  email: string;
  name: string;
  title: string;
  firstName: string;
  lastName: string;
}

interface CounterProps {
  value: number;
  suffix?: string;
}

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
}

/* ── Counter component ────────────────────────────────────────────────── */
const Counter: React.FC<CounterProps> = ({ value, suffix = "" }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 100 });
  const [display, setDisplay] = React.useState<number>(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest: number) => {
      setDisplay(Math.round(latest));
    });
    return () => unsubscribe();
  }, [springValue]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

/* ── AnimatedSection component ────────────────────────────────────────── */
const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* ── AboutSection component ───────────────────────────────────────────── */
const About: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="py-32 bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden"
    >
      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E")',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-16">
            <span className="text-sm font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500">
              01
            </span>
            <div className="h-[1px] w-12 bg-neutral-300 dark:bg-neutral-700" />
            <h2 className="text-sm font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500">
              About
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column */}
          <div>
            <AnimatedSection delay={0.1}>
              <h3 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white leading-tight mb-8">
                Frontend Developer building
                <br />
                <span className="text-neutral-400 dark:text-neutral-500">
                  fast, modern websites
                </span>
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
                {personalInfo.bio}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="flex flex-col gap-3 mb-10">
                <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                  <MapPin
                    size={16}
                    className="text-neutral-400 dark:text-neutral-500"
                  />
                  <span className="text-sm">{personalInfo.location}</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                  <Briefcase
                    size={16}
                    className="text-neutral-400 dark:text-neutral-500"
                  />
                  <span className="text-sm">Available for freelance</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                  <Mail
                    size={16}
                    className="text-neutral-400 dark:text-neutral-500"
                  />
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-sm hover:text-neutral-900 dark:hover:text-white transition-colors duration-200"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* Stats */}
            <AnimatedSection delay={0.4}>
              <div ref={ref} className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {stats.map((stat: Stat, index: number) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="text-center sm:text-left"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-1">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-500 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Right column */}
          <div>
            {/* Skills tags */}
            <AnimatedSection delay={0.3}>
              <h4 className="text-sm font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500 mb-6">
                Technologies & Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {skillTags.map((tag: string, index: number) => (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.04 }}
                  >
                    <Badge
                      variant="outline"
                      className="px-4 py-2 text-sm font-medium border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-300 cursor-default rounded-full"
                    >
                      {tag}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            {/* Quote card */}
            <AnimatedSection delay={0.5}>
              <div className="mt-12 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                <blockquote className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm italic">
                  &ldquo;I believe good web experiences come from clean code,
                  thoughtful design, and attention to performance. Every
                  interface should be fast, usable, and intentional.&rdquo;
                </blockquote>
                <div className="mt-4 flex items-center gap-3">
                  {/* Avatar placeholder - Replace with Image component if using actual image */}
                  <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-600 dark:text-neutral-400">
                    {personalInfo.firstName[0]}
                    {personalInfo.lastName[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">
                      {personalInfo.name}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {personalInfo.title}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
