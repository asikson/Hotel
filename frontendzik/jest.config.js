module.exports = {
    moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
    transform: {
      '^.+\\.(js|jsx)?$': 'babel-jest',
      '^.+\\.(jpg)?$': '<rootDir>/assetsTransformer.js'
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      "axios": "axios/dist/node/axios.cjs"
    },
    testMatch: [
      '<rootDir>/tests/*.spec.(js|jsx|ts|tsx)'
    ],
    transformIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/styles/'
    ]
  };