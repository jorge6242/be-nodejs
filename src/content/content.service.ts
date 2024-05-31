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

  async getAll(search?: string): Promise<Content[]> {
    return this.contentRepository.getAll(search);
}
}
