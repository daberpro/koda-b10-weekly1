import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    plugins: { 
      js,
      "@stylistic": stylistic 
    }, 
    extends: ["js/recommended"], 
    languageOptions: { globals: globals.node },
    rules: {
      "@stylistic/brace-style": ["error", "stroustrup"],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/object-curly-newline": ["error", { "multiline": true }],
      "@stylistic/block-spacing": "error",
      "@stylistic/eol-last": ["error", "always"],
      "@stylistic/comma-spacing": ["error", { "before": false, "after": true }],
      "camelcase": "error"
    } 
  },
]);
