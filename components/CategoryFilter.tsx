import Link from "next/link";
import styles from "./CategoryFilter.module.css";

type CategoryFilterProps = {
  categories: string[];
  active?: string;
};

export function CategoryFilter({ categories, active }: CategoryFilterProps) {
  return (
    <nav className={styles.nav} aria-label="Filter by category">
      <Link
        href="/articles"
        className={`${styles.link} ${!active ? styles.active : ""}`}
        aria-current={!active ? "page" : undefined}
      >
        All
      </Link>
      {categories.map((category) => {
        const isActive = active === category;
        return (
          <Link
            key={category}
            href={`/articles?category=${encodeURIComponent(category)}`}
            className={`${styles.link} ${isActive ? styles.active : ""}`}
            aria-current={isActive ? "page" : undefined}
          >
            {category}
          </Link>
        );
      })}
    </nav>
  );
}
