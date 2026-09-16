import Link from "next/link";
import styles from "./database.module.css";

const LINKS = [
  { href: "/database", label: "Overview" },
  { href: "/players", label: "Players" },
  { href: "/formations", label: "Formations" },
  { href: "/playstyles", label: "Playstyles" },
  { href: "/events", label: "Events" },
  { href: "/updates", label: "Updates" },
] as const;

type DatabaseShellProps = {
  eyebrow: string;
  title: string;
  lead: string;
  currentPath: string;
  children: React.ReactNode;
};

export function DatabaseShell({
  eyebrow,
  title,
  lead,
  currentPath,
  children,
}: DatabaseShellProps) {
  return (
    <div className={styles.shell}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.lead}>{lead}</p>
      <nav className={styles.subnav} aria-label="Database">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={currentPath === link.href ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      {children}
    </div>
  );
}
