import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Status } from 'src/enum/status.enum';
import { Ubication } from 'src/enum/ubication.enum';

export class CreateTableDto {
  @IsNotEmpty()
  @IsNumber()
  number: number;

  @IsNotEmpty()
  @IsString()
  status: Status;

  @IsNotEmpty()
  @IsString()
  capacity: number;

  @IsNotEmpty()
  @IsString()
  ubication: Ubication;
}
