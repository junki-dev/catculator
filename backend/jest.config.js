module.exports = {
  preset: 'ts-jest', // 이 부분에서 ts-jest를 사용한다고 알려준다
  testEnvironment: 'node', //테스트 환경 'node' 환경을 사용한다 알려줌
  testMatch: ['**/*.spec.(ts)'], //js 파일은 dist에서도 감지가 될 수 있으니 폴더를 조정해서 test이 있는 위치로 잡아준다.
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1/',
    '^@calculator/(.*)$': '<rootDir>/src/calculator/$1/',
    '^@config/(.*)$': '<rootDir>/src/config/$1/',
    '^@common/(.*)$': '<rootDir>/src/common/$1/',
    '^@feed/(.*)$': '<rootDir>/src/feed/$1/',
    '^@loader/(.*)$': '<rootDir>/src/loader/$1/',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1/',
  },
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
};
