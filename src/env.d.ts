/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 更多的环境变量
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
