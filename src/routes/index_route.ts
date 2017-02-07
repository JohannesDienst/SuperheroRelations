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
