"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useInView,
  MotionValue,
} from "framer-motion";
import { personalInfo, testimonials } from "@/components/Data/mock";
import { Quote, ArrowUpRight } from "lucide-react";

// Type definitions
interface Testimonial {
  id?: string | number;
  text: string;
  name: string;
  role: string;
}

interface PersonalInfo {
  email: string;
}

interface ScrollProgressProps {}

interface SplitTextCTAProps {}

const chars = "!<>-_\\/[]{}—=+*^?#@$%&";

/* ── TestimonialsMarquee component ──────────────────────────────────── */
const TestimonialsMarquee: React.FC = () => {
  const doubled: Testimonial[] = [...testimonials, ...testimonials];
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n: string) => n[0])
      .join("");
  };

  return (
    <section
      ref={ref}
      className="py-24 bg-neutral-50 dark:bg-neutral-950 overflow-hidden"
      aria-label="Testimonials"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h4 className="text-sm font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500 mb-2">
            Kind words from people I&apos;ve worked with
          </h4>
        </motion.div>
      </div>

      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-neutral-50 dark:from-neutral-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-neutral-50 dark:from-neutral-950 to-transparent z-10 pointer-events-none" />

        {/* Marquee */}
        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {doubled.map((testimonial: Testimonial, index: number) => (
            <div
              key={`testimonial-${index}`}
              className="w-105 shrink-0 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors duration-300"
            >
              <Quote
                size={20}
                className="text-neutral-200 dark:text-neutral-800 mb-4"
                aria-hidden="true"
              />
              <blockquote className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 italic">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                {/* Avatar with initials */}
                <div
                  className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-600 dark:text-neutral-400"
                  aria-hidden="true"
                >
                  {getInitials(testimonial.name)}
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ── ScrollProgress component ────────────────────────────────────────── */
const ScrollProgress: React.FC<ScrollProgressProps> = () => {
  const { scrollYProgress } = useScroll();
  const scaleX: MotionValue<number> = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-neutral-900 dark:bg-white origin-left z-60"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
};

/* ── SplitTextCTA component ──────────────────────────────────────────── */
const SplitTextCTA: React.FC<SplitTextCTAProps> = () => {
  const ref = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
  const [displayText, setDisplayText] = useState<string>("Let's Talk");
  const [iconSpinning, setIconSpinning] = useState<boolean>(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const text: string = "Have a project in mind?";
  const words: string[] = text.split(" ");

  const scramble = useCallback(() => {
    const buttonText = "Let's Talk";
    let iteration: number = 0;
    const totalFrames: number = buttonText.length * 3;
    
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    
    const animate = (): void => {
      setDisplayText(
        buttonText
          .split("")
          .map((char: string, i: number) => {
            if (char === "'" || char === " ") return char;
            if (i < iteration / 3) return buttonText[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      iteration++;
      if (iteration <= totalFrames) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    
    frameRef.current = requestAnimationFrame(animate);
  }, []);

  const resetText = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    setDisplayText("Let's Talk");
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={ref}
      className="py-40 bg-[#FAFAFA] dark:bg-[#0A0A0A] relative overflow-hidden"
      aria-label="Call to Action"
    >
      {/* Background decorative elements */}
      <motion.div
        style={{ y, willChange: "transform" }}
        className="absolute top-10 right-10 w-96 h-96 rounded-full border border-neutral-200 dark:border-neutral-800 opacity-50"
        aria-hidden="true"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [40, -120]), willChange: "transform" }}
        className="absolute bottom-20 left-20 w-64 h-64 rounded-full border border-neutral-200 dark:border-neutral-800 opacity-30"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
        {/* Animated heading */}
        <div className="mb-10 overflow-hidden">
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight">
            {words.map((word: string, i: number) => (
              <span
                key={i}
                className="inline-block overflow-hidden mr-[0.3em]"
              >
                <motion.span
                  className={`inline-block ${
                    i >= 3
                      ? "text-neutral-300 dark:text-neutral-700"
                      : "text-neutral-900 dark:text-white"
                  }`}
                  initial={{ y: "110%", rotateX: -40 }}
                  animate={isInView ? { y: 0, rotateX: 0 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <motion.a
            href={`mailto:${personalInfo.email}`}
            data-cursor="Email"
            className="group relative inline-flex items-center gap-3 px-12 py-5 bg-neutral-900 dark:bg-white text-white dark:text-black text-base font-medium rounded-full overflow-hidden"
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onHoverStart={() => {
              setIconSpinning(true);
              scramble();
            }}
            onHoverEnd={() => {
              setIconSpinning(false);
              resetText();
            }}
            aria-label={`Send email to ${personalInfo.email}`}
          >
            {/* Sliding fill layer */}
            <motion.span
              className="absolute inset-0 bg-neutral-700 dark:bg-neutral-200 rounded-full"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{
                type: "tween",
                ease: [0.76, 0, 0.24, 1],
                duration: 0.4,
              }}
            />

            {/* Text */}
            <span className="relative z-10 font-mono tracking-wide">
              {displayText}
            </span>

            {/* Icon */}
            <motion.span
              className="relative z-10"
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <ArrowUpRight size={18} />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export { TestimonialsMarquee, ScrollProgress, SplitTextCTA };
