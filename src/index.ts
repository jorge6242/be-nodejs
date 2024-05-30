import "reflect-metadata";
import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {
  useContainer as ormUseContainer,
  useExpressServer,
} from "routing-controllers";
import { Container } from "typedi";
import { UserController } from "./user/user.controller";
import { initializeDataSource } from "./database/database.config";
import { CategoryController } from "./category/category.controller";
import { ThemeController } from "./theme/theme.controller";
import { ContentController } from "./content/content.controller";
import { RoleController } from './role/role.controller';

class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.dataSourceSetup();
  }

  private config(): void {
    this.app.set("port", 8000);
    this.app.use(cors({ origin: 'http://localhost:3000' }));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    ormUseContainer(Container);
  }

  private dataSourceSetup(): void {
    initializeDataSource()
      .then(() => {
        this.setupControllers();
      })
      .catch((error) => {
        console.error("Failed to setup database connection:", error);
      });
  }

  private setupControllers(): void {
    useExpressServer(this.app, {
      controllers: [
        UserController,
        CategoryController,
        ThemeController,
        ContentController,
        RoleController
      ],
    });
    this.start();
  }

  public start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log(`Server listening on port ${this.app.get("port")}`);
    });
  }
}

const server = new Server();
