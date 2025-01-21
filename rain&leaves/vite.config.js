import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  assetsInclude: ['**/*.json'],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // Check the path here to make sure it resolves to lucide-vue-next correctly
      '@lucide': 'node_modules/lucide-vue-next/dist/esm/icons',
    },
  },
  optimizeDeps: {
    include: ['howler'], // Add howler to pre-bundling dependencies
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/, /howler/], // Ensure node_modules are properly included
    },
  },
})
