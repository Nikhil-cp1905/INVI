// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // or your specific plugin

export default defineConfig({
  plugins: [react()],
  base: '/INVI/', // Replace 'INVI' with your exact repo name if different
})