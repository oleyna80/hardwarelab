import js from "@eslint/js";
import globals from "globals";

const recommended = js.configs.recommended;

export default [
    {
        ignores: [
            "node_modules/**",
            "dist/**",
            ".astro/**",
            "public/**",
            "test-results/**"
        ]
    },
    {
        ...recommended,
        files: ["**/*.{js,mjs,cjs}"],
        languageOptions: {
            ...recommended.languageOptions,
            globals: {
                ...globals.node,
                ...globals.browser
            }
        },
        rules: {
            ...recommended.rules,
            "no-unused-vars": "warn",
            "no-useless-escape": "warn"
        }
    }
];
