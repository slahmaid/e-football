"use client";

import { FormEvent, useState } from "react";
import styles from "./page.module.css";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <p className={styles.note} role="status">
        Thanks — your message is ready on our side once email delivery is
        wired. For now, reach us at{" "}
        <a href="mailto:hello@pixelpitch.blog">hello@pixelpitch.blog</a>.
      </p>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate={false}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="name">
          Name
        </label>
        <input
          className={styles.input}
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          className={styles.input}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="message">
          Message
        </label>
        <textarea
          className={styles.textarea}
          id="message"
          name="message"
          required
        />
      </div>
      <button className={styles.submit} type="submit">
        Send message
      </button>
    </form>
  );
}
