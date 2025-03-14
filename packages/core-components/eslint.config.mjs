import prettier from "eslint-plugin-prettier";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        "build/*.js",
        "config/*.js",
        "src/components/icon/types.d.ts",
        "src/components/table/types.ts",
        "**/stencil.config.ts",
    ],
}, ...compat.extends(
    "plugin:@stencil-community/recommended",
    "plugin:prettier/recommended",
    "eslint-config-prettier",
), {
    plugins: {
        prettier,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        ecmaVersion: 5,
        sourceType: "module",

        parserOptions: {
            project: "./tsconfig.json",
        },
    },

    rules: {
        "@stencil-community/decorators-style": ["error", {
            prop: "inline",
            state: "inline",
            element: "inline",
            event: "multiline",
            method: "multiline",
            watch: "multiline",
            listen: "multiline",
        }],

        "@stencil-community/prefer-vdom-listener": "off",
        "@stencil-community/decorators-context": "off",

        "prettier/prettier": ["error", {
            endOfLine: "auto",
        }],

        "react/jsx-no-bind": [1, {
            ignoreDOMComponents: true,
            ignoreRefs: true,
        }],
    },
}, {
    files: ["**/**.stories.ts"],

    rules: {
        "prettier/prettier": ["warn", {
            printWidth: 100,
        }],
    },
}];