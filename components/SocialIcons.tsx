import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site";

type IconProps = {
  className?: string;
};

function IconShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={18}
      height={18}
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
    >
      {children}
    </svg>
  );
}

function IconYouTube({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.8 15.5v-7l6.3 3.5-6.3 3.5z" />
    </IconShell>
  );
}

function IconX({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path d="M18.2 2H21l-6.6 7.5L22 22h-6.8l-4.4-6.3L5.2 22H2.4l7-8L2 2h7l4 5.8L18.2 2zm-1.2 18h1.9L7.1 3.9H5.1L17 20z" />
    </IconShell>
  );
}

function IconDiscord({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path d="M20 4.5A16.5 16.5 0 0 0 15.6 3l-.3.6a14 14 0 0 1 3.5 1.7 14.7 14.7 0 0 0-12.6 0A14 14 0 0 1 9.7 3.6L9.4 3A16.5 16.5 0 0 0 5 4.5C2.3 8.5 1.6 12.4 1.9 16.2a16.3 16.3 0 0 0 5 2.5l1-1.3a10.6 10.6 0 0 1-1.6-.8l.4-.3c3.3 1.5 6.9 1.5 10.2 0l.4.3c-.5.3-1 .6-1.6.8l1 1.3a16.3 16.3 0 0 0 5-2.5c.4-4.4-.6-8.2-2.1-11.7zM8.7 13.9c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm6.6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z" />
    </IconShell>
  );
}

function IconFacebook({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.4V9.86c0-2.37 1.41-3.68 3.57-3.68 1.03 0 2.12.18 2.12.18v2.33h-1.19c-1.18 0-1.54.73-1.54 1.48v1.78h2.63l-.42 2.9h-2.21V22c4.78-.75 8.44-4.91 8.44-9.93z" />
    </IconShell>
  );
}

function IconInstagram({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path d="M12 2.16c2.8 0 3.13.01 4.24.06 2.84.13 4.17 1.48 4.3 4.3.05 1.11.06 1.44.06 4.24s-.01 3.13-.06 4.24c-.13 2.81-1.46 4.17-4.3 4.3-1.11.05-1.44.06-4.24.06s-3.13-.01-4.24-.06c-2.85-.13-4.17-1.49-4.3-4.3C2.17 15.13 2.16 14.8 2.16 12s.01-3.13.06-4.24c.13-2.82 1.45-4.17 4.3-4.3C8.87 2.17 9.2 2.16 12 2.16zM12 0C9.16 0 8.8.01 7.67.07 3.6.25.25 3.6.07 7.67.01 8.8 0 9.16 0 12s.01 3.2.07 4.33c.18 4.07 3.53 7.42 7.6 7.6C8.8 23.99 9.16 24 12 24s3.2-.01 4.33-.07c4.07-.18 7.42-3.53 7.6-7.6C23.99 15.2 24 14.84 24 12s-.01-3.2-.07-4.33C23.75 3.6 20.4.25 16.33.07 15.2.01 14.84 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32A6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-10.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
    </IconShell>
  );
}

function IconTikTok({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.76 2.89 2.89 0 0 1-2.88-2.89 2.89 2.89 0 0 1 2.88-2.88c.28 0 .56.04.83.12V9.26a6.27 6.27 0 0 0-.83-.06A6.34 6.34 0 0 0 3.15 15.5a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.2 8.2 0 0 0 4.78 1.52V6.79a4.85 4.85 0 0 1-1.02-.1z" />
    </IconShell>
  );
}

export const SITE_SOCIALS = [
  { href: siteConfig.social.youtube, label: "YouTube", Icon: IconYouTube },
  { href: siteConfig.social.x, label: "X", Icon: IconX },
  { href: siteConfig.social.instagram, label: "Instagram", Icon: IconInstagram },
  { href: siteConfig.social.facebook, label: "Facebook", Icon: IconFacebook },
  { href: siteConfig.social.tiktok, label: "TikTok", Icon: IconTikTok },
  { href: siteConfig.social.discord, label: "Discord", Icon: IconDiscord },
] as const;
