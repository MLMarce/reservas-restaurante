import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}
  async create(createAppointmentDto: CreateAppointmentDto) {
    const newAppointment = this.appointmentRepository.create({
      clients: createAppointmentDto.clients,
      total: createAppointmentDto.total,
      status: createAppointmentDto.status,
      date: createAppointmentDto.date,
      time: createAppointmentDto.time,
      //tableId: createAppointmentDto.tableId,
      //userId: createAppointmentDto.userId,
      // Hay que realcionar distinto estos dos, hay que relacionarlos como objetos, no como IDs
    });
    return await this.appointmentRepository.save(newAppointment);
  }

  async findAll() {
    return await this.appointmentRepository.find();
  }

  async findOne(id: string) {
    return await this.appointmentRepository.findOne({ where: { id } });
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.findOne(id);
    if (!appointment) {
      throw new BadRequestException(`Appointment with id ${id} not found`);
    }
    await this.appointmentRepository.delete(id);
    Object.assign(appointment, updateAppointmentDto);
    return await this.appointmentRepository.save(appointment);
  }

  async remove(id: string) {
    const appointmentRemove = this.findOne(id);
    if (!appointmentRemove) {
      throw new BadRequestException(`Appointment with id ${id} not found`);
    }
    await this.appointmentRepository.delete(id);
  }
}
