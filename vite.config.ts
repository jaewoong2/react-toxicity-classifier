/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import eslint from 'vite-plugin-eslint'
import * as path from 'path'

export default defineConfig({
  plugins: [react(), tsconfigPaths(), eslint()],
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://openapi.naver.com',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, ''),
        secure: false,
        ws: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
