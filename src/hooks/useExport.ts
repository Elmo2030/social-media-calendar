// src/hooks/useExport.ts
import { useState, useCallback, useRef, useEffect } from 'react';
import { getLang } from '../i18n.js';
import type { Brand, PlatformCalendars } from '../types/index.js';
import type { Lang } from '../i18n.js';

type HtmlExportModule = { buildHTMLDocument: (b: Brand, c: PlatformCalendars, lang: Lang) => string };

interface UseExportReturn {
  copied: boolean; downloaded: boolean; building: boolean; error: string | null;
  handleDownload: () => Promise<void>;
  handleCopy:     () => Promise<void>;
  dismissError:   () => void;
}

export const useExport = (brand: Brand, platformCalendars: PlatformCalendars, showCalendar: boolean): UseExportReturn => {
  const [copied,     setCopied]     = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [building,   setBuilding]   = useState(false);
  const [error,    setError]    = useState<string | null>(null);
  const dismissError = useCallback(() => setError(null), []);
  const moduleRef = useRef<HtmlExportModule | null>(null);

  const getModule = useCallback(async (): Promise<HtmlExportModule> => {
    if (!moduleRef.current) moduleRef.current = await import('../utils/htmlExport.js') as HtmlExportModule;
    return moduleRef.current;
  }, []);

  const buildDoc = useCallback(async (): Promise<string> => {
    const { buildHTMLDocument } = await getModule();
    return buildHTMLDocument(brand, platformCalendars, getLang());
  }, [brand, platformCalendars, getModule]);

  // Render the styled document in a hidden iframe and open the print dialog —
  // the user picks "Save as PDF". Browser handles Arabic/RTL shaping perfectly,
  // no PDF library needed. ponytail: hidden-iframe print, swap for a real PDF
  // lib only if a direct .pdf download (no dialog) becomes a hard requirement.
  const handleDownload = useCallback(async (): Promise<void> => {
    try {
      setBuilding(true); setError(null);
      const html = await buildDoc();
      const frame = document.createElement('iframe');
      frame.setAttribute('aria-hidden', 'true');
      frame.style.cssText = 'position:fixed;width:0;height:0;border:0;right:0;bottom:0;';
      document.body.appendChild(frame);
      const doc = frame.contentWindow?.document;
      if (!doc || !frame.contentWindow) throw new Error('print unavailable');
      const win = frame.contentWindow;
      const cleanup = () => { if (frame.parentNode) document.body.removeChild(frame); };
      win.addEventListener('afterprint', cleanup);
      doc.open(); doc.write(html); doc.close();
      await new Promise(r => setTimeout(r, 350)); // let fonts/layout settle
      win.focus(); win.print();
      setTimeout(cleanup, 60000); // safety net if afterprint never fires
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2000);
    } catch { setError('Could not open the print dialog — try Copy HTML instead.'); }
    finally  { setBuilding(false); }
  }, [buildDoc]);

  const handleCopy = useCallback(async (): Promise<void> => {
    try {
      setBuilding(true); setError(null);
      await navigator.clipboard.writeText(await buildDoc());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { setError('Clipboard unavailable — your browser may block it on this page.'); }
    finally  { setBuilding(false); }
  }, [buildDoc]);

  // Warm the export module once the calendar is ready, so the first
  // download/copy doesn't pay the dynamic-import latency.
  useEffect(() => {
    if (showCalendar && Object.keys(platformCalendars).length) getModule();
  }, [showCalendar, platformCalendars, getModule]);

  return { copied, downloaded, building, error, handleDownload, handleCopy, dismissError };
};
