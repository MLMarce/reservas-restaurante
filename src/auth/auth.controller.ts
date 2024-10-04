import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, LoginAuthDto } from './dto/create-auth.dto';
import { ApiOperation } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async singIn(@Body() loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    return await this.authService.signIn(email, password);
  }

  @Post('signin-auth0')
  @ApiOperation({ summary: 'Sign in using third party auth' })
  async signinAuth(@Body() body: LoginUserDto) {
    const { email } = body;
    return await this.authService.signInAuth(email);
  }

  @Post('signup-auth0')
  @ApiOperation({ summary: 'Sign up using third party auth' })
  async signUpAuth(@Body() user: CreateAuthDto) {
    console.log('llegamos..', user);
    return await this.authService.signUpAuth(user);
  }
  @Post('signup')
  @ApiOperation({ summary: 'Sign up entering your own data' })
  async signUp(@Body() user: CreateAuthDto) {
    return await this.authService.signUp(user);
  }
}
