import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/harry-potter-quiz/', // ეს ხაზი ეუბნება საიტს, რომ ფაილები ნებისმიერ ფოლდერში იპოვოს
})