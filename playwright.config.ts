import { defineConfig, devices } from '@playwright/test';
import { cucumberReporter, defineBddConfig } from 'playwright-bdd';
import * as dotenv from 'dotenv';

dotenv.config();

const testDir = defineBddConfig({
  paths: ['tests/features/*.feature'],
  steps: ['tests/steps/*.ts']
});

export default defineConfig({
  testDir,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    cucumberReporter('html', { outputFile: 'test-results/report.html' }),
    ['allure-playwright']
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:3000',
    launchOptions: {
      headless: process.env.HEADLESS !== 'false' && process.env.HEADLESS !== '0',
      slowMo: process.env.SLOW_MO ? parseInt(process.env.SLOW_MO) : 1000,
    },
    trace: 'on',
    screenshot: 'on',
    video: 'on',
    viewport: { width: 1920, height: 1080 },
  },
  timeout: 30_000,
  expect: {
    timeout: 15_000,
  },
  outputDir: 'test-results/',
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ]
});