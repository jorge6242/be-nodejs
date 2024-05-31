import { Inject, Service } from "typedi";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectId } from 'typeorm';
import { RoleRepository } from '../role/role.repository';

@Service()
export class UserService {
  constructor(
    @Inject(() => UserRepository)
    private userRepository: UserRepository,
    @Inject(() => RoleRepository)
    private roleRepository: RoleRepository,
  ) {}
  async createUser(data: CreateUserDto): Promise<User | null> {
    return this.userRepository.createUser(data);
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    return this.userRepository.updateUser(id, data);
  }


  async getAll(search: string): Promise<User[]> {
    return this.userRepository.findAllUsers(search);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async hasPermission(userId: string, permissionNeeded: any): Promise<boolean> {
    const user = await this.userRepository.repo.findOne({ where: { _id: new ObjectId(userId) } })
    if (!user) {
        return false;
    }
    for (let roleId of user.roles) {
        const role = await this.roleRepository.repo.findOne({ where: { _id: new ObjectId(roleId) } });
        if (role && role.permissions.includes(permissionNeeded)) {
            return true;
        }
    }
    return false;
}
}
