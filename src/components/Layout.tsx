"use client";

import Sidebar from "./Sidebar";
import styles from "./Layout.module.css";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={styles.layout}>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main
        className={`${styles.content} ${
          isOpen ? styles.contentOpen : styles.contentClosed
        }`}
      >
        {children}
      </main>
    </div>
  );
}
