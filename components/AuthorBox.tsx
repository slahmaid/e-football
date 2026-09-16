import styles from "./AuthorBox.module.css";

type AuthorBoxProps = {
  name: string;
  role: string;
  bio?: string;
};

export function AuthorBox({ name, role, bio }: AuthorBoxProps) {
  return (
    <aside className={styles.box} aria-label="About the author">
      <p className={styles.eyebrow}>Author</p>
      <p className={styles.name}>
        {name}
        <span className={styles.role}> · {role}</span>
      </p>
      {bio ? <p className={styles.bio}>{bio}</p> : null}
    </aside>
  );
}
