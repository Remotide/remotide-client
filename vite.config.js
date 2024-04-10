import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcss from 'postcss';
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss,
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://remotide.onrender.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
