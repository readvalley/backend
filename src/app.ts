import express, { Application } from 'express';
import bearerToken from 'express-bearer-token';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import attachUserInfo from './middlewares/attachUserInfo';

import controllers from './controllers';
import Controller from './defaults/Controller';

import config from './config';

const { mongoURI } = config;

class App {
  public application: Application;

  constructor() {
    this.application = express();
    this.connectToMongoDB();
    this.initializeMiddlewares();
    this.initializeResponseHeaders();
    this.initializeRouter();
  }

  private connectToMongoDB() {
    const mongooseConfig = {
      useNewUrlParser: true,
      useFindAndModify: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    };

    mongoose.connect(mongoURI, mongooseConfig, (err) => {
      if (err) {
        throw err;
      }
      console.log('🍃 Conncected to mongodb');
    });
  }

  private initializeMiddlewares() {
    this.application.use(cors());
    this.application.use(bodyParser.json());
    this.application.use(bodyParser.urlencoded({ extended: true }));

    this.application.use(bearerToken({
      headerKey: 'Bearer',
      reqKey: 'token',
    }));
    this.application.use(attachUserInfo);
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
    controllers.forEach((controller: Controller) => {
      this.application.use(controller.basePath, controller.router);
    });
    this.application.use(router);
  }
}

const app = new App().application;

export default app;
