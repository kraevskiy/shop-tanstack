import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  build: {
    rollupOptions: {
      output:{
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },
  server: {
    proxy: {
      '/api-dummy': {
        target: 'https://dummyjson.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-dummy/, ''),
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
