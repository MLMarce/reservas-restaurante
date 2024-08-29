import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/auth.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/enum/role.enum';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    if (!users.length) throw new BadRequestException('Users not found');
    return users;
  }
  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'phone'],
      relations: {},
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  async createUser(user: Partial<User>): Promise<Partial<User>> {
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

  async createUserAuth(user: User) {
    const newUser = await this.userRepository.save(user);
    return this.userRepository.findOne({
      where: { id: newUser.id },
      select: ['id', 'name', 'email', 'phone', 'img'],
    });
  }

  async updateUser(id: string, user: UpdateUserDto) {
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
