import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// import componentTagger from './path-to-componentTagger' // Uncomment if you have this plugin

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/website/', // ✅ correct placement
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react({
      jsxImportSource: 'react',
      tsDecorators: true,
    }),
    // mode === 'development' && componentTagger(), // Uncomment if defined
  ].filter(Boolean), // filters out `false` if in production
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
