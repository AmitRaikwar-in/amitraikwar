module.exports = {
  verbose: true,
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/jest.js'],
  roots: ['./'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleDirectories: ['node_modules', 'src'],
  coverageReporters: ['lcov'],
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
    // exclude files from coverage
    '!src/**/index.ts',
    '!src/**/index.tsx',
    '!src/**/App.tsx',
    '!src/**/react-app-env.d.ts',
    '!src/**/reportWebVitals.ts',
    '!src/**/setupTests.ts',
  ],
  moduleNameMapper: {
    '@assets/(.*)': '<rootDir>/src/assets/$1',
    '@assets': '<rootDir>/src/assets',
    '@screens': '<rootDir>/src/screens',
    '@screens/(.*)': '<rootDir>/src/screens/$1',
    '@data': '<rootDir>/src/data',
    '@hooks': '<rootDir>/src/hooks',
    '@store/slice': '<rootDir>/src/store/slice',
    '@store': '<rootDir>/src/store',
    '@selectors': '<rootDir>/src/store/selectors',
    '@components': '<rootDir>/src/components',
    '@localization': '<rootDir>/src/localization',
    '@providers': '<rootDir>/src/providers',
    '@router': '<rootDir>/src/router',
    '^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  transform: {
    '.+\\.(css|scss|png|jpg|svg)$': 'jest-transform-stub',
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
  },
  // coverageThreshold: {
  //   global: {
  //     branches: 50,
  //     functions: 70,
  //     lines: 70,
  //     statements: -70,
  //   },
  // },
};
