"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const BRAND = "Muhammad Umer Nadeem";
const COLUMNS = 7;

export default function PageTransition({ children }: { children: React.ReactNode }) {
  // Initialize to true so it renders immediately in the initial HTML (SSR)
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Prevent scrolling immediately when the component mounts
    document.documentElement.style.overflow = "hidden";
    
    const total = 2600;
    const t = setTimeout(() => {
      setShow(false);
      document.documentElement.style.overflow = "";
    }, total);
    
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            key="page-intro"
            className="fixed inset-0 z-9999 pointer-events-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 1 }}
          >
            {/* Columns curtain */}
            <div className="absolute inset-0 flex">
              {Array.from({ length: COLUMNS }).map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-black dark:bg-white"
                  initial={{ y: 0 }}
                  animate={{ y: "-101%" }}
                  transition={{
                    duration: 0.9,
                    ease: [0.76, 0, 0.24, 1],
                    delay: 1.5 + i * 0.06,
                  }}
                />
              ))}
            </div>

            {/* Brand text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="overflow-hidden">
                <motion.div
                  className="flex text-white dark:text-black text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight font-sans"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
                    hidden: {},
                  }}
                >
                  {BRAND.split("").map((ch, i) => (
                    <motion.span
                      key={i}
                      variants={{
                        hidden: { y: "100%", opacity: 0 },
                        visible: {
                          y: "0%",
                          opacity: 1,
                          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                        },
                      }}
                      className="inline-block"
                      style={{ whiteSpace: "pre" }}
                    >
                      {ch}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Normal Page Content */}
      {children}
    </>
  );
}
