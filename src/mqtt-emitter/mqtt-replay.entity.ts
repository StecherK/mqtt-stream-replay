import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MqttLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  topic: string;

  @Column('json')
  payload: any;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @Column({ default: false })  
  resent: boolean;
}