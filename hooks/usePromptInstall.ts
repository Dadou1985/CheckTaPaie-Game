import { useEffect, useState, useCallback } from 'react';

export default function usePromptInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault(); // Empêche le prompt automatique
      setDeferredPrompt(e);
      setIsReady(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return false;
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setIsReady(false);

    return outcome === 'accepted';
  }, [deferredPrompt]);

  return { isReady, promptInstall };
}