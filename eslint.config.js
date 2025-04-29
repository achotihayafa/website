import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import next from "eslint-plugin-next";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "next": next,
    },
    rules: {
      ...js.configs.recommended.rules,             // JS recommended rules
      ...tseslint.configs.recommended[0].rules,     // TS recommended rules (important, it's an array!)
      ...next.configs.recommended.rules,            // Next.js recommended rules
      ...next.configs["core-web-vitals"].rules,     // Next.js Core Web Vitals
      ...reactHooks.configs.recommended.rules,      // React Hooks recommended
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": "off",
      "next/no-html-link-for-pages": ["warn", "pages/"],
      "next/no-sync-scripts": "warn",
    },
  }
);
