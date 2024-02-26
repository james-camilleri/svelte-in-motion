import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    fs: {
      // Allow serving files from one level up to the project root,
      // which solves the frustrating error with the $scene alias that
      // cost me a couple of hours and some sanity.
      allow: ['..'],
    },
  },
})
