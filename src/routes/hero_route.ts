/// <reference path="../hero_db.ts" />

const data: HeroDB = require("../../hero_db.json");

import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./base_route";

export class HeroRoute extends BaseRoute {

  public static create(router: Router) {
    console.log("[HeroRoute::create] Creating Hero route.");

    /*
    getClient(1)
    createClient(1)
    updateAccountBalance(1)
    addProductToOrder(1)
    deleteAddress(1)
    By contrast, the RESTful approach is to use:

    GET /clients/1
    POST /clients
    PATCH /accounts/1
    PUT /orders/1
    DELETE /addresses/1
    */
    let routes = new HeroRoute();

    router.get("/heros", routes.list);
    router.get('/heros/:id', [routes.checkHeroExists, routes.find]);
    router.post('/heros',
      [routes.validateId, routes.validateName, routes.post]
    );
    // router.patch('/heros/:id', [routes.checkHeroExists, routes.patch]);
    // router.delete('/heros/:id', [routes.checkHeroExists, routes.delete]);
  }

  constructor() {
    super();
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

  // Patch and delete not implemented
  public patch(req: Request, res: Response) {
    console.log("patch");
    res.json(req["hero"]);
  }

  public delete(req: Request, res: Response) {
    console.log("delete");
    res.json(req["hero"]);
  }
}
