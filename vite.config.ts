import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      dts: true,
      imports: [
        'vue',
        'vue-router',
        // 其他需要自动导入的库
      ],
      eslintrc: {
        enabled: true,
      },
    }),
    Components({
      include: [
        './src/**/*.{js,jsx,ts,tsx,vue,html}',
        './components/**/*.{js,jsx,ts,tsx,vue,html}',
      ],
      resolvers: [
        AntDesignVueResolver({
          importStyle: 'less',
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 8081,
    open: true,
    // https: false,
    proxy: {
      '/app': {
        target: 'https://api-dev.awaitz.com/app',
        changeOrigin: true,
        ws: true,
        rewrite: (path: string) => path.replace(/^\/app/, ''),
      },
      '/upload': {
        target: 'http://web-dev.awaitz.com/third',
        changeOrigin: true,
        ws: true,
        rewrite: (path: string) =>
          path.replace(/^\/upload/, '/api/upload-file'),
      },
      '/donwload': {
        target: 'https://shanghai-photo-test.oss-cn-shanghai.aliyuncs.com',
        changeOrigin: true,
        ws: true,
        rewrite: (path: string) => path.replace(/^\/donwload/, ''),
      },
    },
  },
  preview: {
    port: 3001,
  },
})
