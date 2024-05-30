import { DataSource } from "typeorm";
import { Container } from "typedi";
import { User } from "../user/user.entity";
import { Category } from "../category/category.entity";
import { Theme } from "../theme/theme.entity";
import { Content } from "../content/content.entity";
import { Role } from '../role/role.entity';

export const initializeDataSource = () => {
  const dataSource = new DataSource({
    type: "mongodb",
    url: "mongodb://localhost:27017",
    database: "nodejs",
    entities: [User, Category, Theme, Content, Role],
    synchronize: true,
    logging: true,
  });

  return dataSource
    .initialize()
    .then(() => {
      Container.set(DataSource, dataSource);
      console.log("Conexión a la base de datos establecida con éxito");
      return dataSource;
    })
    .catch((error) => {
      console.error("Error al conectar con la base de datos:", error);
      throw error;
    });
};
