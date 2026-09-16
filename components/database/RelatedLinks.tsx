import Link from "next/link";
import styles from "./database.module.css";

export function RelatedLinks({
  title = "Related",
  links,
}: {
  title?: string;
  links: { href: string; label: string }[];
}) {
  if (!links.length) return null;
  return (
    <div className={styles.related}>
      <h2>{title}</h2>
      <ul>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
