import { User } from 'src/auth/entities/auth.entity';
import { AppointmentStatus } from 'src/enum/appointment.enum';
import { Table } from 'src/table/entities/table.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'integer',
  })
  clients: string;

  @Column({
    type: 'float',
  })
  total: number;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  status: AppointmentStatus;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  time: string;

  @ManyToOne(() => Table, (table) => table.appointments)
  table: Table;

  @ManyToOne(() => User, (user) => user.appointments)
  user: User;
}
