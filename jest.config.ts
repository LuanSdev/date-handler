export default {
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testMatch: ['**/__tests__/**/*.spec.ts'],
  collectCoverageFrom: ['**/__tests__/**/*.spec.ts'],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
