import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '', // ეს ხაზი ეუბნება საიტს, რომ ფაილები ნებისმიერ ფოლდერში იპოვოს
})