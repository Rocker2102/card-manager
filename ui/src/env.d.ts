interface ImportMetaEnv {
  readonly PUBLIC_URL: string;
  readonly VITE_PUBLIC_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
