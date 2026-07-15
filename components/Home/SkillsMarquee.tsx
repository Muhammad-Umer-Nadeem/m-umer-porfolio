"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { skillTags } from "@/components/Data/mock";

type MarqueeDirection = "left" | "right";

interface MarqueeRowProps {
  direction?: MarqueeDirection;
  speed?: number;
  mobileSpeed?: number;
}

function useIsMobile(breakpoint = 640): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setIsMobile(mq.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, [breakpoint]);

  return isMobile;
}

function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

/* ── MarqueeRow component ────────────────────────────────────────────── */
const MarqueeRow: React.FC<MarqueeRowProps> = ({
  direction = "left",
  speed = 25,
  mobileSpeed,
}) => {
  const items: string[] = [...skillTags, ...skillTags, ...skillTags];
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const effectiveSpeed = isMobile ? mobileSpeed ?? speed * 0.6 : speed;

  return (
    <div className="flex overflow-hidden py-2 sm:py-3" aria-hidden="true">
      <motion.div
        className="flex gap-2 sm:gap-4 whitespace-nowrap w-max"
        style={{ willChange: "transform" }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                x:
                  direction === "left"
                    ? ["0%", "-33.33%"]
                    : ["-33.33%", "0%"],
              }
        }
        transition={{
          duration: effectiveSpeed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {items.map((skill: string, index: number) => (
          <div
            key={`${skill}-${index}`}
            className="flex items-center gap-2 sm:gap-4 px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-300 cursor-default group select-none"
          >
            <span
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-neutral-300 dark:bg-neutral-600 group-hover:bg-neutral-900 dark:group-hover:bg-white transition-colors duration-300"
              aria-hidden="true"
            />
            <span className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors duration-300">
              {skill}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/* ── SkillsMarquee component ─────────────────────────────────────────── */
const SkillsMarquee: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      className="py-16 sm:py-24 bg-[#FAFAFA] dark:bg-[#0A0A0A] overflow-hidden relative"
      aria-label="Skills and Technologies"
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-12 sm:w-32 bg-linear-to-r from-white dark:from-black to-transparent z-10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-12 sm:w-32 bg-linear-to-l from-white dark:from-black to-transparent z-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8 sm:mb-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs sm:text-sm font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500 text-center"
        >
          Technologies I work with
        </motion.p>
      </div>

      <MarqueeRow direction="left" speed={30} mobileSpeed={18} />
      <MarqueeRow direction="right" speed={35} mobileSpeed={20} />

      <div className="sr-only">
        <h3>Technologies I work with:</h3>
        <ul>
          {skillTags.map((skill: string) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SkillsMarquee;