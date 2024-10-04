import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserRepository } from 'src/user/user.repository';
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async signIn(email: string, password: string) {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      throw new UnauthorizedException('invalid credentials');

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
  async signUp(user: Partial<User>) {
    const { email, password } = user;

    const foundUser = await this.userRepository.getUserByEmail(email);

    if (foundUser) {
      throw new BadRequestException('User already register..');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { password: password1, ...userWithoutPassword } =
      await this.userRepository.createUser({
        ...user,
        password: hashedPassword,
      });

    return userWithoutPassword;
  }
  async signUpAuth(user: CreateAuthDto) {
    if (!user) throw new BadRequestException('User is required');
    const userFound = await this.userRepository.getUserByEmail(user.email);
    if (userFound) {
      return await this.signInAuth(user.email);
    } else {
      const newUser = new User();
      newUser.name = user.name;
      newUser.email = user.email;
      newUser.img = user.img;
      newUser.password = user.name.split(' ').join('').toLowerCase();

      const createdUser = await this.userRepository.createUserAuth(newUser);
      if (!createdUser) throw new BadRequestException('Error creating user');
      return this.signInAuth(createdUser.email);
    }
  }
  async signInAuth(email: string) {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) throw new UnauthorizedException('invalid credentials');

    const userPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(userPayload);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: userpassword, ...userData } = user;

    return {
      message: 'Logged in successfully',
      token,
      userData,
    };
  }
}
