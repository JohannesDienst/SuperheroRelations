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
        "outDir": "./../build",
        "removeComments": true
    },
    "compileOnSave": false,
    "exclude": [
        "node_modules"
    ],
    "moduleResolution": "node"
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
npm install --save-dev @types/es6-promise

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

## Basic routes
- src/routes/base_route.ts
```typescript
export class BaseRoute {
  constructor() {
    //initialize variables
  }
}
```

- src/routes/index_route.ts
```typescript
import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./base_route";

export class IndexRoute extends BaseRoute {

  constructor() {
    super();
  }

  public static create(router: Router) {
    console.log("[IndexRoute::create] Creating index route.");

    router.get(
      "/",
      (req: Request, res: Response, next: NextFunction) => {
        new IndexRoute().index(req, res, next);
      }
    );
  }

  public index(req: Request, res: Response, next: NextFunction) {
    let message: Object = {
      "message": "HeroRelation-Application",
      "endpoints": "heros"
    };

    res.json(message);
  }
}
```

## Datamodel
```typescript
interface Hero {
  id: number;
  name: string;
}

interface HeroDB {
  heros: Array<Hero>;
}
```

## RESTful hero endpoint
- src/routes/hero_route.ts

Require database
```typescript
/// <reference path="../hero_db.ts" />
const data: HeroDB = require("../../hero_db.json");
```

Create route
```typescript
import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./base_route";

export class HeroRoute extends BaseRoute {

  constructor() {
    super();
  }

  public static create(router: Router) {
    console.log("[HeroRoute::create] Creating Hero route.");

    let routes = new HeroRoute();

    router.get("/heros", routes.list);
    router.get('/heros/:id',
      [routes.checkHeroExists, routes.find]);
    router.post('/heros',
      [routes.validateId, routes.validateName, routes.post]
    );
  }

  private validateId(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    let hero: Hero = req.body.hero;
    let id = hero.id;

    if (isNaN(id)) {
      res.status(404).send('Invalid id');
    } else {
      req['hero'] = hero;
      next();
    }
  }

  private validateName(req: Request, res: Response, next: NextFunction) {
    let name = req.params.name;

    let re = new RegExp("^([a-zA-Z]{2,30})$");
    if (re.test(name)) {
      next();
    } else {
      res.status(404).send('Invalid id');
    }
  }

  private checkHeroExists(req: Request, res: Response, next: NextFunction) {
    let id = parseInt(req.params.id, 10);
    
    let hero = data.heros.filter(
      (h: Hero) => { return h.id === id; }
    );

    if (hero.length > 0) {
      req['hero'] = hero[0];
      next();
    } else {
      res.status(404).send('Invalid hero ID');
    }
  }

  public list(req: Request, res: Response) {
    console.log("list");
    res.status(200).json(data);
  }

  public find(req: Request, res: Response) {
    console.log("find");
    res.status(200).json(req["hero"]);
  }

  public post(req: Request, res: Response) {
    console.log("post");
    let hero: Hero = req["hero"];
    data.heros.push(hero)
    res.status(200).json(data);
  }
}
```

## Add routes() in server.ts
```typescript
private routes() {
  let router: express.Router;
  router = express.Router();
  IndexRoute.create(router);
  HeroRoute.create(router);
  this.app.use(router);
}
```

## Example requests
TODO

## Transpile for front with webpack
In package.json:
```json
{
  ...
  "scripts": {
    ...
    "deploy:webpack": "./node_modules/webpack/bin/webpack.js build/index.js build/index_bundle.js",
    "watch:webpack": "nodemon --verbose -w build/index.js --on-change-only -d 1 --exec \"npm run deploy:webpack\"", ...
    ...
  },
  ...
}
```

## Consume endpoint
Add heros to table
```typescript
function appendHeros(heros: HeroDB) {
  let tableBody = $(".table tbody");
  tableBody.find("tr").remove();
  heros.heros.forEach(
    (hero) => {
      tableBody.append(
        `<tr><td>${hero.id}</td><td>${hero.name}</td></tr>`
      )
    } 
  );
}
```

Promise based
```typescript
function getAsync<T>(): Promise<T>
{
  return Promise.resolve(
    $.getJSON("http://localhost:8089/heros")
  );
}

$("#get_async").on("click",
  () => {
    let promise = getAsync<HeroDB>();
    promise.then(appendHeros);
  }
);
```

Async/Await
```typescript
async function getAsyncExp() {
  let val = await getAsync<HeroDB>();
  appendHeros(val);
  return val;
}

$("#async_await").on("click", 
  () => {
    getAsyncExp();
  }
);
```