import { Inject, Service } from "typedi";
import { CategoryRepository } from './category.repository';
import { Category } from './category.entity';

@Service()
export class CategoryService {
  constructor(
    @Inject(() => CategoryRepository)
    private repo: CategoryRepository,
  ) {}
  async createCategory(name: string, email: string): Promise<Category> {
    return this.repo.createCategory(name, email);
  }

  async getAllCategories(): Promise<Category[]> {
    return this.repo.getAll();
  }

  async getCategoryById(id: string): Promise<Category | null> {
    return this.repo.getCategoryById(id);
  }

  async updateCategory(id: string, name: string): Promise<Category> {
    return this.repo.updateCategory(id, name);
  }
}
