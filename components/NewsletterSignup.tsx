"use client";

import { FormEvent, useState } from "react";
import styles from "./NewsletterSignup.module.css";

type NewsletterSignupProps = {
  compact?: boolean;
};

export function NewsletterSignup({ compact = false }: NewsletterSignupProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Subscribe failed");
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      className={`${styles.section} ${compact ? styles.compact : ""}`}
      aria-labelledby="newsletter-heading"
    >
      <div className={styles.copy}>
        <p className={styles.eyebrow}>Newsletter</p>
        <h2 id="newsletter-heading" className={styles.title}>
          Match notes in your inbox
        </h2>
        <p className={styles.lead}>
          One short briefing a week — meta shifts, GP picks, and event value.
          No spam.
        </p>
      </div>

      {status === "done" ? (
        <p className={styles.success} role="status">
          You&apos;re on the list. Watch for the next briefing.
        </p>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.srOnly} htmlFor="newsletter-email">
            Email
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            placeholder="you@email.com"
            autoComplete="email"
            className={styles.input}
            disabled={status === "loading"}
          />
          <button
            type="submit"
            className={styles.button}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Joining…" : "Subscribe"}
          </button>
          {status === "error" ? (
            <p className={styles.error} role="alert">
              Something went wrong. Try again in a moment.
            </p>
          ) : null}
        </form>
      )}
    </section>
  );
}
