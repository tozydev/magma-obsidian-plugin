import { defineConfig, type Plugin } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import builtins from "builtin-modules"

const getOutputDir = (mode: string) => {
  if (mode === "development") {
    return "test-vault/.obsidian/plugins/magma-obsidian-plugin"
  }
  return "dist"
}

/** Vite plugin that create a .hotreload file on each build in watch mode */
const hotReloadObsidianPlugin: () => Plugin = () => {
  return {
    name: "hot-reload-obsidian-plugin",
    apply: "build",
    generateBundle() {
      if (!this.meta.watchMode) return
      this.emitFile({
        type: "asset",
        fileName: ".hotreload",
        source: "",
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === "development"
  return {
    plugins: [svelte(), hotReloadObsidianPlugin()],
    build: {
      target: "esnext",
      outDir: getOutputDir(mode),
      sourcemap: isDev ? "inline" : false,
      minify: isDev ? false : "oxc",
      lib: {
        entry: "src/main.ts",
        formats: ["cjs"],
      },
      rolldownOptions: {
        output: {
          entryFileNames: "main.js",
          assetFileNames: "styles.css",
          exports: "named",
        },
        external: [
          "obsidian",
          "electron",
          "@codemirror/autocomplete",
          "@codemirror/collab",
          "@codemirror/commands",
          "@codemirror/language",
          "@codemirror/lint",
          "@codemirror/search",
          "@codemirror/state",
          "@codemirror/view",
          "@lezer/common",
          "@lezer/highlight",
          "@lezer/lr",
          ...builtins,
        ],
      },
    },
  }
})
