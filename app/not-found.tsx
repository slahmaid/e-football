import Link from "next/link";
import { Header } from "@/components/Header";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <p className={styles.eyebrow}>404</p>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.lead}>
          That pitch is empty. The page may have moved, or the link is offside.
        </p>
        <div className={styles.actions}>
          <Link href="/" className={styles.primary}>
            Back home
          </Link>
          <Link href="/articles" className={styles.secondary}>
            Browse articles
          </Link>
        </div>
      </main>
    </>
  );
}
