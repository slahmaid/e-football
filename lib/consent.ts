export type ConsentStatus = "unknown" | "accepted" | "rejected";

export const CONSENT_COOKIE = "pp_consent";
export const CONSENT_EVENT = "pp:consent";

export function readConsentFromDocument(): ConsentStatus {
  if (typeof document === "undefined") return "unknown";
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE}=`));
  const value = match?.split("=")[1];
  if (value === "accepted" || value === "rejected") return value;
  return "unknown";
}

export function writeConsent(status: Exclude<ConsentStatus, "unknown">) {
  const maxAge = 60 * 60 * 24 * 180;
  document.cookie = `${CONSENT_COOKIE}=${status}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
  window.dispatchEvent(
    new CustomEvent(CONSENT_EVENT, { detail: { status } }),
  );
}
