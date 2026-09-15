import styles from "./AdSlot.module.css";

type AdSlotProps = {
  slotId: string;
  label?: string;
  variant: "leaderboard" | "sidebar" | "in-feed";
};

const variantClass = {
  leaderboard: styles.leaderboard,
  sidebar: styles.sidebar,
  "in-feed": styles.inFeed,
} as const;

export function AdSlot({
  slotId,
  label = "Advertisement",
  variant,
}: AdSlotProps) {
  return (
    <aside
      className={`${styles.slot} ${variantClass[variant]}`}
      data-ad-slot={slotId}
      aria-label={label}
    >
      <p className={styles.label}>{label}</p>
    </aside>
  );
}
