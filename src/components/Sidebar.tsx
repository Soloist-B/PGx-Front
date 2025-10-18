"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  ClipboardCheck,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import styles from "./Sidebar.module.css";

const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  const pathname = usePathname();
  const router = useRouter();

  // ✅ แก้ hydration error
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  };

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={22} /> },
    { name: "Patients", path: "/patient", icon: <Users size={22} /> },
    { name: "Consent", path: "/consent", icon: <ClipboardCheck size={22} /> },
    { name: "Reports", path: "/reports", icon: <FileText size={22} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={22} /> },
  ];

  return (
    <aside className={`${styles.sidebar} ${!isOpen ? styles.collapsed : ""}`}>
      {/* Toggle */}
      <div className={styles.topBar}>
        <button className={styles.toggleBtn} onClick={() => setIsOpen(!isOpen)}>
          <span className={styles.iconWrapper}>
            {mounted ? (isOpen ? <X size={22} /> : <Menu size={22} />) : null}
          </span>
          <span
            className={`${styles.linkText} ${!isOpen ? styles.textCollapsed : ""}`}
          >
            PGx Platform
          </span>
        </button>
      </div>

      {/* Menu */}
      <nav className={styles.menuWrapper}>
        <ul className={styles.menu}>
          {menu.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`${styles.link} ${
                  pathname.startsWith(item.path) ? styles.active : ""
                }`}
              >
                <span className={styles.iconWrapper}>{item.icon}</span>
                <span
                  className={`${styles.linkText} ${
                    !isOpen ? styles.textCollapsed : ""
                  }`}
                >
                  {item.name}
                </span>
                {!isOpen && <span className={styles.tooltip}>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className={styles.logoutWrapper}>
        <button className={styles.logoutButton} onClick={handleLogout}>
          <span className={styles.iconWrapper}>
            <LogOut size={22} />
          </span>
          <span
            className={`${styles.linkText} ${!isOpen ? styles.textCollapsed : ""}`}
          >
            Logout
          </span>
          {!isOpen && <span className={styles.tooltip}>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
