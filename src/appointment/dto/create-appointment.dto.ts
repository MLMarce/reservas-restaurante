import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AppointmentStatus } from 'src/enum/appointment.enum';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsString()
  clients: string;

  @IsNotEmpty()
  @IsNumber()
  total: number;

  @IsNotEmpty()
  @IsString()
  status: AppointmentStatus;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  time: string;

  @IsNotEmpty()
  @IsString()
  tableId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
