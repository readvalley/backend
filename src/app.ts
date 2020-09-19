import express, { Application } from 'express';
import cors from 'cors';

import controllers from './controllers';

class App {
  public application: Application;

  constructor() {
    this.application = express();
    this.initializeMiddlewares();
    this.initializeResponseHeaders();
    this.initializeRouter();
  }

  private initializeMiddlewares() {
    this.application.use(cors());
  }

  private initializeResponseHeaders() {
    this.application.all('/*', (_, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'X-Requested-With');
      next();
    });
  }

  private initializeRouter() {
    const router: express.Router = express.Router();
    controllers.forEach((controller) => {
      this.application.use(controller.basePath, controller.router);
    });
    this.application.use(router);
  }
}

const app = new App().application;

export default app;
