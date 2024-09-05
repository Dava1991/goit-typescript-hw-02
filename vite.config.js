import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true, // Додає доступність для всіх пристроїв в мережі
    port: 5173, // Ваш порт
  },
  plugins: [react()],
  build: {
    sourcemap: true,
  },
});