import { ImageResponse } from "next/og";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";

export const runtime = "nodejs";
export const alt = "PixelPitch article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

type ImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  const category = article?.category ?? "eFootball";
  const title = article?.title ?? "PixelPitch";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f5f1",
          color: "#121212",
          padding: "64px",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontFamily: "Arial, Helvetica, sans-serif",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            PixelPitch
          </div>
          <div
            style={{
              fontSize: 22,
              fontFamily: "Arial, Helvetica, sans-serif",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#3a3a3a",
            }}
          >
            {category}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            maxWidth: 980,
          }}
        >
          <div
            style={{
              fontSize: title.length > 70 ? 52 : 64,
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(18,18,18,0.15)",
            paddingTop: 28,
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: 22,
            color: "#3a3a3a",
            letterSpacing: "0.04em",
          }}
        >
          <div>eFootball editorial</div>
          <div>pixelpitch.blog</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
