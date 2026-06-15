import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['tests/unit/**/*.test.ts'],
    exclude: ['tests/e2e/**', 'node_modules/**'],
    reporters: ['verbose', 'json'],
    outputFile: './tests/reports/unit/results.json',

    coverage: {
      provider: 'v8',
      reportsDirectory: './tests/reports/coverage',
      reporter: ['text', 'html', 'json', 'lcov'],
      include: ['components/**/*.vue', 'composables/**/*.ts', 'stores/**/*.ts'],
      exclude: [
        'pages/**',          // testées via Playwright (E2E)
        '.nuxt/**',
        'node_modules/**',
      ],
      thresholds: {
        lines: 60,
        functions: 60,
        branches: 60,
        statements: 60,
      },
    },
  },
})
