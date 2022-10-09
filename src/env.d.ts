interface ImportMetaEnv {
  readonly VITE_NAVER_CLIENT_ID: string
  readonly VITE_NAVER_CLIENT_PASSWORD: string
  // 다른 환경 변수들에 대한 타입 정의...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
