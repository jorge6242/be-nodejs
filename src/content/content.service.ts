import { Inject, Service } from "typedi";
import { ContentRepository } from "./content.repository";
import { Content } from "./content.entity";
import { CreateContentDto } from "./dto/create-content.dto";
import { UpdateContentDto } from "./dto/update-content.dto";

@Service()
export class ContentService {
  constructor(
    @Inject(() => ContentRepository)
    private contentRepository: ContentRepository
  ) {}
  async createContent(data: CreateContentDto): Promise<Content> {
    return this.contentRepository.createContent(data);
  }

  async updateContent(id: string, data: UpdateContentDto): Promise<Content> {
    return this.contentRepository.updateContent(id, data);
  }

  async getContentById(id: string): Promise<Content> {
    return this.contentRepository.getContentById(id);
  }

  async getAll(): Promise<Content[]> {
    try {
      const aggregation = this.contentRepository.repo.aggregate([
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
        {
          $lookup: {
            from: "user",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: {
            path: "$theme",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unwind: {
            path: "$category",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unwind: {
            path: "$user",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: {
            createdAt: -1,
            "theme.name": 1,
            "category.name": 1,
          },
        },
      ]);

      const results = await aggregation.toArray();
      return results;
    } catch (error) {
      console.error("Failed to fetch content", error);
      throw new Error("Error fetching content data");
    }
  }
}
