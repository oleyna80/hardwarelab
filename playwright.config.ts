import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    reporter: 'list',
    use: {
        baseURL: 'http://localhost:4321',
        trace: 'on-first-retry',
    },
    webServer: {
        command: 'npm run preview',
        url: 'http://localhost:4321',
        reuseExistingServer: !process.env.CI,
    },
});
