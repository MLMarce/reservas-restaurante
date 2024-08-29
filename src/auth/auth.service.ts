import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async singIn(email: string, password: string) {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    console.log(payload);

    const token = this.jwtService.sign(payload);

    return {
      token,
      message: 'User logger in successfully',
    };
  }
  async singUp(user: Partial<User>) {
    const { email, password } = user;

    const foundUser = await this.userRepository.getUserByEmail(email);

    if (foundUser) {
      throw new BadRequestException('User already register..');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { password: password1, ...userWithoutPassword } =
      await this.userRepository.addUser({
        ...user,
        password: hashedPassword,
      });

    return userWithoutPassword;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
