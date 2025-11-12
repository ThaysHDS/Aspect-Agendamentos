import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Exame } from "./Exame";
import { User } from "./User";

@Entity()
export class Agendamento {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Exame, { eager: true })
  @JoinColumn({ name: "exameId" })
  exame!: Exame;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "userId" })
  user!: User;

  @Column()
  dataHora!: string;

  @Column({ nullable: true })
  observacoes?: string;
}
