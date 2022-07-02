// {
//   "moduleFileExtensions": ["js", "json", "ts"],
//   "rootDir": "./lib",
//   "testEnvironment": "node",
//   "testRegex": ".spec.ts$",
//   "verbose": true,
//   "transform": {
//     "^.+\\.(t|j)s$": "ts-jest"
//   }
// }

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};