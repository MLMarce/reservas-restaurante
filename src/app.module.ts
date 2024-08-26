import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TableModule } from './table/table.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [AuthModule, TableModule, AppointmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
