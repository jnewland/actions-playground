module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        "@actions/github": "<rootDir>/src/__mocks__/github.ts",
        "@actions/core": "<rootDir>/src/__mocks__/core.ts",
    },
};
