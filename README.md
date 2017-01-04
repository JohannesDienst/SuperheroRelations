# SuperheroRelations: A TypeScript+Express app for Livecoding

Sources used:
https://github.com/blove/typescript-express-starter
https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

## Instructions
npm install: Installs all dependencies
npm start: Starts application on port 8089

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
src/routes/base_route.ts
src/routes/index_route.ts

## Implement routes() in server.ts
```javascript
private routes() {
  let router: express.Router;
  router = express.Router();
  IndexRoute.create(router);
  this.app.use(router);
}
```
