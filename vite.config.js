/** @type {import('vite').UserConfig} */
// Git revision code: Alex Aung (https://stackoverflow.com/a/70558835)
import { execSync } from "node:child_process"
export default {
    define: {
        __version__: JSON.stringify(execSync("git rev-parse --short HEAD").toString())
    },
    base: "./",
    build: {
        rollupOptions: {
            output: {
                assetFileNames: "assets/[name][extname]",
                chunkFileNames: "assets/[name].js",
                entryFileNames: "assets/[name].js"
            }
        }
    }
}