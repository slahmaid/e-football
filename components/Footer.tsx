import Link from "next/link";
import { SITE_SOCIALS } from "@/components/SocialIcons";
import styles from "./Footer.module.css";

const NAV = [
  { href: "/articles", label: "Articles" },
  { href: "/database", label: "Database" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
] as const;

const LEGAL = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/disclosure", label: "Disclosure" },
  { href: "/feed.xml", label: "RSS" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link href="/" className={styles.brandName}>
            PixelPitch
          </Link>
          <p className={styles.tagline}>
            Independent eFootball editorial — tactics, squads, and the weekly
            meta.
          </p>
        </div>

        <nav className={styles.nav} aria-label="Footer">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

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

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <p className={styles.copy}>
            © {year} PixelPitch. Not affiliated with Konami.
          </p>
          <nav className={styles.legal} aria-label="Legal">
            {LEGAL.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={styles.legalLink}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
