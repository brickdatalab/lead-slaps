/// <reference types="vite/client" />

// Google Tag Manager dataLayer type declaration
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export {};
