// src/hooks/useExport.js
// LAZY-FIX: htmlExport imported dynamically — NOT in the main bundle
// Only downloaded when the user actually generates a calendar (Step 3)
import { useState, useMemo, useCallback, useRef } from 'react';
import { sanitize } from '../utils/sanitize.js';

export const useExport = (brand, platformCalendars, showCalendar) => {
  const [copied, setCopied]   = useState(false);
  const [building, setBuilding] = useState(false);

  // Cache the loaded module — only fetched once per session
  const exportModuleRef = useRef(null);

  const getExportModule = useCallback(async () => {
    if (!exportModuleRef.current) {
      // LAZY-FIX: dynamic import — htmlExport.js only hits the network here
      exportModuleRef.current = await import('../utils/htmlExport.js');
    }
    return exportModuleRef.current;
  }, []);

  const { name, industry, country, businessModel, goals, tone, audience, products, platforms } = brand;

  // htmlDocument is now built on-demand, not eagerly
  const buildDoc = useCallback(async () => {
    const { buildHTMLDocument } = await getExportModule();
    return buildHTMLDocument(brand, platformCalendars);
  }, [brand, platformCalendars, getExportModule]);

  const handleDownload = useCallback(async () => {
    try {
      setBuilding(true);
      const html     = await buildDoc();
      const filename = `${sanitize(name).replace(/\s+/g, '_') || 'calendar'}_Content_Calendar.html`;
      const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
      const url  = URL.createObjectURL(blob);
      const a    = Object.assign(document.createElement('a'), { href: url, download: filename });
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      alert('Download failed — try Copy HTML instead.');
    } finally {
      setBuilding(false);
    }
  }, [buildDoc, name]);

  const handleCopy = useCallback(async () => {
    try {
      setBuilding(true);
      const html = await buildDoc();
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('Clipboard unavailable in this browser.');
    } finally {
      setBuilding(false);
    }
  }, [buildDoc]);

  // Preload htmlExport.js when calendar is ready — before user clicks download
  // User sees Step 3 → module fetches in background → click is instant
  useMemo(() => {
    if (showCalendar && Object.keys(platformCalendars).length) {
      getExportModule(); // fire-and-forget preload
    }
  }, [showCalendar, platformCalendars, getExportModule]);

  return { copied, building, handleDownload, handleCopy };
};
