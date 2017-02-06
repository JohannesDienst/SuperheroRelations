# SuperheroRelations: A TypeScript+Express app for Livecoding

Sources used:
- https://github.com/blove/typescript-express-starter
- https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
- https://visualstudiomagazine.com/articles/2013/10/01/calling-web-services-with-typescript.aspx

## Instructions
- npm install: Installs all dependencies
- npm start: Starts application on port 8089
- npm run dev: Starts application on port 8089 in development-mode with nodemon

## List of Commands to show
In src/ tsc --init

Add in tsconfig.json:
```json
{
    "compilerOptions": {
        ...
        "rootDir": ".",
        "outDir": "../build",
        "removeComments": true
    },
    "compileOnSave": false,
    "exclude": [
        "node_modules"
    ]
}
```

## Install development dependencies
npm install --save-dev typescript
npm install --save-dev nodemon

## Install dependencies
npm install --save body-parser  
npm install --save cookie-parser  
npm install --save errorhandler  
npm install --save express  
npm install --save method-override  
npm install --save morgan  
npm install --save webpack

## Install Typescript definition files
npm install --save-dev @types/body-parser  
npm install --save-dev @types/cookie-parser  
npm install --save-dev @types/errorhandler  
npm install --save-dev @types/method-override  
npm install --save-dev @types/morgan  
npm install --save-dev @types/jquery
npm install --save @types/es6-promise

## Setup TypeScript-WatchJob
In package.json:
```json
{
  ...
  "scripts": {
    ...
    "deploy:tsc": "./node_modules/typescript/bin/tsc -p ./src",
    "watch:tsc": "nodemon --verbose -w src/ --on-change-only -d 1 -e ts --exec \"npm run deploy:tsc\"",
    ...
  },
  ...
}
```

## Create Routes
- src/routes/base_route.ts
- src/routes/index_route.ts
- src/routes/hero_route.ts

## Implement routes() in server.ts
```javascript
private routes() {
  let router: express.Router;
  router = express.Router();
  IndexRoute.create(router);
  this.app.use(router);
}
```
