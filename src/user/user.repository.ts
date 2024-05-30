import { DataSource, MongoRepository } from "typeorm";
import { Inject, Service } from "typedi";
import { User } from "./user.entity";
import { ObjectId } from "mongodb";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../role/role.entity';

@Service()
export class UserRepository {
  public repo: MongoRepository<User>;
  public roleRepo: MongoRepository<Role>; 

  constructor(@Inject(() => DataSource) private dataSource: DataSource) {
    this.repo = this.dataSource.getMongoRepository(User);
    this.roleRepo = this.dataSource.getMongoRepository(Role);
  }

  public async createUser(data: CreateUserDto): Promise<User | null> {
    const { alias, email, roles } = data;
    const existAlias = await this.repo.findOne({ where: { alias } });
    const existEmail = await this.repo.findOne({ where: { email } });

    if(existAlias || existEmail){
      return null
    }

    const newUser = this.repo.create({ alias, email, roles });
    return await this.repo.save(newUser);
  }

  public async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    const { alias, email, roles } = data;
    const objectId = new ObjectId(id);  
    let user = await this.repo.findOneBy({ _id: objectId });
    console.log('user ', user);
    if (!user) {
      throw new Error("User not found");
    }

    user = this.repo.merge(user, { alias, email, roles  });
    return await this.repo.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user: any = await this.repo.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    
    if (user?.roles && user.roles.length > 0) {
      const roleIds = user.roles.map((id: any) => new ObjectId(id));
      const roles = await this.roleRepo.find({
        where: {
          _id: { $in: roleIds }
        }
      });
      user.roles = roles;
    }

    return user;
  }
}
