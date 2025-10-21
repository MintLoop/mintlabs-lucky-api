import { defineConfig } from '@playwright/test';

const HOST = process.env.CI ? '0.0.0.0' : '127.0.0.1';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'on-first-retry',
  },
  webServer: {
    command: `npm run preview -- --host ${HOST} --port 4173`,
    port: 4173,
    reuseExistingServer: !process.env.CI,
    env: {
      PUBLIC_API_BASE: '',
    },
  },
});
