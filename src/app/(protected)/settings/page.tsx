"use client";

import styles from "./page.module.css";
import { Moon, Sun, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // language
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("lang") || "en";
    setLanguage(savedLang);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "en" ? "th" : "en";
    setLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  if (!mounted) return null; // ป้องกัน hydration mismatch

  return (
    <div
      className={`${styles.container} ${theme === "dark" ? styles.dark : ""}`}
    >
      <h1 className={styles.title}>Settings</h1>
      <p className={styles.subtitle}>Customize your preferences</p>

      {/* Appearance */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Appearance</h2>
        <button
          className={styles.button}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </div>

      {/* Language */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Language (comming soon...)</h2>
        <button className={styles.button} onClick={toggleLanguage}>
          <Globe size={18} />
          <span>{language === "en" ? "Switch to Thai" : "เปลี่ยนเป็นอังกฤษ"}</span>
        </button>
      </div>
    </div>
  );
}
