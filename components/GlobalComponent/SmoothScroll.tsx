"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Lenis from "lenis";
import { useAnimationFrame } from "framer-motion";

// Type definitions
interface SmoothScrollProps {
  children: React.ReactNode;
  options?: Partial<LenisOptions>;
}

interface LenisOptions {
  duration?: number;
  easing?: (t: number) => number;
  lerp?: number;
  smoothWheel?: boolean;
  smoothTouch?: boolean;
  syncTouch?: boolean;
  wheelMultiplier?: number;
  infinite?: boolean;
  orientation?: "vertical" | "horizontal";
  gestureOrientation?: "vertical" | "horizontal";
  touchMultiplier?: number;
}

/* ── Helper functions ────────────────────────────────────────────────── */
const isMobileOrTablet = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 1024px)").matches;
};

/* ── SmoothScroll component ──────────────────────────────────────────── */
const SmoothScroll: React.FC<SmoothScrollProps> = ({
  children,
  options = {},
}) => {
  const lenisRef = useRef<Lenis | null>(null);
  const enabledRef = useRef<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Default Lenis configuration for buttery smooth scroll
  const defaultOptions: LenisOptions = {
    lerp: 0.08, // Very smooth linear interpolation
    wheelMultiplier: 1,
    smoothWheel: true,
    smoothTouch: false,
    syncTouch: true, // Enhances touch device smoothness
    infinite: false,
  };

  // Check for mobile/tablet on mount and resize
  useEffect(() => {
    const checkDevice = (): void => {
      setIsMobile(isMobileOrTablet());
    };

    // Initial check
    checkDevice();

    // Listen for resize events
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    
    const handleResize = (e: MediaQueryListEvent): void => {
      setIsMobile(e.matches);
    };

    // Modern browsers
    mediaQuery.addEventListener("change", handleResize);
    
    // Fallback for older browsers
    window.addEventListener("resize", checkDevice);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  // Initialize Lenis
  useEffect(() => {
    const shouldEnableLenis = !isMobile;
    enabledRef.current = shouldEnableLenis;

    // Don't initialize Lenis on mobile devices
    if (!shouldEnableLenis) {
      // Clean up existing instance if switching to mobile
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    // Merge default options with custom options
    const mergedOptions: LenisOptions = {
      ...defaultOptions,
      ...options,
    };

    // Create Lenis instance
    const lenis = new Lenis(mergedOptions);
    lenisRef.current = lenis;

    // Cleanup on unmount
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isMobile, options]); // Re-initialize when mobile state or options change

  // Animation frame loop
  useAnimationFrame((time: number) => {
    if (!enabledRef.current) return;
    lenisRef.current?.raf(time);
  });

  // Optional: Handle anchor links with smooth scrolling
  useEffect(() => {
    if (!lenisRef.current || !enabledRef.current) return;

    const handleAnchorClick = (e: MouseEvent): void => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      e.preventDefault();
      
      const targetElement = document.querySelector(href) as HTMLElement | null;
      if (targetElement && lenisRef.current) {
        lenisRef.current.scrollTo(targetElement, {
          offset: 0,
          duration: 1.5,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, [isMobile]);

  return <>{children}</>;
};

// Export with proper types
export default SmoothScroll;
export type { SmoothScrollProps, LenisOptions };
