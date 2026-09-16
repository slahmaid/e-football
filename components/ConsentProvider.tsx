"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CONSENT_EVENT,
  readConsentFromDocument,
  writeConsent,
  type ConsentStatus,
} from "@/lib/consent";

type ConsentContextValue = {
  status: ConsentStatus;
  accepted: boolean;
  accept: () => void;
  reject: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ConsentStatus>("unknown");

  useEffect(() => {
    setStatus(readConsentFromDocument());
    function onConsent(event: Event) {
      const detail = (event as CustomEvent<{ status: ConsentStatus }>).detail;
      if (detail?.status) setStatus(detail.status);
    }
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  const accept = useCallback(() => {
    writeConsent("accepted");
    setStatus("accepted");
  }, []);

  const reject = useCallback(() => {
    writeConsent("rejected");
    setStatus("rejected");
  }, []);

  const value = useMemo(
    () => ({
      status,
      accepted: status === "accepted",
      accept,
      reject,
    }),
    [status, accept, reject],
  );

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used within ConsentProvider");
  }
  return ctx;
}
