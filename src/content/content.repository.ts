import { DataSource, MongoRepository } from "typeorm";
import { Inject, Service } from "typedi";
import { Content } from "./content.entity";
import { CreateContentDto } from "./dto/create-content.dto";
import { ObjectId } from "mongodb";
import { UpdateContentDto } from "./dto/update-content.dto";

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

  public async updateContent(
    id: string,
    data: UpdateContentDto
  ): Promise<Content> {
    const { name, userId, themeId, categoryId } = data;
    const content = await this.repo.findOne({
      where: { _id: new ObjectId(id) },
    });
    if (!content) {
      throw new Error("Content not found");
    }
    this.repo.merge(content, {
      name,
      userId: new ObjectId(userId),
      themeId: new ObjectId(themeId),
      categoryId: new ObjectId(categoryId),
    });
    return await this.repo.save(content);
  }

  public async getContentById(id: string): Promise<Content> {
    const content = await this.repo.findOne({
      where: { _id: new ObjectId(id) },
    });
    if (!content) {
      throw new Error("Content not found");
    }
    return content;
  }

  public async getAll(search?: string): Promise<Content[]> {
    let query: any = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { "theme.name": { $regex: search, $options: "i" } },
        { "category.name": { $regex: search, $options: "i" } },
      ];
    }

    return await this.repo
      .aggregate([
        {
          $lookup: {
            from: "theme",
            localField: "themeId",
            foreignField: "_id",
            as: "theme",
          },
        },
        {
          $lookup: {
            from: "category",
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
          },
        },
        { $unwind: "$theme" },
        { $unwind: "$category" },
        { $match: query },
        { $sort: { createdAt: -1 } },
      ])
      .toArray();
  }
}
