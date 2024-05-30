import { DataSource, MongoRepository } from "typeorm";
import { Inject, Service } from "typedi";
import { Content } from "./content.entity";
import { CreateContentDto } from "./dto/create-content.dto";
import { ObjectId } from "mongodb";
import { UpdateContentDto } from './dto/update-content.dto';

@Service()
export class ContentRepository {
  public repo: MongoRepository<Content>;

  constructor(@Inject(() => DataSource) private dataSource: DataSource) {
    this.repo = this.dataSource.getMongoRepository(Content);
  }

  public async createContent(data: CreateContentDto): Promise<Content> {
    const { name, themeId, categoryId, userId } = data;
    const newUser = this.repo.create({
      name,
      themeId: new ObjectId(themeId),
      categoryId: new ObjectId(categoryId),
      userId: new ObjectId(userId),
    });
    return await this.repo.save(newUser);
  }

  public async updateContent(id: string, data: UpdateContentDto): Promise<Content> {
    const content = await this.repo.findOne({ where: { id } });
    if (!content) {
      throw new Error("Content not found");
    }
    this.repo.merge(content, data);
    return await this.repo.save(content);
  }

  public async getContentById(id: string): Promise<Content> {
    const content = await this.repo.findOneBy({ _id: new ObjectId(id) });
    if (!content) {
      throw new Error("Content not found");
    }
    return content;
  }
}
