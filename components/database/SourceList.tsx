import type { SourceLink } from "@/lib/database/types";
import styles from "./database.module.css";

export function SourceList({ sources }: { sources: SourceLink[] }) {
  if (!sources.length) return null;
  return (
    <div className={styles.sources}>
      <h2>Sources</h2>
      <ul>
        {sources.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
