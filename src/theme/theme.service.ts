import { Inject, Service } from "typedi";
import { ThemeRepository } from './theme.repository';
import { Theme } from './theme.entity';

@Service()
export class ThemeService {
  constructor(
    @Inject(() => ThemeRepository)
    private repo: ThemeRepository,
  ) {}
  async store(name: string): Promise<Theme | null> {
    return this.repo.createTheme(name);
  }

  async getAll(search?: string): Promise<Theme[]> {
    return this.repo.findAll(search);
  }

  async findById(id: string): Promise<Theme | null> {
    return this.repo.findById(id);
  }

  async update(id: string, name: string): Promise<Theme | null> {
    return this.repo.updateTheme(id, name);
  }
}
