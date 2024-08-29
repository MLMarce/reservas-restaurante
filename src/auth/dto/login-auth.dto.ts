import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  /**
   * Correo electrónico del usuario
   * @example 'usuario@example.com'
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Contraseña del usuario
   * @example 'Contraseña123!'
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
