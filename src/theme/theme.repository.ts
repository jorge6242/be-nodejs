import { DataSource, MongoRepository } from "typeorm";
import { Inject, Service } from "typedi";
import { Theme } from "./theme.entity";
import { ObjectId } from 'mongodb';

@Service()
export class ThemeRepository {
  private repo: MongoRepository<Theme>;

  constructor(@Inject(() => DataSource) private dataSource: DataSource) {
    this.repo = this.dataSource.getMongoRepository(Theme);
  }

  public async createTheme(name: string): Promise<Theme | null> {
    const existingTheme = await this.repo.findOne({
      where: { name: name }
    });
    if (existingTheme) {
      return null;
    }

    const newTheme = this.repo.create({ name });
    return await this.repo.save(newTheme);
  }


  public async findAll(search?: string): Promise<Theme[]> {
    if (search) {
      return await this.repo.find({
        where: {
          name: new RegExp(search, 'i')
        }
      });
    } else {
      return await this.repo.find();
    }
  }

  public async findById(id: string): Promise<Theme | null> {
    return await this.repo.findOne({ where: { id: new ObjectId(id) } });
  }

  public async updateTheme(id: string, name: string): Promise<Theme | null> {
    const theme = await this.repo.findOne({ where: { _id: new ObjectId(id) } });
    if (!theme) return null;
    theme.name = name;
    return await this.repo.save(theme);
  }
}
