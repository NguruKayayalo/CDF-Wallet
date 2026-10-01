// Manual type definitions since vite/client is not resolving
declare module '*.css';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.gif';

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Augment NodeJS namespace to include API_KEY in ProcessEnv
declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
  }
}