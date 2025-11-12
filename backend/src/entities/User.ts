import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Agendamento } from "./Agendamento";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Agendamento, (agendamento) => agendamento.user)
  agendamentos!: Agendamento[];
}


