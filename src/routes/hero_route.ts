import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./base_route";

const data = require("../../hero_db.json");

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
    router.get('/heros/:id', [routes.checkIdExists, routes.find]);
    router.post('/heros/:id', [routes.checkIdExists, routes.post]);
    router.patch('/heros/:id', [routes.checkIdExists, routes.patch]);
    router.put('/heros/:id', [routes.checkIdExists, routes.put]);
    router.delete('/heros/:id', [routes.checkIdExists, routes.delete]);
  }

  constructor() {
    super();
  }

  private checkIdExists (req: Request, res: Response, next) {
    let id = parseInt(req.params.id, 10);
    let hero = data.heros.find(h => h.id === id);

    if (hero) {
      req['hero'] = hero;
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
    res.json(req["hero"]);
  }

  public post(req: Request, res: Response) {
    console.log("post");
    res.json(req["hero"]);
  }

  public patch(req: Request, res: Response) {
    console.log("patch");
    res.json(req["hero"]);
  }

  public put(req: Request, res: Response) {
    console.log("put");
    res.json(req["hero"]);
  }

  public delete(req: Request, res: Response) {
    console.log("delete");
    res.json(req["hero"]);
  }
}
