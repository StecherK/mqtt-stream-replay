import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('mqtt_logs')  
export class MqttLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  topic: string;

  @Column('jsonb', { nullable: true }) 
  payload: any;

  @CreateDateColumn({ type: 'timestamp' })
  timestamp: Date;
}
