// src/hooks/useExport.ts
import { useState, useCallback, useRef, useMemo } from 'react';
import { sanitize } from '../utils/sanitize.js';
import type { Brand, PlatformCalendars } from '../types/index.js';

type HtmlExportModule = { buildHTMLDocument: (b: Brand, c: PlatformCalendars) => string };

interface UseExportReturn {
  copied: boolean; building: boolean;
  handleDownload: () => Promise<void>;
  handleCopy:     () => Promise<void>;
}

export const useExport = (brand: Brand, platformCalendars: PlatformCalendars, showCalendar: boolean): UseExportReturn => {
  const [copied,   setCopied]   = useState(false);
  const [building, setBuilding] = useState(false);
  const moduleRef = useRef<HtmlExportModule | null>(null);

  const getModule = useCallback(async (): Promise<HtmlExportModule> => {
    if (!moduleRef.current) moduleRef.current = await import('../utils/htmlExport.js') as HtmlExportModule;
    return moduleRef.current;
  }, []);

  const buildDoc = useCallback(async (): Promise<string> => {
    const { buildHTMLDocument } = await getModule();
    return buildHTMLDocument(brand, platformCalendars);
  }, [brand, platformCalendars, getModule]);

  const handleDownload = useCallback(async (): Promise<void> => {
    try {
      setBuilding(true);
      const html = await buildDoc();
      const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
      const url  = URL.createObjectURL(blob);
      const a    = Object.assign(document.createElement('a'), {
        href: url, download: `${sanitize(brand.name).replace(/\s+/g,'_')||'calendar'}_Content_Calendar.html`,
      });
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch { alert('Download failed — try Copy HTML instead.'); }
    finally  { setBuilding(false); }
  }, [buildDoc, brand.name]);

  const handleCopy = useCallback(async (): Promise<void> => {
    try {
      setBuilding(true);
      await navigator.clipboard.writeText(await buildDoc());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { alert('Clipboard unavailable.'); }
    finally  { setBuilding(false); }
  }, [buildDoc]);

  useMemo(() => {
    if (showCalendar && Object.keys(platformCalendars).length) getModule();
  }, [showCalendar, platformCalendars, getModule]);

  return { copied, building, handleDownload, handleCopy };
};
