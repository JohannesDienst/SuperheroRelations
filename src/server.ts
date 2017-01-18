import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");

export class Server {

  public app: express.Application;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public config() {
    this.app.use(express.static(path.join(__dirname, "public")));

    this.app.use(logger("dev"));

    this.app.use(bodyParser.json());

    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    this.app.use(cookieParser("SECRET_GOES_HERE"));

    this.app.use(methodOverride());

    // catch 404 and forward to error handler
    this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        err.status = 404;
        next(err);
    });

    this.app.use(errorHandler());
  }

  private routes() {
    let router: express.Router;
    router = express.Router();

    // Middleware: For now just console logging
    router.use(function(req, res, next) {
      console.log('Incoming request');
      next();
    });

    this.app.use(router);
  }

}
