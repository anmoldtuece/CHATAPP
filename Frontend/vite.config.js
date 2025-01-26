import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'https://chatapp-1y9j.onrender.com', // Updated to your backend URL
        changeOrigin: true,
        secure: true, // Use true for HTTPS
      },
    },
  },
});
