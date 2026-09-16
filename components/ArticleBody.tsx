import { MDXRemote } from "next-mdx-remote/rsc";
import type { ReactNode } from "react";
import remarkGfm from "remark-gfm";
import styles from "./ArticleBody.module.css";

type ArticleBodyProps = {
  source: string;
  midSlot?: ReactNode;
};

function createHeading(tag: "h2" | "h3") {
  const Tag = tag;
  return function Heading({ children }: { children?: ReactNode }) {
    return <Tag className={styles[tag]}>{children}</Tag>;
  };
}

const components = {
  h2: createHeading("h2"),
  h3: createHeading("h3"),
  p: ({ children }: { children?: ReactNode }) => (
    <p className={styles.p}>{children}</p>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className={styles.ul}>{children}</ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className={styles.ol}>{children}</ol>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <li className={styles.li}>{children}</li>
  ),
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className={styles.strong}>{children}</strong>
  ),
  a: ({
    href,
    children,
  }: {
    href?: string;
    children?: ReactNode;
  }) => (
    <a href={href} className={styles.a} rel="noopener noreferrer">
      {children}
    </a>
  ),
  table: ({ children }: { children?: ReactNode }) => (
    <div className={styles.tableWrap}>
      <table className={styles.table}>{children}</table>
    </div>
  ),
  th: ({ children }: { children?: ReactNode }) => (
    <th className={styles.th}>{children}</th>
  ),
  td: ({ children }: { children?: ReactNode }) => (
    <td className={styles.td}>{children}</td>
  ),
};

function splitForMidAd(source: string): [string, string | null] {
  const byHeading = source.split(/\n(?=##\s)/);
  if (byHeading.length >= 2) {
    const mid = Math.ceil(byHeading.length / 2);
    return [
      byHeading.slice(0, mid).join("\n").trim(),
      byHeading.slice(mid).join("\n").trim() || null,
    ];
  }

  const blocks = source.trim().split(/\n{2,}/);
  if (blocks.length < 4) return [source, null];
  const mid = Math.ceil(blocks.length / 2);
  return [
    blocks.slice(0, mid).join("\n\n").trim(),
    blocks.slice(mid).join("\n\n").trim() || null,
  ];
}

function MdxChunk({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      }}
    />
  );
}

export function ArticleBody({ source, midSlot }: ArticleBodyProps) {
  const [before, after] = midSlot ? splitForMidAd(source) : [source, null];

  return (
    <div className={styles.body}>
      <MdxChunk source={before} />
      {midSlot && after ? <div className={styles.midSlot}>{midSlot}</div> : null}
      {after ? <MdxChunk source={after} /> : null}
      {midSlot && !after ? (
        <div className={styles.midSlot}>{midSlot}</div>
      ) : null}
    </div>
  );
}
