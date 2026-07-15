"use client";

import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/components/Data/mock";
import { ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";

// Type definitions
interface SocialLink {
  platform: "github" | "linkedin" | "twitter";
  url: string;
  label: string;
}

interface PersonalInfo {
  name: string;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

const Footer: React.FC = () => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const currentYear = new Date().getFullYear();

  // Social links configuration
  const socialLinks: SocialLink[] = [
    {
      platform: "github",
      url: personalInfo.social.github || "#",
      label: "GitHub Profile",
    },
    {
      platform: "linkedin",
      url: personalInfo.social.linkedin || "#",
      label: "LinkedIn Profile",
    },
    {
      platform: "twitter",
      url: personalInfo.social.twitter || "#",
      label: "Twitter Profile",
    },
  ];

  // Social icon mapping
  const SocialIcon: React.FC<{ platform: SocialLink["platform"]; size?: number }> = ({
    platform,
    size = 20,
  }) => {
    const iconProps = { size };
    switch (platform) {
      case "github":
        return <FaGithub {...iconProps} />;
      case "linkedin":
        return <FaLinkedin {...iconProps} />;
      case "twitter":
        return <FaTwitter {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <footer className="py-12 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            <span>
              &copy; {currentYear} {personalInfo.name}.
            </span>
            <span className="hidden sm:inline">All rights reserved.</span>
          </div>

          {/* Social Links & Scroll to Top */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social: SocialLink) => (
              <Link
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200"
                aria-label={social.label}
              >
                <SocialIcon platform={social.platform} />
              </Link>
            ))}

            <motion.button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:bg-neutral-900 dark:hover:bg-white hover:text-white dark:hover:text-black hover:border-neutral-900 dark:hover:border-white transition-colors duration-200"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
