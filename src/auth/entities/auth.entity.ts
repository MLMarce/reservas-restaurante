import { Appointment } from 'src/appointment/entities/appointment.entity';
import { Role } from 'src/enum/role.enum';
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
    nullable: true,
  })
  phone: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  img: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
    comment: 'El rol del usuario',
  })
  role: Role;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];
}
