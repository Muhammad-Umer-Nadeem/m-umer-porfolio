"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { personalInfo } from "@/components/Data/mock";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

// Type definitions
interface ClientAvatar {
  id: number;
  src: string;
  name: string;
}

interface TextRevealProps {
  children: React.ReactNode;
  delay?: number;
}

interface ScrambleTextProps {
  text: string;
  delay?: number;
}

interface ScrambleButtonProps {
  children: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  href: string;
  [key: string]: any;
}

const chars = "!<>-_\\/[]{}—=+*^?#@$%&";

/* ── TextReveal component ────────────────────────────────────────────── */
const TextReveal: React.FC<TextRevealProps> = ({ children, delay = 0 }) => {
  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        className="inline-block"
        initial={{ y: "110%", rotateX: -80 }}
        animate={{ y: 0, rotateX: 0 }}
        transition={{
          duration: 1,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.span>
    </span>
  );
};

/* ── ScrambleText component ──────────────────────────────────────────── */
const ScrambleText: React.FC<ScrambleTextProps> = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState<string>("");
  const [started, setStarted] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let iteration: number = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char: string, index: number) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      iteration += 1 / 3;
      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [started, text]);

  return <span>{displayText}</span>;
};

/* ── ScrambleButton component ────────────────────────────────────────── */
const ScrambleButton: React.FC<ScrambleButtonProps> = ({
  children,
  className,
  onClick,
  href,
  ...props
}) => {
  const frameRef = useRef<number | null>(null);
  const [displayText, setDisplayText] = useState<string>(children);
  const [iconSpinning, setIconSpinning] = useState<boolean>(false);

  const scramble = useCallback(() => {
    const text = children;
    let iteration: number = 0;
    const totalFrames: number = text.length * 3;
    
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    
    const animate = (): void => {
      setDisplayText(
        text
          .split("")
          .map((char: string, i: number) => {
            if (char === " ") return " ";
            if (i < iteration / 3) return text[i];
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
  }, [children]);

  const resetText = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    setDisplayText(children);
  }, [children]);

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <motion.a
      href={href}
      onClick={onClick}
      className={`group relative inline-flex items-center gap-2 overflow-hidden ${className || ""}`}
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
      {...props}
    >
      {/* Sliding fill layer */}
      <motion.span
        className="absolute inset-0 bg-neutral-700 dark:bg-neutral-200 rounded-full"
        initial={{ x: "-100%" }}
        whileHover={{ x: "0%" }}
        transition={{ type: "tween", ease: [0.76, 0, 0.24, 1], duration: 0.4 }}
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
        <ExternalLink size={14} />
      </motion.span>
    </motion.a>
  );
};

/* ── Happy‑clients card ───────────────────────────────────────────────── */
const clientAvatars: ClientAvatar[] = [
  { id: 1, src: "/clients/Shaheryaar-Baig.webp", name: "Sheryaar Baig." },
  { id: 5, src: "/clients/Faisal-Iqbal.jpg", name: "Faisal Iqbal." },
  { id: 3, src: "/clients/Humaira-Qasim.webp", name: "Humaira Qasim." },
  { id: 4, src: "/clients/Siddharth-Oak.jpg", name: "Siddharth Oak." },
  // { id: 2, src: "/clients/Shaheryaar-Baig.png", name: "Jamil Khan." },
  { id: 6, src: "/clients/Umer-Nadeem.webp", name: "Muhammad Umer." },
];

const CIRCLE_TEXT = "Happy Clients · Happy Clients · Happy Clients · ";

const HeroCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col items-center"
    >
      <div className="relative w-64 h-72 sm:w-72 sm:h-80 rounded-[2rem] overflow-hidden shadow-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50">
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent z-10" />
        
        <Image
          src="/Sarib_Img/Sarib-Ali.webp"
          alt="Muhammad Umer Nadeem"
          fill
          className="object-cover object-top"
          sizes="(max-width: 640px) 256px, 288px"
          priority
        />

        <div className="absolute top-3 right-3 z-20 w-20 h-20">
          <svg
            viewBox="0 0 80 80"
            className="w-full h-full animate-[spin_12s_linear_infinite]"
          >
            <defs>
              <path
                id="circle-path"
                d="M 40,40 m -28,0 a 28,28 0 1,1 56,0 a 28,28 0 1,1 -56,0"
              />
            </defs>
            <text
              className="fill-white/80 dark:fill-white/80"
              fontSize="8.5"
              letterSpacing="1.8"
              fontFamily="monospace"
            >
              <textPath href="#circle-path">{CIRCLE_TEXT}</textPath>
            </text>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-white/90 dark:bg-white shadow" />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-5 px-5 py-3 flex items-center gap-1 rounded-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200/60 dark:border-neutral-700/50 shadow-lg shadow-neutral-200/40 dark:shadow-black/30"
      >
        <div className="flex items-center">
          {clientAvatars.map((client: ClientAvatar, index: number) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 + index * 0.07, duration: 0.4 }}
              style={{
                marginLeft: index === 0 ? 0 : -10,
                zIndex: clientAvatars.length - index,
              }}
              className="relative w-9 h-9 rounded-full border-2 border-white dark:border-neutral-900 overflow-hidden shadow-sm"
              title={client.name}
            >
              {/* Use regular img tag for external URLs */}
              <img
                src={client.src}
                alt={client.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        <div className="ml-3 leading-tight">
          <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-100 whitespace-nowrap">
            Happy Clients
          </p>
          <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono">
            Trusted worldwide
          </p>
        </div>

        <span className="relative flex h-2 w-2 ml-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
      </motion.div>
    </motion.div>
  );
};

/* ── Main HeroSection ─────────────────────────────────────────────────── */
const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FAFAFA] dark:bg-[#0A0A0A]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <motion.div style={{ y: y3, willChange: "transform" }} className="absolute top-20 right-[15%] w-72 h-72 rounded-full border border-neutral-200/20 dark:border-neutral-700/20" animate={{ rotate: [0, 360] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} />
      <motion.div style={{ y: y1, willChange: "transform" }} className="absolute bottom-40 left-[10%] w-48 h-48 rounded-full border border-neutral-200/30 dark:border-neutral-700/30" animate={{ rotate: [360, 0] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />
      <motion.div style={{ y: y2, willChange: "transform" }} className="absolute top-[30%] right-[8%] w-3 h-3 rounded-full bg-neutral-400/30 dark:bg-neutral-600/30" animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 3, repeat: Infinity }} />
      <motion.div style={{ y: y1, willChange: "transform" }} className="absolute top-[20%] left-[20%] w-2 h-2 rounded-full bg-neutral-400/40 dark:bg-neutral-600/40" animate={{ scale: [1, 2, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} />
      <motion.div style={{ y: y3, willChange: "transform" }} className="absolute bottom-[25%] right-[25%] w-1.5 h-1.5 rounded-full bg-neutral-400/50 dark:bg-neutral-600/50" animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} />

      <motion.div style={{ y: y1, opacity, scale, willChange: "transform, opacity" }} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
          <div className="flex-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex items-center gap-3 mb-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">Available for work</span>
            </motion.div>

            <div className="mb-6">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="text-sm font-medium tracking-[0.3em] uppercase text-neutral-500 dark:text-neutral-400 font-mono mb-4">
                <ScrambleText text={personalInfo.title} delay={0.5} />
              </motion.p>
            </div>

            <h1 className="text-4xl sm:text-4xl md:text-4xl lg:text-[10rem] font-bold leading-[0.85] tracking-tighter text-neutral-900 dark:text-white mb-8">
              <TextReveal delay={0.3}>{personalInfo.firstName}</TextReveal>
              <br />
              <TextReveal delay={0.5}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 via-neutral-500 to-neutral-900 dark:from-white dark:via-neutral-500 dark:to-white">
                  {personalInfo.lastName}
                </span>
              </TextReveal>
            </h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }} className="max-w-xl text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed mb-12">
              {personalInfo.tagline}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }} className="flex flex-wrap gap-5">
              <ScrambleButton
                href="#projects"
                data-cursor="View"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-black text-sm font-medium rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-100"
              >
                View My Work
              </ScrambleButton>
              <ScrambleButton
                href="#contact"
                data-cursor="Say hi"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-sm font-medium rounded-full hover:border-neutral-900 dark:hover:border-white hover:text-neutral-900 dark:hover:text-white"
              >
                Get In Touch
              </ScrambleButton>
            </motion.div>
          </div>

          <div className="flex-shrink-0 hidden lg:flex">
            <HeroCard />
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 dark:text-neutral-500 font-mono">Scroll</span>
        <motion.div className="w-[1px] h-12 bg-neutral-300 dark:bg-neutral-700 origin-top" animate={{ scaleY: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
      </motion.div>
    </section>
  );
};

export default Hero;
