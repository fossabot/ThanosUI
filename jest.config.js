module.exports = {
    preset: "jest-preset-angular",
    roots: ['src'],
    setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
    testPathIgnorePatterns:[
        "src/test.js"
    ],
    transformIgnorePatterns: [
        "node_modules/(?!(@ionic-native|@ionic|angularfire2)/)"
    ],
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.ts"
    ],
    coverageDirectory: "<rootDir>/coverage/",
    coveragePathIgnorePatterns: [
        "node_modules",
        "test-config",
        "<rootDir>/src/app/models",
        "jestGlobalMocks.ts",
        ".module.ts",
        "<rootDir>/src/main.ts",
        "<rootDir>/src/polyfills.ts"
    ],
    "globals": {
        "ts-jest": {
            "tsConfig": "./tsconfig.spec.json",
            "diagnostics": false,
            "stringifyContentPathRegex": "\\.html$",
            "astTransformers": [
                "node_modules/jest-preset-angular/build/InlineFilesTransformer",
                "node_modules/jest-preset-angular/build/StripStylesTransformer"
            ]
        }
    }
}