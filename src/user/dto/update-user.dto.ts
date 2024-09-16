import { PartialType } from '@nestjs/swagger';
import { CreateAuthDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateAuthDto) {}
