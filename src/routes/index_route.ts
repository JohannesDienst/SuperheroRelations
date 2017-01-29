import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./base_route";

export class IndexRoute extends BaseRoute {

  public static create(router: Router) {
    console.log("[IndexRoute::create] Creating index route.");

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
    router.get(
      "/",
      (req: Request, res: Response, next: NextFunction) => {
        new IndexRoute().index(req, res, next);
      }
    );
  }

  constructor() {
    super();
  }

  public index(req: Request, res: Response, next: NextFunction) {
    let message: Object = {
      "message": "HeroRelation-Application",
      "endpoints": "heros"
    };

    res.json(message);
  }
}
