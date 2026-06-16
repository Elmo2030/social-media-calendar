// src/hooks/useExport.js — Download + Copy logic, fully isolated
import { useState, useMemo, useCallback } from 'react';
import { buildHTMLDocument } from '../utils/htmlExport.js';
import { sanitize } from '../utils/sanitize.js';

export const useExport = (brand, platformCalendars, showCalendar) => {
  const [copied, setCopied] = useState(false);

  // FIX 2: single memoized document shared by both Download and Copy
  const htmlDocument = useMemo(() => {
    if (!showCalendar || !Object.keys(platformCalendars).length) return '';
    return buildHTMLDocument(brand, platformCalendars);
  }, [showCalendar, platformCalendars, brand]);

  const handleDownload = useCallback(() => {
    try {
      const filename = `${sanitize(brand.name).replace(/\s+/g, '_') || 'calendar'}_Content_Calendar.html`;
      const blob = new Blob([htmlDocument], { type: 'text/html;charset=utf-8' });
      const url  = URL.createObjectURL(blob);
      const a    = Object.assign(document.createElement('a'), { href: url, download: filename });
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      alert('Download failed — try Copy HTML instead.');
    }
  }, [htmlDocument, brand.name]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(htmlDocument);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('Clipboard unavailable in this browser.');
    }
  }, [htmlDocument]);

  return { copied, handleDownload, handleCopy };
};
