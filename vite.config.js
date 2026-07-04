import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  base: '/murmur/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        chats: 'pages/chats.html',
        chat: 'pages/chat.html',
        profile: 'pages/profile.html',
      }
    }
  }
})