import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
export default defineConfig(function (_a) {
    var _b, _c;
    var mode = _a.mode;
    var env = loadEnv(mode, process.cwd(), "");
    var apiTarget = ((_b = env.VITE_API_BASE_URL) === null || _b === void 0 ? void 0 : _b.trim()) || "http://localhost:4000";
    return {
        plugins: [react()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src")
            }
        },
        server: {
            port: 5173,
            proxy: ((_c = env.VITE_API_BASE_URL) === null || _c === void 0 ? void 0 : _c.trim())
                ? undefined
                : {
                    "/ui": {
                        target: apiTarget,
                        changeOrigin: true
                    }
                }
        }
    };
});
