import { Appointment } from 'src/appointment/entities/appointment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'bigint',
    length: 255,
    nullable: true,
  })
  phone: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  img: string;

  @OneToMany(
    () => Appointment,
    (appointment) => appointment.user,
  )
  appointments: Appointment[];
}
