import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path';

const pathResolve = (dir: string) => resolve(__dirname, dir);

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3001,
    open: true
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': pathResolve('./src'),
      'pages': pathResolve('./src/pages'),
      'components': pathResolve('./src/components'),
      'assets': pathResolve('./src/assets'),
      'utils': pathResolve('./src/utils'),
      'plugins': pathResolve('./src/plugins'),
      'requests': pathResolve('./src/apis/requests'),
      'hooks': pathResolve('./src/hooks'),
      'store': pathResolve('./src/store')
    }
  }
});
