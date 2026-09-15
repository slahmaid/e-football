"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./Header.module.css";

const NAV = [
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About Us" },
  { href: "/articles", label: "Articles" },
] as const;

function IconYouTube() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.8 15.5v-7l6.3 3.5-6.3 3.5z" />
    </svg>
  );
}

function IconX() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M18.2 2H21l-6.6 7.5L22 22h-6.8l-4.4-6.3L5.2 22H2.4l7-8L2 2h7l4 5.8L18.2 2zm-1.2 18h1.9L7.1 3.9H5.1L17 20z" />
    </svg>
  );
}

function IconDiscord() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M20 4.5A16.5 16.5 0 0 0 15.6 3l-.3.6a14 14 0 0 1 3.5 1.7 14.7 14.7 0 0 0-12.6 0A14 14 0 0 1 9.7 3.6L9.4 3A16.5 16.5 0 0 0 5 4.5C2.3 8.5 1.6 12.4 1.9 16.2a16.3 16.3 0 0 0 5 2.5l1-1.3a10.6 10.6 0 0 1-1.6-.8l.4-.3c3.3 1.5 6.9 1.5 10.2 0l.4.3c-.5.3-1 .6-1.6.8l1 1.3a16.3 16.3 0 0 0 5-2.5c.4-4.4-.6-8.2-2.1-11.7zM8.7 13.9c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm6.6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z" />
    </svg>
  );
}

const SOCIALS = [
  { href: "#", label: "YouTube", Icon: IconYouTube },
  { href: "#", label: "X", Icon: IconX },
  { href: "#", label: "Discord", Icon: IconDiscord },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <button
          type="button"
          className={styles.menuButton}
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="mobile-panel"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>

        <nav className={styles.nav} aria-label="Primary">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className={styles.logoLink} aria-label="PixelPitch">
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
          {SOCIALS.map((s) => (
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
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.mobileSocials}>
          {SOCIALS.map((s) => (
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
