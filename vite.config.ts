import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/estate-ramacchese-2025/", /// Uncomment this line for deploying to github pages
  base: "/apps/estate-ramacchese-2025/", // Uncomment this line for deploying to wordpress subdirectory
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
