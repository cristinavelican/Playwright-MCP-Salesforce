// @ts-check
import { defineConfig, devices } from '@playwright/test';
require('dotenv').config({ path: './.env.staging' });
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
      ['playwright-ctrf-json-reporter', {
        outputFile: 'custom-name.json', // Optional: Output file name. Defaults to 'ctrf-report.json'.
        outputDir: 'custom-directory',  // Optional: Output directory path. Defaults to '.' (project root).
        minimal: true,                  // Optional: Generate a minimal report. Defaults to 'false'. Overrides screenshot and testType when set to true
        screenshot: true,              // Optional: Include screenshots in the report. Defaults to 'false'.
        annotations: false,             // Optional: Include annotations in the report. Defaults to 'false'.
        testType: 'e2e',                // Optional: Specify the test type (e.g., 'api', 'e2e'). Defaults to 'e2e'.
        appName: 'MyApp',               // Optional: Specify the name of the application under test.
        appVersion: '1.0.0',            // Optional: Specify the version of the application under test.
        osPlatform: 'linux',            // Optional: Specify the OS platform.
        osRelease: '18.04',             // Optional: Specify the OS release version.
        osVersion: '5.4.0',             // Optional: Specify the OS version.
        buildName: 'MyApp Build',       // Optional: Specify the build name.
        buildNumber: '100',             // Optional: Specify the build number.
        buildUrl: "https://ctrf.io",    // Optional: Specify the build url.
        repositoryName: "ctrf-json",    // Optional: Specify the repository name.
        repositoryUrl: "https://gh.io", // Optional: Specify the repository url.
        branchName: "main",             // Optional: Specify the branch name.
        testEnvironment: "staging"      // Optional: Specify the test environment (e.g. staging, production).
    }]
  ],
  use: {
    baseURL: process.env.SF_BASE_URL, 
    storageState: 'playwright/.auth/user.json', // Path to the storage state file
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

