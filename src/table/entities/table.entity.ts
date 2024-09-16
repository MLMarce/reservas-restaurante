import { Appointment } from 'src/appointment/entities/appointment.entity';
import { Status } from 'src/enum/status.enum';
import { Ubication } from 'src/enum/ubication.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tables' })
export class Table {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'integer',
    nullable: false,
    comment: 'Número de la mesa',
  })
  number: number;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.AVAILABLE,
    comment: 'El estado de la mesa',
  })
  status: Status;

  @Column({
    type: 'integer',
    nullable: false,
    comment: 'Capacidad de la mesa',
  })
  capacity: number;

  @Column({
    type: 'enum',
    enum: Ubication,
    comment: 'Ubicación de la mesa',
  })
  ubication: Ubication;

  @OneToMany(() => Appointment, (appointment) => appointment.table)
  appointments: Appointment[];
}
