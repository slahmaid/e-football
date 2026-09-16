"use client";

import { useMemo } from "react";
import styles from "./ShareButtons.module.css";

type ShareButtonsProps = {
  title: string;
  url: string;
};

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const links = useMemo(() => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    return [
      {
        label: "X",
        href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      },
      {
        label: "Facebook",
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      },
      {
        label: "LinkedIn",
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      },
      {
        label: "Email",
        href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      },
    ] as const;
  }, [title, url]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard may be blocked; ignore.
    }
  }

  return (
    <div className={styles.wrap}>
      <p className={styles.label}>Share</p>
      <div className={styles.row}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={styles.button}
            target={link.label === "Email" ? undefined : "_blank"}
            rel={
              link.label === "Email" ? undefined : "noopener noreferrer"
            }
          >
            {link.label}
          </a>
        ))}
        <button type="button" className={styles.button} onClick={copyLink}>
          Copy link
        </button>
      </div>
    </div>
  );
}
