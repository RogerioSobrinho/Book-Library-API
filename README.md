<h1 align="center">Welcome to Book Library API 👋</h1>

[![TypeScript version][ts-badge]][typescript-4-3]
[![Node.js version][nodejs-badge]][nodejs]
[![MIT][license-badge]][license]

#### All tools:

-   [TypeScript][typescript] [4.3][typescript-4-3]
-   [ESLint][eslint] with some initial rules recommendation
-   [Jest][jest] for fast unit testing and code coverage
-   [Prettier][prettier] to enforce consistent code style
-   NPM [scripts](#available-scripts) for common operations
-   [Husky][husky] easy to use git hooks to commit-msg with [Commitlint][commitlint] and pre-commit with [Pretty-quick][pretty-quick]
-   [tsc-watch][tsc-watch] is commonly used to restart a node server, similar to nodemon but for TypeScript.
-   [standard-version][standard-version] to have a nice changelog
-   [Multer][multer] is a middleware for handling multipart/form-data
-   [JsonWebToken][jsonwebtoken] is an implementation of [JSON Web Tokens][jwtexplain].
-   [BCrypt][bcrypt] is a library to help you hash passwords.
-   [Routing-controllers][routing-controllers] this module allows to create controller classes with methods as actions that handle requests
-   [Typedi][typedi] is a dependency injection tool for TypeScript and JavaScript
-   [Swagger-ui-express][swagger-ui-express] this module allows you to serve auto-generated swagger-ui generated API docs from express, based on a swagger.json file.
-   [Dotenv][dotenv] is a zero-dependency module that loads environment variables from a .env file into process.env.
-   [Typeorm][typeorm] is an [ORM][orm]
-   [pg][pg] is Non-blocking PostgreSQL client for Node.js
-   .editorconfig for consistent file format
-   Simple example of TypeScript code and unit test
-   [typescript-boilerplate][typescript-boilerplate] my typescript template

## Clean Architecture

![Cleab Architecture](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

### The Dependency Rule

> The overriding rule that makes this architecture work is The Dependency Rule. This rule says that source code dependencies can only point inwards. Nothing in an inner circle can know anything at all about something in an outer circle. In particular, the name of something declared in an outer circle must not be mentioned by the code in the an inner circle. That includes, functions, classes. variables, or any other named software entity.

Extracted from https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html#the-dependency-rule

## Directory Structure

```bash
└── src
    ├── common
    │   └── files
    ├── config
    ├── core
    │   ├── domain
    │   │   ├── common
    │   │   │   ├── database
    │   │   │   │   └── interfaces
    │   │   │   ├── exceptions
    │   │   │   │   └── message
    │   │   │   └── usecases
    │   │   │       └── interfaces
    │   │   ├── entities
    │   │   ├── enums
    │   │   │   └── role
    │   │   └── types
    │   ├── repositories
    │   │   ├── book
    │   │   └── user
    │   ├── services
    │   │   ├── auth
    │   │   └── crypto
    │   └── usecases
    │       ├── book
    │       │   ├── commands
    │       │   │   ├── create-book
    │       │   │   ├── delete-book
    │       │   │   └── update-book
    │       │   └── queries
    │       │       ├── find-book-by-id
    │       │       └── find-book-by-name-or-author
    │       └── user
    │           ├── commands
    │           │   └── create-user
    │           └── queries
    │               ├── get-user-auth-by-jwt
    │               └── login-by-email
    ├── infrastructure
    │   ├── database
    │   │   └── typeorm
    │   │       ├── entities
    │   │       │   ├── base
    │   │       │   ├── book
    │   │       │   └── user
    │   │       ├── repositories
    │   │       │   ├── base
    │   │       │   ├── book
    │   │       │   └── user
    │   │       └── schemas
    │   │           ├── base
    │   │           ├── book
    │   │           └── user
    │   ├── server
    │   │   └── http
    │   └── service
    │       ├── auth
    │       └── crypto
    └── presentation
        ├── controllers
        │   ├── auth
        │   ├── book
        │   └── user
        └── middlewares
```

## Getting Started

This project is intended to be used with the latest Active LTS release of [Node.js][nodejs].

### Clone repository

To clone the repository, use the following commands:

```sh
git clone https://github.com/RogerioSobrinho/Book-Library-API.git
cd Book-Library-API
npm i
```

## Available Scripts

-   `start` - run transpile files
-   `start:watch` - start a node server, similar to nodemon but for TypeScript
-   `prebuild` - remove transpiled files
-   `build` - transpile TypeScript to ES6
-   `format` - apply prettier formatter to all files
-   `lint` - lint source files and tests
-   `lint:fix` - apply lint source files and tests
-   `prepare` - install husky config
-   `test` - run tests
-   `test:coverage` - run tests with coverage report
-   `test:watch` - interactive watch mode to automatically re-run tests
-   `release` - to have a changelog

## Running

```sh
docker-composer up
npm run start:dev
```

You should get

```sh
        ################################################
            🏁  Server listening at:  http://localhost:3000  🏁
        ################################################
```

Access http://localhost:3000/docs/

## Testing

```sh
npm run test:verbose
```

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
[multer]: https://www.npmjs.com/package/multer
[jsonwebtoken]: https://www.npmjs.com/package/jsonwebtoken
[jwtexplain]: https://tools.ietf.org/html/rfc7519
[bcrypt]: https://www.npmjs.com/package/bcrypt
[routing-controllers]: https://github.com/typestack/routing-controllers
[typedi]: https://www.npmjs.com/package/typedi
[swagger-ui-express]: https://www.npmjs.com/package/swagger-ui-express
[dotenv]: https://www.npmjs.com/package/dotenv
[typeorm]: https://typeorm.io/#/
[orm]: https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping
[pg]: https://www.npmjs.com/package/pg
[typescript-boilerplate]: https://github.com/RogerioSobrinho/node-typescript-boilerplate
