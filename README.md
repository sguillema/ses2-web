# ses2-web

> Web application for project Software Engineering Studio 2, 2019

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).




(Below is Copied From Root)



# Software Engineering Studio 2, 2019 Web


This is the repository for the Web Application of Software Engineering Studio 2 2019. This repo contains the application code and a _stub server with a testing suite for automated e2e testing (TODO)_.

The application is built on Nuxt as a PWA.

## Table of Contents

- [Software Engineering Studio 2, 2019 Web](#software-engineering-studio-2-2019-web)
  - [Table of Contents](#table-of-contents)
  - [Environment Dependencies](#environment-dependencies)
  - [Installation & Setup](#installation--setup)
    - [Updating the repository](#updating-the-repository)
    - [Running the Application for development](#running-the-application-for-development)
  - [Acknowledgements](#acknowledgements)

---

## Environment Dependencies

- NodeJS - <https://nodejs.org/en/download/>

---

## Installation & Setup

1. Clone the respository

   ```
   git clone https://github.com/sguillema/ses2-web
   ```

2. Navigate to the project root folder and run
   ```
   npm install
   ```
   And once this is done, you can run
   ```
   npm run update
   ```
   _This will install all project dependencies and link them together_

### Updating the repository

1. In the root folder of the project, run
   ```
   git pull
   ```
   Then run
   ```
   npm run update
   ```
   _Please ensure that you are on the correct branch. You can see what branch you are on using the `git branch` command. You can change what branch you are on using the `git checkout <branchName>` command. Make sure to pull the latest version!_

### Running the Application for development

Once you have successfully installed the project dependencies, you can run the following command from the project root directory to start the application

```
npm run dev
```

You can access the running application through `localhost:3000`.

_Note: This is just for local development._

---

## Acknowledgements

- IDE: Visual Studio Code - <https://code.visualstudio.com/>
- Application Framework: Nuxt - <https://nuxtjs.org/>
- UI Styling Framework: Vuetify - <https://bulma.io/>
- Testing Framework: Jest - <https://jestjs.io/>
- ExpressJS <https://expressjs.com/>
- Application Deployment (CI/CD): Netlify - <https://www.netlify.com/>
- Code Formatting: Prettier - <https://github.com/prettier/prettier>
- Linting: ESLint - <https://github.com/eslint/eslint>
- Hook Linting - <https://github.com/okonet/lint-staged>
- Pre-commit Hooks - <https://github.com/typicode/husky>
