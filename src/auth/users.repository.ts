import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/enum/role.enum';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUsers(page: number, limit: number): Promise<Partial<User>[]> {
    let user = await this.userRepository.find();

    const start = (page - 1) * limit;
    const end = start + +limit;

    user = user.slice(start, end);

    const userWithoutPassword = user.map(({ password, ...user }) => user);
    return userWithoutPassword;
  }
  async getUserById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {},
    });

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  async addUser(user: Partial<User>): Promise<Partial<User>> {
    const phone = Number(user.phone);
    const role =
      user.email === 'marcelodaniellencina@gmail.com' ? Role.ADMIN : Role.USER;

    const newUser = new User();

    newUser.name = user.name;
    newUser.email = user.email;
    newUser.password = user.password;
    newUser.phone = phone;
    newUser.img = user.img;
    newUser.role = role;

    await this.userRepository.save(newUser);

    return newUser;
  }

  async updateUser(id: string, user: User) {
    await this.userRepository.update(id, user);
    const updateUser = await this.userRepository.findOneBy({ id });
    const { password, ...userWithoutPassword } = updateUser;
    return userWithoutPassword;
  }
  async deleteUser(id: string): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({ where: { id } });
    this.userRepository.remove(user);

    const { password, ...userWithputPassword } = user;
    return userWithputPassword;
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }
}
