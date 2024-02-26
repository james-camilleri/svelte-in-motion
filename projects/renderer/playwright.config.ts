import { type PlaywrightTestConfig, devices } from '@playwright/test'

const PORT = 4173

const config: PlaywrightTestConfig = {
  globalTeardown: './src/render/compileFrames',
  fullyParallel: true,
  retries: 3,
  use: {
    baseURL: `http://localhost:${PORT}`,
    video: 'off',
  },
  webServer: {
    command: 'pnpm build && pnpm preview',
    port: PORT,
  },
  projects: [
    {
      use: { ...devices['Desktop Chrome'] },
    },
  ],
}

export default config
