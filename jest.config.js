module.exports = {
    preset: "jest-preset-angular",
    roots: ['src'],
    setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
    testPathIgnorePatterns:[
        "<rootDir>/src/test.js"
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
                "jest-preset-angular/build/InlineFilesTransformer",
                "jest-preset-angular/build/StripStylesTransformer"
            ]
        }
    }
}