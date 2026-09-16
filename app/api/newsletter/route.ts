import { NextResponse } from "next/server";

type Body = {
  email?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const buttondownKey = process.env.BUTTONDOWN_API_KEY;
  const formspreeId = process.env.FORMSPREE_NEWSLETTER_ID;

  if (buttondownKey) {
    const res = await fetch("https://api.buttondown.email/v1/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Token ${buttondownKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, tags: ["pixelpitch-web"] }),
    });

    if (!res.ok && res.status !== 409) {
      return NextResponse.json(
        { error: "Newsletter provider error" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, provider: "buttondown" });
  }

  if (formspreeId) {
    const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, _subject: "PixelPitch newsletter" }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Newsletter provider error" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, provider: "formspree" });
  }

  // Dev / pre-provider fallback: accept the signup so UX works.
  console.info("[newsletter] signup captured (no provider configured):", email);
  return NextResponse.json({ ok: true, provider: "local" });
}
