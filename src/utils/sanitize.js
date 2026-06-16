// src/utils/sanitize.js — FIX 1: XSS Prevention (replaces DOMPurify)
// Escapes all HTML special characters before inserting user input into HTML strings.
export const sanitize = (str) => {
  if (!str || typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
};
