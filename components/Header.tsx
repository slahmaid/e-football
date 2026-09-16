"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE_SOCIALS } from "@/components/SocialIcons";
import styles from "./Header.module.css";

const NAV = [
  { href: "/articles", label: "Articles" },
  { href: "/database", label: "Database" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <button
          type="button"
          className={styles.menuButton}
          aria-label={open ? "Close menu" : "Menu"}
          aria-expanded={open}
          aria-controls="mobile-panel"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <nav className={styles.nav} aria-label="Primary">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className={styles.logoLink}
          aria-label="PixelPitch"
          onClick={closeMenu}
        >
          <Image
            src="/Logo-Light.svg"
            alt="PixelPitch"
            width={180}
            height={74}
            className={styles.logo}
            priority
          />
        </Link>

        <div className={styles.socials}>
          {SITE_SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className={styles.socialLink}
              aria-label={s.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <s.Icon />
            </a>
          ))}
        </div>
      </div>

      <div
        id="mobile-panel"
        data-testid="mobile-panel"
        className={`${styles.mobilePanel} ${open ? styles.mobilePanelOpen : ""}`}
        hidden={!open}
      >
        <nav className={styles.mobileNav} aria-label="Mobile">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.mobileNavLink}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/players" className={styles.mobileNavLink} onClick={closeMenu}>
            Players
          </Link>
          <Link
            href="/formations"
            className={styles.mobileNavLink}
            onClick={closeMenu}
          >
            Formations
          </Link>
          <Link href="/events" className={styles.mobileNavLink} onClick={closeMenu}>
            Events
          </Link>
        </nav>
        <div className={styles.mobileSocials}>
          {SITE_SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className={styles.socialLink}
              aria-label={s.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <s.Icon />
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
