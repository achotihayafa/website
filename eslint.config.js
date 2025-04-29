import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "@typescript-eslint/eslint-plugin"; // Updated import
import next from "eslint-plugin-next"; 
import nextPlugin from "eslint-plugin-next"; 

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [
      js.configs.recommended, 
      ...tseslint.configs.recommended, 
      "plugin:next/recommended" // Include Next.js recommended config
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      next: nextPlugin, 
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": "off",
      "next/no-html-link-for-pages": ["warn", "pages/"], // Next.js rule for internal links
      "next/no-sync-scripts": "warn", // Warn about synchronous scripts in Next.js
    },
  }
);
