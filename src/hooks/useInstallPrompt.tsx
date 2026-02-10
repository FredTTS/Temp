import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<{ outcome: "accepted" | "dismissed" }>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "temp-log-install-dismissed";

export function useInstallPrompt() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);

    const checkStandalone = () => {
      const standalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as { standalone?: boolean }).standalone === true;
      setIsInstalled(standalone);
    };
    checkStandalone();

    const dismissedAt = sessionStorage.getItem(DISMISS_KEY);
    if (dismissedAt) {
      const age = Date.now() - parseInt(dismissedAt, 10);
      if (age < 7 * 24 * 60 * 60 * 1000) setDismissed(true);
      else sessionStorage.removeItem(DISMISS_KEY);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const install = async () => {
    if (!installEvent) return;
    setInstalling(true);
    try {
      await installEvent.prompt();
      const { outcome } = await installEvent.userChoice;
      if (outcome === "accepted") setIsInstalled(true);
      setInstallEvent(null);
    } finally {
      setInstalling(false);
    }
  };

  const dismiss = () => {
    setDismissed(true);
    sessionStorage.setItem(DISMISS_KEY, String(Date.now()));
  };

  const isInstallable = !!installEvent && !isInstalled && !dismissed;

  return { isInstallable, isInstalled, install, dismiss, installing };
}
