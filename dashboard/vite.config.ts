import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import path from "node:path"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const apiTarget = env.VITE_API_BASE_URL?.trim() || "http://localhost:4000"

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    },
    server: {
      port: 5173,
      proxy: env.VITE_API_BASE_URL?.trim()
        ? undefined
        : {
            "/ui": {
              target: apiTarget,
              changeOrigin: true
            }
          }
    }
  }
})
