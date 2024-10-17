import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'

/** @type {import('vite').UserConfig} */
export default {
  css: {
    postcss: {
      plugins: [
        tailwind(),
        autoprefixer(),
      ],
    },
  },
  plugins: [
    vue(),
    vueDevTools(),
    ViteImageOptimizer({
      svg: {
        plugins: [{
          name: 'removeAttrs',
          params: {
            attrs: ['data-name'],
          },
        }],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}
