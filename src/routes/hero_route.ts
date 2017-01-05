import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./base_route";

export class HeroRoute extends BaseRoute {

  public static create(router: Router) {
    console.log("[HeroRoute::create] Creating Hero route.");

    let routes = new HeroRoute();
    router.route('/heros')
      .get(routes.heros);
  }

  constructor() {
    super();
  }

  public heros(req: Request, res: Response) {
    res.json({ 'heroes' : 'Arrow,Flash,Batman,Superman' });
  }
}
