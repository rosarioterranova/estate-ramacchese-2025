import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/estate-ramacchese-2025/",
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
