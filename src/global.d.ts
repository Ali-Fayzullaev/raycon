// src/global.d.ts
declare module '*.css';
declare module '*.scss';
declare module '*.sass';

// Google Tag Manager dataLayer
interface Window {
  dataLayer: Record<string, unknown>[];
}
