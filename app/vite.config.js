import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' 로 두어야 빌드 결과가 저장소 루트에서 그대로 서빙됩니다.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: { outDir: 'dist', emptyOutDir: true },
})
