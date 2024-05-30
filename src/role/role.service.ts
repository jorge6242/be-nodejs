import { Inject, Service } from "typedi";
import { RoleRepository } from './role.repository';
import { Permission, Role } from './role.entity';

@Service()
export class RoleService {
  constructor(
    @Inject(() => RoleRepository)
    private repo: RoleRepository,
  ) {}

  async createRole(name: string, permissions: Permission[]): Promise<Role | null> {
    return this.repo.createRole(name, permissions);
  }

  async getAllRoles(): Promise<Role[]> {
    return this.repo.findAllRoles();
  }
}
