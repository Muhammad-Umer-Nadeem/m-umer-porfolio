"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, ArrowUpRight, Copy, Check, Loader2, FileText, Download } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

// Type definitions
interface FormData {
  name: string;
  email: string;
  message: string;
}

interface SocialLink {
  name: string;
  url: string;
}

interface SocialTexts {
  [key: string]: string;
}

interface PersonalInfo {
  email: string;
  location: string;
}

const chars = "!<>-_\\/[]{}—=+*^?#@$%&";

// Mock data - replace with your actual data source
const personalInfo: PersonalInfo = {
  email: "umernadeem005@gmail.com",
  location: "Pakistan",
};

const Contact: React.FC = () => {
  // State
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [displayText, setDisplayText] = useState<string>("Send Message");
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [socialTexts, setSocialTexts] = useState<SocialTexts>({});
  const [cvText, setCvText] = useState<string>("View Resume");
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [downloadText, setDownloadText] = useState<string>("Download Resume");

  // Refs
  const downloadFrameRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const socialFrameRef = useRef<number | null>(null);
  const cvFrameRef = useRef<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Scramble effect for send button
  const scramble = useCallback(() => {
    const text = "Send Message";
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
  }, []);

  const resetText = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    setDisplayText("Send Message");
  }, []);

  // Scramble effect for social links
  const scrambleSocial = useCallback((name: string) => {
    let iteration: number = 0;
    const totalFrames: number = name.length * 3;

    if (socialFrameRef.current) {
      cancelAnimationFrame(socialFrameRef.current);
    }

    const animate = (): void => {
      setSocialTexts((prev: SocialTexts) => ({
        ...prev,
        [name]: name
          .split("")
          .map((char: string, i: number) => {
            if (i < iteration / 3) return name[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(""),
      }));
      iteration++;
      if (iteration <= totalFrames) {
        socialFrameRef.current = requestAnimationFrame(animate);
      }
    };

    socialFrameRef.current = requestAnimationFrame(animate);
  }, []);

  const resetSocial = useCallback((name: string) => {
    if (socialFrameRef.current) {
      cancelAnimationFrame(socialFrameRef.current);
    }
    setSocialTexts((prev: SocialTexts) => ({
      ...prev,
      [name]: name,
    }));
  }, []);

  // Scramble effect for CV download
  const scrambleCV = useCallback(() => {
    const text = "View Resume";
    let iteration: number = 0;
    const totalFrames: number = text.length * 3;

    if (cvFrameRef.current) {
      cancelAnimationFrame(cvFrameRef.current);
    }

    const animate = (): void => {
      setCvText(
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
        cvFrameRef.current = requestAnimationFrame(animate);
      }
    };

    cvFrameRef.current = requestAnimationFrame(animate);
  }, []);

  const resetCV = useCallback(() => {
    if (cvFrameRef.current) {
      cancelAnimationFrame(cvFrameRef.current);
    }
    setCvText("View Resume");
  }, []);

  // Cleanup animation frames
  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (socialFrameRef.current) cancelAnimationFrame(socialFrameRef.current);
      if (cvFrameRef.current) cancelAnimationFrame(cvFrameRef.current);
      if (downloadFrameRef.current) cancelAnimationFrame(downloadFrameRef.current);
    };
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setSending(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      toast.success("Message sent successfully!", {
        duration: 4000,
        style: {
          background: '#10B981',
          color: '#fff',
        },
      });

      setFormData({ name: "", email: "", message: "" });
      setErrors({});

    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send message. Please try again.", {
        duration: 4000,
        style: {
          background: '#EF4444',
          color: '#fff',
        },
      });
    } finally {
      setSending(false);
    }
  };

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { id, value } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [id]: value,
    }));

    // Clear error when user starts typing
    if (errors[id as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [id]: undefined,
      }));
    }
  };

  // Copy email to clipboard
  const copyEmail = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      toast.success("Email copied to clipboard!", {
        icon: '📋',
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy email");
    }
  };

  // Scramble effect for CV download
  const scrambleDownload = useCallback(() => {
    const text = "Download Resume";
    let iteration: number = 0;
    const totalFrames: number = text.length * 3;

    if (downloadFrameRef.current) {
      cancelAnimationFrame(downloadFrameRef.current);
    }

    const animate = (): void => {
      setDownloadText(
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
        downloadFrameRef.current = requestAnimationFrame(animate);
      }
    };

    downloadFrameRef.current = requestAnimationFrame(animate);
  }, []);

  const resetDownload = useCallback(() => {
    if (downloadFrameRef.current) {
      cancelAnimationFrame(downloadFrameRef.current);
    }
    setDownloadText("Download Resume");
  }, []);

  // View Resume
  const downloadCV = (): void => {
    const cvUrl = "/resume/Sarib_Ali_Resume.pdf";

    // Open in new tab for viewing only
    window.open(cvUrl, '_blank', 'noopener,noreferrer');
  };

  // Download CV
  const handleDownloadCV = (): void => {
    const cvUrl = "/resume/Sarib_Ali_Resume.pdf";

    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "Sarib_Ali_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Social links configuration
  const socialLinks: SocialLink[] = [
    {
      name: "GitHub",
      url: "https://github.com/Muhammad-Umer-Nadeem",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/muhammad-umer-nadeem/",
    },
  ];

  // Initialize social texts
  useEffect(() => {
    const initial: SocialTexts = {};
    socialLinks.forEach((link: SocialLink) => {
      initial[link.name] = link.name;
    });
    setSocialTexts(initial);
  }, []);

  return (
    <section id="contact" className="py-32 bg-[#FAFAFA] dark:bg-[#0A0A0A] relative">
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            fontSize: '14px',
          },
          success: {
            style: {
              background: '#10B981',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#10B981',
            },
          },
          error: {
            style: {
              background: '#EF4444',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#EF4444',
            },
          },
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500">
              04
            </span>
            <div className="h-px w-12 bg-neutral-300 dark:bg-neutral-700" />
            <h2 className="text-sm font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500">
              Contact
            </h2>
          </div>

          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white leading-tight mb-6">
            Let&apos;s work
            <br />
            <span className="text-neutral-400 dark:text-neutral-500">
              together
            </span>
          </h3>

          <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-lg mb-16">
            Have a project in mind? I&apos;d love to hear about it. Drop me a
            message and let&apos;s create something amazing.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Name field */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                className={`bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 rounded-xl h-12 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:border-neutral-400 dark:focus:border-neutral-600 ${errors.name ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                disabled={sending}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-sm text-red-500 mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email field */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                className={`bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 rounded-xl h-12 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:border-neutral-400 dark:focus:border-neutral-600 ${errors.email ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                disabled={sending}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-red-500 mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Message field */}
            <div className="space-y-2">
              <Label
                htmlFor="message"
                className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Message *
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell me about your project..."
                rows={5}
                className={`bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:border-neutral-400 dark:focus:border-neutral-600 resize-none ${errors.message ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                disabled={sending}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <p id="message-error" className="text-sm text-red-500 mt-1">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={sending}
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 bg-neutral-900 dark:bg-white text-white dark:text-black text-sm font-medium rounded-full overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onHoverStart={() => {
                if (!sending) {
                  scramble();
                }
              }}
              onHoverEnd={() => {
                if (!sending) {
                  resetText();
                }
              }}
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

              {/* Icon */}
              <span className="relative z-10">
                {sending ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={14} />
                )}
              </span>

              {/* Text */}
              <span className="relative z-10 font-mono tracking-wide">
                {sending ? "Sending..." : displayText}
              </span>
            </motion.button>
          </motion.form>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-between"
          >
            <div>
              {/* Email section */}
              <h4 className="text-sm font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500 mb-6">
                Email
              </h4>
              <button
                onClick={copyEmail}
                className="group flex items-center gap-3 text-lg md:text-xl font-medium text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors duration-300 mb-12"
                aria-label="Copy email address"
              >
                {personalInfo.email}
                {copied ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <Copy
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                )}
              </button>

              {/* Social links */}
              <h4 className="text-sm font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500 mb-6">
                Social
              </h4>
              <div className="flex flex-col gap-3 mb-8">
                {socialLinks.map((link: SocialLink, index: number) => (
                  <Link
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors duration-300 w-fit"
                    aria-label={`Visit ${link.name} profile`}
                  >
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="relative z-10 font-mono tracking-wide"
                      onMouseEnter={() => {
                        setHoveredSocial(link.name);
                        scrambleSocial(link.name);
                      }}
                      onMouseLeave={() => {
                        setHoveredSocial(null);
                        resetSocial(link.name);
                      }}
                    >
                      {socialTexts[link.name] || link.name}
                    </motion.span>
                    <ArrowUpRight
                      size={14}
                      className="relative z-10 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                ))}
              </div>

              {/* CV Download Section */}
              {/* CV Section */}
              <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                <h4 className="text-sm font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500 mb-6">
                  Resources
                </h4>
                <div className="flex items-center gap-6">
                  {/* View CV Button */}
                  <motion.button
                    onClick={downloadCV}
                    className="group relative inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors duration-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 }}
                    onMouseEnter={scrambleCV}
                    onMouseLeave={resetCV}
                    aria-label="View CV"
                  >
                    <FileText
                      size={16}
                      className="transition-all duration-300 group-hover:translate-y-0.5"
                    />
                    <span className="relative z-10 font-mono tracking-wide">
                      {cvText}
                    </span>
                  </motion.button>

                  {/* Download CV Button */}
                  <motion.button
                    onClick={handleDownloadCV}
                    className="group relative inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors duration-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.65 }}
                    onMouseEnter={scrambleDownload}
                    onMouseLeave={resetDownload}
                    aria-label="Download Resume"
                  >
                    <Download
                      size={16}
                      className="transition-all duration-300 group-hover:translate-y-0.5"
                    />
                    <span className="relative z-10 font-mono tracking-wide">
                      {downloadText}
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Location info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800"
            >
              <p className="text-sm text-neutral-400 dark:text-neutral-500">
                Based in {personalInfo.location}
              </p>
              <p className="text-sm text-neutral-400 dark:text-neutral-500">
                Available for freelance &amp; full-time
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
