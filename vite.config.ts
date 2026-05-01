import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Set base to '/' for custom domain, or '/repo-name/' for GH Pages project site
  // Change this to '/sarafian-site/' if deploying to https://gregsarafian.github.io/sarafian-site/
  base: '/',
})
