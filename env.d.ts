/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MODE: string
  readonly DEV: boolean
  readonly PROD: boolean
  readonly SSR: boolean
  readonly BASE_URL: string
  readonly [key: string]: unknown
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
