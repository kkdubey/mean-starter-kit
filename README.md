# mean-starter-kit

> Starter kit (seed) for MEAN stack applications - MongoDB, Express, AngularJS, NodeJS with Gulp

## Features
Client:
  - [AngularJS](https://angularjs.org/)
  - [AngularJS UI Router](https://github.com/angular-ui/ui-router)
  - [John Papa's Angular styleguide](https://github.com/johnpapa/angular-styleguide)
  - [Bootstrap](http://getbootstrap.com/)
  - [angular-translate](https://github.com/angular-translate/angular-translate) (i18n)
  - Preconfigure i18n translations, with loading locale from the browser language.

Server:
  - [Express](http://www.http://expressjs.com/)
  - [node-config](https://github.com/lorenwest/node-config)
  - [CORS](https://github.com/expressjs/cors)
  - [Mongoose](http://mongoosejs.com/)
  - CRUD exemple
  - And more... See package.json file.

Tests:
  - [Mocha](https://mochajs.org/) Tests
  - [Istanbul](https://github.com/gotwarlost/istanbul) code coverage
  - [Supertest](https://github.com/visionmedia/supertest)

Build:
  - [Gulp 4](http://gulpjs.com/) include various gulp plugins
  - [Browsersync](http://www.browsersync.io/) with livereload for client
  - [Nodemon](http://nodemon.io/) with livereload for server
  - Lint code with eslint (help enforce a uniform coding style)
  - Cache control with [gulp-rev](https://github.com/sindresorhus/gulp-rev)
  - Run mocha tests with code coverage
  - Application distribution build (dist folder)
  - travis.yml
  - And more... See gulpfile.js and gulp-tasks folder

Docker:
  - DockerFile with node 4 official image
  - docker-compose.yml version 2 with official MongoDb and Nginx images
  - Nginx configuration with caching


## Prerequisites

  * MongoDB - Download and Install [MongoDB](http://www.mongodb.org/downloads) - If you plan on scaffolding your project with mongoose, you'll need mongoDB to be installed and have the `mongod` process running.

## Getting Started

- Install: `npm install`
- Run: `npm start` or if you have Gulp 4 on your environnement, just run: `gulp`
- Run tests: `npm test` or if you have Gulp 4 on your environnement, just run: `gulp test`
- Build dist: `npm dist`
