import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Agendamento } from "./Agendamento";

@Entity()
export class Exame {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string; // campo usado para mostrar o nome do exame

  @OneToMany(() => Agendamento, (agendamento) => agendamento.exame)
  agendamentos!: Agendamento[];
}


