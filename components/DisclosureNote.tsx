import Link from "next/link";
import styles from "./DisclosureNote.module.css";

export function DisclosureNote() {
  return (
    <p className={styles.note}>
      PixelPitch may earn from ads or affiliate links.{" "}
      <Link href="/disclosure">Advertising &amp; affiliate disclosure</Link>.
    </p>
  );
}
