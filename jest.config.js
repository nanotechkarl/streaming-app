/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  transformIgnorePatterns: [
    "node_modules/(?!axios)",
    "node_modules/(?!(@ngrx|deck.gl|ng-dynamic))",
    "/node_modules/(?!deck.gl)",
    "!node_modules/",
    `/node_modules/(?!(somePkg)|react-dnd|core-dnd|@react-dnd)`,
  ],
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.jest.json",
    },
  },
  setupFilesAfterEnv: ["./src/jest.setup.ts"],
  moduleNameMapper: {
    axios: "axios/dist/node/axios.cjs",
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/mocks/fileMock.js",
    "\\.(css|less)$": "<rootDir>/mocks/fileMock.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "identity-obj-proxy",
  },
  transform: {
    ".+\\.(css|scss|png|jpg|svg)$": "jest-transform-stub",
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.slice.ts",
  ],
};
