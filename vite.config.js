import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: '/jacquinotrandria/',
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      port: Number(env.VITE_PORT),
      host: true,
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@components": fileURLToPath(
          new URL("./src/components", import.meta.url)
        ),
        "@hooks": fileURLToPath(new URL("./src/hooks", import.meta.url)),
        "@service": fileURLToPath(new URL("./src/service", import.meta.url)),
        "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
        "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
        "@config": fileURLToPath(new URL("./src/config", import.meta.url)),
        "@contexts": fileURLToPath(new URL("./src/context", import.meta.url)),
        "@routes": fileURLToPath(new URL("./src/routes", import.meta.url)),
        "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
        "@stores": fileURLToPath(new URL("./src/stores", import.meta.url)),
        "@styles": fileURLToPath(new URL("./src/styles", import.meta.url)),
      },
    },
  }
})