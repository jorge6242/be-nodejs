import { DataSource, MongoRepository } from "typeorm";
import { Inject, Service } from "typedi";
import { Category } from "./category.entity";
import { ObjectId } from 'mongodb';

@Service()
export class CategoryRepository {
  private repo: MongoRepository<Category>;

  constructor(@Inject(() => DataSource) private dataSource: DataSource) {
    this.repo = this.dataSource.getMongoRepository(Category);
  }

  public async createCategory(
    name: string,
    description: string
  ): Promise<Category> {
    const newRecord = this.repo.create({ name, description });
    return this.repo.save(newRecord);
  }

  public async getAll(): Promise<Category[]> {
    return await this.repo.find();
  }

  public async getCategoryById(id: string): Promise<Category | null> {
    return await this.repo.findOne({ where: { id: new ObjectId(id) } });
  }

  public async updateCategory(id: string, name: string): Promise<Category> {
    const category = await this.repo.findOne({ where: { _id: new ObjectId(id) } });
    if (!category) throw new Error("Category not found");
    this.repo.merge(category, { name });
    return await this.repo.save(category);
  }
}
