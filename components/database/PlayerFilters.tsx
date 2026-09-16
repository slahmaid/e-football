"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useTransition } from "react";
import styles from "./database.module.css";

const POSITIONS = [
  "all",
  "GK",
  "CB",
  "LB",
  "RB",
  "DMF",
  "CMF",
  "AMF",
  "LMF",
  "RMF",
  "LWF",
  "RWF",
  "SS",
  "CF",
] as const;

type PlayerFiltersProps = {
  playstyles: string[];
};

export function PlayerFilters({ playstyles }: PlayerFiltersProps) {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const next = new URLSearchParams();
    for (const key of ["q", "position", "tier", "playstyle"] as const) {
      const value = String(fd.get(key) ?? "").trim();
      if (value && value !== "all") next.set(key, value);
    }
    startTransition(() => {
      router.push(`/players?${next.toString()}`);
    });
  }

  return (
    <form className={styles.filters} onSubmit={onSubmit}>
      <div className={styles.field}>
        <label htmlFor="player-q">Search</label>
        <input
          id="player-q"
          name="q"
          type="search"
          defaultValue={params.get("q") ?? ""}
          placeholder="Name, role, tag…"
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="player-position">Position</label>
        <select
          id="player-position"
          name="position"
          defaultValue={params.get("position") ?? "all"}
        >
          {POSITIONS.map((p) => (
            <option key={p} value={p}>
              {p === "all" ? "All positions" : p}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.field}>
        <label htmlFor="player-tier">Tier</label>
        <select
          id="player-tier"
          name="tier"
          defaultValue={params.get("tier") ?? "all"}
        >
          {["all", "S", "A", "B", "C"].map((t) => (
            <option key={t} value={t}>
              {t === "all" ? "All tiers" : `Tier ${t}`}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.field}>
        <label htmlFor="player-playstyle">Playstyle</label>
        <select
          id="player-playstyle"
          name="playstyle"
          defaultValue={params.get("playstyle") ?? "all"}
        >
          <option value="all">All playstyles</option>
          {playstyles.map((ps) => (
            <option key={ps} value={ps}>
              {ps.replace(/-/g, " ")}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className={styles.filterButton} disabled={pending}>
        {pending ? "Filtering…" : "Apply"}
      </button>
    </form>
  );
}
