// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright Configuration
 * SMA Cendekia Nusantara - UI/E2E Automation Tests
 * ASTQA Kelompok 7 | Agustus 2026
 *
 * Cara menjalankan:
 *   npx playwright test                        (semua test, headless)
 *   npx playwright test --headed               (dengan browser visible)
 *   npx playwright test --reporter=html        (buat HTML report)
 *   npx playwright show-report                 (lihat report)
 *
 * PRASYARAT: Backend running di http://localhost:5000
 *            Frontend running di http://localhost:5173 (Vite dev server)
 */
module.exports = defineConfig({
  testDir: './tests',
  testIgnore: '**/global.setup.js',
  timeout: 30000,
  retries: 1,
  workers: 1, // jalankan sequential (lebih stabil untuk testing login state)

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'playwright-report/results.json' }],
  ],

  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      },
    },
  ],
});
