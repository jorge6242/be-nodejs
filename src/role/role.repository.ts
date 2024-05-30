import { DataSource, MongoRepository } from "typeorm";
import { Inject, Service } from "typedi";
import { Permission, Role } from "./role.entity";
import { ObjectId } from 'mongodb';

@Service()
export class RoleRepository {
  public repo: MongoRepository<Role>;

  constructor(@Inject(() => DataSource) private dataSource: DataSource) {
    this.repo = this.dataSource.getMongoRepository(Role);
  }

  public async createRole(name: string, permissions: Permission[]): Promise<Role | null> {
    const existingRole = await this.repo.findOne({
      where: { name: name }
    });
    if (existingRole) {
      return null;
    }

    const newRole = this.repo.create({ name, permissions });
    return await this.repo.save(newRole);
  }

  public async findAllRoles(): Promise<Role[]> {
    return await this.repo.find();
  }

  public async findRoleById(id: string): Promise<Role | null> {
    return await this.repo.findOne({ where: { _id: new ObjectId(id) } });
  }
}
