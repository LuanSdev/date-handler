export default {
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testMatch: ['**/__tests__/**/*.spec.ts'],
  collectCoverageFrom: ['**/__tests__/**/*.spec.ts'],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    'tests/(.*)': '<rootDir>/__tests__/$1',
    '@/(.*)': '<rooDir>/src/$1',
  },
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
