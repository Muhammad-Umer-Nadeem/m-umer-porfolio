"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

// Type definitions
type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

// Create context with proper typing
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/* ── ThemeProvider component ──────────────────────────────────────────── */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = "dark",
  storageKey = "portfolio-theme",
}) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState<boolean>(false);

  // Set mounted to true after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize theme from localStorage after mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey) as Theme | null;
      
      if (saved === "light" || saved === "dark") {
        setThemeState(saved);
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setThemeState("dark");
      }
    } catch (error) {
      console.warn("Failed to access localStorage:", error);
    }
  }, [storageKey]);

  // Apply theme class to document
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.setAttribute("data-theme", theme);

    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      console.warn("Failed to save theme to localStorage:", error);
    }
  }, [theme, mounted, storageKey]);

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent): void => {
      const saved = localStorage.getItem(storageKey);
      if (!saved) {
        setThemeState(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [mounted, storageKey]);

  // Toggle theme function
  const toggleTheme = useCallback((): void => {
    setThemeState((prev: Theme) => (prev === "dark" ? "light" : "dark"));
  }, []);

  // Set theme function
  const setTheme = useCallback((newTheme: Theme): void => {
    if (newTheme === "light" || newTheme === "dark") {
      setThemeState(newTheme);
    } else {
      console.warn(`Invalid theme: ${newTheme}. Must be "light" or "dark".`);
    }
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo<ThemeContextType>(
    () => ({
      theme,
      toggleTheme,
      setTheme,
      mounted,
    }),
    [theme, toggleTheme, setTheme, mounted]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

/* ── useTheme hook ────────────────────────────────────────────────────── */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error(
      "useTheme must be used within a ThemeProvider. " +
      "Make sure your component is wrapped in <ThemeProvider>."
    );
  }
  
  return context;
};

export default ThemeProvider;
