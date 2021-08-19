# Typescript Boilerplate

[![TypeScript version][ts-badge]][typescript-4-3]
[![Node.js version][nodejs-badge]][nodejs]
[![MIT][license-badge]][license]

#### All tools:

- [TypeScript][typescript] [4.3][typescript-4-3]
- [ESLint][eslint] with some initial rules recommendation
- [Jest][jest] for fast unit testing and code coverage
- [Prettier][prettier] to enforce consistent code style
- NPM [scripts](#available-scripts) for common operations
- [Husky][husky] easy to use git hooks to commit-msg with [Commitlint][commitlint] and pre-commit with [Pretty-quick][pretty-quick]
- [tsc-watch][tsc-watch] commonly used to restart a node server, similar to nodemon but for TypeScript.
- [standard-version][standard-version] to have a nice changelog
- .editorconfig for consistent file format
- Simple example of TypeScript code and unit test

## Getting Started

This project is intended to be used with the latest Active LTS release of [Node.js][nodejs].

### Use as a repository template

To start, just click the **[Use template][repo-template-action]** link (or the green button). Start adding your code in the `src` and unit tests in the `__tests__` directories.

### Clone repository

To clone the repository, use the following commands:

```sh
git clone https://github.com/RogerioSobrinho/node-typescript-boilerplate.git
cd node-typescript-boilerplate
npm i
```

## Available Scripts

- `start` - run transpile files
- `start:watch` - start a node server, similar to nodemon but for TypeScript
- `prebuild` - remove transpiled files
- `build` - transpile TypeScript to ES6
- `format` - apply prettier formatter to all files
- `lint` - lint source files and tests,
- `prepare` - install husky config
- `test` - run tests
- `test:coverage` - run tests with coverage report
- `test:watch` - interactive watch mode to automatically re-run tests
- `release` - to have a changelog

## License

Licensed under the MIT License. See the [LICENSE][license] file for details.

[ts-badge]: https://img.shields.io/badge/TypeScript-4.3-blue.svg
[nodejs-badge]: https://img.shields.io/badge/Node.js->=%2014.16-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v14.x/docs/api/
[typescript]: https://www.typescriptlang.org/
[typescript-4-3]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html
[license-badge]: https://img.shields.io/badge/License-MIT-yellow.svg
[license]: https://github.com/RogerioSobrinho/node-typescript-boilerplate/blob/main/LICENSE
[jest]: https://facebook.github.io/jest/
[eslint]: https://github.com/eslint/eslint
[wiki-js-tests]: https://github.com/jsynowiec/node-typescript-boilerplate/wiki/Unit-tests-in-plain-JavaScript
[prettier]: https://prettier.io
[commitlint]: https://github.com/conventional-changelog/commitlint
[pretty-quick]: https://github.com/azz/pretty-quick
[tsc-watch]: https://github.com/gilamran/tsc-watch
[standard-version]: https://github.com/conventional-changelog/standard-version
[husky]: https://github.com/typicode/husky
[repo-template-action]: https://github.com/RogerioSobrinho/node-typescript-boilerplate/generate

# Book-Library-API
